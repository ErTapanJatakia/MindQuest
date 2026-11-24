(() => {
  "use strict";

  const themes = {
    obsidian: { label: "Obsidian" },
    midnight: { label: "Midnight" },
    aurora: { label: "Aurora" },
    ocean: { label: "Deep Ocean" },
    forest: { label: "Forest" },
    ember: { label: "Ember" },
    royal: { label: "Royal" },
    rose: { label: "Rose Quartz" },
    sand: { label: "Desert Sand" },
    paper: { label: "Paper" }
  };

  // Discourage casual copying of application content across every app view.
  // This is a UI deterrent, not a security boundary against browser tools or screenshots.
  document.addEventListener("copy", event => event.preventDefault(), true);
  document.addEventListener("cut", event => event.preventDefault(), true);
  document.addEventListener("contextmenu", event => event.preventDefault(), true);
  document.addEventListener("keydown", event => {
    const key = event.key.toLowerCase();
    const modifier = event.ctrlKey || event.metaKey;
    const copyShortcut = modifier && ["a", "c", "x"].includes(key);
    const legacyCopyShortcut = event.shiftKey && key === "insert";
    if (copyShortcut || legacyCopyShortcut) event.preventDefault();
  }, true);

  const root = document.documentElement;
  const read = (key, fallback) => {
    try { return localStorage.getItem(key) || fallback; } catch (_) { return fallback; }
  };
  const write = (key, value) => { try { localStorage.setItem(key, value); } catch (_) { /* private mode */ } };

  function applyTheme(name) {
    const selected = themes[name] ? name : "obsidian";
    root.dataset.theme = selected;
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

  const themeSelect = document.getElementById("theme-select");
  themeSelect.addEventListener("change", () => applyTheme(themeSelect.value));
  const access = [["setting-large-text","largeText"],["setting-reduced-motion","reducedMotion"],["setting-high-contrast","highContrast"]];
  access.forEach(([id,key]) => {
    const control=document.getElementById(id);
    control.addEventListener("change",()=>{write("mindquest.access."+key,String(control.checked));applyAccessibility();});
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
  const splashButton = document.getElementById("splash-dismiss");
  const appShell = document.querySelector(".app-shell");
  let dismissed = false;

  // Keep the launch dialog genuinely modal for keyboard and assistive-technology users.
  // The application is unavailable until the splash is dismissed.
  appShell.inert = true;
  appShell.setAttribute("aria-hidden", "true");

  const dismiss = () => {
    if (dismissed) return;
    dismissed = true;
    appShell.inert = false;
    appShell.removeAttribute("aria-hidden");
    splash.classList.add("splash-dismissed");
    window.setTimeout(() => {
      splash.remove();
      document.getElementById("home-title")?.focus();
    }, 240);
  };
  splashButton.addEventListener("click", dismiss);
  splash.addEventListener("click", dismiss);
  splash.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      event.preventDefault();
      dismiss();
      return;
    }
    if (event.key === "Tab") {
      const focusable = [...splash.querySelectorAll("button:not([disabled]),a[href]")];
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
  splashButton.focus();
  window.setTimeout(dismiss, 5000);
})();