# VEYRO — website

Next.js 16 (App Router) · React 19 · Tailwind v4 · TypeScript.
Every route prerenders to static HTML, so this deploys anywhere.

```bash
npm install
npm run dev
```

Runs on http://localhost:3100.

---

## What this site is selling

Websites for local businesses — barbers, salons, takeaways, butchers — around
Wideopen, Gosforth, Killingworth and the wider North East, plus remote work
anywhere in the UK. Three monthly plans, prices on the page, build free on a
twelve-month term.

**VEYRO sells websites only.** There is deliberately no social media
management, review management or ad campaign anywhere on this site. If that
changes, the honest "what I don't do" section on `/what-you-get` has to change
with it.

---

## Before you launch — the short list

1. **Connect the form.** Copy `.env.example` to `.env.local` and add a
   Web3Forms or Formspree endpoint. Until then the form validates but
   *refuses to claim success* — deliberately, so no enquiry is silently lost.

   **Sign up with `ethan@veyrostudio.co.uk`.** Both providers deliver to
   whichever inbox the key was registered under; the address in the payload
   does not override that.
2. **Check the plan contents** in `lib/site.ts` against what you'll actually
   deliver, especially the `upfront` line on each plan.
3. **Have the privacy notice reviewed** and add your registered business
   details. It's a plain-English template, not legal advice.
4. **Social links** in `lib/site.ts` point at bare facebook.com / instagram.com.

Contact details, the domain and the plan prices are all set and live in
`lib/site.ts` — change them there and every page updates.

---

## Photography

`public/trades/` holds six Unsplash photographs of the *kinds of business*
VEYRO builds for. They are licensed for commercial use; sources are recorded
in `public/trades/CREDITS.md`.

**They are not clients.** The section they appear in says so on the page. Do
not move them into anything labelled work, projects or clients.

---

## Where things live

| Path | What's in it |
|---|---|
| `lib/site.ts` | **All copy and content.** Plans and prices, capabilities, steps, FAQs, areas, trades, form options. Edit here, not in components. |
| `app/globals.css` | Design tokens, animation system, reduced-motion rules. Single source of truth for colour, type and motion. |
| `components/PlanCards.tsx` | The three pricing cards, used on `/` and `/pricing`. |
| `components/SearchGap.tsx` | The animated "you're not in the search results" demo. |
| `components/InquiryForm.tsx` | The enquiry form — validation, honeypot, loading/success/error states. |
| `components/MobileCta.tsx` | Sticky Call / Get a quote bar on phones. |
| `components/Logo.tsx` | Mark, wordmark and lockup as vector paths. Matches `../brand/logo/*.svg` exactly. |
| `../brand/` | Logo SVGs and brand guidelines. Deliberately **not** part of the site. |

---

## Colour — the one rule

Amber (`#D9822B`) is a **background** colour. At 2.74:1 on cream it fails
contrast for text.

- Amber-coloured text and links → `text-amber-ink` (`#8F5210`, 5.81:1)
- Text on an amber button → `text-navy` (5.45:1). Never cream on amber.

Every pairing in use is measured and listed in
`../brand/brand-guidelines.html`. Re-check it if you change the palette.

---

## Adding a portfolio later

There is no work or case-study section, because there is no work to show yet —
and invented case studies would be worse than none. When you have two or three
real clients:

1. Add a `caseStudies` array to `lib/site.ts`.
2. Create `app/work/page.tsx` and `app/work/[slug]/page.tsx`.
3. Add `{ label: "Work", href: "/work" }` to the `nav` array.
4. Add the routes to `app/sitemap.ts`.

Real photos of real shops will do more for you than any layout.

---

## How the animation system works

There is no animation library. It's CSS transforms and opacity driven by one
`IntersectionObserver` — which is why it stays smooth on the cheap Android
phone half your customers are using.

- **Reveal on scroll.** Add `data-reveal` to any element. `RevealRoot` observes
  it once, adds `.is-in`, then unobserves. Stagger with `style={delay(120)}`.
- **Headline reveals.** `<SplitHeading lines={[...]} />` masks each line and
  slides it up. Lines are authored, not measured — no layout thrash, and the
  break points stay where they were art-directed.
- **Marker sweep.** `className="mark-sweep"` on a word grows an amber
  highlight behind it. One per page, on the word the headline turns on.
- **List stagger.** `className="stagger"` on a `<ul>` cascades its children.
- **Scroll-scrubbed reveals** (`.scroll-lit`, `.media-rise`, `.drift`). Native
  CSS view timelines — these *scrub with the scroll position* rather than
  firing once, which is what gives the Apple-style feel, and they run off the
  main thread. Chrome and Edge get the effect; Safari and Firefox get the
  finished state, which each one is written to stand up in.
- **Scroll progress and parallax.** Native CSS `animation-timeline`, wrapped in
  `@supports`. No scroll listeners anywhere.
- **The trades strip** runs as one continuous pass and never pauses. Under
  reduced motion it stops and wraps into a tidy centred list instead of sitting
  clipped mid-scroll.
- **Reduced motion.** Everything decorative resolves instantly to its finished
  state. Nothing becomes invisible or unusable.

An inline script adds `.js` to `<html>` before first paint, so a browser with
JavaScript disabled sees all content rather than a blank page.

---

## Accessibility

Built to WCAG 2.2 AA and verified in-browser: single `<h1>` per page, labels on
every input, 44px minimum touch targets, visible focus rings, `inert` on
collapsed panels and the closed mobile menu, no horizontal scroll at 375px, and
a text equivalent for the animated search demo.

---

## Deploying

Static output, so any host works. Vercel is one command:

```bash
npx vercel
```

Set the `NEXT_PUBLIC_*` environment variables in your host's dashboard too —
`.env.local` is git-ignored and never ships.
