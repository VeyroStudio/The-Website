import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Public_Sans } from "next/font/google";
import "./globals.css";

import { site } from "@/lib/site";

/**
 * Root shell only: fonts, global CSS and site-wide metadata defaults.
 *
 * Everything visual — nav, footer, schema, grain — lives in the
 * (site) route-group layout, so that /demo/* can render prospect demo
 * sites with none of VEYRO's chrome around them. Keep this file free
 * of anything a demo page should not inherit.
 */

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
     truncate in results. */
  title: {
    default: "Website Design in Wideopen & Newcastle — from £99/mo",
    template: `%s — ${site.name}`,
  },
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
     no favicon at all. These paths never change. */
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
      </head>
      <body className="min-h-dvh">{children}</body>
    </html>
  );
}
