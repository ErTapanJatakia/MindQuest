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
      playAgain:"Play again",home:"Home",personalise:"PERSONALISE YOUR GAME",settings:"Settings",
      settingsIntro:"Choose each setting independently: interface language, question region and question language.",
      interfaceLanguage:"Interface language",questionLanguage:"Question language",save:"Save settings",back:"Back",settingsButtonLabel:"Open settings",homeLinkLabel:"MindQuest home",
      freeOffline:"Free · Offline · No account",correct:"Correct! ",incorrect:"Not quite. ",roundScore:"You scored {score} out of {total}.",accuracy:"Accuracy: {percent}%",reviewTitle:"Answer review",yourAnswer:"Your answer",correctAnswer:"Correct answer",unanswered:"Not answered",
      help:"How to play",helpEyebrow:"THE QUICK GUIDE",helpTitle:"How to play",helpStartTitle:"Play a round",helpStartBody:"Choose a region, question language, category and difficulty in Settings, then start a round. Each round contains up to ten multiple-choice questions.",helpScoringTitle:"Scoring and results",helpScoringBody:"Choose one answer per question. Correct answers earn one point. Your results show your score, accuracy, the correct answers and explanations.",helpDifficultyTitle:"Categories and difficulty",helpDifficultyBody:"Explore Geography, History, Science or Culture. Choose Easy, Medium or Hard, or leave the filters open to mix the available questions.",helpLanguageTitle:"Three independent choices",helpLanguageBody:"Interface language controls menus; question region selects the knowledge set; question language controls question wording. Any supported combination is valid.",helpPrivacyTitle:"Free, private and offline",helpPrivacyBody:"MindQuest is free to play, works offline and needs no account. Settings and best scores are stored on this device when browser storage is available; no ads or paid services are used.",noQuestions:"There are no questions available for this selection yet.",noQuestionsHint:"Try a different category or difficulty in Settings.",storageUnavailable:"Device storage is unavailable; settings and best scores may not be saved.",roundIntegrityError:"This round could not be verified.",roundIntegrityHint:"Your answers were not recorded as a result. Return to Settings and start a new round.",question:"QUESTION",answerOptions:"Answer options"
    },
    "en-US": {
      categoryFilter:"Category",difficultyFilter:"Difficulty",allCategories:"All categories",anyDifficulty:"Any difficulty",easy:"Easy",medium:"Medium",hard:"Hard",categoryGeography:"Geography",categoryHistory:"History",categoryScience:"Science",categoryCulture:"Culture",
      eyebrow:"A little challenge for your mind",welcome:"Ready to think?",intro:"Explore the world, one question at a time.",
      play:"Start a round",bestScore:"Best score",questionRegion:"Question region",offline:"Ready to play offline",progress:"Question progress",
      next:"Next question",seeResults:"See results",round:"ROUND",roundComplete:"ROUND COMPLETE",wellPlayed:"Well played!",points:"points",
      playAgain:"Play again",home:"Home",personalise:"PERSONALIZE YOUR GAME",settings:"Settings",
      settingsIntro:"Choose your interface language, question region, and question language independently.",
      interfaceLanguage:"Interface language",questionLanguage:"Question language",save:"Save settings",back:"Back",settingsButtonLabel:"Open settings",homeLinkLabel:"MindQuest home",
      freeOffline:"Free · Offline · No account",correct:"Correct! ",incorrect:"Not quite. ",roundScore:"You scored {score} out of {total}.",accuracy:"Accuracy: {percent}%",reviewTitle:"Answer review",yourAnswer:"Your answer",correctAnswer:"Correct answer",unanswered:"Not answered",
      help:"How to Play",helpEyebrow:"THE QUICK GUIDE",helpTitle:"How to Play",helpStartTitle:"Start a round",helpStartBody:"Choose a region, question language, category, and difficulty in Settings, then start playing. Each round has up to ten multiple-choice questions.",helpScoringTitle:"Scoring and results",helpScoringBody:"Select one answer for each question. Every correct answer earns one point. Your results include your score, accuracy, correct answers, and explanations.",helpDifficultyTitle:"Categories and difficulty",helpDifficultyBody:"Explore Geography, History, Science, or Culture. Choose Easy, Medium, or Hard, or keep the filters open to mix available questions.",helpLanguageTitle:"Three independent settings",helpLanguageBody:"Interface language controls menus; question region selects the knowledge set; question language controls question wording. Any supported combination works.",helpPrivacyTitle:"Free, private, and offline",helpPrivacyBody:"MindQuest is free to play, works offline, and requires no account. Settings and best scores are stored on this device when browser storage is available. There are no ads or paid services.",
      noQuestions:"There are no questions available for this selection yet.",noQuestionsHint:"Try a different category or difficulty in Settings.",storageUnavailable:"Device storage is unavailable; settings and best scores may not be saved.",roundIntegrityError:"This round could not be verified.",roundIntegrityHint:"Your answers were not recorded as a result. Return to Settings and start a new round.",question:"QUESTION",answerOptions:"Answer options"
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
      help:"Как играть",helpEyebrow:"КРАТКОЕ РУКОВОДСТВО",helpTitle:"Как играть",helpStartTitle:"Начало раунда",helpStartBody:"В настройках выберите регион, язык вопросов, категорию и сложность, затем начните раунд. В каждом раунде — до десяти вопросов с вариантами ответа.",helpScoringTitle:"Очки и результаты",helpScoringBody:"Выберите один ответ на каждый вопрос. За каждый правильный ответ начисляется одно очко. В результатах показаны счёт, точность, правильные ответы и пояснения.",helpDifficultyTitle:"Категории и сложность",helpDifficultyBody:"Изучайте географию, историю, науку и культуру. Выберите лёгкий, средний или сложный уровень либо оставьте фильтры без ограничений.",helpLanguageTitle:"Три независимых параметра",helpLanguageBody:"Язык интерфейса определяет язык меню, регион вопросов — набор знаний, а язык вопросов — формулировки. Доступны любые сочетания поддерживаемых параметров.",helpPrivacyTitle:"Бесплатно, конфиденциально, офлайн",helpPrivacyBody:"MindQuest бесплатен, работает без интернета и не требует аккаунта. Настройки и лучшие результаты сохраняются на устройстве, если доступно хранилище браузера. Рекламы и платных сервисов нет.",noQuestions:"Для выбранных параметров пока нет вопросов.",noQuestionsHint:"Попробуйте изменить категорию или сложность в настройках.",storageUnavailable:"Хранилище недоступно: настройки и лучшие результаты могут не сохраниться.",roundIntegrityError:"Не удалось проверить завершённый раунд.",roundIntegrityHint:"Результат не был сохранён. Откройте настройки и начните новый раунд.",question:"ВОПРОС",answerOptions:"Варианты ответа"
    }
  };
  function suggestedInterfaceLocale() {
    const deviceLocale = String(navigator.language || "").toLowerCase();
    if (deviceLocale === "ru" || deviceLocale.startsWith("ru-")) return "ru-RU";
    if (deviceLocale === "en-us" || deviceLocale.startsWith("en-us-")) return "en-US";
    return "en-IN";
  }
  const DEFAULTS = { interfaceLocale:suggestedInterfaceLocale(), questionRegion:"IN", questionLocale:"en-IN" };
  let storageWarning = false;
  const safeStorage = {
    get(key) {
      try { return { ok:true, value:localStorage.getItem(key) }; }
      catch (_) { return { ok:false, value:null }; }
    },
    set(key, value) {
      try { localStorage.setItem(key, value); return true; }
      catch (_) { return false; }
    }
  };
  function updateStorageStatus() {
    const status = $("storage-status");
    status.hidden = !storageWarning;
    status.lang = settings.interfaceLocale;
    status.textContent = storageWarning ? t("storageUnavailable") : "";
  }
  function normalizeSettings(candidate) {
    const saved = candidate && typeof candidate === "object" && !Array.isArray(candidate) ? candidate : {};
    return {
      interfaceLocale: LOCALES.includes(saved.interfaceLocale) ? saved.interfaceLocale : DEFAULTS.interfaceLocale,
      questionRegion: REGIONS.includes(saved.questionRegion) ? saved.questionRegion : DEFAULTS.questionRegion,
      questionLocale: LOCALES.includes(saved.questionLocale) ? saved.questionLocale : DEFAULTS.questionLocale,
      category: CATEGORIES.includes(saved.category) ? saved.category : "all",
      difficulty: ["all", "easy", "medium", "hard"].includes(saved.difficulty) ? saved.difficulty : "all"
    };
  }

  function loadSettings() {
    let saved = {};
    const stored = safeStorage.get("mindquest.settings");
    if (!stored.ok) storageWarning = true;
    try { saved = JSON.parse(stored.value || "{}"); } catch (_) { saved = {}; }
    return normalizeSettings(saved);
  }

  let settings = loadSettings();
  let round = [];
  let current = 0;
  let score = 0;
  let answerHistory = [];
  let lastRoundSignature = "";
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
    const stored = safeStorage.get(bestScoreKey());
    if (!stored.ok) {
      storageWarning = true;
      updateStorageStatus();
      return null;
    }
    try {
      const record = JSON.parse(stored.value || "null");
      if (!record || !Number.isInteger(record.score) || !Number.isInteger(record.total) ||
          record.total < 1 || record.total > 10 || record.score < 0 || record.score > record.total) return null;
      return record;
    } catch (_) {
      return null;
    }
  };

  // Compare percentages with integer cross-multiplication to avoid floating-point ties.
  // When accuracy is equal, prefer the result achieved across more questions.
  const isBetterBestScore = (scoreValue, totalValue, previous) => {
    if (!previous) return true;
    const newWeighted = scoreValue * previous.total;
    const previousWeighted = previous.score * totalValue;
    return newWeighted > previousWeighted ||
      (newWeighted === previousWeighted && totalValue > previous.total);
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
    updateStorageStatus();
    const best = readBestScore();
    const bestPercent = best ? Math.round((best.score / best.total) * 100) : null;
    $("best-score").textContent = best ? best.score + " / " + best.total + " · " + bestPercent + "%" : "—";
    $("best-score-scope").textContent = [regionName(settings.questionRegion), selectedCategoryName(), selectedDifficultyName()].join(" · ");
    $("answers").setAttribute("aria-label", t("answerOptions"));
    $("settings-open").setAttribute("aria-label", t("settingsButtonLabel"));
    $("brand-home").setAttribute("aria-label", t("homeLinkLabel"));
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

  function isPlayableQuestion(question) {
    if (!question || typeof question !== "object" || Array.isArray(question)) return false;
    const expectedQuestionKeys = ["category", "correct", "difficulty", "id", "region", "translations"];
    if (Object.keys(question).sort().join("|") !== expectedQuestionKeys.join("|")) return false;
    const categoryCodes = {
      Geography: "GEO",
      History: "HIS",
      Science: "SCI",
      Culture: "CUL"
    };
    if (question.region !== settings.questionRegion ||
        !CATEGORIES.includes(question.category) ||
        !["easy", "medium", "hard"].includes(question.difficulty) ||
        !["a", "b", "c", "d"].includes(question.correct) ||
        typeof question.id !== "string" ||
        !new RegExp("^(IN|RU|US)-" + categoryCodes[question.category] + "-\\d{3}$").test(question.id) ||
        !question.id.startsWith(question.region + "-")) return false;

    const translations = question.translations;
    if (!translations || typeof translations !== "object" || Array.isArray(translations) ||
        Object.keys(translations).sort().join("|") !== [...LOCALES].sort().join("|")) return false;

    const expectedTranslationKeys = ["explanation", "options", "question"];
    const answerKeys = ["a", "b", "c", "d"];
    const hasCleanText = (value) =>
      typeof value === "string" && value.trim().length > 0 && !/[\u0000-\u001F\u007F]/u.test(value);

    // Validate every locale before admitting the shared question ID to a round.
    // The question-level correct key is the canonical answer identity for all translations.
    for (const locale of LOCALES) {
      const copy = translations[locale];
      if (!copy || typeof copy !== "object" || Array.isArray(copy) ||
          Object.keys(copy).sort().join("|") !== expectedTranslationKeys.join("|") ||
          !hasCleanText(copy.question) || !hasCleanText(copy.explanation) ||
          !copy.options || typeof copy.options !== "object" || Array.isArray(copy.options) ||
          Object.keys(copy.options).sort().join("|") !== answerKeys.join("|") ||
          !answerKeys.every((key) => hasCleanText(copy.options[key])) ||
          !hasCleanText(copy.options[question.correct])) return false;

      const normalizedOptions = answerKeys.map((key) =>
        copy.options[key].normalize("NFC").trim().replace(/\s+/gu, " ").toLocaleLowerCase(locale)
      );
      if (new Set(normalizedOptions).size !== answerKeys.length) return false;
    }
    return true;
  }

  function discardRound() {
    round = [];
    current = 0;
    score = 0;
    answerHistory = [];
    answered = false;
    $("next-button").disabled = true;
    $("answers").replaceChildren();
    $("feedback").replaceChildren();
    $("feedback").className = "feedback";
    $("question-title").textContent = "";
    $("progress-label").textContent = "";
    $("progress-fill").style.width = "0%";
    $("question-progress").setAttribute("aria-valuenow", "0");
    $("answer-review-list").replaceChildren();
    $("answer-review-title").hidden = true;
  }

  function showRecovery(titleKey = "noQuestions", hintKey = "noQuestionsHint") {
    discardRound();
    noQuestionsForSelection = true;
    $("replay-button").hidden = true;
    $("home-button").textContent = t("settings");
    $("result-title").textContent = t(titleKey);
    $("final-score").textContent = "—";
    $("result-message").textContent = t(hintKey);
    showView("result-view");
  }

  function startRound() {
    const pool = (Array.isArray(window.MINDQUEST_QUESTIONS) ? window.MINDQUEST_QUESTIONS : [])
      .filter((q) =>
        isPlayableQuestion(q) &&
        (settings.category === "all" || q.category === settings.category) &&
        (settings.difficulty === "all" || q.difficulty === settings.difficulty)
      );
    if (!pool.length) {
      showRecovery();
      return;
    }
    const questionIds = pool.map((question) => question.id);
    if (new Set(questionIds).size !== questionIds.length) {
      showRecovery("roundIntegrityError", "roundIntegrityHint");
      return;
    }

    // Stable IDs must also represent distinct prompts in every supported language.
    // Catch duplicate content before shuffling so it cannot appear in a later round.
    const hasDuplicatePrompt = LOCALES.some((locale) => {
      const prompts = pool.map((question) =>
        question.translations[locale].question
          .normalize("NFC")
          .trim()
          .replace(/\\s+/gu, " ")
          .toLocaleLowerCase(locale)
      );
      return new Set(prompts).size !== prompts.length;
    });
    if (hasDuplicatePrompt) {
      showRecovery("roundIntegrityError", "roundIntegrityHint");
      return;
    }

    const shuffled = [...pool];
    // Fisher–Yates gives every question an equal chance of occupying each position.
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const selectedRound = shuffled.slice(0, 10);
    const selectedSignature = (questions) =>
      questions.map((question) => question.id).sort().join("|");
    // Avoid giving the same ten-question set twice in a row when alternatives exist.
    // The replacement comes from the same shuffled pool, preserving the round size.
    if (selectedSignature(selectedRound) === lastRoundSignature &&
        shuffled.length > selectedRound.length) {
      selectedRound[selectedRound.length - 1] = shuffled[selectedRound.length];
    }
    const selectedIds = selectedRound.map((question) => question.id);
    if (selectedRound.length !== Math.min(10, pool.length) ||
        new Set(selectedIds).size !== selectedIds.length ||
        selectedRound.some((question) => !isPlayableQuestion(question))) {
      showRecovery("roundIntegrityError", "roundIntegrityHint");
      return;
    }
    lastRoundSignature = selectedSignature(selectedRound);
    round = selectedRound;
    current = 0;
    score = 0;
    answerHistory = [];
    renderQuestion();
    showView("quiz-view");
  }

  function renderQuestion() {
    if (!Array.isArray(round) || !round.length || !Number.isInteger(current) ||
        current < 0 || current >= round.length || !isPlayableQuestion(round[current])) {
      showRecovery();
      return;
    }
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
    $("category-label").lang = settings.interfaceLocale;
    $("difficulty-label").textContent = t(item.difficulty).toUpperCase();
    $("difficulty-label").lang = settings.interfaceLocale;
    $("question-title").textContent = copy.question;
    $("question-title").lang = settings.questionLocale;
    // Keep keyboard and screen-reader users oriented as each new question loads.
    $("question-title").focus();
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
      text.lang = settings.questionLocale;
      button.append(marker, text);
      button.addEventListener("click", () => chooseAnswer(key, item, copy));
      host.append(button);
    });
  }

  function chooseAnswer(choice, item, copy) {
    if (answered || !round.length || current < 0 || current >= round.length ||
        round[current] !== item || item.translations[settings.questionLocale] !== copy) return;
    answered = true;
    const correct = choice === item.correct;
    if (correct) score += 1;
    answerHistory[current] = { choice, correct: item.correct, options: copy.options, explanation: copy.explanation, isCorrect: correct };
    $("answers").querySelectorAll("button").forEach((button) => {
      button.disabled = true;
      if (button.dataset.answer === item.correct) button.classList.add("correct");
      else if (button.dataset.answer === choice) button.classList.add("incorrect");
    });
    const feedback = $("feedback");
    feedback.replaceChildren();
    const lead = document.createElement("span");
    lead.lang = settings.interfaceLocale;
    lead.textContent = correct ? t("correct") : t("incorrect");
    feedback.append(lead);
    if (!correct) {
      const correctionLabel = document.createElement("span");
      correctionLabel.lang = settings.interfaceLocale;
      correctionLabel.textContent = t("correctAnswer") + ": ";
      const correctionAnswer = document.createElement("span");
      correctionAnswer.lang = settings.questionLocale;
      correctionAnswer.textContent = copy.options[item.correct] + ". ";
      feedback.append(correctionLabel, correctionAnswer);
    }
    const explanation = document.createElement("span");
    explanation.lang = settings.questionLocale;
    explanation.textContent = copy.explanation;
    feedback.append(explanation);
    feedback.classList.add(correct ? "good" : "bad");
    $("next-button").disabled = false;
    // Answer buttons are disabled after selection; move focus to the newly available action.
    $("next-button").focus();
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
      heading.lang = settings.questionLocale;
      const status = document.createElement("p");
      status.className = entry?.isCorrect ? "review-status good" : "review-status bad";
      status.textContent = entry?.isCorrect ? t("correct").trim() : t("incorrect").trim();
      status.lang = settings.interfaceLocale;
      const chosen = document.createElement("p");
      const chosenLabel = document.createElement("span");
      chosenLabel.lang = settings.interfaceLocale;
      chosenLabel.textContent = t("yourAnswer") + ": ";
      const chosenValue = document.createElement("span");
      chosenValue.lang = entry ? settings.questionLocale : settings.interfaceLocale;
      chosenValue.textContent = entry ? entry.options[entry.choice] : t("unanswered");
      chosen.append(chosenLabel, chosenValue);
      const correct = document.createElement("p");
      const correctLabel = document.createElement("span");
      correctLabel.lang = settings.interfaceLocale;
      correctLabel.textContent = t("correctAnswer") + ": ";
      const correctValue = document.createElement("span");
      correctValue.lang = settings.questionLocale;
      correctValue.textContent = round[index].translations[settings.questionLocale].options[round[index].correct];
      correct.append(correctLabel, correctValue);
      const explanation = document.createElement("p");
      explanation.className = "review-explanation";
      explanation.textContent = round[index].translations[settings.questionLocale].explanation;
      explanation.lang = settings.questionLocale;
      card.append(heading, status, chosen, correct, explanation);
      host.append(card);
    });
  }

  function isCompleteRound() {
    if (!Array.isArray(round) || !round.length || current !== round.length - 1 || !answered ||
        !Array.isArray(answerHistory) || answerHistory.length !== round.length) return false;

    let verifiedScore = 0;
    for (let index = 0; index < round.length; index += 1) {
      const item = round[index];
      const entry = answerHistory[index];
      if (!isPlayableQuestion(item) || !entry || typeof entry !== "object" || Array.isArray(entry)) return false;
      const copy = item.translations[settings.questionLocale];
      if (!["a", "b", "c", "d"].includes(entry.choice) ||
          entry.correct !== item.correct ||
          !entry.options || typeof entry.options !== "object" || Array.isArray(entry.options) ||
          !["a", "b", "c", "d"].every((key) =>
            typeof entry.options[key] === "string" &&
            entry.options[key] === copy.options[key]
          ) ||
          entry.explanation !== copy.explanation ||
          entry.isCorrect !== (entry.choice === item.correct)) return false;
      if (entry.isCorrect) verifiedScore += 1;
    }
    return verifiedScore === score;
  }

  function showResults() {
    // Revalidate the complete answer ledger before displaying or persisting a score.
    if (!isCompleteRound()) {
      showRecovery("roundIntegrityError", "roundIntegrityHint");
      return;
    }
    $("result-title").textContent = t("wellPlayed");
    $("final-score").textContent = score + "/" + round.length;
    const percent = Math.round((score / round.length) * 100);
    $("result-message").textContent = t("roundScore").replace("{score}", score).replace("{total}", round.length) + " " + t("accuracy").replace("{percent}", percent);
    renderAnswerReview();
    const best = readBestScore();
    if (isBetterBestScore(score, round.length, best)) {
      if (!safeStorage.set(bestScoreKey(), JSON.stringify({ score, total: round.length }))) storageWarning = true;
    }
    noQuestionsForSelection = false;
    $("replay-button").hidden = false;
    $("home-button").textContent = t("home");
    applyInterface();
    showView("result-view");
  }

  $("play-button").addEventListener("click", startRound);
  $("replay-button").addEventListener("click", startRound);
  $("home-button").addEventListener("click", () => {
    if (noQuestionsForSelection) {
      openSettings();
      return;
    }
    noQuestionsForSelection = false;
    discardRound();
    showView("home-view");
  });
  $("settings-open").addEventListener("click", openSettings);
  $("home-help").addEventListener("click", openHelp);
  $("settings-help").addEventListener("click", openHelp);
  $("help-back").addEventListener("click", () => showView(lastView));
  $("brand-home").addEventListener("click", (event) => {
    event.preventDefault();
    noQuestionsForSelection = false;
    discardRound();
    $("replay-button").hidden = false;
    $("home-button").textContent = t("home");
    showView("home-view");
  });
  $("settings-back").addEventListener("click", () => showView(lastView));
  $("settings-save").addEventListener("click", () => {
    settings = normalizeSettings({
      interfaceLocale: $("interface-locale").value,
      questionRegion: $("question-region").value,
      questionLocale: $("question-locale").value,
      category: $("question-category").value,
      difficulty: $("question-difficulty").value
    });
    if (!safeStorage.set("mindquest.settings", JSON.stringify(settings))) storageWarning = true;
    // Settings can change the question pool or locale. Discard hidden round data
    // as well as returning home, so no stale answer history can be reused.
    discardRound();
    noQuestionsForSelection = false;
    applyInterface();
    $("replay-button").hidden = false;
    $("home-button").textContent = t("home");
    showView("home-view");
  });
  $("next-button").addEventListener("click", () => {
    if (!round.length || !answered || !answerHistory[current]) return;
    if (current < round.length - 1) { current += 1; renderQuestion(); }
    else showResults();
  });

  applyInterface();
  showView("home-view");
})();
