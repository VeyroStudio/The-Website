/**
 * Assembles the standalone build into an uploadable folder + zip.
 *
 * `next build` with output: "standalone" leaves two pieces outside the
 * standalone folder — the static chunks and /public — because it cannot
 * know whether you serve them from a CDN. For Hostinger they belong
 * inside, so this copies them in and zips the result.
 *
 *   npm run package
 *
 * Produces  deploy-build/          (upload the CONTENTS of this)
 *           veyro-deploy.zip       (same thing, zipped)
 */

import { cp, mkdir, rm, readdir, stat } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const run = promisify(execFile);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STANDALONE = join(ROOT, ".next", "standalone");
const OUT = join(ROOT, "deploy-build");
const ZIP = join(ROOT, "veyro-deploy.zip");

try {
  await stat(STANDALONE);
} catch {
  console.error(
    "No .next/standalone found — run `npm run build` first.\n" +
      "(It only appears when next.config.ts sets output: \"standalone\".)"
  );
  process.exit(1);
}

await rm(OUT, { recursive: true, force: true });
await rm(ZIP, { force: true });
await mkdir(OUT, { recursive: true });

/* 1. the standalone server, its package.json and trimmed node_modules */
await cp(STANDALONE, OUT, { recursive: true });

/* 2. the hashed client chunks — without these every page 404s its JS */
await cp(join(ROOT, ".next", "static"), join(OUT, ".next", "static"), {
  recursive: true,
});

/* 3. /public — photographs, icons, robots.txt */
await cp(join(ROOT, "public"), join(OUT, "public"), { recursive: true });

const top = (await readdir(OUT)).sort();
console.log(`Assembled deploy-build/ containing: ${top.join(", ")}`);

/* Zip it.
 *
 * NOT with PowerShell's Compress-Archive: it writes Windows backslashes
 * as the path separator inside the archive, which the ZIP spec forbids.
 * Windows opens those happily, so the file looks fine locally — then
 * Hostinger's Linux file manager refuses to extract it. That cost an
 * afternoon once; don't reintroduce it.
 *
 * bsdtar ships with Windows 10+ as System32\tar.exe and writes correct
 * forward-slash paths. Falls back to `zip` on Linux/macOS.
 */
const zippers = [
  { cmd: "C:\\Windows\\System32\\tar.exe", args: ["-a", "-c", "-f", ZIP, "-C", OUT, "."] },
  { cmd: "tar", args: ["-a", "-c", "-f", ZIP, "-C", OUT, "."] },
  { cmd: "zip", args: ["-qr", ZIP, "."], opts: { cwd: OUT } },
];

let zipped = false;
for (const { cmd, args, opts } of zippers) {
  try {
    await run(cmd, args, opts);
    const { size } = await stat(ZIP);
    zipped = true;
    console.log(
      `Wrote veyro-deploy.zip (${(size / 1024 / 1024).toFixed(1)} MB) using ${cmd}`
    );
    break;
  } catch {
    /* try the next one */
  }
}

if (!zipped) {
  console.log("Could not zip automatically — upload deploy-build/ as-is.");
}

console.log(
  "\nUpload the CONTENTS of deploy-build/ into the server's nodejs/ folder,\n" +
    "replacing .next, public, node_modules, server.js and package.json.\n" +
    "Then restart the Node app in hPanel."
);
