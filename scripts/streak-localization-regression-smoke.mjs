import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("app");
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".svg":"image/svg+xml" };
const interfaces = [
  { locale:"en-IN", summary:"Best streak this round: 2" },
  { locale:"en-US", summary:"Best streak this round: 2" },
  { locale:"ru-RU", summary:"Лучшая серия за раунд: 2" },
  { locale:"es-ES", summary:"Mejor racha de esta ronda: 2" },
  { locale:"es-PE", summary:"Mejor racha de esta ronda: 2" }
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
    server.listen(4186, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:4186/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });

  for (const { locale, summary } of interfaces) {
    await page.locator("#settings-open").click();
    await page.locator("#interface-locale").selectOption(locale);
    await page.locator("#question-region").selectOption("IN");
    await page.locator("#question-locale").selectOption("en-IN");
    await page.locator("#round-length").selectOption("5");
    await page.locator("#question-category").selectOption("all");
    await page.locator("#question-difficulty").selectOption("all");
    await page.locator("#settings-save").click();

    const streak = page.locator("#streak-value");
    if (await streak.getAttribute("aria-live") !== "polite" || await streak.getAttribute("aria-atomic") !== "true") {
      throw new Error(locale + ": current streak is not exposed as an atomic polite live announcement");
    }
    await page.locator("#play-button").click();
    const expectedCurrent = [1, 2, 0, 1, 2];
    for (let index = 0; index < 5; index += 1) {
      const id = await page.locator("#question-title").getAttribute("data-question-id");
      const correctKey = await page.evaluate(questionId =>
        window.MINDQUEST_QUESTIONS.find(item => item.id === questionId)?.correct, id);
      if (!correctKey) throw new Error(locale + ": missing canonical answer key for " + id);
      const selectedKey = index === 2
        ? ["a", "b", "c", "d"].find(key => key !== correctKey)
        : correctKey;
      await page.locator('#answers button[role="radio"][data-answer="' + selectedKey + '"]').click();
      const actual = await streak.textContent();
      if (actual !== String(expectedCurrent[index])) {
        throw new Error(locale + ": streak after answer " + (index + 1) + " expected " + expectedCurrent[index] + ", received " + actual);
      }
      if (await page.locator('#answers button[aria-checked="true"]').count() !== 1) {
        throw new Error(locale + ": answer selection did not remain exclusive");
      }
      await page.locator("#next-button").click();
    }

    if (!(await page.locator("#result-view.active").isVisible())) throw new Error(locale + ": completed round did not reach Results");
    if (await page.locator("#final-score").textContent() !== "4/5") throw new Error(locale + ": expected canonical score 4/5");
    const resultMessage = await page.locator("#result-message").textContent();
    if (!resultMessage.includes(summary)) {
      throw new Error(locale + ": localized best-streak summary mismatch; expected " + summary + ", received " + resultMessage);
    }
    await page.locator("#replay-button").click();
    if (await streak.textContent() !== "0") throw new Error(locale + ": replay did not reset the current streak");
    await page.locator("#settings-open").click();
    await page.locator("#settings-save").click();
  }

  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Five-locale streak regression passed: 25 questions across five interface locales; correct answers increment, an incorrect answer resets the current streak, best streak remains accurate in localized Results, polite live announcements remain configured, and replay resets transient streak state.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
