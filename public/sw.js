// Self-destroying service worker.
//
// An earlier build of this site shipped a vite-plugin-pwa service worker in
// production (registerType: 'autoUpdate'). The site has since moved to a
// single-file, staticrypt-encrypted build with NO service worker, but browsers
// that visited the old version still have that worker installed. It keeps
// serving a stale precache whose hashed assets now 404, so the app never boots
// (users just see the blue background_color).
//
// Browsers automatically re-fetch a registered worker's script. By serving this
// file at the same URL the old worker was registered at (/trip-scheduler/sw.js),
// every affected browser updates to this worker, which wipes all caches,
// unregisters itself, and reloads the page back onto the live network version.
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const keys = await caches.keys();
      await Promise.all(keys.map((key) => caches.delete(key)));
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      for (const client of clients) {
        client.navigate(client.url);
      }
    })()
  );
});
