import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDemo } from "@/lib/demos";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  return { title: { absolute: `Prices — ${demo?.business ?? "Demo"} (demo preview)` } };
}

export default async function DemoPrices({ params }: Params) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 pb-24 pt-28">
      <h1 className="[font-family:var(--font-demo-display)] text-6xl tracking-wide">
        PRICES
      </h1>
      <div className="demo-rule mt-3" aria-hidden="true" />
      <p className="mt-6 text-white/60">
        No hidden extras — the price on the list is the price in the chair.
      </p>

      <ul className="stagger mt-10 divide-y divide-white/10 border-y border-white/10" data-reveal>
        {demo.services.map((s) => (
          <li key={s.name} className="demo-row flex items-baseline justify-between gap-4 py-5">
            <span className="text-xl">{s.name}</span>
            <span className="mx-2 grow border-b border-dotted border-white/20" aria-hidden="true" />
            <span className="text-xl font-bold text-[var(--accent)]">{s.price}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-sm text-white/50">
        Walk-ins welcome. Card and cash. Kids and OAP rates weekdays.
      </p>

      <Link
        href={`/demo/${demo.slug}/book`}
        className="mt-10 inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-black transition-opacity hover:opacity-85"
      >
        Book a chair
      </Link>
    </section>
  );
}
