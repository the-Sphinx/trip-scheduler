import { useEffect, useMemo, useRef, useState } from 'react';
import { useTripData } from '../context/TripDataContext';
import type { Bookmark } from '../types';
import { appendRow, updateRow, uploadImage, deleteBookmark as apiDeleteBookmark } from '../services/write';
import { compressImage } from '../services/image';

// Preset category labels offered in the add/edit form. Users can also type a
// custom one — the filter chips are derived from whatever categories exist.
const PRESET_CATEGORIES = ['transportation', 'shopping', 'dont-buy', 'food', 'sightseeing', 'other'];

const CATEGORY_STYLES: Record<string, string> = {
  transportation: 'bg-sky-500/25 text-sky-200 border-sky-400/30',
  shopping: 'bg-violet-500/25 text-violet-200 border-violet-400/30',
  'dont-buy': 'bg-red-500/25 text-red-200 border-red-400/30',
  food: 'bg-amber-500/25 text-amber-200 border-amber-400/30',
  sightseeing: 'bg-emerald-500/25 text-emerald-200 border-emerald-400/30',
};
const DEFAULT_CATEGORY_STYLE = 'bg-slate-500/25 text-slate-200 border-slate-400/30';
const categoryStyle = (c: string) => CATEGORY_STYLES[c.trim().toLowerCase()] || DEFAULT_CATEGORY_STYLE;

interface AppImage {
  url: string; // relative to public/, e.g. "library/subway.png"
  label?: string;
  category?: string;
}

// Optimistic mirror of a Bookmark with local-only bookkeeping.
type LocalBookmark = Bookmark & {
  localId: string;
  pending?: boolean;
  error?: string;
  deleted?: boolean;
  localPreview?: string; // object URL shown until the upload resolves
};

let _idSeq = 0;
const newId = () => `bm-${++_idSeq}`;

interface Draft {
  caption: string;
  category: string;
  link: string;
}

export default function Bookmarks() {
  const { data, refresh } = useTripData();
  const [local, setLocal] = useState<LocalBookmark[]>([]);
  const localIdByRow = useRef<Map<number, string>>(new Map());

  // Reconcile server bookmarks → local state, preserving pending/local-only rows.
  useEffect(() => {
    if (!data) return;
    setLocal((prev) => {
      const byRow = new Map(prev.filter((r) => r.rowIndex).map((r) => [r.rowIndex, r]));
      const pending = prev.filter((r) => r.pending || !r.rowIndex);
      const merged: LocalBookmark[] = data.bookmarks.map((b) => {
        const existing = byRow.get(b.rowIndex);
        if (existing?.pending) return existing; // keep optimistic values mid-write
        let localId = existing?.localId || localIdByRow.current.get(b.rowIndex);
        if (!localId) {
          localId = newId();
          localIdByRow.current.set(b.rowIndex, localId);
        }
        return { ...b, localId };
      });
      for (const p of pending) {
        if (!p.rowIndex && !p.deleted) merged.push(p);
      }
      return merged;
    });
  }, [data]);

  const items = local.filter((r) => !r.deleted);

  // ----- Category filter -----
  const [filter, setFilter] = useState<string>(''); // '' = all
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const b of items) {
      const c = (b.category || '').trim();
      if (!c) continue;
      counts.set(c, (counts.get(c) || 0) + 1);
    }
    return [...counts.entries()].sort((a, b) => b[1] - a[1]);
  }, [items]);

  const sorted = useMemo(() => {
    const filtered = filter
      ? items.filter((b) => (b.category || '').trim().toLowerCase() === filter.toLowerCase())
      : items;
    // Newest first: created_at desc, then rowIndex desc, local-only (no row) on top.
    return [...filtered].sort((a, b) => {
      const ca = a.created_at || '';
      const cb = b.created_at || '';
      if (ca !== cb) return cb.localeCompare(ca);
      return (b.rowIndex || 1e9) - (a.rowIndex || 1e9);
    });
  }, [items, filter]);

  function applyLocal(updater: (rows: LocalBookmark[]) => LocalBookmark[]) {
    setLocal((prev) => updater(prev));
  }

  // ----- Add / edit / view modals -----
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<LocalBookmark | null>(null);
  const [viewing, setViewing] = useState<LocalBookmark | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<LocalBookmark | null>(null);

  // Upload a new image (from camera/library) then append a bookmark row.
  async function addFromFile(file: File, draft: Draft) {
    const localId = newId();
    const preview = URL.createObjectURL(file);
    const temp: LocalBookmark = {
      localId,
      rowIndex: 0,
      image_url: '',
      file_id: '',
      caption: draft.caption,
      category: draft.category,
      link: draft.link,
      created_at: new Date().toISOString(),
      added_by: '',
      pending: true,
      localPreview: preview,
    };
    applyLocal((rows) => [temp, ...rows]);
    try {
      const img = await compressImage(file);
      const res = await uploadImage({
        dataBase64: img.base64,
        mimeType: img.mimeType,
        filename: img.filename,
        caption: draft.caption,
        category: draft.category,
        link: draft.link,
      });
      if (res.error) throw new Error(res.error);
      applyLocal((rows) =>
        rows.map((r) =>
          r.localId === localId
            ? { ...r, rowIndex: res.rowIndex || 0, image_url: res.url || '', file_id: res.fileId || '', pending: false }
            : r
        )
      );
      refresh();
    } catch (e) {
      applyLocal((rows) =>
        rows.map((r) => (r.localId === localId ? { ...r, pending: false, error: String((e as Error).message || e) } : r))
      );
    }
  }

  // Bookmark an image that ships with the app (no upload needed).
  function addFromAppImage(appImage: AppImage, draft: Draft) {
    const url = `${import.meta.env.BASE_URL}${appImage.url.replace(/^\//, '')}`;
    const localId = newId();
    const createdAt = new Date().toISOString();
    const temp: LocalBookmark = {
      localId, rowIndex: 0, image_url: url, file_id: '',
      caption: draft.caption, category: draft.category, link: draft.link,
      created_at: createdAt, added_by: '', pending: true,
    };
    applyLocal((rows) => [temp, ...rows]);
    appendRow('Bookmarks', [url, '', draft.caption, draft.category, draft.link, createdAt, ''])
      .then((res) => {
        applyLocal((rows) => rows.map((r) => (r.localId === localId ? { ...r, rowIndex: res.rowIndex || 0, pending: false } : r)));
        refresh();
      })
      .catch((e) => {
        applyLocal((rows) => rows.map((r) => (r.localId === localId ? { ...r, pending: false, error: String(e.message || e) } : r)));
      });
  }

  function saveEdit(row: LocalBookmark, draft: Draft) {
    const next: LocalBookmark = { ...row, ...draft, pending: true, error: undefined };
    applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? next : r)));
    updateRow('Bookmarks', row.rowIndex, [
      next.image_url, next.file_id, next.caption, next.category, next.link, next.created_at, next.added_by,
    ])
      .then(() => {
        applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? { ...r, pending: false } : r)));
        refresh();
      })
      .catch((e) => {
        applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? { ...r, pending: false, error: String(e.message || e) } : r)));
      });
  }

  function fireDelete(row: LocalBookmark) {
    applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? { ...r, pending: true, deleted: true } : r)));
    apiDeleteBookmark(row.rowIndex, row.file_id)
      .then(() => {
        applyLocal((rows) => rows.filter((r) => r.localId !== row.localId));
        refresh();
      })
      .catch((e) => {
        applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? { ...r, pending: false, deleted: false, error: String(e.message || e) } : r)));
      });
  }

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold leading-tight">Saved</h1>
          <p className="text-xs text-text-muted mt-0.5">{items.length} bookmark{items.length === 1 ? '' : 's'}</p>
        </div>
        <button
          onClick={() => setAdding(true)}
          className="bg-gradient-to-br from-primary-light to-blue-600 text-white text-sm font-medium rounded-full px-4 py-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
        >
          + Add
        </button>
      </div>

      {/* Category filter chips */}
      {categories.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-2 mb-2 -mx-1 px-1 no-scrollbar">
          <FilterChip label="All" count={items.length} active={filter === ''} onClick={() => setFilter('')} />
          {categories.map(([c, n]) => (
            <FilterChip key={c} label={c} count={n} active={filter.toLowerCase() === c.toLowerCase()} style={categoryStyle(c)} onClick={() => setFilter(c)} />
          ))}
        </div>
      )}

      {/* Grid */}
      {sorted.length === 0 ? (
        <div className="text-center py-16 text-text-muted text-sm">
          <p className="text-3xl mb-2">🔖</p>
          <p>{filter ? 'Nothing in this category' : 'No bookmarks yet'}</p>
          <p className="text-xs mt-1">Tap “+ Add” to save a photo, screenshot, or map</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {sorted.map((b) => (
            <button
              key={b.localId}
              onClick={() => setViewing(b)}
              className={`group relative rounded-xl overflow-hidden bg-surface text-left aspect-square border ${b.error ? 'border-red-500/50' : 'border-transparent'}`}
            >
              <img
                src={b.localPreview || b.image_url}
                alt={b.caption || 'bookmark'}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Caption / category overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 pt-6">
                {b.category && (
                  <span className={`inline-block text-[9px] px-1.5 py-0.5 rounded-full border mb-1 ${categoryStyle(b.category)}`}>
                    {b.category}
                  </span>
                )}
                {b.caption && <p className="text-white text-xs leading-snug line-clamp-2">{b.caption}</p>}
              </div>
              {b.link && <span className="absolute top-1.5 right-1.5 text-xs bg-black/50 rounded-full w-6 h-6 flex items-center justify-center">🔗</span>}
              {b.pending && <span className="absolute top-1.5 left-1.5 text-[10px] bg-black/60 text-white px-1.5 py-0.5 rounded-full animate-pulse">{b.error ? '' : 'saving…'}</span>}
              {b.error && <span className="absolute top-1.5 left-1.5 text-[10px] bg-red-600/80 text-white px-1.5 py-0.5 rounded-full" title={b.error}>⚠ failed</span>}
            </button>
          ))}
        </div>
      )}

      {adding && (
        <AddModal
          onClose={() => setAdding(false)}
          onSubmitFile={(file, draft) => { setAdding(false); addFromFile(file, draft); }}
          onSubmitAppImage={(img, draft) => { setAdding(false); addFromAppImage(img, draft); }}
        />
      )}

      {editing && (
        <EditModal
          bookmark={editing}
          onClose={() => setEditing(null)}
          onSave={(draft) => { saveEdit(editing, draft); setEditing(null); }}
          onDelete={() => { setConfirmDelete(editing); setEditing(null); }}
        />
      )}

      {viewing && (
        <Lightbox
          bookmark={viewing}
          onClose={() => setViewing(null)}
          onEdit={() => { setEditing(viewing); setViewing(null); }}
          onDelete={() => { setConfirmDelete(viewing); setViewing(null); }}
        />
      )}

      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(null)}>
          <h2 className="text-lg font-semibold mb-2">Delete this bookmark?</h2>
          <p className="text-sm text-text-muted mb-4">
            {confirmDelete.caption ? `“${confirmDelete.caption}” ` : 'This image '} will be removed for everyone.
          </p>
          <div className="flex gap-2 justify-end">
            <button onClick={() => setConfirmDelete(null)} className="px-3 py-1.5 text-sm text-text-muted">Cancel</button>
            <button
              onClick={() => {
                const row = confirmDelete;
                setConfirmDelete(null);
                if (row.rowIndex) fireDelete(row);
                else applyLocal((rows) => rows.filter((r) => r.localId !== row.localId));
              }}
              className="px-4 py-1.5 text-sm bg-red-500/80 text-white rounded-md active:scale-95 transition-transform"
            >
              Delete
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ---------------- Filter chip ----------------
function FilterChip({ label, count, active, style, onClick }: { label: string; count: number; active: boolean; style?: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border whitespace-nowrap transition-colors ${
        active ? 'bg-primary-light text-white border-primary-light' : style || 'bg-surface text-text-muted border-surface-light'
      }`}
    >
      {label} <span className="opacity-60">{count}</span>
    </button>
  );
}

// ---------------- Add modal (image source + metadata) ----------------
function AddModal({
  onClose,
  onSubmitFile,
  onSubmitAppImage,
}: {
  onClose: () => void;
  onSubmitFile: (file: File, draft: Draft) => void;
  onSubmitAppImage: (img: AppImage, draft: Draft) => void;
}) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const libraryRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [appImage, setAppImage] = useState<AppImage | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [appImages, setAppImages] = useState<AppImage[] | null>(null);
  const [showLibraryPicker, setShowLibraryPicker] = useState(false);
  const [draft, setDraft] = useState<Draft>({ caption: '', category: '', link: '' });

  function pick(f: File | null) {
    if (!f) return;
    setAppImage(null);
    setFile(f);
    setPreview((p) => { if (p) URL.revokeObjectURL(p); return URL.createObjectURL(f); });
  }

  async function openAppImages() {
    setShowLibraryPicker(true);
    if (appImages === null) {
      try {
        const res = await fetch(`${import.meta.env.BASE_URL}library/manifest.json`);
        setAppImages(res.ok ? await res.json() : []);
      } catch {
        setAppImages([]);
      }
    }
  }

  function chooseAppImage(img: AppImage) {
    setFile(null);
    setAppImage(img);
    setPreview(`${import.meta.env.BASE_URL}${img.url.replace(/^\//, '')}`);
    if (img.category && !draft.category) setDraft((d) => ({ ...d, category: img.category! }));
    setShowLibraryPicker(false);
  }

  const hasImage = !!file || !!appImage;

  function submit() {
    if (file) onSubmitFile(file, draft);
    else if (appImage) onSubmitAppImage(appImage, draft);
  }

  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold mb-3">Add bookmark</h2>

      <input ref={cameraRef} type="file" accept="image/*" capture="environment" className="hidden" onChange={(e) => pick(e.target.files?.[0] || null)} />
      <input ref={libraryRef} type="file" accept="image/*" className="hidden" onChange={(e) => pick(e.target.files?.[0] || null)} />

      {/* Image preview / source picker */}
      {hasImage ? (
        <div className="relative mb-3">
          <img src={preview} alt="preview" className="w-full max-h-56 object-contain rounded-xl bg-black/30" />
          <button onClick={() => { setFile(null); setAppImage(null); setPreview(''); }} className="absolute top-2 right-2 bg-black/60 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm">✕</button>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-2 mb-3">
          <SourceButton icon="📷" label="Camera" onClick={() => cameraRef.current?.click()} />
          <SourceButton icon="🖼️" label="Photos" onClick={() => libraryRef.current?.click()} />
          <SourceButton icon="🗂️" label="App images" onClick={openAppImages} />
        </div>
      )}

      {showLibraryPicker && !hasImage && (
        <div className="mb-3 max-h-48 overflow-y-auto">
          {appImages === null ? (
            <p className="text-xs text-text-muted text-center py-4">Loading…</p>
          ) : appImages.length === 0 ? (
            <p className="text-xs text-text-muted text-center py-4">No bundled images available.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {appImages.map((img) => (
                <button key={img.url} onClick={() => chooseAppImage(img)} className="aspect-square rounded-lg overflow-hidden bg-surface-light">
                  <img src={`${import.meta.env.BASE_URL}${img.url.replace(/^\//, '')}`} alt={img.label || ''} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <MetaFields draft={draft} setDraft={setDraft} />

      <div className="flex justify-end gap-2 pt-4">
        <button onClick={onClose} className="px-3 py-1.5 text-sm text-text-muted">Cancel</button>
        <button
          onClick={submit}
          disabled={!hasImage}
          className="px-4 py-1.5 text-sm bg-gradient-to-br from-primary-light to-blue-600 text-white rounded-md disabled:opacity-40 active:scale-95 transition-transform"
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

function EditModal({ bookmark, onClose, onSave, onDelete }: { bookmark: Bookmark; onClose: () => void; onSave: (d: Draft) => void; onDelete: () => void }) {
  const [draft, setDraft] = useState<Draft>({ caption: bookmark.caption, category: bookmark.category, link: bookmark.link });
  return (
    <Modal onClose={onClose}>
      <h2 className="text-lg font-semibold mb-3">Edit bookmark</h2>
      <img src={bookmark.image_url} alt="" className="w-full max-h-40 object-contain rounded-xl bg-black/30 mb-3" />
      <MetaFields draft={draft} setDraft={setDraft} />
      <div className="flex items-center justify-between pt-4">
        <button onClick={onDelete} className="text-red-300 text-sm px-3 py-1.5 rounded hover:bg-red-500/10">🗑️ Delete</button>
        <div className="flex gap-2">
          <button onClick={onClose} className="px-3 py-1.5 text-sm text-text-muted">Cancel</button>
          <button onClick={() => onSave(draft)} className="px-4 py-1.5 text-sm bg-gradient-to-br from-primary-light to-blue-600 text-white rounded-md active:scale-95 transition-transform">Save</button>
        </div>
      </div>
    </Modal>
  );
}

function MetaFields({ draft, setDraft }: { draft: Draft; setDraft: (d: Draft | ((p: Draft) => Draft)) => void }) {
  const presetActive = PRESET_CATEGORIES.includes(draft.category.trim().toLowerCase());
  return (
    <div className="space-y-3">
      <label className="block">
        <span className="text-[10px] uppercase tracking-wide text-text-muted">Caption</span>
        <textarea
          value={draft.caption}
          onChange={(e) => setDraft((d) => ({ ...d, caption: e.target.value }))}
          rows={2}
          placeholder="e.g. Tokyo metro map — transfer at Shinjuku"
          className="w-full bg-surface-light rounded-lg px-3 py-2 text-sm mt-0.5 outline-none focus:ring-2 focus:ring-primary-light/50 resize-none"
        />
      </label>

      <div>
        <span className="text-[10px] uppercase tracking-wide text-text-muted">Category</span>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {PRESET_CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setDraft((d) => ({ ...d, category: d.category.trim().toLowerCase() === c ? '' : c }))}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                draft.category.trim().toLowerCase() === c ? categoryStyle(c) + ' ring-1 ring-white/30' : 'bg-surface text-text-muted border-surface-light'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <input
          type="text"
          value={presetActive ? '' : draft.category}
          onChange={(e) => setDraft((d) => ({ ...d, category: e.target.value }))}
          placeholder="or a custom label…"
          className="w-full bg-surface-light rounded-lg px-3 py-2 text-sm mt-2 outline-none focus:ring-2 focus:ring-primary-light/50"
        />
      </div>

      <label className="block">
        <span className="text-[10px] uppercase tracking-wide text-text-muted">Link (optional)</span>
        <input
          type="url"
          inputMode="url"
          value={draft.link}
          onChange={(e) => setDraft((d) => ({ ...d, link: e.target.value }))}
          placeholder="https://instagram.com/p/…"
          className="w-full bg-surface-light rounded-lg px-3 py-2 text-sm mt-0.5 outline-none focus:ring-2 focus:ring-primary-light/50"
        />
      </label>
    </div>
  );
}

function SourceButton({ icon, label, onClick }: { icon: string; label: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 py-4 rounded-xl bg-surface-light hover:bg-surface-light/70 active:scale-95 transition-transform">
      <span className="text-2xl">{icon}</span>
      <span className="text-xs text-text-muted">{label}</span>
    </button>
  );
}

// ---------------- Lightbox (full image view) ----------------
function Lightbox({ bookmark, onClose, onEdit, onDelete }: { bookmark: LocalBookmark; onClose: () => void; onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/90 z-[60] flex flex-col" onClick={onClose}>
      <div className="flex-1 flex items-center justify-center p-4 min-h-0" onClick={onClose}>
        <img
          src={bookmark.localPreview || bookmark.image_url}
          alt={bookmark.caption || ''}
          className="max-w-full max-h-full object-contain"
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <div className="bg-surface/95 backdrop-blur p-4 pb-6 space-y-2" onClick={(e) => e.stopPropagation()}>
        {bookmark.category && (
          <span className={`inline-block text-[10px] px-2 py-0.5 rounded-full border ${categoryStyle(bookmark.category)}`}>{bookmark.category}</span>
        )}
        {bookmark.caption && <p className="text-sm">{bookmark.caption}</p>}
        <div className="flex items-center gap-3 pt-1">
          {bookmark.link && (
            <a href={bookmark.link} target="_blank" rel="noopener noreferrer" className="text-sm text-primary-light underline truncate">🔗 Open link</a>
          )}
          <div className="flex-1" />
          <button onClick={onEdit} className="text-sm px-3 py-1.5 rounded hover:bg-surface-light">✏️ Edit</button>
          <button onClick={onDelete} className="text-sm px-3 py-1.5 rounded text-red-300 hover:bg-red-500/10">🗑️ Delete</button>
        </div>
      </div>
    </div>
  );
}

// ---------------- Shared modal shell ----------------
function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="bg-surface rounded-2xl w-full max-w-md p-4 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
