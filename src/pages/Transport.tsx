import { useTripData } from '../context/TripDataContext';
import TransportCard from '../components/TransportCard';

export default function TransportPage() {
  const { data } = useTripData();
  if (!data) return null;

  // Sort by date + departure time
  const sorted = [...data.transport].sort((a, b) => {
    const da = `${a.date} ${a.departure_time}`;
    const db = `${b.date} ${b.departure_time}`;
    return da.localeCompare(db);
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Transport</h1>
      <div className="space-y-3">
        {sorted.map((t, i) => (
          <TransportCard key={i} transport={t} />
        ))}
      </div>
      {data.transport.length === 0 && (
        <p className="text-text-muted text-center py-8">No transport details added yet</p>
      )}
    </div>
  );
}
