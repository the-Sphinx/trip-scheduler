import { useEffect, useState } from 'react';
import { fetchWeather, type WeatherData } from '../services/weather';
import type { DaySchedule } from '../types';

export default function WeatherWidget({ day }: { day: DaySchedule }) {
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Use first activity's location or a default for the city
    const loc = day.items.find((i) => i.lat && i.lng);
    const lat = loc?.lat || day.hotel?.lat || 0;
    const lng = loc?.lng || day.hotel?.lng || 0;
    if (!lat || !lng) return;

    fetchWeather(lat, lng, day.date).then(setWeather);
  }, [day]);

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
