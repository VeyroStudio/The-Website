import Link from "next/link";
import { Wordmark } from "./Logo";
import { ArrowUpRight, Phone } from "./ui";
import { areaPages } from "@/lib/areas";
import { areas, capabilities, nav, plans, site } from "@/lib/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-line bg-navy text-cream">
      <div
        className="bloom -bottom-40 left-1/2 h-72 w-[36rem] -translate-x-1/2 opacity-30"
        aria-hidden="true"
      />

      <div className="shell relative pb-28 pt-16 md:pb-20 md:pt-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5" data-reveal>
            <p className="display text-[clamp(1.6rem,3.2vw,2.25rem)] leading-tight text-cream">
              Want to know what your
              <br />
              site would look like?
            </p>
            <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-cream-3/80">
              Ask and I&rsquo;ll show you — no charge, no obligation, no
              hard sell afterwards.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="group inline-flex min-h-12 items-center gap-2 rounded-full bg-amber px-6 text-[0.9375rem] font-semibold text-navy transition-colors duration-300 hover:bg-amber-hi"
              >
                Get a free quote
                <span className="nudge inline-flex">
                  <ArrowUpRight className="size-4" />
                </span>
              </Link>
              <a
                href={`tel:${site.phoneHref}`}
                className="inline-flex min-h-12 items-center gap-2 rounded-full border-2 border-cream/25 px-6 text-[0.9375rem] font-semibold text-cream transition-colors duration-300 hover:border-amber-hi hover:text-amber-hi"
              >
                <Phone className="size-4" />
                {site.phone}
              </a>
            </div>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-8 md:col-span-7 md:grid-cols-3"
            data-reveal
            style={{ ["--d" as string]: "110ms" }}
          >
            <div>
              <h2 className="eyebrow mb-2 text-cream-3">Pages</h2>
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex min-h-11 items-center text-sm text-cream-3/80 transition-colors duration-300 hover:text-cream"
                    >
                      <span className="link-sweep">{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow mb-2 text-cream-3">Plans</h2>
              <ul>
                {plans.map((p) => (
                  <li key={p.id}>
                    <Link
                      href={`/pricing#${p.id}`}
                      className="group flex min-h-11 items-center text-sm text-cream-3/80 transition-colors duration-300 hover:text-cream"
                    >
                      <span className="link-sweep">
                        {p.name} — £{p.price}/mo
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="eyebrow mb-2 text-cream-3">What you get</h2>
              <ul>
                {capabilities.map((c) => (
                  <li key={c.id}>
                    <Link
                      href={`/what-you-get#${c.id}`}
                      className="group flex min-h-11 items-center text-sm text-cream-3/80 transition-colors duration-300 hover:text-cream"
                    >
                      <span className="link-sweep">{c.title}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Areas — linked, not just listed. An unlinked town name does
            nothing; a link gives the location pages a route in from every
            page on the site. */}
        <div className="mt-14 border-t border-cream/12 pt-8" data-reveal>
          <h2 className="eyebrow mb-3 text-cream-3">Areas covered</h2>
          <ul className="flex flex-wrap gap-x-1 gap-y-1">
            {areaPages.map((a, i) => (
              <li key={a.slug} className="flex items-center">
                <Link
                  href={`/website-design/${a.slug}`}
                  className="group inline-flex min-h-11 items-center text-sm text-cream-3/80 transition-colors duration-300 hover:text-cream"
                >
                  <span className="link-sweep">{a.town}</span>
                </Link>
                {i < areaPages.length - 1 && (
                  <span className="px-2 text-cream-3/40" aria-hidden="true">
                    ·
                  </span>
                )}
              </li>
            ))}
          </ul>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-cream-3/70">
            Also {areas
              .filter((a) => !areaPages.some((p) => p.town === a))
              .join(", ")} — and remotely with businesses anywhere in the UK.
          </p>
        </div>

        <Wordmark
          title={null}
          className="mt-14 w-full text-cream/8 md:mt-20"
        />

        <div className="mt-8 flex flex-col gap-2 border-t border-cream/12 pt-6 text-[0.8125rem] text-cream-3/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. {site.baseTown}, {site.region}.
          </p>
          <p className="flex flex-wrap items-center gap-x-6">
            <Link
              href="/privacy"
              className="group inline-flex min-h-11 items-center transition-colors duration-300 hover:text-cream"
            >
              <span className="link-sweep">Privacy</span>
            </Link>
            {site.social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="group inline-flex min-h-11 items-center gap-1.5 transition-colors duration-300 hover:text-cream"
              >
                <span className="link-sweep">{s.label}</span>
                <ArrowUpRight className="size-3" />
              </a>
            ))}
          </p>
        </div>
      </div>
    </footer>
  );
}
