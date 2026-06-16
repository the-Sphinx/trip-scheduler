import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { TripDataProvider } from './context/TripDataContext.tsx'

// Production no longer uses a service worker (the build is single-file +
// staticrypt). Proactively tear down any worker left over from an earlier
// PWA-enabled build so it can't serve a stale, broken cache. See public/sw.js.
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach((registration) => registration.unregister());
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <TripDataProvider>
        <App />
      </TripDataProvider>
    </HashRouter>
  </StrictMode>,
)
