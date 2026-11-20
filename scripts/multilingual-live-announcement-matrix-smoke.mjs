import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("app");
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".svg":"image/svg+xml" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const file = resolve(root, pathname === "/" ? "index.html" : pathname.slice(1));
    if (file !== root && !file.startsWith(root + sep)) return response.writeHead(403).end("Forbidden");
    response.writeHead(200, { "content-type":mime[extname(file)] || "application/octet-stream" });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end("Not found"); }
});

const interfaceLocales = ["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"];
const questionLocales = ["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"];
const regions = ["IN", "RU", "US", "ES", "PE"];
let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4194, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  const runtimeErrors = [];
  page.on("pageerror", error => runtimeErrors.push(error.message));
  await page.goto("http://127.0.0.1:4194/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });

  function requireCondition(condition, message) {
    if (!condition) throw new Error(message);
  }

  async function assertLiveRegion(selector, label) {
    const state = await page.locator(selector).evaluate(node => ({
      role:node.getAttribute("role"),
      live:node.getAttribute("aria-live"),
      atomic:node.getAttribute("aria-atomic")
    }));
    requireCondition(state.role === "status" && state.live === "polite" && state.atomic === "true",
      label + " must remain a polite atomic status region: " + JSON.stringify(state));
  }

  let rounds = 0;
  let questions = 0;
  for (let i = 0; i < interfaceLocales.length; i += 1) {
    for (let j = 0; j < questionLocales.length; j += 1) {
      const interfaceLocale = interfaceLocales[i];
      const questionLocale = questionLocales[j];
      const region = regions[(i + j) % regions.length];

      await page.locator("#settings-open").click();
      await page.locator("#interface-locale").selectOption(interfaceLocale);
      await page.locator("#question-region").selectOption(region);
      await page.locator("#question-locale").selectOption(questionLocale);
      await page.locator("#round-length").selectOption("5");
      await page.locator("#question-category").selectOption("all");
      await page.locator("#question-difficulty").selectOption("all");
      await page.locator("#settings-save").click();

      const rootLocale = await page.locator("html").getAttribute("lang");
      requireCondition(rootLocale === interfaceLocale,
        "Interface locale mismatch for " + interfaceLocale + "/" + questionLocale + ": " + rootLocale);

      await assertLiveRegion("#progress-label", "Question progress");
      await assertLiveRegion("#streak-value", "Current streak");
      await assertLiveRegion("#feedback", "Answer feedback");
      await page.locator("#play-button").click();

      const question = await page.evaluate(() => ({
        id:document.querySelector("#question-title")?.dataset.questionId,
        lang:document.querySelector("#question-title")?.lang,
        options:[...document.querySelectorAll("#answers button[role=radio] > span:not(.letter)")].map(node => node.lang),
        groupRole:document.querySelector("#answers")?.getAttribute("role"),
        groupLabel:document.querySelector("#answers")?.getAttribute("aria-label"),
        progress:document.querySelector("#progress-label")?.textContent?.trim()
      }));
      requireCondition(question.id?.startsWith(region + "-"),
        "Question region mismatch for " + region + ": " + JSON.stringify(question));
      requireCondition(question.lang === questionLocale &&
        question.options.length === 4 && question.options.every(lang => lang === questionLocale),
        "Question/answer language metadata mismatch for " + interfaceLocale + "/" + questionLocale + ": " + JSON.stringify(question));
      requireCondition(question.groupRole === "radiogroup" && Boolean(question.groupLabel),
        "Answer group lost its accessible name or radiogroup semantics");
      requireCondition(question.progress === "1 / 5", "Initial progress announcement is incorrect: " + question.progress);

      for (let q = 0; q < 5; q += 1) {
        const answers = page.locator("#answers button[role=radio]");
        requireCondition(await answers.count() === 4, "Expected four answer controls at question " + (q + 1));
        await answers.first().click();

        const feedback = await page.locator("#feedback").evaluate(node => ({
          languages:[...node.querySelectorAll("span")].map(span => span.lang),
          text:node.textContent.trim(),
          focused:document.activeElement?.id
        }));
        requireCondition(feedback.languages.length >= 2 &&
          feedback.languages[0] === interfaceLocale &&
          feedback.languages.at(-1) === questionLocale,
          "Mixed-language feedback metadata mismatch: " + JSON.stringify(feedback));
        requireCondition(Boolean(feedback.text) && feedback.focused === "next-button",
          "Answer feedback was empty or keyboard focus did not move to Next: " + JSON.stringify(feedback));

        await page.locator("#next-button").click();
        questions += 1;
        if (q < 4) {
          const progress = await page.locator("#progress-label").textContent();
          requireCondition(progress.trim() === (q + 2) + " / 5",
            "Progress status did not advance after answer " + (q + 1) + ": " + progress);
          requireCondition(await page.evaluate(() => document.activeElement?.id) === "question-title",
            "Next-question navigation did not focus the question heading");
        }
      }

      await page.locator("#result-view.active").waitFor({ state:"visible" });
      await assertLiveRegion("#result-message", "Results summary");
      const result = await page.evaluate(() => ({
        lang:document.documentElement.lang,
        message:document.querySelector("#result-message")?.textContent.trim(),
        cards:[...document.querySelectorAll("#answer-review-list article")].map(card => ({
          question:card.querySelector("h3")?.lang,
          status:card.querySelector(".review-status")?.lang,
          explanation:card.querySelector(".review-explanation")?.lang,
          answerValues:[...card.querySelectorAll("p span:nth-child(2)")].map(node => node.lang)
        }))
      }));
      requireCondition(result.lang === interfaceLocale && Boolean(result.message),
        "Results summary did not retain the selected interface language");
      requireCondition(result.cards.length === 5 &&
        result.cards.every(card => card.question === questionLocale &&
          card.status === interfaceLocale && card.explanation === questionLocale &&
          card.answerValues.length === 2 &&
          card.answerValues.every(lang => lang === questionLocale)),
        "Answer-review language metadata mismatch for " + interfaceLocale + "/" + questionLocale + ": " + JSON.stringify(result.cards));
      rounds += 1;
      await page.locator("#home-button").click();
    }
  }

  requireCondition(rounds === 25 && questions === 125,
    "Unexpected matrix coverage: " + rounds + " rounds / " + questions + " questions");
  requireCondition(runtimeErrors.length === 0, "Browser runtime errors: " + runtimeErrors.join(" | "));
  console.log("Multilingual live-announcement and answer-review matrix passed: 25 interface/question-locale pairs, all five regions, 25 complete rounds and 125 questions. Verified status semantics, focus, answer feedback language metadata, progress announcements, Results and review language boundaries.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
