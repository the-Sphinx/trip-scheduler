# Trip Schedule Webapp

## Project Overview
A PWA for a Japan trip (Jun 25 – Jul 5, 2026, 4 travelers) built with React + Vite + TypeScript + Tailwind CSS. Reads trip data from a Google Sheet and presents it as a mobile-friendly interactive schedule with maps, weather, and offline support. Deployed to GitHub Pages.

## Tech Stack
- **Frontend**: React 18, Vite, TypeScript, Tailwind CSS (v4 with `@tailwindcss/vite`)
- **Maps**: `@react-google-maps/api` (Google Maps JavaScript API)
- **Weather**: OpenWeatherMap free tier (3hr cache TTL)
- **Swipe navigation**: `swiper` library (tabs on top + swipe gesture for daily schedule)
- **PWA**: `vite-plugin-pwa` with Workbox (runtime caching for Sheets + Weather APIs)
- **Routing**: `react-router-dom` with `HashRouter` (required for GitHub Pages)
- **Sheet management**: `googleapis` + `tsx` (dev dependency for scripts)
- **Deploy**: GitHub Pages via GitHub Actions (`.github/workflows/deploy.yml`)

## Google Sheet
- **Sheet ID**: `1P0pucbfoJFnqnnAX1dEjmDq96TGTJb7Qz66sPZiGIGc`
- **Service Account**: credentials in `credentials.json` (gitignored)
- **Management script**: `npx tsx scripts/sheet.ts <read|append|clear> <TabName> [data]`

### Sheet Tabs & Columns

1. **Overview**: city, country, arrival_date, departure_date, transport_type
2. **Schedule**: date, time_start, time_end, activity, category, location_name, address, lat, lng, notes, links, photo_url
3. **Hotels**: city, name, address, check_in_date, check_out_date, check_in_time, confirmation_no, phone, website, notes, lat, lng, price, price_currency, room_type
4. **Transport**: type, from_city, to_city, date, departure_time, arrival_time, carrier, booking_ref, terminal, seat, price, price currency, notes
5. **Attractions**: name, city, category, address, hours, price, website, notes, lat, lng, photo_url
6. **Restaurants**: name, city, cuisine, address, hours, price_range, rating, reservation_required, reservation_link, website, google_maps_link, notes, lat, lng, photo_url

### Current Data
- **Transport**: 4 flights (Istanbul↔Guangzhou↔Tokyo via WODPKB, TRY 23,000)
- **Hotels**: 
  - Sakura Cross Hotel Kyoto Kiyomizu (Jun 26-29, ¥34,020, conf# 5472496845)
  - THE MACHIYA VILLA Sanjo Shirakawa Koji (Jun 29-Jul 1, ¥86,526, conf# 5677870274)

## Key Architecture Decisions
- **Data source**: Google Sheets API v4 with API key (read at runtime in the app) + service account (write via scripts)
- **Caching**: localStorage with TTL (30min for sheet data, 3hr for weather). Stale cache used as offline fallback.
- **Date format**: `YYYY-MM-DD` throughout
- **Time format**: `HH:MM` (24h)
- **Photos**: Public URLs only (stored in sheet)
- **Offline maps**: Not supported (deferred)
- **Base path**: `/trip-schedule/` (for GitHub Pages)
- **Phone numbers**: Must use `valueInputOption: 'RAW'` when writing to sheets (numbers starting with `+` get interpreted as formulas with `USER_ENTERED`)

## Project Structure
```
src/
├── main.tsx                     # Entry: HashRouter + TripDataProvider
├── App.tsx                      # Shell: bottom nav + routes (6 tabs)
├── index.css                    # Tailwind + dark theme colors
├── vite-env.d.ts                # Env type declarations
├── types/index.ts               # All interfaces (CityStop, ScheduleItem, Hotel, Transport, Attraction, Restaurant, TripData, DaySchedule)
├── services/
│   ├── cache.ts                 # localStorage cache with TTL + stale fallback
│   ├── sheets.ts                # Fetch all tabs, parse into typed objects
│   └── weather.ts               # OpenWeatherMap forecast fetch + cache
├── context/
│   └── TripDataContext.tsx       # Single fetch on load, builds DaySchedule[]
├── pages/
│   ├── Overview.tsx             # Route visualization (city cards with timeline)
│   ├── DailySchedule.tsx        # Swiper + tabs, activity timeline, map, weather, hotel card
│   ├── Hotels.tsx               # Grouped by city
│   ├── Transport.tsx            # Chronological list
│   ├── Attractions.tsx          # Filterable by city/category
│   └── Restaurants.tsx          # Filterable by city/cuisine
└── components/
    ├── ActivityCard.tsx          # Expandable card with time, category badge, notes/links/photos
    ├── MapView.tsx              # Google Map with numbered markers + polyline
    ├── WeatherWidget.tsx        # Weather icon + temp range
    ├── HotelCard.tsx            # Hotel details (compact/full modes)
    └── TransportCard.tsx        # Flight/train card with booking ref
scripts/
├── sheet.ts                     # CLI for read/append/clear/delete operations
└── setup-sheet.gs               # Google Apps Script to initialize sheet tabs
.github/workflows/deploy.yml     # GitHub Pages deploy on push to main
```

## Environment Variables (.env)
```
VITE_GOOGLE_SHEETS_API_KEY=...   # For runtime read (public sheet)
VITE_GOOGLE_SHEET_ID=1P0pucbfoJFnqnnAX1dEjmDq96TGTJb7Qz66sPZiGIGc
VITE_GOOGLE_MAPS_API_KEY=...     # Google Maps JS API
VITE_OPENWEATHER_API_KEY=...     # OpenWeatherMap free tier
```

## Commands
- `npm run dev` — local dev server
- `npm run build` — production build (outputs to `dist/`)
- `npm run preview` — preview production build
- `npm run sheet read <Tab>` — read a sheet tab
- `npm run sheet append <Tab> '<json>'` — append rows
- `npm run sheet clear <Tab>` — clear data rows (keeps header)

## Adding Booking.com Hotels
The agent can open booking.com confirmation pages in the browser (works if `auth_key` is in URL). Extract: name, address, check-in/out dates & times, confirmation number, PIN, phone, website, room type, price (JPY), notes. Write using `valueInputOption: 'RAW'` to avoid phone number formula errors.

## Conventions
- Category values for Schedule: sightseeing, food, transport, shopping, rest, entertainment, other
- Transport types: flight, train, bus, ferry
- reservation_required in Restaurants: yes/no
- Coordinates: approximate is fine for map markers
- Nav labels shortened for mobile: "Sights" (not "Attractions"), "Food" (not "Restaurants")

## What's NOT Done Yet
- Overview tab data not populated (trip route cities)
- Schedule tab empty (daily activities)
- Attractions/Restaurants tabs empty
- No sample data for testing the webapp UI
- Google Maps/Weather API keys may not be configured yet
- PWA icons are placeholder SVGs (need real PNGs)
- No git repo initialized yet
- Dark mode toggle (optional)
- Share button for companions
