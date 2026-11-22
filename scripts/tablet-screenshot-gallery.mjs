import { createServer } from "node:http";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, extname, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = resolve(projectRoot, "app");
const outputRoot = resolve(projectRoot, "artifacts/tablet-gallery");
await mkdir(outputRoot, { recursive: true });

const mime = { ".html":"text/html; charset=utf-8", ".css":"text/css; charset=utf-8", ".js":"text/javascript; charset=utf-8", ".svg":"image/svg+xml" };
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const file = resolve(appRoot, relative);
    if (file !== appRoot && !file.startsWith(appRoot + sep)) return response.writeHead(403).end("Forbidden");
    response.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end("Not found"); }
});

const records = [];
const slug = value => value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4175, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless: true });

  async function newApp(width, height) {
    const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
    await page.goto("http://127.0.0.1:4175/", { waitUntil: "networkidle" });
    await page.locator("#splash-dismiss").waitFor({ state: "visible" });
    return page;
  }

  async function capture(page, filename, description, fullPage = false) {
    const path = resolve(outputRoot, filename);
    await page.screenshot({ path, fullPage, animations: "disabled" });
    records.push({ filename, description, viewport: page.viewportSize() });
  }

  async function dismissSplash(page) {
    await page.locator("#splash-dismiss").click();
    await page.locator("#home-view.active").waitFor({ state: "visible" });
  }

  async function configure(page, { category = "all", difficulty = "all", theme = "obsidian", roundLength = "5" } = {}) {
    await page.locator("#settings-open").click();
    await page.locator("#interface-locale").selectOption("ru-RU");
    await page.locator("#question-region").selectOption("RU");
    await page.locator("#question-locale").selectOption("ru-RU");
    await page.locator("#question-category").selectOption(category);
    await page.locator("#question-difficulty").selectOption(difficulty);
    await page.locator("#theme-select").selectOption(theme);
    await page.locator("#round-length").selectOption(roundLength);
    await page.locator("#settings-save").click();
    await page.locator("#home-view.active").waitFor({ state: "visible" });
  }

  async function captureQuiz(name, category, difficulty) {
    const page = await newApp(1280, 800);
    await dismissSplash(page);
    await configure(page, { category, difficulty, theme: "royal" });
    await page.locator("#play-button").click();
    await page.locator("#quiz-view.active").waitFor({ state: "visible" });
    await capture(page, name, `Russian question bank — ${category === "all" ? "all categories" : category}, ${difficulty === "all" ? "all difficulties" : difficulty}`);
    await page.close();
  }

  // Launch screens: phone portrait, tablet portrait, tablet landscape.
  for (const [name, width, height] of [
    ["01-launch-phone-portrait.png",390,844],
    ["02-launch-tablet-portrait.png",900,1200],
    ["03-launch-tablet-landscape.png",1280,800]
  ]) {
    const page = await newApp(width, height);
    await capture(page, name, "Launch screen");
    await dismissSplash(page);
    await page.close();
  }

  // Home dashboard across phone and both tablet orientations.
  for (const [name, width, height] of [
    ["04-home-phone-portrait.png",390,844],
    ["05-home-tablet-portrait.png",900,1200],
    ["06-home-tablet-landscape.png",1280,800]
  ]) {
    const page = await newApp(width, height);
    await dismissSplash(page);
    await configure(page);
    await capture(page, name, "Russian interface and Russian question region — Home");
    await page.close();
  }

  // Russian settings, including top and bottom scroll positions.
  {
    const page = await newApp(900, 1200);
    await dismissSplash(page);
    await configure(page);
    await page.locator("#settings-open").click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await capture(page, "07-settings-russian-top.png", "Settings — top; interface ru-RU, region RU, question language ru-RU");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await capture(page, "08-settings-russian-bottom.png", "Settings — bottom; accessibility, round length and actions");
    await page.close();
  }

  // Make all Russian categories and difficulty choices visible in the gallery.
  await captureQuiz("09-russian-all-categories-all-difficulties.png", "all", "all");
  for (const [index, category] of ["Geography","History","Science","Culture"].entries()) {
    await captureQuiz(`${String(10+index).padStart(2,"0")}-russian-category-${slug(category)}.png`, category, "all");
  }
  for (const [index, difficulty] of ["easy","medium","hard"].entries()) {
    await captureQuiz(`${String(14+index).padStart(2,"0")}-russian-difficulty-${difficulty}.png`, "all", difficulty);
  }

  // Every available Russian category/difficulty combination (including sparse pools).
  const combinations = [
    ["Geography","easy"],["Geography","medium"],
    ["History","easy"],["History","medium"],["History","hard"],
    ["Science","easy"],["Science","medium"],["Science","hard"],
    ["Culture","easy"],["Culture","medium"],["Culture","hard"]
  ];
  for (const [index, [category,difficulty]] of combinations.entries()) {
    await captureQuiz(`${String(17+index).padStart(2,"0")}-ru-${slug(category)}-${difficulty}.png`, category, difficulty);
  }

  // Ten colour themes, each shown on the Russian-configured Home and Settings screens.
  const themes = ["obsidian","midnight","aurora","ocean","forest","ember","royal","rose","sand","paper"];
  for (const [index, theme] of themes.entries()) {
    const page = await newApp(1280, 800);
    await dismissSplash(page);
    await configure(page, { theme });
    await capture(page, `${String(28+index).padStart(2,"0")}-theme-${theme}-home.png`, `Russian configuration — ${theme} theme, Home`);
    await page.locator("#settings-open").click();
    await capture(page, `${String(38+index).padStart(2,"0")}-theme-${theme}-settings.png`, `Russian configuration — ${theme} theme, Settings`);
    await page.close();
  }

  await writeFile(resolve(outputRoot, "gallery-manifest.json"), JSON.stringify({
    generatedAt: new Date().toISOString(),
    screenshotCount: records.length,
    note: "Browser-rendered responsive screenshots. These do not replace physical Android tablet or assistive-technology acceptance.",
    screenshots: records
  }, null, 2));
  if (records.length < 40) throw new Error(`Expected at least 40 screenshots; generated ${records.length}`);
  console.log(`Tablet screenshot gallery generated: ${records.length} PNG files at ${outputRoot}`);
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
