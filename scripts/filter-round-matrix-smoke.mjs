import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("app");
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".svg":"image/svg+xml" };
const regions = ["IN", "RU", "US", "ES", "PE"];
const categories = ["Geography", "History", "Science", "Culture"];
const difficulties = ["easy", "medium", "hard"];
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
    server.listen(4192, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const context = await browser.newContext();
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:4192/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });

  async function configure(region, category, difficulty, length) {
    await page.locator("#settings-open").click();
    await page.locator("#question-region").selectOption(region);
    await page.locator("#question-locale").selectOption("en-IN");
    await page.locator("#question-category").selectOption(category);
    await page.locator("#question-difficulty").selectOption(difficulty);
    await page.locator("#round-length").selectOption(String(length));
    await page.locator("#settings-save").click();
  }

  async function completeRound(region, category, difficulty, length) {
    await page.locator("#play-button").click();
    const diagnostics = await page.locator("#question-title").getAttribute("data-round-diagnostics");
    if (!diagnostics) throw new Error("Missing round diagnostics for " + [region, category, difficulty, length].join("/"));
    const details = JSON.parse(diagnostics);
    const expectedPool = await page.evaluate(({ region, category, difficulty }) =>
      window.MINDQUEST_QUESTIONS.filter(question =>
        question.id.startsWith(region + "-") &&
        (category === "all" || question.category === category) &&
        (difficulty === "all" || question.difficulty === difficulty)
      ).length, { region, category, difficulty });
    const expectedLength = Math.min(length, expectedPool);
    if (!expectedPool || details.region !== region || details.roundLength !== expectedLength ||
        details.poolSize !== expectedPool ||
        Object.values(details.quotas).reduce((sum, value) => sum + value, 0) !== expectedLength) {
      throw new Error("Round allocation mismatch: " + JSON.stringify({ region, category, difficulty, requestedLength:length, expectedPool, expectedLength, details }));
    }

    const seen = new Set();
    for (let index = 0; index < expectedLength; index += 1) {
      const id = await page.locator("#question-title").getAttribute("data-question-id");
      if (!id?.startsWith(region + "-") || seen.has(id)) {
        throw new Error("Wrong-region or duplicate question ID in round: " + id);
      }
      seen.add(id);
      const question = await page.evaluate(questionId => {
        const item = window.MINDQUEST_QUESTIONS.find(entry => entry.id === questionId);
        return item && { category:item.category, difficulty:item.difficulty, correct:item.correct };
      }, id);
      if (!question || (category !== "all" && question.category !== category) ||
          (difficulty !== "all" && question.difficulty !== difficulty)) {
        throw new Error("Filter leakage for " + id + ": " + JSON.stringify({ category, difficulty, question }));
      }
      const correct = page.locator('#answers button[data-answer="' + question.correct + '"]');
      await correct.click();
      await page.locator("#next-button").click();
    }
    if (!(await page.locator("#result-view").isVisible())) {
      throw new Error("Round did not finish for " + [region, category, difficulty, length].join("/"));
    }
    const reviewCount = await page.locator("#answer-review-list article").count();
    if (reviewCount !== expectedLength) throw new Error("Answer review count mismatch: expected " + expectedLength + ", received " + reviewCount);
    return expectedLength;
  }

  let filterRounds = 0;
  let questionPresentations = 0;
  for (const region of regions) {
    for (const category of categories) {
      for (const difficulty of difficulties) {
        await configure(region, category, difficulty, 5);
        questionPresentations += await completeRound(region, category, difficulty, 5);
        filterRounds += 1;
      }
    }
  }

  let lengthRounds = 0;
  for (const region of regions) {
    for (const length of [5, 10, 15]) {
      await configure(region, "all", "all", length);
      questionPresentations += await completeRound(region, "all", "all", length);
      lengthRounds += 1;
    }
  }

  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Five-region filter/round matrix passed: " + filterRounds +
    " category × difficulty rounds across all five regions, plus " + lengthRounds +
    " round-length checks (5/10/15) across all five regions; " + questionPresentations +
    " question presentations, exact pool diagnostics, filter isolation, unique IDs and complete localized answer review verified.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
