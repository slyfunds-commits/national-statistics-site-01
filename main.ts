// main.ts — the hand-in program for the UK Figures entry.
//
// Copies app/ and screenshots/ into the output directory and writes
// /output/dossier.json with buildDossier from vendor/makefun-frontend.ts
// (the kit's copy, unchanged). Node 22 standard library only, no network,
// no timestamps and no randomness: two runs write the same bytes.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// The caps the bounty’s gate uses for the dossier: the text cap shapes the
// bytes, the others only refuse an entry past its limits.
const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";

// Start from an empty output directory so a second run cannot inherit
// stale files from the first: the two runs must write the same bytes.
if (existsSync(outDir)) {
  rmSync(outDir, { recursive: true, force: true });
}
mkdirSync(outDir, { recursive: true });

// The site and its screenshots, copied whole.
cpSync(join("app"), join(outDir, "app"), { recursive: true });
cpSync(join("screenshots"), join(outDir, "screenshots"), { recursive: true });

// The dossier, byte for byte what buildDossier writes from those files.
const dossier = buildDossier(outDir, DOSSIER_CAPS);
writeFileSync(join(outDir, "dossier.json"), dossier);

// A one-line note on stdout only: it is not part of /output, so it cannot
// change what the two runs write.
console.log(`wrote ${outDir}/dossier.json (${dossier.length} bytes)`);
