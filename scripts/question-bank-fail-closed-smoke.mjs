import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("app");
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".svg":"image/svg+xml" };
const scenarios = ["duplicate-id", "duplicate-localized-prompt", "invalid-answer-key"];
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
    server.listen(4187, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  for (const scenario of scenarios) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("http://127.0.0.1:4187/", { waitUntil:"networkidle" });
    await page.keyboard.press("Escape");
    await page.locator("#launch-splash").waitFor({ state:"detached" });
    await page.locator("#settings-open").click();
    await page.locator("#question-region").selectOption("IN");
    await page.locator("#round-length").selectOption("5");
    await page.locator("#settings-save").click();

    const mutation = await page.evaluate(kind => {
      const bank = window.MINDQUEST_QUESTIONS;
      const india = bank.filter(question => question.region === "IN");
      if (!Array.isArray(bank) || india.length < 2) throw new Error("Expected the enabled India question bank.");
      if (kind === "duplicate-id") {
        const first = india[0];
        const second = india.find(question => question !== first && question.category === first.category);
        if (!second) throw new Error("Could not find two India questions in the same category.");
        second.id = first.id;
        return { first:first.id, second:second.id };
      }
      if (kind === "duplicate-localized-prompt") {
        const first = india[0];
        const second = india.find(question => question !== first);
        for (const locale of ["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"]) {
          second.translations[locale].question = first.translations[locale].question;
        }
        return { first:first.id, second:second.id, locales:5 };
      }
      if (kind === "invalid-answer-key") {
        for (const question of india) question.correct = "z";
        return { invalidated:india.length };
      }
      throw new Error("Unknown corruption scenario: " + kind);
    }, scenario);

    await page.locator("#play-button").click();
    await page.locator("#result-view.active").waitFor({ state:"visible" });
    if (await page.locator("#final-score").textContent() !== "—") {
      throw new Error(scenario + ": corrupted question bank produced a score; mutation=" + JSON.stringify(mutation));
    }
    if (!(await page.locator("#replay-button").isHidden())) {
      throw new Error(scenario + ": replay was offered for a rejected question bank");
    }
    if (await page.locator("#answer-review-list article").count() !== 0) {
      throw new Error(scenario + ": rejected question bank produced answer-review records");
    }
    const bestScoreKeys = await page.evaluate(() =>
      Object.keys(localStorage).filter(key => key.startsWith("mindquest.best."))
    );
    if (bestScoreKeys.length) throw new Error(scenario + ": rejected question bank persisted best-score data: " + bestScoreKeys.join(", "));
    if (errors.length) throw new Error(scenario + ": browser runtime errors: " + errors.join(" | "));
    console.log("Fail-closed scenario passed: " + scenario + " (" + JSON.stringify(mutation) + ")");
    await context.close();
  }
  console.log("Question-bank fail-closed regression passed: duplicate stable IDs, duplicate prompts across all five locales and invalid answer keys cannot produce scores, answer reviews or persisted best-score records.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
