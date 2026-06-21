# Plan: Reservation & flight document images

Show booking/reservation document images on the matching hotel & transport items —
on their own tabs and on linked schedule items.

## Storage (decided: Google Drive, NOT repo)
The repo is **public**, so these personal docs (names, booking refs, QR codes,
receipts) must not live in `public/`. Images uploaded to Google Drive via the
existing `uploadImage` Apps Script action (anyone-with-link), and the stray
Bookmarks rows it creates were deleted (Drive files kept). No Apps Script redeploy.

Per-item URL lists stored in a new **`images` column** (pipe-separated) on the
**Hotels** and **Transport** sheet tabs — data-driven, so the Tokyo Airbnb docs
can be added later by uploading + filling the cell.

### Mapping
- Sakura Cross → confirmation, receipt, address, check-in QR (4)
- Machiya Villa → confirmation, receipt (2)
- Tokyo Shinjuku Airbnb → none yet
- Each outbound flight leg (IST→Guangzhou, Guangzhou→Tokyo) → to-Tokyo bundle (2 legs + details + luggage + summary)
- Each return flight leg (Tokyo→Guangzhou, Guangzhou→IST) → to-Istanbul bundle
- Trains → none

## Code
- types: `Hotel.images`, `Transport.images` (+ `Transport.name`); `images` on ResolvedScheduleItem.
- sheets.ts: parse pipe-separated `images`; `normalize()` backfills nested `images` (stale-cache safety).
- resolve.ts: return `images`; handle `ref_type === 'transport'` (was unhandled).
- `ImageGallery.tsx`: thumbnail strip → fullscreen Swiper+Zoom viewer.
- Added to HotelCard, TransportCard, ActivityCard (expanded, for linked hotel/transport).

## Data fix
Schedule rows referenced `Sakura Cross Hotel Kyoto Kiyomizu` (no dash) ≠ hotel
name `Sakura Cross Hotel - Kyoto Kiyomizu`, so those items resolved to nothing
(pre-existing: no address/photo either). Corrected the 2 ref_keys to match.

## Notes / follow-ups
- No schedule rows currently use `ref_type=transport`, so flight docs show on the
  Transport tab only. Add such rows to surface them on schedule days too.
- Site password (staticrypt) only protects index.html, not these images — but
  Drive URLs are unguessable + not in the repo, so they're effectively private.

## Review
Done. Verified against the real (live) sheet data via interception + a static
server: Transport tab shows 4 flight galleries (20 thumbs), Hotels shows 2,
viewer opens & Drive images load (naturalWidth 1122). Machiya & Sakura schedule
items show the gallery when expanded. Lint count unchanged (8, all pre-existing).
