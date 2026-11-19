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
    server.listen(4181, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless:true });
  const page = await browser.newPage();
  const origin = "http://127.0.0.1:4181";
  const externalRequests = [];
  page.on("request", request => {
    if (new URL(request.url()).origin !== origin) externalRequests.push(request.url());
  });
  await page.route("**/*", route => {
    if (new URL(route.request().url()).origin !== origin) return route.abort();
    return route.continue();
  });
  await page.goto(origin + "/", { waitUntil:"networkidle" });
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state:"detached" });
  await page.locator("#settings-open").click();
  await page.locator("#question-region").selectOption("ES");
  await page.locator("#question-locale").selectOption("es-ES");
  await page.locator("#settings-save").click();
  await page.locator("#play-button").click();
  if (await page.locator("#question-title").getAttribute("lang") !== "es-ES") throw new Error("Offline regional gameplay did not render the selected question language.");
  const correct = await page.evaluate(() => {
    const id = document.querySelector("#question-title")?.dataset.questionId;
    return window.MINDQUEST_QUESTIONS.find(question => question.id === id)?.correct;
  });
  await page.locator('#answers button[data-answer="' + correct + '"]').click();
  await page.locator("#next-button").click();
  // Repeat the offline startup/settings/gameplay path for every region × question-language pair.
  const matrix = [
    ["IN","en-IN"],["IN","en-US"],["IN","ru-RU"],["IN","es-ES"],["IN","es-PE"],
    ["RU","en-IN"],["RU","en-US"],["RU","ru-RU"],["RU","es-ES"],["RU","es-PE"],
    ["US","en-IN"],["US","en-US"],["US","ru-RU"],["US","es-ES"],["US","es-PE"],
    ["ES","en-IN"],["ES","en-US"],["ES","ru-RU"],["ES","es-ES"],["ES","es-PE"],
    ["PE","en-IN"],["PE","en-US"],["PE","ru-RU"],["PE","es-ES"],["PE","es-PE"]
  ];
  for (const [region, locale] of matrix) {
    await page.reload({ waitUntil:"networkidle" });
    await page.locator("#splash-dismiss").click();
    await page.locator("#settings-open").click();
    await page.locator("#question-region").selectOption(region);
    await page.locator("#question-locale").selectOption(locale);
    await page.locator("#settings-save").click();
    await page.locator("#play-button").click();
    const rendered = await page.locator("#question-title").evaluate(node => ({
      language:node.getAttribute("lang"),
      id:node.dataset.questionId
    }));
    if (rendered.language !== locale || !rendered.id?.startsWith(region + "-")) {
      throw new Error("Offline locale matrix mismatch for " + region + "/" + locale + ": " + JSON.stringify(rendered));
    }
    const answer = await page.evaluate(id => window.MINDQUEST_QUESTIONS.find(question => question.id === id)?.correct, rendered.id);
    if (typeof answer !== "string") throw new Error("Offline question bank could not resolve the answer for " + region + "/" + locale);
    await page.locator('#answers button[data-answer="' + answer + '"]').click();
    await page.locator("#next-button").click();
  }

  if (externalRequests.length) throw new Error("The application attempted external network access: " + externalRequests.join(", "));
  console.log("Offline network-isolation regression passed: startup, settings persistence and Spanish regional gameplay completed with zero cross-origin requests.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
