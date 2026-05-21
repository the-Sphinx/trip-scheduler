import { setCache, getCache, getCacheStale } from './cache';

const WEATHER_CACHE_TTL = 1000 * 60 * 60 * 6; // 6 hours
const FORECAST_HORIZON_DAYS = 16;

export interface WeatherData {
  date: string;
  temp_min: number;
  temp_max: number;
  precipitation_mm: number;
  weather_code: number;
  // 'forecast' = real near-term forecast; 'climatology' = same date last year as a proxy.
  source: 'forecast' | 'climatology';
}

// Open-Meteo WMO weather code → emoji + short label
const codeMap: Record<number, { emoji: string; label: string }> = {
  0: { emoji: '☀️', label: 'Clear' },
  1: { emoji: '🌤️', label: 'Mostly clear' },
  2: { emoji: '⛅', label: 'Partly cloudy' },
  3: { emoji: '☁️', label: 'Overcast' },
  45: { emoji: '🌫️', label: 'Fog' },
  48: { emoji: '🌫️', label: 'Rime fog' },
  51: { emoji: '🌦️', label: 'Light drizzle' },
  53: { emoji: '🌦️', label: 'Drizzle' },
  55: { emoji: '🌦️', label: 'Heavy drizzle' },
  56: { emoji: '🌨️', label: 'Freezing drizzle' },
  57: { emoji: '🌨️', label: 'Freezing drizzle' },
  61: { emoji: '🌧️', label: 'Light rain' },
  63: { emoji: '🌧️', label: 'Rain' },
  65: { emoji: '🌧️', label: 'Heavy rain' },
  66: { emoji: '🌨️', label: 'Freezing rain' },
  67: { emoji: '🌨️', label: 'Freezing rain' },
  71: { emoji: '🌨️', label: 'Light snow' },
  73: { emoji: '🌨️', label: 'Snow' },
  75: { emoji: '❄️', label: 'Heavy snow' },
  77: { emoji: '❄️', label: 'Snow grains' },
  80: { emoji: '🌦️', label: 'Rain showers' },
  81: { emoji: '🌧️', label: 'Rain showers' },
  82: { emoji: '⛈️', label: 'Violent showers' },
  85: { emoji: '🌨️', label: 'Snow showers' },
  86: { emoji: '❄️', label: 'Heavy snow showers' },
  95: { emoji: '⛈️', label: 'Thunderstorm' },
  96: { emoji: '⛈️', label: 'Thunderstorm w/ hail' },
  99: { emoji: '⛈️', label: 'Severe thunderstorm' },
};

export function describeWeather(code: number) {
  return codeMap[code] || { emoji: '🌡️', label: 'Weather' };
}

function daysAhead(target: string): number {
  const t = new Date(target + 'T00:00:00').getTime();
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.round((t - now.getTime()) / (1000 * 60 * 60 * 24));
}

function shiftYear(date: string, years: number): string {
  const d = new Date(date + 'T00:00:00');
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString().split('T')[0];
}

async function callOpenMeteo(url: string): Promise<WeatherData['weather_code'] extends infer _ ? any : never> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`open-meteo ${res.status}`);
  return res.json();
}

export async function fetchWeather(lat: number, lng: number, date: string): Promise<WeatherData | null> {
  const cacheKey = `weather-${lat.toFixed(3)}-${lng.toFixed(3)}-${date}`;
  const cached = getCache<WeatherData>(cacheKey);
  if (cached) return cached;

  try {
    const ahead = daysAhead(date);
    const isForecast = ahead >= 0 && ahead <= FORECAST_HORIZON_DAYS;

    let lookupDate = date;
    let base = 'https://api.open-meteo.com/v1/forecast';
    if (!isForecast) {
      base = 'https://archive-api.open-meteo.com/v1/archive';
      lookupDate = shiftYear(date, -1); // same date last year
    }

    const url = `${base}?latitude=${lat}&longitude=${lng}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code&timezone=auto&start_date=${lookupDate}&end_date=${lookupDate}`;
    const data = await callOpenMeteo(url);

    const daily = data.daily;
    if (!daily || !daily.time || daily.time.length === 0) return getCacheStale<WeatherData>(cacheKey);

    const weather: WeatherData = {
      date,
      temp_min: Math.round(daily.temperature_2m_min[0]),
      temp_max: Math.round(daily.temperature_2m_max[0]),
      precipitation_mm: Math.round(daily.precipitation_sum[0] ?? 0),
      weather_code: daily.weather_code[0] ?? 0,
      source: isForecast ? 'forecast' : 'climatology',
    };

    setCache(cacheKey, weather, WEATHER_CACHE_TTL);
    return weather;
  } catch {
    return getCacheStale<WeatherData>(cacheKey);
  }
}
