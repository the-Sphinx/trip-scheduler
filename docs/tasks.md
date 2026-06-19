# Tasks: Bookmarks feature

## 1. Backend — Apps Script + sheet tab
**Files:** `scripts/apps-script-write.gs`
- [ ] Add `getOrCreateFolder_('TripBookmarks')` helper
- [ ] Add `uploadImage` action: decode base64 → blob → save to folder → set
      ANYONE_WITH_LINK view → append `Bookmarks` row → return `{url, fileId, rowIndex}`
- [ ] Add `deleteBookmark` action: trash Drive file (by fileId) + delete row
- [ ] Manual: create `Bookmarks` tab w/ header; redeploy web app (new version,
      approve Drive scope)

## 2. Types + data fetch
**Files:** `src/types/index.ts`, `src/services/sheets.ts`
- [ ] `Bookmark` interface (incl. `rowIndex`) + `bookmarks: Bookmark[]` on `TripData`
- [ ] `parseBookmark` + fetch `Bookmarks` tab with `.catch(() => [])` fallback

## 3. Client services
**Files:** `src/services/image.ts` (new), `src/services/write.ts`
- [ ] `compressImage(file, maxDim, quality)` → `{ base64, mimeType, filename }`
      (uses createImageBitmap w/ EXIF orientation, canvas downscale)
- [ ] `uploadImage(payload)` + `deleteBookmark(rowIndex, fileId)` clients

## 4. Page + nav
**Files:** `src/pages/Bookmarks.tsx` (new), `src/App.tsx`, `public/library/manifest.json` (new)
- [ ] Grid gallery (newest first) with caption + category chip + link icon
- [ ] Category filter chips (All + distinct categories)
- [ ] Add bottom-sheet: source (📷 camera / 🖼️ library / 🗂️ app images),
      preview, caption, category (presets + custom), link → optimistic save
- [ ] Lightbox (full image, open-link, delete)
- [ ] App-image library manifest (`public/library/manifest.json`)
- [ ] Route `/bookmarks` + nav item (🔖 "Saved")

## 5. Verify
- [ ] `npm run build` clean
- [ ] Playwright: page loads, filter chips work, add modal renders, nav fits
