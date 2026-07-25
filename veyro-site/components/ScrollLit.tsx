import type { CSSProperties, ElementType } from "react";

/**
 * A statement whose words brighten one after another as it scrolls up
 * the screen — the Apple/Stripe device.
 *
 * Split happens at build time, not at runtime, so there is no layout
 * thrash and no flash of unsplit text. The animation itself is a native
 * CSS view timeline: it scrubs with the scroll position rather than
 * firing once, and it runs off the main thread.
 *
 * Browsers without view-timeline support render the finished state —
 * full-contrast text — which is the whole point of writing it this way
 * round rather than starting from invisible.
 */
export default function ScrollLit({
  text,
  as: Tag = "p",
  className = "",
}: {
  text: string;
  as?: ElementType;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <Tag className={`scroll-lit ${className}`}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} style={{ "--i": i } as CSSProperties}>
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
