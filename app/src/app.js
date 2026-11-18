(() => {
  "use strict";

  const LOCALES = ["en-IN", "en-US", "ru-RU"];
  const INTERFACE_LOCALES = ["en-IN", "en-US", "ru-RU", "es-PE", "es-ES"];
  const REGIONS = ["IN", "RU", "US"];
  const CATEGORIES = ["Geography", "History", "Science", "Culture"];
  const REGION_NAMES = {
    "en-IN": {
      categoryGeography:"Geography",categoryHistory:"History",categoryScience:"Science",categoryCulture:"Culture",
      categoryFilter:"Category",difficultyFilter:"Difficulty",allCategories:"All categories",anyDifficulty:"Any difficulty",easy:"Easy",medium:"Medium",hard:"Hard", IN: "Republic of India", RU: "Russian Federation", US: "United States of America" },
    "en-US": {
      categoryGeography:"Geography",categoryHistory:"History",categoryScience:"Science",categoryCulture:"Culture",
      categoryFilter:"Category",difficultyFilter:"Difficulty",allCategories:"All categories",anyDifficulty:"Any difficulty",easy:"Easy",medium:"Medium",hard:"Hard", IN: "India", RU: "Russia", US: "United States" },
    "ru-RU": {
      categoryGeography:"География",categoryHistory:"История",categoryScience:"Наука",categoryCulture:"Культура",
      categoryFilter:"Категория",difficultyFilter:"Сложность",allCategories:"Все категории",anyDifficulty:"Любая сложность",easy:"Лёгкая",medium:"Средняя",hard:"Сложная", IN: "Республика Индия", RU: "Российская Федерация", US: "Соединённые Штаты Америки" },
    "es-PE": { categoryGeography:"Geografía",categoryHistory:"Historia",categoryScience:"Ciencia",categoryCulture:"Cultura",categoryFilter:"Categoría",difficultyFilter:"Dificultad",allCategories:"Todas las categorías",anyDifficulty:"Cualquier dificultad",easy:"Fácil",medium:"Intermedia",hard:"Difícil",IN:"República de la India",RU:"Federación de Rusia",US:"Estados Unidos de América" },
    "es-ES": { categoryGeography:"Geografía",categoryHistory:"Historia",categoryScience:"Ciencia",categoryCulture:"Cultura",categoryFilter:"Categoría",difficultyFilter:"Dificultad",allCategories:"Todas las categorías",anyDifficulty:"Cualquier dificultad",easy:"Fácil",medium:"Media",hard:"Difícil",IN:"República de la India",RU:"Federación de Rusia",US:"Estados Unidos de América" }
  };
  const UI = {
    "en-IN": {
      categoryFilter:"Category",difficultyFilter:"Difficulty",allCategories:"All categories",anyDifficulty:"Any difficulty",easy:"Easy",medium:"Medium",hard:"Hard",categoryGeography:"Geography",categoryHistory:"History",categoryScience:"Science",categoryCulture:"Culture",
      eyebrow:"A little challenge for your mind",welcome:"Stay Curious. Outsmart the Ordinary.",intro:"Explore the world, one question at a time.",
      play:"Let’s Play",bestScore:"Top Score",questionRegion:"Question Region",offline:"Offline-Ready. Anytime.",progress:"Question progress",
      next:"Next question",seeResults:"See results",round:"ROUND",roundComplete:"ROUND COMPLETE",wellPlayed:"Well played!",points:"points",
      playAgain:"Play again",home:"Home",personalise:"PERSONALISE YOUR GAME",settings:"Settings",
      settingsIntro:"Choose each setting independently: interface language, question region and question language.",
      interfaceLanguage:"Interface Language",questionLanguage:"Question Language",save:"Save settings",back:"Back",settingsButtonLabel:"Open settings",homeLinkLabel:"MindQuest home",
      freeOffline:"Free · Offline · No account",correct:"Correct! ",incorrect:"Not quite. ",roundScore:"You scored {score} out of {total}.",accuracy:"Accuracy: {percent}%",reviewTitle:"Answer review",yourAnswer:"Your answer",correctAnswer:"Correct answer",unanswered:"Not answered",
      streakLabel:"Current streak",bestStreak:"Best streak this round: {streak}",roundLength:"Questions per Round",roundLengthScope:"{count} questions per round",
      help:"How to Play",helpEyebrow:"THE QUICK GUIDE",helpTitle:"How to play",helpStartTitle:"Play a round",helpStartBody:"Choose a region, question language, category and difficulty in Settings, then start a round. Each round contains up to the selected number of multiple-choice questions.",helpScoringTitle:"Scoring and results",helpScoringBody:"Choose one answer per question. Correct answers earn one point. Your results show your score, accuracy, the correct answers and explanations.",helpDifficultyTitle:"Categories and difficulty",helpDifficultyBody:"Explore Geography, History, Science or Culture. Choose Easy, Medium or Hard, or leave the filters open to mix the available questions.",helpLanguageTitle:"Three independent choices",helpLanguageBody:"Interface language controls menus; question region selects the knowledge set; question language controls question wording. Any supported combination is valid.",helpPrivacyTitle:"Free, private and offline",helpPrivacyBody:"MindQuest is free to play, works offline and needs no account. Settings and best scores are stored on this device when browser storage is available; no ads or paid services are used.",noQuestions:"There are no questions available for this selection yet.",noQuestionsHint:"Try a different category or difficulty in Settings.",storageUnavailable:"Device storage is unavailable; settings and best scores may not be saved.",roundIntegrityError:"This round could not be verified.",roundIntegrityHint:"Your answers were not recorded as a result. Return to Settings and start a new round.",question:"QUESTION",answerOptions:"Answer options"
    },
    "en-US": {
      categoryFilter:"Category",difficultyFilter:"Difficulty",allCategories:"All categories",anyDifficulty:"Any difficulty",easy:"Easy",medium:"Medium",hard:"Hard",categoryGeography:"Geography",categoryHistory:"History",categoryScience:"Science",categoryCulture:"Culture",
      eyebrow:"A little challenge for your mind",welcome:"Stay Curious. Outsmart the Ordinary.",intro:"Explore the world, one question at a time.",
      play:"Let’s Play",bestScore:"Top Score",questionRegion:"Question Region",offline:"Offline-Ready. Anytime.",progress:"Question progress",
      next:"Next question",seeResults:"See results",round:"ROUND",roundComplete:"ROUND COMPLETE",wellPlayed:"Well played!",points:"points",
      playAgain:"Play again",home:"Home",personalise:"PERSONALIZE YOUR GAME",settings:"Settings",
      settingsIntro:"Choose your interface language, question region, and question language independently.",
      interfaceLanguage:"Interface Language",questionLanguage:"Question Language",save:"Save settings",back:"Back",settingsButtonLabel:"Open settings",homeLinkLabel:"MindQuest home",
      freeOffline:"Free · Offline · No account",correct:"Correct! ",incorrect:"Not quite. ",roundScore:"You scored {score} out of {total}.",accuracy:"Accuracy: {percent}%",reviewTitle:"Answer review",yourAnswer:"Your answer",correctAnswer:"Correct answer",unanswered:"Not answered",
      streakLabel:"Current streak",bestStreak:"Best streak this round: {streak}",roundLength:"Questions per Round",roundLengthScope:"{count} questions per round",
      help:"How to Play",helpEyebrow:"THE QUICK GUIDE",helpTitle:"How to Play",helpStartTitle:"Start a round",helpStartBody:"Choose a region, question language, category, and difficulty in Settings, then start playing. Each round contains up to the selected number of multiple-choice questions.",helpScoringTitle:"Scoring and results",helpScoringBody:"Select one answer for each question. Every correct answer earns one point. Your results include your score, accuracy, correct answers, and explanations.",helpDifficultyTitle:"Categories and difficulty",helpDifficultyBody:"Explore Geography, History, Science, or Culture. Choose Easy, Medium, or Hard, or keep the filters open to mix available questions.",helpLanguageTitle:"Three independent settings",helpLanguageBody:"Interface language controls menus; question region selects the knowledge set; question language controls question wording. Any supported combination works.",helpPrivacyTitle:"Free, private, and offline",helpPrivacyBody:"MindQuest is free to play, works offline, and requires no account. Settings and best scores are stored on this device when browser storage is available. There are no ads or paid services.",
      noQuestions:"There are no questions available for this selection yet.",noQuestionsHint:"Try a different category or difficulty in Settings.",storageUnavailable:"Device storage is unavailable; settings and best scores may not be saved.",roundIntegrityError:"This round could not be verified.",roundIntegrityHint:"Your answers were not recorded as a result. Return to Settings and start a new round.",question:"QUESTION",answerOptions:"Answer options"
    },
    "ru-RU": {
      categoryFilter:"Категория",difficultyFilter:"Сложность",allCategories:"Все категории",anyDifficulty:"Любая сложность",easy:"Лёгкая",medium:"Средняя",hard:"Сложная",categoryGeography:"География",categoryHistory:"История",categoryScience:"Наука",categoryCulture:"Культура",
      eyebrow:"Небольшая тренировка для ума",welcome:"Stay Curious. Outsmart the Ordinary.",intro:"Открывайте мир — вопрос за вопросом.",
      play:"Начать раунд",bestScore:"Лучший результат",questionRegion:"Регион вопросов",offline:"Можно играть офлайн",progress:"Ход игры",
      next:"Следующий вопрос",seeResults:"К результатам",round:"РАУНД",roundComplete:"РАУНД ЗАВЕРШЁН",wellPlayed:"Отличная игра!",points:"баллов",
      playAgain:"Сыграть ещё раз",home:"На главную",personalise:"ВАШИ НАСТРОЙКИ",settings:"Настройки",
      settingsIntro:"Эти параметры независимы. Вы можете сочетать любой язык интерфейса, регион и язык вопросов.",
      interfaceLanguage:"Язык интерфейса",questionLanguage:"Язык вопросов",save:"Сохранить настройки",back:"Назад",settingsButtonLabel:"Открыть настройки",homeLinkLabel:"На главную MindQuest",
      freeOffline:"Бесплатно · Офлайн · Без аккаунта",correct:"Верно! ",incorrect:"Не совсем. ",roundScore:"Ваш результат: {score} из {total}.",accuracy:"Точность: {percent}%",reviewTitle:"Разбор ответов",yourAnswer:"Ваш ответ",correctAnswer:"Правильный ответ",unanswered:"Нет ответа",
      streakLabel:"Текущая серия",bestStreak:"Лучшая серия за раунд: {streak}",roundLength:"Вопросов в раунде",roundLengthScope:"{count} вопросов в раунде",
      help:"Как играть",helpEyebrow:"КРАТКОЕ РУКОВОДСТВО",helpTitle:"Как играть",helpStartTitle:"Начало раунда",helpStartBody:"В настройках выберите регион, язык вопросов, категорию и сложность, затем начните раунд. В раунде будет не больше выбранного числа вопросов с вариантами ответа.",helpScoringTitle:"Очки и результаты",helpScoringBody:"Выберите один ответ на каждый вопрос. За каждый правильный ответ начисляется одно очко. В результатах показаны счёт, точность, правильные ответы и пояснения.",helpDifficultyTitle:"Категории и сложность",helpDifficultyBody:"Изучайте географию, историю, науку и культуру. Выберите лёгкий, средний или сложный уровень либо оставьте фильтры без ограничений.",helpLanguageTitle:"Три независимых параметра",helpLanguageBody:"Язык интерфейса определяет язык меню, регион вопросов — набор знаний, а язык вопросов — формулировки. Доступны любые сочетания поддерживаемых параметров.",helpPrivacyTitle:"Бесплатно, конфиденциально, офлайн",helpPrivacyBody:"MindQuest бесплатен, работает без интернета и не требует аккаунта. Настройки и лучшие результаты сохраняются на устройстве, если доступно хранилище браузера. Рекламы и платных сервисов нет.",noQuestions:"Для выбранных параметров пока нет вопросов.",noQuestionsHint:"Попробуйте изменить категорию или сложность в настройках.",storageUnavailable:"Хранилище недоступно: настройки и лучшие результаты могут не сохраниться.",roundIntegrityError:"Не удалось проверить завершённый раунд.",roundIntegrityHint:"Результат не был сохранён. Откройте настройки и начните новый раунд.",question:"ВОПРОС",answerOptions:"Варианты ответа"
    },
    "es-PE": {
      categoryFilter:"Categoría",difficultyFilter:"Dificultad",allCategories:"Todas las categorías",anyDifficulty:"Cualquier dificultad",easy:"Fácil",medium:"Intermedia",hard:"Difícil",categoryGeography:"Geografía",categoryHistory:"Historia",categoryScience:"Ciencia",categoryCulture:"Cultura",
      eyebrow:"Un reto para tu mente",welcome:"Stay Curious. Outsmart the Ordinary.",intro:"Descubre el mundo, pregunta a pregunta.",
      play:"¡A jugar!",bestScore:"Mejor puntaje",questionRegion:"Región de preguntas",offline:"Listo para jugar sin conexión.",progress:"Progreso de preguntas",
      next:"Siguiente pregunta",seeResults:"Ver resultados",round:"RONDA",roundComplete:"RONDA COMPLETADA",wellPlayed:"¡Muy bien!",points:"puntos",
      playAgain:"Jugar otra vez",home:"Inicio",personalise:"PERSONALIZA TU JUEGO",settings:"Ajustes",
      settingsIntro:"Elige por separado el idioma de la interfaz, la región y el idioma de las preguntas.",
      interfaceLanguage:"Idioma de la interfaz",questionLanguage:"Idioma de las preguntas",save:"Guardar ajustes",back:"Volver",settingsButtonLabel:"Abrir ajustes",homeLinkLabel:"Inicio de MindQuest",
      freeOffline:"Gratis · Sin conexión · Sin cuenta",correct:"¡Correcto! ",incorrect:"No es esa. ",roundScore:"Obtuviste {score} de {total} puntos.",accuracy:"Precisión: {percent}%",reviewTitle:"Revisión de respuestas",yourAnswer:"Tu respuesta",correctAnswer:"Respuesta correcta",unanswered:"Sin responder",
      streakLabel:"Racha actual",bestStreak:"Mejor racha de esta ronda: {streak}",roundLength:"Preguntas por ronda",roundLengthScope:"{count} preguntas por ronda",
      help:"Cómo jugar",helpEyebrow:"GUÍA RÁPIDA",helpTitle:"Cómo jugar",helpStartTitle:"Juega una ronda",helpStartBody:"En Ajustes, elige una región, el idioma de las preguntas, una categoría y una dificultad. Después, inicia una ronda con preguntas de opción múltiple.",
      helpScoringTitle:"Puntaje y resultados",helpScoringBody:"Elige una respuesta por pregunta. Cada respuesta correcta suma un punto. Al final verás tu puntaje, precisión, respuestas correctas y explicaciones.",
      helpDifficultyTitle:"Categorías y dificultad",helpDifficultyBody:"Explora Geografía, Historia, Ciencia o Cultura. Elige Fácil, Intermedia o Difícil, o combina todas las preguntas disponibles.",
      helpLanguageTitle:"Tres opciones independientes",helpLanguageBody:"El idioma de la interfaz controla los menús; la región define el banco de preguntas; el idioma de las preguntas controla su redacción. Puedes combinar las opciones disponibles.",
      helpPrivacyTitle:"Gratis, privado y sin conexión",helpPrivacyBody:"MindQuest es gratis, funciona sin conexión y no requiere una cuenta. Los ajustes y mejores puntajes se guardan en este dispositivo cuando el almacenamiento está disponible. No hay anuncios ni servicios de pago.",
      noQuestions:"Aún no hay preguntas disponibles para esta selección.",noQuestionsHint:"Prueba otra categoría o dificultad en Ajustes.",storageUnavailable:"El almacenamiento del dispositivo no está disponible; es posible que no se guarden los ajustes ni los puntajes.",roundIntegrityError:"No se pudo verificar esta ronda.",roundIntegrityHint:"Tus respuestas no se guardaron como resultado. Vuelve a Ajustes e inicia una ronda nueva.",question:"PREGUNTA",answerOptions:"Opciones de respuesta"
    },
    "es-ES": {
      categoryFilter:"Categoría",difficultyFilter:"Dificultad",allCategories:"Todas las categorías",anyDifficulty:"Cualquier dificultad",easy:"Fácil",medium:"Media",hard:"Difícil",categoryGeography:"Geografía",categoryHistory:"Historia",categoryScience:"Ciencia",categoryCulture:"Cultura",
      eyebrow:"Un desafío para tu mente",welcome:"Stay Curious. Outsmart the Ordinary.",intro:"Explora el mundo, pregunta a pregunta.",
      play:"¡A jugar!",bestScore:"Mejor puntuación",questionRegion:"Región de las preguntas",offline:"Listo para jugar sin conexión.",progress:"Progreso de las preguntas",
      next:"Siguiente pregunta",seeResults:"Ver resultados",round:"RONDA",roundComplete:"RONDA COMPLETADA",wellPlayed:"¡Bien hecho!",points:"puntos",
      playAgain:"Volver a jugar",home:"Inicio",personalise:"PERSONALIZA TU JUEGO",settings:"Ajustes",
      settingsIntro:"Elige por separado el idioma de la interfaz, la región y el idioma de las preguntas.",
      interfaceLanguage:"Idioma de la interfaz",questionLanguage:"Idioma de las preguntas",save:"Guardar ajustes",back:"Volver",settingsButtonLabel:"Abrir ajustes",homeLinkLabel:"Inicio de MindQuest",
      freeOffline:"Gratis · Sin conexión · Sin cuenta",correct:"¡Correcto! ",incorrect:"No es correcto. ",roundScore:"Has conseguido {score} de {total} puntos.",accuracy:"Precisión: {percent}%",reviewTitle:"Revisión de respuestas",yourAnswer:"Tu respuesta",correctAnswer:"Respuesta correcta",unanswered:"Sin responder",
      streakLabel:"Racha actual",bestStreak:"Mejor racha de esta ronda: {streak}",roundLength:"Preguntas por ronda",roundLengthScope:"{count} preguntas por ronda",
      help:"Cómo jugar",helpEyebrow:"GUÍA RÁPIDA",helpTitle:"Cómo jugar",helpStartTitle:"Juega una ronda",helpStartBody:"En Ajustes, elige una región, el idioma de las preguntas, una categoría y una dificultad. Después, inicia una ronda con preguntas de opción múltiple.",
      helpScoringTitle:"Puntuación y resultados",helpScoringBody:"Elige una respuesta por pregunta. Cada respuesta correcta suma un punto. Al final verás tu puntuación, precisión, respuestas correctas y explicaciones.",
      helpDifficultyTitle:"Categorías y dificultad",helpDifficultyBody:"Explora Geografía, Historia, Ciencia o Cultura. Elige Fácil, Media o Difícil, o combina todas las preguntas disponibles.",
      helpLanguageTitle:"Tres opciones independientes",helpLanguageBody:"El idioma de la interfaz controla los menús; la región define el banco de preguntas; el idioma de las preguntas controla su redacción. Puedes combinar las opciones disponibles.",
      helpPrivacyTitle:"Gratis, privado y sin conexión",helpPrivacyBody:"MindQuest es gratis, funciona sin conexión y no requiere una cuenta. Los ajustes y mejores puntuaciones se guardan en este dispositivo cuando el almacenamiento está disponible. No hay anuncios ni servicios de pago.",
      noQuestions:"Aún no hay preguntas disponibles para esta selección.",noQuestionsHint:"Prueba otra categoría o dificultad en Ajustes.",storageUnavailable:"El almacenamiento del dispositivo no está disponible; es posible que no se guarden los ajustes ni las puntuaciones.",roundIntegrityError:"No se pudo verificar esta ronda.",roundIntegrityHint:"Tus respuestas no se guardaron como resultado. Vuelve a Ajustes e inicia una ronda nueva.",question:"PREGUNTA",answerOptions:"Opciones de respuesta"
    }
  };
  function suggestedInterfaceLocale() {
    const deviceLocale = String(navigator.language || "").toLowerCase();
    if (deviceLocale === "ru" || deviceLocale.startsWith("ru-")) return "ru-RU";
    if (deviceLocale === "es-pe" || deviceLocale.startsWith("es-pe-")) return "es-PE";
    if (deviceLocale === "es-es" || deviceLocale.startsWith("es-es-")) return "es-ES";
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
      interfaceLocale: INTERFACE_LOCALES.includes(saved.interfaceLocale) ? saved.interfaceLocale : DEFAULTS.interfaceLocale,
      questionRegion: REGIONS.includes(saved.questionRegion) ? saved.questionRegion : DEFAULTS.questionRegion,
      questionLocale: LOCALES.includes(saved.questionLocale) ? saved.questionLocale : DEFAULTS.questionLocale,
      category: CATEGORIES.includes(saved.category) ? saved.category : "all",
      difficulty: ["all", "easy", "medium", "hard"].includes(saved.difficulty) ? saved.difficulty : "all",
      roundLength: [5, 10, 15].includes(saved.roundLength) ? saved.roundLength : 10
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
  let currentStreak = 0;
  let bestStreak = 0;
  let answerHistory = [];
  let questionCycleSignature = "";
  let seenQuestionIds = new Set();
  let answered = false;
  let noQuestionsForSelection = false;
  let lastView = "home-view";
  const $ = (id) => document.getElementById(id);
  const views = ["home-view", "quiz-view", "result-view", "settings-view", "help-view", "privacy-view", "accessibility-view"];
  const t = (key) => (UI[settings.interfaceLocale] || UI["en-IN"])[key] || key;
  const localeName = (locale) => locale === "ru-RU" ? "Russian (Russian Federation) — ru-RU" : locale === "en-US" ? "English (United States of America) — en-US" : "English (Republic of India) — en-IN";
  const regionName = (region) => REGION_NAMES[settings.interfaceLocale][region];
  const categoryName = (category) => t("category" + category);
  const selectedCategoryName = () => settings.category === "all" ? t("allCategories") : categoryName(settings.category);
  const selectedDifficultyName = () => settings.difficulty === "all" ? t("anyDifficulty") : t(settings.difficulty);
  const bestScoreKey = () => "mindquest.best." + settings.questionRegion + "." + settings.category + "." + settings.difficulty + "." + settings.roundLength;
  const readBestScore = () => {
    const stored = safeStorage.get(bestScoreKey());
    if (!stored.ok) {
      storageWarning = true;
      updateStorageStatus();
      return null;
    }
    let serialized = stored.value;
    let migrateLegacyTenQuestionScore = false;
    // Preserve best scores created before round length became a setting.
    if (serialized === null && settings.roundLength === 10) {
      const legacyKey = "mindquest.best." + settings.questionRegion + "." + settings.category + "." + settings.difficulty;
      const legacy = safeStorage.get(legacyKey);
      if (!legacy.ok) {
        storageWarning = true;
        updateStorageStatus();
        return null;
      }
      serialized = legacy.value;
      migrateLegacyTenQuestionScore = serialized !== null;
    }
    try {
      const record = JSON.parse(serialized || "null");
      if (!record || typeof record !== "object" || Array.isArray(record) ||
          Object.keys(record).sort().join("|") !== "score|total" ||
          !Number.isInteger(record.score) || !Number.isInteger(record.total) ||
          record.total < 1 || record.total > settings.roundLength ||
          record.score < 0 || record.score > record.total) return null;
      if (migrateLegacyTenQuestionScore &&
          !safeStorage.set(bestScoreKey(), JSON.stringify(record))) {
        storageWarning = true;
        updateStorageStatus();
      }
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
    $("round-length").value = String(settings.roundLength);
    $("home-region").textContent = regionName(settings.questionRegion);
    updateStorageStatus();
    const best = readBestScore();
    const bestPercent = best ? Math.round((best.score / best.total) * 100) : null;
    $("best-score").textContent = best ? best.score + " / " + best.total + " · " + bestPercent + "%" : "—";
    $("best-score-scope").textContent = [regionName(settings.questionRegion), selectedCategoryName(), selectedDifficultyName(), t("roundLengthScope").replace("{count}", settings.roundLength)].join(" · ");
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
    $("round-length").value = String(settings.roundLength);
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
    currentStreak = 0;
    bestStreak = 0;
    $("streak-value").textContent = "0";
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
      questionCycleSignature = "";
      seenQuestionIds.clear();
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
          .replace(/\s+/gu, " ")
          .toLocaleLowerCase(locale)
      );
      return new Set(prompts).size !== prompts.length;
    });
    if (hasDuplicatePrompt) {
      showRecovery("roundIntegrityError", "roundIntegrityHint");
      return;
    }

    const sortedPoolIds = [...questionIds].sort();
    const poolSignature = sortedPoolIds.join("|");
    // A changed region/category/difficulty pool starts a fresh session-local cycle.
    if (poolSignature !== questionCycleSignature) {
      questionCycleSignature = poolSignature;
      seenQuestionIds.clear();
    }
    // Once every eligible question has appeared, begin a new cycle.
    if (seenQuestionIds.size >= pool.length) seenQuestionIds.clear();

    const shuffled = [...pool];
    // Fisher–Yates randomizes question order within the unseen and fill pools.
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const targetRoundLength = Math.min(settings.roundLength, pool.length);
    const unseen = shuffled.filter((question) => !seenQuestionIds.has(question.id));
    const difficultyOrder = ["easy", "medium", "hard"];
    // Allocate the selected round mix proportionally to the eligible pool.
    // Largest-remainder apportionment keeps quotas whole and totals exact.
    const difficultyQuotas = difficultyOrder.map((difficulty, order) => {
      const count = pool.filter((question) => question.difficulty === difficulty).length;
      const exactQuota = targetRoundLength * count / pool.length;
      const quota = Math.floor(exactQuota);
      return { difficulty, order, quota, remainder: exactQuota - quota };
    });
    let unallocated = targetRoundLength -
      difficultyQuotas.reduce((total, item) => total + item.quota, 0);
    [...difficultyQuotas]
      .sort((a, b) => b.remainder - a.remainder || a.order - b.order)
      .slice(0, unallocated)
      .forEach((item) => { item.quota += 1; });

    const selectedRound = [];
    for (const item of difficultyQuotas) {
      const available = unseen.filter((question) => question.difficulty === item.difficulty);
      selectedRound.push(...available.slice(0, item.quota));
    }
    // If a difficulty has too few unseen questions left, fill from other unseen
    // questions first so the session cycle still avoids repeats whenever possible.
    const selectedIdSet = new Set(selectedRound.map((question) => question.id));
    if (selectedRound.length < targetRoundLength) {
      for (const question of unseen) {
        if (selectedRound.length >= targetRoundLength) break;
        if (!selectedIdSet.has(question.id)) {
          selectedRound.push(question);
          selectedIdSet.add(question.id);
        }
      }
    }
    // Near the end of a cycle fewer unseen questions than the selected round length may remain.
    // Include every remaining unseen question, then fill from the seen pool.
    if (selectedRound.length < targetRoundLength) {
      for (const question of shuffled) {
        if (selectedRound.length >= targetRoundLength) break;
        if (!selectedIdSet.has(question.id)) {
          selectedRound.push(question);
          selectedIdSet.add(question.id);
        }
      }
    }
    const selectedIds = selectedRound.map((question) => question.id);
    if (selectedRound.length !== targetRoundLength ||
        new Set(selectedIds).size !== selectedIds.length ||
        selectedRound.some((question) => !isPlayableQuestion(question))) {
      showRecovery("roundIntegrityError", "roundIntegrityHint");
      return;
    }
    // Randomize the final sequence after difficulty quotas are met so difficulty
    // is balanced without appearing in predictable consecutive blocks.
    for (let i = selectedRound.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [selectedRound[i], selectedRound[j]] = [selectedRound[j], selectedRound[i]];
    }
    selectedIds.forEach((id) => seenQuestionIds.add(id));
    round = selectedRound;
    current = 0;
    score = 0;
    currentStreak = 0;
    bestStreak = 0;
    $("streak-value").textContent = "0";
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
    const optionOrder = ["a", "b", "c", "d"];
    // Shuffle answer positions independently for every question. The answer keys
    // remain attached to their option text, so scoring and review stay canonical.
    for (let i = optionOrder.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionOrder[i], optionOrder[j]] = [optionOrder[j], optionOrder[i]];
    }
    const host = $("answers");
    host.replaceChildren();
    optionOrder.forEach((key) => {
      const letter = key.toUpperCase();
      const button = document.createElement("button");
      button.type = "button";
      button.className = "answer-option";
      button.dataset.answer = key;
      button.setAttribute("role", "radio");
      button.setAttribute("aria-checked", "false");
      button.tabIndex = optionOrder[0] === key ? 0 : -1;
      button.addEventListener("keydown", event => {
        const directions = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
        const direction = directions[event.key];
        if (!direction) return;
        const available = [...host.querySelectorAll('button[role="radio"]:not(:disabled)')];
        const index = available.indexOf(button);
        if (index < 0 || available.length < 2) return;
        event.preventDefault();
        const target = available[(index + direction + available.length) % available.length];
        target.focus();
        target.click();
      });
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
    if (correct) {
      score += 1;
      currentStreak += 1;
      bestStreak = Math.max(bestStreak, currentStreak);
    } else {
      currentStreak = 0;
    }
    $("streak-value").textContent = String(currentStreak);
    answerHistory[current] = { choice, correct: item.correct, options: { ...copy.options }, explanation: copy.explanation, isCorrect: correct };
    $("answers").querySelectorAll('button[role="radio"]').forEach((button) => {
      const selected = button.dataset.answer === choice;
      button.setAttribute("aria-checked", String(selected));
      button.tabIndex = selected ? 0 : -1;
      button.disabled = true;
      if (button.dataset.answer === item.correct) button.classList.add("correct");
      else if (selected) button.classList.add("incorrect");
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
    let verifiedStreak = 0;
    let verifiedBestStreak = 0;
    for (let index = 0; index < round.length; index += 1) {
      const item = round[index];
      const entry = answerHistory[index];
      if (!isPlayableQuestion(item) || !entry || typeof entry !== "object" || Array.isArray(entry)) return false;
      const copy = item.translations[settings.questionLocale];
      if (Object.keys(entry).sort().join("|") !== "choice|correct|explanation|isCorrect|options" ||
          !["a", "b", "c", "d"].includes(entry.choice) ||
          entry.correct !== item.correct ||
          !entry.options || typeof entry.options !== "object" || Array.isArray(entry.options) ||
          Object.keys(entry.options).sort().join("|") !== "a|b|c|d" ||
          !["a", "b", "c", "d"].every((key) =>
            typeof entry.options[key] === "string" &&
            entry.options[key] === copy.options[key]
          ) ||
          entry.explanation !== copy.explanation ||
          entry.isCorrect !== (entry.choice === item.correct)) return false;
      if (entry.isCorrect) {
        verifiedScore += 1;
        verifiedStreak += 1;
        verifiedBestStreak = Math.max(verifiedBestStreak, verifiedStreak);
      } else {
        verifiedStreak = 0;
      }
    }
    return verifiedScore === score &&
      verifiedStreak === currentStreak &&
      verifiedBestStreak === bestStreak;
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
    $("result-message").textContent = t("roundScore").replace("{score}", score).replace("{total}", round.length) + " " + t("accuracy").replace("{percent}", percent) + " " + t("bestStreak").replace("{streak}", bestStreak);
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
      difficulty: $("question-difficulty").value,
      roundLength: Number($("round-length").value)
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
