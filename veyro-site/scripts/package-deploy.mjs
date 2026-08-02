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

/* The server is Linux but this build machine is Windows. npm only keeps
 * the current platform's sharp binaries, and a bundle shipped without
 * the linux ones makes Next silently fall back to serving unoptimised
 * originals — no error, just a slower site. Ensure both exist before
 * packaging; the linux pair prunes nothing when force-added directly. */
try {
  await stat(join(ROOT, "node_modules", "@img", "sharp-linux-x64"));
} catch {
  console.log("linux sharp binaries missing — installing…");
  await run("npm", ["install", "--no-save", "--force", "@img/sharp-linux-x64", "@img/sharp-libvips-linux-x64"], { cwd: ROOT, shell: true });
}

await rm(OUT, { recursive: true, force: true });
await rm(ZIP, { force: true });
await mkdir(OUT, { recursive: true });

/* 1. the standalone server, its package.json and trimmed node_modules */
await cp(STANDALONE, OUT, { recursive: true });

/* 1b. sharp, wholesale. Next's output tracing copies the .node file but
 * not every DLL it links against, and it never copies binaries for a
 * platform other than the build machine's. Either gap makes sharp fail
 * to load on the server, and Next then serves unoptimised originals
 * with no error. Copy the real installs over the traced stubs. */
await rm(join(OUT, "node_modules", "sharp"), { recursive: true, force: true });
await rm(join(OUT, "node_modules", "@img"), { recursive: true, force: true });
await cp(join(ROOT, "node_modules", "sharp"), join(OUT, "node_modules", "sharp"), { recursive: true });
await cp(join(ROOT, "node_modules", "@img"), join(OUT, "node_modules", "@img"), { recursive: true });

/* 2. the hashed client chunks — without these every page 404s its JS */
await cp(join(ROOT, ".next", "static"), join(OUT, ".next", "static"), {
  recursive: true,
});

/* 3. /public — photographs, icons, robots.txt */
await cp(join(ROOT, "public"), join(OUT, "public"), { recursive: true });

console.log(`Assembled deploy-build/ containing: ${(await readdir(OUT)).sort().join(", ")}`);

/* Zip it. Two traps here, both of which produce an archive that looks
 * fine until someone tries to use it:
 *
 * 1. NOT PowerShell's Compress-Archive. It writes Windows backslashes as
 *    the path separator inside the archive, which the ZIP spec forbids.
 *    Windows opens those happily; Hostinger's Linux file manager refuses
 *    to extract them.
 *
 * 2. Archive the entries BY NAME, never as ".". Passing "." makes bsdtar
 *    prefix every path with "./", and Windows Explorer then shows the
 *    archive as completely empty — no error, just nothing.
 *
 * bsdtar ships with Windows 10+ as System32\tar.exe and writes correct
 * forward-slash paths. Falls back to `zip` on Linux and macOS.
 */
const entries = (await readdir(OUT)).sort();

const zippers = [
  {
    cmd: "C:\\Windows\\System32\\tar.exe",
    args: ["-a", "-c", "-f", ZIP, "-C", OUT, ...entries],
  },
  { cmd: "tar", args: ["-a", "-c", "-f", ZIP, "-C", OUT, ...entries] },
  { cmd: "zip", args: ["-qr", ZIP, ...entries], opts: { cwd: OUT } },
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
