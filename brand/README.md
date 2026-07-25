# VEYRO — brand assets

Everything here is for you, not for the website. None of it is published.

| File | What it is |
|---|---|
| `VEYRO-Brand-Guidelines.pdf` | **The guidelines as a 13-page A4 PDF.** Send this to printers, sign-writers or anyone doing work in the brand. |
| `brand-guidelines.html` | The same document as a web page. This is the source — edit here, then regenerate the PDF. |
| `logo/` | 15 logo SVGs — lockup, stacked, mark, wordmark, one-colour, app icon, favicon, round avatar, each on light and dark. |
| `generate-logos.mjs` | Regenerates every SVG in `logo/` from one shared geometry definition. |

## Regenerating the logos

```bash
node generate-logos.mjs
```

The mark, the wordmark, the favicon and the website's `Logo.tsx` component all
derive from the same paths, so they can never drift apart. Change the geometry
in one place and re-run.

## Regenerating the PDF

The PDF is printed from `brand-guidelines.html` with headless Chrome. After
editing the HTML, run:

```bash
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --no-pdf-header-footer --virtual-time-budget=20000 "--print-to-pdf=VEYRO-Brand-Guidelines.pdf" "brand-guidelines.html"
```

Run it from this folder. The print stylesheet inside the HTML handles page
breaks, forces colour printing and restores the multi-column layouts that the
screen breakpoints would otherwise drop at A4 width.

## Keeping it honest

The colour, type and motion values in the guidelines match the website's design
tokens in `../veyro-site/app/globals.css` exactly. **If you change one, change
both** — otherwise the guidelines start lying about the brand.
