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

const themes = ["obsidian","midnight","aurora","ocean","forest","ember","royal","rose","sand","paper"];
const viewports = [
  { width:320, height:720, name:"compact phone" },
  { width:390, height:844, name:"phone" },
  { width:768, height:1024, name:"tablet portrait" },
  { width:1366, height:768, name:"desktop" }
];
let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4178, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));

  for (const viewport of viewports) {
    await page.setViewportSize({ width:viewport.width, height:viewport.height });
    await page.goto("http://127.0.0.1:4178/", { waitUntil:"networkidle" });
    await page.keyboard.press("Escape");
    await page.locator("#launch-splash").waitFor({ state:"detached" });

    for (const theme of themes) {
      await page.locator("#theme-open").click();
      await page.locator("#theme-select").selectOption(theme);
      const applied = await page.evaluate(() => ({
        theme:document.documentElement.dataset.theme,
        background:getComputedStyle(document.documentElement).getPropertyValue("--bg").trim(),
        text:getComputedStyle(document.documentElement).getPropertyValue("--text").trim(),
        stored:localStorage.getItem("mindquest.theme")
      }));
      if (applied.theme !== theme || applied.stored !== theme || !applied.background || !applied.text) {
        throw new Error(viewport.name + ": theme did not apply/persist correctly: " + JSON.stringify({ theme, applied }));
      }
      const home = await page.evaluate(() => ({
        viewport:document.documentElement.clientWidth,
        document:document.documentElement.scrollWidth,
        body:document.body.scrollWidth,
        brand:document.querySelector(".brand").getBoundingClientRect().toJSON(),
        actions:document.querySelector(".topbar-actions").getBoundingClientRect().toJSON()
      }));
      if (home.document > home.viewport || home.body > home.viewport || home.brand.right > home.actions.left + 1) {
        throw new Error(viewport.name + ": Home layout failed under " + theme + ": " + JSON.stringify(home));
      }
      await page.locator("#theme-open").click();
    }

    // Settings and gameplay remain usable with each accessibility preference enabled.
    await page.locator("#settings-open").click();
    for (const [id, className] of [
      ["#setting-large-text","large-text"],
      ["#setting-reduced-motion","user-reduced-motion"],
      ["#setting-high-contrast","user-high-contrast"]
    ]) {
      const control = page.locator(id);
      if (!(await control.isVisible())) throw new Error(viewport.name + ": accessibility control is not visible: " + id);
      await control.check();
      if (!(await page.locator("html").evaluate((node, name) => node.classList.contains(name), className))) {
        throw new Error(viewport.name + ": accessibility mode did not apply: " + className);
      }
    }
    await page.locator("#settings-save").click();
    await page.locator("#play-button").click();
    const quiz = await page.evaluate(() => ({
      viewport:document.documentElement.clientWidth,
      document:document.documentElement.scrollWidth,
      question:document.querySelector("#question-title").getBoundingClientRect().toJSON(),
      answers:document.querySelector("#answers").getBoundingClientRect().toJSON()
    }));
    if (quiz.document > quiz.viewport || quiz.question.right > quiz.viewport + 1 || quiz.answers.right > quiz.viewport + 1) {
      throw new Error(viewport.name + ": Quiz overflow with accessibility modes enabled: " + JSON.stringify(quiz));
    }
    await page.locator("#brand-home").click();
    await page.reload({ waitUntil:"networkidle" });
    await page.keyboard.press("Escape");
    await page.locator("#launch-splash").waitFor({ state:"detached" });
    const persisted = await page.evaluate(() => ({
      theme:document.documentElement.dataset.theme,
      large:document.documentElement.classList.contains("large-text"),
      reduced:document.documentElement.classList.contains("user-reduced-motion"),
      contrast:document.documentElement.classList.contains("user-high-contrast")
    }));
    if (persisted.theme !== "sand" || !persisted.large || !persisted.reduced || !persisted.contrast) {
      throw new Error(viewport.name + ": theme/accessibility preferences did not survive reload: " + JSON.stringify(persisted));
    }
    console.log("PASS " + viewport.name + " — " + viewport.width + "×" + viewport.height + "; 10 themes and 3 accessibility modes");
  }

  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Theme/accessibility responsive matrix passed: " + themes.length + " themes × " + viewports.length + " viewport profiles, accessibility mode application, quiz layout and preference persistence.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
