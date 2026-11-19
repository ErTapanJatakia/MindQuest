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
    server.listen(4176, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:4176/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });

  // Start a fixed-size round and prove the answer ledger, score and review agree.
  await page.locator("#settings-open").click();
  await page.locator("#round-length").selectOption("5");
  await page.locator("#question-category").selectOption("all");
  await page.locator("#question-difficulty").selectOption("all");
  await page.locator("#settings-save").click();
  await page.locator("#play-button").click();
  const seen = new Set();
  for (let index=0; index<5; index+=1) {
    const question = page.locator("#question-title");
    const id = await question.getAttribute("data-question-id");
    if (!id || seen.has(id)) throw new Error("Round contained a missing or repeated stable question ID: " + id);
    seen.add(id);
    if (await page.locator("#next-button").isEnabled()) throw new Error("Unanswered question could be advanced");
    const correctKey = await page.evaluate(questionId =>
      window.MINDQUEST_QUESTIONS.find(item => item.id === questionId)?.correct, id);
    if (!correctKey) throw new Error("Question has no canonical answer key: " + id);
    const selectedKey = index < 3 ? correctKey : ["a","b","c","d"].find(key => key !== correctKey);
    const selected = page.locator('#answers button[role="radio"][data-answer="' + selectedKey + '"]');
    await selected.click();
    if (!(await page.locator("#next-button").isEnabled())) throw new Error("Answer did not unlock progression");
    const checked = page.locator('#answers button[role="radio"][aria-checked="true"]');
    if (await checked.count() !== 1 || await checked.getAttribute("data-answer") !== selectedKey) {
      throw new Error("Answer selection did not maintain exactly one checked radio");
    }
    if (await page.locator("#answers button:disabled").count() !== 4) {
      throw new Error("Answer options remained interactive after a selection");
    }
    if (await page.evaluate(() => document.activeElement?.id) !== "next-button") {
      throw new Error("Focus did not move to the next action after answering");
    }
    await page.locator("#next-button").click();
    if (index < 4 && await page.evaluate(() => document.activeElement?.id) !== "question-title") {
      throw new Error("Focus did not move to the next question heading");
    }
  }
  if (!(await page.locator("#result-view").isVisible())) throw new Error("Completed round did not open Results");
  if (await page.locator("#final-score").textContent() !== "3/5") throw new Error("Score did not match the canonical answer ledger");
  if (await page.locator("#answer-review-list article").count() !== 5) throw new Error("Results did not include all five answer reviews");
  if (await page.locator("#result-title").evaluate(node => node === document.activeElement) !== true) {
    throw new Error("Results heading did not receive focus");
  }

  // A new round must reset transient score/answer state and remain region-bound.
  await page.locator("#replay-button").click();
  if (await page.locator("#progress-label").textContent() !== "1 / 5") throw new Error("Replay did not reset round progress");
  await page.locator("#settings-open").click();
  await page.locator("#question-region").selectOption("RU");
  await page.locator("#settings-save").click();
  if (!(await page.locator("#home-view").isVisible())) throw new Error("Saving settings during a round did not safely return Home");
  if (await page.locator("#progress-label").textContent() !== "") throw new Error("Changing settings retained stale round progress");
  await page.locator("#play-button").click();
  const newId = await page.locator("#question-title").getAttribute("data-question-id");
  if (!newId?.startsWith("RU-")) throw new Error("Changing region retained stale question-bank content: " + newId);

  // A new selection cannot be double-counted, and a settings change discards history.
  const buttons = page.locator("#answers button[role=radio]");
  await buttons.first().click();
  if (await page.locator("#answers button:disabled").count() !== 4) throw new Error("Selected answer was not locked");
  if (await page.locator("#next-button").isDisabled()) throw new Error("Selected answer did not unlock Next");
  await page.locator("#settings-open").click();
  await page.locator("#question-locale").selectOption("ru-RU");
  await page.locator("#settings-save").click();
  if (await page.locator("#answers button").count() !== 0) throw new Error("Settings change retained hidden answer controls");
  await page.locator("#play-button").click();
  if (await page.locator("#question-title").getAttribute("lang") !== "ru-RU") {
    throw new Error("New round did not use the selected question language");
  }
  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Gameplay integrity regression passed: 5-question mixed-answer round, canonical 3/5 scoring, unique stable IDs, locked answers, no unanswered progression, complete review, focus transitions, replay reset, and stale-round isolation after region/language changes.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
