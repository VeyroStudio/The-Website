/**
 * Prospect demo sites, served at /demo/<slug> — one per price point,
 * so the demo you send matches the plan you're pitching:
 *
 *   starter  one page, phone-first          (garage)
 *   growth   multi-page with booking        (barber)
 *   pro      multi-page with online ordering (pizza takeaway)
 *
 * Privacy model — these pages are hidden three ways:
 *   1. robots.txt disallows /demo/ entirely
 *   2. every response carries X-Robots-Tag: noindex + a meta robots tag
 *   3. slugs end in a random suffix, so links cannot be guessed, and
 *      nothing on the site links to them
 * They are NOT authenticated: anyone with the exact link can open it,
 * which is the point — prospects click straight through. Never put
 * anything confidential in a demo.
 *
 * House rules for entries:
 *   - Fictional business names only, until a prospect says yes.
 *   - Placeholder phone numbers, never real ones.
 *   - The footer credit is part of the sales pitch — keep it.
 *
 * For a real prospect: copy the entry whose plan you're pitching,
 * change the slug suffix (any 5 random characters), swap in what you
 * saw in their shop, deploy, send the link.
 */

export type MenuSection = {
  category: string;
  items: { name: string; desc?: string; price: string }[];
};

export type Demo = {
  slug: string;
  plan: "starter" | "growth" | "pro";
  business: string;
  strapline: string;
  town: string;
  address: string;
  /** Placeholder until the prospect is real. */
  phone: string;
  /** Three short trust points for the strip under the hero. */
  usps: string[];
  hours: { days: string; open: string }[];
  /** Clearly-illustrative quotes, part of the demo fiction. */
  reviews: { text: string; name: string }[];
  /** Per-trade design system, generated via ui-ux-pro-max and
   *  contrast-checked (every combination AA or better). Fonts are CSS
   *  vars declared in demo/layout.tsx with preload:false, so a page
   *  only downloads the two families it actually renders. */
  theme: {
    display: string;
    body: string;
    bg: string;
    navBg: string;
    sheet: string;
    surface: string;
    ink: string;
    muted: string;
    faint: string;
    line: string;
    lineStrong: string;
    accent: string;
    accentInk: string;
    onAccent: string;
  };
  hero: string;
  /** starter + growth: flat price list */
  services?: { name: string; price: string }[];
  /** growth: the deeper pages */
  about?: { lede: string; body: string[] };
  gallery?: { src: string; alt: string }[];
  /** pro: categorised menu for the ordering demo */
  menu?: MenuSection[];
};

export const planMeta = {
  starter: { label: "Starter", price: "£99" },
  growth: { label: "Growth", price: "£199" },
  pro: { label: "Pro", price: "£299" },
} as const;

/** The sub-pages a given demo actually has (drives nav + routing). */
export function pagesFor(demo: Demo): { path: string; label: string }[] {
  switch (demo.plan) {
    case "starter":
      return [];
    case "growth":
      return [
        { path: "", label: "Home" },
        { path: "prices", label: "Prices" },
        { path: "gallery", label: "Gallery" },
        { path: "about", label: "About" },
        { path: "book", label: "Book" },
      ];
    case "pro":
      return [
        { path: "", label: "Home" },
        { path: "menu", label: "Menu" },
      ];
  }
}

/** The nav's call-to-action for a demo. */
export function ctaFor(demo: Demo): { href: string; label: string } {
  const base = `/demo/${demo.slug}`;
  if (demo.plan === "pro") return { href: `${base}/menu`, label: "Order" };
  if (demo.plan === "growth") return { href: `${base}/book`, label: "Book" };
  return { href: `tel:${demo.phone.replace(/\s/g, "")}`, label: "Call now" };
}

export const demos: Demo[] = [
  /* ---------------- STARTER — £99: one page, phone-first ---------- */
  {
    slug: "northtyne-autos-m2r7v",
    plan: "starter",
    business: "NORTH TYNE AUTOS",
    strapline: "MOTs, servicing and repairs. All makes. Straight answers.",
    town: "Killingworth",
    address: "Unit 4, West Lane Industrial Estate, Killingworth NE12",
    phone: "0191 000 0001",
    usps: ["MOT while you wait", "All makes & models", "Free local collection"],
    hours: [
      { days: "Monday – Friday", open: "8:00 – 17:30" },
      { days: "Saturday", open: "8:00 – 12:00" },
      { days: "Sunday", open: "Closed" },
    ],
    reviews: [
      { text: "Quoted me half what the dealer wanted. Honest lads.", name: "Placeholder review" },
      { text: "MOT done while I waited with a proper explanation of the advisories.", name: "Placeholder review" },
      { text: "Picked the car up from work and dropped it back. Sorted.", name: "Placeholder review" },
    ],
    theme: {
      display: "var(--font-demo-lexend)",
      body: "var(--font-demo-source)",
      bg: "#F8FAFC",
      navBg: "rgba(248,250,252,0.92)",
      sheet: "#FFFFFF",
      surface: "#FFFFFF",
      ink: "#0F172A",
      muted: "#475569",
      faint: "#64748B",
      line: "#E2E8F0",
      lineStrong: "#CBD5E1",
      accent: "#F97316",
      accentInk: "#C2410C",
      onAccent: "#1A1207",
    },
    hero: "/demo/garage-hero.jpg",
    services: [
      { name: "MOT", price: "£40" },
      { name: "Interim service", price: "£89" },
      { name: "Full service", price: "£149" },
      { name: "Brakes (per axle)", price: "from £120" },
      { name: "Diagnostics", price: "£45" },
      { name: "Tyres & tracking", price: "Call for price" },
    ],
  },

  /* ---------------- GROWTH — £199: multi-page + booking ------------ */
  {
    slug: "northside-barbers-k4x9q",
    plan: "growth",
    business: "NORTHSIDE BARBERS",
    strapline: "Sharp cuts. No fuss. Walk in or book.",
    town: "Wideopen",
    address: "12 Front Street, Wideopen, Newcastle NE13",
    phone: "0191 000 0000",
    usps: ["Walk-ins welcome", "Open six days", "Card & cash"],
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
    theme: {
      display: "var(--font-demo-abril)",
      body: "var(--font-demo-merri)",
      bg: "#1C1917",
      navBg: "rgba(28,25,23,0.92)",
      sheet: "#26221F",
      surface: "rgba(255,255,255,0.04)",
      ink: "#FAFAF9",
      muted: "#D6D3D1",
      faint: "#A8A29E",
      line: "rgba(255,255,255,0.12)",
      lineStrong: "rgba(255,255,255,0.25)",
      accent: "#CA8A04",
      accentInk: "#E0B32B",
      onAccent: "#1C1917",
    },
    hero: "/demo/hero.jpg",
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
  },

  /* ---------------- PRO — £299: multi-page + online ordering ------- */
  {
    slug: "ember-pizza-t8w3z",
    plan: "pro",
    business: "EMBER PIZZA CO.",
    strapline: "Wood-fired, hand-stretched, ready in twenty minutes.",
    town: "Cramlington",
    address: "7 Forum Way, Cramlington NE23",
    phone: "0191 000 0002",
    usps: ["Wood-fired oven", "Collection in 20 min", "Family run"],
    hours: [
      { days: "Tuesday – Sunday", open: "16:30 – 22:30" },
      { days: "Monday", open: "Closed" },
    ],
    reviews: [
      { text: "Proper Neapolitan crust. Best pizza this side of the Tyne.", name: "Placeholder review" },
      { text: "Ordered online, collected in fifteen minutes, still blistering hot.", name: "Placeholder review" },
      { text: "The Ember Special is worth the drive from Newcastle on its own.", name: "Placeholder review" },
    ],
    theme: {
      display: "var(--font-demo-playfair)",
      body: "var(--font-demo-karla)",
      bg: "#FEF2F2",
      navBg: "rgba(254,242,242,0.92)",
      sheet: "#FFFFFF",
      surface: "#FFFFFF",
      ink: "#450A0A",
      muted: "#7A3B36",
      faint: "#9C5650",
      line: "#FECACA",
      lineStrong: "#FCA5A5",
      accent: "#DC2626",
      accentInk: "#B91C1C",
      onAccent: "#FFFFFF",
    },
    hero: "/demo/pizza-hero.jpg",
    menu: [
      {
        category: "Pizzas",
        items: [
          { name: "Margherita", desc: "San Marzano tomato, fior di latte, basil", price: "£8.50" },
          { name: "Pepperoni", desc: "Double pepperoni, mozzarella, hot honey", price: "£10.00" },
          { name: "Diavola", desc: "Nduja, chilli, salami, red onion", price: "£11.00" },
          { name: "Funghi", desc: "Wild mushroom, taleggio, truffle oil", price: "£10.50" },
          { name: "Ember Special", desc: "Smoked brisket, caramelised onion, smoked cheddar", price: "£12.50" },
        ],
      },
      {
        category: "Sides",
        items: [
          { name: "Garlic bread", desc: "Wood-fired, rosemary salt", price: "£4.50" },
          { name: "Dough balls", desc: "With garlic butter", price: "£4.00" },
          { name: "Rocket & parmesan salad", price: "£4.50" },
        ],
      },
      {
        category: "Drinks & desserts",
        items: [
          { name: "Soft drinks", price: "£1.80" },
          { name: "San Pellegrino", price: "£2.20" },
          { name: "Nutella pizza ring", desc: "Shared? Allegedly.", price: "£6.50" },
        ],
      },
    ],
  },
];

export function getDemo(slug: string) {
  return demos.find((d) => d.slug === slug);
}
