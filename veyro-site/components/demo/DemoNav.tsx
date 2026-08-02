"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * The demo site's own navigation. Pages and CTA come from the demo's
 * plan — a Starter demo gets no sub-pages (its nav is just the name
 * and a call button), Growth gets its five pages, Pro gets Menu with
 * an Order CTA. Active page carries the accent underline.
 */
export default function DemoNav({
  slug,
  business,
  phone,
  pages,
  cta,
}: {
  slug: string;
  business: string;
  phone: string;
  pages: { path: string; label: string }[];
  cta: { href: string; label: string };
}) {
  const pathname = usePathname();
  const base = `/demo/${slug}`;

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-white/10 bg-[#101114]/92 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4">
        <Link
          href={base}
          className="[font-family:var(--demo-display)] text-2xl tracking-wide transition-opacity hover:opacity-80"
        >
          {business}
        </Link>

        <nav aria-label="Demo site" className="flex items-center gap-1 overflow-x-auto">
          {pages
            .filter((p) => p.path !== cta.href.split("/").pop())
            .map((p) => {
              const href = p.path ? `${base}/${p.path}` : base;
              const active = pathname === href;
              return (
                <Link
                  key={p.path}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative inline-flex min-h-10 shrink-0 items-center px-3 text-sm font-medium transition-colors ${
                    active ? "text-[var(--accent)]" : "text-white/70 hover:text-white"
                  } after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:bg-[var(--accent)] after:transition-transform after:duration-500 ${
                    active ? "after:scale-x-100" : "after:scale-x-0 hover:after:scale-x-100"
                  }`}
                >
                  {p.label}
                </Link>
              );
            })}
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="ml-1 hidden min-h-10 shrink-0 items-center px-3 text-sm font-semibold text-white/80 transition-colors hover:text-[var(--accent)] md:inline-flex"
          >
            {phone}
          </a>
          <Link
            href={cta.href}
            className="ml-2 inline-flex min-h-10 shrink-0 items-center rounded-full bg-[var(--accent)] px-4 text-sm font-bold text-black transition-opacity hover:opacity-85"
          >
            {cta.label}
          </Link>
        </nav>
      </div>
    </header>
  );
}
