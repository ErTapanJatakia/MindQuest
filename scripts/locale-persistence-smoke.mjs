import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("app");
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".svg":"image/svg+xml" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const file = resolve(root, relative);
    if (file !== root && !file.startsWith(root + sep)) return response.writeHead(403).end("Forbidden");
    response.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end("Not found"); }
});

const interfaces = ["en-IN", "en-US", "ru-RU", "es-PE", "es-ES"];
const regions = ["IN", "RU", "US", "ES", "PE"];
const questionLocales = ["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"];
const expectedCombinations = interfaces.length * regions.length * questionLocales.length;
let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4175, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:4175/", { waitUntil: "networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state: "detached" });

  let combinations = 0;
  for (const interfaceLocale of interfaces) {
    for (const region of regions) {
      for (const questionLocale of questionLocales) {
        await page.locator("#settings-open").click();
        await page.locator("#interface-locale").selectOption(interfaceLocale);
        await page.locator("#question-region").selectOption(region);
        await page.locator("#question-locale").selectOption(questionLocale);
        await page.locator("#settings-save").click();

        const actual = await page.evaluate(() => ({
          interfaceLocale: document.documentElement.lang,
          settings: JSON.parse(localStorage.getItem("mindquest.settings") || "null")
        }));
        if (actual.interfaceLocale !== interfaceLocale) {
          throw new Error("Document language mismatch: " + JSON.stringify({ interfaceLocale, region, questionLocale, actual }));
        }
        for (const [key, expected] of [["interfaceLocale", interfaceLocale], ["questionRegion", region], ["questionLocale", questionLocale]]) {
          if (actual.settings?.[key] !== expected) {
            throw new Error("Independent preference mismatch for " + key + ": " + JSON.stringify({ expected, actual }));
          }
        }
        combinations += 1;
      }
    }

    // Verify the last combination for each interface locale survives a full reload.
    await page.reload({ waitUntil: "networkidle" });
    await page.keyboard.press("Escape");
    await page.locator("#launch-splash").waitFor({ state: "detached" });
    const persisted = await page.evaluate(() => ({
      interfaceLocale: document.documentElement.lang,
      settings: JSON.parse(localStorage.getItem("mindquest.settings") || "null")
    }));
    const expected = { interfaceLocale, questionRegion: "PE", questionLocale: "es-PE" };
    if (persisted.interfaceLocale !== expected.interfaceLocale ||
        persisted.settings?.interfaceLocale !== expected.interfaceLocale ||
        persisted.settings?.questionRegion !== expected.questionRegion ||
        persisted.settings?.questionLocale !== expected.questionLocale) {
      throw new Error("Locale/region preferences did not survive reload: " + JSON.stringify({ expected, persisted }));
    }
  }

  // Verify that the selected region and question language govern actual content,
  // while the interface language remains independent.
  for (const region of regions) {
    for (const questionLocale of questionLocales) {
      await page.locator("#settings-open").click();
      await page.locator("#interface-locale").selectOption("es-PE");
      await page.locator("#question-region").selectOption(region);
      await page.locator("#question-locale").selectOption(questionLocale);
      await page.locator("#round-length").selectOption("5");
      await page.locator("#settings-save").click();
      await page.locator("#play-button").click();
      const seenQuestionIds = new Set();
      for (let index = 0; index < 5; index += 1) {
        const question = page.locator("#question-title");
        const id = await question.getAttribute("data-question-id");
        const language = await question.getAttribute("lang");
        if (!id?.startsWith(region + "-")) throw new Error("Question bank region leaked or mismatched: " + region + "/" + questionLocale + " -> " + id);
        if (seenQuestionIds.has(id)) throw new Error("Duplicate question ID within localized round: " + id);
        seenQuestionIds.add(id);
        if (language !== questionLocale) throw new Error("Question language metadata mismatch: " + questionLocale + " -> " + language);

        const answerLanguages = await page.locator("#answers button.answer-option span").evaluateAll(nodes => nodes.map(node => node.getAttribute("lang")));
        if (answerLanguages.length !== 4 || answerLanguages.some(value => value !== questionLocale)) {
          throw new Error("Answer option language metadata mismatch: " + questionLocale + " -> " + JSON.stringify(answerLanguages));
        }
        const correctKey = await page.evaluate(questionId =>
          window.MINDQUEST_QUESTIONS.find(item => item.id === questionId)?.correct, id);
        if (!correctKey) throw new Error("Localized question has no canonical answer key: " + id);
        await page.locator('#answers button[role="radio"][data-answer="' + correctKey + '"]').click();

        const feedbackLanguages = await page.locator("#feedback span").evaluateAll(nodes => nodes.map(node => node.getAttribute("lang")));
        if (feedbackLanguages.length !== 2 || feedbackLanguages[0] !== "es-PE" || feedbackLanguages[1] !== questionLocale) {
          throw new Error("Feedback mixed interface/question language metadata: " + JSON.stringify({ region, questionLocale, feedbackLanguages }));
        }
        await page.locator("#next-button").click();
      }

      await page.locator("#result-view.active").waitFor({ state:"visible" });
      const review = await page.locator("#answer-review-list article").evaluateAll(cards => cards.map(card => ({
        heading:card.querySelector("h3")?.getAttribute("lang"),
        status:card.querySelector(".review-status")?.getAttribute("lang"),
        explanation:card.querySelector(".review-explanation")?.getAttribute("lang"),
        answerValues:[...card.querySelectorAll("p span")].map(span => span.getAttribute("lang"))
      })));
      if (review.length !== 5 || review.some(card =>
        card.heading !== questionLocale || card.status !== "es-PE" || card.explanation !== questionLocale ||
        card.answerValues.some((value,index) => value !== (index % 2 === 0 ? "es-PE" : questionLocale)))) {
        throw new Error("Results review mixed interface/question language metadata: " + JSON.stringify({ region, questionLocale, review }));
      }
      await page.locator("#brand-home").click();
    }
  }

  if (combinations !== expectedCombinations) throw new Error("Expected " + expectedCombinations + " selector combinations, exercised " + combinations);
  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Locale persistence regression passed: " + combinations + " independent interface/region/question-language combinations, five reload persistence checkpoints, and 25 complete five-question live gameplay/review rounds with question, answer, feedback and result language metadata verified.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
