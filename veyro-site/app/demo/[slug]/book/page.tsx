import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BookForm from "@/components/demo/BookForm";
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
  return { title: { absolute: `Book — ${demo?.business ?? "Demo"} (demo preview)` } };
}

export default async function DemoBook({ params }: Params) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo || demo.plan !== "growth" || !demo.services) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 pb-24 pt-28">
      <h1 className="[font-family:var(--demo-display)] text-6xl tracking-wide">
        BOOK A CHAIR
      </h1>
      <div className="demo-rule mt-3" aria-hidden="true" />
      <p className="mt-6 max-w-xl text-white/60">
        Tell us what you&rsquo;re after and when suits — we&rsquo;ll text
        back to confirm. Prefer to talk? Ring{" "}
        <a
          href={`tel:${demo.phone.replace(/\s/g, "")}`}
          className="font-semibold text-[var(--accent)]"
        >
          {demo.phone}
        </a>
        .
      </p>

      <div className="mt-10" data-reveal>
        <BookForm
          services={demo.services.map((s) => s.name)}
          accent={demo.accent}
        />
      </div>
    </section>
  );
}
