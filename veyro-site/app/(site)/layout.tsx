import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import MobileCta from "@/components/MobileCta";
import RevealRoot from "@/components/RevealRoot";
import { areas, site } from "@/lib/site";

/**
 * Chrome for the VEYRO site itself — nav, footer, sticky mobile CTA,
 * scroll reveals, the grain overlay and the local-business schema.
 *
 * This lives in a route group so that /demo/* can exist OUTSIDE it:
 * demo sites are shown to prospects as a preview of THEIR site, and
 * VEYRO's header wrapped around a barber's homepage would ruin the
 * illusion the demo exists to create.
 */

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
  logo: {
    "@type": "ImageObject",
    url: `${site.url}/logo.png`,
    width: 1000,
    height: 322,
  },
  image: `${site.url}/og-logo.png`,
  geo: {
    "@type": "GeoCoordinates",
    latitude: 55.0442,
    longitude: -1.6206,
  },
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
     with the real profile URLs if VEYRO accounts go live. */
  founder: {
    "@type": "Person",
    name: site.owner,
    jobTitle: "Web Designer",
    worksFor: { "@type": "Organization", name: site.legalName },
  },
  currenciesAccepted: "GBP",
  paymentAccepted: "Bank transfer, Direct debit, Card",
};

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grain">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <RevealRoot />
      <Nav />
      <main id="main" className="page-in pt-[var(--nav-h)]">
        {children}
      </main>
      <Footer />
      <MobileCta />
    </div>
  );
}
