# Plan: Fill all non-walking transit gaps in the trip schedule

## Context

The schedule (Google Sheet `Schedule` tab) lists activities but the "how do we
get from A to B" connections are incomplete:

- **Vague placeholder rows** exist with no route detail and empty refs:
  `Train to Asakusa`, `Go to Disneyland`, `Go to TeamLab Borderless`,
  `Go to Shinjuku` (×2), `Transit Kyoto to Uji`, `Go to Haneda Airport`,
  `Taxi to Kyoto Station`.
- **Missing legs entirely** — most importantly **Haneda → Shinagawa** (needed to
  catch the 18:25 Nozomi we just booked; no row exists), plus several intra-day
  hops (Kyoto Station→hotel on arrival night, Osaka Castle→Kuromon, the whole
  Day-6/30 Kyoto loop, Azabudai→Gundam→Shibuya, etc.).

Goal: every location-to-location move that is **not a short walk (<~1.5 km)** gets
a `transport` schedule row whose `notes` give a concrete recommendation — chosen
for a **family of 4 (3 adults + 1 child), with 2 large suitcases on the
arrival/departure days** — including line(s), transfer point, approx ride time and
fare. Walks under ~1.5 km are intentionally left out.

The app already renders these (`ActivityCard.tsx`), sorts appended rows into place
by `date`+`time_start` (`TripDataContext.tsx` `buildDays`), and shows a live
**🧭 Directions** transit link whenever a row's `ref` resolves to coordinates
(`ActivityCard.tsx:103`). Transport data is live from the sheet, so **no
redeploy** is needed — a refresh picks it up.

> Times/fares are 2026 best-estimates and labeled "approx"; the per-row Directions
> button lets travelers confirm live day-of.

## Approach

1. **Storage**: edit/append rows in the **`Schedule` tab** (the chosen format).
   New legs are **appended** (order doesn't matter — `buildDays` sorts by time).
2. **Ref strategy**: set each transit row's `ref` to its **destination** when that
   destination already exists in Attractions/Hotels (gives a map pin + 🧭 transit
   Directions button). Stations/airports not in the data → leave `ref` empty; all
   detail lives in `notes`.
3. **No new Attractions rows** — keep the change contained to the Schedule tab.
4. **Mode logic** (the "suggestion" the user asked for) weighs: luggage, group of
   4, time of day, transfers, walking with kids in summer heat, and cost
   (4× fares vs one taxi). Taxi is recommended specifically where luggage or
   late-night/early-morning + transfers make trains painful.
5. Tool: existing read-only-safe `scripts/sheet.ts` (`update` for edits,
   `append` for new rows) via `npm run sheet`.

## Edits to existing rows (`Schedule!` row N = sheet row, header = row 1)

| Row | Item | Change |
|----|------|--------|
| 3  | Shinkansen Tokyo→Kyoto | Sync with booking: `18:25–20:29`, activity "Shinkansen Shinagawa → Kyoto", note "NOZOMI 477 from **Shinagawa** (not Tokyo Stn), Car 16" |
| 32 | Transit Kyoto→Uji | JR Nara Line **Kyoto → Uji** (rapid ~17 min / local ~27 min, ¥240); set ref→`Byodoin Omotesando (Tea Street)` |
| 44 | Taxi to Kyoto Station | Keep taxi; add "Machiya Villa→Kyoto Stn ~10 min, ≈¥1,800 (worth it with luggage + 08:30 train)" |
| 47 | Train to Asakusa | JR Yamanote **Tokyo→Ueno** (8 min) → Ginza Line **Ueno→Asakusa** (5 min), ~20 min total ≈¥320; ref→`Sensō-ji` |
| 54 | Go to Shinjuku / Akebonobashi | With luggage: Marunouchi Line **Tokyo→Yotsuya-sanchome** (~12 min ¥210) + 6-min walk; taxi fallback ≈¥2,500; ref→`Tokyo Shinjuku Airbnb` |
| 57 | Go to Disneyland | Marunouchi **Yotsuya-sanchome→Tokyo** → JR Keiyō Line **Tokyo→Maihama** (~15 min); ~40 min total ≈¥500; ref→`Tokyo Disneyland`. Tip: buy park tickets in advance |
| 60 | Go to TeamLab Borderless | To Azabudai Hills: Marunouchi **Yotsuya-sanchome→Kasumigaseki** → Hibiya **Kasumigaseki→Kamiyacho** + 5-min walk, ~30 min ≈¥210; ref→`TeamLab Borderless` |
| 65 | Go to Pokémon Center | Marunouchi Line **Yotsuya-sanchome→Ikebukuro** direct (~16 min ¥210) + walk to Sunshine City; ref→`Pokémon Center Mega Tokyo` |
| 68 | Go to Shinjuku | JR Chūō-Sōbu Line **Akihabara→Shinjuku** direct (~18 min ¥170); ref→`Shinjuku` |
| 74 | Go to Haneda Airport | Recommend **Airport Limousine Bus from Shinjuku** (luggage stowed, no transfers, ~45–60 min ≈¥1,400pp — reserve) **or** Marunouchi→Shinagawa→Keikyu (~45 min ¥650pp). Taxi ≈¥8,000 |

Minor note-enrichment (already have route, add fare/time): rows 17, 24, 25 (Osaka day).

## New rows to append (date, start–end, activity, category=transport, notes, ref)

**Jun 26 (arrival, 2 suitcases, tired):**
- `16:30–16:45` **Haneda → Shinagawa** — Keikyu Airport Line (Airport Ltd Exp), direct ~12 min ≈¥330pp; elevators, no transfer; plenty of buffer before 18:25 (grab ekiben at Shinagawa). *ref empty.*
- `20:35–20:55` **Kyoto Stn → Sakura Cross Hotel** — **Taxi** (~10 min ≈¥1,800). Night + luggage + tired → skip the crowded #100/206 bus; ref→`Sakura Cross Hotel`.

**Jun 28 (Osaka):**
- `11:00–11:25` **Osaka Castle → Kuromon** — Tanimachi Line `Tanimachi 4-chome→Nippombashi` (~4 min ¥190) + 5-min walk; ref→`Kuromon Ichiba Market`.
- `16:40–17:00` **Dotonbori → Shinsekai** — Midōsuji `Namba→Dōbutsuen-mae` (~5 min ¥190) or 20-min walk; ref→`Shinsekai & Tsutenkaku`.
- `18:40–19:00` **Shinsekai → Zauo Namba** — Sakaisuji `Ebisuchō→Nippombashi`→walk, or Midōsuji to Namba (~10 min ¥190); ref→`Zauo Namba`.

**Jun 29 (Arashiyama + hotel change + Uji):**
- `06:15–06:55` **Sakura Cross → Arashiyama** — **Taxi ≈¥4,000 (~30 min)** recommended to hit the Bamboo Grove before crowds/heat (≈¥1,000pp, saves transfers); *alt:* walk to Kiyomizu-Gojō → Kyoto Stn → JR Sagano to Saga-Arashiyama. ref→`Arashiyama Bamboo Grove`.
- `11:00–11:40` **Arashiyama → Sakura Cross (checkout)** — JR Sagano `Saga-Arashiyama→Kyoto` (~15 min ¥240) + taxi/bus to hotel, or direct taxi ≈¥4,000. ref→`Sakura Cross Hotel`.
- `12:10–12:35` **Sakura Cross → Machiya Front Desk** — **Taxi** ~12 min ≈¥1,800 (carrying luggage to drop for forwarding); ref→`Machiya Inns & Hotels - Front Desk`.
- `13:05–13:25` **Front Desk → Nishiki Market** — Karasuma Line `Kyoto→Shijō` (~4 min ¥220) + walk (luggage already forwarded); ref→`Nishiki Market`.
- `16:45–17:00` **Tea St / Uji River → Nintendo Museum** — ~10-min taxi ≈¥1,200 or 25-min walk; (Museum nearest stn = Ogura/Obaku); ref→`Nintendo Museum`.
- `19:50–20:50` **Nintendo Museum → Machiya Villa** — Keihan Uji Line `Uji→Chūshojima` → Keihan Main `→Sanjō` + short walk (~50 min ≈¥420pp); taxi ≈¥6,000. ref→`The Machiya Villa`.

**Jun 30 (Kyoto loop from Machiya Villa, Sanjō):**
- `06:00–06:30` **Machiya Villa → Fushimi Inari** — Keihan Main `Sanjō→Fushimi-Inari` (~13 min ¥220) + 5-min walk; ref→`Fushimi Inari Taisha`.
- `09:30–10:10` **Fushimi Inari → Manga Museum** — JR Nara `Inari→Kyoto` → Karasuma subway `Kyoto→Karasuma-Oike` + walk (~30 min ≈¥390); ref→`Kyoto International Manga Museum`.
- `12:00–12:15` **Manga Museum → Nijo Castle** — Tōzai Line `Karasuma-Oike→Nijōjō-mae` 1 stop (~3 min ¥220) or 15-min walk; ref→`Nijo Castle`.
- `13:50–14:10` **Nijo Castle → Nishiki Market** — Tōzai `Nijōjō-mae→Karasuma-Oike` → Karasuma `→Shijō` + walk (~12 min ¥220) or 20-min walk; ref→`Nishiki Market`.

**Jul 1 (Tokyo afternoon):**
- `16:05–16:25` **Hokusai Graphic (Asakusa) → Akihabara** — Tsukuba Express `Asakusa→Akihabara` (~4 min ¥210) or taxi ≈¥1,300; ref→`Akihabara`.
- Enrich row 53 (Retrieve luggage) note: JR Yamanote/Keihin-Tōhoku `Akihabara→Tokyo` ~5 min ¥170.

**Jul 3 (Azabudai → Odaiba → Shibuya):**
- `14:00–14:30` **Azabudai → Gundam Base (Odaiba)** — Hibiya `Kamiyachō→…`→ Yurikamome to `Daiba`, ~35 min ≈¥500; *taxi ≈¥2,500/15 min competitive for 4*; ref→`The Gundam Base Tokyo`.
- `17:15–18:00` **Gundam Base → Shibuya** — Rinkai Line `Tokyo Teleport→Ōsaki` → JR `→Shibuya` (~35 min ≈¥600); ref→`Shibuya`.
- Enrich row 59 (Back at Airbnb, Jul 2) + add Shibuya→Airbnb note: JR `Shibuya→Yotsuya` ~12 min ¥170.

**Jul 4:**
- `11:00–11:30` **Pokémon Center (Ikebukuro) → Akihabara** — Marunouchi `Ikebukuro→Awajichō` + 4-min walk, or JR via Kanda (~25 min ¥210); ref→`Akihabara`.

## Open items to confirm on review (non-blocking)
- **One Piece Base Shop** is tagged at *Shibuya PARCO* but sits inside the Jul-4
  Shinjuku afternoon — I'll treat the Shinjuku block as walking and **not** add a
  Shibuya round-trip. Flag if it should actually be Shibuya.
- **Jun 29** has heavy backtracking (Higashiyama→Arashiyama→back→Kyoto Stn→Uji).
  I'm planning transit as-scheduled; a reorder is out of scope unless you want it.

## Files / data touched
- **Google Sheet `Schedule` tab only** — ~10 row edits + ~20 appended rows, via
  `scripts/sheet.ts` (`update` / `append`). No source-code changes, no deploy.

## Verification
1. `npm run sheet read Schedule` → confirm new/edited rows present and well-formed.
2. `npm run dev`, open **Schedule**, swipe each day: every non-walking gap now
   shows a 🚆 transport card with the recommendation; ref-linked ones expand to a
   working **🧭 Directions** (transit) button and appear on the day map.
3. Spot-check sort order (appended rows land in the right time slot) and that
   Jun 26 reads: Arrive Haneda → Haneda→Shinagawa → Nozomi 18:25 → Kyoto→hotel
   taxi → check-in.
