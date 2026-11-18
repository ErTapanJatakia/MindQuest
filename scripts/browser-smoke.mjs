import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";
import { chromium } from "playwright";

const root = resolve("app");
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml"
};

const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://127.0.0.1").pathname);
    const relative = pathname === "/" ? "index.html" : pathname.slice(1);
    const file = resolve(root, relative);
    if (file !== root && !file.startsWith(root + sep)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const body = await readFile(file);
    response.writeHead(200, { "content-type": mime[extname(file)] || "application/octet-stream" });
    response.end(body);
  } catch {
    response.writeHead(404).end("Not found");
  }
});

let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4173, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  const pageErrors = [];
  const externalRequests = [];
  page.on("pageerror", error => pageErrors.push(error.message));
  page.on("request", request => {
    if (new URL(request.url()).origin !== "http://127.0.0.1:4173") externalRequests.push(request.url());
  });
  await page.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  if (!(await page.locator(".app-shell").evaluate(node => node.inert &&
      node.getAttribute("aria-hidden") === "true"))) {
    throw new Error("Launch splash did not isolate the application from assistive technology");
  }
  await page.keyboard.press("Tab");
  if (await page.evaluate(() => document.activeElement?.id) !== "splash-dismiss") {
    throw new Error("Launch splash did not retain keyboard focus");
  }
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({ state: "detached" });
  if (await page.locator(".app-shell").evaluate(node => node.inert ||
      node.hasAttribute("aria-hidden"))) {
    throw new Error("Application remained inert after splash dismissal");
  }
  if (!(await page.locator("#home-view").isVisible())) throw new Error("Home view did not load");
  if ((await page.title()).length === 0) throw new Error("Document title is missing");

  // Theme palette, persistence, policy surfaces and accessibility preferences.
  await page.locator("#theme-open").click();
  if (await page.locator("#theme-select option").count() < 10) throw new Error("Expected at least ten themes");
  await page.locator("#theme-select").selectOption("aurora");
  if (await page.locator("html").getAttribute("data-theme") !== "aurora") throw new Error("Theme was not applied");
  const themeNames = ["obsidian", "midnight", "aurora", "ocean", "forest", "ember", "royal", "rose", "sand", "paper"];
  const contrast = (foreground, background) => {
    const luminance = hex => {
      const channels = hex.match(/[a-f0-9]{2}/gi).map(value => parseInt(value, 16) / 255)
        .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
      return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
    };
    const values = [luminance(foreground), luminance(background)].sort((a, b) => b - a);
    return (values[0] + 0.05) / (values[1] + 0.05);
  };
  for (const theme of themeNames) {
    await page.locator("#theme-select").selectOption(theme);
    const palette = await page.evaluate(() => {
      const styles = getComputedStyle(document.documentElement);
      return Object.fromEntries(["--bg", "--panel", "--text", "--muted"].map(key =>
        [key, styles.getPropertyValue(key).trim()]));
    });
    for (const surface of [palette["--bg"], palette["--panel"]]) {
      if (contrast(palette["--text"], surface) < 4.5 || contrast(palette["--muted"], surface) < 4.5) {
        throw new Error(`Theme contrast below WCAG AA text threshold: ${theme}`);
      }
    }
  }
  await page.locator("#settings-open").click();
  for (const id of ["#setting-large-text", "#setting-reduced-motion", "#setting-high-contrast"]) {
    await page.locator(id).check();
    await page.locator(id).uncheck();
  }
  await page.locator("#settings-back").click();
  await page.locator("#privacy-link").click();
  if (!(await page.locator("#privacy-view").isVisible())) throw new Error("Privacy view did not open");
  await page.locator("#privacy-back").click();
  await page.locator("#accessibility-link").click();
  if (!(await page.locator("#accessibility-view").isVisible())) throw new Error("Accessibility statement did not open");
  await page.locator("#accessibility-back").click();

  const interfaces = ["en-IN", "en-US", "ru-RU", "es-PE", "es-ES"];
  const regions = ["IN", "RU", "US"];
  const questionLocales = ["en-IN", "en-US", "ru-RU"];

  // Exercise every independent selector combination and verify the document locale.
  for (const interfaceLocale of interfaces) {
    for (const region of regions) {
      for (const questionLocale of questionLocales) {
        await page.locator("#settings-open").click();
        await page.locator("#interface-locale").selectOption(interfaceLocale);
        await page.locator("#question-region").selectOption(region);
        await page.locator("#question-locale").selectOption(questionLocale);
        await page.locator("#settings-save").click();
        if (await page.locator("html").getAttribute("lang") !== interfaceLocale) {
          throw new Error(`Document language mismatch for ${interfaceLocale}/${region}/${questionLocale}`);
        }
        if (!(await page.locator("#home-view").isVisible())) throw new Error("Settings did not return to Home");
      }
    }
  }

  // Play and complete a five-question round for each region/question-language pair.
  for (const region of regions) {
    for (const questionLocale of questionLocales) {
      await page.locator("#settings-open").click();
      await page.locator("#interface-locale").selectOption("en-IN");
      await page.locator("#question-region").selectOption(region);
      await page.locator("#question-locale").selectOption(questionLocale);
      await page.locator("#round-length").selectOption("5");
      await page.locator("#settings-save").click();
      await page.locator("#play-button").click();
      if (!(await page.locator("#quiz-view").isVisible())) throw new Error(`Quiz failed to start for ${region}/${questionLocale}`);
      if (await page.locator("#question-title").getAttribute("lang") !== questionLocale) {
        throw new Error(`Question language mismatch for ${region}/${questionLocale}`);
      }
      for (let index = 0; index < 5; index += 1) {
        const answers = page.locator("#answers button.answer-option");
        await answers.first().waitFor({ state: "visible" });
        if (await answers.count() !== 4) throw new Error("Expected exactly four answer options");
        if (await answers.first().locator("span").nth(1).getAttribute("lang") !== questionLocale) {
          throw new Error("Answer option language does not match selected question language");
        }
        await answers.first().click();
        await page.locator("#next-button").click();
      }
      if (!(await page.locator("#result-view").isVisible())) throw new Error(`Results view failed for ${region}/${questionLocale}`);
      if (await page.locator("#answer-review-list article").count() !== 5) {
        throw new Error("Answer review did not contain all five questions");
      }
    }
  }

  // Searchable controls are part of Settings, so enter that view before asserting visibility.
  await page.locator("#settings-open").click();
  for (const id of ["#interface-locale-search", "#question-region-search", "#question-locale-search", "#question-category-search"]) {
    if (!(await page.locator(id).isVisible())) throw new Error("Searchable selector missing: " + id);
  }
  await page.locator("#interface-locale-search").fill("Spanish (Republic of Peru) — es-PE");
  await page.locator("#interface-locale-search").press("Tab");
  if (await page.locator("#interface-locale").inputValue() !== "es-PE") throw new Error("Interface language search did not select es-PE");
  await page.locator("#question-region-search").fill("Federación de Rusia — RU");
  await page.locator("#question-region-search").press("Tab");
  if (await page.locator("#question-region").inputValue() !== "RU") throw new Error("Question region search did not select RU");
  await page.locator("#question-locale-search").fill("Ruso (Federación de Rusia) — ru-RU");
  await page.locator("#question-locale-search").press("Tab");
  if (await page.locator("#question-locale").inputValue() !== "ru-RU") throw new Error("Question language search did not select ru-RU");
  await page.locator("#question-category-search").fill("History");
  await page.locator("#question-category-search").press("Tab");
  if (await page.locator("#question-category").inputValue() !== "History") throw new Error("Category search did not select History");
  await page.locator("#settings-back").click();

  // Exercise the longer supported round modes for every currently playable region.
  for (const region of regions) {
    for (const roundLength of ["10", "15"]) {
      await page.locator("#settings-open").click();
      await page.locator("#interface-locale").selectOption("en-IN");
      await page.locator("#question-region").selectOption(region);
      await page.locator("#question-locale").selectOption("en-IN");
      await page.locator("#question-category").selectOption("all");
      await page.locator("#question-difficulty").selectOption("all");
      await page.locator("#round-length").selectOption(roundLength);
      await page.locator("#settings-save").click();
      await page.locator("#play-button").click();
      if (await page.locator("#progress-label").textContent() !== `1 / ${roundLength}`) {
        throw new Error(`Round length was not applied for ${region}/${roundLength}`);
      }
      for (let index = 0; index < Number(roundLength); index += 1) {
        await page.locator("#answers button.answer-option").first().click();
        await page.locator("#next-button").click();
      }
      if (await page.locator("#answer-review-list article").count() !== Number(roundLength)) {
        throw new Error(`Answer review count mismatch for ${region}/${roundLength}`);
      }
      await page.locator("#home-button").click();
    }
  }

  // Exercise every category/difficulty filter pairing in each playable region.
  for (const region of regions) {
    for (const category of ["Geography", "History", "Science", "Culture"]) {
      for (const difficulty of ["easy", "medium", "hard"]) {
        await page.locator("#settings-open").click();
        await page.locator("#interface-locale").selectOption("en-IN");
        await page.locator("#question-region").selectOption(region);
        await page.locator("#question-locale").selectOption("en-IN");
        await page.locator("#question-category").selectOption(category);
        await page.locator("#question-difficulty").selectOption(difficulty);
        await page.locator("#round-length").selectOption("5");
        await page.locator("#settings-save").click();
        await page.locator("#play-button").click();
        if (!(await page.locator("#quiz-view").isVisible())) {
          throw new Error(`Filtered round did not start: ${region}/${category}/${difficulty}`);
        }
        if ((await page.locator("#category-label").textContent()).trim() !== category.toUpperCase()) {
          throw new Error(`Category filter mismatch: ${region}/${category}/${difficulty}`);
        }
        if ((await page.locator("#difficulty-label").textContent()).trim() !== difficulty.toUpperCase()) {
          throw new Error(`Difficulty filter mismatch: ${region}/${category}/${difficulty}`);
        }
        const total = Number((await page.locator("#progress-label").textContent()).split("/")[1].trim());
        if (!Number.isInteger(total) || total < 1 || total > 5) {
          throw new Error(`Filtered round length invalid: ${region}/${category}/${difficulty}`);
        }
        for (let index = 0; index < total; index += 1) {
          await page.locator("#answers button.answer-option").first().click();
          await page.locator("#next-button").click();
        }
        await page.locator("#home-button").click();
      }
    }
  }

  // Verify keyboard focus continuity through answer selection and progression.
  await page.locator("#settings-open").click();
  await page.locator("#interface-locale").selectOption("en-IN");
  await page.locator("#question-region").selectOption("IN");
  await page.locator("#question-locale").selectOption("en-IN");
  await page.locator("#round-length").selectOption("5");
  await page.locator("#settings-save").click();
  await page.locator("#play-button").click();
  await page.locator("#answers button.answer-option").first().focus();
  await page.keyboard.press("Enter");
  if (await page.evaluate(() => document.activeElement?.id) !== "next-button") {
    throw new Error("Answer selection did not move keyboard focus to Next");
  }
  await page.keyboard.press("Enter");
  if (await page.evaluate(() => document.activeElement?.id) !== "question-title") {
    throw new Error("Question progression did not move keyboard focus to the new heading");
  }
  await page.locator("#home-button").click();

  // Check narrow and standard viewport layouts for horizontal overflow.
  for (const width of [320, 360, 390, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const view of ["home", "settings", "quiz"]) {
      if (view === "settings") await page.locator("#settings-open").click();
      if (view === "quiz") {
        await page.locator("#play-button").click();
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (overflow) throw new Error(`Horizontal overflow detected at ${width}px (${view})`);
      if (view === "settings") await page.locator("#settings-back").click();
      if (view === "quiz") await page.locator("#home-button").click();
    }
  }
  await page.setViewportSize({ width: 1280, height: 900 });

  // Persist independent preferences, theme and accessibility choices across reload.
  await page.locator("#settings-open").click();
  await page.locator("#interface-locale").selectOption("es-ES");
  await page.locator("#question-region").selectOption("US");
  await page.locator("#question-locale").selectOption("ru-RU");
  await page.locator("#round-length").selectOption("15");
  await page.locator("#settings-save").click();
  await page.locator("#theme-open").click();
  await page.locator("#theme-select").selectOption("forest");
  await page.locator("#settings-open").click();
  await page.locator("#setting-large-text").check();
  await page.locator("#setting-reduced-motion").check();
  await page.locator("#setting-high-contrast").check();
  await page.reload({ waitUntil: "networkidle" });
  await page.locator("#splash-dismiss").click();
  if (await page.locator("html").getAttribute("data-theme") !== "forest") {
    throw new Error("Theme preference did not survive reload");
  }
  if (!(await page.locator("html").evaluate(node => node.classList.contains("large-text") &&
      node.classList.contains("user-reduced-motion") && node.classList.contains("user-high-contrast")))) {
    throw new Error("Accessibility preferences did not survive reload");
  }
  await page.locator("#settings-open").click();
  for (const [id, expected] of [["#interface-locale", "es-ES"], ["#question-region", "US"],
    ["#question-locale", "ru-RU"], ["#round-length", "15"]]) {
    if (await page.locator(id).inputValue() !== expected) throw new Error(`Preference did not persist: ${id}`);
  }
  if (externalRequests.length) throw new Error("Unexpected external runtime requests: " + externalRequests.join(", "));

  if (pageErrors.length) throw new Error("Browser runtime errors: " + pageErrors.join(" | "));
  console.log("Browser regression passed: modal launch keyboard isolation, ten themes, policy surfaces, 45 selector combinations, 5/10/15-question rounds, all 36 region/category/difficulty filter combinations, keyboard focus, five viewport widths, persisted preferences/accessibility and zero external runtime requests.");
} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
