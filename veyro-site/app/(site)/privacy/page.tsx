import type { Metadata } from "next";
import { Eyebrow, Section, SplitHeading } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `How ${site.legalName} handles the details you send through this website.`,
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

/**
 * Starting-point privacy notice.
 *
 * Plain English, not legal advice. Have it checked before launch, and
 * update it if you add analytics, embedded maps or any third-party
 * script that sets cookies.
 */
export default function PrivacyPage() {
  const sections = [
    {
      h: "What I collect",
      p: [
        "When you fill in the enquiry form I get your name, business name, the phone number or email you gave me, your trade, what you've currently got online, which plan you're interested in, your area, and anything you typed in the message box. Nothing on that form is collected without you typing it.",
        "There are no advertising cookies or tracking pixels on this site.",
      ],
    },
    {
      h: "Why I hold it",
      p: [
        "To reply to your enquiry and, if it goes further, to build and look after your website. That's the only reason. The lawful basis is legitimate interest — you contacted me about work.",
      ],
    },
    {
      h: "Who sees it",
      p: [
        "Only me. Enquiries come through a form provider and land in my email inbox. I don't sell, rent or share your details, and you will not be added to a mailing list or an automated follow-up sequence.",
      ],
    },
    {
      h: "How long I keep it",
      p: [
        "Enquiries that don't turn into work are deleted within twelve months. If you become a client, I keep the correspondence for six years after we finish, which is how long business records have to be kept.",
      ],
    },
    {
      h: "Your rights",
      p: [
        "Under UK GDPR you can ask me for a copy of what I hold, ask me to correct it, or ask me to delete it. Email or ring and I'll sort it within a month, free.",
        "If you're unhappy with how I've handled your data you can complain to the Information Commissioner's Office at ico.org.uk.",
      ],
    },
    {
      h: "Contact",
      p: [
        `Any questions about this go to ${site.email} or ${site.phone}, and you'll get a person rather than a form.`,
      ],
    },
  ];

  return (
    <Section className="pt-16 md:pt-24">
      <div className="shell">
        <Eyebrow>Legal</Eyebrow>
        <div className="mt-5">
          <SplitHeading
            as="h1"
            className="t-h3 text-navy"
            lines={["Privacy notice"]}
          />
        </div>
        <p className="mt-4 text-sm font-medium text-faint">
          Last updated — replace on launch
        </p>

        <div className="mt-12 max-w-3xl space-y-10">
          {sections.map((s) => (
            <div key={s.h} data-reveal>
              <h2 className="display text-[clamp(1.25rem,2.4vw,1.65rem)] leading-tight text-navy">
                {s.h}
              </h2>
              <div className="prose-body mt-3">
                {s.p.map((para) => (
                  <p key={para}>{para}</p>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className="mt-14 max-w-3xl rounded-xl border-l-4 border-amber bg-cream-2 p-5 text-sm leading-relaxed text-muted">
          Template notice — have this checked against how you actually handle
          data, and add your registered company details, before launch.
        </p>
      </div>
    </Section>
  );
}
