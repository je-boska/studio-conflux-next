export { metadata, viewport } from 'next-sanity/studio';

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div style={{ letterSpacing: 'normal' }}>{children}</div>;
}
