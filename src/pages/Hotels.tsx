import { useTripData } from '../context/TripDataContext';
import HotelCard from '../components/HotelCard';

export default function Hotels() {
  const { data } = useTripData();
  if (!data) return null;

  // Group hotels by city
  const grouped = data.hotels.reduce<Record<string, typeof data.hotels>>((acc, hotel) => {
    if (!acc[hotel.city]) acc[hotel.city] = [];
    acc[hotel.city].push(hotel);
    return acc;
  }, {});

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hotels</h1>
      {Object.entries(grouped).map(([city, hotels]) => (
        <div key={city} className="mb-6">
          <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider mb-2">
            {city}
          </h2>
          <div className="space-y-3">
            {hotels.map((hotel, i) => (
              <HotelCard key={i} hotel={hotel} />
            ))}
          </div>
        </div>
      ))}
      {data.hotels.length === 0 && (
        <p className="text-text-muted text-center py-8">No hotels added yet</p>
      )}
    </div>
  );
}
