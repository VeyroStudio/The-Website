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
};

export default nextConfig;
