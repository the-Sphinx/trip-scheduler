import type { Hotel } from '../types';
import ImageGallery from './ImageGallery';

export default function HotelCard({ hotel, compact }: { hotel: Hotel; compact?: boolean }) {
  const showThumb = !!hotel.photo_url;
  return (
    <div
      className={`bg-surface rounded-lg p-3 relative ${
        showThumb ? (compact ? 'min-h-[6.5rem] pr-32' : 'min-h-[6.5rem] pr-32') : ''
      }`}
    >
      <div>
        <h3 className="font-semibold text-sm">{hotel.name}</h3>
        <p className="text-text-muted text-xs">
          {hotel.city}
          {hotel.room_type && ` • ${hotel.room_type}`}
        </p>
      </div>

      {!compact && (
        <div className="mt-2 space-y-1 text-sm">
          <p className="text-text-muted">📍 {hotel.address}</p>
          <p className="text-text-muted">
            📅 {formatDate(hotel.check_in_date)} → {formatDate(hotel.check_out_date)}
            {hotel.check_in_time && ` (check-in: ${hotel.check_in_time})`}
          </p>
          {hotel.phone && <p className="text-text-muted">📞 {hotel.phone}</p>}
          {hotel.price && (
            <p className="text-text-muted">💰 {hotel.price} {hotel.price_currency}</p>
          )}
          {hotel.website && (
            <a
              href={hotel.website}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-light text-xs hover:underline inline-block"
            >
              Website →
            </a>
          )}
          {hotel.notes && <p className="text-xs mt-1">{hotel.notes}</p>}
          {hotel.confirmation_no && (
            <p className="text-text-muted">
              🎫 <span className="font-mono">{hotel.confirmation_no}</span>
            </p>
          )}
        </div>
      )}

      {compact && (
        <div className="mt-1 text-xs text-text-muted">
          <p>📍 {hotel.address}</p>
          {hotel.check_in_time && <p>Check-in: {hotel.check_in_time}</p>}
          {hotel.confirmation_no && (
            <p>🎫 <span className="font-mono">{hotel.confirmation_no}</span></p>
          )}
        </div>
      )}

      {showThumb && (
        <img
          src={hotel.photo_url}
          alt={hotel.name}
          className="absolute top-3 right-3 w-28 h-20 rounded-md object-cover"
          loading="lazy"
        />
      )}

      {hotel.images?.length > 0 && <ImageGallery images={hotel.images} label="Reservation" />}
    </div>
  );
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
