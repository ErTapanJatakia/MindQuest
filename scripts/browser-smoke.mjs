import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("app");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const file = resolve(root, relative);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4173, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const pageErrors = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  if (!(await page.locator("#home-view").isVisible())) throw new Error("Home view did not load");
  if ((await page.title()).length === 0) throw new Error("Document title is missing");

  const interfaces = ["en-IN", "en-US", "ru-RU"];
  const regions = ["IN", "RU", "US"];
  const questionLocales = ["en-IN", "en-US", "ru-RU"];

  // Exercise every independent selector combination and verify the document locale.
  for (const interfaceLocale of interfaces) {
    for (const region of regions) {
      for (const questionLocale of questionLocales) {
        await page.locator("#settings-open").click();
        await page.locator("#interface-locale").selectOption(interfaceLocale);
        await page.locator("#question-region").selectOption(region);
        await page.locator("#question-locale").selectOption(questionLocale);
        await page.locator("#settings-save").click();
        if (await page.locator("html").getAttribute("lang") !== interfaceLocale) {
          throw new Error(`Document language mismatch for ${interfaceLocale}/${region}/${questionLocale}`);
        }
        if (!(await page.locator("#home-view").isVisible())) throw new Error("Settings did not return to Home");
      }
    }
  }

  // Play and complete a five-question round for each region/question-language pair.
  for (const region of regions) {
    for (const questionLocale of questionLocales) {
      await page.locator("#settings-open").click();
      await page.locator("#interface-locale").selectOption("en-IN");
      await page.locator("#question-region").selectOption(region);
      await page.locator("#question-locale").selectOption(questionLocale);
      await page.locator("#round-length").selectOption("5");
      await page.locator("#settings-save").click();
      await page.locator("#play-button").click();
      if (!(await page.locator("#quiz-view").isVisible())) throw new Error(`Quiz failed to start for ${region}/${questionLocale}`);
      if (await page.locator("#question-title").getAttribute("lang") !== questionLocale) {
        throw new Error(`Question language mismatch for ${region}/${questionLocale}`);
      }
      for (let index = 0; index < 5; index += 1) {
        const answers = page.locator("#answers button.answer-option");
        await answers.first().waitFor({ state: "visible" });
        if (await answers.count() !== 4) throw new Error("Expected exactly four answer options");
        if (await answers.first().locator("span").nth(1).getAttribute("lang") !== questionLocale) {
          throw new Error("Answer option language does not match selected question language");
        }
        await answers.first().click();
        await page.locator("#next-button").click();
      }
      if (!(await page.locator("#result-view").isVisible())) throw new Error(`Results view failed for ${region}/${questionLocale}`);
      if (await page.locator("#answer-review-list article").count() !== 5) {
        throw new Error("Answer review did not contain all five questions");
      }
    }
  }

  if (pageErrors.length) throw new Error("Browser runtime errors: " + pageErrors.join(" | "));
  console.log("Browser smoke passed: home/settings, all 27 independent selector combinations, nine five-question rounds, localized questions/options and answer review.");
} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
