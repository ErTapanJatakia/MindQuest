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
    { width:1366, height:768, name:"desktop" }
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
      actions: document.querySelector(".topbar-actions").getBoundingClientRect().toJSON()
    }));
    if (home.document > home.viewport || home.body > home.viewport) throw new Error(device.name + ": horizontal overflow at Home " + JSON.stringify(home));
    if (home.brand.right > home.actions.left + 1) throw new Error(device.name + ": brand overlaps header actions " + JSON.stringify(home));
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
    if (quiz.document > quiz.viewport || quiz.question.right > quiz.viewport + 1 || quiz.answers.right > quiz.viewport + 1) {
      throw new Error(device.name + ": quiz content overflows viewport " + JSON.stringify(quiz));
    }
    if (errors.length) throw new Error(device.name + ": browser errors: " + errors.join("; "));
    console.log("PASS " + device.name + " — " + device.width + "×" + device.height);
    await page.close();
  }
  console.log("Responsive viewport regression passed for " + cases.length + " device profiles.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
