import { useState } from 'react';
import { Routes, Route, NavLink, useLocation } from 'react-router-dom';
import { useTripData } from './context/TripDataContext';
import { refreshApp } from './services/sw-register';
import Overview from './pages/Overview';
import DailySchedule from './pages/DailySchedule';
import Hotels from './pages/Hotels';
import TransportPage from './pages/Transport';
import Attractions from './pages/Attractions';
import Restaurants from './pages/Restaurants';
import Bookmarks from './pages/Bookmarks';
import Disney from './pages/Disney';
import AttractionGuidePage from './pages/AttractionGuidePage';

type NavItem = { label: string; icon: string; to: string };

const navItems: NavItem[] = [
  { to: '/', label: 'Overview', icon: '🗺️' },
  { to: '/schedule', label: 'Schedule', icon: '📅' },
  { to: '/hotels', label: 'Hotels', icon: '🏨' },
  { to: '/transport', label: 'Transport', icon: '✈️' },
  { to: '/attractions', label: 'Sights', icon: '⛩️' },
  { to: '/disney', label: 'Disney', icon: '🏰' },
  { to: '/bookmarks', label: 'Saved', icon: '🔖' },
];

const navItemClass = 'flex-1 min-w-0 flex flex-col items-center py-2 px-0.5 text-[10px] transition-colors';

function App() {
  const { loading, error, refresh } = useTripData();
  const location = useLocation();
  const onOverview = location.pathname === '/';
  const [syncing, setSyncing] = useState(false);

  async function handleRefresh() {
    if (syncing) return;
    setSyncing(true);
    try {
      // Keep the spinner up at least briefly so a fast cache hit still reads as
      // a deliberate sync rather than a flicker.
      await Promise.all([refresh(), refreshApp(), new Promise((r) => setTimeout(r, 600))]);
    } finally {
      setSyncing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-light mx-auto mb-4" />
          <p className="text-text-muted">Loading trip data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="bg-surface rounded-xl p-6 max-w-md text-center">
          <p className="text-secondary text-lg mb-2">Failed to load data</p>
          <p className="text-text-muted text-sm">{error}</p>
          <p className="text-text-muted text-sm mt-4">
            Make sure your .env file has VITE_GOOGLE_SHEETS_API_KEY and VITE_GOOGLE_SHEET_ID set.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen max-w-2xl mx-auto">
      {/* Floating refresh button — Overview only */}
      {onOverview && (
        <button
          onClick={handleRefresh}
          disabled={syncing}
          title="Refresh data from Google Sheets"
          aria-label={syncing ? 'Syncing…' : 'Refresh'}
          aria-busy={syncing}
          className={`fixed top-3 right-3 z-50 bg-surface/90 backdrop-blur border rounded-full w-9 h-9 flex items-center justify-center shadow transition-colors ${
            syncing ? 'border-primary-light/50 text-primary-light' : 'border-surface-light text-text-muted hover:text-primary-light'
          }`}
        >
          <span className={`text-lg leading-none ${syncing ? 'animate-spin' : ''}`}>↻</span>
        </button>
      )}

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-light z-50">
        <div className="max-w-2xl mx-auto flex justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `${navItemClass} ${isActive ? 'text-primary-light' : 'text-text-muted'}`
              }
            >
              <span className="text-lg mb-0.5">{item.icon}</span>
              <span className="max-w-full truncate">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 pb-16 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/schedule" element={<DailySchedule />} />
          <Route path="/schedule/:date" element={<DailySchedule />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/attractions/:slug" element={<AttractionGuidePage />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/disney" element={<Disney />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
