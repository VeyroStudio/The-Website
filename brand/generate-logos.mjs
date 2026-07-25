/**
 * VEYRO logo asset generator.
 *
 * Every file in brand/logo/ is produced from the geometry below, so the
 * mark, the wordmark, the favicon and the website component can never
 * drift apart. Re-run after any geometry change:
 *
 *   node generate-logos.mjs
 */

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "logo");

/* ---------------------------------------------------------------- */
/* Palette                                                           */
/* ---------------------------------------------------------------- */

const INK = "#13223A";
const BONE = "#FBF7F0";
const ACCENT = "#D9822B";

/* ---------------------------------------------------------------- */
/* Geometry — mirrors components/Logo.tsx exactly                    */
/* ---------------------------------------------------------------- */

const MARK_W = 11;
const MARK_D = "M10 22 L44 76 L90 10";
const MARK_ACCENT_D = "M74.8 31.8 L90 10";

const WORD_W = 8;
const WORD_PATHS = [
  "M10 18 L36 82 L62 18",
  "M128 18 L84 18 L84 82 L128 82",
  "M84 50 L120 50",
  "M150 18 L176 48 L202 18",
  "M176 48 L176 82",
  "M224 82 L224 18 L252 18 A16 16 0 0 1 252 50 L224 50",
  "M248 50 L272 82",
];
const WORD_O = `<ellipse cx="320" cy="50" rx="28" ry="32"/>`;

const mark = (fg, accent) =>
  [
    `<path d="${MARK_D}" stroke="${fg}" stroke-width="${MARK_W}" stroke-linecap="butt" stroke-linejoin="miter"/>`,
    accent
      ? `<path d="${MARK_ACCENT_D}" stroke="${accent}" stroke-width="${MARK_W}" stroke-linecap="butt"/>`
      : "",
  ]
    .filter(Boolean)
    .join("\n    ");

const word = (fg) =>
  `<g stroke="${fg}" stroke-width="${WORD_W}" stroke-linecap="butt" stroke-linejoin="miter">
      ${WORD_PATHS.map((d) => `<path d="${d}"/>`).join("\n      ")}
      ${WORD_O}
    </g>`;

const doc = (viewBox, title, body) =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" role="img" aria-label="${title}">
  <title>${title}</title>
  ${body}
</svg>
`;

/* ---------------------------------------------------------------- */
/* Compositions                                                      */
/* ---------------------------------------------------------------- */

const lockup = (fg, accent) =>
  doc(
    "0 0 311 100",
    "VEYRO",
    `<g transform="translate(0 17.7) scale(0.7)">
    ${mark(fg, accent)}
  </g>
  <g transform="translate(88.5 19) scale(0.62)">
    ${word(fg)}
  </g>`
  );

const stacked = (fg, accent) =>
  doc(
    "0 0 358 212",
    "VEYRO",
    `<g transform="translate(129.1 8)">
    ${mark(fg, accent)}
  </g>
  <g transform="translate(0 118)">
    ${word(fg)}
  </g>`
  );

const markOnly = (fg, accent) => doc("0 0 100 100", "VEYRO", mark(fg, accent));

const wordOnly = (fg) => doc("0 0 358 100", "VEYRO", word(fg));

/** App icon / favicon — mark centred in a rounded ink tile. */
const appIcon = (bg, fg, accent, radius) =>
  doc(
    "0 0 100 100",
    "VEYRO",
    `<rect width="100" height="100" rx="${radius}" fill="${bg}"/>
  <g transform="translate(50 50) scale(0.74) translate(-50 -50)">
    ${mark(fg, accent)}
  </g>`
  );

/* ---------------------------------------------------------------- */

const files = {
  /* Primary — two-tone, amber accent on the overshoot */
  "veyro-lockup-on-dark.svg": lockup(BONE, ACCENT),
  "veyro-lockup-on-light.svg": lockup(INK, ACCENT),
  "veyro-stacked-on-dark.svg": stacked(BONE, ACCENT),
  "veyro-stacked-on-light.svg": stacked(INK, ACCENT),

  /* Mark and wordmark in isolation */
  "veyro-mark-on-dark.svg": markOnly(BONE, ACCENT),
  "veyro-mark-on-light.svg": markOnly(INK, ACCENT),
  "veyro-wordmark-on-dark.svg": wordOnly(BONE),
  "veyro-wordmark-on-light.svg": wordOnly(INK),

  /* One-colour — print, embroidery, engraving, fax-grade reproduction */
  "veyro-lockup-mono-white.svg": lockup(BONE, null),
  "veyro-lockup-mono-black.svg": lockup(INK, null),
  "veyro-mark-mono-white.svg": markOnly(BONE, null),
  "veyro-mark-mono-black.svg": markOnly(INK, null),

  /* Containers */
  "veyro-app-icon.svg": appIcon(INK, BONE, ACCENT, 20),
  "veyro-favicon.svg": appIcon(INK, BONE, ACCENT, 12),
  "veyro-avatar-round.svg": appIcon(INK, BONE, ACCENT, 50),
};

mkdirSync(OUT, { recursive: true });
for (const [name, contents] of Object.entries(files)) {
  writeFileSync(join(OUT, name), contents, "utf8");
}

console.log(`Wrote ${Object.keys(files).length} SVGs to ${OUT}`);
