import { readFile } from "node:fs/promises";
import vm from "node:vm";

const root = new URL("../", import.meta.url);
const [bankSource, overlaySource, batch03Source, batch04Source, batch05Source, html] = await Promise.all([
  readFile(new URL("app/src/data/questions.js", root), "utf8"),
  readFile(new URL("app/src/data/spanish-question-translations.js", root), "utf8"),
  readFile(new URL("app/src/data/spanish-question-translations-batch-03.js", root), "utf8"),
  readFile(new URL("app/src/data/spanish-question-translations-batch-04.js", root), "utf8"),
  readFile(new URL("app/src/data/spanish-question-translations-batch-05.js", root), "utf8"),
  readFile(new URL("app/index.html", root), "utf8")
]);
const sandbox = { window: {} };
vm.runInNewContext(bankSource, sandbox, { timeout: 1000 });
vm.runInNewContext(overlaySource, sandbox, { timeout: 1000 });
vm.runInNewContext(batch03Source, sandbox, { timeout: 1000 });
vm.runInNewContext(batch04Source, sandbox, { timeout: 1000 });
vm.runInNewContext(batch05Source, sandbox, { timeout: 1000 });

const expected = {
  "IN-GEO-001": { key: "b", answer: "Jaipur" },
  "IN-HIS-001": { key: "c", answer: "Jawaharlal Nehru" },
  "IN-SCI-001": { key: "a", answer: "ISRO" },
  "RU-GEO-001": { key: "b", answer: "Moscú" },
  "RU-GEO-002": { key: "d", answer: "Baikal" },
  "RU-CUL-001": { key: "a", answer: "León Tolstói" },
  "US-GEO-001": { key: "c", answer: "Washington D. C." },
  "US-HIS-001": { key: "a", answer: "1776" },
  "US-SCI-001": { key: "d", answer: "NASA" },
  "IN-GEO-002": { key: "c", answer: "8" },
  "IN-HIS-002": { key: "b", answer: "26 de noviembre de 1949" },
  "IN-CUL-002": { key: "c", answer: "Vaisakhi" },
  "RU-GEO-003": { key: "a", answer: "Volga" },
  "RU-SCI-002": { key: "d", answer: "Sputnik 1" },
  "US-GEO-003": { key: "b", answer: "Alaska" },
  "IN-GEO-004": { key: "c", answer: "Odisha" },
  "IN-HIS-003": { key: "a", answer: "Lahore" },
  "RU-GEO-004": { key: "b", answer: "Urales" },
  "RU-CUL-003": { key: "d", answer: "Bulgákov" },
  "US-GEO-004": { key: "c", answer: "Michigan" },
  "IN-SCI-002": { key: "a", answer: "1975" },
  "RU-SCI-001": { key: "a", answer: "Landáu" },
  "RU-HIS-001": { key: "b", answer: "1918" },
  "US-GEO-002": { key: "a", answer: "Colorado" },
  "US-HIS-002": { key: "c", answer: "1803" },
  "IN-CUL-001": { key: "b", answer: "Tamil Nadu" },
  "IN-GEO-003": { key: "d", answer: "Rajastán" },
  "RU-HIS-002": { key: "a", answer: "Gagarin" },
  "RU-CUL-002": { key: "c", answer: "Chaikovski" },
  "US-CUL-002": { key: "a", answer: "Frank Lloyd Wright" },
  "IN-HIS-005": { key: "b", answer: "Sabarmati" },
  "IN-SCI-004": { key: "b", answer: "Ramanujan" },
  "IN-SCI-005": { key: "a", answer: "Chandrayaan-3" },
  "IN-CUL-004": { key: "c", answer: "Kerala" },
  "IN-CUL-005": { key: "b", answer: "Natya Shastra" },
  "RU-HIS-005": { key: "c", answer: "Tereshkova" },
  "RU-SCI-004": { key: "a", answer: "Mendel" },
  "RU-SCI-005": { key: "d", answer: "Luna 9" },
  "RU-CUL-004": { key: "c", answer: "Turguénev" },
  "RU-CUL-005": { key: "c", answer: "Stravinski" },
  "US-HIS-004": { key: "a", answer: "Gettysburg" },
  "US-HIS-005": { key: "d", answer: "Decimotercera" },
  "US-SCI-005": { key: "b", answer: "Hubble" },
  "US-CUL-004": { key: "c", answer: "Broadway" },
  "US-CUL-005": { key: "a", answer: "Saarinen" },
  "IN-GEO-006": { key: "c", answer: "Bengala Occidental" },
  "IN-GEO-007": { key: "a", answer: "Ghats occidentales" },
  "IN-HIS-006": { key: "d", answer: "Akbar" },
  "IN-SCI-006": { key: "b", answer: "Bengaluru" },
  "IN-CUL-006": { key: "c", answer: "Pinturas budistas" }
};
const locales = ["es-ES", "es-PE"];
const questions = new Map(sandbox.window.MINDQUEST_QUESTIONS.map((question) => [question.id, question]));
const errors = [];

for (const [id, expectedAnswer] of Object.entries(expected)) {
  const question = questions.get(id);
  if (!question) {
    errors.push(`${id}: canonical question is missing`);
    continue;
  }
  if (question.correct !== expectedAnswer.key) errors.push(`${id}: canonical correct key changed`);
  for (const locale of locales) {
    const translation = question.translations?.[locale];
    if (!translation) {
      errors.push(`${id}/${locale}: translation is missing`);
      continue;
    }
    if (Object.keys(translation).sort().join(",") !== "explanation,options,question") {
      errors.push(`${id}/${locale}: unexpected translation fields`);
    }
    if (![translation.question, translation.explanation].every((value) => typeof value === "string" && value.trim())) {
      errors.push(`${id}/${locale}: question and explanation must be non-empty`);
    }
    const options = translation.options || {};
    if (Object.keys(options).sort().join(",") !== "a,b,c,d" ||
        Object.values(options).some((value) => typeof value !== "string" || !value.trim())) {
      errors.push(`${id}/${locale}: exactly four non-empty answer options are required`);
      continue;
    }
    const normalized = Object.values(options).map((value) => value.normalize("NFC").trim().toLocaleLowerCase(locale));
    if (new Set(normalized).size !== 4) errors.push(`${id}/${locale}: answer options must be distinct`);
    const correctText = options[question.correct].normalize("NFC").trim().toLocaleLowerCase(locale);
    if (!correctText.includes(expectedAnswer.answer.toLocaleLowerCase(locale))) {
      errors.push(`${id}/${locale}: correct option does not match the canonical answer`);
    }
  }
}

const selectorMatch = html.match(/<select id="question-locale">([\s\S]*?)<\/select>/);
const selectorValues = selectorMatch ? [...selectorMatch[1].matchAll(/value="([^"]+)"/g)].map((match) => match[1]) : [];
if (selectorValues.sort().join(",") !== ["en-IN", "en-US", "ru-RU"].sort().join(",")) {
  errors.push("Spanish question locales must remain hidden until the full editorial release gate passes.");
}
if (!html.includes('./src/data/spanish-question-translations.js') ||
    !html.includes('./src/data/spanish-question-translations-batch-03.js') ||
    !html.includes('./src/data/spanish-question-translations-batch-04.js') ||
    !html.includes('./src/data/spanish-question-translations-batch-05.js')) {
  errors.push("Spanish translation overlays are not both loaded by the application.");
}

console.log("MindQuest Spanish localization batches 01–05");
console.log(`Expected: ${Object.keys(expected).length} stable IDs × ${locales.length} locales = ${Object.keys(expected).length * locales.length} localized records.`);
console.log(`Validated: ${errors.length ? "with errors" : "100 locale records structurally valid; canonical answer keys preserved; Spanish selectors remain gated"}.`);
console.log("Editorial status: native-speaker and factual-source sign-off remain pending.");
if (errors.length) {
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
}
