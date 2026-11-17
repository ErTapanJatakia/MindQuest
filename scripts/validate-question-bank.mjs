import { readFile } from "node:fs/promises";
import vm from "node:vm";

const source = await readFile(new URL("../app/src/data/questions.js", import.meta.url), "utf8");
const sandbox = { window: {} };
vm.runInNewContext(source, sandbox, { timeout: 1000 });
const questions = sandbox.window.MINDQUEST_QUESTIONS;
const locales = ["en-IN", "en-US", "ru-RU"];
const regions = ["IN", "RU", "US"];
const categories = ["Geography", "History", "Science", "Culture"];
const categoryCodes = { Geography: "GEO", History: "HIS", Science: "SCI", Culture: "CUL" };
const difficulties = ["easy", "medium", "hard"];
const errors = [];
const ids = new Set();
const questionTextByLocale = new Map();
const expectedQuestionKeys = ["category", "correct", "difficulty", "id", "region", "translations"];
const expectedTranslationKeys = ["explanation", "options", "question"];
const hasCleanText = (value) => typeof value === "string" && value.trim().length > 0 && !/[\u0000-\u001F\u007F]/u.test(value);

if (!Array.isArray(questions) || questions.length === 0) {
  throw new Error("Question bank is empty or not an array.");
}

for (const question of questions) {
  if (!question || typeof question !== "object" || Array.isArray(question)) {
    errors.push("Question entry must be an object.");
    continue;
  }
  if (JSON.stringify(Object.keys(question).sort()) !== JSON.stringify(expectedQuestionKeys)) {
    errors.push(`${question.id || "(unknown)"}: question fields must be exactly ${expectedQuestionKeys.join(", ")}`);
  }
  if (typeof question.id !== "string" || !question.id.trim() || ids.has(question.id)) errors.push(`Missing or duplicate question ID: ${question.id}`);
  ids.add(question.id);
  if (!regions.includes(question.region)) errors.push(`${question.id}: invalid region ${question.region}`);
  if (!categories.includes(question.category) || !difficulties.includes(question.difficulty)) {
    errors.push(`${question.id}: missing category or invalid difficulty`);
  }
  if (!question.translations || typeof question.translations !== "object" || Array.isArray(question.translations)) {
    errors.push(`${question.id}: translations must be a plain object`);
    continue;
  }
  const translationLocales = Object.keys(question.translations).sort();
  if (JSON.stringify(translationLocales) !== JSON.stringify([...locales].sort())) {
    errors.push(`${question.id}: translation locales must be exactly ${locales.join(", ")}`);
  }
  if (!["a", "b", "c", "d"].includes(question.correct)) {
    errors.push(`${question.id}: correct answer key must be a, b, c or d`);
  }
  if (typeof question.id === "string" &&
      (!regions.includes(question.region) || !categories.includes(question.category) ||
       !new RegExp("^(IN|RU|US)-" + categoryCodes[question.category] + "-\\d{3}$").test(question.id) ||
       !question.id.startsWith(question.region + "-"))) {
    errors.push(`${question.id}: ID must match its region and category code (for example, IN-GEO-001)`);
  }
  for (const locale of locales) {
    const translation = question.translations[locale];
    if (!translation || typeof translation !== "object" || Array.isArray(translation)) {
      errors.push(`${question.id}: missing or invalid ${locale} translation`);
      continue;
    }
    if (JSON.stringify(Object.keys(translation).sort()) !== JSON.stringify(expectedTranslationKeys)) {
      errors.push(`${question.id}/${locale}: translation fields must be exactly ${expectedTranslationKeys.join(", ")}`);
    }
    const keys = ["a", "b", "c", "d"];
    if (typeof question.correct === "string" && !hasCleanText(translation.options?.[question.correct])) {
      errors.push(`${question.id}/${locale}: the shared correct-answer key must resolve to non-empty localized text`);
    }
    if (!hasCleanText(translation.question) || !hasCleanText(translation.explanation)) {
      errors.push(`${question.id}/${locale}: question and explanation must be non-empty text without control characters`);
    } else {
      const normalizedQuestion = translation.question.normalize("NFC").trim().replace(/\s+/gu, " ").toLocaleLowerCase(locale);
      const duplicateKey = `${question.region}/${locale}/${normalizedQuestion}`;
      if (questionTextByLocale.has(duplicateKey)) {
        errors.push(`${question.id}/${locale}: duplicate question text also used by ${questionTextByLocale.get(duplicateKey)}`);
      } else questionTextByLocale.set(duplicateKey, question.id);
    }
    if (!translation.options || typeof translation.options !== "object" || Array.isArray(translation.options) ||
        keys.some((key) => !hasCleanText(translation.options[key]))) {
      errors.push(`${question.id}/${locale}: all four answer options are required`);
    } else if (JSON.stringify(Object.keys(translation.options).sort()) !== JSON.stringify(keys)) {
      errors.push(`${question.id}/${locale}: option keys must be exactly a, b, c and d`);
    } else {
      const optionValues = keys.map((key) => translation.options[key].normalize("NFC").trim().replace(/\s+/gu, " ").toLocaleLowerCase(locale));
      if (new Set(optionValues).size !== 4) {
        errors.push(`${question.id}/${locale}: answer option text must be unique`);
      }
    }
  }
}

for (const region of regions) {
  const regional = questions.filter((question) => question.region === region);
  if (regional.length !== 50) errors.push(`${region}: expected exactly 50 questions, found ${regional.length}`);
  const byDifficulty = Object.fromEntries(difficulties.map((level) => [
    level, regional.filter((question) => question.difficulty === level).length
  ]));
  const expectedDifficulty = { easy: 15, medium: 20, hard: 15 };
  for (const level of difficulties) {
    if (byDifficulty[level] !== expectedDifficulty[level]) {
      errors.push(`${region}: expected ${expectedDifficulty[level]} ${level} questions, found ${byDifficulty[level]}`);
    }
  }
  const byCategory = Object.fromEntries(categories.map((category) => [
    category, regional.filter((question) => question.category === category).length
  ]));
  const expectedCategory = { Geography: 13, History: 12, Science: 12, Culture: 13 };
  for (const category of categories) {
    if (byCategory[category] !== expectedCategory[category]) {
      errors.push(`${region}: expected ${expectedCategory[category]} ${category} questions, found ${byCategory[category]}`);
    }
  }
  console.log(`${region}: ${regional.length} questions (easy ${byDifficulty.easy}, medium ${byDifficulty.medium}, hard ${byDifficulty.hard}; categories ${categories.map((category) => `${category} ${byCategory[category]}`).join(", ")})`);
}

if (questions.length !== 150) errors.push(`Expected exactly 150 question IDs, found ${questions.length}`);

if (errors.length) {
  console.error("\nQuestion-bank validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log(`\nQuestion-bank structure valid: ${questions.length} questions, ${locales.length} locales.`);
  console.log("Note: structural checks do not replace native-speaker translation and factual review.");
}
