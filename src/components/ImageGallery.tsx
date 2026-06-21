import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Zoom, Keyboard } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/zoom';

// A compact thumbnail strip that opens a fullscreen, swipeable, pinch/double-tap
// zoomable viewer. Used for reservation & flight document images.
export default function ImageGallery({ images, label = 'Documents' }: { images: string[]; label?: string }) {
  const [openAt, setOpenAt] = useState<number | null>(null);
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-2">
      <p className="text-[10px] uppercase tracking-wide text-text-muted mb-1">📎 {label} ({images.length})</p>
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-0.5 px-0.5 no-scrollbar">
        {images.map((src, i) => (
          <button
            key={src}
            onClick={(e) => { e.stopPropagation(); setOpenAt(i); }}
            className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-surface-light border border-surface-light active:scale-95 transition-transform"
          >
            <img src={src} alt={`${label} ${i + 1}`} loading="lazy" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {openAt !== null && (
        <Viewer images={images} startIndex={openAt} label={label} onClose={() => setOpenAt(null)} />
      )}
    </div>
  );
}

function Viewer({ images, startIndex, label, onClose }: { images: string[]; startIndex: number; label: string; onClose: () => void }) {
  const [active, setActive] = useState(startIndex);
  // Portal to <body>: this gallery is rendered inside Swiper slides (day pages),
  // whose .swiper-wrapper has a CSS transform. A position:fixed element inside a
  // transformed ancestor is offset by that transform, so without the portal the
  // overlay lands on the previously-active day's slide.
  return createPortal(
    <div className="fixed inset-0 z-[70] bg-black flex flex-col" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between px-4 py-3 text-white bg-black/60">
        <span className="text-sm font-medium">{label}</span>
        <span className="text-xs text-white/60">{active + 1} / {images.length}</span>
        <button onClick={onClose} aria-label="Close" className="ml-3 w-8 h-8 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-lg leading-none">✕</button>
      </div>
      <Swiper
        modules={[Zoom, Keyboard]}
        zoom={{ maxRatio: 5 }}
        keyboard={{ enabled: true }}
        initialSlide={startIndex}
        spaceBetween={24}
        onSlideChange={(s) => setActive(s.activeIndex)}
        className="flex-1 min-h-0 w-full"
      >
        {images.map((src, i) => (
          <SwiperSlide key={src}>
            <div className="swiper-zoom-container w-full h-full flex items-center justify-center">
              <img src={src} alt={`${label} ${i + 1}`} className="max-w-full max-h-full object-contain" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <p className="text-center text-white/50 text-xs py-2 bg-black/60">Pinch or double-tap to zoom · swipe to change</p>
    </div>,
    document.body
  );
}
