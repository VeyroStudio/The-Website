/**
 * Renders the logo SVGs to PNG.
 *
 * SVGs are the masters and should be used wherever they are accepted.
 * These exist for the places that refuse them: some printers, sign
 * writers, older social platforms, Word and PowerPoint.
 *
 * Backgrounds are transparent, except the app icon, favicon and avatar,
 * which carry their own navy tile by design.
 *
 *   node generate-png.mjs
 *
 * sharp is resolved from the website's node_modules, so there is nothing
 * extra to install.
 */

import { mkdir, readFile, readdir, stat, rm } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "logo");
const OUT = join(HERE, "logo-png");

const require = createRequire(join(HERE, "..", "veyro-site", "package.json"));
let sharp;
try {
  sharp = require("sharp");
} catch {
  console.error(
    "Could not load sharp. Run `npm install` in ../veyro-site first."
  );
  process.exit(1);
}

/* Widths per file. Wide logos get pixel widths; square marks and icons
   get square sizes. */
const PLAN = {
  "veyro-lockup-on-light": [500, 1000, 2000],
  "veyro-lockup-on-dark": [500, 1000, 2000],
  "veyro-lockup-mono-black": [1000, 2000],
  "veyro-lockup-mono-white": [1000, 2000],
  "veyro-stacked-on-light": [800, 1600],
  "veyro-stacked-on-dark": [800, 1600],
  "veyro-wordmark-on-light": [1000, 2000],
  "veyro-wordmark-on-dark": [1000, 2000],
  "veyro-mark-on-light": [512, 1024],
  "veyro-mark-on-dark": [512, 1024],
  "veyro-mark-mono-black": [512, 1024],
  "veyro-mark-mono-white": [512, 1024],
  "veyro-app-icon": [180, 512, 1024],
  "veyro-favicon": [16, 32, 48, 192],
  "veyro-avatar-round": [400, 800],
};

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

const files = (await readdir(SRC)).filter((f) => f.endsWith(".svg"));
let made = 0;
let bytes = 0;

for (const file of files) {
  const name = file.replace(/\.svg$/, "");
  const widths = PLAN[name];
  if (!widths) {
    console.log(`skipped ${name} (no size plan)`);
    continue;
  }

  const svg = await readFile(join(SRC, file));

  for (const w of widths) {
    const out = join(OUT, `${name}-${w}.png`);

    /* Rasterise the vector AT the target size rather than rendering
       small and scaling up — otherwise the diagonals in the mark come
       out visibly stepped. */
    await sharp(svg, { density: 600 })
      .resize({ width: w, fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png({ compressionLevel: 9 })
      .toFile(out);

    bytes += (await stat(out)).size;
    made++;
  }
  console.log(`${name.padEnd(28)} -> ${widths.join(", ")}`);
}

console.log(`\n${made} PNGs written to brand/logo-png/ (${Math.round(bytes / 1024)}kB total)`);
