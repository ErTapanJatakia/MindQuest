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
    server.listen(4180, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  await page.goto("http://127.0.0.1:4180/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });
  const report = await page.evaluate(() => {
    const questions = window.MINDQUEST_QUESTIONS;
    const locales = ["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"];
    const regions = ["IN", "RU", "US", "ES", "PE"];
    const categories = ["Geography", "History", "Science", "Culture"];
    const difficulties = ["easy", "medium", "hard"];
    if (!Array.isArray(questions)) throw new Error("Runtime question bank is unavailable.");
    const uniqueIds = new Set(questions.map(item => item.id));
    if (questions.length !== 250 || uniqueIds.size !== 250) throw new Error("Runtime bank must contain exactly 250 unique stable IDs.");
    if (window.MINDQUEST_QUESTION_BANK_RELEASE?.totalQuestions !== 250) throw new Error("Runtime release marker does not report 250 questions.");
    const summary = {};
    for (const region of regions) {
      const items = questions.filter(item => item.region === region);
      if (items.length !== 50) throw new Error(region + " must contain exactly 50 questions.");
      const categoryCounts = Object.fromEntries(categories.map(category => [category, items.filter(item => item.category === category).length]));
      const difficultyCounts = Object.fromEntries(difficulties.map(difficulty => [difficulty, items.filter(item => item.difficulty === difficulty).length]));
      if (JSON.stringify(Object.values(categoryCounts)) !== JSON.stringify([13, 12, 12, 13])) throw new Error(region + " category quotas are incorrect: " + JSON.stringify(categoryCounts));
      if (JSON.stringify(Object.values(difficultyCounts)) !== JSON.stringify([15, 20, 15])) throw new Error(region + " difficulty quotas are incorrect: " + JSON.stringify(difficultyCounts));
      for (const question of items) {
        const keys = Object.keys(question.translations || {}).sort();
        if (keys.join("|") !== [...locales].sort().join("|")) throw new Error(question.id + " does not contain exactly five locales.");
        for (const locale of locales) {
          const copy = question.translations[locale];
          if (!copy?.question?.trim() || !copy?.explanation?.trim() ||
              !["a", "b", "c", "d"].every(key => copy.options?.[key]?.trim())) {
            throw new Error(question.id + " has incomplete " + locale + " content.");
          }
          const options = ["a", "b", "c", "d"].map(key => copy.options[key].normalize("NFC").trim().toLocaleLowerCase(locale));
          if (new Set(options).size !== 4) throw new Error(question.id + " has duplicate answer options in " + locale + ".");
        }
      }
      summary[region] = { total:items.length, categories:categoryCounts, difficulties:difficultyCounts };
    }
    return { total:questions.length, uniqueIds:uniqueIds.size, locales, regions:summary };
  });
  console.log("Runtime bank integrity passed: " + JSON.stringify(report));
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
