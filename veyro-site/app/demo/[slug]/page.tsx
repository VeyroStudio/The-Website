import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { demos, getDemo } from "@/lib/demos";
import { site } from "@/lib/site";

/**
 * A prospect demo: the single-page site a Starter-plan client would
 * get, rendered with their trade's look rather than VEYRO's.
 *
 * Design intent — everything the sales pitch claims, made visible:
 * phone number one thumb away (sticky bar + hero + floating button),
 * prices readable without pinching, hours and directions up front.
 */

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) return { title: "Not found" };
  return {
    title: { absolute: `${demo.business} — ${demo.town} (demo preview)` },
    description: `Private demo preview built by ${site.name}.`,
  };
}

export default async function DemoPage({ params }: Params) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  const tel = `tel:${demo.phone.replace(/\s/g, "")}`;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    demo.address
  )}`;

  return (
    <div
      className="min-h-dvh bg-[#101114] text-[#F4F1EA] [font-family:var(--font-demo-body)]"
      style={{ ["--accent" as string]: demo.accent }}
    >
      {/* Sticky call bar */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#101114]/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <span className="[font-family:var(--font-demo-display)] text-2xl tracking-wide">
            {demo.business}
          </span>
          <a
            href={tel}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--accent)] px-5 text-sm font-semibold text-black transition-opacity hover:opacity-85"
          >
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6.6 3h-2A1.6 1.6 0 0 0 3 4.7C3 13.1 10.9 21 19.3 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.6 1.6 0 0 0-1.3-1.6l-2.6-.5a1.6 1.6 0 0 0-1.6.7l-.7 1a13 13 0 0 1-5.3-5.3l1-.7a1.6 1.6 0 0 0 .7-1.6l-.5-2.6A1.6 1.6 0 0 0 6.6 3Z" />
            </svg>
            {demo.phone}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-[86svh] items-end overflow-hidden pt-16">
        <Image
          src="/demo/hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[#101114] via-[#101114]/40 to-transparent"
          aria-hidden="true"
        />
        <div className="relative mx-auto w-full max-w-5xl px-4 pb-16" data-reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--accent)]">
            {demo.town}
          </p>
          <h1 className="mt-3 [font-family:var(--font-demo-display)] text-[clamp(3.5rem,14vw,8rem)] leading-[0.9] tracking-wide">
            {demo.business}
          </h1>
          <p className="mt-4 max-w-md text-lg text-white/70">{demo.strapline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={tel}
              className="inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-black transition-opacity hover:opacity-85"
            >
              Call to book
            </a>
            <a
              href={maps}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-12 items-center rounded-full border-2 border-white/25 px-7 text-base font-semibold transition-colors hover:border-[var(--accent)]"
            >
              Get directions
            </a>
          </div>
        </div>
      </section>

      {/* Prices */}
      <section className="mx-auto max-w-5xl px-4 py-20" data-reveal>
        <h2 className="[font-family:var(--font-demo-display)] text-5xl tracking-wide">
          PRICES
        </h2>
        <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
          {demo.services.map((s) => (
            <li key={s.name} className="flex items-baseline justify-between gap-4 py-4">
              <span className="text-lg">{s.name}</span>
              <span className="shrink-0 border-b border-dotted border-white/20 grow mx-2" aria-hidden="true" />
              <span className="text-lg font-bold text-[var(--accent)]">{s.price}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-white/50">
          Walk-ins welcome. Card and cash.
        </p>
      </section>

      {/* Gallery */}
      <section className="mx-auto max-w-5xl px-4 pb-20" data-reveal>
        <h2 className="[font-family:var(--font-demo-display)] text-5xl tracking-wide">
          THE SHOP
        </h2>
        <div className="mt-8 grid grid-cols-2 gap-3">
          <Image src="/demo/gallery-1.jpg" alt="Inside the shop" width={900} height={675} className="h-full w-full rounded-lg object-cover" />
          <Image src="/demo/gallery-2.jpg" alt="The chair" width={900} height={675} className="h-full w-full rounded-lg object-cover" />
        </div>
      </section>

      {/* Reviews */}
      <section className="border-y border-white/10 bg-white/[0.03] py-20" data-reveal>
        <div className="mx-auto max-w-5xl px-4">
          <h2 className="[font-family:var(--font-demo-display)] text-5xl tracking-wide">
            WHAT PEOPLE SAY
          </h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
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
          <h2 className="[font-family:var(--font-demo-display)] text-5xl tracking-wide">
            HOURS
          </h2>
          <ul className="mt-8 space-y-3">
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
          <h2 className="[font-family:var(--font-demo-display)] text-5xl tracking-wide">
            FIND US
          </h2>
          <p className="mt-8 text-lg text-white/80">{demo.address}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={tel} className="inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-black transition-opacity hover:opacity-85">
              {demo.phone}
            </a>
            <a href={maps} target="_blank" rel="noreferrer noopener" className="inline-flex min-h-12 items-center rounded-full border-2 border-white/25 px-7 text-base font-semibold transition-colors hover:border-[var(--accent)]">
              Open in Maps
            </a>
          </div>
        </div>
      </section>

      {/* Floating call button on phones */}
      <a
        href={tel}
        aria-label={`Call ${demo.business}`}
        className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[var(--accent)] text-black shadow-lg shadow-black/40 md:hidden"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6.6 3h-2A1.6 1.6 0 0 0 3 4.7C3 13.1 10.9 21 19.3 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.6 1.6 0 0 0-1.3-1.6l-2.6-.5a1.6 1.6 0 0 0-1.6.7l-.7 1a13 13 0 0 1-5.3-5.3l1-.7a1.6 1.6 0 0 0 .7-1.6l-.5-2.6A1.6 1.6 0 0 0 6.6 3Z" />
        </svg>
      </a>

      {/* Demo credit — part of the pitch, keep it */}
      <footer className="border-t border-white/10 py-8 text-center text-sm text-white/40">
        <p>
          Demo preview — not a live business. Built by{" "}
          <a href={site.url} className="text-[var(--accent)] underline-offset-4 hover:underline">
            {site.name}
          </a>{" "}
          · websites for local businesses from £99/month
        </p>
      </footer>
    </div>
  );
}
