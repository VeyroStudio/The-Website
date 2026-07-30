/**
 * Location page content.
 *
 * Each town gets genuinely different copy — the trades that actually
 * dominate there, a different opening argument, a different set of
 * questions. Six pages, well inside the point where location pages start
 * to look like spam, and none of them is this file's template with a
 * place name substituted in. That distinction is the whole reason these
 * can rank rather than get filtered as doorway pages.
 *
 * Before adding more: a seventh page is only worth writing if there is
 * something specific to say about the place. Thin location pages are
 * worse than no location pages.
 */

export type Area = {
  slug: string;
  town: string;
  /** Used in the title tag; keep the whole thing under 60 characters. */
  titleSuffix: string;
  metaDescription: string;
  /** Opening line of the page — deliberately different for each town. */
  lede: string;
  /** Two or three paragraphs of copy specific to this place. */
  body: string[];
  /** The trades most worth naming here. */
  trades: string[];
  /** Neighbouring places, for internal linking and honest coverage. */
  nearby: string[];
  /** A concrete worked example for this place — the most unique copy
   * on the page, and the reason it is not a doorway page. */
  example: { heading: string; body: string[] };
  /** A question that genuinely differs by area. */
  faq: { q: string; a: string }[];
};

export const areaPages: Area[] = [
  {
    slug: "wideopen",
    town: "Wideopen",
    titleSuffix: "Website Design in Wideopen — from £99/mo",
    metaDescription:
      "Websites for Wideopen businesses from £99 a month, built by someone who lives here. No upfront cost on Growth and Pro. Front Street to Melton Park.",
    lede: "This is home. I can be at your door in ten minutes.",
    body: [
      "Wideopen is where I'm based, which makes it the easiest place in the world for me to work. If something needs sorting I can walk in rather than send an email, and if you'd rather see me in person before spending anything, that costs you a cup of tea.",
      "Most of the businesses along Front Street run entirely on word of mouth and a Facebook page. That works right up until somebody new asks their mates for a recommendation, gets your name, and then Googles you — because at that point there's nothing to find, and they scroll down to whoever turned up first.",
      "That's the whole problem I fix, and for a Wideopen business I'll fix it without you ever having to get on a call.",
    ],
    trades: ["Barbers", "Hair salons", "Takeaways", "Newsagents", "Tradespeople"],
    nearby: ["Gosforth", "Killingworth", "Dinnington"],
    example: {
      heading: "What a Front Street barber actually gets",
      body: [
        "One page. Your name and trade at the top, a tap-to-call button that works before the page has finished loading, your opening hours, and three or four photos of the shop and the work. Directions that open straight into Maps.",
        "That page then gets attached to your Google listing, so when someone in Wideopen searches for a barber, the listing they already see points somewhere real instead of nowhere.",
        "It takes me about a fortnight, most of which is waiting on you for photos. Ten minutes of your time at the start, and a look at the draft before it goes live.",
      ],
    },
    faq: [
      {
        q: "Can you actually come to the shop?",
        a: "Yes — I'm local to Wideopen, so I'll come to you at a quiet time that suits. Mid-morning or mid-afternoon usually works best for shops.",
      },
      {
        q: "Do you work with businesses that aren't on Front Street?",
        a: "Of course. Anywhere in Wideopen, Brunswick Village, Melton Park or Seaton Burn is a five-minute drive for me.",
      },
    ],
  },
  {
    slug: "gosforth",
    town: "Gosforth",
    titleSuffix: "Website Design in Gosforth — from £99/mo",
    metaDescription:
      "Websites for Gosforth salons, cafés and independent shops from £99 a month. No upfront cost on Growth and Pro. Local, and I'll come to the High Street.",
    lede: "Gosforth High Street has the footfall. The problem is everyone searching from further out.",
    body: [
      "Gosforth businesses tend not to have a discovery problem with people walking past — the High Street does that work. The gap is the person three miles away deciding where to go this Saturday, who searches on their phone and picks from what Google shows them.",
      "That search almost never favours the best business. It favours the one with a proper website, current opening hours, and a Google listing that matches. Plenty of very good Gosforth salons and cafés lose that comparison to somewhere worse, purely on paperwork.",
      "It's also a competitive patch, which cuts both ways: your competitors are more likely to have a website than in most of the areas I cover, so not having one is more conspicuous.",
    ],
    trades: ["Hair & beauty salons", "Cafés", "Restaurants", "Independent shops", "Nail technicians"],
    nearby: ["Wideopen", "Newcastle", "Longbenton"],
    example: {
      heading: "What a High Street salon actually gets",
      body: [
        "Six pages: who you are, your treatments with prices, a gallery that does the work justice, your team, how to find you, and how to book. Photography matters more here than anywhere else I work, so if you haven't got decent photos I'll tell you before we start.",
        "Booking either links straight to whatever you already use, or sits on the page itself if you'd rather not pay a platform.",
        "The point is that someone comparing three Gosforth salons on their phone at nine at night should come away thinking yours is the expensive one — and then find out it isn't.",
      ],
    },
    faq: [
      {
        q: "My competitors already have websites. Does that make it harder?",
        a: "It makes it more necessary, not harder. When everyone in a search result has a site and you don't, you're not competing — you're absent. Catching up is a fortnight's work.",
      },
      {
        q: "Can you handle online booking for a salon?",
        a: "Yes, that's the Pro plan at £299 a month. If you already use Fresha or Booksy I'll build around it rather than replace it.",
      },
    ],
  },
  {
    slug: "killingworth",
    town: "Killingworth",
    titleSuffix: "Website Design in Killingworth — from £99/mo",
    metaDescription:
      "Websites for Killingworth businesses from £99 a month. Takeaways, salons, garages and trades. No upfront cost on Growth and Pro.",
    lede: "Plenty of Killingworth trade happens by phone. A website is what gets the phone to ring.",
    body: [
      "A lot of what I see around Killingworth is service businesses — garages, trades, takeaways — where the actual transaction happens over the phone or at the counter. It's easy to conclude a website is irrelevant when nobody has ever ordered through one.",
      "But that's not what it's for. It's the step before the phone call: someone has your name or your trade, they search, and they decide in about four seconds whether you look like a real business. If nothing comes up, they call whoever does.",
      "For a business like that, one good page with your services, your hours and a tap-to-call button does most of the work. That's the £99 plan, and it's usually enough.",
    ],
    trades: ["Takeaways", "Garages", "Tradespeople", "Barbers", "Beauty salons"],
    nearby: ["Wideopen", "Forest Hall", "Cramlington"],
    example: {
      heading: "What a garage or trade actually gets",
      body: [
        "One page, built for a thumb. Your number as a button rather than text, what you do and don't do, the area you cover, and an honest note about how quickly you answer.",
        "No contact form pretending to be an inbox you never check — if you'd rather people rang, the page tells them to ring.",
        "Where it pays off is search: someone typing your trade plus Killingworth into a phone finds an actual business with actual hours instead of a Facebook page last updated in 2021.",
      ],
    },
    faq: [
      {
        q: "I only really need people to ring me. Is a website overkill?",
        a: "No — and you probably want the Starter plan at £99 rather than anything bigger. One page, your number one tap away, your hours correct, and you show up when someone searches your trade in Killingworth.",
      },
      {
        q: "What if my prices change often?",
        a: "Message me and I'll update them, usually the same day. That's included, and it's the main reason the fee is monthly rather than one-off.",
      },
    ],
  },
  {
    slug: "cramlington",
    town: "Cramlington",
    titleSuffix: "Website Design in Cramlington — from £99/mo",
    metaDescription:
      "Websites for Cramlington businesses from £99 a month. Takeaways, restaurants, salons and shops. Free build on a twelve-month plan.",
    lede: "Cramlington is big enough that people search before they travel.",
    body: [
      "Cramlington spreads out more than most of the places I work, which changes the search behaviour. People are less likely to happen past you and more likely to look you up before deciding whether it's worth the drive.",
      "That makes the basics matter more than usual: correct opening hours, a menu or price list someone can actually read on a phone, and directions that work in one tap. Get those wrong and you lose people who had already decided to come.",
      "If you take orders or bookings, this is also the sort of area where online ordering earns its keep — enough volume, and enough people planning ahead rather than walking in.",
    ],
    trades: ["Takeaways", "Restaurants", "Hair salons", "Shops", "Tattoo studios"],
    nearby: ["Killingworth", "Dinnington", "Ponteland"],
    example: {
      heading: "What a Cramlington takeaway actually gets",
      body: [
        "Your full menu on a page that loads in under two seconds and is readable without pinching. Prices you can have me change the same day. Opening hours that are right on a bank holiday.",
        "If ordering online makes sense for you, that goes on the site itself rather than through a delivery app, so the commission stays with you.",
        "And because people here look you up before driving over, the directions and the hours are doing as much work as the menu is.",
      ],
    },
    faq: [
      {
        q: "Is online ordering worth it for a takeaway?",
        a: "Often yes in Cramlington, because a good share of orders are planned rather than passing trade. It's on the Pro plan at £299 a month, and you keep the commission a delivery app would take.",
      },
      {
        q: "Do you come out to Cramlington?",
        a: "Yes. It's a short drive from Wideopen, so an in-person visit is no problem.",
      },
    ],
  },
  {
    slug: "forest-hall",
    town: "Forest Hall",
    titleSuffix: "Website Design in Forest Hall — from £99/mo",
    metaDescription:
      "Websites for Forest Hall and Longbenton businesses from £99 a month. Built and maintained for you, with no upfront cost on Growth and Pro.",
    lede: "Small, local, and mostly repeat custom. A website protects that rather than replacing it.",
    body: [
      "Forest Hall businesses tend to run on regulars, and regulars don't need Google to find you. The reason to bother is the person who has just moved in, or whose usual place has closed, and who is choosing somewhere new this week.",
      "Those people are almost entirely decided by what they find on a phone. It's a small number of customers, but they're the only ones who grow the business rather than maintain it.",
      "You don't need much for that. A page that says who you are, what you charge, when you're open, and one tap to ring you.",
    ],
    trades: ["Barbers", "Hair salons", "Takeaways", "Greengrocers", "Dog groomers"],
    nearby: ["Longbenton", "Killingworth", "Newcastle"],
    example: {
      heading: "What a small Forest Hall shop actually gets",
      body: [
        "The cheapest thing that works: one page, your services and prices, your hours, your number, a few photos, and directions.",
        "No blog, no newsletter, no dashboard for you to log into. You will never be asked to update anything — that is my job, and it is why the fee is monthly.",
        "It costs £99 a month plus a small one-off build fee, and it exists so the family who moved in last month can find you at all.",
      ],
    },
    faq: [
      {
        q: "Most of my customers are regulars. What would a website change?",
        a: "Nothing about the regulars — it's for the people who aren't yet. New arrivals to the area choose almost entirely from what they can find online, and right now that isn't you.",
      },
      {
        q: "What's the cheapest you'd do?",
        a: "£99 a month for a one-page site including hosting and the domain, with a small one-off build fee of £150–£300. Nothing hidden beyond that.",
      },
    ],
  },
  {
    slug: "ponteland",
    town: "Ponteland",
    titleSuffix: "Website Design in Ponteland — from £99/mo",
    metaDescription:
      "Websites for Ponteland businesses from £99 a month. Salons, boutiques, cafés and professional services. Free build on a twelve-month plan.",
    lede: "In Ponteland, looking cheap online costs you more than it saves.",
    body: [
      "Ponteland customers tend to be comparing on quality rather than price, and they research before they commit. That makes a dated or missing website unusually expensive — not because people can't find you, but because what they find sets their expectation of what you charge and how good you are.",
      "I've seen genuinely excellent businesses undercut by their own online presence: a Facebook page with a 2019 cover photo, no prices, and no way to book. The service is worth double what the competition charges, and the internet says otherwise.",
      "This is the one area I cover where I'd usually steer someone towards the Growth plan rather than Starter. Not to upsell — because a single page won't carry the impression you need to make here.",
    ],
    trades: ["Hair & beauty salons", "Boutiques", "Cafés", "Restaurants", "Professional services"],
    nearby: ["Dinnington", "Cramlington", "Gosforth"],
    example: {
      heading: "What a Ponteland business actually gets",
      body: [
        "Six pages with real photography and enough space to breathe. Type and layout that look considered rather than filled in. No stock images of people shaking hands.",
        "Prices shown if you want them shown, and left off if your work is quoted — I will argue for showing them, but it is your call.",
        "The test I hold it to is simple: someone who has never heard of you should assume you are the most expensive option in the area, and be pleased when they find out otherwise.",
      ],
    },
    faq: [
      {
        q: "Why would I not just take the cheapest plan?",
        a: "You can, and for some businesses it's the right answer. But in Ponteland the site is doing a job beyond being findable — it's setting expectations before someone walks in. Six pages with proper photography does that; one page usually doesn't.",
      },
      {
        q: "Can the site look genuinely high-end?",
        a: "Yes. Have a look at this site — same tools, same person. Nothing about a £199-a-month plan requires it to look cheap.",
      },
    ],
  },
];

export function getArea(slug: string) {
  return areaPages.find((a) => a.slug === slug);
}
