import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OrderMenu from "@/components/demo/OrderMenu";
import { demos, getDemo } from "@/lib/demos";

/**
 * Pro-plan page: the full menu with the ordering demo. Only Pro demos
 * generate this route — the params here override the layout's, so a
 * Starter or Growth slug 404s rather than showing a page its plan
 * doesn't include.
 */

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return demos.filter((d) => d.plan === "pro").map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const demo = getDemo(slug);
  return { title: { absolute: `Menu — ${demo?.business ?? "Demo"} (demo preview)` } };
}

export default async function DemoMenu({ params }: Params) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo || demo.plan !== "pro" || !demo.menu) notFound();

  return (
    <section className="mx-auto max-w-3xl px-4 pb-24 pt-28">
      <h1 className="[font-family:var(--demo-display)] text-5xl md:text-6xl">
        Menu
      </h1>
      <div className="demo-rule mt-3" aria-hidden="true" />
      <p className="mt-6 max-w-xl text-[var(--demo-faint)]">
        Order for collection — ready in about twenty minutes. Tap + to add,
        then check out from the basket.
      </p>

      <div className="mt-6">
        <OrderMenu menu={demo.menu} accent={demo.theme.accent} />
      </div>
    </section>
  );
}
