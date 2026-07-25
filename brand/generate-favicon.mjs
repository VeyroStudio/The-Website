/**
 * Builds the search-facing icon assets into the website's /public.
 *
 * Why these live in /public rather than relying on Next's app/icon.svg:
 * Next fingerprints that file, serving it at a hashed URL that changes
 * on every build. Google wants a favicon at a stable, unchanging address
 * — a moving target is treated as no favicon at all, which is why none
 * was showing in search results.
 *
 * Produces:
 *   public/favicon.ico        16/32/48 — the URL crawlers probe by default
 *   public/apple-touch-icon.png  180   — iOS home screen
 *   public/logo.png           1000     — referenced as `logo` in the
 *                                        Organization structured data
 *   public/og-logo.png         512     — square logo for sharing cards
 *
 *   node generate-favicon.mjs
 */

import { mkdir, readFile, writeFile, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = join(HERE, "logo");
const PUBLIC = join(HERE, "..", "veyro-site", "public");

const require = createRequire(join(HERE, "..", "veyro-site", "package.json"));
const sharp = require("sharp");

await mkdir(PUBLIC, { recursive: true });

/* ------------------------------------------------------------------
   favicon.ico
   ICO is a directory of images. Modern decoders accept PNG payloads
   directly, so each size is rendered to PNG and indexed. Sizes must be
   48px or a multiple of it for Google to use the icon in results, so
   48 is included and is the one that matters.
   ------------------------------------------------------------------ */

const icoSizes = [16, 32, 48];
const svg = await readFile(join(SRC, "veyro-favicon.svg"));

const pngs = await Promise.all(
  icoSizes.map((s) =>
    sharp(svg, { density: 600 }).resize(s, s).png({ compressionLevel: 9 }).toBuffer()
  )
);

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0); // reserved
header.writeUInt16LE(1, 2); // 1 = icon
header.writeUInt16LE(pngs.length, 4);

let offset = 6 + pngs.length * 16;
const entries = [];

pngs.forEach((png, i) => {
  const size = icoSizes[i];
  const e = Buffer.alloc(16);
  e.writeUInt8(size >= 256 ? 0 : size, 0); // width  (0 means 256)
  e.writeUInt8(size >= 256 ? 0 : size, 1); // height
  e.writeUInt8(0, 2); // palette count
  e.writeUInt8(0, 3); // reserved
  e.writeUInt16LE(1, 4); // colour planes
  e.writeUInt16LE(32, 6); // bits per pixel
  e.writeUInt32LE(png.length, 8);
  e.writeUInt32LE(offset, 12);
  entries.push(e);
  offset += png.length;
});

await writeFile(join(PUBLIC, "favicon.ico"), Buffer.concat([header, ...entries, ...pngs]));

/* ------------------------------------------------------------------
   The rest
   ------------------------------------------------------------------ */

await sharp(await readFile(join(SRC, "veyro-app-icon.svg")), { density: 600 })
  .resize(180, 180)
  .png({ compressionLevel: 9 })
  .toFile(join(PUBLIC, "apple-touch-icon.png"));

await sharp(await readFile(join(SRC, "veyro-lockup-on-light.svg")), { density: 600 })
  .resize({ width: 1000 })
  .png({ compressionLevel: 9 })
  .toFile(join(PUBLIC, "logo.png"));

await sharp(await readFile(join(SRC, "veyro-app-icon.svg")), { density: 600 })
  .resize(512, 512)
  .png({ compressionLevel: 9 })
  .toFile(join(PUBLIC, "og-logo.png"));

for (const f of ["favicon.ico", "apple-touch-icon.png", "logo.png", "og-logo.png"]) {
  const { size } = await stat(join(PUBLIC, f));
  console.log(`  public/${f.padEnd(22)} ${Math.round(size / 1024)}kB`);
}
