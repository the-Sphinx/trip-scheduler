import { useTripData } from '../context/TripDataContext';

const transportIcons: Record<string, string> = {
  flight: '✈️',
  train: '🚄',
  bus: '🚌',
  ferry: '⛴️',
  '': '→',
};

export default function Overview() {
  const { data } = useTripData();
  if (!data) return null;

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-1">Japan Trip 2026</h1>
      <p className="text-text-muted text-sm mb-6">Jun 25 – Jul 5 • 4 travelers</p>

      {/* Route visualization */}
      <div className="relative">
        {data.overview.map((stop, i) => {
          const isActive =
            today >= stop.arrival_date && today <= stop.departure_date;
          const isPast = today > stop.departure_date;

          return (
            <div key={i} className="flex items-start mb-2">
              {/* Timeline */}
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    isActive
                      ? 'bg-primary-light border-primary-light'
                      : isPast
                      ? 'bg-text-muted border-text-muted'
                      : 'bg-surface border-surface-light'
                  }`}
                />
                {i < data.overview.length - 1 && (
                  <div className="w-0.5 h-12 bg-surface-light mt-1" />
                )}
              </div>

              {/* City card */}
              <div
                className={`flex-1 rounded-lg p-3 ${
                  isActive ? 'bg-primary/10 border border-primary-light/30' : 'bg-surface'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-base">
                      {stop.city}
                      {stop.country && (
                        <span className="text-text-muted text-sm ml-2">{stop.country}</span>
                      )}
                    </h3>
                    <p className="text-text-muted text-xs mt-0.5">
                      {formatDate(stop.arrival_date)} – {formatDate(stop.departure_date)}
                    </p>
                  </div>
                  {isActive && (
                    <span className="text-xs bg-primary-light/20 text-primary-light px-2 py-0.5 rounded-full">
                      Now
                    </span>
                  )}
                </div>
              </div>

              {/* Transport icon between cities */}
              {i < data.overview.length - 1 && (
                <div className="absolute left-6 ml-0.5" style={{ top: `${i * 72 + 52}px` }}>
                  <span className="text-sm">{transportIcons[stop.transport_type] || '→'}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mt-8">
        <StatCard label="Cities" value={data.overview.length.toString()} />
        <StatCard label="Hotels" value={data.hotels.length.toString()} />
        <StatCard label="Activities" value={data.schedule.length.toString()} />
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface rounded-lg p-3 text-center">
      <p className="text-xl font-bold text-primary-light">{value}</p>
      <p className="text-text-muted text-xs">{label}</p>
    </div>
  );
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}
