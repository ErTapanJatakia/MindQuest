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
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:4177/", { waitUntil:"networkidle" });

  // The launch dialog traps keyboard focus and the app remains inert until dismissed.
  if (!(await page.locator(".app-shell").evaluate(node => node.inert && node.getAttribute("aria-hidden")==="true"))) {
    throw new Error("Launch dialog did not isolate the application from assistive technology");
  }
  await page.keyboard.press("Tab");
  if (await page.evaluate(() => document.activeElement?.id) !== "splash-dismiss") {
    throw new Error("Launch dialog did not retain focus on its sole action");
  }
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });
  if (await page.evaluate(() => document.activeElement?.id) !== "home-title") {
    throw new Error("Dismissed launch dialog did not return focus to the Home heading");
  }

  // View transitions must announce context by moving focus to the destination heading.
  for (const [trigger, heading, back] of [
    ["#settings-open", "settings-title", "#settings-back"],
    ["#home-help", "help-title", "#help-back"],
    ["#privacy-link", "privacy-title", "#privacy-back"],
    ["#accessibility-link", "accessibility-title", "#accessibility-back"]
  ]) {
    await page.locator(trigger).click();
    if (await page.evaluate(() => document.activeElement?.id) !== heading) {
      throw new Error("View transition did not focus its heading: " + heading);
    }
    await page.locator(back).click();
    if (await page.evaluate(() => document.activeElement?.id) !== "home-title") {
      throw new Error("Back navigation did not restore Home context after " + heading);
    }
  }

  // All accessibility controls must apply their preference and persist it across reload.
  await page.locator("#settings-open").click();
  const settingsHeading = await page.locator("#settings-title").getAttribute("tabindex");
  if (settingsHeading !== "-1") throw new Error("Settings heading is not programmatically focusable");
  const searchInputs = ["#interface-locale-search","#question-region-search","#question-locale-search","#question-category-search"];
  for (const selector of searchInputs) {
    const input = page.locator(selector);
    if (!(await input.isVisible()) || !(await input.getAttribute("aria-label"))) {
      throw new Error("Searchable setting lacks a visible accessible name: " + selector);
    }
  }
  await page.locator("#settings-back").click();
  await page.locator("#settings-open").click();
  await page.locator("#setting-large-text").check();
  await page.locator("#setting-reduced-motion").check();
  await page.locator("#setting-high-contrast").check();
  const applied = await page.evaluate(() => ({
    large:document.documentElement.classList.contains("large-text"),
    reduced:document.documentElement.classList.contains("user-reduced-motion"),
    contrast:document.documentElement.classList.contains("user-high-contrast")
  }));
  if (!applied.large || !applied.reduced || !applied.contrast) {
    throw new Error("Accessibility preferences did not apply their corresponding document modes");
  }
  const motionDuration = await page.locator("#settings-view").evaluate(node => getComputedStyle(node).transitionDuration);
  if (!motionDuration.split(",").every(value => parseFloat(value) <= 0.011)) {
    throw new Error("Reduced-motion preference did not suppress transitions: " + motionDuration);
  }
  await page.locator("#settings-back").click();
  await page.reload({ waitUntil:"networkidle" });
  await page.locator("#splash-dismiss").click();
  const persisted = await page.evaluate(() => ({
    large:document.documentElement.classList.contains("large-text"),
    reduced:document.documentElement.classList.contains("user-reduced-motion"),
    contrast:document.documentElement.classList.contains("user-high-contrast")
  }));
  if (!persisted.large || !persisted.reduced || !persisted.contrast) {
    throw new Error("Accessibility preferences did not survive application reload");
  }

  // Theme control keyboard operation and theme palette persistence.
  await page.locator("#theme-open").focus();
  await page.keyboard.press("Enter");
  if (await page.locator("#theme-open").getAttribute("aria-expanded") !== "true" ||
      await page.evaluate(() => document.activeElement?.id) !== "theme-select") {
    throw new Error("Keyboard activation did not open and focus the theme selector");
  }
  await page.locator("#theme-select").selectOption("paper");
  await page.keyboard.press("Escape");
  if (await page.locator("#theme-open").getAttribute("aria-expanded") !== "false" ||
      await page.evaluate(() => document.activeElement?.id) !== "theme-open") {
    throw new Error("Escape did not close theme selection and restore focus");
  }
  await page.reload({ waitUntil:"networkidle" });
  await page.locator("#splash-dismiss").click();
  if (await page.locator("html").getAttribute("data-theme") !== "paper") {
    throw new Error("Selected theme did not survive reload");
  }

  // Forced-colors and OS reduced-motion media preferences must retain usable controls.
  await page.emulateMedia({ forcedColors:"active", reducedMotion:"reduce" });
  const forced = await page.locator("#theme-open").evaluate(node => {
    const style = getComputedStyle(node);
    return { outlineStyle:style.outlineStyle, outlineWidth:style.outlineWidth, display:style.display };
  });
  if (forced.display === "none") throw new Error("Theme control disappeared in forced-colors mode");
  const splashForced = await page.locator(".app-shell").evaluate(node => {
    const style = getComputedStyle(document.querySelector(".app-shell"));
    return { visibility:style.visibility, display:style.display };
  });
  if (splashForced.display === "none" || splashForced.visibility === "hidden") {
    throw new Error("Application content became unavailable in forced-colors mode");
  }

  // Verify one-question keyboard radio movement selects and focuses the next option.
  await page.emulateMedia({ forcedColors:"none", reducedMotion:"no-preference" });
  await page.locator("#play-button").click();
  if (await page.evaluate(() => document.activeElement?.id) !== "question-title") {
    throw new Error("Starting a round did not focus the question heading");
  }
  const first = page.locator("#answers button[role=radio]").first();
  await first.focus();
  await page.keyboard.press("ArrowRight");
  if (await page.locator('#answers button[role=radio][aria-checked="true"]').count() !== 1) {
    throw new Error("Arrow navigation did not select exactly one answer");
  }
  if (await page.evaluate(() => document.activeElement?.id) !== "next-button") {
    throw new Error("Keyboard answer selection did not move focus to the Next action");
  }
  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Accessibility regression passed: modal launch focus isolation, destination-heading focus, accessible searchable settings, large text/reduced motion/high contrast persistence, keyboard-operable theme selection, forced-colors availability, and arrow-key radio navigation.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
