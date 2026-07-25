import {
  ArrowRight,
  ButtonLink,
  Eyebrow,
  Phone,
  SplitHeading,
  delay,
} from "@/components/ui";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100svh-var(--nav-h))] items-center overflow-hidden py-24">
      <div
        className="bloom left-1/2 top-1/2 h-64 w-[32rem] -translate-x-1/2 -translate-y-1/2 opacity-40"
        aria-hidden="true"
      />
      <div className="shell relative">
        <Eyebrow>Page not found</Eyebrow>
        <div className="mt-6">
          <SplitHeading
            as="h1"
            className="t-h2 text-navy"
            lines={["That page isn't", "here any more."]}
          />
        </div>
        <p className="lede mt-6">
          Either the link is old or I&rsquo;ve moved something. Everything
          worth seeing is a click away.
        </p>
        <div
          className="mt-9 flex flex-col gap-3 sm:flex-row"
          data-reveal
          style={delay(150)}
        >
          <ButtonLink href="/">
            Back to the start
            <span className="nudge inline-flex">
              <ArrowRight />
            </span>
          </ButtonLink>
          <ButtonLink href="/pricing" variant="ghost">
            See the prices
          </ButtonLink>
          <ButtonLink href={`tel:${site.phoneHref}`} variant="ghost">
            <Phone className="size-4" />
            {site.phone}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
