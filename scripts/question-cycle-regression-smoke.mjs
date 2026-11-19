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
    server.listen(4182, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:4182/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });
  const regions = ["IN", "RU", "US", "ES", "PE"];
  let completedRounds = 0;
  for (const region of regions) {
    await page.locator("#settings-open").click();
    await page.locator("#question-region").selectOption(region);
    await page.locator("#question-locale").selectOption("en-IN");
    await page.locator("#round-length").selectOption("15");
    await page.locator("#question-category").selectOption("all");
    await page.locator("#question-difficulty").selectOption("all");
    await page.locator("#settings-save").click();
    const regionIds = new Set();
    for (let roundIndex=0; roundIndex<4; roundIndex+=1) {
      if (roundIndex === 0) await page.locator("#play-button").click();
      else await page.locator("#replay-button").click();
      const roundIds = new Set();
      for (let questionIndex=0; questionIndex<15; questionIndex+=1) {
        const title = page.locator("#question-title");
        const id = await title.getAttribute("data-question-id");
        if (!id?.startsWith(region + "-")) throw new Error("Wrong region question in " + region + " cycle: " + id);
        if (roundIds.has(id)) throw new Error("Duplicate stable ID within one round: " + id);
        roundIds.add(id);
        regionIds.add(id);
        const correct = await page.evaluate(questionId => window.MINDQUEST_QUESTIONS.find(item => item.id === questionId)?.correct, id);
        if (!correct) throw new Error("Missing canonical answer key for " + id);
        await page.locator('#answers button[data-answer="' + correct + '"]').click();
        await page.locator("#next-button").click();
      }
      if (!(await page.locator("#result-view").isVisible())) throw new Error("Round did not finish for region " + region);
      completedRounds += 1;
    }
    if (regionIds.size !== 50) throw new Error(region + " cycle did not cover all 50 unique IDs; saw " + regionIds.size);
    await page.locator("#replay-button").click();
    const replayId = await page.locator("#question-title").getAttribute("data-question-id");
    if (!replayId?.startsWith(region + "-")) throw new Error("Cycle restart failed for " + region);
    // The Home control is only rendered on Results; replay starts a live round.
    // Open Settings and save to exercise the supported safe return-to-Home path.
    await page.locator("#settings-open").click();
    await page.locator("#settings-save").click();
    if (!(await page.locator("#home-view").isVisible())) throw new Error("Settings save did not return Home after replay for " + region);
  }
  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Question-cycle regression passed: " + completedRounds + " complete rounds, all 250 stable IDs covered across five regions, no within-round duplicates, and replay/cycle restart verified.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
