# Plan: Offline support + search + today-tab fix

## A. Offline support (the main task)

### Why a hand-written SW (not vite-plugin-pwa)
Prod build is **single-file** (`viteSingleFile` inlines all JS/CSS into one
`index.html`) and then staticrypt encrypts that file. Workbox's build-time
precache-manifest globbing fits poorly with this, and the last auto-update SW
caused the blank-page incident. A small hand-written `public/sw.js` (served
plain, like the current self-destruct one) gives explicit, auditable control.

Single-file build means **precaching `index.html` = the whole app offline.**
staticrypt is compatible: the cached bytes are the encrypted wrapper, and
decryption is client-side with the key in localStorage (`--remember 30`), so
offline unlock works.

### Caching strategies (this is the core of the requirement)
| Request | Strategy | Why |
|---|---|---|
| `sheets.googleapis.com` (trip data) | **NetworkFirst** (cache fallback) | Fresh when online; the Overview **refresh** button forces a refetch and gets new data. Offline → last cached. |
| `open-meteo` (weather) | NetworkFirst | same |
| Apps Script **POST** (writes) | **not intercepted** | never cache mutations |
| `index.html` (app shell) | **StaleWhileRevalidate** | instant load + background update; offline → cached |
| same-origin static (`day-maps/*.webp`, icons, favicon) | CacheFirst | immutable-ish |
| Drive images (`lh3.googleusercontent.com`) | CacheFirst | reservation docs / bookmarks offline |

**Refresh requirement:** trip content comes from the sheets API, which is
NetworkFirst, and the refresh button already calls `load(true)` (bypasses the
localStorage cache). So refresh → network → fresh content. The refresh button
will *additionally* trigger a SW update check + `skipWaiting`, so one tap makes
both content **and** app code current.

### Warm the reservation-doc cache (the check-in-QR risk)
Drive images only cache after they're viewed. To guarantee the Sakura check-in
QR / confirmations work offline at the desk, after trip data loads the app
`postMessage`s all hotel/transport `images[]` + day-map URLs to the SW, which
fetches+caches them. So one online open before going dark = docs available offline.

### Update safety (avoid the past footgun)
- Versioned cache name (`trip-cache-v1`); `activate` deletes other versions.
- No blind precache of hashed asset names (single-file has none). SWR shell
  self-heals if a deploy changes the file.
- `main.tsx`: flip from *unregister* to *register* `sw.js`. Returning users
  (currently SW-less after the self-destruct) pick up the new one cleanly.

### Files
- `public/sw.js` — rewrite: install (precache shell + day-maps), activate
  (cleanup old caches), fetch (the routing table above), message (warm cache).
- `src/main.tsx` — register sw.js; on `controllerchange` do nothing disruptive.
- `src/services/sw-register.ts` (new) — small helper: register + `update()` +
  warm-cache postMessage; exported `refreshApp()` used by the refresh button.
- `src/context/TripDataContext.tsx` — after load, post image URLs to SW to warm.
- `src/pages/Overview.tsx` — refresh button also calls SW update check.
- `vite.config.ts` — keep PWA dev-only; ensure `sw.js` ships plain (it already does, in `public/`).

## B. Search (Overview)
- A search button in the Overview header → opens a full-screen search overlay.
- Indexes attractions, restaurants, hotels, transport, schedule activities,
  bookmarks (caption). Result tap → navigates to that tab / day / guide.
- New `src/components/SearchOverlay.tsx`; button in `Overview.tsx`.

## C. Today-tab fix
`DailySchedule` already selects "today", but uses
`new Date().toISOString().split('T')[0]` = **UTC** date. In Japan (UTC+9) early
mornings that resolves to *yesterday*. Fix: compute the **local** date. Add a
shared `todayLocal()` helper (also used by Overview's Now card for consistency).
So on Jun 29 in Japan, the Jun 29 tab is active.

## Verification
- Playwright: load online → go offline (`context.setOffline(true)`) → app still
  boots, day-maps + a warmed Drive image still render, refresh while offline
  shows cached data without crashing.
- Refresh while online updates content (mock changed sheet → refresh → new value).
- Today-tab: set fake date to a trip day → schedule opens on that tab.
- Lint clean; build clean.

## Review
Done. Verified with Playwright:
- **Offline:** SW controls the page; a day-map fetched offline serves from cache;
  offline reload boots the app (#root present, title "Japan Trip 2026") — no
  browser error page.
- **Refresh updates content:** changed the mocked sheet, tapped refresh → the
  new value appeared (network-first + load(true) bypass).
- **Search:** "sakura" → 4 results; tap navigates and closes the overlay.
- **Today tab:** faked clock 2026-06-29 in Asia/Tokyo → schedule opens on
  "Monday, June 29" (the UTC off-by-one is gone).
- Build clean; sw.js ships plain & valid; lint count unchanged (8 pre-existing).

Behavior notes: app-code updates apply silently on next load (SWR shell); the
Overview refresh forces both fresh data and an immediate SW update. Reservation
docs/day-maps are warmed into cache after the first online load, so the Sakura
check-in QR works offline at the desk.
