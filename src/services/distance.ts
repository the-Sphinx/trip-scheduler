// Rough leg-time estimates between two points. Good enough for a trip planner —
// we just want to surface "walkable / take a train / long ride".

export function haversineKm(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.min(1, Math.sqrt(s)));
}

export interface LegEstimate {
  mode: 'walk' | 'transit' | 'long';
  minutes: number;
  km: number;
}

export function estimateLeg(a: { lat: number; lng: number }, b: { lat: number; lng: number }): LegEstimate | null {
  if (!a.lat || !a.lng || !b.lat || !b.lng) return null;
  const km = haversineKm(a, b);
  if (km < 0.25) return null; // too close to bother
  if (km < 1.8) {
    // walking: ~5 km/h × 1.3 routing factor → 15.6 min/km
    return { mode: 'walk', minutes: Math.round(km * 15.6), km };
  }
  if (km < 12) {
    // transit/taxi in city: ~22 km/h door-to-door average + 5 min wait
    return { mode: 'transit', minutes: Math.round((km / 22) * 60 + 5), km };
  }
  // long: ~50 km/h overall (mix of intercity train + transit)
  return { mode: 'long', minutes: Math.round((km / 50) * 60 + 15), km };
}
