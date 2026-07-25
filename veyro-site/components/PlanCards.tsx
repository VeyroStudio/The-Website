import Link from "next/link";
import { ArrowRight, Check } from "./ui";
import { plans, pricingNote } from "@/lib/site";
import type { CSSProperties } from "react";

/**
 * The three packages.
 *
 * Prices are stated plainly and the upfront position is stated on every
 * card — the playbook's argument is that a visible fixed price does the
 * qualifying for you, and a hidden one just moves the objection into
 * the room.
 */
export default function PlanCards({ compact = false }: { compact?: boolean }) {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-3">
        {plans.map((plan, i) => {
          const featured = plan.featured;
          return (
            <div
              key={plan.id}
              id={plan.id}
              data-reveal
              style={{ "--d": `${i * 110}ms` } as CSSProperties}
              className={`lift relative flex scroll-mt-32 flex-col rounded-2xl border-2 p-7 md:p-8 ${
                featured
                  ? "border-amber bg-white shadow-[0_20px_50px_-30px_rgba(19,34,58,0.4)]"
                  : "border-line bg-cream-2"
              }`}
            >
              {featured && (
                <span className="absolute -top-3.5 left-7 rounded-full bg-amber px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-navy">
                  Most popular
                </span>
              )}

              <h3 className="display text-2xl text-navy">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted">{plan.tagline}</p>

              <p className="mt-6 flex items-baseline gap-1">
                <span className="display text-5xl text-navy">£{plan.price}</span>
                <span className="text-sm font-medium text-faint">
                  {plan.cadence}
                </span>
              </p>

              {/* The upfront position is material, not fine print —
                  it stays at body size. */}
              <p className="mt-3 rounded-lg bg-cream-3/70 px-3.5 py-2.5 text-sm leading-relaxed text-muted">
                {plan.upfront}
              </p>

              <ul className={`stagger mt-7 space-y-3 ${compact ? "" : "flex-1"}`}>
                {plan.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-amber-ink" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-7 border-t border-line pt-5 text-xs font-medium uppercase tracking-wider text-faint">
                Best for
              </p>
              <p className="mt-1.5 text-sm text-muted">{plan.bestFor}</p>

              <Link
                href={`/contact?plan=${plan.id}`}
                className={`group mt-7 inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-full px-6 text-[0.9375rem] font-semibold tracking-tight transition-colors duration-300 ${
                  featured
                    ? "bg-amber text-navy hover:bg-amber-hi"
                    : "border-2 border-navy/15 text-navy hover:border-amber hover:bg-amber/10"
                }`}
              >
                Choose {plan.name}
                <span className="nudge inline-flex">
                  <ArrowRight />
                </span>
              </Link>
            </div>
          );
        })}
      </div>

      <p
        className="mx-auto mt-8 max-w-2xl text-center text-sm leading-relaxed text-muted"
        data-reveal
      >
        {pricingNote}
      </p>
    </>
  );
}
