import Image from "next/image";
import Link from "next/link";
import type { Demo } from "@/lib/demos";

/**
 * The Pro demo's home page. Pro's differentiator is online ordering,
 * so everything here funnels toward the Menu page — the hero CTA, the
 * menu teaser, the closing strip. The basket itself lives on /menu.
 */
export default function ProHome({ demo }: { demo: Demo }) {
  const base = `/demo/${demo.slug}`;
  const tel = `tel:${demo.phone.replace(/\s/g, "")}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(demo.address)}`;
  const firstSection = demo.menu?.[0];

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-neutral-950 pt-16 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={demo.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="demo-kenburns object-cover opacity-50"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
          aria-hidden="true"
        />
        <div className="demo-ember" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-5xl px-4 pb-16">
          <p
            className="demo-rise text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)] [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]"
            style={{ ["--d" as string]: "100ms" }}
          >
            {demo.town}
          </p>
          <h1
            className="demo-rise mt-3 [font-family:var(--demo-display)] text-[clamp(2.8rem,11vw,6.5rem)] leading-[1.02]"
            style={{ ["--d" as string]: "220ms" }}
          >
            {demo.business}
          </h1>
          <p
            className="demo-rise mt-4 max-w-md text-lg text-white/85"
            style={{ ["--d" as string]: "360ms" }}
          >
            {demo.strapline}
          </p>
          <div
            className="demo-rise mt-8 flex flex-wrap gap-3"
            style={{ ["--d" as string]: "500ms" }}
          >
            <Link
              href={`${base}/menu`}
              className="demo-sheen demo-press inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-[var(--demo-on-accent)] transition-opacity hover:opacity-85"
            >
              Order for collection
            </Link>
            <a
              href={tel}
              className="inline-flex min-h-12 items-center rounded-full border-2 border-white/40 px-7 text-base font-semibold text-white transition-colors hover:border-[var(--accent)]"
            >
              {demo.phone}
            </a>
          </div>
        </div>
      </section>

      {/* USP strip */}
      <section className="border-y border-[var(--demo-line)] bg-[var(--demo-surface)]">
        <ul className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-[var(--demo-line)] px-4">
          {demo.usps.map((u) => (
            <li
              key={u}
              className="py-5 text-center text-sm font-semibold uppercase tracking-wider text-[var(--demo-muted)]"
            >
              {u}
            </li>
          ))}
        </ul>
      </section>

      {/* Menu teaser — the funnel into the ordering page */}
      <section className="mx-auto max-w-5xl px-4 py-20" data-reveal>
        <h2 className="demo-mask [font-family:var(--demo-display)] text-4xl md:text-5xl">
<span>{firstSection?.category ?? "Menu"}</span>
</h2>
        <div className="demo-rule mt-3" aria-hidden="true" />
        <ul className="stagger mt-8 divide-y divide-[var(--demo-line)] border-y border-[var(--demo-line)]">
          {(firstSection?.items ?? []).slice(0, 4).map((item) => (
            <li key={item.name} className="demo-row py-4">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-lg font-semibold">{item.name}</span>
                <span className="mx-2 grow border-b border-dotted border-[var(--demo-line-strong)]" aria-hidden="true" />
                <span className="shrink-0 text-lg font-bold text-[var(--demo-accent-ink)]">
                  {item.price}
                </span>
              </div>
              {item.desc && (
                <p className="mt-1 text-sm text-[var(--demo-faint)]">{item.desc}</p>
              )}
            </li>
          ))}
        </ul>
        <Link
          href={`${base}/menu`}
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[var(--demo-accent-ink)] transition-opacity hover:opacity-80"
        >
          Full menu &amp; ordering
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" />
          </svg>
        </Link>
      </section>

      {/* Food photography */}
      <section className="mx-auto max-w-5xl px-4 pb-20" data-reveal>
        <div className="stagger grid grid-cols-3 gap-3">
          {["/demo/pizza-1.jpg", "/demo/pizza-2.jpg", "/demo/pizza-3.jpg"].map((src) => (
            <div key={src} className="demo-img-reveal overflow-hidden rounded-lg">
              <Image
                src={src}
                alt="From the oven"
                width={900}
                height={675}
                className="demo-tile h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="border-y border-[var(--demo-line)] bg-[var(--demo-surface)] py-20" data-reveal>
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="demo-mask [font-family:var(--demo-display)] text-4xl md:text-5xl">
<span>What people say</span>
</h2>
          <div className="demo-rule mt-3" aria-hidden="true" />
          <div className="stagger mt-8 grid gap-4 md:grid-cols-3">
            {demo.reviews.map((r) => (
              <figure key={r.text} className="rounded-lg border border-[var(--demo-line)] p-5">
                <div className="flex gap-1 text-[var(--demo-accent-ink)]" aria-label="5 star review">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-3 text-[var(--demo-muted)]">“{r.text}”</blockquote>
                <figcaption className="mt-3 text-sm text-[var(--demo-faint)]">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Hours + find us */}
      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-20 md:grid-cols-2" data-reveal>
        <div>
          <h2 className="demo-mask [font-family:var(--demo-display)] text-4xl md:text-5xl">
<span>Hours</span>
</h2>
          <div className="demo-rule mt-3" aria-hidden="true" />
          <ul className="stagger mt-8 space-y-3">
            {demo.hours.map((h) => (
              <li key={h.days} className="flex justify-between border-b border-[var(--demo-line)] pb-3 text-lg">
                <span>{h.days}</span>
                <span className={h.open === "Closed" ? "text-[var(--demo-faint)]" : "font-semibold"}>
                  {h.open}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="demo-mask [font-family:var(--demo-display)] text-4xl md:text-5xl">
<span>Find us</span>
</h2>
          <div className="demo-rule mt-3" aria-hidden="true" />
          <p className="mt-8 text-lg text-[var(--demo-muted)]">{demo.address}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`${base}/menu`}
              className="demo-sheen demo-press inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-[var(--demo-on-accent)] transition-opacity hover:opacity-85"
            >
              Order for collection
            </Link>
            <a
              href={maps}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-12 items-center rounded-full border-2 border-[var(--demo-line-strong)] px-7 text-base font-semibold transition-colors hover:border-[var(--accent)]"
            >
              Open in Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
