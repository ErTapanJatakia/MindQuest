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
const stagedFiles = files.filter((name) => /^staged-region-questions-batch-\d+(?:-\d+)?\.js$/u.test(name))
  .sort((a, b) => a.localeCompare(b, "en", { numeric: true }));
for (const name of stagedFiles) {
  vm.runInNewContext(await readFile(new URL(name, dataDirectory), "utf8"), sandbox, { timeout: 1000 });
}
const staged = sandbox.window.MINDQUEST_STAGED_QUESTIONS || [];
const batchIds = {
  1: [
    "ES-GEO-001","ES-GEO-002","ES-GEO-003","ES-HIS-001","ES-HIS-002","ES-HIS-003","ES-SCI-001","ES-SCI-002","ES-CUL-001","ES-CUL-002",
    "PE-GEO-001","PE-GEO-002","PE-GEO-003","PE-HIS-001","PE-HIS-002","PE-HIS-003","PE-SCI-001","PE-SCI-002","PE-CUL-001","PE-CUL-002"
  ],
  2: [
    "ES-GEO-004","ES-GEO-005","ES-GEO-006","ES-HIS-004","ES-HIS-005","ES-SCI-003","ES-SCI-004","ES-SCI-005","ES-CUL-003","ES-CUL-004",
    "PE-GEO-004","PE-GEO-005","PE-GEO-006","PE-HIS-004","PE-HIS-005","PE-SCI-003","PE-SCI-004","PE-SCI-005","PE-CUL-003","PE-CUL-004"
  ],
  3: [
    "ES-GEO-007","ES-GEO-008","ES-HIS-006","ES-HIS-007","ES-HIS-008","ES-SCI-006","ES-SCI-007","ES-CUL-005","ES-CUL-006","ES-CUL-007",
    "PE-GEO-007","PE-GEO-008","PE-HIS-006","PE-HIS-007","PE-HIS-008","PE-SCI-006","PE-SCI-007","PE-CUL-005","PE-CUL-006","PE-CUL-007"
  ],
  4: [
    "ES-GEO-009","ES-GEO-010","ES-GEO-011","ES-HIS-009","ES-HIS-010","ES-SCI-008","ES-SCI-009","ES-CUL-008","ES-CUL-009","ES-CUL-010",
    "PE-GEO-009","PE-GEO-010","PE-GEO-011","PE-HIS-009","PE-HIS-010","PE-SCI-008","PE-SCI-009","PE-CUL-008","PE-CUL-009","PE-CUL-010"
  ]
};
const expectedIds = Object.values(batchIds).flat();
const locales = ["en-IN","en-US","ru-RU","es-ES","es-PE"];
const categories = ["Geography","History","Science","Culture"];
const errors = [];
const expectedQuestionKeys = ["category","correct","difficulty","id","region","translations"];
const expectedTranslationKeys = ["explanation","options","question"];
const optionKeys = ["a","b","c","d"];
const clean = (value) => typeof value === "string" && value.trim().length > 0 && !/[\u0000-\u001F\u007F]/u.test(value);
const actualIds = staged.map((question) => question?.id);
if (canonical.length !== 150) errors.push(`Canonical enabled bank must remain exactly 150 questions; found ${canonical.length}`);
const expectedFiles = ["staged-region-questions-batch-01.js","staged-region-questions-batch-02.js","staged-region-questions-batch-03-04.js"];
if (JSON.stringify(stagedFiles) !== JSON.stringify(expectedFiles)) {
  errors.push(`Expected staged source files ${expectedFiles.join(", ")}; found ${stagedFiles.join(", ")}`);
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
const batchQuotas = {
  1: {categories:{Geography:3,History:3,Science:2,Culture:2},difficulty:{easy:3,medium:4,hard:3}},
  2: {categories:{Geography:3,History:2,Science:3,Culture:2},difficulty:{easy:3,medium:4,hard:3}},
  3: {categories:{Geography:2,History:3,Science:2,Culture:3},difficulty:{easy:3,medium:4,hard:3}},
  4: {categories:{Geography:3,History:2,Science:2,Culture:3},difficulty:{easy:3,medium:4,hard:3}}
};
for (const [batch, ids] of Object.entries(batchIds)) {
  const batchQuestions = staged.filter((question) => ids.includes(question.id));
  for (const region of ["ES","PE"]) {
    const regional = batchQuestions.filter((question) => question.region === region);
    if (regional.length !== 10) errors.push(`Batch ${batch} / ${region}: expected 10 questions; found ${regional.length}`);
    for (const [category, expected] of Object.entries(batchQuotas[batch].categories)) {
      const actual = regional.filter((question) => question.category === category).length;
      if (actual !== expected) errors.push(`Batch ${batch} / ${region}: expected ${expected} ${category}; found ${actual}`);
    }
    for (const [level, expected] of Object.entries(batchQuotas[batch].difficulty)) {
      const actual = regional.filter((question) => question.difficulty === level).length;
      if (actual !== expected) errors.push(`Batch ${batch} / ${region}: expected ${expected} ${level}; found ${actual}`);
    }
  }
}
for (const region of ["ES","PE"]) {
  const regional = staged.filter((question) => question.region === region);
  const cumulativeCategories = {Geography:11,History:10,Science:9,Culture:10};
  const cumulativeDifficulty = {easy:12,medium:16,hard:12};
  for (const [category, expected] of Object.entries(cumulativeCategories)) {
    const actual = regional.filter((question) => question.category === category).length;
    if (actual !== expected) errors.push(`${region}: cumulative batches 01–04 expected ${expected} ${category}; found ${actual}`);
  }
  for (const [level, expected] of Object.entries(cumulativeDifficulty)) {
    const actual = regional.filter((question) => question.difficulty === level).length;
    if (actual !== expected) errors.push(`${region}: cumulative batches 01–04 expected ${expected} ${level}; found ${actual}`);
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
for (const filename of stagedFiles) {
  if (appHtml.includes(filename)) errors.push(`${filename}: staged content must not be loaded by the live application before full release gates.`);
}
for (const [batch, ids] of Object.entries(batchIds)) {
  const reviewDoc = await readFile(new URL(`docs/QUESTION-LOCALIZATION-REGIONS-BATCH-0${batch}.md`, root), "utf8");
  for (const id of ids) if (!reviewDoc.includes(id)) errors.push(`${id}: missing from batch ${batch} editorial/source register`);
}
console.log("MindQuest staged Spain/Peru content validation — cumulative batches 01–04");
console.log(`Canonical bank: ${canonical.length} enabled IDs; staged: ${staged.length} new IDs; locales per staged ID: ${locales.length}.`);
console.log("Runtime exposure: all staged regional batches remain excluded from app selectors and gameplay.");
if (errors.length) {
  console.error("\nStaged regional validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("Staged regional content structurally valid: 80 IDs, 400 localized records, five explicit locales and registered source notes.");
  console.log("Cumulative category quotas per region: Geography 11, History 10, Science 9, Culture 10; difficulty: easy 12, medium 16, hard 12.");
  console.log("Editorial status: factual source review and native-speaker review remain required before release.");
}
