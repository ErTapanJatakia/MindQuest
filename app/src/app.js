(() => {
  "use strict";

  const LOCALES = ["en-IN", "en-US", "ru-RU"];
  const REGIONS = ["IN", "RU", "US"];
  const REGION_NAMES = {
    "en-IN": { IN: "India", RU: "Russia", US: "United States" },
    "en-US": { IN: "India", RU: "Russia", US: "United States" },
    "ru-RU": { IN: "Индия", RU: "Россия", US: "США" }
  };
  const UI = {
    "en-IN": {
      eyebrow:"A little challenge for your mind",welcome:"Ready to think?",intro:"Explore the world, one question at a time.",
      play:"Start a round",bestScore:"Best score",questionRegion:"Question region",offline:"Ready to play offline",
      next:"Next question",roundComplete:"ROUND COMPLETE",wellPlayed:"Well played!",points:"points",
      playAgain:"Play again",home:"Home",personalise:"MAKE IT YOURS",settings:"Settings",
      settingsIntro:"These choices are independent. Mix any interface, region and question language.",
      interfaceLanguage:"Interface language",questionLanguage:"Question language",save:"Save settings",back:"Back",
      freeOffline:"Free · Offline · No account",correct:"Correct! ",incorrect:"Not quite. ",roundScore:"You scored {score} out of {total}.",
      noQuestions:"There are no questions available for this selection yet.",question:"QUESTION",round:"ROUND 1"
    },
    "en-US": {
      eyebrow:"A little challenge for your mind",welcome:"Ready to think?",intro:"Explore the world, one question at a time.",
      play:"Start a round",bestScore:"Best score",questionRegion:"Question region",offline:"Ready to play offline",
      next:"Next question",roundComplete:"ROUND COMPLETE",wellPlayed:"Well played!",points:"points",
      playAgain:"Play again",home:"Home",personalise:"MAKE IT YOURS",settings:"Settings",
      settingsIntro:"These choices are independent. Mix any interface, region and question language.",
      interfaceLanguage:"Interface language",questionLanguage:"Question language",save:"Save settings",back:"Back",
      freeOffline:"Free · Offline · No account",correct:"Correct! ",incorrect:"Not quite. ",roundScore:"You scored {score} out of {total}.",
      noQuestions:"There are no questions available for this selection yet.",question:"QUESTION",round:"ROUND 1"
    },
    "ru-RU": {
      eyebrow:"Небольшая тренировка для ума",welcome:"Готовы подумать?",intro:"Открывайте мир — вопрос за вопросом.",
      play:"Начать раунд",bestScore:"Лучший результат",questionRegion:"Регион вопросов",offline:"Можно играть офлайн",
      next:"Следующий вопрос",roundComplete:"РАУНД ЗАВЕРШЁН",wellPlayed:"Отличная игра!",points:"баллов",
      playAgain:"Сыграть ещё раз",home:"На главную",personalise:"ВАШИ НАСТРОЙКИ",settings:"Настройки",
      settingsIntro:"Эти параметры независимы. Вы можете сочетать любой язык интерфейса, регион и язык вопросов.",
      interfaceLanguage:"Язык интерфейса",questionLanguage:"Язык вопросов",save:"Сохранить настройки",back:"Назад",
      freeOffline:"Бесплатно · Офлайн · Без аккаунта",correct:"Верно! ",incorrect:"Не совсем. ",roundScore:"Ваш результат: {score} из {total}.",
      noQuestions:"Для выбранных параметров пока нет вопросов.",question:"ВОПРОС",round:"РАУНД 1"
    }
  };
  function suggestedInterfaceLocale() {
    const deviceLocale = String(navigator.language || "").toLowerCase();
    if (deviceLocale === "ru" || deviceLocale.startsWith("ru-")) return "ru-RU";
    if (deviceLocale === "en-us" || deviceLocale.startsWith("en-us-")) return "en-US";
    return "en-IN";
  }
  const DEFAULTS = { interfaceLocale:suggestedInterfaceLocale(), questionRegion:"IN", questionLocale:"en-IN" };
  const safeStorage = {
    get(key) { try { return localStorage.getItem(key); } catch (_) { return null; } },
    set(key, value) { try { localStorage.setItem(key, value); } catch (_) { /* Private mode: app remains usable. */ } }
  };
  function loadSettings() {
    let saved = {};
    try { saved = JSON.parse(safeStorage.get("mindquest.settings") || "{}"); } catch (_) { saved = {}; }
    return {
      interfaceLocale: LOCALES.includes(saved.interfaceLocale) ? saved.interfaceLocale : DEFAULTS.interfaceLocale,
      questionRegion: REGIONS.includes(saved.questionRegion) ? saved.questionRegion : DEFAULTS.questionRegion,
      questionLocale: LOCALES.includes(saved.questionLocale) ? saved.questionLocale : DEFAULTS.questionLocale
    };
  }

  let settings = loadSettings();
  let round = [];
  let current = 0;
  let score = 0;
  let answered = false;
  let lastView = "home-view";
  const $ = (id) => document.getElementById(id);
  const views = ["home-view", "quiz-view", "result-view", "settings-view"];
  const t = (key) => (UI[settings.interfaceLocale] || UI["en-IN"])[key] || key;
  const localeName = (locale) => locale === "ru-RU" ? "Русский" : locale === "en-US" ? "English (US)" : "English (India)";
  const regionName = (region) => REGION_NAMES[settings.interfaceLocale][region];

  function showView(id) {
    views.forEach((viewId) => {
      const node = $(viewId);
      const active = viewId === id;
      node.classList.toggle("active", active);
      node.hidden = !active;
    });
    if (id === "quiz-view") $("question-title").focus();
  }

  function applyInterface() {
    document.documentElement.lang = settings.interfaceLocale;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const key = node.dataset.i18n;
      if (t(key)) node.textContent = t(key);
    });
    $("interface-locale").value = settings.interfaceLocale;
    $("question-region").value = settings.questionRegion;
    $("question-locale").value = settings.questionLocale;
    $("home-region").textContent = regionName(settings.questionRegion);
    const best = safeStorage.get("mindquest.best") || "0";
    const bestTotal = safeStorage.get("mindquest.bestTotal") || String(Math.min(10, (window.MINDQUEST_QUESTIONS || []).filter((q) => q.region === settings.questionRegion).length || 10));
    $("best-score").textContent = best + " / " + bestTotal;
    $("answers").setAttribute("aria-label", settings.interfaceLocale === "ru-RU" ? "Варианты ответа" : "Answer options");
  }

  function openSettings() {
    lastView = views.find((id) => $(id).classList.contains("active")) || "home-view";
    $("interface-locale").value = settings.interfaceLocale;
    $("question-region").value = settings.questionRegion;
    $("question-locale").value = settings.questionLocale;
    showView("settings-view");
  }

  function startRound() {
    const pool = (window.MINDQUEST_QUESTIONS || []).filter((q) => q.region === settings.questionRegion && q.translations[settings.questionLocale]);
    if (!pool.length) {
      $("result-title").textContent = t("noQuestions");
      $("final-score").textContent = "—";
      $("result-message").textContent = "";
      showView("result-view");
      return;
    }
    const shuffled = [...pool];
    // Fisher–Yates gives every question an equal chance of occupying each position.
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    round = shuffled.slice(0, 10);
    current = 0;
    score = 0;
    renderQuestion();
    showView("quiz-view");
  }

  function renderQuestion() {
    answered = false;
    const item = round[current];
    const copy = item.translations[settings.questionLocale];
    $("round-label").textContent = t("round");
    $("progress-label").textContent = (current + 1) + " / " + round.length;
    $("progress-fill").style.width = (((current + 1) / round.length) * 100) + "%";
    $("category-label").textContent = item.category.toUpperCase();
    $("question-title").textContent = copy.question;
    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("next-button").disabled = true;
    $("next-button").textContent = current === round.length - 1 ? (settings.interfaceLocale === "ru-RU" ? "Результаты" : "See results") : t("next");
    const labels = ["A", "B", "C", "D"];
    const host = $("answers");
    host.replaceChildren();
    labels.forEach((letter, index) => {
      const key = letter.toLowerCase();
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      button.dataset.answer = key;
      const marker = document.createElement("span");
      marker.className = "letter";
      marker.textContent = letter;
      const text = document.createElement("span");
      text.textContent = copy.options[key];
      button.append(marker, text);
      button.addEventListener("click", () => chooseAnswer(key, item, copy));
      host.append(button);
    });
  }

  function chooseAnswer(choice, item, copy) {
    if (answered) return;
    answered = true;
    const correct = choice === item.correct;
    if (correct) score += 1;
    $("answers").querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (button.dataset.answer === item.correct) button.classList.add("correct");
      else if (button.dataset.answer === choice) button.classList.add("incorrect");
    });
    $("feedback").textContent = (correct ? t("correct") : t("incorrect")) + copy.explanation;
    $("feedback").classList.add(correct ? "good" : "bad");
    $("next-button").disabled = false;
  }

  function showResults() {
    $("result-title").textContent = t("wellPlayed");
    $("final-score").textContent = score + "/" + round.length;
    $("result-message").textContent = t("roundScore").replace("{score}", score).replace("{total}", round.length);
    const best = Number(safeStorage.get("mindquest.best") || 0);
    if (score > best) safeStorage.set("mindquest.best", String(score));
    applyInterface();
    showView("result-view");
  }

  $("play-button").addEventListener("click", startRound);
  $("replay-button").addEventListener("click", startRound);
  $("home-button").addEventListener("click", () => showView("home-view"));
  $("settings-open").addEventListener("click", openSettings);
  $("brand-home").addEventListener("click", (event) => { event.preventDefault(); showView("home-view"); });
  $("settings-back").addEventListener("click", () => showView(lastView));
  $("settings-save").addEventListener("click", () => {
    settings = {
      interfaceLocale: $("interface-locale").value,
      questionRegion: $("question-region").value,
      questionLocale: $("question-locale").value
    };
    safeStorage.set("mindquest.settings", JSON.stringify(settings));
    applyInterface();
    showView(lastView);
  });
  $("next-button").addEventListener("click", () => {
    if (!answered) return;
    if (current < round.length - 1) { current += 1; renderQuestion(); }
    else showResults();
  });

  applyInterface();
  showView("home-view");
})();
