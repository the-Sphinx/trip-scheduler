// Offline service worker for the trip app.
//
// The production build is a single inlined index.html, so precaching that one
// file = the whole app works offline. staticrypt is compatible: the cached
// bytes are the (encrypted) wrapper and decryption happens client-side with the
// key remembered in localStorage.
//
// Caching strategy:
//   - trip data + weather APIs  -> network-first  (refresh gets fresh data;
//                                   offline falls back to last response)
//   - app shell (navigation)    -> stale-while-revalidate (instant + bg update)
//   - same-origin static assets -> cache-first  (day-maps, icons, favicon)
//   - Drive images              -> cache-first  (reservation docs / bookmarks)
//   - writes (POST) + anything else -> not intercepted
//
// History note: an earlier auto-update PWA worker once served a stale precache
// of hashed chunks and blank-screened the app. This worker deliberately avoids
// precaching hashed asset names (the single-file build has none) and uses SWR
// for the shell so it self-heals across deploys.

const VERSION = 'v2';
const CACHE = `trip-cache-${VERSION}`;
const BASE = '/trip-scheduler/';

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE);
      // Precache the app shell. Best-effort: don't fail install if offline.
      await cache.add(new Request(BASE, { cache: 'reload' })).catch(() => {});
      await self.skipWaiting();
    })()
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)));
      await self.clients.claim();
    })()
  );
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const cached = await cache.match(req);
    if (cached) return cached;
    throw err;
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
  return res;
}

// Serve the cached shell immediately, revalidate in the background.
async function shellStaleWhileRevalidate() {
  const cache = await caches.open(CACHE);
  const cached = await cache.match(BASE);
  const network = fetch(new Request(BASE, { cache: 'reload' }))
    .then((res) => {
      if (res && res.ok) cache.put(BASE, res.clone());
      return res;
    })
    .catch(() => null);
  return cached || (await network) || new Response('Offline', { status: 503, statusText: 'Offline' });
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return; // never touch writes
  const url = new URL(req.url);

  // Trip data + weather: network-first so the refresh button gets fresh data.
  if (url.hostname === 'sheets.googleapis.com' || url.hostname.endsWith('open-meteo.com')) {
    event.respondWith(networkFirst(req));
    return;
  }

  // Drive-hosted images (reservation docs, bookmarks): cache-first.
  if (url.hostname === 'lh3.googleusercontent.com') {
    event.respondWith(cacheFirst(req));
    return;
  }

  if (url.origin === self.location.origin) {
    if (req.mode === 'navigate') {
      // The Disneyland ride-chooser is a standalone static page, NOT part of the
      // SPA — don't hand it the app shell (that's why it opened the main page on
      // mobile). Fetch the real document, network-first so deploys stay fresh
      // while it still works offline.
      if (url.pathname.endsWith('/disneyland.html')) {
        event.respondWith(networkFirst(req));
        return;
      }
      event.respondWith(shellStaleWhileRevalidate());
      return;
    }
    // day-maps, icons, favicon, etc.
    event.respondWith(cacheFirst(req));
    return;
  }
  // Everything else (e.g. Google Maps) passes straight through to the network.
});

// Messages from the app: warm the cache with image URLs, or activate an update.
self.addEventListener('message', (event) => {
  const data = event.data || {};
  if (data.type === 'SKIP_WAITING') {
    self.skipWaiting();
    return;
  }
  if (data.type === 'WARM' && Array.isArray(data.urls)) {
    event.waitUntil(
      (async () => {
        const cache = await caches.open(CACHE);
        await Promise.all(
          data.urls.map(async (u) => {
            try {
              if (await cache.match(u)) return;
              const res = await fetch(u);
              if (res && (res.ok || res.type === 'opaque')) await cache.put(u, res.clone());
            } catch {
              /* offline or blocked — skip */
            }
          })
        );
      })()
    );
  }
});
