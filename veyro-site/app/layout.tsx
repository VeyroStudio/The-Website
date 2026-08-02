import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import "./globals.css";

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealRoot from "@/components/RevealRoot";
import MobileCta from "@/components/MobileCta";
import { areas, site } from "@/lib/site";

/* Self-hosted, subset and preloaded by next/font — no render-blocking
   request to fonts.googleapis.com and no layout shift on swap. */
const display = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  display: "swap",
});

const sans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  /* Keywords first, brand last, under 60 characters so it does not
     truncate in results. The previous title spent its opening words on
     the brand name, which nobody is searching for yet. */
  title: {
    default: "Website Design in Wideopen & Newcastle — from £99/mo",
    template: `%s — ${site.name}`,
  },
  /* Capped near 155 characters; the previous one ran to 209 and was cut
     off mid-sentence in results. */
  description:
    "Websites for local businesses across Wideopen, Gosforth, Killingworth and Newcastle. From £99 a month, no big bill upfront. Built and looked after by one person.",
  applicationName: site.name,
  keywords: [
    "website design Wideopen",
    "web design Gosforth",
    "small business website North East",
    "cheap website for barbers",
    "takeaway website design Newcastle",
    "monthly website plan UK",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: { index: true, follow: true },
  /* Pointed at /public rather than the app/icon.svg convention on
     purpose. Next fingerprints app icons, serving them at a hashed URL
     that changes on every build — Google treats a favicon that moves as
     no favicon at all, which is why none appeared in search results.
     These paths never change. */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: ["/favicon.ico"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#fbf7f0",
  colorScheme: "light",
};

/* Local business schema — this is the markup that helps a "web design
   near me" search surface the business at all. */
const schema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.legalName,
  description: site.description,
  url: site.url,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress",
    addressLocality: site.baseTown,
    addressRegion: site.region,
    addressCountry: "GB",
  },
  areaServed: areas.map((a) => ({ "@type": "Place", name: a })),
  priceRange: "££",
  /* `logo` is the property Google actually reads for the logo shown
     beside search results and in the knowledge panel. Without it there
     is nothing for it to display, however good the favicon is. Must be
     an absolute URL and must stay crawlable. */
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/logo.png`,
    width: 1000,
    height: 322,
  },
  image: `${site.url}/og-logo.png`,
  /* Approximate coordinates for Wideopen. A service-area business has no
     shopfront to pin, but `geo` still helps Google associate the entity
     with the right place — which is most of local ranking. */
  geo: {
    "@type": "GeoCoordinates",
    latitude: 55.0442,
    longitude: -1.6206,
  },
  /* Radius rather than a street address, because that is what this
     actually is: someone who travels to the customer. */
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: 55.0442,
      longitude: -1.6206,
    },
    geoRadius: "25000",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "10:00",
      closes: "14:00",
    },
  ],
  /* No `sameAs`: there are no social profiles to point at. Add it back
     with the real profile URLs if VEYRO accounts go live — it ties the
     site to the same entity across platforms. */
  /* E-E-A-T: the site's whole proposition is "one identifiable local
     person", so the person needs to exist in the markup, not just the
     copy. */
  founder: {
    "@type": "Person",
    name: site.owner,
    jobTitle: "Web Designer",
    worksFor: { "@type": "Organization", name: site.legalName },
  },
  currenciesAccepted: "GBP",
  paymentAccepted: "Bank transfer, Direct debit, Card",
  knowsAbout: [
    "Website design",
    "Small business websites",
    "Google Business Profile",
    "Website hosting",
  ],
  makesOffer: [
    { "@type": "Offer", name: "Starter", price: "99", priceCurrency: "GBP" },
    { "@type": "Offer", name: "Growth", price: "199", priceCurrency: "GBP" },
    { "@type": "Offer", name: "Pro", price: "299", priceCurrency: "GBP" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${display.variable} ${sans.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks the document as animation-capable before first paint, so
            reveal styles never hide content from a browser without JS. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add('js')`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      </head>
      <body className="grain min-h-dvh">
        <RevealRoot />
        <Nav />
        <main id="main" className="page-in pt-[var(--nav-h)]">
          {children}
        </main>
        <Footer />
        <MobileCta />
      </body>
    </html>
  );
}
