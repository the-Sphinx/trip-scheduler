import { GoogleMap, Marker, Polyline, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import { useMemo, useState } from 'react';
import type { ScheduleItem, Hotel } from '../types';
import { useTripData } from '../context/TripDataContext';
import { resolveScheduleItem } from '../services/resolve';

const mapContainerStyle = {
  width: '100%',
  height: '300px',
  borderRadius: '0.5rem',
};

const darkMapStyle = [
  { elementType: 'geometry', stylers: [{ color: '#1d2c4d' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#8ec3b9' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#1a3646' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#304a7d' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#0e1626' }] },
];

interface Props {
  items: ScheduleItem[];
  startHotel?: Hotel | null;
  endHotel?: Hotel | null;
}

// Build a Google Maps directions URL that draws all the day's stops in order
// (markers + route line). Opens the Maps app on mobile, the website on desktop.
//
// Each stop pins to its exact Google PLACE (place ID) when we have one — the
// side panel then shows the place NAME rather than a reverse-geocoded address —
// and falls back to the raw COORDINATE otherwise. Place IDs are fixed, curated
// references (verified to sit on our coordinates), not live name searches.
// The Maps URLs API allows ~9 waypoints; if a day has more mapped stops, sample
// the middle ones evenly to keep the route shape.
type UrlPoint = { lat: number; lng: number; name: string; placeId: string };
const MAX_WAYPOINTS = 9;
const coord = (p: UrlPoint) => `${p.lat.toFixed(6)},${p.lng.toFixed(6)}`;
// Value Maps shows for a stop: its name when we have a place ID, else the coord.
const pointValue = (p: UrlPoint) => (p.placeId ? p.name || coord(p) : coord(p));
function buildMapsUrl(pts: UrlPoint[]): string {
  if (pts.length === 0) return '';
  if (pts.length === 1) {
    const p = pts[0];
    const params = new URLSearchParams({ api: '1', query: pointValue(p) });
    if (p.placeId) params.set('query_place_id', p.placeId);
    return `https://www.google.com/maps/search/?${params.toString()}`;
  }
  const origin = pts[0];
  const destination = pts[pts.length - 1];
  let middle = pts.slice(1, -1);
  if (middle.length > MAX_WAYPOINTS) {
    const step = (middle.length - 1) / (MAX_WAYPOINTS - 1);
    middle = Array.from({ length: MAX_WAYPOINTS }, (_, i) => middle[Math.round(i * step)]);
  }
  const params = new URLSearchParams({
    api: '1',
    origin: pointValue(origin),
    destination: pointValue(destination),
    travelmode: 'walking',
  });
  if (origin.placeId) params.set('origin_place_id', origin.placeId);
  if (destination.placeId) params.set('destination_place_id', destination.placeId);
  if (middle.length) {
    params.set('waypoints', middle.map(pointValue).join('|'));
    // Parallel, positional list; empty slot = that waypoint uses its coordinate.
    if (middle.some((p) => p.placeId)) {
      params.set('waypoint_place_ids', middle.map((p) => p.placeId || '').join('|'));
    }
  }
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

export default function MapView({ items, startHotel, endHotel }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { data } = useTripData();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
  });

  // Build ordered point list: [startHotel, ...resolved items, endHotel]
  // Build the ordered point list, then merge consecutive (or any) points that
  // share the same location — multi-stop stations like "08:15 Hankyu" and
  // "07:45 Walk arrives Kawaramachi" would otherwise stack on top of each other.
  const points = useMemo(() => {
    type Pt = { lat: number; lng: number; label: string; titles: string[]; kind: 'hotel' | 'item'; name: string; placeId: string };
    const raw: Pt[] = [];
    const push = (p: Pt) => {
      const COORD_EPS = 1e-4; // ~10m
      const i = raw.findIndex((q) => Math.abs(q.lat - p.lat) < COORD_EPS && Math.abs(q.lng - p.lng) < COORD_EPS);
      if (i >= 0) {
        raw[i].titles.push(...p.titles);
        // Keep the earliest label (already the first), but indicate multiple stops
        if (raw[i].kind === 'item' && /^\d/.test(raw[i].label)) {
          const count = raw[i].titles.length;
          raw[i].label = raw[i].label.replace(/\s*\+\d+$/, '') + (count > 1 ? ` +${count - 1}` : '');
        }
        return;
      }
      raw.push(p);
    };

    if (startHotel && startHotel.lat && startHotel.lng) {
      push({ lat: startHotel.lat, lng: startHotel.lng, label: '🏨', titles: [`Start: ${startHotel.name}`], kind: 'hotel', name: startHotel.name, placeId: startHotel.place_id ?? '' });
    }
    for (const item of items) {
      const r = resolveScheduleItem(item, data);
      if (r.lat && r.lng) {
        const t = (item.time_start || '').padStart(5, '0');
        push({ lat: r.lat, lng: r.lng, label: t || '•', titles: [`${item.time_start ? item.time_start + ' · ' : ''}${item.activity}`], kind: 'item', name: r.location_name || item.activity, placeId: r.place_id });
      }
    }
    if (endHotel && endHotel.lat && endHotel.lng) {
      push({ lat: endHotel.lat, lng: endHotel.lng, label: '🏨', titles: [`End: ${endHotel.name}`], kind: 'hotel', name: endHotel.name, placeId: endHotel.place_id ?? '' });
    }
    return raw;
  }, [items, startHotel, endHotel, data]);

  const center = useMemo(() => {
    if (points.length === 0) return { lat: 35.6762, lng: 139.6503 };
    const lat = points.reduce((s, p) => s + p.lat, 0) / points.length;
    const lng = points.reduce((s, p) => s + p.lng, 0) / points.length;
    return { lat, lng };
  }, [points]);

  const onMapLoad = (map: google.maps.Map) => {
    if (points.length === 0) return;
    if (points.length === 1) {
      map.setCenter({ lat: points[0].lat, lng: points[0].lng });
      map.setZoom(15);
      return;
    }
    const bounds = new google.maps.LatLngBounds();
    points.forEach((p) => bounds.extend({ lat: p.lat, lng: p.lng }));
    map.fitBounds(bounds, 40);
  };

  const path = useMemo(() => points.map((p) => ({ lat: p.lat, lng: p.lng })), [points]);
  const mapsUrl = useMemo(
    () => buildMapsUrl(points.map((p) => ({ lat: p.lat, lng: p.lng, name: p.name, placeId: p.placeId }))),
    [points]
  );

  if (!apiKey) {
    return (
      <div className="bg-surface rounded-lg p-4 text-center text-text-muted text-sm">
        Map unavailable (no API key configured)
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="bg-surface rounded-lg h-[300px] animate-pulse" />;
  }

  return (
    <div className="swiper-no-swiping relative">
      {mapsUrl && (
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          title="Open the full day route in Google Maps"
          className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-surface/90 backdrop-blur border border-surface-light rounded-full px-3 py-1.5 text-xs font-medium text-text shadow active:scale-95 transition-transform"
        >
          🗺️ Open in Maps
        </a>
      )}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
        onLoad={onMapLoad}
        onClick={() => setActiveIdx(null)}
        options={{
          styles: darkMapStyle,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'greedy',
        }}
      >
        {points.map((p, i) => (
          <Marker
            key={i}
            position={{ lat: p.lat, lng: p.lng }}
            icon={
              p.kind === 'hotel'
                ? undefined
                : {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 18,
                    fillColor: '#2563eb',
                    fillOpacity: 1,
                    strokeColor: '#ffffff',
                    strokeWeight: 2,
                  }
            }
            label={
              p.kind === 'hotel'
                ? { text: p.label, fontSize: '16px' }
                : { text: p.label, color: '#ffffff', fontSize: '10px', fontWeight: 'bold' }
            }
            title={p.titles.join(' · ')}
            onClick={() => setActiveIdx(i)}
          >
            {activeIdx === i && (
              <InfoWindow
                onCloseClick={() => setActiveIdx(null)}
                options={{ headerDisabled: true, pixelOffset: new google.maps.Size(0, -8) }}
              >
                <div style={{ color: '#111', fontSize: 13, fontWeight: 600, padding: '2px 4px', maxWidth: 240 }}>
                  {p.titles.map((t, idx) => (
                    <div key={idx} style={{ marginTop: idx > 0 ? 4 : 0 }}>{t}</div>
                  ))}
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
        {path.length > 1 && (
          <Polyline
            path={path}
            options={{ strokeColor: '#3b82f6', strokeOpacity: 0.8, strokeWeight: 3 }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
