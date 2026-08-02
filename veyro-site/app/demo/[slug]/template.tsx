/**
 * Remounts on every navigation within the demo, replaying the
 * entrance animation — so moving between Home, Prices and Gallery
 * glides instead of snapping. This is the "multi-page site that still
 * feels smooth" part of the pitch.
 */
export default function DemoTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="demo-page-enter">{children}</div>;
}
