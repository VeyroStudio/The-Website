import type { MetadataRoute } from "next";
import { areaPages } from "@/lib/areas";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const core: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "monthly", priority: 1 },
    {
      url: `${site.url}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/what-you-get`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${site.url}/about`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${site.url}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.9,
    },
  ];

  /* Location pages. Priority 0.8 — these are the pages meant to catch
     "website design <town>" searches, so they matter more than About. */
  const areas: MetadataRoute.Sitemap = areaPages.map((a) => ({
    url: `${site.url}/website-design/${a.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...core, ...areas];
}
