"use client";

import { useMemo, useState } from "react";
import type { MenuSection } from "@/lib/demos";

/**
 * The Pro demo's ordering flow: menu with add buttons, a sticky basket
 * bar, a bottom-sheet basket, and a checkout that honestly refuses.
 *
 * Same principle as the Growth demo's booking form — the prospect gets
 * the full feel of ordering (add, adjust, total, checkout), and the
 * confirmation states plainly that nothing was sent. A demo that
 * pretended to take an order would be lying about the thing the £299
 * plan is being bought for.
 */

type Line = { name: string; price: number; qty: number };

const toNumber = (price: string) => Number(price.replace(/[^0-9.]/g, "")) || 0;
const gbp = (n: number) => `£${n.toFixed(2)}`;

export default function OrderMenu({
  menu,
  accent,
}: {
  menu: MenuSection[];
  accent: string;
}) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [placed, setPlaced] = useState(false);

  const count = useMemo(() => lines.reduce((a, l) => a + l.qty, 0), [lines]);
  const total = useMemo(
    () => lines.reduce((a, l) => a + l.price * l.qty, 0),
    [lines]
  );

  function add(name: string, price: string) {
    setPlaced(false);
    setLines((prev) => {
      const hit = prev.find((l) => l.name === name);
      if (hit)
        return prev.map((l) =>
          l.name === name ? { ...l, qty: l.qty + 1 } : l
        );
      return [...prev, { name, price: toNumber(price), qty: 1 }];
    });
  }

  function adjust(name: string, delta: number) {
    setLines((prev) =>
      prev
        .map((l) => (l.name === name ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );
  }

  return (
    <div className="pb-28">
      {menu.map((section) => (
        <section key={section.category} className="mt-12 first:mt-0" data-reveal>
          <h2 className="[font-family:var(--demo-display)] text-3xl md:text-4xl">
            {section.category}
          </h2>
          <div className="demo-rule mt-3" aria-hidden="true" />
          <ul className="stagger mt-6 divide-y divide-[var(--demo-line)] border-y border-[var(--demo-line)]">
            {section.items.map((item) => (
              <li key={item.name} className="flex items-center gap-4 py-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-3">
                    <span className="text-lg font-semibold">{item.name}</span>
                    <span className="shrink-0 font-bold text-[var(--demo-accent-ink)]">
                      {item.price}
                    </span>
                  </div>
                  {item.desc && (
                    <p className="mt-0.5 text-sm text-[var(--demo-faint)]">{item.desc}</p>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => add(item.name, item.price)}
                  aria-label={`Add ${item.name} to order`}
                  className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-[var(--demo-line-strong)] text-xl font-bold transition-colors hover:border-[var(--accent)] hover:text-[var(--demo-accent-ink)]"
                >
                  +
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {/* Sticky basket bar */}
      {count > 0 && (
        <div className="demo-basket-in fixed inset-x-0 bottom-0 z-40 border-t border-[var(--demo-line)] bg-[var(--demo-sheet)] backdrop-blur-md">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-4 px-4 py-3">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 text-base font-semibold"
            >
              <span
                className="inline-flex size-7 items-center justify-center rounded-full text-sm font-bold text-[var(--demo-on-accent)]"
                style={{ background: accent }}
              >
                {count}
              </span>
              {open ? "Hide order" : "View order"}
            </button>
            <span className="text-lg font-bold">{gbp(total)}</span>
          </div>

          {/* Bottom sheet */}
          {open && (
            <div className="mx-auto max-w-3xl border-t border-[var(--demo-line)] px-4 py-4">
              {placed ? (
                <div className="py-4 text-center" role="status">
                  <p className="text-xl font-bold" style={{ color: accent }}>
                    Order received
                  </p>
                  <p className="mt-1 text-[var(--demo-faint)]">
                    On the real site you&rsquo;d pay here and collect in twenty
                    minutes.
                  </p>
                  <p className="mt-2 text-sm text-[var(--demo-faint)]">
                    (Demo — no order was placed, nothing was charged.)
                  </p>
                </div>
              ) : (
                <>
                  <ul className="max-h-56 space-y-2 overflow-y-auto">
                    {lines.map((l) => (
                      <li key={l.name} className="flex items-center gap-3">
                        <span className="min-w-0 flex-1 truncate">{l.name}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => adjust(l.name, -1)}
                            aria-label={`Remove one ${l.name}`}
                            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--demo-line-strong)] transition-colors hover:border-[var(--accent)]"
                          >
                            −
                          </button>
                          <span className="w-6 text-center font-semibold">{l.qty}</span>
                          <button
                            type="button"
                            onClick={() => adjust(l.name, 1)}
                            aria-label={`Add one ${l.name}`}
                            className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full border border-[var(--demo-line-strong)] transition-colors hover:border-[var(--accent)]"
                          >
                            +
                          </button>
                          <span className="w-16 text-right font-semibold">
                            {gbp(l.price * l.qty)}
                          </span>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <button
                    type="button"
                    onClick={() => setPlaced(true)}
                    className="mt-4 inline-flex min-h-12 w-full cursor-pointer items-center justify-center rounded-full text-base font-bold text-[var(--demo-on-accent)] transition-opacity hover:opacity-85"
                    style={{ background: accent }}
                  >
                    Checkout — {gbp(total)}
                  </button>
                  <p className="mt-2 text-center text-xs text-[var(--demo-faint)]">
                    Demo ordering — nothing is sent and nothing is charged.
                  </p>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
