import type { Metadata } from "next";
import {
  ArrowUpRight,
  ButtonLink,
  Check,
  Eyebrow,
  Phone,
  Rule,
  Section,
  SplitHeading,
  delay,
} from "@/components/ui";
import { capabilities, site, steps } from "@/lib/site";

export const metadata: Metadata = {
  title: "What's Included — Website, Hosting & Updates from £99/mo",
  description:
    "Every plan includes the website, your domain, hosting, SSL, getting you found on Google, and unlimited changes. No separate bills, and you never have to touch it.",
  alternates: { canonical: "/what-you-get" },
};

export default function WhatYouGetPage() {
  return (
    <>
      <Section className="pb-6 pt-16 md:pt-24">
        <div className="shell max-w-3xl">
          <div data-reveal="fade">
            <Eyebrow>What you get</Eyebrow>
          </div>
          <div className="mt-5">
            <SplitHeading
              as="h1"
              start={90}
              className="t-h2 text-navy"
              lines={["I build websites.", "Nothing else."]}
            />
          </div>
          <p className="lede mt-6" data-reveal style={delay(300)}>
            No social media packages, no ad campaigns, no monthly report full
            of numbers that don&rsquo;t mean anything. One job, done properly,
            and kept working.
          </p>
        </div>
      </Section>

      <Section className="pt-6">
        <div className="shell space-y-16 md:space-y-24">
          {capabilities.map((c, i) => (
            <div
              key={c.id}
              id={c.id}
              className="grid scroll-mt-32 gap-8 md:grid-cols-12 md:gap-10"
              data-reveal
            >
              <div className="md:col-span-4">
                <span className="text-sm font-bold text-amber-ink">{c.index}</span>
                <h2 className="display mt-3 text-[clamp(1.6rem,3.4vw,2.5rem)] leading-tight text-navy">
                  {c.title}
                </h2>
              </div>

              <div className="md:col-span-8">
                <p className="display text-[clamp(1.1rem,2vw,1.45rem)] leading-snug text-muted">
                  {c.summary}
                </p>
                <p className="mt-5 max-w-2xl text-[0.9375rem] leading-relaxed text-muted md:text-base">
                  {c.detail}
                </p>

                <Rule className="mt-8" />

                <ul className="stagger mt-6 grid gap-3 sm:grid-cols-2">
                  {c.points.map((p) => (
                    <li
                      key={p}
                      className="flex items-start gap-2.5 text-sm text-muted"
                    >
                      <Check className="mt-0.5 size-4 shrink-0 text-amber-ink" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>

              {i < capabilities.length - 1 && (
                <div className="md:col-span-12">
                  <Rule className="mt-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* What I don't do — honesty as a selling point */}
      <Section className="border-y border-line bg-cream-2">
        <div className="shell grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow>Being straight with you</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 text-navy"
                lines={["What I", "don't do."]}
              />
            </div>
          </div>
          <div className="prose-body md:col-span-8" data-reveal style={delay(130)}>
            <p>
              I don&rsquo;t post on your social media, I don&rsquo;t manage
              your reviews, and I don&rsquo;t run Google Ads. Plenty of
              agencies bundle those in and charge you for them whether they
              work or not.
            </p>
            <p>
              What I do is the website — and the website is the thing that
              turns someone searching your trade in your town into someone
              standing in your shop. If you later want the rest, I&rsquo;ll
              happily tell you who&rsquo;s good at it locally.
            </p>
          </div>
        </div>
      </Section>

      {/* Process */}
      <Section>
        <div className="shell">
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>How it works</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h2 text-navy"
                lines={["From first chat", "to live in a fortnight."]}
              />
            </div>
          </div>

          <ol className="mt-12 md:mt-16">
            {steps.map((s, i) => (
              <li
                key={s.step}
                className="grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
                data-reveal
                style={delay(i * 80)}
              >
                <div className="flex items-center gap-4 md:col-span-4">
                  <span className="pop grid size-11 shrink-0 place-items-center rounded-full bg-amber text-sm font-bold text-navy">
                    {s.step}
                  </span>
                  <h3 className="display text-xl text-navy md:text-2xl">
                    {s.title}
                  </h3>
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-muted md:col-span-8">
                  {s.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <section className="relative overflow-hidden border-t border-line py-24 md:py-28">
        <div
          className="bloom left-1/2 top-1/2 h-64 w-[32rem] -translate-x-1/2 -translate-y-1/2 opacity-45"
          aria-hidden="true"
        />
        <div className="shell relative text-center">
          <SplitHeading
            className="t-h3 mx-auto max-w-2xl text-navy"
            lines={["Shall we have", "that five minutes?"]}
          />
          <div
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
            data-reveal
            style={delay(180)}
          >
            <ButtonLink href="/contact">
              Get a free quote
              <span className="nudge inline-flex">
                <ArrowUpRight />
              </span>
            </ButtonLink>
            <ButtonLink href={`tel:${site.phoneHref}`} variant="ghost">
              <Phone className="size-4" />
              {site.phone}
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}
