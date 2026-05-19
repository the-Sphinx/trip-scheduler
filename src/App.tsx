import { Routes, Route, NavLink } from 'react-router-dom';
import { useTripData } from './context/TripDataContext';
import Overview from './pages/Overview';
import DailySchedule from './pages/DailySchedule';
import Hotels from './pages/Hotels';
import TransportPage from './pages/Transport';
import Attractions from './pages/Attractions';
import Restaurants from './pages/Restaurants';
import Shopping from './pages/Shopping';

const navItems = [
  { to: '/', label: 'Overview', icon: '🗺️' },
  { to: '/schedule', label: 'Schedule', icon: '📅' },
  { to: '/hotels', label: 'Hotels', icon: '🏨' },
  { to: '/transport', label: 'Transport', icon: '✈️' },
  { to: '/attractions', label: 'Sights', icon: '⛩️' },
  { to: '/restaurants', label: 'Food', icon: '🍜' },
  { to: '/shopping', label: 'Shop', icon: '🛍️' },
];

function App() {
  const { loading, error, refresh } = useTripData();

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
      {/* Floating refresh button */}
      <button
        onClick={() => refresh()}
        title="Refresh data from Google Sheets"
        aria-label="Refresh"
        className="fixed top-3 right-3 z-50 bg-surface/90 backdrop-blur border border-surface-light rounded-full w-9 h-9 flex items-center justify-center text-text-muted hover:text-primary-light shadow"
      >
        ↻
      </button>

      {/* Bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-surface border-t border-surface-light z-50">
        <div className="max-w-2xl mx-auto flex justify-around">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                `flex flex-col items-center py-2 px-1 text-xs transition-colors ${
                  isActive ? 'text-primary-light' : 'text-text-muted'
                }`
              }
            >
              <span className="text-lg mb-0.5">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      {/* Main content */}
      <main className="flex-1 pb-16 overflow-y-auto">
        <Routes>
          <Route path="/" element={<Overview />} />
          <Route path="/schedule" element={<DailySchedule />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/transport" element={<TransportPage />} />
          <Route path="/attractions" element={<Attractions />} />
          <Route path="/restaurants" element={<Restaurants />} />
          <Route path="/shopping" element={<Shopping />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
