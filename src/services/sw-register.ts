// Service worker registration + control helpers.
// Only used in production (dev relies on vite-plugin-pwa).

const SW_URL = `${import.meta.env.BASE_URL}sw.js`;

export function registerSW(): void {
  if (!import.meta.env.PROD) return;
  if (!('serviceWorker' in navigator)) return;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register(SW_URL).catch(() => {
      /* registration failed — app still works online */
    });
  });
}

// Ask the SW to pre-fetch + cache these URLs so they're available offline even
// if never opened (e.g. the hotel check-in QR at the front desk).
export function warmCache(urls: string[]): void {
  if (!('serviceWorker' in navigator)) return;
  const list = Array.from(new Set(urls.filter(Boolean)));
  if (list.length === 0) return;
  navigator.serviceWorker.ready
    .then((reg) => (reg.active || navigator.serviceWorker.controller)?.postMessage({ type: 'WARM', urls: list }))
    .catch(() => {});
}

// Check for a newer deployed SW and activate it immediately. Tied to the
// Overview refresh button so one tap makes both content and app code current.
export async function refreshApp(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return;
    await reg.update();
    reg.waiting?.postMessage({ type: 'SKIP_WAITING' });
  } catch {
    /* ignore */
  }
}
