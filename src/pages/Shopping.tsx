import { useEffect, useMemo, useRef, useState } from 'react';
import { useTripData } from '../context/TripDataContext';
import type { ShoppingItem } from '../types';
import { appendRow, updateRow, deleteRow as apiDeleteRow } from '../services/write';

type Draft = Omit<ShoppingItem, 'rowIndex'> & { rowIndex?: number };

const empty: Draft = {
  hasBought: false,
  item: '',
  brand: '',
  location: '',
  count: '',
  price: '',
  to: '',
  notes: '',
};

const personColors: Record<string, string> = {
  Erinc: 'bg-blue-500/30 text-blue-200 border-blue-400/30',
  Gokce: 'bg-pink-500/30 text-pink-200 border-pink-400/30',
  Ada: 'bg-amber-500/30 text-amber-200 border-amber-400/30',
  Deniz: 'bg-emerald-500/30 text-emerald-200 border-emerald-400/30',
};
const defaultPersonColor = 'bg-violet-500/30 text-violet-200 border-violet-400/30';

function toRow(d: Draft): (string | number | boolean)[] {
  return [d.hasBought ? 'TRUE' : '', d.item, d.brand, d.location, d.count, d.price, d.to, d.notes];
}

// Sheet stores price in JPY. Display: "<X> TRY (<Y> ¥)".
const YEN_TO_TRY = 0.30;
function formatPrice(raw: string): string {
  const num = parseFloat((raw || '').replace(/[^0-9.]/g, ''));
  if (!num || isNaN(num)) return raw;
  const try_ = Math.round(num * YEN_TO_TRY);
  const yen = Math.round(num);
  return `${try_.toLocaleString()} TRY (${yen.toLocaleString()} ¥)`;
}

// Optimistic UI state — each row is either: synced, pending, or errored.
type LocalRow = ShoppingItem & {
  localId: string; // stable across re-fetches; for new items not yet in sheet
  pending?: boolean;
  error?: string;
  deleted?: boolean;
};

let _idSeq = 0;
const newId = () => `local-${++_idSeq}`;

export default function Shopping() {
  const { data, refresh } = useTripData();
  // Mirror server items into local state so we can do optimistic updates.
  // Key by rowIndex for known rows; locally-added rows get a temp localId
  // and are reconciled by matching item+to on the next refresh.
  const [local, setLocal] = useState<LocalRow[]>([]);
  const localIdByKey = useRef<Map<string, string>>(new Map()); // server key (rowIndex) -> localId

  // Reconcile server data → local state. Keep pending rows that haven't synced.
  useEffect(() => {
    if (!data) return;
    setLocal((prev) => {
      const byRowIdx = new Map(prev.filter((r) => r.rowIndex).map((r) => [r.rowIndex, r]));
      const pending = prev.filter((r) => r.pending || !r.rowIndex);
      const merged: LocalRow[] = data.shopping.map((s) => {
        const existing = byRowIdx.get(s.rowIndex);
        let localId = existing?.localId;
        if (!localId) {
          localId = localIdByKey.current.get(String(s.rowIndex)) || newId();
          localIdByKey.current.set(String(s.rowIndex), localId);
        }
        // If we have a pending update for this row, keep our local values
        if (existing?.pending) return existing;
        return { ...s, localId };
      });
      // Append truly local-only (still-being-created) items
      for (const p of pending) {
        if (!p.rowIndex && !p.deleted) merged.push(p);
      }
      return merged;
    });
  }, [data]);

  const items = local.filter((r) => !r.deleted);
  const total = items.length;
  const bought = items.filter((i) => i.hasBought).length;

  function applyLocal(updater: (rows: LocalRow[]) => LocalRow[]) {
    setLocal((prev) => updater(prev));
  }

  // Fire-and-forget write; on failure mark errored and offer retry.
  function fireUpdate(row: LocalRow) {
    applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? { ...r, pending: true, error: undefined } : r)));
    updateRow('Shopping', row.rowIndex!, toRow(row))
      .then(() => {
        applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? { ...r, pending: false } : r)));
        // background refresh
        refresh();
      })
      .catch((e) => {
        applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? { ...r, pending: false, error: String(e.message || e) } : r)));
      });
  }

  function fireAppend(draft: Draft) {
    const localId = newId();
    const tempRow: LocalRow = { ...draft, localId, rowIndex: 0, pending: true };
    applyLocal((rows) => [...rows, tempRow]);
    appendRow('Shopping', toRow(draft))
      .then((res) => {
        applyLocal((rows) =>
          rows.map((r) => (r.localId === localId ? { ...r, rowIndex: res.rowIndex || 0, pending: false } : r))
        );
        refresh();
      })
      .catch((e) => {
        applyLocal((rows) => rows.map((r) => (r.localId === localId ? { ...r, pending: false, error: String(e.message || e) } : r)));
      });
  }

  function fireDelete(row: LocalRow) {
    applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? { ...r, pending: true, deleted: true } : r)));
    apiDeleteRow('Shopping', row.rowIndex!)
      .then(() => {
        applyLocal((rows) => rows.filter((r) => r.localId !== row.localId));
        refresh();
      })
      .catch((e) => {
        applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? { ...r, pending: false, deleted: false, error: String(e.message || e) } : r)));
      });
  }

  function toggleBought(row: LocalRow) {
    const next = { ...row, hasBought: !row.hasBought };
    applyLocal((rows) => rows.map((r) => (r.localId === row.localId ? next : r)));
    fireUpdate(next);
  }

  // ----- Edit / add modal -----
  const [editing, setEditing] = useState<Draft | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<LocalRow | null>(null);

  function openAdd() {
    setEditing({ ...empty });
    setEditingId(null);
  }
  function openEdit(row: LocalRow) {
    setEditing({ ...row });
    setEditingId(row.localId);
  }
  function saveEdit() {
    if (!editing) return;
    if (editingId) {
      const row = local.find((r) => r.localId === editingId);
      if (!row) return;
      const next: LocalRow = { ...row, ...editing };
      applyLocal((rows) => rows.map((r) => (r.localId === editingId ? next : r)));
      if (row.rowIndex) fireUpdate(next);
    } else {
      fireAppend(editing);
    }
    setEditing(null);
    setEditingId(null);
  }

  // Sort: unbought first, then by item name; bought sink to bottom
  const sorted = useMemo(
    () =>
      [...items].sort((a, b) => {
        if (a.hasBought !== b.hasBought) return a.hasBought ? 1 : -1;
        return (a.item || '').localeCompare(b.item || '');
      }),
    [items]
  );

  return (
    <div className="p-4 pb-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h1 className="text-2xl font-bold leading-tight">Shopping</h1>
          <p className="text-xs text-text-muted mt-0.5">
            {bought}/{total} bought
          </p>
        </div>
        <button
          onClick={openAdd}
          className="bg-gradient-to-br from-primary-light to-blue-600 text-white text-sm font-medium rounded-full px-4 py-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-transform"
        >
          + Add item
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-surface-light rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all"
          style={{ width: total ? `${(bought / total) * 100}%` : '0%' }}
        />
      </div>

      {/* List */}
      <div className="space-y-2">
        {sorted.map((row) => {
          const colorClass = personColors[row.to.trim()] || defaultPersonColor;
          const details: Array<[string, React.ReactNode]> = [];
          if (row.brand) details.push(['Brand', row.brand]);
          if (row.location) details.push(['Where', <><span>📍 </span>{row.location}</>]);
          if (row.count) details.push(['Count', `×${row.count}`]);
          if (row.price) details.push(['Price', formatPrice(row.price)]);
          if (row.notes) details.push(['Notes', row.notes]);
          return (
            <div
              key={row.localId}
              className={`group bg-surface rounded-xl p-3 transition-all border ${
                row.error ? 'border-red-500/40' : 'border-transparent'
              } ${row.hasBought ? 'opacity-60' : ''}`}
            >
              {/* Top row: checkbox + title + person + actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleBought(row)}
                  aria-label={row.hasBought ? 'Mark not bought' : 'Mark bought'}
                  className={`w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all ${
                    row.hasBought
                      ? 'bg-gradient-to-br from-emerald-500 to-teal-400 text-white'
                      : 'bg-surface-light border-2 border-text-muted/30 hover:border-primary-light'
                  }`}
                >
                  {row.hasBought && <span className="text-xs">✓</span>}
                </button>

                <button onClick={() => openEdit(row)} className="flex-1 min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <h3 className={`font-semibold text-base truncate ${row.hasBought ? 'line-through text-text-muted' : ''}`}>
                      {row.item || <span className="text-text-muted italic">(no name)</span>}
                    </h3>
                    {row.pending && <span className="text-[10px] text-text-muted animate-pulse">syncing…</span>}
                    {row.error && <span className="text-[10px] text-red-300" title={row.error}>⚠</span>}
                  </div>
                </button>

                {row.to && (
                  <span className={`text-xs px-2 py-0.5 rounded-full border ${colorClass} flex-shrink-0`}>
                    for {row.to}
                  </span>
                )}

                <div className="flex items-center gap-0.5 flex-shrink-0">
                  <button
                    onClick={() => openEdit(row)}
                    className="w-8 h-8 rounded-full hover:bg-surface-light flex items-center justify-center text-text-muted"
                    aria-label="Edit"
                  >✏️</button>
                  <button
                    onClick={() => setConfirmDelete(row)}
                    className="w-8 h-8 rounded-full hover:bg-red-500/20 flex items-center justify-center text-text-muted hover:text-red-300"
                    aria-label="Delete"
                  >🗑️</button>
                </div>
              </div>

              {/* Details grid */}
              {details.length > 0 && (
                <dl className="mt-2 ml-10 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
                  {details.map(([label, value]) => (
                    <div key={label} className="flex gap-2">
                      <dt className="text-[10px] uppercase tracking-wider text-text-muted/70 w-14 flex-shrink-0 pt-0.5">
                        {label}
                      </dt>
                      <dd className="text-text flex-1 min-w-0 break-words">{value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </div>
          );
        })}

        {sorted.length === 0 && (
          <div className="text-center py-12 text-text-muted text-sm">
            <p className="text-3xl mb-2">🛍️</p>
            <p>Nothing on the list yet</p>
            <p className="text-xs mt-1">Tap “+ Add item” to get started</p>
          </div>
        )}
      </div>

      {/* Edit / Add modal */}
      {editing && (
        <Modal onClose={() => { setEditing(null); setEditingId(null); }}>
          <h2 className="text-lg font-semibold mb-3">{editingId ? 'Edit item' : 'Add item'}</h2>
          <div className="space-y-2">
            <Field label="Item" value={editing.item} onChange={(v) => setEditing({ ...editing, item: v })} autoFocus />
            <div className="grid grid-cols-2 gap-2">
              <Field label="Brand" value={editing.brand} onChange={(v) => setEditing({ ...editing, brand: v })} />
              <Field label="Location" value={editing.location} onChange={(v) => setEditing({ ...editing, location: v })} />
              <Field label="Count" value={editing.count} onChange={(v) => setEditing({ ...editing, count: v })} />
              <Field label="Price" value={editing.price} onChange={(v) => setEditing({ ...editing, price: v })} />
              <Field label="For" value={editing.to} onChange={(v) => setEditing({ ...editing, to: v })} />
            </div>
            <Field label="Notes" value={editing.notes} onChange={(v) => setEditing({ ...editing, notes: v })} />
            <label className="flex items-center gap-2 text-sm pt-1">
              <input
                type="checkbox"
                checked={editing.hasBought}
                onChange={(e) => setEditing({ ...editing, hasBought: e.target.checked })}
                className="w-4 h-4 accent-emerald-500"
              />
              Already bought
            </label>
          </div>
          <div className="flex items-center justify-between gap-2 pt-4">
            {editingId ? (
              <button
                onClick={() => {
                  const row = local.find((r) => r.localId === editingId);
                  if (row) setConfirmDelete(row);
                }}
                className="text-red-300 text-sm px-3 py-1.5 rounded hover:bg-red-500/10"
              >
                🗑️ Delete
              </button>
            ) : <span />}
            <div className="flex gap-2">
              <button
                onClick={() => { setEditing(null); setEditingId(null); }}
                className="px-3 py-1.5 text-sm text-text-muted"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                disabled={!editing.item.trim()}
                className="px-4 py-1.5 text-sm bg-gradient-to-br from-primary-light to-blue-600 text-white rounded-md disabled:opacity-40 active:scale-95 transition-transform"
              >
                Save
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(null)}>
          <h2 className="text-lg font-semibold mb-2">Delete this item?</h2>
          <p className="text-sm text-text-muted mb-4">
            “{confirmDelete.item || '(no name)'}” will be removed from the list.
          </p>
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setConfirmDelete(null)}
              className="px-3 py-1.5 text-sm text-text-muted"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                const row = confirmDelete;
                setConfirmDelete(null);
                setEditing(null);
                setEditingId(null);
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

function Modal({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-surface rounded-2xl w-full max-w-md p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  autoFocus,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  autoFocus?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-wide text-text-muted">{label}</span>
      <input
        type="text"
        autoFocus={autoFocus}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-surface-light rounded-lg px-3 py-2 text-sm mt-0.5 outline-none focus:ring-2 focus:ring-primary-light/50"
      />
    </label>
  );
}
