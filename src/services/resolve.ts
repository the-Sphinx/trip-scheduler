import type { ScheduleItem, TripData } from '../types';

export interface ResolvedScheduleItem {
  location_name: string;
  address: string;
  lat: number;
  lng: number;
  photo_url: string;
  website: string;
}

const EMPTY: ResolvedScheduleItem = {
  location_name: '',
  address: '',
  lat: 0,
  lng: 0,
  photo_url: '',
  website: '',
};

/**
 * Look up the entity referenced by a schedule item and return its display
 * fields. Free items (no ref_type/ref_key) get empty values.
 */
export function resolveScheduleItem(item: ScheduleItem, data: TripData | null): ResolvedScheduleItem {
  if (!data || !item.ref_type || !item.ref_key) return EMPTY;
  const key = item.ref_key.toLowerCase();
  const matchName = (n: string) => (n || '').toLowerCase() === key;

  if (item.ref_type === 'attraction') {
    const a = data.attractions.find((x) => matchName(x.name));
    if (a) return { location_name: a.name, address: a.address, lat: a.lat, lng: a.lng, photo_url: a.photo_url, website: a.website };
  }
  if (item.ref_type === 'hotel') {
    const h = data.hotels.find((x) => matchName(x.name));
    if (h) return { location_name: h.name, address: h.address, lat: h.lat, lng: h.lng, photo_url: h.photo_url, website: h.website };
  }
  if (item.ref_type === 'restaurant') {
    const r = data.restaurants.find((x) => matchName(x.name));
    if (r) return { location_name: r.name, address: r.address, lat: r.lat, lng: r.lng, photo_url: r.photo_url, website: r.website };
  }
  return EMPTY;
}
