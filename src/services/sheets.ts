import type { TripData, CityStop, ScheduleItem, Hotel, Transport, Attraction, Restaurant, ShoppingItem, Bookmark } from '../types';
import { setCache, getCache, getCacheStale } from './cache';

const SHEETS_CACHE_KEY = 'sheets-data';
const CACHE_TTL = 1000 * 60 * 30; // 30 minutes

function getEnv() {
  return {
    apiKey: import.meta.env.VITE_GOOGLE_SHEETS_API_KEY as string,
    sheetId: import.meta.env.VITE_GOOGLE_SHEET_ID as string,
  };
}

async function fetchSheet(sheetName: string): Promise<string[][]> {
  const { apiKey, sheetId } = getEnv();
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(sheetName)}?key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch sheet "${sheetName}": ${res.status}`);
  const data = await res.json();
  return data.values || [];
}

function parseRows<T>(rows: string[][], parser: (row: string[], headers: string[]) => T): T[] {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));
  return rows.slice(1).map((row) => parser(row, headers));
}

function col(row: string[], headers: string[], name: string): string {
  const idx = headers.indexOf(name);
  return idx >= 0 ? (row[idx] || '').trim() : '';
}

function num(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

// Parse a pipe-separated list of image URLs from an `images` cell.
function imageList(row: string[], headers: string[]): string[] {
  return col(row, headers, 'images')
    .split('|')
    .map((s) => s.trim())
    .filter(Boolean);
}

function parseOverview(row: string[], headers: string[]): CityStop {
  return {
    city: col(row, headers, 'city'),
    country: col(row, headers, 'country'),
    arrival_date: col(row, headers, 'arrival_date'),
    departure_date: col(row, headers, 'departure_date'),
    transport_type: col(row, headers, 'transport_type') as CityStop['transport_type'],
  };
}

function parseSchedule(row: string[], headers: string[]): ScheduleItem {
  return {
    date: col(row, headers, 'date'),
    time_start: col(row, headers, 'time_start'),
    time_end: col(row, headers, 'time_end'),
    activity: col(row, headers, 'activity'),
    category: (col(row, headers, 'category') || 'other') as ScheduleItem['category'],
    notes: col(row, headers, 'notes'),
    ref_type: (col(row, headers, 'ref_type') || '') as ScheduleItem['ref_type'],
    ref_key: col(row, headers, 'ref_key'),
  };
}

function parseHotel(row: string[], headers: string[]): Hotel {
  return {
    city: col(row, headers, 'city'),
    name: col(row, headers, 'name'),
    address: col(row, headers, 'address'),
    check_in_date: col(row, headers, 'check_in_date'),
    check_out_date: col(row, headers, 'check_out_date'),
    check_in_time: col(row, headers, 'check_in_time'),
    confirmation_no: col(row, headers, 'confirmation_no'),
    phone: col(row, headers, 'phone'),
    website: col(row, headers, 'website'),
    notes: col(row, headers, 'notes'),
    lat: num(col(row, headers, 'lat')),
    lng: num(col(row, headers, 'lng')),
    price: col(row, headers, 'price'),
    price_currency: col(row, headers, 'price_currency'),
    room_type: col(row, headers, 'room_type'),
    photo_url: col(row, headers, 'photo_url'),
    images: imageList(row, headers),
    place_id: col(row, headers, 'place_id'),
  };
}

function parseTransport(row: string[], headers: string[]): Transport {
  return {
    name: col(row, headers, 'name'),
    type: col(row, headers, 'type') as Transport['type'],
    from_city: col(row, headers, 'from_city'),
    to_city: col(row, headers, 'to_city'),
    date: col(row, headers, 'date'),
    departure_time: col(row, headers, 'departure_time'),
    arrival_time: col(row, headers, 'arrival_time'),
    carrier: col(row, headers, 'carrier'),
    booking_ref: col(row, headers, 'booking_ref'),
    terminal: col(row, headers, 'terminal'),
    seat: col(row, headers, 'seat'),
    notes: col(row, headers, 'notes'),
    price: col(row, headers, 'price'),
    price_currency: col(row, headers, 'price_currency'),
    images: imageList(row, headers),
  };
}

function parseAttraction(row: string[], headers: string[]): Attraction {
  return {
    name: col(row, headers, 'name'),
    city: col(row, headers, 'city'),
    category: col(row, headers, 'category'),
    address: col(row, headers, 'address'),
    hours: col(row, headers, 'hours'),
    price: col(row, headers, 'price'),
    website: col(row, headers, 'website'),
    notes: col(row, headers, 'notes'),
    lat: num(col(row, headers, 'lat')),
    lng: num(col(row, headers, 'lng')),
    photo_url: col(row, headers, 'photo_url'),
    slug: col(row, headers, 'slug'),
    place_id: col(row, headers, 'place_id'),
  };
}

function truthy(v: string): boolean {
  const s = (v || '').trim().toLowerCase();
  return s === 'true' || s === 'yes' || s === 'y' || s === '1' || s === 'x' || s === '✓';
}

function parseShopping(rows: string[][]): ShoppingItem[] {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));
  return rows.slice(1).map((row, i) => ({
    rowIndex: i + 2,
    hasBought: truthy(col(row, headers, 'hasbought')),
    item: col(row, headers, 'item'),
    brand: col(row, headers, 'brand'),
    location: col(row, headers, 'location'),
    count: col(row, headers, 'count'),
    price: col(row, headers, 'price'),
    to: col(row, headers, 'to'),
    notes: col(row, headers, 'notes'),
  }));
}

function parseBookmarks(rows: string[][]): Bookmark[] {
  if (rows.length < 2) return [];
  const headers = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));
  return rows.slice(1).map((row, i) => ({
    rowIndex: i + 2,
    image_url: col(row, headers, 'image_url'),
    file_id: col(row, headers, 'file_id'),
    caption: col(row, headers, 'caption'),
    category: col(row, headers, 'category'),
    link: col(row, headers, 'link'),
    created_at: col(row, headers, 'created_at'),
    added_by: col(row, headers, 'added_by'),
    rotation: num(col(row, headers, 'rotation')),
  }));
}

function parseRestaurant(row: string[], headers: string[]): Restaurant {
  return {
    name: col(row, headers, 'name'),
    city: col(row, headers, 'city'),
    cuisine: col(row, headers, 'cuisine'),
    address: col(row, headers, 'address'),
    hours: col(row, headers, 'hours'),
    price_range: col(row, headers, 'price_range'),
    rating: col(row, headers, 'rating'),
    reservation_required: col(row, headers, 'reservation_required'),
    reservation_link: col(row, headers, 'reservation_link'),
    website: col(row, headers, 'website'),
    google_maps_link: col(row, headers, 'google_maps_link'),
    notes: col(row, headers, 'notes'),
    lat: num(col(row, headers, 'lat')),
    lng: num(col(row, headers, 'lng')),
    photo_url: col(row, headers, 'photo_url'),
    place_id: col(row, headers, 'place_id'),
  };
}

// Backfill any array fields missing from an older cached payload. Without this,
// a visitor whose cache predates a newly-added field (e.g. `bookmarks`) would
// read `undefined` and crash on `.map`. Idempotent on fresh data.
function normalize(d: Partial<TripData> | null): TripData {
  return {
    overview: d?.overview ?? [],
    schedule: d?.schedule ?? [],
    // Backfill nested `images` too: rows cached before that field existed lack
    // it, and consumers map over it.
    hotels: (d?.hotels ?? []).map((h) => ({ ...h, images: h.images ?? [] })),
    transport: (d?.transport ?? []).map((t) => ({ ...t, images: t.images ?? [] })),
    attractions: d?.attractions ?? [],
    restaurants: d?.restaurants ?? [],
    shopping: d?.shopping ?? [],
    bookmarks: d?.bookmarks ?? [],
  };
}

export async function fetchTripData(force = false): Promise<TripData> {
  // Try cache first (unless force-refresh)
  if (!force) {
    const cached = getCache<TripData>(SHEETS_CACHE_KEY);
    if (cached) return normalize(cached);
  }

  try {
    const [overviewRows, scheduleRows, hotelRows, transportRows, attractionRows, restaurantRows, shoppingRows, bookmarkRows] =
      await Promise.all([
        fetchSheet('Overview'),
        fetchSheet('Schedule'),
        fetchSheet('Hotels'),
        fetchSheet('Transport'),
        fetchSheet('Attractions'),
        fetchSheet('Restaurants'),
        fetchSheet('Shopping').catch(() => [] as string[][]),
        fetchSheet('Bookmarks').catch(() => [] as string[][]),
      ]);

    const data: TripData = {
      overview: parseRows(overviewRows, parseOverview),
      schedule: parseRows(scheduleRows, parseSchedule),
      hotels: parseRows(hotelRows, parseHotel),
      transport: parseRows(transportRows, parseTransport),
      attractions: parseRows(attractionRows, parseAttraction),
      restaurants: parseRows(restaurantRows, parseRestaurant),
      shopping: parseShopping(shoppingRows),
      bookmarks: parseBookmarks(bookmarkRows),
    };

    setCache(SHEETS_CACHE_KEY, data, CACHE_TTL);
    return data;
  } catch (error) {
    // Fallback to stale cache if available
    const stale = getCacheStale<TripData>(SHEETS_CACHE_KEY);
    if (stale) return normalize(stale);
    throw error;
  }
}
