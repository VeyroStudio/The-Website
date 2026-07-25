import type { Metadata } from "next";
import PlanCards from "@/components/PlanCards";
import Accordion from "@/components/Accordion";
import {
  ArrowUpRight,
  ButtonLink,
  Check,
  Eyebrow,
  Phone,
  Section,
  SplitHeading,
  delay,
} from "@/components/ui";
import { faqs, plans, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Pricing — websites from £99 a month",
  description:
    "Three simple website plans: Starter £99, Growth £199, Pro £299 a month. Build free on a twelve-month term. No hidden fees, no hourly rates.",
  alternates: { canonical: "/pricing" },
};

/** Rows are keyed to plan ids so the table can never drift from the cards. */
const comparison = [
  { feature: "Website pages", starter: "1", growth: "Up to 6", pro: "As many as needed" },
  { feature: "Built for mobile first", starter: true, growth: true, pro: true },
  { feature: "Domain name registered for you", starter: true, growth: true, pro: true },
  { feature: "Hosting, SSL and backups", starter: true, growth: true, pro: true },
  { feature: "Added to your Google listing", starter: true, growth: true, pro: true },
  { feature: "Click-to-call and directions", starter: true, growth: true, pro: true },
  { feature: "Photo gallery", starter: false, growth: true, pro: true },
  { feature: "Services, menu or price list pages", starter: false, growth: true, pro: true },
  { feature: "Enquiry forms to your phone", starter: false, growth: true, pro: true },
  { feature: "Online booking or ordering", starter: false, growth: false, pro: true },
  { feature: "Unlimited sensible changes", starter: "Text & photos", growth: true, pro: true },
  { feature: "Priority on changes", starter: false, growth: false, pro: true },
  { feature: "Free build on 12 months", starter: false, growth: true, pro: true },
];

function Cell({ value }: { value: string | boolean }) {
  if (value === true)
    return (
      <>
        <Check className="mx-auto size-4 text-amber-ink" />
        <span className="sr-only">Included</span>
      </>
    );
  if (value === false)
    return (
      <>
        <span aria-hidden="true" className="text-faint">
          —
        </span>
        <span className="sr-only">Not included</span>
      </>
    );
  return <span className="text-xs font-medium text-muted">{value}</span>;
}

export default function PricingPage() {
  return (
    <>
      <Section className="pb-6 pt-16 md:pt-24">
        <div className="shell mx-auto max-w-3xl text-center">
          <div data-reveal="fade">
            <Eyebrow className="justify-center">Pricing</Eyebrow>
          </div>
          <div className="mt-5">
            <SplitHeading
              as="h1"
              start={90}
              className="t-h2 text-navy"
              lines={["One monthly price.", "Everything in it."]}
            />
          </div>
          <p className="lede mx-auto mt-6 text-center" data-reveal style={delay(320)}>
            The website, the domain, the hosting and the updates are all in the
            monthly figure. There is no separate bill for any of it.
          </p>
        </div>
      </Section>

      <Section className="pt-6">
        <div className="shell">
          <PlanCards />
        </div>
      </Section>

      {/* Comparison */}
      <Section className="border-y border-line bg-cream-2">
        <div className="shell">
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>Side by side</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 text-navy"
                lines={["What's in each plan."]}
              />
            </div>
          </div>

          <div className="mt-10 overflow-x-auto" data-reveal>
            <table className="w-full min-w-[34rem] border-collapse text-sm">
              <caption className="sr-only">
                Comparison of the Starter, Growth and Pro website plans
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="w-2/5 pb-4 text-left font-semibold text-navy">
                    Feature
                  </th>
                  {plans.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className="pb-4 text-center font-semibold text-navy"
                    >
                      {p.name}
                      <span className="block text-xs font-medium text-faint">
                        £{p.price}/mo
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-t border-line">
                    <th
                      scope="row"
                      className="py-3.5 pr-4 text-left font-normal text-muted"
                    >
                      {row.feature}
                    </th>
                    <td className="py-3.5 text-center">
                      <Cell value={row.starter} />
                    </td>
                    <td className="bg-amber/6 py-3.5 text-center">
                      <Cell value={row.growth} />
                    </td>
                    <td className="py-3.5 text-center">
                      <Cell value={row.pro} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* The free build explained honestly */}
      <Section>
        <div className="shell grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow>The free build</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 text-navy"
                lines={["Where's the", "catch?"]}
              />
            </div>
          </div>
          <div className="prose-body md:col-span-8" data-reveal style={delay(130)}>
            <p>
              A website that would normally cost £500 to £1,500 to build costs
              you nothing upfront on Growth and Pro. The only condition is that
              you stay on the plan for twelve months.
            </p>
            <p>
              That&rsquo;s the whole deal. I give up the upfront fee, you commit
              to a year, and we both get something predictable. If you cancel
              before the twelve months are up, the waived build fee becomes
              payable — otherwise the offer wouldn&rsquo;t be possible.
            </p>
            <p>
              On Starter the margin is thinner, so there&rsquo;s usually a small
              one-off build fee of £150–£300 instead. And if what you need is
              genuinely bigger than a normal build, there may be a fee on the
              higher plans too. Either way you will be told the exact number
              before you agree to anything — I&rsquo;m not going to send you a
              surprise invoice.
            </p>
            <p>
              After your twelve months you&rsquo;re month to month. Give a
              month&rsquo;s notice and that&rsquo;s the end of it. Your domain
              is registered in your name and goes with you.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-line bg-cream-2">
        <div className="shell grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow>Questions</Eyebrow>
            <div className="mt-5">
              <SplitHeading className="t-h3 text-navy" lines={["Before", "you ask."]} />
            </div>
          </div>
          <div className="md:col-span-8" data-reveal style={delay(120)}>
            <Accordion
              items={faqs.map((f, i) => ({
                key: `pf-${i}`,
                heading: f.q,
                body: (
                  <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                    {f.a}
                  </p>
                ),
              }))}
            />
          </div>
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
            lines={["Not sure which", "one you need?"]}
          />
          <p className="lede mx-auto mt-6 text-center" data-reveal style={delay(150)}>
            Tell me what you do and I&rsquo;ll tell you honestly — including
            when the cheapest one is the right one.
          </p>
          <div
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
            data-reveal
            style={delay(220)}
          >
            <ButtonLink href="/contact">
              Ask me
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
