(() => {
  "use strict";

  const themes = {
    obsidian: { label:"Obsidian", bg:"#0b1220", panel:"#131f32", panel2:"#192941", text:"#f4f7fb", muted:"#9aabc1", accent:"#8ce3c1", accent2:"#f5c979", line:"#293b54", hero1:"#1a3048", hero2:"#122238" },
    midnight: { label:"Midnight", bg:"#090b1d", panel:"#17162e", panel2:"#242044", text:"#f5f1ff", muted:"#b5accf", accent:"#b7a0ff", accent2:"#71e5ff", line:"#3a315d", hero1:"#28204e", hero2:"#151b3a" },
    aurora: { label:"Aurora", bg:"#071b20", panel:"#103039", panel2:"#16434a", text:"#effffb", muted:"#a3c9c3", accent:"#6df0c2", accent2:"#b5f36d", line:"#28545a", hero1:"#14534d", hero2:"#12323e" },
    ocean: { label:"Deep Ocean", bg:"#071725", panel:"#102a40", panel2:"#173a55", text:"#eef8ff", muted:"#a5bfd2", accent:"#62d8ff", accent2:"#ffc66e", line:"#28506a", hero1:"#12466a", hero2:"#102b49" },
    forest: { label:"Forest", bg:"#101b14", panel:"#1b2b20", panel2:"#263c2c", text:"#f2faef", muted:"#b1c4ad", accent:"#a5e6a1", accent2:"#f3d17b", line:"#3b5740", hero1:"#294b35", hero2:"#1a3024" },
    ember: { label:"Ember", bg:"#21110f", panel:"#351d1a", panel2:"#4a2923", text:"#fff5ef", muted:"#d2aaa0", accent:"#ff9b75", accent2:"#ffd36d", line:"#684039", hero1:"#653324", hero2:"#3b211e" },
    royal: { label:"Royal", bg:"#151026", panel:"#251c3e", panel2:"#342752", text:"#f8f3ff", muted:"#c2b4da", accent:"#c5a5ff", accent2:"#f4d27d", line:"#4b3b6b", hero1:"#49306d", hero2:"#261f48" },
    rose: { label:"Rose Quartz", bg:"#21131d", panel:"#382331", panel2:"#4a3041", text:"#fff4fa", muted:"#d4b4c5", accent:"#ff9bc9", accent2:"#ffd28b", line:"#69445d", hero1:"#69344f", hero2:"#39243d" },
    sand: { label:"Desert Sand", bg:"#211b13", panel:"#352b1d", panel2:"#4a3b27", text:"#fff8e9", muted:"#d2c2a4", accent:"#f0c77b", accent2:"#a8dfc1", line:"#66553a", hero1:"#66502c", hero2:"#3c3020" },
    paper: { label:"Paper", bg:"#f3f0e8", panel:"#fffdf7", panel2:"#e8e2d5", text:"#252b32", muted:"#5c6670", accent:"#176c60", accent2:"#9b5a18", line:"#c9c2b4", hero1:"#e4eee7", hero2:"#dbe5e7" }
  };

  const root = document.documentElement;
  const read = (key, fallback) => {
    try { return localStorage.getItem(key) || fallback; } catch (_) { return fallback; }
  };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch (_) { /* private mode */ } };

  function applyTheme(name) {
    const selected = themes[name] ? name : "obsidian";
    const palette = themes[selected];
    root.dataset.theme = selected;
    Object.entries(palette).forEach(([key, value]) => {
      if (key !== "label") root.style.setProperty("--" + key, value);
    });
    const select = document.getElementById("theme-select");
    if (select) select.value = selected;
    write("mindquest.theme", selected);
  }

  function applyAccessibility() {
    const large = read("mindquest.access.largeText", "false") === "true";
    const reduced = read("mindquest.access.reducedMotion", "false") === "true";
    const contrast = read("mindquest.access.highContrast", "false") === "true";
    root.classList.toggle("large-text", large);
    root.classList.toggle("user-reduced-motion", reduced);
    root.classList.toggle("user-high-contrast", contrast);
    [["setting-large-text", large, "largeText"], ["setting-reduced-motion", reduced, "reducedMotion"], ["setting-high-contrast", contrast, "highContrast"]].forEach(([id, value, key]) => {
      const control = document.getElementById(id);
      if (control) control.checked = value;
    });
  }

  const actions = document.querySelector(".topbar-actions");
  const panel = document.createElement("div");
  panel.id = "theme-panel";
  panel.className = "theme-panel";
  panel.hidden = true;
  const label = document.createElement("label");
  label.htmlFor = "theme-select";
  label.textContent = "Colour theme";
  const select = document.createElement("select");
  select.id = "theme-select";
  select.setAttribute("aria-label", "Choose application colour theme");
  Object.entries(themes).forEach(([value, theme]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = theme.label;
    select.append(option);
  });
  panel.append(label, select);
  actions.append(panel);

  const themeButton = document.getElementById("theme-open");
  themeButton.addEventListener("click", () => {
    panel.hidden = !panel.hidden;
    themeButton.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) select.focus();
  });
  select.addEventListener("change", () => applyTheme(select.value));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && !panel.hidden) {
      panel.hidden = true;
      themeButton.setAttribute("aria-expanded", "false");
      themeButton.focus();
    }
  });

  const access = [
    ["setting-large-text", "largeText"],
    ["setting-reduced-motion", "reducedMotion"],
    ["setting-high-contrast", "highContrast"]
  ];
  access.forEach(([id, key]) => {
    const control = document.getElementById(id);
    control.addEventListener("change", () => {
      write("mindquest.access." + key, String(control.checked));
      applyAccessibility();
    });
  });

  function showDocumentView(id) {
    document.querySelectorAll(".view").forEach(view => {
      const active = view.id === id;
      view.hidden = !active;
      view.classList.toggle("active", active);
    });
    const heading = document.querySelector("#" + id + " h1");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    }
    panel.hidden = true;
    themeButton.setAttribute("aria-expanded", "false");
  }

  document.getElementById("privacy-link").addEventListener("click", event => {
    event.preventDefault();
    showDocumentView("privacy-view");
  });
  document.getElementById("accessibility-link").addEventListener("click", () => showDocumentView("accessibility-view"));
  document.getElementById("privacy-back").addEventListener("click", () => showDocumentView("home-view"));
  document.getElementById("accessibility-back").addEventListener("click", () => showDocumentView("home-view"));

  applyTheme(read("mindquest.theme", "obsidian"));
  applyAccessibility();

  const splash = document.getElementById("launch-splash");
  let dismissed = false;
  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    splash.classList.add("splash-dismissed");
    window.setTimeout(() => splash.remove(), 240);
  };
  document.getElementById("splash-dismiss").addEventListener("click", dismiss);
  splash.addEventListener("click", dismiss);
  window.setTimeout(dismiss, 5000);
})();