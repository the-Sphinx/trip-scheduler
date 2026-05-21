import { useState } from 'react';
import type { ScheduleItem } from '../types';
import { useTripData } from '../context/TripDataContext';
import { resolveScheduleItem } from '../services/resolve';

const categoryColors: Record<string, string> = {
  sightseeing: 'bg-blue-500/20 text-blue-400',
  food: 'bg-orange-500/20 text-orange-400',
  transport: 'bg-purple-500/20 text-purple-400',
  shopping: 'bg-pink-500/20 text-pink-400',
  rest: 'bg-green-500/20 text-green-400',
  entertainment: 'bg-yellow-500/20 text-yellow-400',
  other: 'bg-gray-500/20 text-gray-400',
};

const categoryIcons: Record<string, string> = {
  sightseeing: '🏛️',
  food: '🍜',
  transport: '🚆',
  shopping: '🛍️',
  rest: '😴',
  entertainment: '🎭',
  other: '📌',
};

export default function ActivityCard({ item }: { item: ScheduleItem }) {
  const [expanded, setExpanded] = useState(false);
  const { data } = useTripData();
  const colorClass = categoryColors[item.category] || categoryColors.other;
  const icon = categoryIcons[item.category] || categoryIcons.other;
  const resolved = resolveScheduleItem(item, data);
  const thumb = resolved.photo_url;

  return (
    <div
      className={`bg-surface rounded-lg p-3 cursor-pointer transition-all hover:bg-surface-light relative ${thumb && !expanded ? 'min-h-[6.5rem]' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className={`flex items-start gap-3 ${thumb && !expanded ? 'pr-32' : ''}`}>
        {/* Time */}
        <div className="text-xs text-text-muted w-12 flex-shrink-0 pt-0.5">
          <p className="font-medium">{item.time_start}</p>
          {item.time_end && <p>{item.time_end}</p>}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span>{icon}</span>
            <h4 className="font-medium text-sm truncate">{item.activity}</h4>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            {resolved.location_name && (
              <p className="text-text-muted text-xs truncate">📍 {resolved.location_name}</p>
            )}
            <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${colorClass}`}>
              {item.category}
            </span>
          </div>
          {(item.notes || resolved.notes) && (
            <div className="mt-1 space-y-0.5">
              {item.notes && (
                <p className={`text-primary-light/80 text-xs italic ${expanded ? '' : 'line-clamp-2'}`}>{item.notes}</p>
              )}
              {resolved.notes && (
                <p className={`text-primary-light/80 text-xs italic ${expanded ? '' : 'line-clamp-2'}`}>{resolved.notes}</p>
              )}
            </div>
          )}

          {/* Extra info appears below the notes when expanded — same text-xs as notes */}
          {expanded && (resolved.address || resolved.website) && (
            <div className="mt-2 space-y-0.5">
              {resolved.address && (
                <p className="text-text-muted text-xs">🗺️ {resolved.address}</p>
              )}
              {resolved.website && (
                <a
                  href={resolved.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light text-xs hover:underline inline-block"
                  onClick={(e) => e.stopPropagation()}
                >
                  🌐 Website
                </a>
              )}
            </div>
          )}
        </div>

      </div>

      {/* Thumbnail (absolute, doesn't stretch the row) — hidden when expanded */}
      {thumb && !expanded && (
        <img
          src={thumb}
          alt={item.activity}
          className="absolute top-3 right-3 w-28 h-20 rounded-md object-cover"
          loading="lazy"
        />
      )}

      {/* Full-width image at the bottom when expanded */}
      {expanded && thumb && (
        <img
          src={thumb}
          alt={item.activity}
          className="rounded-lg w-full max-h-48 object-cover mt-3"
          loading="lazy"
        />
      )}
    </div>
  );
}
