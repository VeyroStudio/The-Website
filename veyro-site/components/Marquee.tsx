import type { CSSProperties } from "react";

function Row({ items, clone }: { items: string[]; clone?: boolean }) {
  return (
    <ul
      className="flex shrink-0 items-center"
      aria-hidden={clone ? "true" : undefined}
    >
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center whitespace-nowrap">
          <span className="px-5 text-sm font-medium text-muted md:px-7 md:text-base">
            {item}
          </span>
          <span className="size-1.5 rounded-full bg-amber" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}

/**
 * Infinite capability ticker.
 *
 * The track is duplicated once and translated exactly -50%, which is what
 * makes the loop seamless. Animation is a single compositor-only transform,
 * so it costs nothing on a low-end phone, and it is disabled outright under
 * `prefers-reduced-motion`. The duplicate is hidden from assistive tech.
 */
export default function Marquee({
  items,
  duration = 46,
}: {
  items: string[];
  duration?: number;
}) {
  return (
    <div
      className="marquee-host relative overflow-hidden border-y border-line bg-cream-2 py-4"
      style={
        {
          maskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
        } as CSSProperties
      }
    >
      <div className="marquee" style={{ ["--dur" as string]: `${duration}s` }}>
        <Row items={items} />
        <Row items={items} clone />
      </div>
    </div>
  );
}
