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
    response.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end("Not found"); }
});

let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4191, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const context = await browser.newContext();
  await context.addInitScript(() => {
    localStorage.setItem("mindquest.best.IN.all.all.5", JSON.stringify({ score:1, total:5 }));
  });
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:4191/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });

  await page.locator("#settings-open").click();
  await page.locator("#round-length").selectOption("5");
  await page.locator("#settings-save").click();
  if (await page.locator("#best-score").textContent() !== "1 / 5 · 20%") {
    throw new Error("Seeded best-score record was not loaded for the five-question scope");
  }
  await page.locator("#play-button").click();
  const firstId = await page.locator("#question-title").getAttribute("data-question-id");
  if (!firstId?.startsWith("IN-")) throw new Error("Initial round did not use the India question bank");
  if (!(await page.locator("#next-button").isDisabled())) throw new Error("Next was enabled before an answer was selected");
  // A disabled native button cannot be activated by a user; invoke its DOM click method to verify the browser no-op without Playwright waiting for an enabled control.
  await page.locator("#next-button").evaluate(button => button.click());
  if (!(await page.locator("#question-title").getAttribute("data-question-id") === firstId)) {
    throw new Error("An unanswered question was skipped");
  }

  const answerButtons = page.locator("#answers button[role=radio]");
  const selectedAnswer = answerButtons.first();
  const selectedKey = await selectedAnswer.getAttribute("data-answer");
  await selectedAnswer.click();
  if (!(await page.locator("#next-button").isEnabled())) throw new Error("Next did not enable after answering");
  if (await page.locator("#answers button[role=radio]:disabled").count() !== 4) {
    throw new Error("Answer choices were not locked after selection");
  }
  if (await page.locator('#answers button[role=radio][aria-checked="true"]').count() !== 1) {
    throw new Error("Answer selection did not maintain exactly one checked radio");
  }
  await selectedAnswer.click().catch(() => {});
  if (await page.locator('#answers button[role=radio][aria-checked="true"]').count() !== 1) {
    throw new Error("A second answer changed the locked selection");
  }
  await page.locator("#next-button").click();
  const secondId = await page.locator("#question-title").getAttribute("data-question-id");
  if (!secondId || secondId === firstId) throw new Error("Next did not advance to a distinct question");
  await page.locator("#answers button[role=radio]").first().click();

  // Opening and backing out of Settings must preserve the active question and its answer ledger.
  await page.locator("#settings-open").click();
  if (!(await page.locator("#settings-view").isVisible())) throw new Error("Settings did not open from an active round");
  await page.locator("#settings-back").click();
  if (!(await page.locator("#quiz-view").isVisible())) throw new Error("Back from Settings did not restore the active quiz");
  if (await page.locator("#question-title").getAttribute("data-question-id") !== secondId) {
    throw new Error("Returning from Settings replaced the active question");
  }
  if (await page.locator("#answers button[role=radio]:disabled").count() !== 4 ||
      await page.locator('#answers button[role=radio][aria-checked="true"]').count() !== 1) {
    throw new Error("Returning from Settings corrupted the answered question state");
  }

  // Saving changed settings during gameplay must discard every transient round artifact.
  await page.locator("#settings-open").click();
  await page.locator("#interface-locale").selectOption("es-ES");
  await page.locator("#question-region").selectOption("RU");
  await page.locator("#question-locale").selectOption("es-ES");
  await page.locator("#settings-save").click();
  if (!(await page.locator("#home-view").isVisible())) throw new Error("Saving changed settings did not return Home");
  const discarded = await page.evaluate(() => ({
    questionId:document.querySelector("#question-title").getAttribute("data-question-id"),
    answerCount:document.querySelectorAll("#answers button").length,
    reviewCount:document.querySelectorAll("#answer-review-list article").length,
    nextDisabled:document.querySelector("#next-button").disabled,
    progress:document.querySelector("#question-progress").getAttribute("aria-valuenow"),
    streak:document.querySelector("#streak-value").textContent,
    region:JSON.parse(localStorage.getItem("mindquest.settings")).questionRegion,
    locale:JSON.parse(localStorage.getItem("mindquest.settings")).questionLocale,
    interfaceLocale:JSON.parse(localStorage.getItem("mindquest.settings")).interfaceLocale,
    indiaBest:localStorage.getItem("mindquest.best.IN.all.all.5"),
    russiaBest:localStorage.getItem("mindquest.best.RU.all.all.5")
  }));
  if (discarded.questionId !== null || discarded.answerCount !== 0 || discarded.reviewCount !== 0 ||
      discarded.nextDisabled !== true || discarded.progress !== "0" || discarded.streak !== "0" ||
      discarded.region !== "RU" || discarded.locale !== "es-ES" || discarded.interfaceLocale !== "es-ES" ||
      discarded.indiaBest !== JSON.stringify({ score:1,total:5 }) || discarded.russiaBest !== null) {
    throw new Error("Settings change did not isolate/discard the previous round correctly: " + JSON.stringify(discarded));
  }

  await page.locator("#play-button").click();
  const localizedQuestion = await page.evaluate(() => ({
    id:document.querySelector("#question-title").getAttribute("data-question-id"),
    lang:document.querySelector("#question-title").lang,
    interfaceLang:document.documentElement.lang,
    optionLangs:[...document.querySelectorAll("#answers button[role=radio] span:not(.letter)")].map(node => node.lang)
  }));
  if (!localizedQuestion.id?.startsWith("RU-") || localizedQuestion.lang !== "es-ES" ||
      localizedQuestion.interfaceLang !== "es-ES" || localizedQuestion.optionLangs.some(lang => lang !== "es-ES")) {
    throw new Error("Fresh round did not use the newly selected independent region and locales: " + JSON.stringify(localizedQuestion));
  }
  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Gameplay state isolation regression passed: unanswered questions cannot be skipped, answers lock exactly once, Settings back preserves an active answered question, and saving changed selectors discards transient round state without writing a score. New round uses the updated region and independent locales.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
