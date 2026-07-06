// The Tokyo Disneyland ride-chooser is a self-contained static page in
// public/disneyland.html. We embed it in an iframe (rather than linking out)
// so it stays inside the installed PWA window — a target="_blank" navigation
// fails to open in standalone/home-screen mode — and the bottom nav remains
// available to switch back to the rest of the app.
export default function Disney() {
  const src = `${import.meta.env.BASE_URL}disneyland.html`;

  return (
    <iframe
      src={src}
      title="Tokyo Disneyland Ride Chooser"
      className="w-full h-[calc(100dvh-4rem)] border-0 block"
    />
  );
}
