import { useEffect, useState } from 'react';
import { fetchWeather, type WeatherData } from '../services/weather';
import type { DaySchedule } from '../types';
import { useTripData } from '../context/TripDataContext';
import { resolveScheduleItem } from '../services/resolve';

export default function WeatherWidget({ day }: { day: DaySchedule }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const { data } = useTripData();

  useEffect(() => {
    // Pick coords from the first schedule item that resolves to coords; fall back to the day's hotel.
    let lat = 0, lng = 0;
    for (const item of day.items) {
      const r = resolveScheduleItem(item, data);
      if (r.lat && r.lng) { lat = r.lat; lng = r.lng; break; }
    }
    if (!lat || !lng) {
      lat = day.hotel?.lat || 0;
      lng = day.hotel?.lng || 0;
    }
    if (!lat || !lng) return;

    fetchWeather(lat, lng, day.date).then(setWeather);
  }, [day, data]);

  if (!weather) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs text-text-muted">
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}.png`}
        alt={weather.description}
        className="w-8 h-8"
      />
      <span>
        {weather.temp_min}°–{weather.temp_max}°C
      </span>
    </div>
  );
}
