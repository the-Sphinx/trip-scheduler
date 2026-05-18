import { useState } from 'react';
import { useTripData } from '../context/TripDataContext';
import type { Attraction } from '../types';

export default function Attractions() {
  const { data } = useTripData();
  const [filterCity, setFilterCity] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');

  if (!data) return null;

  const cities = [...new Set(data.attractions.map((a) => a.city))].filter(Boolean);
  const categories = [...new Set(data.attractions.map((a) => a.category))].filter(Boolean);

  // For each attraction, find earliest schedule date+time it appears in.
  // Match if any significant token (≥4 chars) from the attraction's name is in the schedule text.
  const STOP = new Set(['street', 'shrine', 'market', 'bridge', 'taisha', 'grove', 'castle', 'temple', 'museum', 'canal', 'pagoda']);
  const tokens = (s: string): string[] =>
    s.toLowerCase().replace(/[()]/g, ' ').split(/[\s\-/,]+/).filter((t) => t.length >= 4 && !STOP.has(t));
  const padTime = (t: string): string => {
    const m = /^(\d{1,2}):(\d{2})/.exec(t || '');
    return m ? `${m[1].padStart(2, '0')}:${m[2]}` : '99:99';
  };
  const scheduleKey = (a: Attraction): string => {
    const needles = tokens(a.name);
    if (needles.length === 0) return '￿';
    let best = '';
    for (const s of data.schedule) {
      const hay = s.activity.toLowerCase();
      if (!needles.some((n) => hay.includes(n))) continue;
      const key = `${s.date} ${padTime(s.time_start)}`;
      if (!best || key < best) best = key;
    }
    return best || '￿';
  };

  const sorted = [...data.attractions].sort((a, b) => {
    const ka = scheduleKey(a);
    const kb = scheduleKey(b);
    if (ka !== kb) return ka < kb ? -1 : 1;
    return a.name.localeCompare(b.name);
  });

  const filtered = sorted.filter((a) => {
    if (filterCity !== 'all' && a.city !== filterCity) return false;
    if (filterCategory !== 'all' && a.category !== filterCategory) return false;
    return true;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Attractions</h1>

      {/* Filters */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        <select
          value={filterCity}
          onChange={(e) => setFilterCity(e.target.value)}
          className="bg-surface border border-surface-light rounded-lg px-3 py-1.5 text-sm text-text"
        >
          <option value="all">All Cities</option>
          {cities.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="bg-surface border border-surface-light rounded-lg px-3 py-1.5 text-sm text-text"
        >
          <option value="all">All Categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Attraction cards */}
      <div className="space-y-3">
        {filtered.map((attraction, i) => (
          <AttractionCard key={i} attraction={attraction} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-text-muted text-center py-8">No attractions match filters</p>
      )}
    </div>
  );
}

function AttractionCard({ attraction }: { attraction: Attraction }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-surface rounded-lg overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Photo */}
      {attraction.photo_url && (
        <img
          src={attraction.photo_url}
          alt={attraction.name}
          className="w-full h-32 object-cover"
          loading="lazy"
        />
      )}

      <div className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{attraction.name}</h3>
            <p className="text-text-muted text-xs">
              {attraction.city}
              {attraction.category && ` • ${attraction.category}`}
            </p>
          </div>
          {attraction.price && (
            <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
              {attraction.price}
            </span>
          )}
        </div>

        {expanded && (
          <div className="mt-3 space-y-2 text-sm">
            {attraction.address && (
              <p className="text-text-muted">📍 {attraction.address}</p>
            )}
            {attraction.hours && (
              <p className="text-text-muted">🕐 {attraction.hours}</p>
            )}
            {attraction.notes && <p>{attraction.notes}</p>}
            {attraction.website && (
              <a
                href={attraction.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-light hover:underline inline-block"
                onClick={(e) => e.stopPropagation()}
              >
                Visit website →
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
