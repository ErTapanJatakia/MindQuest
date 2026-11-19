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
    server.listen(4184, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });

  // Settings and accessibility preferences must survive an ordinary browser restart/reload.
  const persistent = await browser.newContext({ locale:"en-IN" });
  const page = await persistent.newPage();
  await page.goto("http://127.0.0.1:4184/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });
  await page.locator("#settings-open").click();
  await page.locator("#interface-locale").selectOption("es-ES");
  await page.locator("#question-region").selectOption("PE");
  await page.locator("#question-locale").selectOption("es-PE");
  await page.locator("#round-length").selectOption("15");
  await page.locator("#question-category").selectOption("Science");
  await page.locator("#question-difficulty").selectOption("medium");
  await page.locator("#settings-save").click();
  await page.locator("#settings-open").click();
  await page.locator("#setting-large-text").check();
  await page.locator("#setting-reduced-motion").check();
  await page.locator("#settings-back").click();
  await page.reload({ waitUntil:"networkidle" });
  await page.locator("#splash-dismiss").click();
  await page.locator("#settings-open").click();
  const restored = await page.evaluate(() => ({
    interfaceLocale:document.querySelector("#interface-locale").value,
    region:document.querySelector("#question-region").value,
    questionLocale:document.querySelector("#question-locale").value,
    roundLength:document.querySelector("#round-length").value,
    category:document.querySelector("#question-category").value,
    difficulty:document.querySelector("#question-difficulty").value,
    documentLanguage:document.documentElement.lang,
    largeText:document.documentElement.classList.contains("large-text"),
    reducedMotion:document.documentElement.classList.contains("user-reduced-motion")
  }));
  if (restored.interfaceLocale !== "es-ES" || restored.region !== "PE" ||
      restored.questionLocale !== "es-PE" || restored.roundLength !== "15" ||
      restored.category !== "Science" || restored.difficulty !== "medium" ||
      restored.documentLanguage !== "es-ES" || !restored.largeText || !restored.reducedMotion) {
    throw new Error("Persisted preferences were not restored exactly: " + JSON.stringify(restored));
  }
  await persistent.close();

  // A reload during a partially answered round must discard transient gameplay state.
  const interrupted = await browser.newContext({ locale:"en-IN" });
  const interruptedPage = await interrupted.newPage();
  await interruptedPage.goto("http://127.0.0.1:4184/", { waitUntil:"networkidle" });
  await interruptedPage.keyboard.press("Escape");
  await interruptedPage.locator("#launch-splash").waitFor({ state:"detached" });
  await interruptedPage.locator("#play-button").click();
  const interruptedId = await interruptedPage.locator("#question-title").getAttribute("data-question-id");
  if (!interruptedId?.startsWith("IN-")) throw new Error("Interrupted-round setup did not start an India question");
  await interruptedPage.locator("#answers button[role=radio]").first().click();
  await interruptedPage.reload({ waitUntil:"networkidle" });
  await interruptedPage.locator("#splash-dismiss").click();
  if (!(await interruptedPage.locator("#home-view").isVisible())) throw new Error("Reload did not recover to Home after interrupted gameplay");
  if (await interruptedPage.locator("#quiz-view").isVisible()) throw new Error("Interrupted quiz view was unexpectedly restored");
  if (await interruptedPage.locator("#answers button").count() !== 0) throw new Error("Interrupted answer controls were unexpectedly restored");
  if (await interruptedPage.locator("#best-score").textContent() !== "—") throw new Error("Incomplete round was incorrectly persisted as a best score");
  await interrupted.close();

  // Removing site data must return the app to supported defaults without a crash.
  const cleared = await browser.newContext({ locale:"en-IN" });
  const clearedPage = await cleared.newPage();
  await clearedPage.goto("http://127.0.0.1:4184/", { waitUntil:"networkidle" });
  await clearedPage.keyboard.press("Escape");
  await clearedPage.locator("#launch-splash").waitFor({ state:"detached" });
  await clearedPage.locator("#settings-open").click();
  await clearedPage.locator("#question-region").selectOption("ES");
  await clearedPage.locator("#settings-save").click();
  await clearedPage.evaluate(() => localStorage.clear());
  await clearedPage.reload({ waitUntil:"networkidle" });
  await clearedPage.locator("#splash-dismiss").click();
  await clearedPage.locator("#settings-open").click();
  const defaults = await clearedPage.evaluate(() => ({
    region:document.querySelector("#question-region").value,
    questionLocale:document.querySelector("#question-locale").value,
    roundLength:document.querySelector("#round-length").value,
    category:document.querySelector("#question-category").value,
    difficulty:document.querySelector("#question-difficulty").value
  }));
  if (defaults.region !== "IN" || defaults.questionLocale !== "en-IN" ||
      defaults.roundLength !== "10" || defaults.category !== "all" || defaults.difficulty !== "all") {
    throw new Error("Cleared storage did not restore safe defaults: " + JSON.stringify(defaults));
  }
  await clearedPage.locator("#settings-back").click();
  await clearedPage.locator("#play-button").click();
  if (!(await clearedPage.locator("#quiz-view").isVisible())) throw new Error("Gameplay failed after site-data reset");
  await cleared.close();

  console.log("Application lifecycle regression passed: six independent settings, accessibility preference persistence, interrupted-round discard, no incomplete score persistence, cleared-site-data defaults and post-reset gameplay.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
