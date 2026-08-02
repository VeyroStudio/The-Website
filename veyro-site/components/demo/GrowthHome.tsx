import Image from "next/image";
import Link from "next/link";
import type { Demo } from "@/lib/demos";

/**
 * The Growth demo's home page. The other pages carry the depth; this
 * one's job is the first impression — Ken Burns hero, cascading text,
 * and teasers that pull the prospect into Prices and Gallery so they
 * feel the multi-page structure the £199 plan is selling.
 */
export default function GrowthHome({ demo }: { demo: Demo }) {
  const base = `/demo/${demo.slug}`;
  const tel = `tel:${demo.phone.replace(/\s/g, "")}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(demo.address)}`;

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[92svh] items-end overflow-hidden pt-16">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={demo.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="demo-kenburns object-cover opacity-45"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#101114] via-[#101114]/40 to-transparent"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-5xl px-4 pb-16">
          <p
            className="demo-rise text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]"
            style={{ ["--d" as string]: "100ms" }}
          >
            {demo.town}
          </p>
          <h1
            className="demo-rise mt-3 [font-family:var(--demo-display)] text-[clamp(3.5rem,14vw,8rem)] leading-[0.9] tracking-wide"
            style={{ ["--d" as string]: "220ms" }}
          >
            {demo.business}
          </h1>
          <p
            className="demo-rise mt-4 max-w-md text-lg text-white/70"
            style={{ ["--d" as string]: "360ms" }}
          >
            {demo.strapline}
          </p>
          <div
            className="demo-rise mt-8 flex flex-wrap gap-3"
            style={{ ["--d" as string]: "500ms" }}
          >
            <Link
              href={`${base}/book`}
              className="inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-black transition-opacity hover:opacity-85"
            >
              Book a chair
            </Link>
            <a
              href={tel}
              className="inline-flex min-h-12 items-center rounded-full border-2 border-white/25 px-7 text-base font-semibold transition-colors hover:border-[var(--accent)]"
            >
              {demo.phone}
            </a>
          </div>
        </div>
      </section>

      {/* USP strip */}
      <section className="border-y border-white/10 bg-white/[0.03]">
        <ul className="mx-auto grid max-w-5xl grid-cols-3 divide-x divide-white/10 px-4">
          {demo.usps.map((u) => (
            <li
              key={u}
              className="py-5 text-center text-sm font-semibold uppercase tracking-wider text-white/70"
            >
              {u}
            </li>
          ))}
        </ul>
      </section>

      {/* Prices teaser */}
      <section className="mx-auto max-w-5xl px-4 py-20" data-reveal>
        <h2 className="[font-family:var(--demo-display)] text-5xl tracking-wide">
          PRICES
        </h2>
        <div className="demo-rule mt-3" aria-hidden="true" />
        <ul className="stagger mt-8 divide-y divide-white/10 border-y border-white/10">
          {(demo.services ?? []).slice(0, 4).map((s) => (
            <li key={s.name} className="demo-row flex items-baseline justify-between gap-4 py-4">
              <span className="text-lg">{s.name}</span>
              <span className="mx-2 grow border-b border-dotted border-white/20" aria-hidden="true" />
              <span className="text-lg font-bold text-[var(--accent)]">{s.price}</span>
            </li>
          ))}
        </ul>
        <Link
          href={`${base}/prices`}
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[var(--accent)] transition-opacity hover:opacity-80"
        >
          Full price list
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" />
          </svg>
        </Link>
      </section>

      {/* Gallery teaser */}
      <section className="mx-auto max-w-5xl px-4 pb-20" data-reveal>
        <h2 className="[font-family:var(--demo-display)] text-5xl tracking-wide">
          THE SHOP
        </h2>
        <div className="demo-rule mt-3" aria-hidden="true" />
        <div className="stagger mt-8 grid grid-cols-3 gap-3">
          {(demo.gallery ?? []).slice(0, 3).map((g) => (
            <div key={g.src} className="overflow-hidden rounded-lg">
              <Image
                src={g.src}
                alt={g.alt}
                width={900}
                height={675}
                className="demo-tile h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <Link
          href={`${base}/gallery`}
          className="mt-6 inline-flex min-h-11 items-center gap-2 text-base font-semibold text-[var(--accent)] transition-opacity hover:opacity-80"
        >
          See the gallery
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M4 12h15m-6-6 6 6-6 6" />
          </svg>
        </Link>
      </section>

      {/* Reviews */}
      <section className="border-y border-white/10 bg-white/[0.03] py-20" data-reveal>
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="[font-family:var(--demo-display)] text-5xl tracking-wide">
            WHAT PEOPLE SAY
          </h2>
          <div className="demo-rule mt-3" aria-hidden="true" />
          <div className="stagger mt-8 grid gap-4 md:grid-cols-3">
            {demo.reviews.map((r) => (
              <figure key={r.text} className="rounded-lg border border-white/10 p-5">
                <div className="flex gap-1 text-[var(--accent)]" aria-label="5 star review">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-3 text-white/80">“{r.text}”</blockquote>
                <figcaption className="mt-3 text-sm text-white/40">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Hours + find us */}
      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-20 md:grid-cols-2" data-reveal>
        <div>
          <h2 className="[font-family:var(--demo-display)] text-5xl tracking-wide">
            HOURS
          </h2>
          <div className="demo-rule mt-3" aria-hidden="true" />
          <ul className="stagger mt-8 space-y-3">
            {demo.hours.map((h) => (
              <li key={h.days} className="flex justify-between border-b border-white/10 pb-3 text-lg">
                <span>{h.days}</span>
                <span className={h.open === "Closed" ? "text-white/40" : "font-semibold"}>
                  {h.open}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="[font-family:var(--demo-display)] text-5xl tracking-wide">
            FIND US
          </h2>
          <div className="demo-rule mt-3" aria-hidden="true" />
          <p className="mt-8 text-lg text-white/80">{demo.address}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href={`${base}/book`}
              className="inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-black transition-opacity hover:opacity-85"
            >
              Book a chair
            </Link>
            <a
              href={maps}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-12 items-center rounded-full border-2 border-white/25 px-7 text-base font-semibold transition-colors hover:border-[var(--accent)]"
            >
              Open in Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
