"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { searchDemo } from "@/lib/site";
import { Star } from "./ui";

const MQ = "(prefers-reduced-motion: reduce)";

/** Reads the motion preference as external state — no setState in an effect. */
function useReducedMotion() {
  return useSyncExternalStore(
    (notify) => {
      const mq = window.matchMedia(MQ);
      mq.addEventListener("change", notify);
      return () => mq.removeEventListener("change", notify);
    },
    () => window.matchMedia(MQ).matches,
    () => false // server snapshot
  );
}

/**
 * The "show the gap" moment from the sales conversation, animated.
 *
 * A phone search types out the query, drops in three competitors, then
 * reveals the prospect's own business below them with no website. It
 * plays once, when scrolled into view.
 *
 * The listings are invented and generic — a labelled illustration, not
 * a claim about any real business.
 *
 * With reduced motion, or with JavaScript off, the finished state shows
 * immediately: the `<noscript>` style overrides the inline opacity, and
 * the query renders as static text.
 */
export default function SearchGap() {
  const hostRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const [stage, setStage] = useState(0); // 0 idle → 1 typing → 2 results → 3 you
  const [typed, setTyped] = useState("");

  useEffect(() => {
    const host = hostRef.current;
    if (!host || reduced || !("IntersectionObserver" in window)) return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    const play = () => {
      setStage(1);
      const q = searchDemo.query;
      for (let i = 1; i <= q.length; i++) {
        timers.push(setTimeout(() => setTyped(q.slice(0, i)), 55 * i));
      }
      const typeEnd = 55 * q.length;
      timers.push(setTimeout(() => setStage(2), typeEnd + 320));
      timers.push(setTimeout(() => setStage(3), typeEnd + 1500));
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          io.unobserve(e.target);
          play();
        }
      },
      { threshold: 0.4 }
    );

    io.observe(host);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  const showResults = reduced || stage >= 2;
  const showYou = reduced || stage >= 3;

  return (
    <div ref={hostRef} className="relative mx-auto w-full max-w-sm">
      <noscript>
        {/* Inline opacity is set from state; !important outranks it. */}
        <style>{`.sg-item{opacity:1!important;transform:none!important}`}</style>
      </noscript>

      <div className="overflow-hidden rounded-[2rem] border-8 border-navy bg-white shadow-[0_30px_70px_-40px_rgba(19,34,58,0.6)]">
        {/* Search bar */}
        <div className="flex items-center gap-2.5 border-b border-line bg-cream-2 px-4 py-3.5">
          <svg
            viewBox="0 0 24 24"
            className="size-4 shrink-0 text-faint"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <span className="min-h-5 text-sm font-medium text-navy">
            {reduced ? searchDemo.query : typed}
            <noscript>{searchDemo.query}</noscript>
            {!reduced && stage === 1 && (
              <span
                className="ml-px inline-block h-4 w-px translate-y-0.5 animate-pulse bg-amber"
                aria-hidden="true"
              />
            )}
          </span>
        </div>

        {/* Results */}
        <ul className="divide-y divide-line">
          {searchDemo.results.map((r, i) => (
            <li
              key={r.name}
              className="sg-item flex items-center gap-3 px-4 py-3.5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
              style={{
                opacity: showResults ? 1 : 0,
                transform: showResults ? "none" : "translateY(10px)",
                transitionDelay: `${i * 130}ms`,
              }}
            >
              <span
                className="grid size-9 shrink-0 place-items-center rounded-lg bg-cream-3 text-xs font-bold text-navy"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold text-navy">
                  {r.name}
                </span>
                <span className="flex items-center gap-1 text-xs text-faint">
                  <Star className="size-3 text-amber" />
                  {r.rating} · {r.reviews} reviews · Website
                </span>
              </span>
            </li>
          ))}

          {/* The prospect */}
          <li
            className="sg-item flex items-center gap-3 bg-amber/12 px-4 py-3.5 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.16,1,.3,1)]"
            style={{
              opacity: showYou ? 1 : 0,
              transform: showYou ? "none" : "translateY(10px)",
            }}
          >
            <span
              className="grid size-9 shrink-0 place-items-center rounded-lg border-2 border-dashed border-amber text-xs font-bold text-amber-ink"
              aria-hidden="true"
            >
              ?
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-semibold text-navy">
                {searchDemo.you.name}
              </span>
              <span className="text-xs font-medium text-amber-ink">
                Not showing — {searchDemo.you.reviews}
              </span>
            </span>
          </li>
        </ul>
      </div>

      <p className="mt-4 text-center text-xs text-faint">
        Illustration. Listings shown are examples, not real businesses.
      </p>

      {/* The animation carries meaning, so it needs a text equivalent
          that does not depend on timing or on seeing it play. */}
      <p className="sr-only">
        An illustration of a phone search for &ldquo;{searchDemo.query}&rdquo;.
        Three competing businesses appear at the top of the results, each with
        a website and customer reviews. Your business appears below them,
        marked as not showing because it has no website.
      </p>
    </div>
  );
}
