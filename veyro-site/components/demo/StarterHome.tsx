import Image from "next/image";
import type { Demo } from "@/lib/demos";

/**
 * The Starter demo: everything on one page, phone number everywhere.
 * This is deliberately the whole site — when the prospect asks "is
 * that it?", the answer is "that's the £99 plan doing its one job:
 * getting your phone to ring." The upsell conversation starts itself.
 */
export default function StarterHome({ demo }: { demo: Demo }) {
  const tel = `tel:${demo.phone.replace(/\s/g, "")}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(demo.address)}`;

  return (
    <>
      {/* Hero — blunt and industrial, phone number IS the headline CTA */}
      <section className="relative flex min-h-[88svh] items-end overflow-hidden bg-neutral-950 pt-16 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={demo.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="demo-kenburns object-cover opacity-40"
          />
        </div>
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-5xl px-4 pb-14">
          <p
            className="demo-rise text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)] [text-shadow:0_1px_10px_rgba(0,0,0,0.6)]"
            style={{ ["--d" as string]: "100ms" }}
          >
            {demo.town}
          </p>
          <h1
            className="demo-rise mt-3 [font-family:var(--demo-display)] text-[clamp(2.6rem,10vw,5.5rem)] uppercase leading-[1.02]"
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
            <a
              href={tel}
              className="inline-flex min-h-14 items-center rounded-lg bg-[var(--accent)] px-8 text-xl font-bold text-[var(--demo-on-accent)] transition-opacity hover:opacity-85"
            >
              {demo.phone}
            </a>
            <a
              href={maps}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-14 items-center rounded-lg border-2 border-white/40 px-8 text-lg font-semibold text-white transition-colors hover:border-[var(--accent)]"
            >
              Find the workshop
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

      {/* Services & prices */}
      <section className="mx-auto max-w-3xl px-4 py-20" data-reveal>
        <h2 className="[font-family:var(--demo-display)] text-4xl uppercase">
          What we do
        </h2>
        <div className="demo-rule mt-3" aria-hidden="true" />
        <ul className="stagger mt-8 divide-y divide-[var(--demo-line)] border-y border-[var(--demo-line)]">
          {(demo.services ?? []).map((s) => (
            <li key={s.name} className="demo-row flex items-baseline justify-between gap-4 py-4">
              <span className="text-lg">{s.name}</span>
              <span className="mx-2 grow border-b border-dotted border-[var(--demo-line-strong)]" aria-hidden="true" />
              <span className="shrink-0 text-lg font-bold text-[var(--demo-accent-ink)]">{s.price}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[var(--demo-faint)]">
          Fixed prices agreed before any work starts. No surprises when you
          collect the keys.
        </p>
      </section>

      {/* Reviews */}
      <section className="border-y border-[var(--demo-line)] bg-[var(--demo-surface)] py-20" data-reveal>
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="[font-family:var(--demo-display)] text-4xl uppercase">
            What drivers say
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

      {/* Hours + find us + one big final call CTA */}
      <section className="mx-auto grid max-w-5xl gap-12 px-4 py-20 md:grid-cols-2" data-reveal>
        <div>
          <h2 className="[font-family:var(--demo-display)] text-4xl uppercase">
            Hours
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
          <h2 className="[font-family:var(--demo-display)] text-4xl uppercase">
            Find us
          </h2>
          <div className="demo-rule mt-3" aria-hidden="true" />
          <p className="mt-8 text-lg text-[var(--demo-muted)]">{demo.address}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={tel}
              className="inline-flex min-h-12 items-center rounded-lg bg-[var(--accent)] px-7 text-base font-bold text-[var(--demo-on-accent)] transition-opacity hover:opacity-85"
            >
              {demo.phone}
            </a>
            <a
              href={maps}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-12 items-center rounded-lg border-2 border-[var(--demo-line-strong)] px-7 text-base font-semibold transition-colors hover:border-[var(--accent)]"
            >
              Open in Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
