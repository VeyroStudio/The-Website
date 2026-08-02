import { notFound } from "next/navigation";
import DemoNav from "@/components/demo/DemoNav";
import { ctaFor, demos, getDemo, pagesFor, planMeta } from "@/lib/demos";
import { site } from "@/lib/site";

/**
 * Shared chrome for one demo site: its nav, floating call button and
 * the VEYRO credit footer. What the nav contains — and whether there
 * are sub-pages at all — follows the demo's plan, because each demo
 * exists to sell exactly one price point.
 *
 * generateStaticParams here covers every nested page; plan-specific
 * children (prices, menu, …) narrow it with their own.
 */

type Props = {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return demos.map((d) => ({ slug: d.slug }));
}

export default async function DemoSiteLayout({ children, params }: Props) {
  const { slug } = await params;
  const demo = getDemo(slug);
  if (!demo) notFound();

  const tel = `tel:${demo.phone.replace(/\s/g, "")}`;
  const meta = planMeta[demo.plan];

  return (
    <div
      className="min-h-dvh bg-[#101114] text-[#F4F1EA] [font-family:var(--font-demo-body)]"
      style={
        {
          "--accent": demo.accent,
          "--demo-display": demo.displayFont,
        } as React.CSSProperties
      }
    >
      <DemoNav
        slug={demo.slug}
        business={demo.business}
        phone={demo.phone}
        pages={pagesFor(demo)}
        cta={ctaFor(demo)}
      />

      {children}

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
          Demo preview — not a live business. A {meta.label}-plan site
          ({meta.price}/month) built by{" "}
          <a
            href={site.url}
            className="text-[var(--accent)] underline-offset-4 hover:underline"
          >
            {site.name}
          </a>
        </p>
      </footer>
    </div>
  );
}
