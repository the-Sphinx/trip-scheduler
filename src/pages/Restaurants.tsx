import { useState } from 'react';
import { useTripData } from '../context/TripDataContext';
import type { Restaurant } from '../types';

export default function Restaurants() {
  const { data } = useTripData();
  const [filterCity, setFilterCity] = useState('all');
  const [filterCuisine, setFilterCuisine] = useState('all');

  if (!data) return null;

  const cities = [...new Set(data.restaurants.map((r) => r.city))].filter(Boolean);
  const cuisines = [...new Set(data.restaurants.map((r) => r.cuisine))].filter(Boolean);

  const filtered = data.restaurants.filter((r) => {
    if (filterCity !== 'all' && r.city !== filterCity) return false;
    if (filterCuisine !== 'all' && r.cuisine !== filterCuisine) return false;
    return true;
  });

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>

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
          value={filterCuisine}
          onChange={(e) => setFilterCuisine(e.target.value)}
          className="bg-surface border border-surface-light rounded-lg px-3 py-1.5 text-sm text-text"
        >
          <option value="all">All Cuisines</option>
          {cuisines.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Restaurant cards */}
      <div className="space-y-3">
        {filtered.map((restaurant, i) => (
          <RestaurantCard key={i} restaurant={restaurant} />
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-text-muted text-center py-8">No restaurants match filters</p>
      )}
    </div>
  );
}

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="bg-surface rounded-lg overflow-hidden cursor-pointer"
      onClick={() => setExpanded(!expanded)}
    >
      {/* Photo */}
      {restaurant.photo_url && (
        <img
          src={restaurant.photo_url}
          alt={restaurant.name}
          className="w-full h-32 object-cover"
          loading="lazy"
        />
      )}

      <div className="p-3">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold">{restaurant.name}</h3>
            <p className="text-text-muted text-xs">
              {restaurant.city}
              {restaurant.cuisine && ` • ${restaurant.cuisine}`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            {restaurant.price_range && (
              <span className="text-xs bg-accent/20 text-accent px-2 py-0.5 rounded-full">
                {restaurant.price_range}
              </span>
            )}
            {restaurant.rating && (
              <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded-full">
                ⭐ {restaurant.rating}
              </span>
            )}
          </div>
        </div>

        {restaurant.reservation_required?.toLowerCase() === 'yes' && (
          <span className="inline-block mt-1.5 text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
            Reservation required
          </span>
        )}

        {expanded && (
          <div className="mt-3 space-y-2 text-sm">
            {restaurant.address && (
              <p className="text-text-muted">📍 {restaurant.address}</p>
            )}
            {restaurant.hours && (
              <p className="text-text-muted">🕐 {restaurant.hours}</p>
            )}
            {restaurant.notes && <p>{restaurant.notes}</p>}
            <div className="flex flex-wrap gap-2">
              {restaurant.reservation_link && (
                <a
                  href={restaurant.reservation_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light text-xs hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  📋 Reserve →
                </a>
              )}
              {restaurant.website && (
                <a
                  href={restaurant.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light text-xs hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  🌐 Website →
                </a>
              )}
              {restaurant.google_maps_link && (
                <a
                  href={restaurant.google_maps_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-light text-xs hover:underline"
                  onClick={(e) => e.stopPropagation()}
                >
                  🗺️ Maps →
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
