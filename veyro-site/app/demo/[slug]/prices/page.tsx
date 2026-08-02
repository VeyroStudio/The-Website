import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { demos, getDemo } from "@/lib/demos";

type Params = { params: Promise<{ slug: string }> };

/* Growth-only page: these params override the layout's, so slugs on
   other plans 404 instead of getting pages their plan does not include. */
export function generateStaticParams() {
  return demos.filter((d) => d.plan === "growth").map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  return { title: { absolute: `Prices — ${demo?.business ?? "Demo"} (demo preview)` } };
}

export default async function DemoPrices({ params }: Params) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo || demo.plan !== "growth" || !demo.services) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 pb-24 pt-28">
      <h1 className="[font-family:var(--demo-display)] text-6xl tracking-wide">
        PRICES
      </h1>
      <div className="demo-rule mt-3" aria-hidden="true" />
      <p className="mt-6 text-[var(--demo-faint)]">
        No hidden extras — the price on the list is the price in the chair.
      </p>

      <ul className="stagger mt-10 divide-y divide-[var(--demo-line)] border-y border-[var(--demo-line)]" data-reveal>
        {demo.services.map((s) => (
          <li key={s.name} className="demo-row flex items-baseline justify-between gap-4 py-5">
            <span className="text-xl">{s.name}</span>
            <span className="mx-2 grow border-b border-dotted border-[var(--demo-line-strong)]" aria-hidden="true" />
            <span className="text-xl font-bold text-[var(--demo-accent-ink)]">{s.price}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-[var(--demo-faint)]">
        Walk-ins welcome. Card and cash. Kids and OAP rates weekdays.
      </p>

      <Link
        href={`/demo/${demo.slug}/book`}
        className="mt-10 inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-[var(--demo-on-accent)] transition-opacity hover:opacity-85"
      >
        Book a chair
      </Link>
    </section>
  );
}
