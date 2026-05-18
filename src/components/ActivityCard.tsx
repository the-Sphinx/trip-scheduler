import { useState } from 'react';
import type { ScheduleItem } from '../types';
import { useTripData } from '../context/TripDataContext';

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

function findThumbnail(item: ScheduleItem, data: ReturnType<typeof useTripData>['data']): string {
  if (item.photo_url) return item.photo_url;
  if (!data) return '';
  const hay = `${item.activity} ${item.location_name}`.toLowerCase();
  const match = (name: string) => name && hay.includes(name.toLowerCase());
  const a = data.attractions.find((x) => match(x.name));
  if (a?.photo_url) return a.photo_url;
  const h = data.hotels.find((x) => match(x.name));
  if (h?.photo_url) return h.photo_url;
  return '';
}

export default function ActivityCard({ item }: { item: ScheduleItem }) {
  const [expanded, setExpanded] = useState(false);
  const { data } = useTripData();
  const colorClass = categoryColors[item.category] || categoryColors.other;
  const icon = categoryIcons[item.category] || categoryIcons.other;
  const thumb = findThumbnail(item, data);

  return (
    <div
      className={`bg-surface rounded-lg p-3 cursor-pointer transition-all hover:bg-surface-light relative ${thumb ? 'min-h-[6.5rem]' : ''}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-start gap-3 pr-32">
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
            {item.location_name && (
              <p className="text-text-muted text-xs truncate">📍 {item.location_name}</p>
            )}
            <span className={`inline-block text-[10px] px-1.5 py-0.5 rounded-full flex-shrink-0 ${colorClass}`}>
              {item.category}
            </span>
          </div>
          {!expanded && item.notes && (
            <p className="text-primary-light/80 text-xs mt-1 line-clamp-2 italic">{item.notes}</p>
          )}
        </div>

      </div>

      {/* Thumbnail (absolute, doesn't stretch the row) */}
      {thumb && (
        <img
          src={thumb}
          alt={item.activity}
          className="absolute top-3 right-3 w-28 h-20 rounded-md object-cover"
          loading="lazy"
        />
      )}

      {/* Expanded details */}
      {expanded && (
        <div className="mt-3 ml-15 space-y-2 text-sm border-t border-surface-light pt-3">
          {item.address && (
            <p className="text-text-muted">🗺️ {item.address}</p>
          )}
          {item.notes && <p>{item.notes}</p>}
          {item.links && (
            <div className="flex flex-wrap gap-2">
              {item.links.split(',').map((link, i) => (
                <a
                  key={i}
                  href={link.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light text-xs hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  🔗 Link {i + 1}
                </a>
              ))}
            </div>
          )}
          {item.photo_url && (
            <img
              src={item.photo_url}
              alt={item.activity}
              className="rounded-lg w-full max-h-48 object-cover mt-2"
              loading="lazy"
            />
          )}
        </div>
      )}
    </div>
  );
}
