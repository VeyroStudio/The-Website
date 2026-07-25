import type { Metadata } from "next";
import { Mark } from "@/components/Logo";
import Marquee from "@/components/Marquee";
import {
  ArrowUpRight,
  Availability,
  ButtonLink,
  Eyebrow,
  Phone,
  Section,
  SplitHeading,
  delay,
} from "@/components/ui";
import { areas, principles, promises, site, trades } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} is a one-person web business based in ${site.baseTown}, building websites for local shops, salons and takeaways across ${site.region}.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <Section className="pb-6 pt-16 md:pt-24">
        <div className="shell max-w-3xl">
          <div data-reveal="fade">
            <Eyebrow>About</Eyebrow>
          </div>
          <div className="mt-5">
            <SplitHeading
              as="h1"
              start={90}
              className="t-h2 text-navy"
              lines={["I'm local, and", "it's just me."]}
            />
          </div>
          <p className="lede mt-6" data-reveal style={delay(300)}>
            No office, no account managers, no sales team. If you ring the
            number on this site, I answer it.
          </p>
          <div className="mt-7" data-reveal style={delay(380)}>
            <Availability>Taking on new businesses this month</Availability>
          </div>
        </div>
      </Section>

      <Section className="pt-6">
        <div className="shell grid gap-12 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-4" data-reveal>
            <div className="md:sticky md:top-32">
              <Mark title={null} className="w-16 text-navy/12" />
              <p className="mt-6 max-w-[26ch] text-sm leading-relaxed text-faint">
                The mark is a V that overshoots — a letter and a direction at
                the same time.
              </p>
            </div>
          </div>

          <div className="prose-body md:col-span-8" data-reveal style={delay(110)}>
            <p className="display text-[clamp(1.25rem,2.6vw,1.85rem)] leading-snug !text-navy">
              I kept noticing the same thing walking round {site.baseTown}.
            </p>
            <p className="mt-6">
              Good businesses — proper ones, busy ones, places people rate —
              with nothing online at all. A barber with a queue out the door
              and not a single search result. A butcher whose customers
              couldn&rsquo;t tell you the opening hours without walking past.
            </p>
            <p>
              When I asked why, the answer was almost always the same. Someone
              had quoted them two grand and they&rsquo;d decided websites
              weren&rsquo;t for people like them. Or they&rsquo;d had one once,
              nobody ever touched it, and it quietly stopped meaning anything.
            </p>
            <p>
              So that&rsquo;s what this is built to fix. No big bill at the
              start — you pay monthly, and the build is free if you commit to a
              year. And the monthly fee isn&rsquo;t rent for a file sitting on a
              server; it&rsquo;s me keeping the thing current, because a website
              nobody updates is exactly the website that did nothing last time.
            </p>
            <p>
              I&rsquo;m not trying to be the biggest agency in the North East.
              I&rsquo;m trying to look after a manageable number of local
              businesses properly, for a price that doesn&rsquo;t make anyone
              wince.
            </p>
          </div>
        </div>
      </Section>

      <div data-reveal="fade">
        <Marquee items={trades} duration={52} />
      </div>

      {/* Principles */}
      <Section>
        <div className="shell">
          <div className="max-w-2xl" data-reveal>
            <Eyebrow>How I work</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h2 text-navy"
                lines={["Six things I", "won't budge on."]}
              />
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((p, i) => (
              <div
                key={p.title}
                className="lift rounded-2xl border border-line bg-white p-7"
                data-reveal
                style={delay((i % 3) * 90)}
              >
                <span className="text-sm font-bold text-amber-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="display mt-3 text-xl text-navy">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Promises */}
      <Section className="border-y border-line bg-cream-2">
        <div className="shell">
          <div data-reveal>
            <Eyebrow>What you can hold me to</Eyebrow>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 lg:grid-cols-4">
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

      {/* Areas */}
      <Section>
        <div className="shell text-center">
          <div data-reveal>
            <Eyebrow className="justify-center">Where I work</Eyebrow>
            <div className="mt-5">
              <SplitHeading
                className="t-h3 mx-auto max-w-2xl text-navy"
                lines={["Around here, mostly."]}
              />
            </div>
          </div>
          <ul
            className="stagger mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2.5"
            data-reveal
          >
            {areas.map((a) => (
              <li
                key={a}
                className="rounded-full border border-line bg-cream-2 px-4 py-2 text-sm font-medium text-navy"
              >
                {a}
              </li>
            ))}
          </ul>
          <p
            className="mx-auto mt-7 max-w-xl text-sm leading-relaxed text-muted"
            data-reveal
          >
            Further afield is fine too — the work is the same over a video call,
            you just don&rsquo;t get me turning up with a coffee.
          </p>
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
            lines={["Fancy a chat", "about it?"]}
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
