import Link from "next/link";
import type { ComponentProps, ReactNode, CSSProperties } from "react";

/* ------------------------------------------------------------------ */
/* Icons — 24×24 stroke set, sized by the caller. No emoji anywhere.   */
/* ------------------------------------------------------------------ */

type IconProps = { className?: string };

export function ArrowRight({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M4 12h15m-6-6 6 6-6 6" />
    </svg>
  );
}

export function ArrowUpRight({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

export function Check({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`check-draw ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* pathLength normalises the dash maths to 1 for the draw-in */}
      <path d="m4 12.5 5 5L20 6.5" pathLength={1} />
    </svg>
  );
}

export function Plus({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Phone({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6.6 3h-2A1.6 1.6 0 0 0 3 4.7C3 13.1 10.9 21 19.3 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.6 1.6 0 0 0-1.3-1.6l-2.6-.5a1.6 1.6 0 0 0-1.6.7l-.7 1a13 13 0 0 1-5.3-5.3l1-.7a1.6 1.6 0 0 0 .7-1.6l-.5-2.6A1.6 1.6 0 0 0 6.6 3Z" />
    </svg>
  );
}

export function Spinner({ className = "size-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`spin ${className}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M12 3a9 9 0 1 0 9 9" />
    </svg>
  );
}

export function Star({ className = "size-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Buttons                                                             */
/*                                                                     */
/* Amber never carries text on cream (2.74:1). It is a background      */
/* only, and text on it is always navy (5.45:1).                       */
/* ------------------------------------------------------------------ */

const base =
  "group btn-sheen inline-flex cursor-pointer items-center justify-center gap-2 rounded-full " +
  "font-semibold tracking-tight transition-[background-color,border-color,color,transform] " +
  "duration-300 active:translate-y-px active:scale-[0.98] min-h-12 px-6 text-[0.9375rem] " +
  "disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "bg-amber text-navy hover:bg-amber-hi",
  dark: "bg-navy text-cream hover:bg-navy-2",
  ghost: "border-2 border-navy/15 text-navy hover:border-amber hover:bg-amber/10",
  onDark: "bg-cream text-navy hover:bg-amber",
} as const;

type Variant = keyof typeof variants;

export function ButtonLink({
  href,
  variant = "primary",
  className = "",
  children,
  ...rest
}: { href: string; variant?: Variant } & Omit<
  ComponentProps<typeof Link>,
  "href" | "className"
> & { className?: string }) {
  const external =
    href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={cls}
        rel="noreferrer noopener"
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  children,
  ...rest
}: { variant?: Variant } & ComponentProps<"button">) {
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...rest}>
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Editorial primitives                                                */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className = "",
  onDark = false,
}: {
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-2.5 ${
        onDark ? "text-cream-3" : ""
      } ${className}`}
    >
      <span
        className={`inline-block h-2 w-2 rounded-full ${
          onDark ? "bg-amber-hi" : "bg-amber"
        }`}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}

/**
 * A display heading that reveals line by line.
 *
 * Lines are authored rather than measured at runtime — no layout
 * thrash, no flash of unsplit text, and the break points stay exactly
 * where they were art-directed. The heading is its own reveal target,
 * so it never depends on a parent carrying `data-reveal`.
 */
export function SplitHeading({
  lines,
  as: Tag = "h2",
  className = "",
  stagger = 85,
  start = 0,
}: {
  lines: ReactNode[];
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  stagger?: number;
  start?: number;
}) {
  return (
    <Tag className={`display ${className}`} data-reveal="fade">
      {lines.map((line, i) => (
        <span className="line-mask" key={i}>
          <span style={{ "--d": `${start + i * stagger}ms` } as CSSProperties}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

/** Hairline that draws itself in from the left as it enters view. */
export function Rule({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div
      data-reveal="fade"
      className={`h-px w-full ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      <div className="rule-draw h-px w-full bg-line" />
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={`py-20 md:py-28 ${className}`}>
      {children}
    </section>
  );
}

/** Small green-dot availability badge. */
export function Availability({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5 rounded-full border border-line bg-cream-2 px-4 py-1.5 text-sm font-medium text-navy">
      <span className="ping relative inline-block size-2 rounded-full bg-success" aria-hidden="true" />
      {children}
    </span>
  );
}

export function delay(ms: number): CSSProperties {
  return { "--d": `${ms}ms` } as CSSProperties;
}
