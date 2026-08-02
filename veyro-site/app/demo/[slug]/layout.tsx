import { notFound } from "next/navigation";
import DemoNav from "@/components/demo/DemoNav";
import { ctaFor, demos, getDemo, pagesFor, planMeta } from "@/lib/demos";
import { site } from "@/lib/site";

/**
 * Shared chrome for one demo site: its nav, floating call button and
 * the VEYRO credit footer. The entire look — colours, fonts, light or
 * dark — comes from the demo's theme block, exposed here as CSS
 * variables that every demo component reads. One demo is warm-dark,
 * two are light; the components don't know or care.
 *
 * generateStaticParams here covers every nested page; plan-specific
 * children narrow it with their own.
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
  const t = demo.theme;

  return (
    <div
      className="min-h-dvh bg-[var(--demo-bg)] text-[var(--demo-ink)] [font-family:var(--demo-body)]"
      style={
        {
          "--accent": t.accent,
          "--demo-display": t.display,
          "--demo-body": t.body,
          "--demo-bg": t.bg,
          "--demo-nav-bg": t.navBg,
          "--demo-sheet": t.sheet,
          "--demo-surface": t.surface,
          "--demo-ink": t.ink,
          "--demo-muted": t.muted,
          "--demo-faint": t.faint,
          "--demo-line": t.line,
          "--demo-line-strong": t.lineStrong,
          "--demo-accent-ink": t.accentInk,
          "--demo-on-accent": t.onAccent,
          "--demo-rule-bg": t.ruleBg,
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
        className="fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-[var(--accent)] text-[var(--demo-on-accent)] shadow-lg shadow-black/40 md:hidden"
      >
        <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M6.6 3h-2A1.6 1.6 0 0 0 3 4.7C3 13.1 10.9 21 19.3 21a1.6 1.6 0 0 0 1.7-1.6v-2a1.6 1.6 0 0 0-1.3-1.6l-2.6-.5a1.6 1.6 0 0 0-1.6.7l-.7 1a13 13 0 0 1-5.3-5.3l1-.7a1.6 1.6 0 0 0 .7-1.6l-.5-2.6A1.6 1.6 0 0 0 6.6 3Z" />
        </svg>
      </a>

      {/* Demo credit — part of the pitch, keep it */}
      <footer className="border-t border-[var(--demo-line)] py-8 text-center text-sm text-[var(--demo-faint)]">
        <p>
          Demo preview — not a live business. A {meta.label}-plan site
          ({meta.price}/month) built by{" "}
          <a
            href={site.url}
            className="text-[var(--demo-accent-ink)] underline-offset-4 hover:underline"
          >
            {site.name}
          </a>
        </p>
      </footer>
    </div>
  );
}
