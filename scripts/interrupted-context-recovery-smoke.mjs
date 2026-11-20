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
    response.writeHead(200, { "content-type":mime[extname(file)] || "application/octet-stream" });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end("Not found"); }
});

let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4193, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });

  // Seed a legitimate score and configure independent preferences.
  const firstContext = await browser.newContext({ locale:"en-IN" });
  const firstPage = await firstContext.newPage();
  await firstPage.goto("http://127.0.0.1:4193/", { waitUntil:"networkidle" });
  await firstPage.keyboard.press("Escape");
  await firstPage.locator("#launch-splash").waitFor({ state:"detached" });
  await firstPage.evaluate(() => localStorage.setItem("mindquest.best.PE.Science.medium.5", JSON.stringify({ score:3, total:5 })));
  await firstPage.locator("#settings-open").click();
  await firstPage.locator("#interface-locale").selectOption("es-PE");
  await firstPage.locator("#question-region").selectOption("PE");
  await firstPage.locator("#question-locale").selectOption("es-PE");
  await firstPage.locator("#round-length").selectOption("5");
  await firstPage.locator("#question-category").selectOption("Science");
  await firstPage.locator("#question-difficulty").selectOption("medium");
  await firstPage.locator("#settings-save").click();

  // Start a round, answer one question, then simulate process termination.
  await firstPage.locator("#play-button").click();
  const interruptedId = await firstPage.locator("#question-title").getAttribute("data-question-id");
  if (!interruptedId?.startsWith("PE-")) throw new Error("Configured round did not start from Peru");
  if (await firstPage.locator("#question-title").getAttribute("lang") !== "es-PE") throw new Error("Configured question locale was not applied");
  await firstPage.locator("#answers button[role=radio]").first().click();
  if (await firstPage.locator("#answers button[role=radio]:disabled").count() !== 4) throw new Error("Round interruption setup did not lock the selected answer");
  const storageState = await firstContext.storageState();
  await firstContext.close();

  // Recreate the browser context from persisted origin data.
  const restartedContext = await browser.newContext({ storageState, locale:"en-IN" });
  const restartedPage = await restartedContext.newPage();
  const runtimeErrors = [];
  restartedPage.on("pageerror", error => runtimeErrors.push(error.message));
  await restartedPage.goto("http://127.0.0.1:4193/", { waitUntil:"networkidle" });
  await restartedPage.keyboard.press("Escape");
  await restartedPage.locator("#launch-splash").waitFor({ state:"detached" });

  const recovered = await restartedPage.evaluate(() => ({
    activeViews:[...document.querySelectorAll(".view")].filter(view => view.classList.contains("active") && !view.hidden).map(view => view.id),
    interfaceLocale:document.querySelector("#interface-locale")?.value,
    region:document.querySelector("#question-region")?.value,
    questionLocale:document.querySelector("#question-locale")?.value,
    roundLength:document.querySelector("#round-length")?.value,
    category:document.querySelector("#question-category")?.value,
    difficulty:document.querySelector("#question-difficulty")?.value,
    bestScore:document.querySelector("#best-score")?.textContent?.trim(),
    answerControls:document.querySelectorAll("#answers button").length,
    reviewEntries:document.querySelectorAll("#answer-review-list article").length,
    persistedSettings:JSON.parse(localStorage.getItem("mindquest.settings") || "null"),
    persistedScore:localStorage.getItem("mindquest.best.PE.Science.medium.5")
  }));
  const expected = {
    interfaceLocale:"es-PE", region:"PE", questionLocale:"es-PE",
    roundLength:"5", category:"Science", difficulty:"medium", bestScore:"3 / 5 · 60%"
  };
  for (const [key, value] of Object.entries(expected)) {
    if (recovered[key] !== value) throw new Error("Recovery mismatch for " + key + ": " + JSON.stringify(recovered[key]));
  }
  if (recovered.activeViews.length !== 1 || recovered.activeViews[0] !== "home-view" ||
      recovered.answerControls !== 0 || recovered.reviewEntries !== 0) {
    throw new Error("Interrupted round leaked transient gameplay state after context restart: " + JSON.stringify(recovered));
  }
  if (recovered.persistedScore !== JSON.stringify({ score:3,total:5 })) {
    throw new Error("Interrupted round overwrote or corrupted the previous best-score record");
  }

  // Verify keyboard focus restoration after a navigation round-trip post-restart.
  await restartedPage.locator("#settings-open").click();
  if (await restartedPage.evaluate(() => document.activeElement?.id) !== "settings-title") {
    throw new Error("Settings navigation did not focus its destination heading after restart");
  }
  await restartedPage.locator("#settings-back").click();
  if (await restartedPage.evaluate(() => document.activeElement?.id) !== "home-title") {
    throw new Error("Returning Home did not restore focus to the Home heading after restart");
  }

  // A new round must use the restored independent settings rather than stale defaults.
  await restartedPage.locator("#play-button").click();
  const newRound = await restartedPage.evaluate(() => ({
    id:document.querySelector("#question-title")?.getAttribute("data-question-id"),
    lang:document.querySelector("#question-title")?.lang,
    optionLangs:[...document.querySelectorAll("#answers button[role=radio] span:not(.letter)")].map(node => node.lang)
  }));
  if (!newRound.id?.startsWith("PE-") || newRound.lang !== "es-PE" || newRound.optionLangs.some(lang => lang !== "es-PE")) {
    throw new Error("New round did not use restored Peru/Spanish settings: " + JSON.stringify(newRound));
  }
  if (runtimeErrors.length) throw new Error("Runtime errors after context restart: " + runtimeErrors.join(" | "));
  await restartedContext.close();

  console.log("Interrupted-round recovery matrix passed: process-like context termination discards transient answers/review, preserves independent settings and prior best score, restores navigation focus, and applies settings to the next round.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
