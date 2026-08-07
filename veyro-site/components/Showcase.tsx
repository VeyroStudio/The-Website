import Image from "next/image";
import { showcase } from "@/lib/site";

/**
 * The kinds of business VEYRO builds for.
 *
 * Deliberately worded and laid out so it can never be mistaken for a
 * portfolio — these are stock photographs of trades, not clients. See
 * public/trades/CREDITS.md.
 *
 * Each tile carries `media-rise`, a scroll-scrubbed lift driven by the
 * native view timeline. The first two load eagerly; the rest are lazy.
 */
export default function Showcase() {
  return (
    <ul className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5">
      {showcase.map((item, i) => (
        <li
          key={item.label}
          className="media-rise group relative overflow-hidden rounded-2xl border border-line bg-cream-3"
          style={{ animationDelay: `${i * 40}ms` }}
        >
          <div className="aspect-4/3 w-full overflow-hidden">
            <Image
              src={item.src}
              alt={item.alt}
              width={1000}
              height={750}
              sizes="(min-width: 768px) 33vw, 50vw"
              priority={i < 2}
              loading={i < 2 ? undefined : "lazy"}
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.04]"
            />
          </div>

          {/* Scrim keeps the label legible over the brightest photo in
              the set, not just the average one */}
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-navy/92 via-navy/45 to-transparent"
            aria-hidden="true"
          />
          <span className="pointer-events-none absolute bottom-3 left-3 right-3 text-sm font-semibold text-cream transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:-translate-y-1 md:bottom-4 md:left-4 md:text-base">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
