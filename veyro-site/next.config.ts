import type { NextConfig } from "next";

/**
 * Deployed to Hostinger as a standalone build.
 *
 * `output: "standalone"` makes `next build` emit a self-contained app
 * at `.next/standalone/` — a `server.js`, a minimal `package.json` and
 * only the `node_modules` actually reached at runtime. That is the
 * layout already sitting in the `nodejs/` folder on the server, and it
 * is a fraction of the size of uploading the whole project.
 *
 * Two directories are NOT copied in automatically and have to be moved
 * into the standalone folder after building:
 *
 *   .next/static  ->  .next/standalone/.next/static
 *   public        ->  .next/standalone/public
 *
 * `npm run package` does that and zips the result.
 */
const nextConfig: NextConfig = {
  output: "standalone",

  /**
   * Cache headers, because the defaults break this deployment.
   *
   * Next sends `Cache-Control: s-maxage=31536000` on prerendered pages —
   * it tells any CDN in front to keep the HTML for a YEAR. Hostinger's
   * CDN (`Server: hcdn`) obeys. The result after a deploy is that
   * visitors are served year-old HTML referencing hashed asset
   * filenames that the new build no longer contains, so the stylesheet
   * 404s and the site renders completely unstyled. That is exactly what
   * happened here.
   *
   * The rule below caps HTML at a one-minute shared cache with
   * stale-while-revalidate, so a deploy is picked up within a minute
   * instead of never. Hashed assets under /_next/static keep the long
   * immutable cache — their names change on every build, so they can
   * never go stale.
   */
  async headers() {
    return [
      {
        /* Everything except the hashed asset paths. */
        source: "/:path((?!_next/static/).*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, s-maxage=60, stale-while-revalidate=300",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
