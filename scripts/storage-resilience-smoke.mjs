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
    server.listen(4177, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });

  // Malformed preferences must fall back safely without breaking the app.
  const corruptContext = await browser.newContext();
  await corruptContext.addInitScript(() => localStorage.setItem("mindquest.settings", "{broken-json"));
  const corruptPage = await corruptContext.newPage();
  await corruptPage.goto("http://127.0.0.1:4177/", { waitUntil:"networkidle" });
  await corruptPage.keyboard.press("Escape");
  await corruptPage.locator("#launch-splash").waitFor({ state:"detached" });
  if (!(await corruptPage.locator("#home-view").isVisible())) throw new Error("Malformed settings prevented Home from loading");
  await corruptPage.locator("#settings-open").click();
  if (await corruptPage.locator("#interface-locale").inputValue() !== "en-IN") throw new Error("Malformed settings did not fall back to a supported interface locale");
  await corruptContext.close();

  // A blocked localStorage read must be surfaced while gameplay remains usable.
  const blockedReadContext = await browser.newContext();
  await blockedReadContext.addInitScript(() => {
    Storage.prototype.getItem = function () { throw new DOMException("Storage blocked", "SecurityError"); };
  });
  const blockedReadPage = await blockedReadContext.newPage();
  await blockedReadPage.goto("http://127.0.0.1:4177/", { waitUntil:"networkidle" });
  await blockedReadPage.keyboard.press("Escape");
  await blockedReadPage.locator("#launch-splash").waitFor({ state:"detached" });
  if (!(await blockedReadPage.locator("#storage-status").isVisible())) throw new Error("Blocked storage reads were not disclosed to the player");
  if (!(await blockedReadPage.locator("#home-view").isVisible())) throw new Error("Blocked storage reads prevented the app from loading");
  await blockedReadPage.locator("#play-button").click();
  if (!(await blockedReadPage.locator("#quiz-view").isVisible())) throw new Error("Gameplay was unavailable when persistence reads were blocked");
  await blockedReadContext.close();

  // Simulate quota/security failures on writes: the app must remain usable and warn.
  const blockedWriteContext = await browser.newContext();
  await blockedWriteContext.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Storage.prototype.setItem = function (key, value) {
      if (key === "mindquest.settings" || key.startsWith("mindquest.best.")) {
        throw new DOMException("Quota exceeded", "QuotaExceededError");
      }
      return original.call(this, key, value);
    };
  });
  const blockedWritePage = await blockedWriteContext.newPage();
  await blockedWritePage.goto("http://127.0.0.1:4177/", { waitUntil:"networkidle" });
  await blockedWritePage.keyboard.press("Escape");
  await blockedWritePage.locator("#launch-splash").waitFor({ state:"detached" });
  await blockedWritePage.locator("#settings-open").click();
  await blockedWritePage.locator("#question-region").selectOption("RU");
  await blockedWritePage.locator("#settings-save").click();
  if (!(await blockedWritePage.locator("#storage-status").isVisible())) throw new Error("Failed preference writes were not disclosed");
  if (!(await blockedWritePage.locator("#home-view").isVisible())) throw new Error("A failed preference write interrupted navigation");
  await blockedWriteContext.close();

  // Invalid best-score records must be ignored; a legacy ten-question score is migrated.
  const scoreContext = await browser.newContext();
  await scoreContext.addInitScript(() => {
    localStorage.setItem("mindquest.best.IN.all.all.10", JSON.stringify({ score:99, total:10 }));
    localStorage.setItem("mindquest.best.RU.all.all", JSON.stringify({ score:8, total:10 }));
  });
  const scorePage = await scoreContext.newPage();
  await scorePage.goto("http://127.0.0.1:4177/", { waitUntil:"networkidle" });
  await scorePage.keyboard.press("Escape");
  await scorePage.locator("#launch-splash").waitFor({ state:"detached" });
  if (await scorePage.locator("#best-score").textContent() !== "—") throw new Error("Out-of-range best score was accepted");
  await scorePage.locator("#settings-open").click();
  await scorePage.locator("#question-region").selectOption("RU");
  await scorePage.locator("#settings-save").click();
  const migrated = await scorePage.evaluate(() => localStorage.getItem("mindquest.best.RU.all.all.10"));
  if (migrated !== JSON.stringify({ score:8, total:10 })) throw new Error("Legacy ten-question best score was not migrated exactly");
  await scoreContext.close();

  // Score scopes must remain isolated by region, category, difficulty and round length.
  const scopeContext = await browser.newContext();
  await scopeContext.addInitScript(() => {
    localStorage.setItem("mindquest.best.IN.all.all.5", JSON.stringify({ score:4, total:5 }));
    localStorage.setItem("mindquest.best.US.all.all.5", JSON.stringify({ score:2, total:5 }));
  });
  const scopePage = await scopeContext.newPage();
  await scopePage.goto("http://127.0.0.1:4177/", { waitUntil:"networkidle" });
  await scopePage.keyboard.press("Escape");
  await scopePage.locator("#launch-splash").waitFor({ state:"detached" });
  if (await scopePage.locator("#best-score").textContent() !== "—") throw new Error("Default ten-question scope leaked a five-question score");
  await scopePage.locator("#settings-open").click();
  await scopePage.locator("#round-length").selectOption("5");
  await scopePage.locator("#settings-save").click();
  if (await scopePage.locator("#best-score").textContent() !== "4 / 5 · 80%") throw new Error("Five-question score scope was not loaded");
  await scopePage.locator("#settings-open").click();
  await scopePage.locator("#question-region").selectOption("US");
  await scopePage.locator("#settings-save").click();
  if (await scopePage.locator("#best-score").textContent() !== "2 / 5 · 40%") throw new Error("Region-specific best score isolation failed");
  await scopeContext.close();

  console.log("Storage resilience regression passed: malformed settings fallback, blocked reads, quota/write failures, invalid score rejection, legacy score migration and region/round-length score isolation.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
