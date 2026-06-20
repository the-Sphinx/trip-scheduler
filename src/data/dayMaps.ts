// Illustrated day-guide infographics (one per active trip day).
// Images live in public/day-maps/<date>.webp. dayNumber matches the label
// printed on each infographic ("DAY N"). The arrival day (06-26) and departure
// day (07-05) have no guide.

export interface DayMap {
  date: string; // YYYY-MM-DD — matches DaySchedule.date
  dayNumber: number; // as printed on the infographic
  src: string; // path under public/ (prefix with import.meta.env.BASE_URL)
}

export const dayMaps: DayMap[] = [
  { date: '2026-06-27', dayNumber: 1, src: 'day-maps/2026-06-27.webp' },
  { date: '2026-06-28', dayNumber: 2, src: 'day-maps/2026-06-28.webp' },
  { date: '2026-06-29', dayNumber: 3, src: 'day-maps/2026-06-29.webp' },
  { date: '2026-06-30', dayNumber: 4, src: 'day-maps/2026-06-30.webp' },
  { date: '2026-07-01', dayNumber: 5, src: 'day-maps/2026-07-01.webp' },
  { date: '2026-07-02', dayNumber: 6, src: 'day-maps/2026-07-02.webp' },
  { date: '2026-07-03', dayNumber: 7, src: 'day-maps/2026-07-03.webp' },
  { date: '2026-07-04', dayNumber: 8, src: 'day-maps/2026-07-04.webp' },
];

// Resolve a public path with the configured base (GitHub Pages subpath aware).
export function dayMapUrl(src: string): string {
  return `${import.meta.env.BASE_URL}${src}`;
}

export function getDayMap(date: string): DayMap | undefined {
  return dayMaps.find((d) => d.date === date);
}

export function getDayMapIndex(date: string): number {
  return dayMaps.findIndex((d) => d.date === date);
}
