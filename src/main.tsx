import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { TripDataProvider } from './context/TripDataContext.tsx'
import { registerSW } from './services/sw-register.ts'

// Register the offline service worker (production only). See public/sw.js.
registerSW();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <TripDataProvider>
        <App />
      </TripDataProvider>
    </HashRouter>
  </StrictMode>,
)
