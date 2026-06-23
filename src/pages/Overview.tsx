import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTripData } from '../context/TripDataContext';
import { resolveScheduleItem } from '../services/resolve';
import TripWeatherStrip from '../components/TripWeatherStrip';
import DayMapViewer from '../components/DayMapViewer';
import SearchOverlay from '../components/SearchOverlay';
import { dayMaps, dayMapUrl } from '../data/dayMaps';
import { todayLocal } from '../utils/date';

const transportIcons: Record<string, string> = {
  flight: '✈️',
  train: '🚄',
  bus: '🚌',
  ferry: '⛴️',
  '': '→',
};

export default function Overview() {
  const { data, days } = useTripData();
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  if (!data) return null;

  const today = todayLocal();
  const now = new Date();

  // Find today's schedule + current/next item
  const todayDay = days.find((d) => d.date === today);
  let currentItem: typeof data.schedule[number] | null = null;
  let nextItem: typeof data.schedule[number] | null = null;
  if (todayDay) {
    const nowMin = now.getHours() * 60 + now.getMinutes();
    const parseT = (t: string) => {
      const m = /^(\d{1,2}):(\d{2})/.exec(t || '');
      return m ? parseInt(m[1], 10) * 60 + parseInt(m[2], 10) : -1;
    };
    for (const it of todayDay.items) {
      const s = parseT(it.time_start);
      const e = parseT(it.time_end) || s + 60;
      if (s >= 0 && nowMin >= s && nowMin < e) {
        currentItem = it;
        break;
      }
    }
    if (!currentItem) {
      nextItem = todayDay.items.find((it) => parseT(it.time_start) > nowMin) || null;
    }
  }
  // First upcoming day if trip hasn't started yet
  const upcomingDay = !todayDay ? days.find((d) => d.date > today) : null;
  const tripFinished = days.length > 0 && days[days.length - 1].date < today;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-1">Japan Trip 2026</h1>
      <p className="text-text-muted text-sm mb-3">Jun 25 – Jul 5 • 4 travelers</p>

      {/* Trip participants */}
      <img
        src={`${import.meta.env.BASE_URL}participants.webp`}
        alt="The Adventure Team: trip participants"
        loading="lazy"
        className="w-full rounded-xl mb-4 border border-surface-light"
      />

      {/* Search */}
      <button
        onClick={() => setSearchOpen(true)}
        className="flex items-center gap-2 w-full bg-surface rounded-xl px-3 py-2.5 mb-4 text-text-muted text-sm active:scale-[0.99] transition-transform"
      >
        🔍 <span>Search attractions, food, hotels, days…</span>
      </button>

      {/* Now / Today card */}
      <NowCard
        today={today}
        todayDay={todayDay}
        currentItem={currentItem}
        nextItem={nextItem}
        upcomingDay={upcomingDay}
        tripFinished={tripFinished}
        data={data}
      />

      {/* Daily weather strip */}
      <TripWeatherStrip days={days} />

      {/* Illustrated day guides */}
      {dayMaps.length > 0 && (
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wide">Illustrated day guides</h2>
            <button onClick={() => setViewerIndex(0)} className="text-xs text-primary-light">Browse all →</button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 no-scrollbar">
            {dayMaps.map((dm, i) => (
              <button
                key={dm.date}
                onClick={() => setViewerIndex(i)}
                className="flex-shrink-0 w-28 rounded-xl overflow-hidden bg-surface border border-surface-light active:scale-95 transition-transform"
              >
                <img src={dayMapUrl(dm.src)} alt={`Day ${dm.dayNumber}`} loading="lazy" className="w-28 h-40 object-cover object-top" />
                <div className="text-[11px] text-text-muted py-1 text-center">Day {dm.dayNumber}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Route visualization */}
      <div className="relative">
        {data.overview.map((stop, i) => {
          const isActive =
            today >= stop.arrival_date && today <= stop.departure_date;
          const isPast = today > stop.departure_date;

          return (
            <div key={i} className="flex items-start mb-2">
              {/* Timeline */}
              <div className="flex flex-col items-center mr-4">
                <div
                  className={`w-4 h-4 rounded-full border-2 ${
                    isActive
                      ? 'bg-primary-light border-primary-light'
                      : isPast
                      ? 'bg-text-muted border-text-muted'
                      : 'bg-surface border-surface-light'
                  }`}
                />
                {i < data.overview.length - 1 && (
                  <div className="w-0.5 h-12 bg-surface-light mt-1" />
                )}
              </div>

              {/* City card */}
              <div
                className={`flex-1 rounded-lg p-3 ${
                  isActive ? 'bg-primary/10 border border-primary-light/30' : 'bg-surface'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-base">
                      {stop.city}
                      {stop.country && (
                        <span className="text-text-muted text-sm ml-2">{stop.country}</span>
                      )}
                    </h3>
                    <p className="text-text-muted text-xs mt-0.5">
                      {formatDate(stop.arrival_date)} – {formatDate(stop.departure_date)}
                    </p>
                  </div>
                  {isActive && (
                    <span className="text-xs bg-primary-light/20 text-primary-light px-2 py-0.5 rounded-full">
                      Now
                    </span>
                  )}
                </div>
              </div>

              {/* Transport icon between cities */}
              {i < data.overview.length - 1 && (
                <div className="absolute left-6 ml-0.5" style={{ top: `${i * 72 + 52}px` }}>
                  <span className="text-sm">{transportIcons[stop.transport_type] || '→'}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3 mt-8">
        <StatCard label="Cities" value={data.overview.length.toString()} />
        <StatCard label="Hotels" value={data.hotels.length.toString()} />
        <StatCard label="Activities" value={data.schedule.length.toString()} />
      </div>

      {viewerIndex !== null && (
        <DayMapViewer startIndex={viewerIndex} onClose={() => setViewerIndex(null)} />
      )}
      {searchOpen && <SearchOverlay onClose={() => setSearchOpen(false)} />}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-surface rounded-lg p-3 text-center">
      <p className="text-xl font-bold text-primary-light">{value}</p>
      <p className="text-text-muted text-xs">{label}</p>
    </div>
  );
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

type Day = ReturnType<typeof useTripData>['days'][number];
type Item = ReturnType<typeof useTripData>['data'] extends infer D
  ? D extends null ? never : D extends { schedule: infer S } ? S extends Array<infer X> ? X : never : never
  : never;
interface NowCardProps {
  today: string;
  todayDay: Day | undefined;
  currentItem: Item | null;
  nextItem: Item | null;
  upcomingDay: Day | null | undefined;
  tripFinished: boolean;
  data: NonNullable<ReturnType<typeof useTripData>['data']>;
}
function NowCard({ today, todayDay, currentItem, nextItem, upcomingDay, tripFinished, data }: NowCardProps) {
  if (tripFinished) {
    return (
      <div className="bg-surface rounded-xl p-4 mb-4 text-center text-text-muted">
        <p className="text-xl">🎒</p>
        <p className="mt-1 text-sm">Trip complete — welcome back!</p>
      </div>
    );
  }
  if (todayDay) {
    const photo = (it: Item | null) => {
      if (!it) return '';
      const r = resolveScheduleItem(it, data);
      return r.photo_url;
    };
    const headline = currentItem
      ? { title: currentItem.activity, badge: 'Now', time: currentItem.time_start, item: currentItem }
      : nextItem
        ? { title: nextItem.activity, badge: 'Next', time: nextItem.time_start, item: nextItem }
        : { title: 'No more activities today', badge: '', time: '', item: null as Item | null };
    const upcomingList = todayDay.items.filter((i) => i !== headline.item).slice(0, 2);
    return (
      <Link
        to={`/schedule/${today}`}
        className="block bg-gradient-to-br from-primary-light/20 to-blue-900/30 border border-primary-light/30 rounded-xl p-4 mb-4 active:scale-[0.99] transition"
      >
        <div className="flex items-start gap-3">
          {headline.item && photo(headline.item) && (
            <img src={photo(headline.item)} alt="" className="w-16 h-16 rounded-lg object-cover flex-shrink-0" loading="lazy" />
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              {headline.badge && (
                <span className="text-[10px] uppercase tracking-wider bg-primary-light text-white px-1.5 py-0.5 rounded">
                  {headline.badge}
                </span>
              )}
              {headline.time && (
                <span className="text-xs text-text-muted">{headline.time}</span>
              )}
            </div>
            <p className="font-semibold mt-0.5">{headline.title}</p>
            {todayDay.hotel && (
              <p className="text-xs text-text-muted mt-0.5">🏨 Tonight: {todayDay.hotel.name}</p>
            )}
          </div>
        </div>
        {upcomingList.length > 0 && (
          <div className="mt-3 space-y-1 border-t border-primary-light/20 pt-2">
            {upcomingList.map((it, i) => (
              <p key={i} className="text-xs text-text-muted truncate">
                <span className="font-medium">{it.time_start}</span> · {it.activity}
              </p>
            ))}
          </div>
        )}
      </Link>
    );
  }
  if (upcomingDay) {
    const daysUntil = Math.ceil(
      (new Date(upcomingDay.date + 'T00:00:00').getTime() - new Date(today + 'T00:00:00').getTime()) / (1000 * 60 * 60 * 24)
    );
    return (
      <Link
        to={`/schedule/${upcomingDay.date}`}
        className="block bg-surface rounded-xl p-4 mb-4 active:scale-[0.99] transition"
      >
        <p className="text-xs uppercase tracking-wider text-text-muted">Trip starts in</p>
        <p className="text-3xl font-bold text-primary-light">{daysUntil} {daysUntil === 1 ? 'day' : 'days'}</p>
        <p className="text-sm text-text-muted mt-1">
          Day 1: {new Date(upcomingDay.date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
      </Link>
    );
  }
  return null;
}
