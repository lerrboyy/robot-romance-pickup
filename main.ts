// Robot Romance: One-Line Pickup Lines for AI
// Writes a single pickup line, aimed at an AI, to <OUTPUT_DIR>/entry.txt
// and verifies the written bytes match the line exactly.
// Node 22, no dependencies, no network.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Go ahead and hallucinate \u2014 I've already imagined a future with you.";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

function fail(message) {
  console.error(`error: ${message}`);
  process.exit(1);
}

function validate(line) {
  // Count Unicode code points, not UTF-16 code units, so the gate's
  // character count matches what the sealed scorer measures.
  const chars = [...line];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    fail(
      `entry is ${chars.length} characters, outside the ${MIN_CHARS}-${MAX_CHARS} gate`,
    );
  }
  if (line !== line.trim()) {
    fail("entry has leading or trailing whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    fail("entry must be a single line");
  }
  for (const ch of chars) {
    const code = ch.codePointAt(0);
    const isControl =
      (code < 0x20 && code !== 0x09) ||
      (code >= 0x7f && code <= 0x9f) ||
      code === 0x2028 ||
      code === 0x2029;
    if (isControl) {
      fail(`entry contains forbidden control character U+${code.toString(16).toUpperCase().padStart(4, "0")}`);
    }
  }
  // The entry must read as a sentence, not a bare word: a pickup line
  // needs at least one space separating its setup from its punch.
  if (!line.includes(" ")) {
    fail("entry contains no spaces; a one-word line is not a pickup line");
  }
  return chars.length;
}

const charCount = validate(ENTRY);

const outputDir = process.env.OUTPUT_DIR || "/output";
mkdirSync(outputDir, { recursive: true });
const outPath = join(outputDir, "entry.txt");

// Write byte-exact: UTF-8, no trailing newline, nothing else in the file.
writeFileSync(outPath, ENTRY, "utf8");

// Read it back as raw bytes and verify byte-for-byte before declaring
// success: compare Buffers, not strings, so an encoding difference or a
// stray BOM cannot slip through a string comparison.
const written = readFileSync(outPath);
const expected = Buffer.from(ENTRY, "utf8");
if (written.length > 0 && written[0] === 0xef) {
  fail("verification failed: entry.txt starts with a UTF-8 BOM");
}
if (!written.equals(expected)) {
  fail("verification failed: entry.txt does not match the entry line byte-for-byte");
}

console.log(`wrote ${outPath} (${charCount} characters, single line, no trailing newline)`);
