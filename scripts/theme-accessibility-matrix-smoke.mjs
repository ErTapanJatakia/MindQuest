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
  { width:320, height:720, name:"compact phone portrait" },
  { width:360, height:800, name:"small phone portrait" },
  { width:390, height:844, name:"modern phone portrait" },
  { width:414, height:896, name:"large phone portrait" },
  { width:720, height:320, name:"compact phone landscape" },
  { width:800, height:360, name:"small phone landscape" },
  { width:844, height:390, name:"modern phone landscape" },
  { width:896, height:414, name:"large phone landscape" },
  { width:768, height:1024, name:"tablet portrait" },
  { width:1024, height:768, name:"tablet landscape" },
  { width:1280, height:720, name:"wide desktop" },
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
      await page.locator("#settings-open").click();
      await page.locator("#theme-select").selectOption(theme);
      await page.locator("#settings-back").click();
      const applied = await page.evaluate(() => ({
        theme:document.documentElement.dataset.theme,
        background:getComputedStyle(document.documentElement).getPropertyValue("--bg").trim(),
        text:getComputedStyle(document.documentElement).getPropertyValue("--text").trim(),
        stored:localStorage.getItem("mindquest.theme"),
        contrast:getComputedStyle(document.documentElement).getPropertyValue("--muted").trim(),
        accent:getComputedStyle(document.documentElement).getPropertyValue("--accent").trim(),
        accent2:getComputedStyle(document.documentElement).getPropertyValue("--accent2").trim(),
        panel:getComputedStyle(document.documentElement).getPropertyValue("--panel").trim(),
        primaryBackground:getComputedStyle(document.querySelector(".primary-button")).backgroundColor,
        primaryForeground:getComputedStyle(document.querySelector(".primary-button")).color
      }));
      if (applied.theme !== theme || applied.stored !== theme || !applied.background || !applied.text) {
        throw new Error(viewport.name + ": theme did not apply/persist correctly: " + JSON.stringify({ theme, applied }));
      }
      const contrast = await page.evaluate(() => {
        const rgb = value => {
          const match = value.match(/^#([0-9a-f]{6})$/i);
          if (match) return [0,2,4].map(index => parseInt(match[1].slice(index,index+2),16));
          const parts = value.match(/[\d.]+/g);
          return parts && parts.length >= 3 ? parts.slice(0,3).map(Number) : null;
        };
        const luminance = value => {
          const channels = rgb(value);
          if (!channels) return null;
          const linear = channels.map(channel => {
            const normalized = channel / 255;
            return normalized <= 0.04045 ? normalized / 12.92 : Math.pow((normalized + 0.055) / 1.055, 2.4);
          });
          return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
        };
        const ratio = (foreground, background) => {
          const a=luminance(foreground), b=luminance(background);
          if (a===null || b===null) return null;
          return (Math.max(a,b)+0.05)/(Math.min(a,b)+0.05);
        };
        const root=getComputedStyle(document.documentElement);
        const token=name=>root.getPropertyValue(name).trim();
        const primary=getComputedStyle(document.querySelector(".primary-button"));
        const checks = {
          primaryAction:ratio(primary.color,primary.backgroundColor),
          bodyTextOnBackground:ratio(token("--text"),token("--bg")),
          bodyTextOnPanel:ratio(token("--text"),token("--panel")),
          mutedTextOnBackground:ratio(token("--muted"),token("--bg")),
          mutedTextOnPanel:ratio(token("--muted"),token("--panel")),
          accentTextOnBackground:ratio(token("--accent"),token("--bg")),
          accentTextOnPanel:ratio(token("--accent"),token("--panel")),
          focusAccentOnPanel:ratio(token("--accent2"),token("--panel"))
        };
        return checks;
      });
      for (const [name,value] of Object.entries(contrast)) {
        if (value===null || value < 4.5) throw new Error(viewport.name + ": " + theme + " contrast failure for " + name + ": " + value + " (WCAG AA normal-text threshold 4.5:1)");
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
    const roundLength = Number(await page.locator("#round-length").inputValue().catch(() => "5"));
    const expectedQuestions = Number.isFinite(roundLength) && roundLength > 0 ? roundLength : 5;
    for (let index=0; index<expectedQuestions; index+=1) {
      const answers=page.locator("#answers button[role=radio]");
      if (!(await answers.count())) throw new Error(viewport.name + ": answer controls missing at question " + (index+1));
      await answers.first().click();
      const next=page.locator("#next-button");
      await next.waitFor({state:"visible"});
      if (await next.isDisabled()) throw new Error(viewport.name + ": Next action remained disabled after answer selection");
      await next.click();
    }
    await page.locator("#result-view.active").waitFor({state:"visible"});
    const resultLayout=await page.evaluate(() => {
      const rect=selector=>{
        const node=document.querySelector(selector);
        if (!node) return null;
        const value=node.getBoundingClientRect();
        return {left:value.left,right:value.right,width:value.width};
      };
      return {
        viewport:document.documentElement.clientWidth,
        document:document.documentElement.scrollWidth,
        body:document.body.scrollWidth,
        title:rect("#result-title"),
        score:rect(".score-ring"),
        review:rect("#answer-review-list"),
        actions:rect(".result-actions"),
        cards:[...document.querySelectorAll(".review-card")].map(node=>{
          const value=node.getBoundingClientRect();
          return {left:value.left,right:value.right};
        })
      };
    });
    if (resultLayout.document>resultLayout.viewport || resultLayout.body>resultLayout.viewport ||
        [resultLayout.title,resultLayout.score,resultLayout.review,resultLayout.actions].some(rect=>!rect || rect.left < -1 || rect.right > resultLayout.viewport+1) ||
        resultLayout.cards.length!==expectedQuestions ||
        resultLayout.cards.some(rect=>rect.left < -1 || rect.right > resultLayout.viewport+1)) {
      throw new Error(viewport.name + ": Results/review layout failed with all accessibility modes enabled: " + JSON.stringify(resultLayout));
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
    if (persisted.theme !== "paper" || !persisted.large || !persisted.reduced || !persisted.contrast) {
      throw new Error(viewport.name + ": theme/accessibility preferences did not survive reload: " + JSON.stringify(persisted));
    }
    console.log("PASS " + viewport.name + " — " + viewport.width + "×" + viewport.height + "; 10 themes and 3 accessibility modes");
  }

  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Theme/accessibility matrix passed: " + themes.length + " themes × " + viewports.length + " viewport profiles; semantic colour-token and primary-action contrast ≥4.5:1, all accessibility preferences, complete quiz rounds, Results/review layout and persistence.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
