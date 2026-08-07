"use client";

import { useId, useState, type ReactNode } from "react";
import { Plus } from "./ui";

export type AccordionItem = {
  key: string;
  heading: ReactNode;
  meta?: ReactNode;
  body: ReactNode;
};

/**
 * Disclosure list.
 *
 * Height animates via `grid-template-rows: 0fr → 1fr`, which transitions
 * cleanly to intrinsic content height without measuring anything in JS —
 * so no layout thrash and no jump when fonts finish loading. Collapsed
 * panels are `inert`, keeping their links out of the tab order and the
 * accessibility tree.
 */
export default function Accordion({
  items,
  defaultOpen = null,
}: {
  items: AccordionItem[];
  defaultOpen?: string | null;
}) {
  const [open, setOpen] = useState<string | null>(defaultOpen);
  const uid = useId();

  return (
    <div className="border-t border-line">
      {items.map((item) => {
        const isOpen = open === item.key;
        const btnId = `${uid}-${item.key}-btn`;
        const panelId = `${uid}-${item.key}-panel`;

        return (
          <div key={item.key} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.key)}
                className="group flex w-full cursor-pointer items-start gap-4 py-5 text-left md:gap-6 md:py-6"
              >
                <span className="flex-1">
                  <span
                    className={`block text-[1.0625rem] font-semibold leading-snug transition-colors duration-300 md:text-lg ${
                      isOpen ? "text-amber-ink" : "text-navy group-hover:text-amber-ink"
                    }`}
                  >
                    {item.heading}
                  </span>
                  {item.meta && (
                    <span className="mt-1.5 block text-sm text-faint">
                      {item.meta}
                    </span>
                  )}
                </span>

                <span
                  className={`mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-full border-2 transition-[transform,color,border-color,background-color] duration-400 ease-[cubic-bezier(.16,1,.3,1)] ${
                    isOpen
                      ? "rotate-45 border-amber bg-amber text-navy"
                      : "border-line text-muted group-hover:border-amber group-hover:text-amber-ink"
                  }`}
                  aria-hidden="true"
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>

            <div
              className={`grid transition-[grid-template-rows] duration-450 ease-[cubic-bezier(.16,1,.3,1)] ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={btnId}
                  inert={!isOpen}
                  className={`pb-6 transition-[opacity,transform] duration-400 ease-[cubic-bezier(.25,1,.5,1)] ${
                    isOpen
                      ? "translate-y-0 opacity-100 [transition-delay:90ms]"
                      : "translate-y-1.5 opacity-0"
                  }`}
                >
                  {item.body}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
