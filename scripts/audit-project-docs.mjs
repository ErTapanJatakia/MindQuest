import { readFile } from "node:fs/promises";

// Keep project-level status and command references synchronized with package.json.

const paths = [
  "README.md",
  "docs/ROADMAP.md",
  "docs/DEVELOPMENT-STATUS.md",
  "docs/QA-TEST-PLAN.md",
  "docs/RELEASE-READINESS-AND-MANUAL-QA.md"
];
const contents = Object.fromEntries(await Promise.all(paths.map(async path => [path, await readFile(path, "utf8")])));
const packageJson = JSON.parse(await readFile("package.json", "utf8"));
const failures = [];
const readme = contents["README.md"];

for (const name of Object.keys(packageJson.scripts ?? {})) {
  if (!readme.includes("npm run " + name)) failures.push("README command catalogue is missing npm run " + name);
}

const requiredEvidence = [
  ["docs/ROADMAP.md", "Authoritative project snapshot — 2026-11-19"],
  ["docs/ROADMAP.md", "1,135 min (18h 55m)"],
  ["docs/ROADMAP.md", "72.71%"],
  ["docs/DEVELOPMENT-STATUS.md", "Authoritative status update — 2026-11-19"],
  ["docs/DEVELOPMENT-STATUS.md", "all 25 region × question-language pairs"],
  ["docs/QA-TEST-PLAN.md", "Current automated coverage addendum — 2026-11-19"],
  ["docs/QA-TEST-PLAN.md", "320 CSS px"],
  ["docs/RELEASE-READINESS-AND-MANUAL-QA.md", "npm run audit:feature-ci-boundary"],
  ["docs/RELEASE-READINESS-AND-MANUAL-QA.md", "all 25 region × question-language pairs"]
];
for (const [path, marker] of requiredEvidence) {
  if (!contents[path].includes(marker)) failures.push(path + " is missing current evidence marker: " + marker);
}

if (!readme.includes("250 stable question IDs") || !readme.includes("1,250 localized records")) {
  failures.push("README product baseline must state the current 250-ID / 1,250-record question bank");
}
if (!readme.includes("manually triggered workflow") || !readme.includes("only after the agreed feature scope is complete")) {
  failures.push("README release policy must retain the manual, feature-complete Android validation gate");
}

if (failures.length) {
  for (const failure of failures) console.error("FAIL: " + failure);
  process.exitCode = 1;
} else {
  console.log("Project documentation audit passed: README lists every package script and roadmap, development status, QA plan and release protocol retain the current five-region baseline, CI evidence and Android release boundary.");
}
