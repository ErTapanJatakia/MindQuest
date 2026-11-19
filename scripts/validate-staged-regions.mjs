import { readFile, readdir } from "node:fs/promises";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const dataDirectory = new URL("app/src/data/", root);
const files = await readdir(dataDirectory);
const sandbox = { window: {} };
const canonicalSource = await readFile(new URL("questions.js", dataDirectory), "utf8");
vm.runInNewContext(canonicalSource, sandbox, { timeout: 1000 });
const canonical = sandbox.window.MINDQUEST_QUESTIONS;
const overlayFiles = files.filter((name) => /^spanish-question-translations(?:-batch-\d+)?\.js$/u.test(name))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
for (const name of overlayFiles) {
  vm.runInNewContext(await readFile(new URL(name, dataDirectory), "utf8"), sandbox, { timeout: 1000 });
}
const stagedFiles = files.filter((name) => /^staged-region-questions-batch-\d+\.js$/u.test(name))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
for (const name of stagedFiles) {
  vm.runInNewContext(await readFile(new URL(name, dataDirectory), "utf8"), sandbox, { timeout: 1000 });
}
const staged = sandbox.window.MINDQUEST_STAGED_QUESTIONS || [];
const expectedIds = [
  "ES-GEO-001","ES-GEO-002","ES-GEO-003","ES-HIS-001","ES-HIS-002","ES-HIS-003","ES-SCI-001","ES-SCI-002","ES-CUL-001","ES-CUL-002",
  "PE-GEO-001","PE-GEO-002","PE-GEO-003","PE-HIS-001","PE-HIS-002","PE-HIS-003","PE-SCI-001","PE-SCI-002","PE-CUL-001","PE-CUL-002"
];
const locales = ["en-IN","en-US","ru-RU","es-ES","es-PE"];
const categories = ["Geography","History","Science","Culture"];
const errors = [];
const expectedQuestionKeys = ["category","correct","difficulty","id","region","translations"];
const expectedTranslationKeys = ["explanation","options","question"];
const optionKeys = ["a","b","c","d"];
const clean = (value) => typeof value === "string" && value.trim().length > 0 && !/[\u0000-\u001F\u007F]/u.test(value);
const actualIds = staged.map((question) => question?.id);
if (canonical.length !== 150) errors.push(`Canonical enabled bank must remain exactly 150 questions; found ${canonical.length}`);
if (stagedFiles.length !== 1 || !stagedFiles.includes("staged-region-questions-batch-01.js")) {
  errors.push("Batch 01 must be represented by exactly its registered staged source file.");
}
if (staged.length !== expectedIds.length) errors.push(`Expected ${expectedIds.length} staged questions; found ${staged.length}`);
if (new Set(actualIds).size !== actualIds.length) errors.push("Staged bank contains duplicate stable IDs.");
for (const id of expectedIds) if (!actualIds.includes(id)) errors.push(`Missing staged question ID: ${id}`);
for (const id of actualIds) if (!expectedIds.includes(id)) errors.push(`Unregistered staged question ID: ${id}`);
const allIds = new Set(canonical.map((question) => question.id));
for (const question of staged) {
  if (!question || JSON.stringify(Object.keys(question).sort()) !== JSON.stringify(expectedQuestionKeys)) {
    errors.push(`${question?.id || "(unknown)"}: invalid question fields`);
    continue;
  }
  if (allIds.has(question.id)) errors.push(`${question.id}: staged ID collides with canonical bank`);
  allIds.add(question.id);
  if (!/^(ES|PE)-(GEO|HIS|SCI|CUL)-\d{3}$/u.test(question.id) ||
      !["ES","PE"].includes(question.region) ||
      !question.id.startsWith(question.region + "-")) errors.push(`${question.id}: invalid regional stable ID`);
  if (!categories.includes(question.category) ||
      !["easy","medium","hard"].includes(question.difficulty) ||
      !["a","b","c","d"].includes(question.correct)) errors.push(`${question.id}: invalid category, difficulty or answer key`);
  const localesFound = Object.keys(question.translations || {}).sort();
  if (JSON.stringify(localesFound) !== JSON.stringify([...locales].sort())) {
    errors.push(`${question.id}: exactly five required locales must be present`);
  }
  for (const locale of locales) {
    const translation = question.translations?.[locale];
    if (!translation || JSON.stringify(Object.keys(translation).sort()) !== JSON.stringify(expectedTranslationKeys)) {
      errors.push(`${question.id}/${locale}: translation must contain question, options and explanation only`);
      continue;
    }
    if (!clean(translation.question) || !clean(translation.explanation)) {
      errors.push(`${question.id}/${locale}: question and explanation must be non-empty clean text`);
    }
    if (!translation.options || JSON.stringify(Object.keys(translation.options).sort()) !== JSON.stringify(optionKeys)) {
      errors.push(`${question.id}/${locale}: exactly four answer options are required`);
      continue;
    }
    const values = optionKeys.map((key) => translation.options[key]);
    if (!values.every(clean) || new Set(values.map((value) => value.normalize("NFC").trim().replace(/\s+/gu," ").toLocaleLowerCase(locale))).size !== 4) {
      errors.push(`${question.id}/${locale}: options must be clean, non-empty and distinct`);
    }
  }
}
for (const region of ["ES","PE"]) {
  const regional = staged.filter((question) => question.region === region);
  if (regional.length !== 10) errors.push(`${region}: batch 01 must contain exactly 10 questions`);
  const categoryCounts = Object.fromEntries(categories.map((category) => [category, regional.filter((q) => q.category === category).length]));
  const expectedCategories = { Geography:3, History:3, Science:2, Culture:2 };
  for (const category of categories) {
    if (categoryCounts[category] !== expectedCategories[category]) errors.push(`${region}: batch 01 expected category mix 3/3/2/2; ${category} has ${categoryCounts[category]}`);
  }
  const difficultyCounts = Object.fromEntries(["easy","medium","hard"].map((level) => [level, regional.filter((q) => q.difficulty === level).length]));
  for (const [level, count] of Object.entries({easy:3,medium:4,hard:3})) {
    if (difficultyCounts[level] !== count) errors.push(`${region}: batch 01 expected ${count} ${level}; found ${difficultyCounts[level]}`);
  }
}
const promptMap = new Map();
for (const question of [...canonical, ...staged]) {
  for (const locale of locales) {
    const text = question.translations?.[locale]?.question;
    if (!clean(text)) continue;
    const key = `${question.region}/${locale}/${text.normalize("NFC").trim().replace(/\s+/gu," ").toLocaleLowerCase(locale)}`;
    if (promptMap.has(key)) errors.push(`${question.id}/${locale}: duplicate prompt also used by ${promptMap.get(key)}`);
    else promptMap.set(key, question.id);
  }
}
const appHtml = await readFile(new URL("app/index.html", root), "utf8");
if (appHtml.includes("staged-region-questions-batch-01.js")) errors.push("Staged content must not be loaded by the live application before full release gates.");
const reviewDoc = await readFile(new URL("docs/QUESTION-LOCALIZATION-REGIONS-BATCH-01.md", root), "utf8");
for (const id of expectedIds) if (!reviewDoc.includes(id)) errors.push(`${id}: missing from editorial/source register`);
console.log("MindQuest staged Spain/Peru content validation — batch 01");
console.log(`Canonical bank: ${canonical.length} enabled IDs; staged: ${staged.length} new IDs; locales per staged ID: ${locales.length}.`);
console.log("Runtime exposure: staged region content remains excluded from app selectors and gameplay.");
if (errors.length) {
  console.error("\nStaged regional validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Staged regional content structurally valid: 20 IDs, 100 localized records, five explicit locales and registered source notes.");
  console.log("Editorial status: factual source review and native-speaker review remain required before release.");
}
