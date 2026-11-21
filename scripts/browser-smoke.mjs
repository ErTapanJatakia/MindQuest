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
  const auditAccessibleControls = async context => {
    const problems = await page.evaluate(() => {
      const visible = element => {
        if (element.closest("[hidden]")) return false;
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return style.display !== "none" && style.visibility !== "hidden" && rect.width > 1 && rect.height > 1;
      };
      const controls = [...document.querySelectorAll("button, a[href], input, select, textarea, [role=radio]")].filter(visible);
      const unnamed = controls.filter(element => {
        const explicit = element.getAttribute("aria-label") || element.getAttribute("aria-labelledby") ||
          element.getAttribute("title");
        const labelText = element.labels ? [...element.labels].map(label => label.textContent).join(" ").trim() : "";
        const content = (element.innerText || element.textContent || "").trim();
        return !explicit && !labelText && !content;
      }).map(element => element.id || element.tagName.toLowerCase());
      const missingAlt = [...document.querySelectorAll("img:not([alt])")].map(image => image.getAttribute("src") || "image");
      const ids = [...document.querySelectorAll("[id]")].map(element => element.id);
      const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
      const brokenReferences = [...document.querySelectorAll("[aria-labelledby], [aria-describedby]")]
        .filter(visible)
        .flatMap(element => ["aria-labelledby", "aria-describedby"].flatMap(attribute =>
          (element.getAttribute(attribute) || "").split(/\s+/).filter(Boolean)
            .filter(id => !document.getElementById(id)).map(id => attribute + ":" + id)));
      return { unnamed, missingAlt, duplicates, brokenReferences };
    });
    if (problems.unnamed.length || problems.missingAlt.length || problems.duplicates.length || problems.brokenReferences.length) {
      throw new Error("Accessibility structure audit failed (" + context + "): " + JSON.stringify(problems));
    }
  };
  await auditAccessibleControls("Home");
  const contentPolicy = await page.locator('meta[http-equiv="Content-Security-Policy"]').getAttribute("content");
  for (const directive of ["default-src 'self'", "script-src 'self'", "connect-src 'none'", "object-src 'none'"]) {
    if (!contentPolicy?.includes(directive)) throw new Error("Missing restrictive CSP directive: " + directive);
  }
  const externalConnectionBlocked = await page.evaluate(async () => {
    try { await fetch("https://example.com/"); return false; }
    catch (_) { return true; }
  });
  if (!externalConnectionBlocked) throw new Error("CSP did not block an external connection attempt");

  // Theme palette, persistence, policy surfaces and accessibility preferences.
  await page.locator("#settings-open").click();
  await page.locator("#theme-select").focus();
  if (await page.evaluate(() => document.activeElement?.id) !== "theme-select") {
    throw new Error("Settings theme selector did not receive keyboard focus");
  }
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
      return Object.fromEntries(["--bg", "--panel", "--text", "--muted", "--accent2"].map(key =>
        [key, styles.getPropertyValue(key).trim()]));
    });
    for (const surface of [palette["--bg"], palette["--panel"]]) {
      if (contrast(palette["--text"], surface) < 4.5 || contrast(palette["--muted"], surface) < 4.5) {
        throw new Error(`Theme contrast below WCAG AA text threshold: ${theme}`);
      }
      if (contrast(palette["--accent2"], surface) < 3) {
        throw new Error(`Theme focus-indicator contrast below the 3:1 non-text threshold: ${theme}`);
      }
    }
  }
  await page.locator("#settings-back").click();
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
      await auditAccessibleControls("Quiz");
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
      await auditAccessibleControls("Results");
      if (await page.locator("#answer-review-list article").count() !== 5) {
        throw new Error("Answer review did not contain all five questions");
      }
    }
  }

  // Native Settings dropdowns remain visible and expose every supported locale.
  await page.locator("#settings-open").click();
  await auditAccessibleControls("Settings");
  for (const id of ["#interface-locale", "#question-region", "#question-locale", "#question-category", "#theme-select"]) {
    if (!(await page.locator(id).isVisible())) throw new Error("Native Settings dropdown missing: " + id);
  }
  const interfaceValues = await page.locator("#interface-locale option").evaluateAll(options => options.map(option => option.value));
  const questionValues = await page.locator("#question-locale option").evaluateAll(options => options.map(option => option.value));
  const locales = ["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"];
  for (const locale of locales) {
    if (!interfaceValues.includes(locale) || !questionValues.includes(locale)) {
      throw new Error("Supported locale is missing from a native dropdown: " + locale);
    }
  }
  await page.locator("#interface-locale").selectOption("es-PE");
  await page.locator("#question-region").selectOption("RU");
  await page.locator("#question-locale").selectOption("ru-RU");
  await page.locator("#question-category").selectOption("History");
  if (await page.locator("#interface-locale").inputValue() !== "es-PE" ||
      await page.locator("#question-region").inputValue() !== "RU" ||
      await page.locator("#question-locale").inputValue() !== "ru-RU" ||
      await page.locator("#question-category").inputValue() !== "History") {
    throw new Error("Native dropdown selection did not update its canonical value");
  }
  await page.locator("#settings-back").click();

  // Verify 5/10/15 modes, stable question IDs, exact difficulty apportionment and results focus.
  const expectedDifficultyMix = {
    "5": { EASY: 2, MEDIUM: 2, HARD: 1 },
    "10": { EASY: 3, MEDIUM: 4, HARD: 3 },
    "15": { EASY: 5, MEDIUM: 6, HARD: 4 }
  };
  for (const region of regions) {
    for (const roundLength of ["5", "10", "15"]) {
      // Each quota assertion starts with a clean session-local question cycle.
      // Cycle exhaustion is covered independently by the dedicated test below.
      const quotaPage = await browser.newPage();
      await quotaPage.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
      await quotaPage.locator("#splash-dismiss").click();
      await quotaPage.locator("#settings-open").click();
      await quotaPage.locator("#interface-locale").selectOption("en-IN");
      await quotaPage.locator("#question-region").selectOption(region);
      await quotaPage.locator("#question-locale").selectOption("en-IN");
      await quotaPage.locator("#question-category").selectOption("all");
      await quotaPage.locator("#question-difficulty").selectOption("all");
      await quotaPage.locator("#round-length").selectOption(roundLength);
      await quotaPage.locator("#settings-save").click();
      await quotaPage.locator("#play-button").click();
      if (await quotaPage.locator("#progress-label").textContent() !== `1 / ${roundLength}`) {
        throw new Error(`Round length was not applied for ${region}/${roundLength}`);
      }
      const initialAllocation = await quotaPage.locator("#question-title").getAttribute("data-round-diagnostics");
      const initialPoolSize = JSON.parse(initialAllocation || "{}").poolSize;
      if (initialPoolSize !== 50) {
        throw new Error(`Playable pool unexpectedly excluded canonical questions for ${region}/${roundLength}: ${initialAllocation}`);
      }
      const questionIds = new Set();
      const difficultyCounts = { EASY: 0, MEDIUM: 0, HARD: 0 };
      const selectedDiagnostics = [];
      for (let index = 0; index < Number(roundLength); index += 1) {
        const questionId = await quotaPage.locator("#question-title").getAttribute("data-question-id");
        if (!questionId || questionIds.has(questionId)) {
          throw new Error(`Missing or duplicate stable question ID in ${region}/${roundLength}`);
        }
        questionIds.add(questionId);
        const displayedDifficulty = (await quotaPage.locator("#difficulty-label").textContent()).trim();
        const sourceDifficulty = await quotaPage.evaluate((id) =>
          window.MINDQUEST_QUESTIONS.find((question) => question.id === id)?.difficulty ?? null, questionId);
        selectedDiagnostics.push({ id: questionId, sourceDifficulty, displayedDifficulty });
        if (!Object.hasOwn(difficultyCounts, displayedDifficulty)) {
          throw new Error(`Unexpected difficulty label in ${region}/${roundLength}: ${displayedDifficulty}`);
        }
        const expectedLabel = await quotaPage.evaluate((difficulty) => {
          const locale = document.querySelector("#interface-locale")?.value || "en-IN";
          const labels = {
            "en-IN": { easy: "EASY", medium: "MEDIUM", hard: "HARD" },
            "en-US": { easy: "EASY", medium: "MEDIUM", hard: "HARD" },
            "ru-RU": { easy: "ЛЁГКАЯ", medium: "СРЕДНЯЯ", hard: "СЛОЖНАЯ" },
            "es-PE": { easy: "FÁCIL", medium: "INTERMEDIA", hard: "DIFÍCIL" },
            "es-ES": { easy: "FÁCIL", medium: "MEDIA", hard: "DIFÍCIL" }
          };
          return labels[locale]?.[difficulty] ?? null;
        }, sourceDifficulty);
        if (sourceDifficulty !== displayedDifficulty.toLowerCase() ||
            (expectedLabel && displayedDifficulty !== expectedLabel)) {
          throw new Error(`Difficulty display/source mismatch in ${region}/${roundLength}: ${JSON.stringify(selectedDiagnostics)}`);
        }
        difficultyCounts[displayedDifficulty] += 1;
        await quotaPage.locator("#answers button.answer-option").first().click();
        await quotaPage.locator("#next-button").click();
      }
      if (await quotaPage.locator("#answer-review-list article").count() !== Number(roundLength)) {
        throw new Error(`Answer review count mismatch for ${region}/${roundLength}`);
      }
      if (JSON.stringify(difficultyCounts) !== JSON.stringify(expectedDifficultyMix[roundLength])) {
        const poolDiagnostics = await quotaPage.evaluate((selectedRegion) => {
          const eligible = window.MINDQUEST_QUESTIONS.filter((question) =>
            question.region === selectedRegion &&
            ["easy", "medium", "hard"].includes(question.difficulty) &&
            ["en-IN", "en-US", "ru-RU"].every((locale) => question.translations?.[locale])
          );
          return {
            total: eligible.length,
            counts: Object.fromEntries(["easy", "medium", "hard"].map((difficulty) =>
              [difficulty, eligible.filter((question) => question.difficulty === difficulty).length])),
            selected: eligible.filter((question) =>
              document.querySelector("#question-title")?.dataset.questionId === question.id
            ).map((question) => ({ id: question.id, difficulty: question.difficulty }))
          };
        }, region);
        const runtimeAllocation = await quotaPage.locator("#question-title").getAttribute("data-round-diagnostics");
        throw new Error(`Difficulty mix mismatch for ${region}/${roundLength}: displayed=${JSON.stringify(difficultyCounts)}; selected=${JSON.stringify(selectedDiagnostics)}; runtimeAllocation=${runtimeAllocation}; eligiblePool=${JSON.stringify(poolDiagnostics)}`);
      }
      if (await quotaPage.evaluate(() => document.activeElement?.id) !== "result-title") {
        throw new Error(`Results heading did not receive focus for ${region}/${roundLength}`);
      }
      if (await quotaPage.locator("#result-message").getAttribute("aria-live") !== "polite" ||
          await quotaPage.locator("#answer-review-list article p").count() < Number(roundLength) * 4) {
        throw new Error(`Results summary or answer review accessibility incomplete for ${region}/${roundLength}`);
      }
      await quotaPage.locator("#home-button").click();
      await quotaPage.close();
    }
  }

  // A fresh app session must exhaust all 50 region questions before starting a new cycle.
  for (const region of regions) {
    const cyclePage = await browser.newPage();
    await cyclePage.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
    await cyclePage.locator("#splash-dismiss").click();
    await cyclePage.locator("#settings-open").click();
    await cyclePage.locator("#interface-locale").selectOption("en-IN");
    await cyclePage.locator("#question-region").selectOption(region);
    await cyclePage.locator("#question-locale").selectOption("en-IN");
    await cyclePage.locator("#question-category").selectOption("all");
    await cyclePage.locator("#question-difficulty").selectOption("all");
    await cyclePage.locator("#round-length").selectOption("15");
    await cyclePage.locator("#settings-save").click();
    const cycleSeen = new Set();
    for (let roundIndex = 0; roundIndex < 4; roundIndex += 1) {
      await cyclePage.locator("#play-button").click();
      const currentRound = new Set();
      for (let questionIndex = 0; questionIndex < 15; questionIndex += 1) {
        const questionId = await cyclePage.locator("#question-title").getAttribute("data-question-id");
        if (!questionId || currentRound.has(questionId)) {
          throw new Error(`Question repeated within a 15-question round: ${region}/${roundIndex}/${questionId}`);
        }
        if (roundIndex < 3 && cycleSeen.has(questionId)) {
          throw new Error(`Question repeated before the 50-question region cycle was exhausted: ${region}/${questionId}`);
        }
        currentRound.add(questionId);
        cycleSeen.add(questionId);
        await cyclePage.locator("#answers button.answer-option").first().click();
        await cyclePage.locator("#next-button").click();
      }
      if (currentRound.size !== 15) throw new Error(`Incorrect round size in cycle test: ${region}/${roundIndex}`);
      if (roundIndex === 2 && cycleSeen.size !== 45) {
        throw new Error(`The first three rounds did not cover 45 distinct questions in ${region}`);
      }
      await cyclePage.locator("#home-button").click();
    }
    if (cycleSeen.size !== 50) {
      throw new Error(`The four-round cycle did not cover all 50 unique questions in ${region}: ${cycleSeen.size}`);
    }
    await cyclePage.close();
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
  if (await page.locator("#answers").getAttribute("role") !== "radiogroup" ||
      await page.locator("#answers").getAttribute("aria-orientation") !== "vertical" ||
      await page.locator("#answers button[role=radio]").count() !== 4) {
    throw new Error("Single-choice answers were not exposed as a four-option vertical radio group");
  }
  if (await page.locator('#answers button[role=radio][tabindex="0"]').count() !== 1 ||
      await page.locator("#answers button[role=radio][tabindex='-1']").count() !== 3) {
    throw new Error("Radio group did not initialize a single roving tab stop");
  }
  await page.locator("#answers button.answer-option").first().focus();
  await page.keyboard.press("ArrowRight");
  const selectedAnswer = page.locator('#answers button[aria-checked="true"]');
  if (await page.locator("#answers button.answer-option").nth(1).getAttribute("aria-checked") !== "true") {
    throw new Error("Arrow-key navigation did not select the next answer radio");
  }
  if (await selectedAnswer.count() !== 1 || !(await selectedAnswer.isDisabled())) {
    throw new Error("Selected answer state was not exposed as one checked, disabled radio");
  }
  if (await page.locator('#answers button[aria-checked="false"]').count() !== 3) {
    throw new Error("Unselected answer controls did not retain their unchecked state");
  }
  if (await page.evaluate(() => document.activeElement?.id) !== "next-button") {
    throw new Error("Answer selection did not move keyboard focus to Next");
  }
  await page.keyboard.press("Enter");
  if (await page.evaluate(() => document.activeElement?.id) !== "question-title") {
    throw new Error("Question progression did not move keyboard focus to the new heading");
  }
  const edgeKeyPage = await browser.newPage();
  await edgeKeyPage.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await edgeKeyPage.locator("#splash-dismiss").click();
  await edgeKeyPage.locator("#play-button").click();
  await edgeKeyPage.locator("#answers button[role=radio]").first().focus();
  await edgeKeyPage.keyboard.press("End");
  if (await edgeKeyPage.locator('#answers button[aria-checked="true"]').count() !== 1 ||
      await edgeKeyPage.locator("#answers button[role=radio]").last().getAttribute("aria-checked") !== "true") {
    throw new Error("End key did not select the final answer in the radio group");
  }
  await edgeKeyPage.close();
  const homeKeyPage = await browser.newPage();
  await homeKeyPage.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await homeKeyPage.locator("#splash-dismiss").click();
  await homeKeyPage.locator("#play-button").click();
  await homeKeyPage.locator("#answers button[role=radio]").last().focus();
  await homeKeyPage.keyboard.press("Home");
  if (await homeKeyPage.locator('#answers button[aria-checked="true"]').count() !== 1 ||
      await homeKeyPage.locator("#answers button[role=radio]").first().getAttribute("aria-checked") !== "true") {
    throw new Error("Home key did not select the first answer in the radio group");
  }
  await homeKeyPage.close();
  for (let index = 1; index < 5; index += 1) {
    await page.locator("#answers button.answer-option").first().click();
    await page.locator("#next-button").click();
  }
  await page.locator("#home-button").click();

  // Check portrait, compact-height and landscape viewport layouts for horizontal overflow.
  for (const viewport of [
    { width: 320, height: 568 }, { width: 360, height: 640 },
    { width: 390, height: 844 }, { width: 768, height: 1024 },
    { width: 1024, height: 768 }, { width: 844, height: 390 },
    { width: 915, height: 412 }, { width: 1024, height: 600 }
  ]) {
    const { width, height } = viewport;
    await page.setViewportSize(viewport);
    for (const view of ["home", "settings", "quiz", "results"]) {
      if (view === "settings") await page.locator("#settings-open").click();
      if (view === "quiz") {
        await page.locator("#play-button").click();
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      if (overflow) throw new Error(`Horizontal overflow detected at ${width}px (${view})`);
      if (view === "settings") await page.locator("#settings-back").click();
      if (view === "quiz") {
        const total = Number((await page.locator("#progress-label").textContent()).split("/")[1].trim());
        if (!Number.isInteger(total) || total < 1 || total > 5) {
          throw new Error(`Responsive quiz round length invalid at ${width}x${height}: ${total}`);
        }
        for (let index = 0; index < total; index += 1) {
          await page.locator("#answers button.answer-option").first().click();
          await page.locator("#next-button").click();
        }
        if (!(await page.locator("#result-view").isVisible())) {
          throw new Error(`Responsive results view did not open at ${width}x${height}`);
        }
        const resultOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        if (resultOverflow) throw new Error(`Horizontal overflow detected at ${width}x${height} (results)`);
        await page.locator("#home-button").click();
      }
      if (view === "results") {
        await page.locator("#play-button").click();
        const total = Number((await page.locator("#progress-label").textContent()).split("/")[1].trim());
        for (let index = 0; index < total; index += 1) {
          await page.locator("#answers button.answer-option").first().click();
          await page.locator("#next-button").click();
        }
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
        if (overflow) throw new Error(`Horizontal overflow detected at ${width}x${height} (results)`);
        await page.locator("#home-button").click();
      }
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

  // Malformed local data must fall back safely without breaking the offline app.
  const recoveryPage = await browser.newPage();
  const recoveryErrors = [];
  recoveryPage.on("pageerror", error => recoveryErrors.push(error.message));
  await recoveryPage.addInitScript(() => {
    localStorage.setItem("mindquest.settings", "{malformed-json");
    localStorage.setItem("mindquest.theme", "not-a-real-theme");
    localStorage.setItem("mindquest.access.largeText", "not-boolean");
    localStorage.setItem("mindquest.access.reducedMotion", "not-boolean");
    localStorage.setItem("mindquest.access.highContrast", "not-boolean");
    localStorage.setItem("mindquest.best.IN.all.all.10", JSON.stringify({ score: 999, total: 10, extra: true }));
    localStorage.setItem("mindquest.best.IN.all.all.5", JSON.stringify({ score: 4, total: 5 }));
    localStorage.setItem("mindquest.best.IN.History.hard.10", JSON.stringify({ score: 9, total: 10 }));
  });
  await recoveryPage.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await recoveryPage.locator("#splash-dismiss").click();
  if (!(await recoveryPage.locator("#home-view").isVisible())) {
    throw new Error("Malformed local data prevented Home from loading");
  }
  if (await recoveryPage.locator("html").getAttribute("data-theme") !== "obsidian") {
    throw new Error("Invalid stored theme did not fall back to the default");
  }
  if (await recoveryPage.locator("html").evaluate(node => node.classList.contains("large-text") ||
      node.classList.contains("user-reduced-motion") || node.classList.contains("user-high-contrast"))) {
    throw new Error("Invalid accessibility preference values were not safely rejected");
  }
  await recoveryPage.locator("#settings-open").click();
  for (const [id, expected] of [["#question-region", "IN"], ["#question-locale", "en-IN"],
    ["#question-category", "all"], ["#question-difficulty", "all"], ["#round-length", "10"]]) {
    if (await recoveryPage.locator(id).inputValue() !== expected) {
      throw new Error("Malformed settings did not normalize safely: " + id);
    }
  }
  await recoveryPage.locator("#round-length").selectOption("5");
  await recoveryPage.locator("#settings-save").click();
  if (await recoveryPage.locator("#best-score").textContent() !== "4 / 5 · 80%") {
    throw new Error("Best score was not restored for its exact five-question scope");
  }
  await recoveryPage.locator("#settings-open").click();
  await recoveryPage.locator("#round-length").selectOption("10");
  await recoveryPage.locator("#question-category").selectOption("History");
  await recoveryPage.locator("#question-difficulty").selectOption("hard");
  await recoveryPage.locator("#settings-save").click();
  if (await recoveryPage.locator("#best-score").textContent() !== "9 / 10 · 90%") {
    throw new Error("Best score was not isolated to the selected region/category/difficulty/round length");
  }
  await recoveryPage.locator("#settings-open").click();
  await recoveryPage.locator("#question-category").selectOption("Geography");
  await recoveryPage.locator("#settings-save").click();
  if (await recoveryPage.locator("#best-score").textContent() !== "—") {
    throw new Error("Best score leaked across category scopes or malformed data was accepted");
  }
  if (recoveryErrors.length) throw new Error("Malformed-storage runtime errors: " + recoveryErrors.join(" | "));
  await recoveryPage.close();

  // Storage denial must degrade gracefully without preventing a playable Home view.
  const deniedStoragePage = await browser.newPage();
  await deniedStoragePage.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() { throw new DOMException("Storage access denied", "SecurityError"); }
    });
  });
  await deniedStoragePage.goto("http://127.0.0.1:4173/", { waitUntil: "networkidle" });
  await deniedStoragePage.locator("#splash-dismiss").click();
  if (!(await deniedStoragePage.locator("#home-view").isVisible())) {
    throw new Error("Storage denial prevented the Home view from loading");
  }
  if (!(await deniedStoragePage.locator("#storage-status").isVisible())) {
    throw new Error("Storage denial was not communicated to the user");
  }
  await deniedStoragePage.close();

  if (pageErrors.length) throw new Error("Browser runtime errors: " + pageErrors.join(" | "));
  console.log("Browser regression passed: modal launch keyboard isolation, theme keyboard flow, ten themes and focus contrast, 45 selector combinations, 5/10/15 difficulty-balanced rounds, stable question IDs, 50-question cycle exhaustion, all 36 region/category/difficulty filters, accessible results focus/review, eight portrait/landscape profiles, scoped best scores, malformed-storage recovery and zero external runtime requests.");
} finally {
  if (browser) await browser.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
