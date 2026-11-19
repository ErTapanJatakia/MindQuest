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

const scores = {
  "mindquest.best.IN.all.all.10":{ score:6, total:10 },
  "mindquest.best.IN.Geography.all.10":{ score:4, total:10 },
  "mindquest.best.IN.Geography.hard.10":{ score:8, total:10 },
  "mindquest.best.IN.Geography.hard.5":{ score:4, total:5 },
  "mindquest.best.IN.History.hard.5":{ score:3, total:5 },
  "mindquest.best.RU.History.hard.5":{ score:2, total:5 }
};
let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4179, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const context = await browser.newContext();
  await context.addInitScript(seed => {
    for (const [key, value] of Object.entries(seed)) localStorage.setItem(key, JSON.stringify(value));
  }, scores);
  const page = await context.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:4179/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });

  const assertScore = async (expected, scope) => {
    const actual = await page.locator("#best-score").textContent();
    if (actual !== expected) throw new Error(scope + ": expected " + expected + ", received " + actual);
  };
  await assertScore("6 / 10 · 60%", "default all-category/all-difficulty scope");

  const configure = async ({ category, difficulty, region, roundLength, questionLocale }) => {
    await page.locator("#settings-open").click();
    if (category) await page.locator("#question-category").selectOption(category);
    if (difficulty) await page.locator("#question-difficulty").selectOption(difficulty);
    if (region) await page.locator("#question-region").selectOption(region);
    if (roundLength) await page.locator("#round-length").selectOption(String(roundLength));
    if (questionLocale) await page.locator("#question-locale").selectOption(questionLocale);
    await page.locator("#settings-save").click();
  };

  await configure({ category:"Geography" });
  await assertScore("4 / 10 · 40%", "category isolation");
  await configure({ difficulty:"hard" });
  await assertScore("8 / 10 · 80%", "difficulty isolation");
  await configure({ roundLength:5 });
  await assertScore("4 / 5 · 80%", "round-length isolation");
  await configure({ category:"History" });
  await assertScore("3 / 5 · 60%", "combined category/difficulty isolation");
  await configure({ region:"RU" });
  await assertScore("2 / 5 · 40%", "region isolation");
  await configure({ questionLocale:"ru-RU" });
  await assertScore("2 / 5 · 40%", "question-language independence from score scope");

  await page.reload({ waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });
  await assertScore("2 / 5 · 40%", "persisted combined score scope");
  const persisted = await page.evaluate(() => JSON.parse(localStorage.getItem("mindquest.settings") || "null"));
  if (persisted?.questionRegion !== "RU" || persisted?.category !== "History" ||
      persisted?.difficulty !== "hard" || persisted?.roundLength !== 5 || persisted?.questionLocale !== "ru-RU") {
    throw new Error("The full settings scope did not persist independently: " + JSON.stringify(persisted));
  }
  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Score-scope regression passed: category, difficulty, region and round length isolate best-score records; question language remains independent; combined preferences survive reload.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
