import type { Metadata } from "next";
import Image from "next/image";
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
  return { title: { absolute: `About — ${demo?.business ?? "Demo"} (demo preview)` } };
}

export default async function DemoAbout({ params }: Params) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo || demo.plan !== "growth" || !demo.about || !demo.gallery)
    notFound();

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24 pt-28">
      <h1 className="[font-family:var(--demo-display)] text-6xl tracking-wide">
        ABOUT US
      </h1>
      <div className="demo-rule mt-3" aria-hidden="true" />

      <div className="mt-10 grid gap-10 md:grid-cols-2" data-reveal>
        <div>
          <p className="text-2xl font-semibold leading-snug text-[var(--demo-ink)]">
            {demo.about.lede}
          </p>
          <div className="stagger mt-6 space-y-4 text-lg leading-relaxed text-[var(--demo-muted)]">
            {demo.about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 self-start">
          <div className="overflow-hidden rounded-lg">
            <Image src={demo.gallery[0].src} alt={demo.gallery[0].alt} width={900} height={675} className="demo-tile h-full w-full object-cover" />
          </div>
          <div className="mt-8 overflow-hidden rounded-lg">
            <Image src={demo.gallery[2].src} alt={demo.gallery[2].alt} width={900} height={675} className="demo-tile h-full w-full object-cover" />
          </div>
        </div>
      </div>

      {/* Hours repeated here — an about page someone lands on should
          never make them navigate again to learn when to turn up */}
      <div className="mt-16 max-w-md" data-reveal>
        <h2 className="[font-family:var(--demo-display)] text-4xl tracking-wide">
          HOURS
        </h2>
        <ul className="stagger mt-6 space-y-3">
          {demo.hours.map((h) => (
            <li key={h.days} className="flex justify-between border-b border-[var(--demo-line)] pb-3">
              <span>{h.days}</span>
              <span className={h.open === "Closed" ? "text-[var(--demo-faint)]" : "font-semibold"}>
                {h.open}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <Link
        href={`/demo/${demo.slug}/book`}
        className="mt-10 inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-[var(--demo-on-accent)] transition-opacity hover:opacity-85"
      >
        Book a chair
      </Link>
    </section>
  );
}
