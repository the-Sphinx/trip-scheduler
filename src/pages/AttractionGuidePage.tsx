import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTripData } from '../context/TripDataContext';
import type { AttractionGuide } from '../content/attractions/types';
import { loadGuide } from '../content/attractions';

export default function AttractionGuidePage() {
  const { slug = '' } = useParams();
  const { data } = useTripData();
  const [guide, setGuide] = useState<AttractionGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [heroIdx, setHeroIdx] = useState(0);

  const attraction = data?.attractions.find((a) => a.slug === slug);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    loadGuide(slug).then((g) => {
      if (!cancelled) {
        setGuide(g);
        setLoading(false);
      }
    });
    return () => { cancelled = true; };
  }, [slug]);

  if (loading) {
    return (
      <div className="p-4">
        <div className="h-48 bg-surface animate-pulse rounded-xl" />
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="p-4 pb-24">
        <BackLink />
        <div className="bg-surface rounded-xl p-6 text-center">
          <p className="text-3xl mb-2">📖</p>
          <h2 className="font-semibold mb-1">{attraction?.name || 'Guide not ready'}</h2>
          <p className="text-text-muted text-sm">No detailed guide written for this attraction yet.</p>
        </div>
      </div>
    );
  }

  const hero = guide.gallery[heroIdx] || guide.gallery[0];
  const mapsUrl = attraction
    ? `https://www.google.com/maps/search/?api=1&query=${attraction.lat},${attraction.lng}`
    : '';

  return (
    <div className="pb-24">
      {/* Hero image */}
      {hero && (
        <div className="relative">
          <img
            src={hero}
            alt={attraction?.name || guide.slug}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg" />
          <div className="absolute top-3 left-3">
            <BackLink overlay />
          </div>
          <div className="absolute bottom-3 left-4 right-4">
            <h1 className="text-2xl font-bold text-white drop-shadow">
              {attraction?.name || guide.slug}
            </h1>
            {attraction && (
              <p className="text-white/90 text-sm drop-shadow">
                {attraction.city}
                {attraction.category && ` · ${attraction.category}`}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="p-4 space-y-5">
        {/* Quick facts */}
        {attraction && (
          <div className="bg-surface rounded-xl p-3 grid grid-cols-2 gap-3 text-sm">
            {attraction.hours && (
              <Fact label="Hours" value={attraction.hours} />
            )}
            {attraction.price && (
              <Fact label="Price" value={attraction.price} />
            )}
            {attraction.address && (
              <Fact label="Address" value={attraction.address} className="col-span-2" />
            )}
            <div className="col-span-2 flex flex-wrap gap-2 mt-1">
              {mapsUrl && (
                <a
                  href={mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full bg-primary-light/20 text-primary-light hover:bg-primary-light/30"
                >
                  🗺 Open in Maps
                </a>
              )}
              {attraction.website && (
                <a
                  href={attraction.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full bg-surface-light text-text hover:bg-surface-light/70"
                >
                  🌐 Official site
                </a>
              )}
            </div>
          </div>
        )}

        {/* Intro */}
        <p className="text-text leading-relaxed">{guide.intro}</p>

        {/* Highlights */}
        {guide.highlights.length > 0 && (
          <section>
            <SectionTitle icon="✨">Highlights</SectionTitle>
            <ul className="mt-2 space-y-1.5 text-sm">
              {guide.highlights.map((h, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-primary-light flex-shrink-0">•</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Body sections */}
        {guide.sections?.map((s) => (
          <section key={s.title}>
            <SectionTitle>{s.title}</SectionTitle>
            <p className="mt-1.5 text-sm leading-relaxed text-text/90 whitespace-pre-line">
              {s.body}
            </p>
          </section>
        ))}

        {/* Gallery thumbnails */}
        {guide.gallery.length > 1 && (
          <section>
            <SectionTitle icon="📷">Gallery</SectionTitle>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {guide.gallery.map((url, i) => (
                <button
                  key={i}
                  onClick={() => setHeroIdx(i)}
                  className={`aspect-square overflow-hidden rounded-lg ${i === heroIdx ? 'ring-2 ring-primary-light' : ''}`}
                >
                  <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Tips */}
        {guide.tips && guide.tips.length > 0 && (
          <section className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
            <SectionTitle icon="💡">Tips</SectionTitle>
            <ul className="mt-2 space-y-1.5 text-sm">
              {guide.tips.map((t, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-amber-300 flex-shrink-0">›</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sources */}
        {guide.sources && guide.sources.length > 0 && (
          <section>
            <SectionTitle icon="📚">Sources</SectionTitle>
            <ul className="mt-2 space-y-1 text-xs">
              {guide.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary-light hover:underline"
                  >
                    {s.name} ↗
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
}

function Fact({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={className}>
      <p className="text-[10px] uppercase tracking-wider text-text-muted/80">{label}</p>
      <p className="text-sm">{value}</p>
    </div>
  );
}

function SectionTitle({ children, icon }: { children: React.ReactNode; icon?: string }) {
  return (
    <h2 className="font-semibold text-sm uppercase tracking-wider text-text-muted">
      {icon && <span className="mr-1.5">{icon}</span>}
      {children}
    </h2>
  );
}

function BackLink({ overlay }: { overlay?: boolean }) {
  return (
    <Link
      to="/attractions"
      className={`inline-flex items-center gap-1 text-sm rounded-full px-3 py-1.5 ${
        overlay ? 'bg-black/40 backdrop-blur text-white' : 'text-text-muted hover:text-text'
      }`}
    >
      ← Attractions
    </Link>
  );
}
