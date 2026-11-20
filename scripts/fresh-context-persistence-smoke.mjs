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
    server.listen(4187, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });

  // Save a deliberately non-default, independent preference set and a scoped score.
  const firstContext = await browser.newContext({ locale:"en-IN" });
  const firstPage = await firstContext.newPage();
  await firstPage.goto("http://127.0.0.1:4187/", { waitUntil:"networkidle" });
  await firstPage.keyboard.press("Escape");
  await firstPage.locator("#launch-splash").waitFor({ state:"detached" });
  await firstPage.locator("#settings-open").click();
  await firstPage.locator("#interface-locale").selectOption("es-ES");
  await firstPage.locator("#question-region").selectOption("PE");
  await firstPage.locator("#question-locale").selectOption("es-PE");
  await firstPage.locator("#round-length").selectOption("5");
  await firstPage.locator("#question-category").selectOption("Science");
  await firstPage.locator("#question-difficulty").selectOption("medium");
  await firstPage.locator("#settings-save").click();
  await firstPage.evaluate(() => {
    localStorage.setItem("mindquest.best.PE.Science.medium.5", JSON.stringify({ score:4, total:5 }));
  });
  const snapshot = await firstContext.storageState();
  await firstContext.close();

  // A completely new browser context restores the exported origin storage snapshot.
  const restartedContext = await browser.newContext({ storageState:snapshot, locale:"en-IN" });
  const restartedPage = await restartedContext.newPage();
  await restartedPage.goto("http://127.0.0.1:4187/", { waitUntil:"networkidle" });
  await restartedPage.keyboard.press("Escape");
  await restartedPage.locator("#launch-splash").waitFor({ state:"detached" });
  const restored = await restartedPage.evaluate(() => ({
    interfaceLocale:document.querySelector("#interface-locale")?.value,
    region:document.querySelector("#question-region")?.value,
    questionLocale:document.querySelector("#question-locale")?.value,
    roundLength:document.querySelector("#round-length")?.value,
    category:document.querySelector("#question-category")?.value,
    difficulty:document.querySelector("#question-difficulty")?.value,
    documentLanguage:document.documentElement.lang,
    bestScore:document.querySelector("#best-score")?.textContent?.trim()
  }));
  const expected = {
    interfaceLocale:"es-ES", region:"PE", questionLocale:"es-PE",
    roundLength:"5", category:"Science", difficulty:"medium",
    documentLanguage:"es-ES", bestScore:"4 / 5 · 80%"
  };
  for (const [key, value] of Object.entries(expected)) {
    if (restored[key] !== value) {
      throw new Error("Fresh-context persistence mismatch for " + key + ": expected " + JSON.stringify(value) + ", received " + JSON.stringify(restored[key]));
    }
  }

  // The restored preferences must actually drive the next round, not merely the Settings UI.
  await restartedPage.locator("#play-button").click();
  const firstQuestion = await restartedPage.locator("#question-title").getAttribute("data-question-id");
  if (!firstQuestion?.startsWith("PE-")) throw new Error("Fresh-context preferences did not select the Peru question bank");
  const questionLocale = await restartedPage.locator("#question-title").getAttribute("lang");
  if (questionLocale !== "es-PE") throw new Error("Fresh-context question language was not applied to gameplay");
  await restartedContext.close();

  console.log("Fresh-context persistence regression passed: independent interface/region/question-language preferences, round length, category, difficulty and scoped best score survived a new browser context and drove the next regional round.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
