import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Accordion from "@/components/Accordion";
import {
  ArrowRight,
  ArrowUpRight,
  Availability,
  ButtonLink,
  Check,
  Eyebrow,
  Phone,
  Rule,
  Section,
  SplitHeading,
  delay,
} from "@/components/ui";
import { areaPages, getArea } from "@/lib/areas";
import { plans, site } from "@/lib/site";

type Params = { params: Promise<{ town: string }> };

export function generateStaticParams() {
  return areaPages.map((a) => ({ town: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { town } = await params;
  const area = getArea(town);
  if (!area) return { title: "Area not found" };

  return {
    /* Bypasses the "%s — VEYRO" template: these titles need every one of
       their 60 characters for the place name and the price. */
    title: { absolute: area.titleSuffix },
    description: area.metaDescription,
    alternates: { canonical: `/website-design/${area.slug}` },
    openGraph: {
      title: area.titleSuffix,
      description: area.metaDescription,
      type: "website",
    },
  };
}

export default async function AreaPage({ params }: Params) {
  const { town } = await params;
  const area = getArea(town);
  if (!area) notFound();

  /* Page-level schema naming this specific place. The site-wide schema in
     layout.tsx covers the business; this ties the page to the town. */
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Website design",
    name: `Website design in ${area.town}`,
    description: area.metaDescription,
    provider: {
      "@type": "ProfessionalService",
      name: site.legalName,
      telephone: site.phone,
      email: site.email,
      url: site.url,
    },
    areaServed: { "@type": "Place", name: area.town },
    url: `${site.url}/website-design/${area.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "GBP",
      price: "99",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "99",
        priceCurrency: "GBP",
        unitCode: "MON",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Hero */}
      <Section className="pb-6 pt-16 md:pt-24">
        <div className="shell max-w-3xl">
          <div data-reveal="fade">
            <Eyebrow>Website design — {area.town}</Eyebrow>
          </div>
          <div className="mt-5">
            <SplitHeading
              as="h1"
              start={90}
              className="t-h2 text-navy"
              lines={[`Websites for`, `${area.town} businesses.`]}
            />
          </div>
          <p className="lede mt-6" data-reveal style={delay(300)}>
            {area.lede}
          </p>
          <div className="mt-7" data-reveal style={delay(360)}>
            <Availability>Taking on new businesses this month</Availability>
          </div>
          <div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            data-reveal
            style={delay(420)}
          >
            <ButtonLink href="/contact">
              Get a free quote
              <span className="nudge inline-flex">
                <ArrowRight />
              </span>
            </ButtonLink>
            <ButtonLink href={`tel:${site.phoneHref}`} variant="ghost">
              <Phone className="size-4" />
              {site.phone}
            </ButtonLink>
          </div>
        </div>
      </Section>

      {/* Why this town */}
      <Section className="pt-6">
        <div className="shell grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow>The situation</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 text-navy"
                lines={["What I see", `in ${area.town}.`]}
              />
            </div>
          </div>
          <div className="prose-body md:col-span-8" data-reveal style={delay(130)}>
            {area.body.map((p) => (
              <p key={p} className="text-[1.0625rem] md:text-lg">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Worked example — the most page-specific content here, and the
          reason these are not doorway pages */}
      <Section className="border-t border-line pt-14 md:pt-16">
        <div className="shell grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow>For instance</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 text-navy"
                lines={[area.example.heading]}
              />
            </div>
          </div>
          <div className="prose-body md:col-span-8" data-reveal style={delay(130)}>
            {area.example.body.map((p) => (
              <p key={p} className="text-[1.0625rem] md:text-lg">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Section>

      {/* Trades */}
      <Section className="border-y border-line bg-cream-2">
        <div className="shell">
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>Who I build for here</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 text-navy"
                lines={[`Common in ${area.town}:`]}
              />
            </div>
          </div>
          <ul className="stagger mt-8 flex flex-wrap gap-2.5" data-reveal>
            {area.trades.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-cream px-4 py-2 text-sm font-medium text-navy"
              >
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-7 max-w-xl text-sm leading-relaxed text-muted" data-reveal>
            Not on the list? It makes no difference — the job is the same
            whatever the trade.
          </p>
        </div>
      </Section>

      {/* Pricing — a compact strip, not the full cards.
          The full PlanCards and the five process steps used to be here.
          Between them they were ~440 words of text identical on all six
          pages, which pushed shared content to 57% and made these look
          like doorway pages. They live on /pricing, linked below. */}
      <Section className="pt-14 md:pt-16">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Eyebrow className="justify-center">Pricing</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 text-navy"
                lines={["Same price everywhere.", "No local premium."]}
              />
            </div>
          </div>

          <ul className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-3" data-reveal>
            {plans.map((p) => (
              <li
                key={p.id}
                className={`rounded-xl border-2 p-5 text-center ${
                  p.featured ? "border-amber bg-white" : "border-line bg-cream-2"
                }`}
              >
                <span className="display block text-3xl text-navy">£{p.price}</span>
                <span className="mt-1 block text-xs font-medium text-faint">
                  per month
                </span>
                <span className="mt-3 block text-sm font-semibold text-navy">
                  {p.name}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-center" data-reveal>
            <Link
              href="/pricing"
              className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-amber-ink"
            >
              <span className="link-sweep">
                What&rsquo;s in each plan, and how the free build works
              </span>
              <span className="nudge inline-flex">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </Section>

      {/* Area-specific FAQ */}
      <Section className="border-t border-line">
        <div className="shell grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow>Questions</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 text-navy"
                lines={["Asked in", area.town + "."]}
              />
            </div>
            <Rule className="mt-8 md:hidden" />
          </div>
          <div className="md:col-span-8" data-reveal style={delay(120)}>
            <Accordion
              items={area.faq.map((f, i) => ({
                key: `${area.slug}-faq-${i}`,
                heading: f.q,
                body: (
                  <p className="max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
                    {f.a}
                  </p>
                ),
              }))}
            />
            <ul className="stagger mt-10 space-y-2.5">
              {[
                "No upfront cost on Growth and Pro",
                "You never touch the site — I make every change",
                "Your domain stays registered in your name",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2.5 text-sm text-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-amber-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Nearby — internal linking between area pages */}
      <Section className="border-t border-line bg-cream-2 py-14 md:py-16">
        <div className="shell text-center">
          <h2 className="eyebrow justify-center">Also covering</h2>
          <ul className="mt-5 flex flex-wrap justify-center gap-2.5">
            {areaPages
              .filter((a) => a.slug !== area.slug)
              .map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/website-design/${a.slug}`}
                    className="group inline-flex min-h-11 items-center rounded-full border border-line bg-cream px-4 text-sm font-medium text-navy transition-colors duration-300 hover:border-amber"
                  >
                    <span className="link-sweep">{a.town}</span>
                  </Link>
                </li>
              ))}
          </ul>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted">
            Plus {area.nearby.join(", ")} and the rest of North Tyneside — and
            remotely anywhere in the UK.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-line py-24 md:py-28">
        <div
          className="bloom left-1/2 top-1/2 h-64 w-[32rem] -translate-x-1/2 -translate-y-1/2 opacity-45"
          aria-hidden="true"
        />
        <div className="shell relative text-center">
          <SplitHeading
            className="t-h3 mx-auto max-w-2xl text-navy"
            lines={[`Let's sort your`, `${area.town} website.`]}
          />
          <p className="lede mx-auto mt-6 text-center" data-reveal style={delay(150)}>
            Tell me what you do and I&rsquo;ll show you what I&rsquo;d build —
            free, and I won&rsquo;t chase you afterwards.
          </p>
          <div
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
            data-reveal
            style={delay(220)}
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
