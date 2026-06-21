// Local calendar date as YYYY-MM-DD.
//
// IMPORTANT: do NOT use `new Date().toISOString().split('T')[0]` for "today" —
// that's the UTC date. In Japan (UTC+9) an early-morning local time still reads
// as the previous UTC day, so "today" would resolve to yesterday's tab.
export function todayLocal(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}
