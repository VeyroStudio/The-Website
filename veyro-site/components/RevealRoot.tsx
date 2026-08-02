"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for the whole document.
 *
 * Sections opt in by adding `data-reveal` and an optional `--d` delay,
 * which keeps every page a server component. Elements are unobserved
 * once revealed so nothing stays subscribed after it has played, and
 * `prefers-reduced-motion` short-circuits to the finished state.
 *
 * Watchdog: some embedded webviews and throttled browser panes expose
 * a working IntersectionObserver API whose callbacks simply never fire
 * (observed in testing — a non-compositing tab computes no
 * intersections). Content gated on those callbacks would stay hidden
 * forever there. The document body always intersects, so it serves as
 * a canary: if its callback hasn't arrived shortly after observing,
 * the observer is dead and everything reveals outright. On healthy
 * browsers the canary fires within a frame and the watchdog never
 * triggers.
 */
export default function RevealRoot() {
  const pathname = usePathname();

  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
    );
    if (els.length === 0) return;

    const revealAll = () =>
      document
        .querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)")
        .forEach((el) => el.classList.add("is-in"));

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    let observerAlive = false;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.target === document.body) {
            observerAlive = true;
            io.unobserve(document.body);
            continue;
          }
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
    );

    io.observe(document.body);
    els.forEach((el) => io.observe(el));

    const watchdog = window.setTimeout(() => {
      if (!observerAlive) {
        io.disconnect();
        revealAll();
      }
    }, 1500);

    return () => {
      window.clearTimeout(watchdog);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
