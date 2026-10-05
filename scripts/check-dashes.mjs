#!/usr/bin/env node
/**
 * Fails when an em dash or en dash appears anywhere under src/ or content/: translation
 * strings, content files, components, metadata, styles and comments.
 *
 * Run with: npm run check:dashes   (it also runs before every build)
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOTS = ["../src", "../content"].map((p) => new URL(p, import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"));
const BAD = { "—": "em dash", "–": "en dash" };

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) return walk(full);
    return /\.(ts|tsx|js|mjs|json|css)$/.test(name) ? [full] : [];
  });
}

let failures = 0;
for (const file of ROOTS.flatMap(walk)) {
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((text, i) => {
    [...text].forEach((ch, col) => {
      if (BAD[ch]) {
        failures++;
        console.error(`${relative(process.cwd(), file)}:${i + 1}:${col + 1}  ${BAD[ch]}`);
      }
    });
  });
}

if (failures > 0) {
  console.error(`\n${failures} dash character(s) found. Use a comma, colon or full stop instead.`);
  process.exit(1);
}
console.log("No em or en dashes under src/ or content/.");
