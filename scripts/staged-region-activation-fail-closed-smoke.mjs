import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("app");
const activationPath = resolve(root, "src/data/activate-reviewed-region-bank.js");
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".svg":"image/svg+xml" };
const scenarios = [
  ["duplicate-staged-id", "window.MINDQUEST_STAGED_QUESTIONS[0].id = window.MINDQUEST_QUESTIONS[0].id;"],
  ["missing-locale", "delete window.MINDQUEST_STAGED_QUESTIONS[0].translations['es-PE'];"],
  ["incomplete-regional-bundle", "window.MINDQUEST_STAGED_QUESTIONS.pop();"]
];
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
    server.listen(4188, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  for (const [scenario, mutation] of scenarios) {
    const context = await browser.newContext();
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.route("**/activate-reviewed-region-bank.js", async route => {
      const original = await readFile(activationPath, "utf8");
      await route.fulfill({
        status:200,
        contentType:"text/javascript; charset=utf-8",
        body:mutation + "\n" + original
      });
    });
    await page.goto("http://127.0.0.1:4188/", { waitUntil:"networkidle" });
    const state = await page.evaluate(() => ({
      questionCount:Array.isArray(window.MINDQUEST_QUESTIONS) ? window.MINDQUEST_QUESTIONS.length : null,
      canonicalIds:window.MINDQUEST_QUESTIONS?.filter(question => question.region === "IN" || question.region === "RU" || question.region === "US").length,
      regionalIds:window.MINDQUEST_QUESTIONS?.filter(question => question.region === "ES" || question.region === "PE").length,
      release:window.MINDQUEST_QUESTION_BANK_RELEASE || null
    }));
    if (state.questionCount !== 150 || state.canonicalIds !== 150 || state.regionalIds !== 0 || state.release !== null) {
      throw new Error(scenario + ": invalid staged bundle was partially activated: " + JSON.stringify(state));
    }
    if (!errors.some(message => message.includes("MindQuest regional bank activation aborted"))) {
      throw new Error(scenario + ": activation did not fail with the guarded rejection; browser errors=" + JSON.stringify(errors));
    }
    console.log("PASS staged activation rejected " + scenario + " and preserved the canonical 150-question bank.");
    await context.close();
  }
  console.log("Staged-region activation fail-closed regression passed: duplicate IDs, incomplete locale coverage and incomplete regional bundle cannot partially activate.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
