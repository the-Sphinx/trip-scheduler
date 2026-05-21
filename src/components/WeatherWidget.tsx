import { useEffect, useState } from 'react';
import { fetchWeather, describeWeather, type WeatherData } from '../services/weather';
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
  const { emoji, label } = describeWeather(weather.weather_code);
  const typical = weather.source === 'climatology';

  return (
    <div className="flex items-center gap-1.5 text-xs text-text-muted" title={`${label}${typical ? ' (typical for this date — based on last year)' : ''}`}>
      <span className="text-lg leading-none">{emoji}</span>
      <span>
        {weather.temp_min}°–{weather.temp_max}°C
      </span>
      {weather.precipitation_mm > 0 && (
        <span className="text-blue-400">💧{weather.precipitation_mm}mm</span>
      )}
      {typical && <span className="text-[10px] opacity-70">~typical</span>}
    </div>
  );
}
