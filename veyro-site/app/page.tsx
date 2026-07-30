import Link from "next/link";
import Marquee from "@/components/Marquee";
import SearchGap from "@/components/SearchGap";
import PlanCards from "@/components/PlanCards";
import Accordion from "@/components/Accordion";
import Showcase from "@/components/Showcase";
import ScrollLit from "@/components/ScrollLit";
import { areaPages } from "@/lib/areas";
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
import {
  areas,
  capabilities,
  faqs,
  promises,
  site,
  steps,
  trades,
} from "@/lib/site";

export default function Home() {
  return (
    <>
      {/* ============================== Hero ============================== */}
      <section className="relative overflow-hidden pb-16 pt-10 md:pb-24 md:pt-16">
        <div
          className="bloom -top-24 right-0 h-[26rem] w-[34rem] opacity-50"
          aria-hidden="true"
        />

        <div className="shell relative grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-10">
          <div className="lg:col-span-7">
            <div data-reveal="fade">
              <Availability>Taking on new businesses this month</Availability>
            </div>

            <div className="mt-7">
              <SplitHeading
                as="h1"
                start={100}
                stagger={95}
                className="t-hero text-navy"
                lines={[
                  "Your customers",
                  "are Googling you.",
                  <>
                    Are you{" "}
                    <span className="mark-sweep">there</span>?
                  </>,
                ]}
              />
            </div>

            <p className="lede mt-7" data-reveal style={delay(460)}>
              I build websites for local businesses around {site.baseTown},
              Gosforth and Killingworth — from <strong className="font-semibold text-navy">£99 a month</strong>,
              with no big bill upfront. You send me your details once, and
              I look after the rest.
            </p>

            <div
              className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              data-reveal
              style={delay(560)}
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

            <ul
              className="stagger mt-10 flex flex-wrap gap-x-6 gap-y-3"
              data-reveal
              style={delay(640)}
            >
              {[
                "No upfront cost on Growth & Pro",
                "Live in about two weeks",
                "Changes whenever you need them",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-sm font-medium text-muted"
                >
                  <Check className="size-4 shrink-0 text-amber-ink" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5" data-reveal="right" style={delay(300)}>
            <SearchGap />
          </div>
        </div>
      </section>

      <div data-reveal="fade">
        <Marquee items={trades} />
      </div>

      {/* ========================== Who it's for ========================= */}
      <Section>
        <div className="shell">
          <div className="mx-auto max-w-3xl text-center" data-reveal>
            <Eyebrow className="justify-center">Who I build for</Eyebrow>
          </div>

          {/* Scroll-scrubbed word reveal */}
          <ScrollLit
            as="h2"
            text="Independent businesses that are good at what they do, and invisible the moment somebody searches for them."
            className="display mx-auto mt-6 max-w-4xl text-center text-[clamp(1.5rem,3.6vw,2.75rem)] leading-[1.15] text-navy"
          />

          <div className="mt-14 md:mt-18">
            <Showcase />
          </div>

          <p
            className="mx-auto mt-8 max-w-xl text-center text-sm leading-relaxed text-faint"
            data-reveal
          >
            Photographs are of the trades I build for, not of client work — I
            won&rsquo;t put anything in front of you that isn&rsquo;t mine.
          </p>
        </div>
      </Section>

      {/* ============================ The gap ============================= */}
      <Section className="border-t border-line">
        <div className="shell grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5" data-reveal>
            <Eyebrow>The problem</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h2 text-navy"
                lines={["If they can't", "find you, they", "find someone else."]}
              />
            </div>
          </div>

          <div className="prose-body md:col-span-7" data-reveal style={delay(140)}>
            <p className="text-[1.0625rem] md:text-lg">
              Someone asks a mate where to go. The mate says your name. And
              then — every single time now — they get their phone out and
              search for you before they walk in.
            </p>
            <p>
              If there&rsquo;s nothing to find, they don&rsquo;t ring to check.
              They scroll down and pick whoever turned up first, with the
              photos and the opening hours and the reviews. That&rsquo;s a
              customer you earned and lost in about four seconds, and
              you&rsquo;ll never know it happened.
            </p>
            <p>
              A Facebook page helps, but it doesn&rsquo;t show up on Google
              Maps, and you don&rsquo;t own it. A website is the bit that
              catches everyone your reputation sends you.
            </p>

            <div className="mt-8 rounded-xl border-l-4 border-amber bg-cream-2 p-6">
              <p className="!max-w-none text-[0.9375rem] font-medium !text-navy">
                &ldquo;We don&rsquo;t really need one — we&rsquo;re busy
                enough.&rdquo;
              </p>
              <p className="mt-2 !max-w-none text-[0.9375rem]">
                Maybe not. But the businesses ranking above you in that search
                weren&rsquo;t busier than you — they just turned up. I&rsquo;d
                rather you were the one they find.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* =========================== Promises ============================ */}
      <Section className="border-y border-line bg-cream-2">
        <div className="shell">
          <dl className="grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
            {promises.map((p, i) => (
              <div key={p.label} data-reveal style={delay(i * 90)}>
                <dt className="sr-only">{p.label}</dt>
                <dd>
                  <span className="display block text-[clamp(2.25rem,4.5vw,3.5rem)] leading-none text-amber-ink">
                    {p.value}
                  </span>
                  <span className="mt-3 block text-sm font-semibold text-navy">
                    {p.label}
                  </span>
                  <span className="mt-1.5 block max-w-[24ch] text-sm leading-relaxed text-muted">
                    {p.note}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* ============================ Pricing ============================= */}
      <Section id="pricing">
        <div className="shell">
          <div className="mx-auto max-w-2xl text-center" data-reveal>
            <Eyebrow className="justify-center">Simple pricing</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h2 text-navy"
                lines={["Pick a plan.", "That's the whole price."]}
              />
            </div>
            <p className="lede mx-auto mt-6 text-center">
              No hourly rates, no surprise invoices, no quote that arrives a
              week later with a number you weren&rsquo;t expecting.
            </p>
          </div>

          <div className="mt-14 md:mt-18">
            <PlanCards />
          </div>

          <div className="mt-10 text-center" data-reveal>
            <Link
              href="/pricing"
              className="group inline-flex min-h-11 items-center gap-2 text-[0.9375rem] font-semibold text-amber-ink"
            >
              <span className="link-sweep">See exactly what&rsquo;s included</span>
              <span className="nudge inline-flex">
                <ArrowRight />
              </span>
            </Link>
          </div>
        </div>
      </Section>

      {/* ========================== What you get ========================== */}
      <Section className="border-t border-line">
        <div className="shell">
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>What you get</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h2 text-navy"
                lines={["Websites. That's it —", "and done properly."]}
              />
            </div>
            <p className="lede mt-6">
              I don&rsquo;t run your social media or sell you ad campaigns.
              I build the website, get it found, and keep it working.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:mt-18 md:grid-cols-2">
            {capabilities.map((c, i) => (
              <div
                key={c.id}
                className="lift rounded-2xl border border-line bg-white p-7 md:p-8"
                data-reveal
                style={delay((i % 2) * 100)}
              >
                <span className="text-sm font-bold text-amber-ink">{c.index}</span>
                <h3 className="display mt-3 text-2xl text-navy">{c.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                  {c.summary}
                </p>
                <ul className="stagger mt-6 space-y-2.5 border-t border-line pt-5">
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
            ))}
          </div>
        </div>
      </Section>

      {/* =========================== How it works ======================== */}
      <Section className="border-t border-line bg-cream-2">
        <div className="shell">
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>How it works</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h2 text-navy"
                lines={["Five steps, and", "four of them are mine."]}
              />
            </div>
          </div>

          <ol className="mt-14 md:mt-18">
            {steps.map((s, i) => (
              <li
                key={s.step}
                className="group grid gap-4 border-t border-line py-8 md:grid-cols-12 md:gap-8 md:py-10"
                data-reveal
                style={delay(i * 80)}
              >
                <div className="flex items-center gap-4 md:col-span-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-amber text-sm font-bold text-navy">
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

      {/* ============================== FAQ ============================== */}
      <Section className="border-t border-line">
        <div className="shell grid gap-10 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4" data-reveal>
            <Eyebrow>Fair questions</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 text-navy"
                lines={["The things", "people actually", "ask me."]}
              />
            </div>
            <Rule className="mt-8 md:hidden" />
          </div>

          <div className="md:col-span-8" data-reveal style={delay(120)}>
            <Accordion
              items={faqs.slice(0, 6).map((f, i) => ({
                key: `faq-${i}`,
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

      {/* ============================= Areas ============================= */}
      <Section className="border-t border-line bg-cream-2">
        <div className="shell text-center">
          <div data-reveal>
            <Eyebrow className="justify-center">Where I work</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 mx-auto max-w-3xl text-navy"
                lines={["Local enough to", "walk through your door."]}
              />
            </div>
          </div>
          {/* Towns with their own page are links; the rest stay plain
              text rather than pointing nowhere. */}
          <ul
            className="stagger mx-auto mt-9 flex max-w-3xl flex-wrap justify-center gap-2.5"
            data-reveal
          >
            {areas.map((a) => {
              const page = areaPages.find((p) => p.town === a);
              return (
                <li key={a}>
                  {page ? (
                    <Link
                      href={`/website-design/${page.slug}`}
                      className="group inline-flex min-h-11 items-center rounded-full border border-line bg-cream px-4 text-sm font-medium text-navy transition-colors duration-300 hover:border-amber hover:bg-amber/10"
                    >
                      <span className="link-sweep">{a}</span>
                    </Link>
                  ) : (
                    <span className="inline-flex min-h-11 items-center rounded-full border border-line bg-cream px-4 text-sm font-medium text-navy">
                      {a}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          <p className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-muted" data-reveal>
            Not on the list? Everything here works just as well over the phone
            and email — I work with businesses across the UK, you just get
            video calls instead of visits.
          </p>
        </div>
      </Section>

      {/* =============================== CTA ============================== */}
      <section className="relative overflow-hidden border-t border-line py-24 md:py-32">
        <div
          className="bloom left-1/2 top-1/2 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 opacity-45"
          aria-hidden="true"
        />
        <div className="shell relative text-center">
          <SplitHeading
            className="t-h2 mx-auto max-w-3xl text-navy"
            lines={["Let's see what yours", "would look like."]}
          />
          <p className="lede mx-auto mt-6 text-center" data-reveal style={delay(160)}>
            Tell me what you do and I&rsquo;ll show you what I&rsquo;d build —
            free, no obligation, and I won&rsquo;t chase you afterwards.
          </p>
          <div
            className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"
            data-reveal
            style={delay(240)}
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
