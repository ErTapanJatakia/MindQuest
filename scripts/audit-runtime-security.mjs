import { readFile } from "node:fs/promises";

const html = await readFile("app/index.html", "utf8");
const runtimeFiles = [
  "app/src/app.js",
  "app/src/experience.js",
  "app/src/ui-polish.js"
];
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };

const cspTag = html.match(/<meta\s+http-equiv="Content-Security-Policy"[^>]*content="([^"]+)"[^>]*>/i);
check(Boolean(cspTag), "A Content-Security-Policy meta element is required.");
const directives = new Map((cspTag?.[1] || "").split(";").map(value => {
  const [name, ...tokens] = value.trim().split(/\s+/);
  return [name, tokens];
}).filter(([name]) => name));

const required = {
  "default-src": ["'self'", "file:"],
  "script-src": ["'self'", "file:"],
  "connect-src": ["'none'"],
  "object-src": ["'none'"],
  "base-uri": ["'self'"],
  "form-action": ["'none'"]
};
for (const [name, tokens] of Object.entries(required)) {
  const actual = directives.get(name) || [];
  for (const token of tokens) check(actual.includes(token), `CSP ${name} must include ${token}.`);
}
for (const name of ["script-src", "default-src", "connect-src", "object-src"]) {
  const tokens = directives.get(name) || [];
  check(!tokens.includes("*"), `CSP ${name} must not contain a wildcard source.`);
  check(!tokens.includes("'unsafe-eval'"), `CSP ${name} must not permit unsafe-eval.`);
}
check(!(directives.get("script-src") || []).includes("'unsafe-inline'"),
  "CSP script-src must not permit inline scripts.");

const scriptTags = [...html.matchAll(/<script\b([^>]*)>/gi)].map(match => match[1]);
check(scriptTags.length > 0, "The application must load its local runtime scripts.");
for (const [index, attributes] of scriptTags.entries()) {
  const src = attributes.match(/\bsrc=["']([^"']+)["']/i)?.[1];
  check(Boolean(src), `Script tag ${index + 1} must use a local external source.`);
  if (src) check(!/^(?:https?:)?\/\//i.test(src), `Remote script source is forbidden: ${src}`);
  check(!/\bon[a-z]+\s*=/i.test(attributes), `Inline event handler found on script tag ${index + 1}.`);
}
for (const [index, attributes] of [...html.matchAll(/<link\b([^>]*)>/gi)].map(match => match[1]).entries()) {
  const href = attributes.match(/\bhref=["']([^"']+)["']/i)?.[1];
  if (href) check(!/^(?:https?:)?\/\//i.test(href), `Remote linked asset is forbidden: ${href}`);
}
check(!/<(?:iframe|object|embed)\b/i.test(html), "Embedded active-content elements are not permitted.");
check(!/\bon[a-z]+\s*=/i.test(html), "Inline HTML event handlers are not permitted.");
check(!/staged-region-questions-batch/i.test(html), "Unreviewed Spain/Peru staged content must not be loaded at runtime.");

for (const path of runtimeFiles) {
  const source = await readFile(path, "utf8");
  for (const api of ["fetch", "XMLHttpRequest", "WebSocket", "EventSource", "sendBeacon", "importScripts"]) {
    check(!new RegExp(`\\b${api}\\b`).test(source),
      `${path} must not use network API ${api}; MindQuest runtime is offline-only.`);
  }
  check(!/\beval\s*\(|\bnew\s+Function\s*\(/.test(source),
    `${path} must not use dynamic code evaluation.`);
  check(!/document\.write\s*\(/.test(source), `${path} must not use document.write().`);
}

console.log("MindQuest offline/security boundary audit");
console.log(`Checked CSP directives, ${scriptTags.length} local script tags, linked assets, embedded content, staged-data exclusion and ${runtimeFiles.length} runtime modules.`);
if (failures.length) {
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log("All static offline/security boundary checks passed.");
}
