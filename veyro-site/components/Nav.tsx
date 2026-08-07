"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { Logo } from "./Logo";
import { ArrowRight, Phone } from "./ui";
import { nav, site } from "@/lib/site";

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  /* Condense the header once the hero is behind it. rAF-throttled so a
     fast scroll can never queue more work than the compositor drains. */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 20);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close on navigation — adjusted during render rather than in an
     effect, so the menu is never painted open on the new route. Also
     covers browser back/forward, which a link handler would miss. */
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  /* Lock the page behind the overlay, restore focus on close. */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    panelRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <div
        className="scroll-progress fixed inset-x-0 top-0 z-50 h-[3px] bg-amber"
        aria-hidden="true"
      />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-amber focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-navy"
      >
        Skip to content
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,box-shadow] duration-400 ${
          scrolled || open
            ? "border-b border-line bg-cream/90 backdrop-blur-lg"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="shell flex h-[var(--nav-h)] items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.name} — home`}
            className="focus-none group -ml-1 inline-flex min-h-11 items-center rounded p-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-ink"
          >
            <Logo
              title={null}
              className="h-6 w-auto text-navy transition-opacity duration-300 group-hover:opacity-70 md:h-7"
            />
          </Link>

          {/* Desktop */}
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`group inline-flex min-h-11 items-center text-[0.9375rem] font-medium transition-colors duration-300 ${
                  isActive(item.href)
                    ? "text-navy"
                    : "text-muted hover:text-navy"
                }`}
              >
                <span className="link-sweep">{item.label}</span>
              </Link>
            ))}
            <a
              href={`tel:${site.phoneHref}`}
              className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-navy"
            >
              <Phone className="size-4 text-amber-ink" />
              <span className="link-sweep">{site.phone}</span>
            </a>
            <Link
              href="/contact"
              className="group btn-sheen inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-amber px-5 text-[0.9375rem] font-semibold tracking-tight text-navy transition-[background-color,transform] duration-300 hover:bg-amber-hi active:scale-[0.98]"
            >
              Get a free quote
              <span className="nudge inline-flex">
                <ArrowRight className="size-4" />
              </span>
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="-mr-2 inline-flex size-11 cursor-pointer items-center justify-center rounded-full text-navy lg:hidden"
          >
            <span className="relative block h-3 w-6" aria-hidden="true">
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] ${
                  open ? "top-1.5 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 block h-0.5 w-6 rounded bg-current transition-transform duration-400 ease-[cubic-bezier(.16,1,.3,1)] ${
                  open ? "top-1.5 -rotate-45" : "top-3"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        className={`fixed inset-0 z-30 flex flex-col bg-cream pt-[var(--nav-h)] transition-opacity duration-400 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav
          aria-label="Mobile"
          className="shell flex flex-1 flex-col justify-center"
        >
          <ul className="space-y-1">
            {nav.map((item, i) => (
              <li key={item.href} className="overflow-hidden">
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  style={{ "--d": `${70 + i * 60}ms` } as CSSProperties}
                  className={`display block py-2.5 text-[2.5rem] leading-tight transition-[transform,opacity] duration-600 ease-[cubic-bezier(.16,1,.3,1)] [transition-delay:var(--d)] ${
                    open ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
                  } ${isActive(item.href) ? "text-amber-ink" : "text-navy"}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="shell space-y-3 border-t border-line py-7">
          <a
            href={`tel:${site.phoneHref}`}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full border-2 border-navy/15 px-5 text-[0.9375rem] font-semibold text-navy"
          >
            <Phone className="size-4" />
            {site.phone}
          </a>
          <Link
            href="/contact"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-amber px-5 text-[0.9375rem] font-semibold text-navy"
          >
            Get a free quote
            <span className="nudge inline-flex">
              <ArrowRight className="size-4" />
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}
