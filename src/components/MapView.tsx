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

export default function MapView({ items, startHotel, endHotel }: Props) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const { data } = useTripData();

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || '',
  });

  // Build ordered point list: [startHotel, ...resolved items, endHotel]
  const points = useMemo(() => {
    const pts: Array<{ lat: number; lng: number; label: string; title: string; kind: 'hotel' | 'item' }> = [];
    if (startHotel && startHotel.lat && startHotel.lng) {
      pts.push({ lat: startHotel.lat, lng: startHotel.lng, label: '🏨', title: `Start: ${startHotel.name}`, kind: 'hotel' });
    }
    for (const item of items) {
      const r = resolveScheduleItem(item, data);
      if (r.lat && r.lng) {
        const t = (item.time_start || '').padStart(5, '0');
        pts.push({ lat: r.lat, lng: r.lng, label: t || '•', title: `${item.time_start ? item.time_start + ' · ' : ''}${item.activity}`, kind: 'item' });
      }
    }
    // Avoid duplicating end hotel if same as last item (or same as start)
    if (endHotel && endHotel.lat && endHotel.lng) {
      const last = pts[pts.length - 1];
      const dup = last && Math.abs(last.lat - endHotel.lat) < 1e-5 && Math.abs(last.lng - endHotel.lng) < 1e-5;
      if (!dup) {
        pts.push({ lat: endHotel.lat, lng: endHotel.lng, label: '🏨', title: `End: ${endHotel.name}`, kind: 'hotel' });
      }
    }
    return pts;
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
    <div className="swiper-no-swiping">
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
            title={p.title}
            onClick={() => setActiveIdx(i)}
          >
            {activeIdx === i && (
              <InfoWindow
                onCloseClick={() => setActiveIdx(null)}
                options={{ headerDisabled: true, pixelOffset: new google.maps.Size(0, -8) }}
              >
                <div style={{ color: '#111', fontSize: 13, fontWeight: 600, padding: '2px 4px', maxWidth: 220 }}>
                  {p.title}
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
