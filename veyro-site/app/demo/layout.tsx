import type { Metadata } from "next";
import { Alfa_Slab_One, Archivo_Black, Bebas_Neue, Inter } from "next/font/google";
import RevealRoot from "@/components/RevealRoot";
import "./demo.css";

/**
 * Demo-site shell. Deliberately carries NONE of VEYRO's chrome — no
 * nav, no footer, no grain, different fonts — because a demo is shown
 * to a prospect as a preview of THEIR site, and it has to feel like
 * theirs, not like a page inside ours.
 *
 * Three display fonts, one per trade: Bebas for the barber, Archivo
 * Black for the garage, Alfa Slab for the pizzeria. Each demo picks
 * one via `displayFont` in lib/demos.ts — the visible proof that the
 * demos aren't a single template with the name swapped. Only loaded
 * on /demo routes, so they cost the main site nothing.
 */

const bebas = Bebas_Neue({
  variable: "--font-demo-display",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const archivo = Archivo_Black({
  variable: "--font-demo-archivo",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const slab = Alfa_Slab_One({
  variable: "--font-demo-slab",
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
    <div
      className={`${bebas.variable} ${archivo.variable} ${slab.variable} ${bodyFont.variable}`}
    >
      <RevealRoot />
      {children}
    </div>
  );
}
