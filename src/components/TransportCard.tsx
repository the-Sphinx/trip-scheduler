import type { Transport } from '../types';

const typeIcons: Record<string, string> = {
  flight: '✈️',
  train: '🚄',
  bus: '🚌',
  ferry: '⛴️',
};

export default function TransportCard({ transport }: { transport: Transport }) {
  return (
    <div className="bg-surface rounded-lg p-3">
      <div className="flex items-center gap-3">
        {/* Icon */}
        <div className="text-2xl">{typeIcons[transport.type] || '🚗'}</div>

        {/* Route */}
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm font-medium">
            <span>{transport.from_city}</span>
            <span className="text-text-muted">→</span>
            <span>{transport.to_city}</span>
          </div>
          <p className="text-text-muted text-xs mt-0.5">
            {formatDate(transport.date)} • {transport.departure_time} – {transport.arrival_time}
          </p>
        </div>

        {/* Carrier badge */}
        {transport.carrier && (
          <span className="text-xs bg-surface-light px-2 py-0.5 rounded">
            {transport.carrier}
          </span>
        )}
      </div>

      {/* Details row */}
      <div className="mt-2 flex flex-wrap gap-3 text-xs text-text-muted">
        {transport.booking_ref && (
          <span className="font-mono bg-surface-light px-1.5 py-0.5 rounded">
            Ref: {transport.booking_ref}
          </span>
        )}
        {transport.price && (
          <span>💰 {transport.price} {transport.price_currency}</span>
        )}
        {transport.terminal && <span>Terminal: {transport.terminal}</span>}
        {transport.seat && <span>Seat: {transport.seat}</span>}
      </div>
      {transport.notes && (
        <p className="text-xs text-text-muted mt-2">{transport.notes}</p>
      )}
    </div>
  );
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}
