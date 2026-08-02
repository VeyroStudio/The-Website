import type { Metadata } from "next";
import {
  Abril_Fatface,
  Fraunces,
  Karla,
  Lexend,
  Merriweather,
  Source_Sans_3,
} from "next/font/google";
import RevealRoot from "@/components/RevealRoot";
import "./demo.css";

/**
 * Demo-site shell. Deliberately carries NONE of VEYRO's chrome — no
 * nav, no footer, no grain — because a demo is shown to a prospect as
 * a preview of THEIR site, and it has to feel like theirs.
 *
 * Font pairings come from the ui-ux-pro-max design systems, one per
 * trade:
 *   barber  Abril Fatface + Merriweather   (vintage, dramatic)
 *   garage  Lexend + Source Sans 3         (trustworthy, legible)
 *   pizza   Fraunces + Karla               (culinary, premium, fire-lit dark)
 *
 * All declared with preload:false — six families would otherwise be
 * preloaded on every demo page, when each page only renders two. With
 * preload off, the browser fetches only the families the current
 * demo's CSS variables actually resolve to.
 */

const abril = Abril_Fatface({
  variable: "--font-demo-abril",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const merri = Merriweather({
  variable: "--font-demo-merri",
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const lexend = Lexend({
  variable: "--font-demo-lexend",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const source = Source_Sans_3({
  variable: "--font-demo-source",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const fraunces = Fraunces({
  variable: "--font-demo-fraunces",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const karla = Karla({
  variable: "--font-demo-karla",
  subsets: ["latin"],
  display: "swap",
  preload: false,
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
    <div
      className={`${abril.variable} ${merri.variable} ${lexend.variable} ${source.variable} ${fraunces.variable} ${karla.variable}`}
    >
      <RevealRoot />
      {children}
    </div>
  );
}
