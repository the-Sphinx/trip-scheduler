import { useState } from 'react';
import { useTripData } from '../context/TripDataContext';
import type { ShoppingItem } from '../types';
import { appendRow, updateRow } from '../services/write';

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

function toRow(d: Draft): (string | number | boolean)[] {
  return [d.hasBought ? 'TRUE' : '', d.item, d.brand, d.location, d.count, d.price, d.to, d.notes];
}

export default function Shopping() {
  const { data, refresh } = useTripData();
  const [editing, setEditing] = useState<Draft | null>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  if (!data) return null;
  const items = data.shopping;

  async function toggleBought(it: ShoppingItem) {
    setBusy(true); setErr(null);
    try {
      const next: Draft = { ...it, hasBought: !it.hasBought };
      await updateRow('Shopping', it.rowIndex, toRow(next));
      await refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Write failed');
    } finally { setBusy(false); }
  }

  async function save() {
    if (!editing) return;
    setBusy(true); setErr(null);
    try {
      if (editing.rowIndex) await updateRow('Shopping', editing.rowIndex, toRow(editing));
      else await appendRow('Shopping', toRow(editing));
      setEditing(null);
      await refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Write failed');
    } finally { setBusy(false); }
  }

  return (
    <div className="p-4 pb-24">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Shopping</h1>
        <button
          onClick={() => setEditing({ ...empty })}
          className="bg-primary-light text-white text-sm rounded-full px-3 py-1.5"
        >
          + Add
        </button>
      </div>

      {err && (
        <div className="bg-red-500/20 text-red-300 text-sm rounded-lg p-2 mb-3">{err}</div>
      )}

      <div className="space-y-2">
        {items.map((it) => (
          <div
            key={it.rowIndex}
            className="bg-surface rounded-lg p-3 flex items-center gap-3"
          >
            <input
              type="checkbox"
              checked={it.hasBought}
              disabled={busy}
              onChange={() => toggleBought(it)}
              className="w-5 h-5 flex-shrink-0 accent-primary-light"
            />
            <div className="flex-1 min-w-0" onClick={() => setEditing(it)}>
              <p className={`font-medium ${it.hasBought ? 'line-through text-text-muted' : ''}`}>
                {it.item || '(no name)'}
              </p>
              <p className="text-xs text-text-muted truncate">
                {[it.brand, it.location, it.count && `×${it.count}`, it.price, it.to && `for ${it.to}`]
                  .filter(Boolean).join(' • ')}
              </p>
            </div>
            <button
              onClick={() => setEditing(it)}
              className="text-text-muted text-sm px-2"
              aria-label="Edit"
            >✏️</button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-text-muted text-center py-8 text-sm">No items yet — tap + Add</p>
        )}
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-4" onClick={() => !busy && setEditing(null)}>
          <div className="bg-surface rounded-xl w-full max-w-md p-4 space-y-3" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold">
              {editing.rowIndex ? 'Edit item' : 'Add item'}
            </h2>
            {(['item', 'brand', 'location', 'count', 'price', 'to', 'notes'] as const).map((k) => (
              <label key={k} className="block">
                <span className="text-xs text-text-muted capitalize">{k}</span>
                <input
                  type="text"
                  value={editing[k]}
                  onChange={(e) => setEditing({ ...editing, [k]: e.target.value })}
                  className="w-full bg-surface-light rounded px-2 py-1.5 text-sm mt-0.5"
                />
              </label>
            ))}
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={editing.hasBought}
                onChange={(e) => setEditing({ ...editing, hasBought: e.target.checked })}
                className="w-4 h-4 accent-primary-light"
              />
              Bought
            </label>
            {err && <div className="text-red-300 text-xs">{err}</div>}
            <div className="flex gap-2 justify-end pt-1">
              <button
                onClick={() => setEditing(null)}
                disabled={busy}
                className="px-3 py-1.5 text-sm text-text-muted"
              >Cancel</button>
              <button
                onClick={save}
                disabled={busy || !editing.item.trim()}
                className="px-3 py-1.5 text-sm bg-primary-light text-white rounded-md disabled:opacity-50"
              >{busy ? 'Saving…' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
