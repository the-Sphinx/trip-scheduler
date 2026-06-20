# Plan: Illustrated day guides

8 portrait infographics (one per active day, Jun 27 – Jul 4). Browse them all from
Overview (swipe carousel → fullscreen) and open the matching one from each day page
next to the Google Map.

## Storage
- Optimize `temp/Japan_day_N.(png|jpeg)` → WebP at **native 1536px** width, q88
  (~250–350 KB each, 2.3 MB total — full res for sharp pinch-zoom). Delete `temp/`. [done]
- Output: `public/day-maps/<date>.webp` (date-named for direct lookup).
- Manifest: `src/data/dayMaps.ts` → `{ date, dayNumber, src }[]` + `getDayMap(date)`.

### Day → date mapping (from printed labels on the images)
day_1→2026-06-27, day_2→06-28, day_3→06-29, day_4→06-30, day_5→07-01,
day_6→07-02, day_7→07-03, day_8→07-04. (Arrival 06-26 & departure 07-05: none.)

## Components
- `src/components/DayMapViewer.tsx` (new): fullscreen overlay, Swiper + Zoom
  (pinch/double-tap), flips through all guides, caption "Day N · <date>",
  opens at a given start index. Reuses the project's `swiper` dep.
- `Overview.tsx`: "Illustrated day guides" horizontal thumbnail strip under the
  weather strip → tap opens viewer at that index.
- `DailySchedule.tsx`: compact "📋 Day guide" thumbnail after `MapView` (only
  when a guide exists for that date) → opens viewer at that day.

## Checklist
- [ ] Convert + place images in `public/day-maps/`, delete `temp/`
- [ ] `src/data/dayMaps.ts` manifest + lookup
- [ ] `DayMapViewer` (swiper + zoom, captions, start index)
- [ ] Overview carousel strip
- [ ] DailySchedule thumbnail next to map
- [ ] Build + Playwright smoke (overview strip opens viewer; day page thumbnail opens at right day; zoom works)

## Review
Done. 8 guides at native 1536px WebP (2.3 MB total) in `public/day-maps/`,
mapped via `src/data/dayMaps.ts`. `DayMapViewer` (Swiper + Zoom) opens fullscreen
from the Overview strip and from each day page's guide card. Verified with a
plain static server (vite *preview* SPA-falls-back on every path, so it can't
serve the assets locally — irrelevant on GitHub Pages, which serves real files;
confirmed webp loads at naturalWidth 1536, thumbnails render, viewer swipes).
Lint clean for new/changed files.
