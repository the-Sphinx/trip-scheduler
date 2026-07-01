import { useTripData } from '../context/TripDataContext';

// The Tokyo Disneyland ride-chooser is a self-contained static page in
// public/disneyland.html. We embed it in an iframe (rather than linking out)
// so it stays inside the installed PWA window — a target="_blank" navigation
// fails to open in standalone/home-screen mode — and the bottom nav remains
// available to switch back to the rest of the app.
//
// The park ticket is a private Drive link that lives only in the sheet (never
// committed to this public repo), so we read it here and hand it to the static
// page via a ?ticket= query param, which renders the "Park Ticket" button.
export default function Disney() {
  const { data } = useTripData();
  const disney = data?.attractions.find((a) => a.slug === 'tokyo-disneyland');
  const ticketRaw = disney?.ticket ?? '';
  const ticket = ticketRaw
    ? /^https?:\/\//.test(ticketRaw)
      ? ticketRaw
      : `${import.meta.env.BASE_URL}${ticketRaw.replace(/^\//, '')}`
    : '';

  const base = `${import.meta.env.BASE_URL}disneyland.html`;
  const src = ticket ? `${base}?ticket=${encodeURIComponent(ticket)}` : base;

  return (
    <iframe
      src={src}
      title="Tokyo Disneyland Ride Chooser"
      className="w-full h-[calc(100dvh-4rem)] border-0 block"
    />
  );
}
