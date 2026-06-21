import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useTripData } from '../context/TripDataContext';

interface Result {
  icon: string;
  title: string;
  subtitle: string;
  to: string;
}

// Flattens trip data into a searchable list and routes to the right place.
function buildResults(data: ReturnType<typeof useTripData>['data']): Result[] {
  if (!data) return [];
  const out: Result[] = [];
  for (const a of data.attractions) {
    out.push({ icon: '⛩️', title: a.name, subtitle: [a.city, a.category].filter(Boolean).join(' · ') || 'Attraction', to: a.slug ? `/attractions/${a.slug}` : '/attractions' });
  }
  for (const r of data.restaurants) {
    out.push({ icon: '🍜', title: r.name, subtitle: [r.city, r.cuisine].filter(Boolean).join(' · ') || 'Restaurant', to: '/restaurants' });
  }
  for (const h of data.hotels) {
    out.push({ icon: '🏨', title: h.name, subtitle: [h.city, h.check_in_date].filter(Boolean).join(' · ') || 'Hotel', to: '/hotels' });
  }
  for (const t of data.transport) {
    out.push({ icon: t.type === 'flight' ? '✈️' : t.type === 'train' ? '🚄' : '🚌', title: t.name || `${t.from_city} → ${t.to_city}`, subtitle: [t.date, `${t.from_city} → ${t.to_city}`].filter(Boolean).join(' · '), to: '/transport' });
  }
  for (const s of data.schedule) {
    out.push({ icon: '📅', title: s.activity, subtitle: [s.date, s.time_start].filter(Boolean).join(' · '), to: `/schedule/${s.date}` });
  }
  for (const b of data.bookmarks) {
    if (b.caption) out.push({ icon: '🔖', title: b.caption, subtitle: b.category || 'Bookmark', to: '/bookmarks' });
  }
  return out;
}

export default function SearchOverlay({ onClose }: { onClose: () => void }) {
  const { data } = useTripData();
  const navigate = useNavigate();
  const [q, setQ] = useState('');
  const all = useMemo(() => buildResults(data), [data]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return [];
    return all
      .filter((r) => r.title.toLowerCase().includes(term) || r.subtitle.toLowerCase().includes(term))
      .slice(0, 40);
  }, [all, q]);

  function go(to: string) {
    onClose();
    navigate(to);
  }

  return createPortal(
    <div className="fixed inset-0 z-[70] bg-background flex flex-col">
      <div className="flex items-center gap-2 p-3 border-b border-surface-light">
        <span className="text-text-muted">🔍</span>
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search attractions, food, hotels, days…"
          className="flex-1 bg-transparent outline-none text-base"
        />
        <button onClick={onClose} className="text-text-muted text-sm px-3 py-1.5 rounded hover:bg-surface-light">Cancel</button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {q.trim() && results.length === 0 && (
          <p className="text-center text-text-muted text-sm py-12">No matches for “{q.trim()}”</p>
        )}
        {results.map((r, i) => (
          <button
            key={`${r.to}-${i}`}
            onClick={() => go(r.to)}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-surface border-b border-surface-light/40"
          >
            <span className="text-lg flex-shrink-0">{r.icon}</span>
            <span className="min-w-0">
              <span className="block text-sm truncate">{r.title}</span>
              {r.subtitle && <span className="block text-xs text-text-muted truncate">{r.subtitle}</span>}
            </span>
          </button>
        ))}
      </div>
    </div>,
    document.body
  );
}
