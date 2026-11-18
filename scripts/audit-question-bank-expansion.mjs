import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../app/src/data/questions.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { timeout: 1000 });
const questions = sandbox.window.MINDQUEST_QUESTIONS;

const target = {
  regions: ["IN", "RU", "US", "ES", "PE"],
  locales: ["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"],
  perRegion: 50,
  categories: { Geography: 13, History: 12, Science: 12, Culture: 13 },
  difficulties: { easy: 15, medium: 20, hard: 15 }
};
const categoryCodes = { Geography: "GEO", History: "HIS", Science: "SCI", Culture: "CUL" };
const errors = [];
const ids = new Set();

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
  if (item.id !== `${item.region}-${categoryCodes[item.category]}-${String(
    Number(item.id.split("-").at(-1))
  ).padStart(3, "0")}`) errors.push(`${item.id}: ID does not match region/category/sequence convention`);
  if (!item.translations || typeof item.translations !== "object") {
    errors.push(`${item.id}: translations are missing`);
    continue;
  }
  for (const locale of Object.keys(item.translations)) {
    const translation = item.translations[locale];
    if (!target.locales.includes(locale)) errors.push(`${item.id}: unsupported locale ${locale}`);
    if (!translation?.question || !translation?.explanation ||
        !["a", "b", "c", "d"].every((key) => typeof translation.options?.[key] === "string" && translation.options[key].trim())) {
      errors.push(`${item.id}/${locale}: incomplete localized record`);
    }
  }
}

console.log("MindQuest five-region / five-locale expansion audit");
console.log(`Target: ${target.regions.length * target.perRegion} stable IDs × ${target.locales.length} locales = ${target.regions.length * target.perRegion * target.locales.length} localized records.`);
console.log(`Current: ${questions.length} stable IDs; ${questions.reduce((sum, item) => sum + Object.keys(item.translations || {}).length, 0)} localized records.`);

let totalMissingIds = 0;
let totalMissingTranslations = 0;
for (const region of target.regions) {
  const regional = questions.filter((item) => item.region === region);
  const missingIds = Math.max(0, target.perRegion - regional.length);
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
}
console.log(`Expansion gap: ${totalMissingIds} stable IDs and ${totalMissingTranslations} locale records on existing IDs.`);
console.log("Editorial gate: native-speaker review, factual source review and answer-key verification remain mandatory; this audit does not certify translation quality.");

if (errors.length) {
  console.error("\nExpansion audit found structural errors:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("\nExpansion audit: current records are structurally compatible with the target schema.");
}
