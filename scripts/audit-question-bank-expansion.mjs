import { readFile, readdir } from "node:fs/promises";
import vm from "node:vm";

const dataDirectory = new URL("../app/src/data/", import.meta.url);
const source = await readFile(new URL("../app/src/data/questions.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { timeout: 1000 });
const canonicalQuestions = sandbox.window.MINDQUEST_QUESTIONS;
const dataFiles = await readdir(dataDirectory);
const translationFiles = dataFiles
  .filter((name) => /^spanish-question-translations(?:-batch-\d+)?\.js$/u.test(name))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
for (const filename of translationFiles) {
  const overlay = await readFile(new URL(filename, dataDirectory), "utf8");
  vm.runInNewContext(overlay, sandbox, { timeout: 1000 });
}
const stagedFiles = dataFiles
  .filter((name) => /^staged-region-questions-batch-\d+(?:-\d+)?\.js$/u.test(name))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
for (const filename of stagedFiles) {
  const staged = await readFile(new URL(filename, dataDirectory), "utf8");
  vm.runInNewContext(staged, sandbox, { timeout: 1000 });
}
const stagedQuestions = stagedFiles.length ? (sandbox.window.MINDQUEST_STAGED_QUESTIONS || []) : [];
const questions = [...canonicalQuestions, ...stagedQuestions];

const target = {
  regions: ["IN", "RU", "US", "ES", "PE"],
  locales: ["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"],
  perRegion: 50,
  categories: { Geography: 13, History: 12, Science: 12, Culture: 13 },
  difficulties: { easy: 15, medium: 20, hard: 15 }
};
const categoryCodes = { Geography: "GEO", History: "HIS", Science: "SCI", Culture: "CUL" };
const translationFields = ["explanation", "options", "question"];
const optionKeys = ["a", "b", "c", "d"];
const errors = [];
const ids = new Set();
const questionText = new Map();
const cleanText = (value) => typeof value === "string" && value.trim().length > 0 &&
  !/[\x00-\x1F\x7F]/u.test(value);

if (!Array.isArray(questions)) throw new Error("Question bank is not an array.");

for (const item of questions) {
  if (!item || typeof item.id !== "string") {
    errors.push("A question has no stable string ID.");
    continue;
  }
  if (ids.has(item.id)) errors.push(`Duplicate stable ID: ${item.id}`);
  ids.add(item.id);
  if (!target.regions.includes(item.region)) errors.push(`${item.id}: unsupported region ${item.region}`);
  if (!categoryCodes[item.category]) errors.push(`${item.id}: unsupported category ${item.category}`);
  if (!Object.hasOwn(target.difficulties, item.difficulty)) errors.push(`${item.id}: unsupported difficulty ${item.difficulty}`);
  const sequence = item.id.split("-").at(-1);
  if (sequence.length !== 3 || [...sequence].some((character) => character < "0" || character > "9") ||
      item.id !== `${item.region}-${categoryCodes[item.category]}-${sequence}`) {
    errors.push(`${item.id}: ID must match REGION-CATEGORY-NNN convention`);
  }
  if (!["a", "b", "c", "d"].includes(item.correct)) errors.push(`${item.id}: invalid correct-answer key`);
  if (!item.translations || typeof item.translations !== "object" || Array.isArray(item.translations)) {
    errors.push(`${item.id}: translations are missing or invalid`);
    continue;
  }
  for (const locale of target.locales) {
    if (!Object.hasOwn(item.translations, locale)) errors.push(`${item.id}/${locale}: required locale is missing`);
  }
  for (const locale of Object.keys(item.translations)) {
    const translation = item.translations[locale];
    if (!target.locales.includes(locale)) errors.push(`${item.id}: unsupported locale ${locale}`);
    if (!translation || typeof translation !== "object" || Array.isArray(translation)) {
      errors.push(`${item.id}/${locale}: translation must be an object`);
      continue;
    }
    const fields = Object.keys(translation).sort();
    if (JSON.stringify(fields) !== JSON.stringify([...translationFields].sort())) {
      errors.push(`${item.id}/${locale}: translation fields must be exactly question, options and explanation`);
    }
    if (!cleanText(translation.question) || !cleanText(translation.explanation)) {
      errors.push(`${item.id}/${locale}: question and explanation must be non-empty clean text`);
    } else {
      const normalized = translation.question.normalize("NFC").trim().replace(/\s+/gu, " ").toLocaleLowerCase(locale);
      const key = `${item.region}/${locale}/${normalized}`;
      if (questionText.has(key)) errors.push(`${item.id}/${locale}: duplicate question text also used by ${questionText.get(key)}`);
      else questionText.set(key, item.id);
    }
    const keys = Object.keys(translation.options || {}).sort();
    if (JSON.stringify(keys) !== JSON.stringify([...optionKeys].sort()) ||
        !optionKeys.every((key) => cleanText(translation.options?.[key]))) {
      errors.push(`${item.id}/${locale}: exactly four non-empty options a, b, c and d are required`);
    } else {
      const values = optionKeys.map((key) => translation.options[key].normalize("NFC").trim().replace(/\s+/gu, " ").toLocaleLowerCase(locale));
      if (new Set(values).size !== optionKeys.length) errors.push(`${item.id}/${locale}: answer options must be unique`);
    }
  }
}

console.log("MindQuest five-region / five-locale expansion audit");
console.log(`Target: ${target.regions.length * target.perRegion} stable IDs × ${target.locales.length} locales = ${target.regions.length * target.perRegion * target.locales.length} localized records.`);
console.log(`Current: ${questions.length} stable IDs (including ${stagedQuestions.length} staged); ${questions.reduce((sum, item) => sum + Object.keys(item.translations || {}).length, 0)} localized records.`);
console.log(`Loaded ${translationFiles.length} Spanish overlays and ${stagedFiles.length} staged regional content batches.`);

let totalMissingIds = 0;
let totalMissingTranslations = 0;
for (const region of target.regions) {
  const regional = questions.filter((item) => item.region === region);
  const missingIds = Math.max(0, target.perRegion - regional.length);
  if (regional.length > target.perRegion) errors.push(`${region}: target is 50 questions, found ${regional.length}`);
  totalMissingIds += missingIds;
  const missingTranslations = regional.reduce((sum, item) =>
    sum + target.locales.filter((locale) => !item.translations?.[locale]).length, 0);
  totalMissingTranslations += missingTranslations;
  const categorySummary = Object.entries(target.categories).map(([category, expected]) => {
    const actual = regional.filter((item) => item.category === category).length;
    return `${category} ${actual}/${expected}`;
  }).join(", ");
  const difficultySummary = Object.entries(target.difficulties).map(([level, expected]) => {
    const actual = regional.filter((item) => item.difficulty === level).length;
    return `${level} ${actual}/${expected}`;
  }).join(", ");
  console.log(`- ${region}: ${regional.length}/${target.perRegion} IDs; ${categorySummary}; ${difficultySummary}; ${missingTranslations} missing locale records`);

  if (regional.length === target.perRegion) {
    for (const [category, expected] of Object.entries(target.categories)) {
      const actual = regional.filter((item) => item.category === category).length;
      if (actual !== expected) errors.push(`${region}: expected ${expected} ${category} questions, found ${actual}`);
    }
    for (const [level, expected] of Object.entries(target.difficulties)) {
      const actual = regional.filter((item) => item.difficulty === level).length;
      if (actual !== expected) errors.push(`${region}: expected ${expected} ${level} questions, found ${actual}`);
    }
  }
}
const outstandingLocalizedRecords = totalMissingIds * target.locales.length + totalMissingTranslations;
console.log(`Expansion gap: ${totalMissingIds} stable IDs and ${outstandingLocalizedRecords} localized records (including ${totalMissingTranslations} missing locales on existing IDs).`);
console.log("Editorial gate: human factual, answer-key/distractor and native-speaker reviews are recorded complete in docs/REGIONAL-BANK-RELEASE-SIGNOFF.md; this structural audit does not certify translation quality.");

if (errors.length) {
  console.error("\nExpansion audit found structural errors:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("\nExpansion audit: current records are structurally compatible with the target schema.");
}
