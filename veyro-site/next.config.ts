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
  /**
   * Send www to the bare domain.
   *
   * Both hostnames were serving the site with a 200, which splits any
   * link equity the domain earns across two addresses. The canonical
   * tags already point at the bare domain so Google would probably
   * consolidate them anyway — this makes it certain.
   *
   * Done here rather than in hPanel's redirect form because that writes
   * an .htaccess for Apache serving public_html, and this site is served
   * by the Node app behind a proxy, so it would never be consulted.
   */
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.veyrostudio.co.uk" }],
        destination: "https://veyrostudio.co.uk/:path*",
        /* `statusCode: 301` rather than `permanent: true`, which emits a
           308. Google treats the two identically, but 301 is what every
           SEO tool and every person reading a header expects to see. */
        statusCode: 301,
      },
    ];
  },

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
      {
        /* Demo previews for prospects: never indexed, at the HTTP level
           so it holds even for the raw images under the demo pages. The
           meta robots tag and robots.txt disallow are the other two
           layers. */
        source: "/demo/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow, noarchive, nosnippet",
          },
        ],
      },
      {
        /* Security headers. Not ranking factors, but this site sells web
           development — it should not fail a prospective client's own
           security scan. No Content-Security-Policy here: Next emits
           inline scripts for hydration, and a CSP written without
           checking those against every page white-screens the site. */
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
