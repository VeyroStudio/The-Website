import type { Metadata } from "next";
import { Suspense } from "react";
import InquiryForm from "@/components/InquiryForm";
import {
  Availability,
  Check,
  Eyebrow,
  Phone,
  Section,
  SplitHeading,
  delay,
} from "@/components/ui";
import { areas, site, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "Get a free quote",
  description:
    "Tell me about your business and I'll show you what I'd build — free, no obligation. Answered within one working day.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Section className="pt-16 md:pt-24">
        <div className="shell grid gap-12 lg:grid-cols-12 lg:gap-12">
          {/* Left rail */}
          <div className="lg:col-span-5">
            <div data-reveal="fade">
              <Eyebrow>Get a free quote</Eyebrow>
            </div>
            <div className="mt-5">
              <SplitHeading
                as="h1"
                start={90}
                className="t-h2 text-navy"
                lines={["Tell me about", "your business."]}
              />
            </div>
            <p className="lede mt-6" data-reveal style={delay(300)}>
              Takes about a minute. I&rsquo;ll come back with what I&rsquo;d
              build and what it would cost — no charge, and I won&rsquo;t
              pester you afterwards.
            </p>

            <div className="mt-7" data-reveal style={delay(360)}>
              <Availability>Taking on new businesses this month</Availability>
            </div>

            {/* Direct contact — many prospects will just want to ring */}
            <div
              className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
              data-reveal
              style={delay(420)}
            >
              <a
                href={`tel:${site.phoneHref}`}
                className="lift group flex min-h-16 items-center gap-3.5 rounded-xl border border-line bg-white px-5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-amber text-navy">
                  <Phone className="size-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
                    Prefer to talk?
                  </span>
                  <span className="block text-[0.9375rem] font-semibold text-navy">
                    {site.phone}
                  </span>
                </span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="lift group flex min-h-16 items-center gap-3.5 rounded-xl border border-line bg-white px-5"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-cream-3 text-navy">
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect x="2.5" y="5" width="19" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
                    Or email
                  </span>
                  <span className="block break-all text-[0.9375rem] font-semibold text-navy">
                    {site.email}
                  </span>
                </span>
              </a>
            </div>

            {/* What happens next */}
            <div
              className="mt-10 rounded-xl border border-line bg-cream-2 p-6"
              data-reveal
              style={delay(480)}
            >
              <h2 className="text-sm font-semibold text-navy">
                What happens next
              </h2>
              <ol className="stagger mt-4 space-y-3.5">
                {steps.slice(0, 3).map((s) => (
                  <li key={s.step} className="flex gap-3">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-amber text-[0.6875rem] font-bold text-navy">
                      {s.step}
                    </span>
                    <span className="text-sm leading-relaxed text-muted">
                      <span className="block font-semibold text-navy">
                        {s.title}
                      </span>
                      {s.body}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <ul className="stagger mt-8 space-y-2.5" data-reveal>
              {[
                "No charge and no obligation",
                "Answered within one working day",
                "You'll get me, not a call centre",
              ].map((t) => (
                <li
                  key={t}
                  className="flex items-center gap-2.5 text-sm text-muted"
                >
                  <Check className="size-4 shrink-0 text-amber-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Form */}
          <div className="lg:col-span-7" data-reveal style={delay(180)}>
            <Suspense
              fallback={
                <div
                  className="min-h-[36rem] animate-pulse rounded-2xl border border-line bg-white"
                  aria-hidden="true"
                />
              }
            >
              <InquiryForm />
            </Suspense>
          </div>
        </div>
      </Section>

      {/* Areas */}
      <Section className="border-t border-line bg-cream-2 py-14 md:py-16">
        <div className="shell text-center">
          <h2 className="eyebrow justify-center">Covering</h2>
          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-muted">
            {areas.join(" · ")} — and remotely anywhere in the UK.
          </p>
        </div>
      </Section>
    </>
  );
}
