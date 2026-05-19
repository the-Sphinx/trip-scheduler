import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { TripData, DaySchedule } from '../types';
import { fetchTripData } from '../services/sheets';

interface TripDataContextType {
  data: TripData | null;
  loading: boolean;
  error: string | null;
  days: DaySchedule[];
  refresh: () => void;
}

const TripDataContext = createContext<TripDataContextType>({
  data: null,
  loading: true,
  error: null,
  days: [],
  refresh: () => {},
});

export function useTripData() {
  return useContext(TripDataContext);
}

function buildDays(data: TripData): DaySchedule[] {
  const dateMap = new Map<string, DaySchedule>();

  // Create entries for all dates from overview
  if (data.overview.length > 0) {
    const startDate = new Date(data.overview[0].arrival_date);
    const endDate = new Date(data.overview[data.overview.length - 1].departure_date);
    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      dateMap.set(dateStr, { date: dateStr, items: [], hotel: null });
    }
  }

  // Also create from schedule items
  for (const item of data.schedule) {
    const dateStr = item.date;
    if (!dateMap.has(dateStr)) {
      dateMap.set(dateStr, { date: dateStr, items: [], hotel: null });
    }
    dateMap.get(dateStr)!.items.push(item);
  }

  // Assign hotels to days
  for (const hotel of data.hotels) {
    const checkIn = new Date(hotel.check_in_date);
    const checkOut = new Date(hotel.check_out_date);
    for (let d = new Date(checkIn); d < checkOut; d.setDate(d.getDate() + 1)) {
      const dateStr = d.toISOString().split('T')[0];
      const day = dateMap.get(dateStr);
      if (day) day.hotel = hotel;
    }
  }

  // Sort items within each day by time_start (HH:MM); empty/invalid sort to end
  const timeKey = (t: string) => {
    const m = /^(\d{1,2}):(\d{2})/.exec(t || '');
    return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : Number.MAX_SAFE_INTEGER;
  };
  for (const day of dateMap.values()) {
    day.items.sort((a, b) => timeKey(a.time_start) - timeKey(b.time_start));
  }

  return Array.from(dateMap.values()).sort((a, b) => a.date.localeCompare(b.date));
}

export function TripDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<TripData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [days, setDays] = useState<DaySchedule[]>([]);

  const load = async (force = false) => {
    // Only flip the loading flag when we have nothing to show. Background
    // refreshes (e.g. after a write) shouldn't blank the page.
    if (!data) setLoading(true);
    setError(null);
    try {
      const tripData = await fetchTripData(force);
      setData(tripData);
      setDays(buildDays(tripData));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load trip data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <TripDataContext.Provider value={{ data, loading, error, days, refresh: () => load(true) }}>
      {children}
    </TripDataContext.Provider>
  );
}
