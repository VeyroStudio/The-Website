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
  title: {
    default: `${site.name} — ${site.tagline} in ${site.baseTown} & the North East`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
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
