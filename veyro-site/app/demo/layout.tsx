import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import RevealRoot from "@/components/RevealRoot";
import "./demo.css";

/**
 * Demo-site shell. Deliberately carries NONE of VEYRO's chrome — no
 * nav, no footer, no grain, different fonts — because a demo is shown
 * to a prospect as a preview of THEIR site, and it has to feel like
 * theirs, not like a page inside ours.
 *
 * Only loaded on /demo routes, so these fonts cost the main site
 * nothing.
 */

const displayFont = Bebas_Neue({
  variable: "--font-demo-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const bodyFont = Inter({
  variable: "--font-demo-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  /* Belt: meta robots on every demo page. Braces: the X-Robots-Tag
     header in next.config.ts and the robots.txt disallow. A demo in
     Google's index would undercut the "private preview" pitch and
     could outrank the prospect's eventual real site. */
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function DemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={`${displayFont.variable} ${bodyFont.variable}`}>
      <RevealRoot />
      {children}
    </div>
  );
}
