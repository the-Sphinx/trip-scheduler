import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/zoom';
import { dayMaps, dayMapUrl } from '../data/dayMaps';

function caption(dayNumber: number, date: string): string {
  const d = new Date(date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
  return `Day ${dayNumber} · ${d}`;
}

// Fullscreen, swipeable, pinch/double-tap-to-zoom viewer for the illustrated
// day guides. Opens at `startIndex` and lets you flip through all of them.
export default function DayMapViewer({ startIndex = 0, onClose }: { startIndex?: number; onClose: () => void }) {
  const [active, setActive] = useState(startIndex);
  const current = dayMaps[active];

  return (
    <div className="fixed inset-0 z-[70] bg-black flex flex-col">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white bg-black/60">
        <span className="text-sm font-medium">{current ? caption(current.dayNumber, current.date) : ''}</span>
        <span className="text-xs text-white/60">{active + 1} / {dayMaps.length}</span>
        <button onClick={onClose} aria-label="Close" className="ml-3 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-lg leading-none">✕</button>
      </div>

      <Swiper
        modules={[Zoom, Keyboard]}
        zoom={{ maxRatio: 4 }}
        keyboard={{ enabled: true }}
        initialSlide={startIndex}
        spaceBetween={24}
        onSlideChange={(s) => setActive(s.activeIndex)}
        className="flex-1 min-h-0 w-full"
      >
        {dayMaps.map((dm) => (
          <SwiperSlide key={dm.date}>
            <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
              <img
                src={dayMapUrl(dm.src)}
                alt={caption(dm.dayNumber, dm.date)}
                className="max-w-full max-h-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="text-center text-white/50 text-xs py-2 bg-black/60">Pinch or double-tap to zoom · swipe to change day</p>
    </div>
  );
}
