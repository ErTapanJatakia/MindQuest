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

const views = ["home-view","settings-view","help-view","privacy-view","accessibility-view","quiz-view","result-view"];
const headingByView = {
  "home-view":"home-title",
  "settings-view":"settings-title",
  "help-view":"help-title",
  "privacy-view":"privacy-title",
  "accessibility-view":"accessibility-title",
  "quiz-view":"question-title",
  "result-view":"result-title"
};
let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4179, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("http://127.0.0.1:4179/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });

  async function auditView(expectedId, label) {
    const state = await page.evaluate(({ expectedId, views }) => {
      const active = [...document.querySelectorAll(".view")].filter(node => node.classList.contains("active") && !node.hidden);
      const hiddenWithFocusable = views.flatMap(id => {
        const view = document.getElementById(id);
        if (!view || id === expectedId) return [];
        const controls = [...view.querySelectorAll('a[href],button,input,select,textarea,[tabindex]')]
          .filter(node => !node.disabled && node.tabIndex >= 0);
        return controls.map(node => ({ view:id, control:node.id || node.tagName.toLowerCase(), hidden:view.hidden }));
      });
      const heading = document.getElementById(expectedId === "home-view" ? "home-title" :
        expectedId === "settings-view" ? "settings-title" :
        expectedId === "help-view" ? "help-title" :
        expectedId === "privacy-view" ? "privacy-title" :
        expectedId === "accessibility-view" ? "accessibility-title" :
        expectedId === "quiz-view" ? "question-title" : "result-title");
      return {
        active:active.map(node => node.id),
        hiddenWithFocusable,
        headingId:heading?.id || null,
        headingTabIndex:heading?.getAttribute("tabindex"),
        focusedId:document.activeElement?.id || null
      };
    }, { expectedId, views });
    if (state.active.length !== 1 || state.active[0] !== expectedId) {
      throw new Error(label + ": expected exactly one active view " + expectedId + ", got " + JSON.stringify(state.active));
    }
    if (state.hiddenWithFocusable.length) {
      throw new Error(label + ": inactive views retain tab-reachable controls: " + JSON.stringify(state.hiddenWithFocusable));
    }
    if (!state.headingId || state.headingTabIndex !== "-1") {
      throw new Error(label + ": destination heading is missing or not programmatically focusable: " + JSON.stringify(state));
    }
    if (state.focusedId !== state.headingId) {
      throw new Error(label + ": focus did not move to destination heading: " + JSON.stringify(state));
    }
    console.log("PASS " + label + " — active view isolated; inactive views contain no tab-reachable controls; heading focus confirmed");
  }

  await auditView("home-view", "Home");
  for (const [trigger, back, view, label] of [
    ["#settings-open","#settings-back","settings-view","Settings"],
    ["#home-help","#help-back","help-view","Help"],
    ["#privacy-link","#privacy-back","privacy-view","Privacy"],
    ["#accessibility-link","#accessibility-back","accessibility-view","Accessibility"]
  ]) {
    await page.locator(trigger).click();
    await auditView(view, label);
    await page.locator(back).click();
    await auditView("home-view", "Home after " + label);
  }

  await page.locator("#play-button").click();
  await auditView("quiz-view", "Quiz");
  const configuredLength = Number(await page.locator("#round-length").inputValue().catch(() => "5"));
  const roundLength = Number.isFinite(configuredLength) && configuredLength > 0 ? configuredLength : 5;
  for (let index = 0; index < roundLength; index += 1) {
    const answers = page.locator("#answers button[role=radio]");
    if (!(await answers.count())) throw new Error("Quiz: answer controls missing at question " + (index + 1));
    await answers.first().click();
    await page.locator("#next-button").waitFor({ state:"visible" });
    if (await page.locator("#next-button").isDisabled()) throw new Error("Quiz: Next remained disabled after answer selection");
    await page.locator("#next-button").click();
    if (index < roundLength - 1) {
      const headingFocused = await page.evaluate(() => document.activeElement?.id === "question-title");
      if (!headingFocused) throw new Error("Quiz: next-question transition did not restore focus to question heading");
    }
  }
  await page.locator("#result-view.active").waitFor({ state:"visible" });
  await auditView("result-view", "Results and answer review");
  await page.locator("#replay-button").click();
  await auditView("quiz-view", "Replay");
  await page.locator("#brand-home").click();
  await auditView("home-view", "Home after replay");

  if (errors.length) throw new Error("Browser runtime errors: " + errors.join(" | "));
  console.log("Focus-order and hidden-view regression passed across all seven views, navigation paths, a completed round and replay.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
