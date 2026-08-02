/**
 * VEYRO — single source of truth for site content.
 *
 * Positioning and packages follow the Wideopen Web Agency Playbook:
 * local micro-businesses with no website, sold a website on a monthly
 * plan rather than a large upfront build fee.
 *
 * VEYRO sells websites only. No social posting, review management or
 * ad campaigns are offered or implied anywhere on this site.
 */

export const site = {
  name: "VEYRO",
  legalName: "VEYRO",
  tagline: "Websites for local businesses",
  description:
    "VEYRO builds websites for local businesses across Wideopen, Gosforth, Killingworth and the wider North East — from £99 a month, with no big upfront bill. Working remotely with businesses anywhere in the UK.",
  /** Live domain — drives canonical URLs, the sitemap and social tags. */
  url: "https://veyrostudio.co.uk",
  email: "ethan@veyrostudio.co.uk",
  /** Display format. */
  phone: "07572 058490",
  /** International format for tel: links — no spaces. */
  phoneHref: "+447572058490",
  baseTown: "Wideopen",
  region: "North East England",
  owner: "Ethan",
  locale: "en-GB",
} as const;

export const nav = [
  { label: "Pricing", href: "/pricing" },
  { label: "What you get", href: "/what-you-get" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
] as const;

/* ------------------------------------------------------------------
   Areas — the walk-in radius, plus the honest wider note.
   Doubles as local SEO surface.
   ------------------------------------------------------------------ */

export const areas = [
  "Wideopen",
  "Gosforth",
  "Killingworth",
  "Cramlington",
  "Forest Hall",
  "Longbenton",
  "Dinnington",
  "Ponteland",
  "Newcastle",
  "North Tyneside",
];

/* ------------------------------------------------------------------
   Trades — who this is for. Used in the ticker and the form.
   ------------------------------------------------------------------ */

export const trades = [
  "Barbers",
  "Hair salons",
  "Beauty salons",
  "Takeaways",
  "Restaurants",
  "Cafés",
  "Butchers",
  "Bakeries",
  "Greengrocers",
  "Pubs",
  "Nail technicians",
  "Tattoo studios",
  "Garages",
  "Tradespeople",
  "Newsagents",
  "Dog groomers",
];

/* ------------------------------------------------------------------
   Showcase — stock photography of the KINDS of business VEYRO builds
   for. These are not clients and must never be presented as work.
   See public/trades/CREDITS.md.
   ------------------------------------------------------------------ */

export const showcase = [
  {
    src: "/trades/barbers.jpg",
    label: "Barbers",
    alt: "The interior of a barbershop, with leather chairs facing mirrors under warm pendant lights.",
  },
  {
    src: "/trades/salons.jpg",
    label: "Hair & beauty salons",
    alt: "A bright hair salon with a round mirror, styling chair and shelves of products.",
  },
  {
    src: "/trades/takeaways.jpg",
    label: "Takeaways",
    alt: "A busy commercial kitchen with steam rising from a pan and pots stacked along the counter.",
  },
  {
    src: "/trades/cafes.jpg",
    label: "Cafés",
    alt: "A café counter with an espresso machine and a chalkboard menu, looking out on to a street.",
  },
  {
    src: "/trades/butchers.jpg",
    label: "Butchers",
    alt: "A butcher's chilled display counter filled with cuts of meat and price labels.",
  },
  {
    src: "/trades/bakeries.jpg",
    label: "Bakeries",
    alt: "A bakery counter stacked with pastries, with shelves of bread loaves behind it.",
  },
];

/* ------------------------------------------------------------------
   Promises — commitments, not claims. Safe for a new business.
   ------------------------------------------------------------------ */

export const promises = [
  {
    value: "£0",
    label: "Upfront on Growth & Pro",
    note: "Your build is free when you commit to twelve months.",
  },
  {
    value: "2 wks",
    label: "From yes to live",
    note: "Most sites are online within a fortnight of getting your details.",
  },
  {
    value: "24h",
    label: "To answer you",
    note: "Every enquiry gets a reply within one working day.",
  },
  {
    value: "1",
    label: "Person, start to finish",
    note: "You deal with me. Not a call centre, not a sales rep.",
  },
];

/* ------------------------------------------------------------------
   Packages — websites only.
   `upfront` is the honest answer to "is it really free?".
   ------------------------------------------------------------------ */

export type Plan = {
  id: string;
  name: string;
  price: number;
  cadence: string;
  tagline: string;
  bestFor: string;
  upfront: string;
  featured: boolean;
  includes: string[];
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    price: 99,
    cadence: "/month",
    tagline: "One good page that gets you found.",
    bestFor: "Barbers, newsagents, greengrocers, solo stylists",
    upfront:
      "Small one-off build fee, usually £150–£300, or waived on a longer term.",
    featured: false,
    includes: [
      "One-page website, built for mobile first",
      "Your own domain name, registered for you",
      "Hosting, SSL and security updates",
      "Click-to-call and directions built in",
      "Your new site added to your Google listing",
      "Text and photo changes whenever you need them",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: 199,
    cadence: "/month",
    tagline: "A proper website, looked after for you.",
    bestFor: "Salons, butchers, bakeries, cafés, established shops",
    upfront: "Build is free when you commit to twelve months.",
    featured: true,
    includes: [
      "Multi-page website — up to six pages",
      "Services, menu or price list pages",
      "Photo gallery of your work",
      "Contact and enquiry forms straight to your phone",
      "Everything in Starter",
      "Unlimited sensible changes, no charge per edit",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 299,
    cadence: "/month",
    tagline: "For businesses taking bookings or orders online.",
    bestFor: "Takeaways, restaurants, pubs, busy salons",
    upfront:
      "Build is free when you commit to twelve months. Larger builds may carry a fee — quoted before you commit.",
    featured: false,
    includes: [
      "Larger website, as many pages as it needs",
      "Online booking or online ordering built in",
      "Full menu or treatment list, kept current for you",
      "Everything in Growth",
      "Priority on changes — same-day where I can",
      "A proper look at how the site is performing",
    ],
  },
];

/** Shown wherever prices appear. Set by the user: monthly, with upfront by size. */
export const pricingNote =
  "Prices are per month. On Growth and Pro the website build is free if you stay twelve months — on Starter, or on a bigger build than usual, there may be a one-off fee. Whatever it is, you will know the number before you agree to anything.";

/* ------------------------------------------------------------------
   What's actually done — websites only
   ------------------------------------------------------------------ */

export const capabilities = [
  {
    id: "website",
    index: "01",
    title: "The website itself",
    summary:
      "A clean, fast site that works properly on a phone — which is where nearly all of your customers will see it.",
    detail:
      "Most people looking for a barber or a takeaway are standing outside with a phone in their hand. So the site is designed for that first: big tap targets, your phone number one thumb away, opening hours and directions without hunting. Then it's checked on a laptop too.",
    points: [
      "Designed for phones first",
      "Loads in under two seconds",
      "Your phone number always one tap away",
      "Opening hours, address and directions",
    ],
  },
  {
    id: "found",
    index: "02",
    title: "Getting found on Google",
    summary:
      "Your site set up so Google understands who you are, where you are and what you do.",
    detail:
      "A website nobody can find is an expensive business card. Every site is built with the technical groundwork search engines look for, and when it goes live I'll add it to your Google Business Profile so the listing people already see points at your new site.",
    points: [
      "Built so Google can read it properly",
      "Your town and trade in the right places",
      "New site linked on your Google listing",
      "Listed correctly on Google Maps",
    ],
  },
  {
    id: "domain",
    index: "03",
    title: "Domain and hosting",
    summary: "The boring, essential bits — handled, and included in the price.",
    detail:
      "I register the domain, set up the hosting, keep the security certificate valid and make sure the whole thing stays up. If you already own a domain, I'll point it at the new site. There is no separate hosting bill.",
    points: [
      "Domain registered for you",
      "Hosting and SSL included",
      "Backups and security updates",
      "No separate bills to think about",
    ],
  },
  {
    id: "changes",
    index: "04",
    title: "Changes, whenever",
    summary:
      "Prices gone up? New photos? Message me and it's done — no invoice, no waiting.",
    detail:
      "This is the part most people don't expect. On Growth and Pro you get unlimited sensible changes as part of the monthly price. Send me a text with the new prices and I'll update the site that day. A website that goes stale is a website that stops working.",
    points: [
      "Text or email the change, I do it",
      "No charge per edit on Growth and Pro",
      "Usually same day, always within two",
      "New photos, prices, hours, staff, services",
    ],
  },
];

/* ------------------------------------------------------------------
   How it works
   ------------------------------------------------------------------ */

export const steps = [
  {
    step: "01",
    title: "A five-minute chat",
    body: "In person, on the phone, or over a message — whatever suits. I'll ask what you do and show you what's missing when someone Googles you. No charge, no pressure.",
  },
  {
    step: "02",
    title: "You send me the basics",
    body: "Your opening hours, services and prices, a few photos, your logo if you have one. Ten minutes of your time, once. If you don't have photos, I'll sort that.",
  },
  {
    step: "03",
    title: "I build it",
    body: "You get a link to look at before anything goes public. Tell me what you want changed. There is no limit on that — it goes live when you're happy with it.",
  },
  {
    step: "04",
    title: "It goes live",
    body: "Domain pointed, site published, and your new website added to your Google listing so people searching for you actually land on it.",
  },
  {
    step: "05",
    title: "I look after it",
    body: "That's what the monthly fee is for. Updates, changes, hosting, keeping it secure. You get on with running your business.",
  },
];

/* ------------------------------------------------------------------
   About — plain, no invented credentials
   ------------------------------------------------------------------ */

export const principles = [
  {
    title: "You get me, not a sales rep",
    body: "The person who answers the phone is the person who builds the site and the person who updates it eighteen months from now.",
  },
  {
    title: "No jargon, ever",
    body: "You will never get an email from me about SEO funnels or conversion optimisation. I'll tell you what I'm doing in plain English.",
  },
  {
    title: "No big upfront bill",
    body: "The thing that puts most people off is a £1,500 invoice before they've seen anything. So that's not how this works.",
  },
  {
    title: "I'm local",
    body: "I can walk through your door. If something's wrong you can tell me to my face rather than raising a ticket.",
  },
  {
    title: "You own your domain",
    body: "The domain is registered in your name. If you ever leave, you take it with you. Nobody should be held hostage by their web person.",
  },
  {
    title: "Cancel-friendly after the term",
    body: "Twelve months on the free-build plans, because a free website has to be paid for somehow. After that, month to month.",
  },
];

/* ------------------------------------------------------------------
   Objections — lifted from the playbook's sales conversation
   ------------------------------------------------------------------ */

export const faqs = [
  {
    q: "Do I really need a website? I get by fine.",
    a: "You might well do. But when someone new asks their mates for a recommendation, the next thing they do is Google you — and if there's nothing there, they scroll to whoever is. A website doesn't replace word of mouth, it catches the people word of mouth sends who then want to check you're real.",
  },
  {
    q: "Isn't this expensive?",
    a: "It's about the price of two haircuts a month, and on Growth and Pro there's nothing to pay upfront at all. If it brings you one extra customer a week it has paid for itself several times over. If money's tight, Starter is £99 and does the essential job.",
  },
  {
    q: "I haven't got time for this.",
    a: "That is exactly the point of paying someone. I need about ten minutes of your time at the start for your details and photos, and then a look at the draft before it goes live. After that you do nothing — you carry on working and I keep the site running.",
  },
  {
    q: "We're fine with our Facebook page.",
    a: "Facebook is genuinely useful and I'm not going to tell you to drop it. But you don't own it, it can change the rules whenever it likes, and it doesn't put you on Google Maps. A website works alongside your page and catches the people who will never find you on Facebook.",
  },
  {
    q: "We had a website before and it did nothing.",
    a: "Usually because nobody touched it after it went live. Prices went out of date, the hours were wrong, and Google stopped bothering with it. The monthly fee here exists specifically so that doesn't happen — the site stays current because keeping it current is my job.",
  },
  {
    q: "Is the website really free?",
    a: "On Growth and Pro, yes — the build costs you nothing if you stay on the plan for twelve months. If you leave early, the waived build fee becomes payable, which is the only thing that makes the offer possible. On Starter there's usually a small one-off fee instead, and a bigger-than-usual build may carry one too. You'll always be told the number before you agree.",
  },
  {
    q: "What happens if I want to leave?",
    a: "After your twelve months you're month to month — give me a month's notice and that's that. Your domain is in your name and goes with you. I'll help move the site somewhere else if you want it.",
  },
  {
    q: "Do you only work with businesses near Wideopen?",
    a: "That's where most of my clients are and where I can walk in and see you. But everything here works perfectly well over the phone and email, so if you're elsewhere in the UK do get in touch — you'll just get fewer visits and more video calls.",
  },
];

/* ------------------------------------------------------------------
   Illustrative search-gap demo.
   Invented generic names — clearly a demonstration, not real listings.
   ------------------------------------------------------------------ */

export const searchDemo = {
  query: "barbers near me",
  results: [
    { name: "The Cutting Room", rating: "4.8", reviews: "126", hasSite: true },
    { name: "Fade & Co.", rating: "4.7", reviews: "94", hasSite: true },
    { name: "Kings Barbershop", rating: "4.6", reviews: "71", hasSite: true },
  ],
  you: { name: "Your business", rating: "—", reviews: "no website" },
};

/* ------------------------------------------------------------------
   Inquiry form options
   ------------------------------------------------------------------ */

export const tradeOptions = [
  "Barber or hair salon",
  "Beauty, nails or tattoo",
  "Takeaway or restaurant",
  "Café or bakery",
  "Shop or market stall",
  "Trade or garage",
  "Something else",
];

export const currentSituation = [
  "Nothing online at all",
  "Just a Facebook or Instagram page",
  "An old website that needs replacing",
  "A website nobody has looked after in years",
];

export const planInterest = [
  "Starter — £99/month",
  "Growth — £199/month",
  "Pro — £299/month",
  "Not sure yet — tell me what fits",
];
