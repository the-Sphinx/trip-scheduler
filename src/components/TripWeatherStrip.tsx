import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchWeather, describeWeather, type WeatherData } from '../services/weather';
import { useTripData } from '../context/TripDataContext';
import { resolveScheduleItem } from '../services/resolve';
import type { DaySchedule } from '../types';

// Compact horizontal strip — one chip per trip day with emoji + temp range.
export default function TripWeatherStrip({ days }: { days: DaySchedule[] }) {
  const { data } = useTripData();
  const [forecasts, setForecasts] = useState<Record<string, WeatherData | null>>({});

  useEffect(() => {
    if (!data || days.length === 0) return;
    let cancelled = false;
    Promise.all(
      days.map(async (day) => {
        // Pick coords for this day's first item with coords, fall back to hotel.
        let lat = 0, lng = 0;
        for (const item of day.items) {
          const r = resolveScheduleItem(item, data);
          if (r.lat && r.lng) { lat = r.lat; lng = r.lng; break; }
        }
        if (!lat || !lng) { lat = day.hotel?.lat || 0; lng = day.hotel?.lng || 0; }
        if (!lat || !lng) return [day.date, null] as const;
        const w = await fetchWeather(lat, lng, day.date);
        return [day.date, w] as const;
      })
    ).then((entries) => {
      if (cancelled) return;
      setForecasts(Object.fromEntries(entries));
    });
    return () => { cancelled = true; };
  }, [days, data]);

  if (days.length === 0) return null;

  return (
    <div className="mb-5 -mx-4 px-4">
      <p className="text-xs uppercase tracking-wider text-text-muted mb-1.5">Weather</p>
      <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
        {days.map((day) => {
          const w = forecasts[day.date];
          const { emoji, label } = w ? describeWeather(w.weather_code) : { emoji: '·', label: '' };
          const d = new Date(day.date + 'T00:00:00');
          const dayLabel = `${d.toLocaleDateString('en-US', { weekday: 'short' })} ${d.getDate()}`;
          return (
            <Link
              key={day.date}
              to={`/schedule/${day.date}`}
              className="flex-shrink-0 bg-surface rounded-lg px-3 py-2 text-center min-w-[64px] hover:bg-surface-light"
              title={label}
            >
              <p className="text-[10px] text-text-muted leading-tight">{dayLabel}</p>
              <p className="text-lg leading-tight">{emoji}</p>
              {w ? (
                <p className="text-[10px] text-text-muted leading-tight">
                  {w.temp_min}°–{w.temp_max}°
                </p>
              ) : (
                <p className="text-[10px] text-text-muted/50 leading-tight">…</p>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
