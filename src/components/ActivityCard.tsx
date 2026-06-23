import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { ScheduleItem } from '../types';
import { useTripData } from '../context/TripDataContext';
import { resolveScheduleItem } from '../services/resolve';
import { hasGuide } from '../content/attractions';
import ImageGallery from './ImageGallery';

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

  // Slug of the linked attraction's guide, if any — shown as a link in the
  // expanded view (clicking the card still just expands/collapses).
  const guideSlug = (() => {
    if (item.ref_type !== 'attraction' || !item.ref_key || !data) return '';
    const a = data.attractions.find((x) => x.name.toLowerCase() === item.ref_key.toLowerCase());
    return a?.slug && hasGuide(a.slug) ? a.slug : '';
  })();

  return (
    <div
      className={`bg-surface rounded-lg p-3 cursor-pointer transition-all hover:bg-surface-light relative ${thumb && !expanded ? 'min-h-[6.5rem]' : ''}`}
      onClick={() => setExpanded((v) => !v)}
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
                <p className={`text-blue-200 text-xs italic whitespace-pre-line ${expanded ? '' : 'line-clamp-2'}`}>{item.notes}</p>
              )}
              {resolved.notes && (
                <p className={`text-blue-200 text-xs italic whitespace-pre-line ${expanded ? '' : 'line-clamp-2'}`}>{resolved.notes}</p>
              )}
            </div>
          )}

          {/* Reservation / booking document images for linked hotel/transport */}
          {expanded && resolved.images.length > 0 && (
            <ImageGallery images={resolved.images} label={item.ref_type === 'transport' ? 'Booking docs' : 'Reservation'} />
          )}

          {/* Extra info appears below the notes when expanded — same text-xs as notes */}
          {expanded && (resolved.address || resolved.website || resolved.lat || guideSlug) && (
            <div className="mt-2 space-y-1">
              {resolved.address && (
                <p className="text-text-muted text-xs">🗺️ {resolved.address}</p>
              )}
              <div className="flex flex-wrap gap-2 pt-0.5">
                {guideSlug && (
                  <Link
                    to={`/attractions/${guideSlug}`}
                    onClick={(e) => e.stopPropagation()}
                    className="text-xs px-2 py-1 rounded-full bg-primary-light/20 text-primary-light hover:bg-primary-light/30"
                  >
                    📖 Open guide
                  </Link>
                )}
                {resolved.lat && resolved.lng && (
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${resolved.lat},${resolved.lng}&travelmode=transit`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    🧭 Directions
                  </a>
                )}
                {resolved.website && (
                  <a
                    href={resolved.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs px-2 py-1 rounded-full bg-surface-light text-text hover:bg-surface-light/70"
                    onClick={(e) => e.stopPropagation()}
                  >
                    🌐 Website
                  </a>
                )}
              </div>
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
