import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("app");
const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".svg":"image/svg+xml" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const file = resolve(root, relative);
    if (file !== root && !file.startsWith(root + sep)) return response.writeHead(403).end("Forbidden");
    response.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end("Not found"); }
});

let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4174, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless: true });
  const cases = [
    { width:320, height:720, name:"compact phone" },
    { width:360, height:800, name:"small phone" },
    { width:390, height:844, name:"modern phone" },
    { width:414, height:896, name:"large phone" },
    { width:768, height:1024, name:"tablet portrait" },
    { width:1024, height:768, name:"tablet landscape" },
    { width:1366, height:768, name:"desktop" },
    { width:720, height:320, name:"compact phone landscape" },
    { width:800, height:360, name:"small phone landscape" },
    { width:844, height:390, name:"modern phone landscape" },
    { width:896, height:414, name:"large phone landscape" },
    { width:1280, height:720, name:"wide desktop" }
  ];
  for (const device of cases) {
    const page = await browser.newPage({ viewport: { width:device.width, height:device.height } });
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.goto("http://127.0.0.1:4174/", { waitUntil:"networkidle" });
    await page.keyboard.press("Escape");
    await page.locator("#launch-splash").waitFor({ state:"detached" });
    const home = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      body: document.body.scrollWidth,
      brand: document.querySelector(".brand").getBoundingClientRect().toJSON(),
      actions: document.querySelector(".topbar-actions").getBoundingClientRect().toJSON(),
      heroEyebrow: (() => {
        const range = document.createRange();
        range.selectNodeContents(document.querySelector(".hero .eyebrow"));
        return range.getBoundingClientRect().toJSON();
      })(),
      heroTitle: document.querySelector("#home-title").getBoundingClientRect().toJSON(),
      heroCopy: document.querySelector(".hero-copy").getBoundingClientRect().toJSON(),
      heroOrbit: document.querySelector(".hero-orbit").getBoundingClientRect().toJSON(),
      heroActions: [...document.querySelectorAll("#play-button, #home-help")].map(node => node.getBoundingClientRect().toJSON())
    }));
    const overlaps = (a, b) => a.width > 0 && a.height > 0 && b.width > 0 && b.height > 0 &&
      a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    if (home.document > home.viewport || home.body > home.viewport) throw new Error(device.name + ": horizontal overflow at Home " + JSON.stringify(home));
    if (device.width >= 768) {
      const tabletLayout = await page.evaluate(() => ({
        shellWidth: document.querySelector(".app-shell").getBoundingClientRect().width,
        homeDisplay: getComputedStyle(document.querySelector("#home-view")).display
      }));
      if (tabletLayout.shellWidth <= 680 || tabletLayout.homeDisplay !== "grid") {
        throw new Error(device.name + ": tablet Home did not adopt the expanded layout " + JSON.stringify(tabletLayout));
      }
    }
    if (home.brand.right > home.actions.left + 1) throw new Error(device.name + ": brand overlaps header actions " + JSON.stringify(home));
    const heroText = [home.heroEyebrow, home.heroTitle, home.heroCopy];
    if (heroText.some(rect => overlaps(rect, home.heroOrbit)) ||
        home.heroActions.some(rect => overlaps(rect, home.heroOrbit))) {
      throw new Error(device.name + ": decorative hero orbit overlaps readable text or actions " + JSON.stringify(home));
    }
    await page.locator("#settings-open").click();
    const settings = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      controls: [...document.querySelectorAll("#settings-view select, #settings-view input")].map(node => {
        const rect = node.getBoundingClientRect();
        return { id:node.id, left:rect.left, right:rect.right, width:rect.width };
      })
    }));
    if (settings.document > settings.viewport) throw new Error(device.name + ": horizontal overflow in Settings " + JSON.stringify(settings));
    if (device.width >= 768) {
      const columns = await page.locator("#settings-view").evaluate(node => getComputedStyle(node).gridTemplateColumns.split(" ").length);
      if (columns < 2) throw new Error(device.name + ": tablet Settings did not use two columns");
    }
    for (const control of settings.controls) {
      if (control.width > 0 && (control.left < -1 || control.right > settings.viewport + 1)) {
        throw new Error(device.name + ": control " + control.id + " escapes viewport " + JSON.stringify(control));
      }
    }
    await page.locator("#settings-back").click();
    await page.locator("#play-button").click();
    const quiz = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
      question: document.querySelector("#question-title").getBoundingClientRect().toJSON(),
      answers: document.querySelector("#answers").getBoundingClientRect().toJSON()
    }));
    if (device.width >= 768) {
      const answerColumns = await page.locator("#answers").evaluate(node => getComputedStyle(node).gridTemplateColumns.split(" ").length);
      if (answerColumns < 2) throw new Error(device.name + ": tablet Quiz answers did not use two columns");
    }
    if (quiz.document > quiz.viewport || quiz.question.right > quiz.viewport + 1 || quiz.answers.right > quiz.viewport + 1) {
      throw new Error(device.name + ": quiz content overflows viewport " + JSON.stringify(quiz));
    }

    // Complete a full round so Results and the per-question review are included in the same viewport profile.
    const roundLength = Number(await page.locator("#round-length").inputValue().catch(() => "5"));
    const expectedQuestions = Number.isFinite(roundLength) && roundLength > 0 ? roundLength : 5;
    for (let index = 0; index < expectedQuestions; index += 1) {
      const answers = page.locator("#answers button[role=radio]");
      if (!(await answers.count())) throw new Error(device.name + ": answer controls missing at question " + (index + 1));
      await answers.first().click();
      const next = page.locator("#next-button");
      await next.waitFor({ state:"visible" });
      if (await next.isDisabled()) throw new Error(device.name + ": Next action stayed disabled after an answer");
      await next.click();
    }
    await page.locator("#result-view.active").waitFor({ state:"visible" });
    const results = await page.evaluate(() => {
      const rect = selector => {
        const node = document.querySelector(selector);
        if (!node) return null;
        const value = node.getBoundingClientRect();
        return { left:value.left, right:value.right, top:value.top, bottom:value.bottom, width:value.width, height:value.height };
      };
      return {
        viewport:document.documentElement.clientWidth,
        document:document.documentElement.scrollWidth,
        body:document.body.scrollWidth,
        title:rect("#result-title"),
        score:rect(".score-ring"),
        review:rect("#answer-review-list"),
        actions:rect(".result-actions"),
        cards:[...document.querySelectorAll(".review-card")].map(node => {
          const value=node.getBoundingClientRect();
          return { left:value.left, right:value.right, width:value.width };
        })
      };
    });
    if (results.document > results.viewport || results.body > results.viewport ||
        [results.title,results.score,results.review,results.actions].some(rect => !rect || rect.left < -1 || rect.right > results.viewport + 1) ||
        results.cards.length !== expectedQuestions ||
        results.cards.some(rect => rect.left < -1 || rect.right > results.viewport + 1)) {
      throw new Error(device.name + ": Results/review layout failed " + JSON.stringify(results));
    }
    if (device.width >= 768) {
      const reviewColumns = await page.locator("#answer-review-list").evaluate(node => getComputedStyle(node).gridTemplateColumns.split(" ").length);
      if (reviewColumns < 2) throw new Error(device.name + ": tablet Results review did not use two columns");
    }
    if (errors.length) throw new Error(device.name + ": browser errors: " + errors.join("; "));
    console.log("PASS " + device.name + " — " + device.width + "×" + device.height + "; Home, Settings, Quiz and Results");
    await page.close();
  }
  console.log("Responsive viewport regression passed for " + cases.length + " device profiles.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
