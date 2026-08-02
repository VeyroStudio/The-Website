/**
 * Prospect demo sites, served at /demo/<slug>.
 *
 * This is the playbook's closing move made real: "I put together a
 * quick example of what a site for [Business] could look like." Add an
 * entry, deploy, and send the prospect their private link.
 *
 * Privacy model — these pages are hidden three ways:
 *   1. robots.txt disallows /demo/ entirely
 *   2. every response carries X-Robots-Tag: noindex + a meta robots tag
 *   3. slugs end in a random suffix, so links cannot be guessed, and
 *      nothing on the site links to them
 * They are NOT authenticated. Anyone with the exact link can open it —
 * which is the point (prospects click straight through), but it means
 * nothing confidential goes in a demo.
 *
 * House rules for entries:
 *   - Fictional business names only, until a prospect says yes. Never
 *     put a real trading name on a demo without asking them first.
 *   - Placeholder phone numbers (07000 / 0191 000 form), never real ones.
 *   - The footer credit ("Demo by VEYRO") is part of the sales pitch —
 *     keep it.
 *
 * To make a demo for a real prospect: copy an entry, change the slug
 * suffix (any 5 random characters), swap the name/services/prices to
 * match what you saw in their shop, deploy.
 */

export type Demo = {
  /** Unguessable link path: business-name plus a random suffix. */
  slug: string;
  /** Which plan this demo is selling. Growth demos get the multi-page
   *  treatment — that is the £199 plan's whole differentiator. */
  plan: "starter" | "growth";
  business: string;
  strapline: string;
  town: string;
  address: string;
  /** Placeholder until the prospect is real. */
  phone: string;
  /** Three short trust points for the strip under the hero. */
  usps: string[];
  services: { name: string; price: string }[];
  hours: { days: string; open: string }[];
  /** Clearly-illustrative quotes, part of the demo fiction. */
  reviews: { text: string; name: string }[];
  /** The about page — where a Growth site earns its keep. */
  about: { lede: string; body: string[] };
  gallery: { src: string; alt: string }[];
  /** Accent colour for this trade. */
  accent: string;
};

export const demos: Demo[] = [
  {
    slug: "northside-barbers-k4x9q",
    plan: "growth",
    business: "NORTHSIDE BARBERS",
    strapline: "Sharp cuts. No fuss. Walk in or book.",
    town: "Wideopen",
    address: "12 Front Street, Wideopen, Newcastle NE13",
    phone: "0191 000 0000",
    usps: ["Walk-ins welcome", "Open six days", "Card & cash"],
    services: [
      { name: "Haircut", price: "£13" },
      { name: "Skin fade", price: "£15" },
      { name: "Beard trim", price: "£8" },
      { name: "Cut & beard", price: "£20" },
      { name: "Hot towel shave", price: "£16" },
      { name: "Kids (under 12)", price: "£10" },
      { name: "OAP weekdays", price: "£9" },
      { name: "Restyle consultation", price: "Free" },
    ],
    hours: [
      { days: "Monday – Friday", open: "9:00 – 18:00" },
      { days: "Saturday", open: "8:00 – 16:00" },
      { days: "Sunday", open: "Closed" },
    ],
    reviews: [
      { text: "Best fade in the North East. Never going anywhere else.", name: "Placeholder review" },
      { text: "In and out in twenty minutes, spot on every time.", name: "Placeholder review" },
      { text: "Took my lad for his first proper cut — brilliant with kids.", name: "Placeholder review" },
    ],
    about: {
      lede: "A proper barbershop, the way they used to be.",
      body: [
        "Northside opened its doors on Front Street with one idea: a good cut, a straight answer, and no appointment system that takes longer than the haircut. Walk in, take a seat, talk football or say nothing at all.",
        "Every barber in the shop trained the long way — years on the clippers, not a weekend course. Skin fades, scissor work, hot towel shaves and beard shaping, done properly and done quickly.",
        "First visit? Come in five minutes early, tell us what you're after — or show us a photo — and we'll tell you honestly whether it'll suit you. That's it. No fuss.",
      ],
    },
    gallery: [
      { src: "/demo/gallery-1.jpg", alt: "Inside the shop" },
      { src: "/demo/gallery-2.jpg", alt: "The chair" },
      { src: "/demo/gallery-3.jpg", alt: "Finishing a fade" },
      { src: "/demo/gallery-4.jpg", alt: "Clipper work" },
      { src: "/demo/gallery-5.jpg", alt: "Line-up detail" },
      { src: "/demo/gallery-6.jpg", alt: "Beard trim" },
    ],
    accent: "#C9A227",
  },
];

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}

/** The demo's sub-pages, used by the nav and static generation. */
export const demoPages = [
  { path: "", label: "Home" },
  { path: "prices", label: "Prices" },
  { path: "gallery", label: "Gallery" },
  { path: "about", label: "About" },
  { path: "book", label: "Book" },
] as const;
