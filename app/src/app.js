(() => {
  "use strict";

  const LOCALES = ["en-IN", "en-US", "ru-RU"];
  const REGIONS = ["IN", "RU", "US"];
  const CATEGORIES = ["Geography", "History", "Science", "Culture"];
  const REGION_NAMES = {
    "en-IN": {
      categoryGeography:"Geography",categoryHistory:"History",categoryScience:"Science",categoryCulture:"Culture",
      categoryFilter:"Category",difficultyFilter:"Difficulty",allCategories:"All categories",anyDifficulty:"Any difficulty",easy:"Easy",medium:"Medium",hard:"Hard", IN: "India", RU: "Russia", US: "United States" },
    "en-US": {
      categoryGeography:"Geography",categoryHistory:"History",categoryScience:"Science",categoryCulture:"Culture",
      categoryFilter:"Category",difficultyFilter:"Difficulty",allCategories:"All categories",anyDifficulty:"Any difficulty",easy:"Easy",medium:"Medium",hard:"Hard", IN: "India", RU: "Russia", US: "United States" },
    "ru-RU": {
      categoryGeography:"География",categoryHistory:"История",categoryScience:"Наука",categoryCulture:"Культура",
      categoryFilter:"Категория",difficultyFilter:"Сложность",allCategories:"Все категории",anyDifficulty:"Любая сложность",easy:"Лёгкая",medium:"Средняя",hard:"Сложная", IN: "Индия", RU: "Россия", US: "США" }
  };
  const UI = {
    "en-IN": {
      categoryFilter:"Category",difficultyFilter:"Difficulty",allCategories:"All categories",anyDifficulty:"Any difficulty",easy:"Easy",medium:"Medium",hard:"Hard",categoryGeography:"Geography",categoryHistory:"History",categoryScience:"Science",categoryCulture:"Culture",
      eyebrow:"A little challenge for your mind",welcome:"Ready to think?",intro:"Explore the world, one question at a time.",
      play:"Start a round",bestScore:"Best score",questionRegion:"Question region",offline:"Ready to play offline",progress:"Question progress",
      next:"Next question",seeResults:"See results",round:"ROUND",roundComplete:"ROUND COMPLETE",wellPlayed:"Well played!",points:"points",
      playAgain:"Play again",home:"Home",personalise:"MAKE IT YOURS",settings:"Settings",
      settingsIntro:"Choose each setting independently: interface language, question region and question language.",
      interfaceLanguage:"Interface language",questionLanguage:"Question language",save:"Save settings",back:"Back",settingsButtonLabel:"Open settings",homeLinkLabel:"MindQuest home",
      freeOffline:"Free · Offline · No account",correct:"Correct! ",incorrect:"Not quite. ",roundScore:"You scored {score} out of {total}.",accuracy:"Accuracy: {percent}%",reviewTitle:"Answer review",yourAnswer:"Your answer",correctAnswer:"Correct answer",unanswered:"Not answered",accuracy:"Accuracy: {percent}%",reviewTitle:"Answer review",yourAnswer:"Your answer",correctAnswer:"Correct answer",unanswered:"Not answered",
      help:"How to play",helpEyebrow:"THE QUICK GUIDE",helpTitle:"How to play",helpStartTitle:"Play a round",helpStartBody:"Choose a region, question language, category and difficulty in Settings, then start a round. Each round contains up to ten multiple-choice questions.",helpScoringTitle:"Scoring and results",helpScoringBody:"Choose one answer per question. Correct answers earn one point. Your results show your score, accuracy, the correct answers and explanations.",helpDifficultyTitle:"Categories and difficulty",helpDifficultyBody:"Explore Geography, History, Science or Culture. Choose Easy, Medium or Hard, or leave the filters open to mix the available questions.",helpLanguageTitle:"Three independent choices",helpLanguageBody:"Interface language controls menus; question region selects the knowledge set; question language controls question wording. Any supported combination is valid.",helpPrivacyTitle:"Free, private and offline",helpPrivacyBody:"MindQuest is free to play, works offline and needs no account. Settings and best scores stay in local app storage; no ads or paid services are used.",noQuestions:"There are no questions available for this selection yet.",noQuestionsHint:"Try a different category or difficulty in Settings.",question:"QUESTION"
    },
    "en-US": {
      categoryFilter:"Category",difficultyFilter:"Difficulty",allCategories:"All categories",anyDifficulty:"Any difficulty",easy:"Easy",medium:"Medium",hard:"Hard",categoryGeography:"Geography",categoryHistory:"History",categoryScience:"Science",categoryCulture:"Culture",
      eyebrow:"A little challenge for your mind",welcome:"Ready to think?",intro:"Explore the world, one question at a time.",
      play:"Start a round",bestScore:"Best score",questionRegion:"Question region",offline:"Ready to play offline",progress:"Question progress",
      next:"Next question",seeResults:"See results",round:"ROUND",roundComplete:"ROUND COMPLETE",wellPlayed:"Well played!",points:"points",
      playAgain:"Play again",home:"Home",personalise:"MAKE IT YOURS",settings:"Settings",
      settingsIntro:"Choose your interface language, question region, and question language independently.",
      interfaceLanguage:"Interface language",questionLanguage:"Question language",save:"Save settings",back:"Back",
      freeOffline:"Free · Offline · No account",correct:"Correct! ",incorrect:"Not quite. ",roundScore:"You scored {score} out of {total}.",accuracy:"Accuracy: {percent}%",reviewTitle:"Answer review",yourAnswer:"Your answer",correctAnswer:"Correct answer",unanswered:"Not answered",
      help:"How to Play",helpEyebrow:"THE QUICK GUIDE",helpTitle:"How to Play",helpStartTitle:"Start a round",helpStartBody:"Choose a region, question language, category, and difficulty in Settings, then start playing. Each round has up to ten multiple-choice questions.",helpScoringTitle:"Scoring and results",helpScoringBody:"Select one answer for each question. Every correct answer earns one point. Your results include your score, accuracy, correct answers, and explanations.",helpDifficultyTitle:"Categories and difficulty",helpDifficultyBody:"Explore Geography, History, Science, or Culture. Choose Easy, Medium, or Hard, or keep the filters open to mix available questions.",helpLanguageTitle:"Three independent settings",helpLanguageBody:"Interface language controls menus; question region selects the knowledge set; question language controls question wording. Any supported combination works.",helpPrivacyTitle:"Free, private, and offline",helpPrivacyBody:"MindQuest is free to play, works offline, and requires no account. Settings and best scores stay in local app storage. There are no ads or paid services.",
      noQuestions:"There are no questions available for this selection yet.",noQuestionsHint:"Try a different category or difficulty in Settings.",question:"QUESTION"
    },
    "ru-RU": {
      categoryFilter:"Категория",difficultyFilter:"Сложность",allCategories:"Все категории",anyDifficulty:"Любая сложность",easy:"Лёгкая",medium:"Средняя",hard:"Сложная",categoryGeography:"География",categoryHistory:"История",categoryScience:"Наука",categoryCulture:"Культура",
      eyebrow:"Небольшая тренировка для ума",welcome:"Готовы подумать?",intro:"Открывайте мир — вопрос за вопросом.",
      play:"Начать раунд",bestScore:"Лучший результат",questionRegion:"Регион вопросов",offline:"Можно играть офлайн",progress:"Ход игры",
      next:"Следующий вопрос",seeResults:"К результатам",round:"РАУНД",roundComplete:"РАУНД ЗАВЕРШЁН",wellPlayed:"Отличная игра!",points:"баллов",
      playAgain:"Сыграть ещё раз",home:"На главную",personalise:"ВАШИ НАСТРОЙКИ",settings:"Настройки",
      settingsIntro:"Эти параметры независимы. Вы можете сочетать любой язык интерфейса, регион и язык вопросов.",
      interfaceLanguage:"Язык интерфейса",questionLanguage:"Язык вопросов",save:"Сохранить настройки",back:"Назад",settingsButtonLabel:"Открыть настройки",homeLinkLabel:"На главную MindQuest",
      freeOffline:"Бесплатно · Офлайн · Без аккаунта",correct:"Верно! ",incorrect:"Не совсем. ",roundScore:"Ваш результат: {score} из {total}.",accuracy:"Точность: {percent}%",reviewTitle:"Разбор ответов",yourAnswer:"Ваш ответ",correctAnswer:"Правильный ответ",unanswered:"Нет ответа",
      help:"Как играть",helpEyebrow:"КРАТКОЕ РУКОВОДСТВО",helpTitle:"Как играть",helpStartTitle:"Начало раунда",helpStartBody:"В настройках выберите регион, язык вопросов, категорию и сложность, затем начните раунд. В каждом раунде — до десяти вопросов с вариантами ответа.",helpScoringTitle:"Очки и результаты",helpScoringBody:"Выберите один ответ на каждый вопрос. За каждый правильный ответ начисляется одно очко. В результатах показаны счёт, точность, правильные ответы и пояснения.",helpDifficultyTitle:"Категории и сложность",helpDifficultyBody:"Изучайте географию, историю, науку и культуру. Выберите лёгкий, средний или сложный уровень либо оставьте фильтры без ограничений.",helpLanguageTitle:"Три независимых параметра",helpLanguageBody:"Язык интерфейса определяет язык меню, регион вопросов — набор знаний, а язык вопросов — формулировки. Доступны любые сочетания поддерживаемых параметров.",helpPrivacyTitle:"Бесплатно, конфиденциально, офлайн",helpPrivacyBody:"MindQuest бесплатен, работает без интернета и не требует аккаунта. Настройки и лучшие результаты хранятся локально. Рекламы и платных сервисов нет.",noQuestions:"Для выбранных параметров пока нет вопросов.",noQuestionsHint:"Попробуйте изменить категорию или сложность в настройках.",question:"ВОПРОС"
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
    if (!saved || typeof saved !== "object" || Array.isArray(saved)) saved = {};
    return {
      interfaceLocale: LOCALES.includes(saved.interfaceLocale) ? saved.interfaceLocale : DEFAULTS.interfaceLocale,
      questionRegion: REGIONS.includes(saved.questionRegion) ? saved.questionRegion : DEFAULTS.questionRegion,
      questionLocale: LOCALES.includes(saved.questionLocale) ? saved.questionLocale : DEFAULTS.questionLocale,
      category: CATEGORIES.includes(saved.category) ? saved.category : "all",
      difficulty: ["all", "easy", "medium", "hard"].includes(saved.difficulty) ? saved.difficulty : "all"
    };
  }

  let settings = loadSettings();
  let round = [];
  let current = 0;
  let score = 0;
  let answerHistory = [];
  let answered = false;
  let noQuestionsForSelection = false;
  let lastView = "home-view";
  const $ = (id) => document.getElementById(id);
  const views = ["home-view", "quiz-view", "result-view", "settings-view", "help-view"];
  const t = (key) => (UI[settings.interfaceLocale] || UI["en-IN"])[key] || key;
  const localeName = (locale) => locale === "ru-RU" ? "Русский" : locale === "en-US" ? "English (US)" : "English (India)";
  const regionName = (region) => REGION_NAMES[settings.interfaceLocale][region];
  const categoryName = (category) => t("category" + category);
  const selectedCategoryName = () => settings.category === "all" ? t("allCategories") : categoryName(settings.category);
  const selectedDifficultyName = () => settings.difficulty === "all" ? t("anyDifficulty") : t(settings.difficulty);
  const bestScoreKey = () => "mindquest.best." + settings.questionRegion + "." + settings.category + "." + settings.difficulty;
  const readBestScore = () => {
    try {
      const record = JSON.parse(safeStorage.get(bestScoreKey()) || "null");
      if (!record || !Number.isInteger(record.score) || !Number.isInteger(record.total) ||
          record.total < 1 || record.total > 10 || record.score < 0 || record.score > record.total) return null;
      return record;
    } catch (_) {
      return null;
    }
  };

  function showView(id) {
    views.forEach((viewId) => {
      const node = $(viewId);
      const active = viewId === id;
      node.classList.toggle("active", active);
      node.hidden = !active;
    });
    const heading = $(id).querySelector("h1, h2");
    if (heading) {
      heading.setAttribute("tabindex", "-1");
      heading.focus();
    }
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
    $("question-category").value = settings.category;
    $("question-difficulty").value = settings.difficulty;
    $("home-region").textContent = regionName(settings.questionRegion);
    const best = readBestScore();
    const bestPercent = best ? Math.round((best.score / best.total) * 100) : null;
    $("best-score").textContent = best ? best.score + " / " + best.total + " · " + bestPercent + "%" : "—";
    $("best-score-scope").textContent = [regionName(settings.questionRegion), selectedCategoryName(), selectedDifficultyName()].join(" · ");
    $("answers").setAttribute("aria-label", t("answerOptions"));\n    $("settings-open").setAttribute("aria-label", t("settingsButtonLabel"));\n    $("brand-home").setAttribute("aria-label", t("homeLinkLabel"));
    [...$("question-category").options].forEach((option) => {
      if (option.value === "all") option.textContent = t("allCategories");
      else option.textContent = categoryName(option.value);
    });
    [...$("question-difficulty").options].forEach((option) => {
      option.textContent = option.value === "all" ? t("anyDifficulty") : t(option.value);
    });
  }

  function openHelp() {
    lastView = views.find((id) => $(id).classList.contains("active")) || "home-view";
    showView("help-view");
  }

  function openSettings() {
    lastView = views.find((id) => $(id).classList.contains("active")) || "home-view";
    $("interface-locale").value = settings.interfaceLocale;
    $("question-region").value = settings.questionRegion;
    $("question-locale").value = settings.questionLocale;
    $("question-category").value = settings.category;
    $("question-difficulty").value = settings.difficulty;
    showView("settings-view");
  }

  function startRound() {
    const pool = (window.MINDQUEST_QUESTIONS || []).filter((q) =>
      q.region === settings.questionRegion &&
      q.translations[settings.questionLocale] &&
      (settings.category === "all" || q.category === settings.category) &&
      (settings.difficulty === "all" || q.difficulty === settings.difficulty)
    );
    if (!pool.length) {
      answerHistory = [];
      $("answer-review-list").replaceChildren();
      $("answer-review-title").hidden = true;
      noQuestionsForSelection = true;
      $("replay-button").hidden = true;
      $("home-button").textContent = t("settings");
      $("result-title").textContent = t("noQuestions");
      $("final-score").textContent = "—";
      $("result-message").textContent = t("noQuestionsHint");
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
    answerHistory = [];
    renderQuestion();
    showView("quiz-view");
  }

  function renderQuestion() {
    answered = false;
    const item = round[current];
    const copy = item.translations[settings.questionLocale];
    $("round-label").textContent = t("round");
    $("progress-label").textContent = (current + 1) + " / " + round.length;
    const progress = Math.round(((current + 1) / round.length) * 100);
    $("progress-fill").style.width = progress + "%";
    $("question-progress").setAttribute("aria-valuenow", String(progress));
    $("question-progress").setAttribute("aria-label", t("progress"));
    $("category-label").textContent = categoryName(item.category).toUpperCase();
    $("question-title").textContent = copy.question;
    $("feedback").textContent = "";
    $("feedback").className = "feedback";
    $("next-button").disabled = true;
    $("next-button").textContent = current === round.length - 1 ? t("seeResults") : t("next");
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
    answerHistory[current] = { choice, correct: item.correct, options: copy.options, explanation: copy.explanation, isCorrect: correct };
    $("answers").querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (button.dataset.answer === item.correct) button.classList.add("correct");
      else if (button.dataset.answer === choice) button.classList.add("incorrect");
    });
    $("feedback").textContent = (correct ? t("correct") : t("incorrect")) + copy.explanation;
    $("feedback").classList.add(correct ? "good" : "bad");
    $("next-button").disabled = false;
  }


  function renderAnswerReview() {
    $("answer-review-title").hidden = false;
    const host = $("answer-review-list");
    host.replaceChildren();
    answerHistory.forEach((entry, index) => {
      const card = document.createElement("article");
      card.className = "review-card";
      const heading = document.createElement("h3");
      heading.textContent = (index + 1) + ". " + round[index].translations[settings.questionLocale].question;
      const status = document.createElement("p");
      status.className = entry?.isCorrect ? "review-status good" : "review-status bad";
      status.textContent = entry?.isCorrect ? t("correct").trim() : t("incorrect").trim();
      const chosen = document.createElement("p");
      chosen.textContent = t("yourAnswer") + ": " + (entry ? entry.options[entry.choice] : t("unanswered"));
      const correct = document.createElement("p");
      correct.textContent = t("correctAnswer") + ": " + round[index].translations[settings.questionLocale].options[round[index].correct];
      const explanation = document.createElement("p");
      explanation.className = "review-explanation";
      explanation.textContent = round[index].translations[settings.questionLocale].explanation;
      card.append(heading, status, chosen, correct, explanation);
      host.append(card);
    });
  }

  function showResults() {
    $("result-title").textContent = t("wellPlayed");
    $("final-score").textContent = score + "/" + round.length;
    const percent = Math.round((score / round.length) * 100);
    $("result-message").textContent = t("roundScore").replace("{score}", score).replace("{total}", round.length) + " " + t("accuracy").replace("{percent}", percent);
    renderAnswerReview();
    const best = readBestScore();
    if (!best || score / round.length > best.score / best.total) {
      safeStorage.set(bestScoreKey(), JSON.stringify({ score, total: round.length }));
    }
    noQuestionsForSelection = false;
    $("replay-button").hidden = false;
    $("home-button").textContent = t("home");
    applyInterface();
    showView("result-view");
  }

  $("play-button").addEventListener("click", startRound);
  $("replay-button").addEventListener("click", startRound);
  $("home-button").addEventListener("click", () => { if (noQuestionsForSelection) openSettings(); else showView("home-view"); });
  $("settings-open").addEventListener("click", openSettings);
  $("home-help").addEventListener("click", openHelp);
  $("settings-help").addEventListener("click", openHelp);
  $("help-back").addEventListener("click", () => showView(lastView));
  $("brand-home").addEventListener("click", (event) => {
    event.preventDefault();
    noQuestionsForSelection = false;
    $("replay-button").hidden = false;
    $("home-button").textContent = t("home");
    showView("home-view");
  });
  $("settings-back").addEventListener("click", () => showView(lastView));
  $("settings-save").addEventListener("click", () => {
    settings = {
      interfaceLocale: $("interface-locale").value,
      questionRegion: $("question-region").value,
      questionLocale: $("question-locale").value,
      category: $("question-category").value,
      difficulty: $("question-difficulty").value
    };
    safeStorage.set("mindquest.settings", JSON.stringify(settings));
    applyInterface();
    // Settings can change the question pool or locale. Return to the home screen
    // so an in-progress round cannot continue with stale question data.
    noQuestionsForSelection = false;
    $("replay-button").hidden = false;
    $("home-button").textContent = t("home");
    showView("home-view");
  });
  $("next-button").addEventListener("click", () => {
    if (!answered) return;
    if (current < round.length - 1) { current += 1; renderQuestion(); }
    else showResults();
  });

  applyInterface();
  showView("home-view");
})();
