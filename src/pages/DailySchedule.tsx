import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import { useTripData } from '../context/TripDataContext';
import { resolveScheduleItem } from '../services/resolve';
import ActivityCard from '../components/ActivityCard';
import MapView from '../components/MapView';
import WeatherWidget from '../components/WeatherWidget';
import HotelCard from '../components/HotelCard';

export default function DailySchedule() {
  const { days, data } = useTripData();
  const { date: dateParam } = useParams();
  const navigate = useNavigate();
  const [activeDay, setActiveDay] = useState(0);
  const swiperRef = useRef<SwiperType | null>(null);
  const tabsRef = useRef<HTMLDivElement>(null);

  // Pick initial day from URL param, else today, else first day.
  useEffect(() => {
    if (days.length === 0) return;
    let idx = -1;
    if (dateParam) idx = days.findIndex((d) => d.date === dateParam);
    if (idx < 0) {
      const today = new Date().toISOString().split('T')[0];
      idx = days.findIndex((d) => d.date === today);
    }
    if (idx < 0) idx = 0;
    setActiveDay(idx);
    swiperRef.current?.slideTo(idx, 0);
  }, [days, dateParam]);

  // Reflect the active day in the URL so back/forward and deep links work.
  const goToDay = (i: number) => {
    setActiveDay(i);
    swiperRef.current?.slideTo(i);
    if (days[i]) navigate(`/schedule/${days[i].date}`, { replace: false });
  };

  // Scroll active tab into view
  useEffect(() => {
    if (tabsRef.current) {
      const activeTab = tabsRef.current.children[activeDay] as HTMLElement;
      if (activeTab) {
        activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
      }
    }
  }, [activeDay]);

  if (days.length === 0) {
    return (
      <div className="p-4 text-center text-text-muted">
        No schedule data available yet.
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Day tabs */}
      <div className="bg-surface border-b border-surface-light sticky top-0 z-10">
        <div ref={tabsRef} className="flex overflow-x-auto gap-1 p-2 scrollbar-hide [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto">
          {days.map((day, i) => (
            <button
              key={day.date}
              onClick={() => goToDay(i)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                i === activeDay
                  ? 'bg-primary-light text-white'
                  : 'bg-surface-light text-text-muted hover:text-text'
              }`}
            >
              <span className="block">{formatDayLabel(day.date)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Swipeable day content */}
      <Swiper
        className="flex-1 w-full"
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => {
          setActiveDay(swiper.activeIndex);
          const d = days[swiper.activeIndex];
          if (d) navigate(`/schedule/${d.date}`, { replace: true });
        }}
        initialSlide={activeDay}
        spaceBetween={0}
        slidesPerView={1}
      >
        {days.map((day, dayIdx) => (
          <SwiperSlide key={day.date}>
            <div className="h-full overflow-y-auto p-4 space-y-4">
              {/* Date header */}
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                  {new Date(day.date + 'T00:00:00').toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                  })}
                </h2>
                <WeatherWidget day={day} />
              </div>

              {/* Map */}
              {(day.items.some((item) => {
                const r = resolveScheduleItem(item, data);
                return r.lat && r.lng;
              }) || day.hotel || days[dayIdx - 1]?.hotel) && (
                <MapView
                  items={day.items}
                  startHotel={days[dayIdx - 1]?.hotel}
                  endHotel={day.hotel}
                />
              )}

              {/* Activity timeline */}
              <div className="space-y-2">
                {day.items.map((item, i) => (
                  <ActivityCard key={i} item={item} />
                ))}
                {day.items.length === 0 && (
                  <p className="text-text-muted text-sm text-center py-8">
                    No activities scheduled for this day
                  </p>
                )}
              </div>

              {/* Hotel card */}
              {day.hotel && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-text-muted mb-2">🏨 Tonight's Stay</h3>
                  <HotelCard hotel={day.hotel} compact />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

function formatDayLabel(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.toLocaleDateString('en-US', { weekday: 'short' });
  const num = d.getDate();
  return `${day} ${num}`;
}
