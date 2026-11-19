import { readFile, readdir } from "node:fs/promises";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const dataDirectory = new URL("app/src/data/", root);
const docsDirectory = new URL("docs/", root);
const files = await readdir(dataDirectory);
const stagedFiles = files.filter(name => /^staged-region-questions-batch-\d+(?:-\d+)?\.js$/u.test(name))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
const sandbox = { window: {} };
for (const filename of stagedFiles) {
  vm.runInNewContext(await readFile(new URL(filename, dataDirectory), "utf8"), sandbox, { timeout: 1000 });
}
const staged = sandbox.window.MINDQUEST_STAGED_QUESTIONS || [];
const docFiles = (await readdir(docsDirectory))
  .filter(name => /^QUESTION-LOCALIZATION-REGIONS-BATCH-\d{2}\.md$/u.test(name))
  .sort();
const errors = [];
const register = new Map();
const rowPattern = /^\|\s*((?:ES|PE)-(?:GEO|HIS|SCI|CUL)-\d{3})\s*\|([^|]+)\|([^|]+)\|\s*$/gmu;

for (const filename of docFiles) {
  const content = await readFile(new URL(filename, docsDirectory), "utf8");
  for (const match of content.matchAll(rowPattern)) {
    const [, id, claimCell, sourceCell] = match;
    const claim = claimCell.replace(/[*_]/gu, "").trim();
    const links = [...sourceCell.matchAll(/\[([^\]]+)\]\((https:\/\/[^\s)]+)\)/gu)];
    const entry = { file: filename, claim, sources: links.map(([, label, url]) => ({ label, url })) };
    if (!register.has(id)) register.set(id, []);
    register.get(id).push(entry);
  }
  if (!/native[- ]speaker review/iu.test(content)) errors.push(filename + ": native-speaker review gate must be explicitly documented.");
  if (!/answer[- ]key(?:\/distractor)? review|answer[- ]key verification|independent answer/iu.test(content)) {
    errors.push(filename + ": independent answer-key review gate must be documented.");
  }
}

const ids = staged.map(question => question.id);
if (staged.length !== 100) errors.push("Expected 100 staged IDs; found " + staged.length + ".");
if (new Set(ids).size !== ids.length) errors.push("Staged content contains duplicate IDs.");
for (const id of ids) {
  const entries = register.get(id) || [];
  if (entries.length !== 1) {
    errors.push(id + ": expected exactly one claim-level source-register row; found " + entries.length + ".");
    continue;
  }
  const entry = entries[0];
  if (entry.claim.length < 20) errors.push(id + ": source-register claim description is too short to review.");
  if (!entry.sources.length) errors.push(id + ": at least one HTTPS institutional source link is required.");
  for (const source of entry.sources) {
    if (source.label.length < 3) errors.push(id + ": source label is not descriptive enough.");
    if (!/^https:\/\//u.test(source.url)) errors.push(id + ": source URL must use HTTPS.");
  }
}
for (const id of register.keys()) if (!ids.includes(id)) errors.push(id + ": source-register row does not match a staged question.");
const html = await readFile(new URL("app/index.html", root), "utf8");
for (const filename of stagedFiles) {
  if (!html.includes(filename)) errors.push(filename + ": reviewed regional content is not included in the runtime bundle.");
}
if (!html.includes("activate-reviewed-region-bank.js")) errors.push("Guarded regional-bank activation script is not loaded.");
const signoff = await readFile(new URL("REGIONAL-BANK-RELEASE-SIGNOFF.md", docsDirectory), "utf8").catch(() => "");
if (!/human factual review:\s*complete/iu.test(signoff)) errors.push("Human factual review sign-off must be recorded as complete.");
if (!/answer-key and distractor review:\s*complete/iu.test(signoff)) errors.push("Answer-key and distractor review sign-off must be recorded as complete.");
if (!/native-speaker review for es-ES and es-PE:\s*complete/iu.test(signoff)) errors.push("Native-speaker review sign-off must be recorded as complete.");
if (!/125-combination locale matrix:\s*automated release gate/iu.test(signoff)) errors.push("The full 125-combination matrix must remain an automated release gate.");

console.log("MindQuest claim-level editorial evidence gate");
console.log("Audited " + staged.length + " staged IDs against " + docFiles.length + " batch registers and " + register.size + " claim rows.");
console.log("This is a source-register completeness audit only; it does not verify source contents, factual accuracy, answer keys, or translation quality.");
if (errors.length) {
  for (const error of errors) console.error("- " + error);
  process.exitCode = 1;
} else {
  console.log("Every regional question has one claim-level evidence row; the project-owner-recorded human reviews are complete, and the full 125-combination locale matrix remains a CI release gate.");
}
