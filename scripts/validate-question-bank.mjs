import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../app/src/data/questions.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { timeout: 1000 });
const questions = sandbox.window.MINDQUEST_QUESTIONS;
const locales = ["en-IN", "en-US", "ru-RU"];
const regions = ["IN", "RU", "US"];
const categories = ["Geography", "History", "Science", "Culture"];
const difficulties = ["easy", "medium", "hard"];
const errors = [];
const ids = new Set();

if (!Array.isArray(questions) || questions.length === 0) {
  throw new Error("Question bank is empty or not an array.");
}

for (const question of questions) {
  if (!question.id || ids.has(question.id)) errors.push(`Missing or duplicate question ID: ${question.id}`);
  ids.add(question.id);
  if (!regions.includes(question.region)) errors.push(`${question.id}: invalid region ${question.region}`);
  if (!categories.includes(question.category) || !difficulties.includes(question.difficulty)) {
    errors.push(`${question.id}: missing category or invalid difficulty`);
  }
  if (!question.translations || typeof question.translations !== "object") {
    errors.push(`${question.id}: translations missing`);
    continue;
  }
  const translationLocales = Object.keys(question.translations).sort();
  if (JSON.stringify(translationLocales) !== JSON.stringify([...locales].sort())) {
    errors.push(`${question.id}: translation locales must be exactly ${locales.join(", ")}`);
  }
  if (typeof question.id === "string" && !question.id.startsWith(`${question.region}-`)) {
    errors.push(`${question.id}: ID prefix must match its region`);
  }
  for (const locale of locales) {
    const translation = question.translations[locale];
    if (!translation) {
      errors.push(`${question.id}: missing ${locale} translation`);
      continue;
    }
    const keys = ["a", "b", "c", "d"];
    if (!translation.question?.trim() || !translation.explanation?.trim()) {
      errors.push(`${question.id}/${locale}: question or explanation is empty`);
    }
    if (!translation.options || keys.some((key) => !translation.options[key]?.toString().trim())) {
      errors.push(`${question.id}/${locale}: all four answer options are required`);
    } else if (JSON.stringify(Object.keys(translation.options).sort()) !== JSON.stringify(keys)) {
      errors.push(`${question.id}/${locale}: option keys must be exactly a, b, c and d`);
    } else {
      const optionValues = keys.map((key) => String(translation.options[key]).trim().toLocaleLowerCase(locale));
      if (new Set(optionValues).size !== 4) {
        errors.push(`${question.id}/${locale}: answer option text must be unique`);
      }
    }
    if (!keys.includes(question.correct)) {
      errors.push(`${question.id}: correct answer key must be a, b, c or d`);
    }
  }
}

for (const region of regions) {
  const regional = questions.filter((question) => question.region === region);
  if (regional.length === 0) errors.push(`No questions currently exist for region ${region}`);
  const byDifficulty = Object.fromEntries(difficulties.map((level) => [
    level, regional.filter((question) => question.difficulty === level).length
  ]));
  console.log(`${region}: ${regional.length} questions (easy ${byDifficulty.easy}, medium ${byDifficulty.medium}, hard ${byDifficulty.hard})`);
}

if (errors.length) {
  console.error("\nQuestion-bank validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`\nQuestion-bank structure valid: ${questions.length} questions, ${locales.length} locales.`);
  console.log("Note: structural checks do not replace native-speaker translation and factual review.");
}
