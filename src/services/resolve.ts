import type { ScheduleItem, TripData } from '../types';

export interface ResolvedScheduleItem {
  location_name: string;
  address: string;
  lat: number;
  lng: number;
  photo_url: string;
  website: string;
}

/**
 * Merge a schedule item's referenced entity (if any) into a resolved view.
 * Entity values win; missing entity fields fall back to the schedule row's
 * own columns so free-form items still display correctly.
 */
export function resolveScheduleItem(item: ScheduleItem, data: TripData | null): ResolvedScheduleItem {
  const fallback: ResolvedScheduleItem = {
    location_name: item.location_name,
    address: item.address,
    lat: item.lat,
    lng: item.lng,
    photo_url: item.photo_url,
    website: '',
  };
  if (!data || !item.ref_type || !item.ref_key) return fallback;

  const key = item.ref_key.toLowerCase();
  const matchName = (n: string) => (n || '').toLowerCase() === key;

  if (item.ref_type === 'attraction') {
    const a = data.attractions.find((x) => matchName(x.name));
    if (a) return {
      location_name: a.name || fallback.location_name,
      address: a.address || fallback.address,
      lat: a.lat || fallback.lat,
      lng: a.lng || fallback.lng,
      photo_url: a.photo_url || fallback.photo_url,
      website: a.website || '',
    };
  }
  if (item.ref_type === 'hotel') {
    const h = data.hotels.find((x) => matchName(x.name));
    if (h) return {
      location_name: h.name || fallback.location_name,
      address: h.address || fallback.address,
      lat: h.lat || fallback.lat,
      lng: h.lng || fallback.lng,
      photo_url: h.photo_url || fallback.photo_url,
      website: h.website || '',
    };
  }
  if (item.ref_type === 'restaurant') {
    const r = data.restaurants.find((x) => matchName(x.name));
    if (r) return {
      location_name: r.name || fallback.location_name,
      address: r.address || fallback.address,
      lat: r.lat || fallback.lat,
      lng: r.lng || fallback.lng,
      photo_url: r.photo_url || fallback.photo_url,
      website: r.website || '',
    };
  }
  return fallback;
}
