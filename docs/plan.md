# Plan: Bookmarks (shared reference images)

A new tab for quick-access reference images — subway maps, Instagram screenshots,
"things to buy / don't buy" shots — each with a caption, a category, and an
optional link. Images are uploaded from the phone camera / photo library (or
picked from a small bundled app-image library), stored in Google Drive via the
existing Apps Script, and shared across all travelers via a new `Bookmarks`
sheet tab. The page filters by category.

## Data model — new `Bookmarks` sheet tab
Columns (in order):
`image_url | file_id | caption | category | link | created_at | added_by`

- `image_url` — public, stable URL. For uploads: `https://lh3.googleusercontent.com/d/<id>`.
  For app-library images: the in-app `BASE_URL`-relative path. Kept stable so
  Shopping rows can reference it later.
- `file_id` — Drive file id (for deletion); empty for app-library/external images.
- `caption` — free text.
- `category` — free-form label with presets (transportation, shopping, dont-buy,
  food, sightseeing, other); filter chips on the page derive from existing values.
- `link` — optional external URL (e.g. the Instagram post).
- `created_at` — ISO timestamp (set by Apps Script).
- `added_by` — optional free text.

## Decisions / caveats (approved)
- Apps Script must be **redeployed once** with a new Drive permission grant
  (instructions in tasks.md). The `/exec` URL is unchanged.
- Drive files are set to **anyone-with-link can view** → URLs are public even
  though the site is password-gated. Acceptable for reference shots.
- Uploads are **compressed (~1600px JPEG)** on-device, not full resolution.
- v1 has **no place/day ref-linking** (only a free `link` field).
- Shopping-image reuse is **future work**; we only keep `image_url` stable now.

## Checklist
- [x] Extend Apps Script (`uploadImage`, `deleteBookmark`, Drive folder helper)
- [x] Add `Bookmark` type + `bookmarks` to `TripData`
- [x] Fetch + parse `Bookmarks` tab in `sheets.ts` (graceful fallback)
- [x] On-device image compression service (`image.ts`)
- [x] `uploadImage` / `deleteBookmark` client in `write.ts`
- [x] `Bookmarks.tsx` page: grid + category filter + add sheet (camera/library/app) + lightbox + edit/delete (optimistic)
- [x] App-image library source (`public/library/manifest.json`)
- [x] Route + bottom-nav entry in `App.tsx` (8 items now share width + truncate)
- [x] Create the `Bookmarks` sheet tab (header row) — done via service account
- [x] Build + Playwright smoke test (load, filter, add modal, lightbox, edit, nav-fit)

## Review
Implemented and verified locally end-to-end (build + staticrypt pipeline + real
data interception + Playwright). Grid, category filter chips, add sheet
(camera / photos / app-images), preset+custom categories, optional link,
lightbox with edit/delete, optimistic add/edit/delete all work. Lint clean for
all new/changed files (the 6 pre-existing errors in `DailySchedule.tsx` /
`weather.ts` are unrelated). Nav fits 8 items down to 360px (long labels
ellipsis-truncate on very narrow screens, full on 390px+).

**Still requires one manual step before uploads work in production:** the Apps
Script must be redeployed with the new `uploadImage`/`deleteBookmark` actions
and the Drive permission approved (see tasks.md §1). Until then the page loads
fine (empty / read-only via the graceful fallback); only new uploads fail.

**Deployment gotchas (resolved during rollout):**
- The Apps Script web app must have **Who has access: Anyone** (NOT "Anyone with
  Google account") — otherwise `/exec` redirects to a Google sign-in page and
  browser `fetch` fails.
- Adding `DriveApp` introduced a new OAuth scope. Redeploying does **not** grant
  it; you must **Run the `setup()` function once** in the editor and approve the
  Drive consent prompt. Symptom otherwise: `Exception: You don't have permission
  to call DriveApp.getFoldersByName`.
- To keep the same `/exec` URL across script changes, use **Manage deployments →
  edit → New version**, not "New deployment".

**Deferred / future:** reuse bookmark `image_url`s in Shopping items (data is
already shaped for it — `image_url` is a stable public URL); place/day
ref-linking; the app-image library is empty (`public/library/manifest.json` =
`[]`) until images + manifest entries are added.
