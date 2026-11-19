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
    response.writeHead(200, { "content-type":mime[extname(file)] || "application/octet-stream" });
    response.end(await readFile(file));
  } catch { response.writeHead(404).end("Not found"); }
});

const failures = [];
let browser;
try {
  await new Promise((resolveListen, reject) => {
    server.once("error", reject);
    server.listen(4179, "127.0.0.1", resolveListen);
  });
  browser = await chromium.launch({headless:true});
  const page = await browser.newPage();
  page.on("pageerror", error => failures.push("Browser runtime: " + error.message));
  await page.goto("http://127.0.0.1:4179/", {waitUntil:"networkidle"});
  await page.keyboard.press("Escape");
  await page.locator("#launch-splash").waitFor({state:"detached"});

  async function auditView(name) {
    const result = await page.evaluate(() => {
      const selector = 'button,a[href],input:not([type="hidden"]),select,textarea,[role="button"],[role="radio"]';
      const visible = element => {
        const style = getComputedStyle(element);
        return style.display !== "none" && style.visibility !== "hidden" &&
          element.getClientRects().length > 0 && !element.closest("[hidden],[aria-hidden='true'],[inert]");
      };
      const controls = [...document.querySelectorAll(selector)]
        .filter(element => visible(element) && !element.classList.contains("search-backed-select"))
        .map(element => {
          const labelledby = element.getAttribute("aria-labelledby");
          const labelledText = labelledby ? labelledby.split(/\s+/).map(id => document.getElementById(id)?.textContent || "").join(" ").trim() : "";
          const labelText = element.labels ? [...element.labels].map(label => label.textContent || "").join(" ").trim() : "";
          const name = element.getAttribute("aria-label") || labelledText || labelText ||
            element.innerText?.trim() || element.value?.trim() || element.getAttribute("title") || "";
          return {
            tag:element.tagName.toLowerCase(),
            role:element.getAttribute("role") || "",
            id:element.id || "",
            name:name.replace(/\s+/g," ").trim(),
            checked:element.getAttribute("aria-checked"),
            disabled:element.disabled === true
          };
        });
      const brokenRefs = [...document.querySelectorAll("[aria-labelledby],[aria-describedby]")]
        .flatMap(element => ["aria-labelledby","aria-describedby"].flatMap(attribute =>
          (element.getAttribute(attribute) || "").split(/\s+/).filter(Boolean)
            .filter(id => !document.getElementById(id)).map(id => ({element:element.id || element.tagName,attribute,id}))));
      const duplicateIds = [...document.querySelectorAll("[id]")].map(element => element.id)
        .filter((id,index,all) => all.indexOf(id)!==index);
      return {controls,brokenRefs,duplicateIds};
    });
    const unnamed = result.controls.filter(control => !control.name);
    if (unnamed.length) failures.push(name + ": unnamed visible controls: " + JSON.stringify(unnamed));
    if (result.brokenRefs.length) failures.push(name + ": broken ARIA references: " + JSON.stringify(result.brokenRefs));
    if (result.duplicateIds.length) failures.push(name + ": duplicate IDs: " + JSON.stringify([...new Set(result.duplicateIds)]));
    console.log((unnamed.length || result.brokenRefs.length || result.duplicateIds.length ? "FAIL " : "PASS ") +
      name + " — " + result.controls.length + " visible interactive controls audited");
  }

  const interfaceLocales = ["en-IN", "en-US", "ru-RU", "es-ES", "es-PE"];
  for (const locale of interfaceLocales) {
    await page.locator("#settings-open").click();
    await page.locator("#interface-locale").selectOption(locale);
    await page.locator("#round-length").selectOption("5");
    await page.locator("#settings-save").click();
    const activeLocale = await page.locator("html").getAttribute("lang");
    if (activeLocale !== locale) throw new Error("Interface locale did not apply before accessible-name audit: " + locale + " -> " + activeLocale);

    await auditView(locale + " — Home");
    await page.locator("#settings-open").click();
    await auditView(locale + " — Settings");
    await page.locator("#settings-back").click();
    await page.locator("#home-help").click();
    await auditView(locale + " — Help");
    await page.locator("#help-back").click();
    await page.locator("#privacy-link").click();
    await auditView(locale + " — Privacy");
    await page.locator("#privacy-back").click();
    await page.locator("#accessibility-link").click();
    await auditView(locale + " — Accessibility statement");
    await page.locator("#accessibility-back").click();

    await page.locator("#play-button").click();
    await auditView(locale + " — Quiz");
    for (let index = 0; index < 5; index += 1) {
      const answers = page.locator("#answers button[role=radio]");
      if (!(await answers.count())) throw new Error(locale + " — Quiz answer controls missing at question " + (index + 1));
      await auditView(locale + " — Quiz question " + (index + 1));
      await answers.first().click();
      const next = page.locator("#next-button");
      await next.waitFor({ state:"visible" });
      await next.click();
    }
    await page.locator("#result-view.active").waitFor({ state:"visible" });
    await auditView(locale + " — Results and answer review");
    if (locale !== interfaceLocales.at(-1)) await page.locator("#brand-home").click();
  }

  if (failures.length) throw new Error(failures.join("\n"));
  console.log("Accessible-name regression passed across all five interface locales and seven views, including five-question gameplay and results review; no unnamed visible controls, broken ARIA ID references or duplicate IDs.");
} finally {
  await browser?.close();
  await new Promise(resolveClose => server.close(resolveClose));
}
