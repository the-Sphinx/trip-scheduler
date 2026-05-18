import { setCache, getCache, getCacheStale } from './cache';

const WEATHER_CACHE_TTL = 1000 * 60 * 60 * 3; // 3 hours

export interface WeatherData {
  date: string;
  temp_min: number;
  temp_max: number;
  description: string;
  icon: string;
  humidity: number;
}

export async function fetchWeather(lat: number, lng: number, date: string): Promise<WeatherData | null> {
  const cacheKey = `weather-${lat}-${lng}-${date}`;
  const cached = getCache<WeatherData>(cacheKey);
  if (cached) return cached;

  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY as string;
  if (!apiKey) return getCacheStale<WeatherData>(cacheKey);

  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&units=metric&appid=${apiKey}`;
    const res = await fetch(url);
    if (!res.ok) return getCacheStale<WeatherData>(cacheKey);

    const data = await res.json();
    // Find forecast closest to the target date
    const targetDate = new Date(date).toISOString().split('T')[0];
    const dayForecasts = data.list?.filter((item: { dt_txt: string }) =>
      item.dt_txt.startsWith(targetDate)
    );

    if (!dayForecasts || dayForecasts.length === 0) return getCacheStale<WeatherData>(cacheKey);

    // Aggregate day's weather
    const temps = dayForecasts.map((f: { main: { temp: number } }) => f.main.temp);
    const midday = dayForecasts[Math.floor(dayForecasts.length / 2)];

    const weather: WeatherData = {
      date: targetDate,
      temp_min: Math.round(Math.min(...temps)),
      temp_max: Math.round(Math.max(...temps)),
      description: midday.weather[0].description,
      icon: midday.weather[0].icon,
      humidity: midday.main.humidity,
    };

    setCache(cacheKey, weather, WEATHER_CACHE_TTL);
    return weather;
  } catch {
    return getCacheStale<WeatherData>(cacheKey);
  }
}
