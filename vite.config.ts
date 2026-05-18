import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
import { viteSingleFile } from 'vite-plugin-singlefile'

// In production we inline everything into index.html so the whole thing can be
// encrypted with staticrypt. PWA + service worker are dev-only.
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  base: '/trip-scheduler/',
  plugins: [
    react(),
    tailwindcss(),
    ...(isProd
      ? [viteSingleFile()]
      : [
          VitePWA({
            registerType: 'autoUpdate',
            manifest: {
              name: 'Japan Trip Schedule',
              short_name: 'Trip',
              description: 'Japan trip schedule and travel companion',
              theme_color: '#1e293b',
              background_color: '#0f172a',
              display: 'standalone',
              icons: [
                { src: 'icons/icon-192.png', sizes: '192x192', type: 'image/png' },
                { src: 'icons/icon-512.png', sizes: '512x512', type: 'image/png' },
              ],
            },
            workbox: {
              runtimeCaching: [
                {
                  urlPattern: /^https:\/\/sheets\.googleapis\.com\/.*/i,
                  handler: 'NetworkFirst',
                  options: {
                    cacheName: 'sheets-api-cache',
                    expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 },
                  },
                },
                {
                  urlPattern: /^https:\/\/api\.openweathermap\.org\/.*/i,
                  handler: 'NetworkFirst',
                  options: {
                    cacheName: 'weather-api-cache',
                    expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 3 },
                  },
                },
              ],
            },
          }),
        ]),
  ],
})
