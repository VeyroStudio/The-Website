import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDemo } from "@/lib/demos";

type Params = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  return { title: { absolute: `Gallery — ${demo?.business ?? "Demo"} (demo preview)` } };
}

export default async function DemoGallery({ params }: Params) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  return (
    <section className="mx-auto max-w-5xl px-4 pb-24 pt-28">
      <h1 className="[font-family:var(--font-demo-display)] text-6xl tracking-wide">
        THE WORK
      </h1>
      <div className="demo-rule mt-3" aria-hidden="true" />
      <p className="mt-6 max-w-xl text-white/60">
        Fades, scissor cuts, beard work. When this site is real, this page
        fills with your shop&rsquo;s own photographs — the single most
        persuasive thing a barbershop can put online.
      </p>

      <div className="stagger mt-10 grid grid-cols-2 gap-3 md:grid-cols-3" data-reveal>
        {demo.gallery.map((g, i) => (
          <div
            key={g.src}
            className={`overflow-hidden rounded-lg ${i === 0 ? "col-span-2 md:col-span-2 md:row-span-2" : ""}`}
          >
            <Image
              src={g.src}
              alt={g.alt}
              width={900}
              height={675}
              sizes="(min-width: 768px) 33vw, 50vw"
              className="demo-tile h-full w-full object-cover"
            />
          </div>
        ))}
      </div>

      <Link
        href={`/demo/${demo.slug}/book`}
        className="mt-10 inline-flex min-h-12 items-center rounded-full bg-[var(--accent)] px-7 text-base font-bold text-black transition-opacity hover:opacity-85"
      >
        Book a chair
      </Link>
    </section>
  );
}
