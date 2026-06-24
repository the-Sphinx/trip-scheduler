# Plan: Migrate to new sheet + harden security (password + scrub secrets + Drive tickets)

## Context
The old sheet was deleted; a **new sheet** was created (its id lives only in
`.env` / a GitHub secret — never in this public repo). Tickets are hosted on
Drive (user's folder, anyone-with-link). Goals: migrate data to the new sheet,
stop leaking the sheet ID + Apps Script write secret in git, and decide on
password-gating the deployed app.

Service account (for reads/writes): `trip-sheet-writer@…iam.gserviceaccount.com` (full address in credentials.json).

## Probe findings
- New sheet shared with the SA (Editor) + anyone-with-link (Viewer) → API-key readable.
- Old sheet still readable by SA → data migrated safely.
- Drive ticket folder is listable; 5 ticket PDFs found (ids kept out of git —
  stored only in the new sheet's `Attractions.ticket` column).
- Scrubbed from git: old sheet ID (`scripts/sheet.ts`, `apps-script-write.gs`,
  `docs/context.md`) and the Apps Script write secret (rotated + moved to Script Properties).

## YOU need to do (blocking)
1. **Share the new sheet** with `trip-sheet-writer@cohesive-sign-437519-g1.iam.gserviceaccount.com` as **Editor** (lets me migrate + write).
2. **New sheet → General access → "Anyone with the link → Viewer"** (required for the app's API key to read; its secrecy comes from the encrypted bundle + ID not in git, not the share setting).
3. Tell me if the new sheet is **empty** (so I migrate all tabs from the old one).
4. Later, **Apps Script** (editor-side, for bookmarks write/upload): set new `SHEET_ID`, move secret to **Script Properties** (rotated value I'll give), redeploy. I'll hand you the updated `.gs`.

## I will do (once the sheet is shared)
1. **Migrate** app tabs old → new: Overview, Schedule, Hotels, Transport, Attractions, Restaurants, Shopping, Bookmarks (preserving every edit). Skip cruft tabs.
2. **Add ticket Drive links** to `Attractions.ticket` (5 rows) as `https://drive.google.com/file/d/<id>/view`.
3. **Cutover GitHub secrets:** `VITE_GOOGLE_SHEET_ID` → new id; `VITE_WRITE_SECRET` → rotated value.
4. **Scrub git:** `scripts/sheet.ts` reads sheet ID from `.env`; `apps-script-write.gs` reads from `PropertiesService`; redact `docs/context.md`; rewrite history + force-push.
5. **Enable staticrypt** in `deploy.yml` (uses `STATICRYPT_PASSWORD`, already set).
6. **Deploy + verify:** password gate, app loads from new sheet, 🎟 Ticket opens Drive PDFs.

## Done already
- `STATICRYPT_PASSWORD` GitHub secret set (value not in git).
- Ticket file IDs collected.

## Notes / caveats
- Offline ticket caching from Drive is best-effort (cross-origin); the password gate + Drive is the agreed trade-off.
- staticrypt encrypts `index.html` (JS/CSS inlined in prod); `public/` assets stay unencrypted, but tickets live in the sheet/Drive, not `public/`.
