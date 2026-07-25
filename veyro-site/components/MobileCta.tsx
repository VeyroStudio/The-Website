"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Phone } from "./ui";
import { site } from "@/lib/site";

/**
 * Sticky call-to-action bar for phones.
 *
 * Slides up once the hero is behind you and stays reachable for the
 * rest of the page — on a phone the two things a local prospect wants
 * are "ring them" and "get a price", so those are the only two options.
 *
 * Hidden on /contact, where it would sit on top of the form it points at.
 */
export default function MobileCta() {
  const pathname = usePathname();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShown(window.scrollY > 600);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname === "/contact") return null;

  return (
    <div
      inert={!shown}
      aria-hidden={!shown}
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-line bg-cream/95 p-3 backdrop-blur-lg transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] md:hidden ${
        shown ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
    >
      <div className="flex items-center gap-2.5">
        <a
          href={`tel:${site.phoneHref}`}
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border-2 border-navy/15 px-4 text-sm font-semibold text-navy"
        >
          <Phone className="size-4" />
          Call
        </a>
        <Link
          href="/contact"
          className="group inline-flex min-h-12 flex-[1.6] items-center justify-center gap-2 rounded-full bg-amber px-4 text-sm font-semibold text-navy"
        >
          Get a free quote
          <span className="nudge inline-flex">
            <ArrowRight className="size-4" />
          </span>
        </Link>
      </div>
    </div>
  );
}
