/**
 * VEYRO wallpapers, desktop and phone.
 *
 * Built from the same mark and wordmark geometry as the logo files, so
 * they cannot drift from the brand.
 *
 * Composition is deliberately restrained: the mark sits at low opacity
 * so desktop icons and home-screen apps stay readable over it, while
 * the amber overshoot is kept near full strength so the accent still
 * reads. On phones the artwork sits above centre, clear of the dock and
 * the clock.
 *
 *   node generate-wallpapers.mjs
 */

import { mkdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "wallpapers");
const require = createRequire(join(HERE, "..", "veyro-site", "package.json"));
const sharp = require("sharp");

/* Brand palette — matches app/globals.css */
const NAVY = "#13223A";
const NAVY_2 = "#1D3253";
const CREAM = "#FBF7F0";
const CREAM_2 = "#F5EFE3";
const AMBER = "#D9822B";

/* Geometry, identical to components/Logo.tsx */
const MARK = "M10 22 L44 76 L90 10";
const MARK_ACCENT = "M74.8 31.8 L90 10";
const WORD = [
  "M10 18 L36 82 L62 18",
  "M128 18 L84 18 L84 82 L128 82",
  "M84 50 L120 50",
  "M150 18 L176 48 L202 18",
  "M176 48 L176 82",
  "M224 82 L224 18 L252 18 A16 16 0 0 1 252 50 L224 50",
  "M248 50 L272 82",
];

function wallpaper({ w, h, dark }) {
  const bg = dark ? NAVY : CREAM;
  const bgTo = dark ? "#0C1626" : CREAM_2;
  const ink = dark ? CREAM : NAVY;
  const markOpacity = dark ? 0.16 : 0.14;
  const wordOpacity = dark ? 0.3 : 0.26;

  const short = Math.min(w, h);
  const portrait = h > w;

  /* Mark box, then the wordmark sized off it so the pair stay in
     proportion at any canvas size. */
  const markSize = short * (portrait ? 0.42 : 0.34);
  const markX = (w - markSize) / 2;
  /* Above centre on phones: leaves the clock above and the dock below. */
  const centreY = portrait ? h * 0.42 : h * 0.46;
  const markY = centreY - markSize / 2;

  const wordW = markSize * 1.5;
  const wordH = (wordW / 358) * 100;
  const wordX = (w - wordW) / 2;
  const wordY = markY + markSize + short * 0.045;

  const markScale = markSize / 100;
  const wordScale = wordW / 358;

  /* Glow placed off-axis so the composition is not perfectly symmetrical. */
  const glowR = short * (portrait ? 0.95 : 0.75);
  const glowX = portrait ? w * 0.72 : w * 0.68;
  const glowY = portrait ? h * 0.22 : h * 0.2;

  return Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="${bg}"/>
      <stop offset="100%" stop-color="${bgTo}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="${AMBER}" stop-opacity="${dark ? 0.22 : 0.16}"/>
      <stop offset="60%" stop-color="${AMBER}" stop-opacity="${dark ? 0.06 : 0.05}"/>
      <stop offset="100%" stop-color="${AMBER}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <rect width="${w}" height="${h}" fill="url(#bg)"/>
  <ellipse cx="${glowX}" cy="${glowY}" rx="${glowR}" ry="${glowR}" fill="url(#glow)"/>

  <g transform="translate(${markX} ${markY}) scale(${markScale})" fill="none"
     stroke-linecap="butt" stroke-linejoin="miter">
    <path d="${MARK}" stroke="${ink}" stroke-opacity="${markOpacity}" stroke-width="11"/>
    <path d="${MARK_ACCENT}" stroke="${AMBER}" stroke-opacity="0.85" stroke-width="11"/>
  </g>

  <g transform="translate(${wordX} ${wordY}) scale(${wordScale})" fill="none"
     stroke="${ink}" stroke-opacity="${wordOpacity}" stroke-width="8"
     stroke-linecap="butt" stroke-linejoin="miter">
    ${WORD.map((d) => `<path d="${d}"/>`).join("\n    ")}
    <ellipse cx="320" cy="50" rx="28" ry="32"/>
  </g>

  <!-- keeps the wordmark box honest against the canvas height -->
  <rect x="0" y="${Math.round(wordY + wordH)}" width="0" height="0" fill="none"/>
</svg>`);
}

const TARGETS = [
  { name: "desktop-1920x1080", w: 1920, h: 1080 },
  { name: "desktop-2560x1440", w: 2560, h: 1440 },
  { name: "desktop-3840x2160", w: 3840, h: 2160 },
  { name: "phone-1179x2556", w: 1179, h: 2556 },
  { name: "phone-1080x2400", w: 1080, h: 2400 },
  { name: "phone-1440x3120", w: 1440, h: 3120 },
];

await mkdir(OUT, { recursive: true });

for (const t of TARGETS) {
  for (const dark of [true, false]) {
    const file = `veyro-${t.name}-${dark ? "navy" : "cream"}.png`;
    await sharp(wallpaper({ ...t, dark }))
      .png({ compressionLevel: 9 })
      .toFile(join(OUT, file));
    const { size } = await stat(join(OUT, file));
    console.log(`  ${file.padEnd(40)} ${Math.round(size / 1024)}kB`);
  }
}

console.log(`\n${TARGETS.length * 2} wallpapers written to brand/wallpapers/`);
