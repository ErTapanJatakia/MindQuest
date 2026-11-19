/* Enable the reviewed Spain and Peru banks only after their complete data bundle is present. */
(() => {
  "use strict";
  const canonical = window.MINDQUEST_QUESTIONS;
  const regional = window.MINDQUEST_STAGED_QUESTIONS;
  if (!Array.isArray(canonical) || canonical.length !== 150 ||
      !Array.isArray(regional) || regional.length !== 100) {
    throw new Error("MindQuest regional bank activation aborted: expected 150 canonical and 100 reviewed regional questions.");
  }
  const ids = new Set(canonical.map((question) => question?.id));
  for (const question of regional) {
    if (!question || typeof question.id !== "string" || ids.has(question.id)) {
      throw new Error("MindQuest regional bank activation aborted: missing or duplicate stable question ID.");
    }
    ids.add(question.id);
    const locales = ["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"];
    if (!locales.every((locale) => Object.hasOwn(question.translations || {}, locale))) {
      throw new Error("MindQuest regional bank activation aborted: incomplete locale coverage for " + question.id);
    }
  }
  window.MINDQUEST_QUESTIONS = [...canonical, ...regional];
  window.MINDQUEST_QUESTION_BANK_RELEASE = Object.freeze({
    totalQuestions: window.MINDQUEST_QUESTIONS.length,
    regions: Object.freeze(["IN", "RU", "US", "ES", "PE"]),
    locales: Object.freeze(["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"])
  });
})();
