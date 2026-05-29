import { Fragment, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useTripData } from '../context/TripDataContext';
import type { AttractionGuide, Lang } from '../content/attractions/types';
import { loadGuide } from '../content/attractions';

const LANG_KEY = 'attraction-guide-lang';

const labels: Record<Lang, Record<string, string>> = {
  en: {
    back: 'Back',
    hours: 'Hours',
    price: 'Price',
    address: 'Address',
    maps: '🗺 Open in Maps',
    official: '🌐 Official site',
    highlights: 'Highlights',
    gallery: 'Gallery',
    tips: 'Tips',
    sources: 'Sources',
    scheduled: 'On your schedule',
    noGuide: 'No detailed guide written for this attraction yet.',
  },
  tr: {
    back: 'Geri',
    hours: 'Saatler',
    price: 'Ücret',
    address: 'Adres',
    maps: '🗺 Haritada Aç',
    official: '🌐 Resmi site',
    highlights: 'Öne Çıkanlar',
    gallery: 'Galeri',
    tips: 'İpuçları',
    sources: 'Kaynaklar',
    scheduled: 'Programda',
    noGuide: 'Bu mekan için henüz detaylı rehber yazılmadı.',
  },
};

// Render text with **bold** markdown into JSX. Bold spans get accent color.
function renderRich(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) {
      return (
        <strong key={i} className="text-primary-light font-semibold">
          {p.slice(2, -2)}
        </strong>
      );
    }
    if (p.startsWith('*') && p.endsWith('*')) {
      return <em key={i} className="text-amber-200/90 not-italic">{p.slice(1, -1)}</em>;
    }
    return <Fragment key={i}>{p}</Fragment>;
  });
}

export default function AttractionGuidePage() {
  const { slug = '' } = useParams();
  const { data } = useTripData();
  const [guide, setGuide] = useState<AttractionGuide | null>(null);
  const [loading, setLoading] = useState(true);
  const [heroIdx, setHeroIdx] = useState(0);
  const [lang, setLang] = useState<Lang>(() => {
    const saved = (typeof localStorage !== 'undefined' && localStorage.getItem(LANG_KEY)) as Lang | null;
    return saved === 'tr' ? 'tr' : 'en';
  });

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

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  const t = labels[lang];

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
        <BackLink label={t.back} />
        <div className="bg-surface rounded-xl p-6 text-center">
          <p className="text-3xl mb-2">📖</p>
          <h2 className="font-semibold mb-1">{attraction?.name || 'Guide'}</h2>
          <p className="text-text-muted text-sm">{t.noGuide}</p>
        </div>
      </div>
    );
  }

  const locale = guide[lang];
  // Prefer guide gallery; fall back to the sheet's photo_url; otherwise show a textual header.
  const hero = guide.gallery[heroIdx] || guide.gallery[0] || attraction?.photo_url || '';
  const mapsUrl = attraction
    ? `https://www.google.com/maps/search/?api=1&query=${attraction.lat},${attraction.lng}`
    : '';

  return (
    <div className="pb-24">
      {/* Hero — image if available, otherwise a colored header */}
      {hero ? (
        <div className="relative">
          <img src={hero} alt={attraction?.name || guide.slug} className="w-full h-64 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-bg" />
          <div className="absolute top-3 left-3">
            <BackLink overlay label={t.back} />
          </div>
          <div className="absolute top-3 right-3">
            <LangToggle lang={lang} setLang={setLang} />
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
      ) : (
        <div className="bg-gradient-to-br from-primary-light/30 to-blue-900/40 px-4 pt-4 pb-6">
          <div className="flex items-center justify-between mb-4">
            <BackLink label={t.back} />
            <LangToggle lang={lang} setLang={setLang} />
          </div>
          <h1 className="text-2xl font-bold">
            {attraction?.name || guide.slug}
          </h1>
          {attraction && (
            <p className="text-text-muted text-sm">
              {attraction.city}
              {attraction.category && ` · ${attraction.category}`}
            </p>
          )}
        </div>
      )}

      {/* Gallery — directly below the hero image */}
      {guide.gallery.length > 1 && (
        <div className="px-4 pt-3">
          <div className="grid grid-cols-4 gap-2">
            {guide.gallery.map((url, i) => (
              <button
                key={i}
                onClick={() => {
                  setHeroIdx(i);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`aspect-square overflow-hidden rounded-lg ${i === heroIdx ? 'ring-2 ring-primary-light' : ''}`}
              >
                <img src={url} alt="" className="w-full h-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="p-4 space-y-5">
        {/* Quick facts */}
        {attraction && (
          <div className="bg-surface rounded-xl p-3 grid grid-cols-2 gap-3 text-sm">
            {attraction.hours && <Fact label={t.hours} value={attraction.hours} />}
            {attraction.price && <Fact label={t.price} value={attraction.price} />}
            {attraction.address && <Fact label={t.address} value={attraction.address} className="col-span-2" />}
            <div className="col-span-2 flex flex-wrap gap-2 mt-1">
              {mapsUrl && (
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full bg-primary-light/20 text-primary-light hover:bg-primary-light/30">
                  {t.maps}
                </a>
              )}
              {attraction.website && (
                <a href={attraction.website} target="_blank" rel="noopener noreferrer"
                  className="text-xs px-3 py-1.5 rounded-full bg-surface-light text-text hover:bg-surface-light/70">
                  {t.official}
                </a>
              )}
            </div>
          </div>
        )}

        {/* Scheduled appearances of this attraction */}
        {attraction && data && (() => {
          const matches = data.schedule.filter(
            (s) => s.ref_type === 'attraction' && s.ref_key.toLowerCase() === attraction.name.toLowerCase()
          );
          if (matches.length === 0) return null;
          return (
            <section className="bg-surface rounded-xl p-3">
              <p className="text-[10px] uppercase tracking-wider text-text-muted/80 mb-2">{t.scheduled}</p>
              <div className="space-y-1.5">
                {matches.map((s, i) => (
                  <Link
                    key={i}
                    to={`/schedule/${s.date}`}
                    state={{ scrollTime: s.time_start, scrollActivity: s.activity }}
                    className="flex items-center gap-3 text-sm hover:bg-surface-light rounded-lg px-2 py-1.5 -mx-1 transition"
                  >
                    <span className="text-primary-light flex-shrink-0">📅</span>
                    <span className="font-medium">
                      {new Date(s.date + 'T00:00:00').toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
                        weekday: 'short', month: 'short', day: 'numeric',
                      })}
                    </span>
                    <span className="text-text-muted">·</span>
                    <span className="text-text-muted">{s.time_start}{s.time_end ? `–${s.time_end}` : ''}</span>
                    <span className="ml-auto text-text-muted/60">→</span>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}

        {/* Intro */}
        <p className="text-text leading-relaxed">{renderRich(locale.intro)}</p>

        {/* Highlights */}
        {locale.highlights.length > 0 && (
          <section>
            <SectionTitle icon="✨">{t.highlights}</SectionTitle>
            <ul className="mt-2 space-y-2 text-sm">
              {locale.highlights.map((h, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="text-primary-light flex-shrink-0 mt-0.5">▸</span>
                  <span className="leading-relaxed">{renderRich(h)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Body sections */}
        {locale.sections?.map((s, idx) => (
          <section key={idx}>
            <SectionTitle>{s.title}</SectionTitle>
            <p className="mt-1.5 text-sm leading-relaxed text-text/90 whitespace-pre-line">
              {renderRich(s.body)}
            </p>
          </section>
        ))}

        {/* Tips */}
        {locale.tips && locale.tips.length > 0 && (
          <section className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3">
            <SectionTitle icon="💡">{t.tips}</SectionTitle>
            <ul className="mt-2 space-y-2 text-sm">
              {locale.tips.map((tip, i) => (
                <li key={i} className="flex gap-2.5 items-start">
                  <span className="text-amber-300 flex-shrink-0 mt-0.5">›</span>
                  <span className="leading-relaxed">{renderRich(tip)}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Sources */}
        {guide.sources && guide.sources.length > 0 && (
          <section>
            <SectionTitle icon="📚">{t.sources}</SectionTitle>
            <ul className="mt-2 space-y-1 text-xs">
              {guide.sources.map((s) => (
                <li key={s.url}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer"
                    className="text-primary-light hover:underline">
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

function BackLink({ overlay, label }: { overlay?: boolean; label: string }) {
  const navigate = useNavigate();
  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    // Prefer browser history (returns you to the schedule day, the attractions
    // list, or wherever you came from). Fall back to /attractions if there's
    // no history (direct URL / hard reload).
    if (window.history.length > 1) navigate(-1);
    else navigate('/attractions');
  };
  return (
    <Link
      to="/attractions"
      onClick={onClick}
      className={`inline-flex items-center gap-1 text-sm rounded-full px-3 py-1.5 ${
        overlay ? 'bg-black/40 backdrop-blur text-white' : 'bg-surface text-text hover:bg-surface-light'
      }`}
    >
      ← {label}
    </Link>
  );
}

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div className="bg-black/40 backdrop-blur rounded-full flex text-xs overflow-hidden">
      <button
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 ${lang === 'en' ? 'bg-primary-light text-white' : 'text-white/80'}`}
      >EN</button>
      <button
        onClick={() => setLang('tr')}
        className={`px-3 py-1.5 ${lang === 'tr' ? 'bg-primary-light text-white' : 'text-white/80'}`}
      >TR</button>
    </div>
  );
}
