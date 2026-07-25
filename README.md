# VEYRO

Websites for local businesses around Wideopen, Gosforth, Killingworth and the
wider North East — and remotely for anyone in the UK.

This repository holds both halves of the project.

| Folder | What's in it |
|---|---|
| [`veyro-site/`](veyro-site) | The website. Next.js 16, React 19, Tailwind v4, TypeScript. Every route prerenders to static HTML. |
| [`brand/`](brand) | Logo SVGs, the brand guidelines (HTML source + PDF), and the generator that produces every logo file from one geometry definition. Deliberately **not** published as part of the site. |

## Getting started

```bash
cd veyro-site && npm install && npm run dev
```

Runs on http://localhost:3100.

Each folder has its own README with the detail —
[`veyro-site/README.md`](veyro-site/README.md) covers the design tokens,
animation system and the pre-launch checklist;
[`brand/README.md`](brand/README.md) covers regenerating the logos and the PDF.

## What is not committed

`node_modules/`, the `.next/` build output, and **`.env.local`** — which holds
the form endpoint and access key. `veyro-site/.env.example` is committed as the
template to copy.
