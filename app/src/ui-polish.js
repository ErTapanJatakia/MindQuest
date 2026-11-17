(() => {
  "use strict";

  const regionSelect = document.getElementById("question-region");
  const interfaceSelect = document.getElementById("interface-locale");
  const questionLocaleSelect = document.getElementById("question-locale");
  const regionNames = {
    "en-IN": { IN: "India", RU: "Russia", US: "United States" },
    "en-US": { IN: "India", RU: "Russia", US: "United States" },
    "ru-RU": { IN: "Индия", RU: "Россия", US: "США" }
  };
  const localeNames = {
    "en-IN": { "en-IN": "English (India)", "en-US": "English (United States)", "ru-RU": "Russian" },
    "en-US": { "en-IN": "English (India)", "en-US": "English (United States)", "ru-RU": "Russian" },
    "ru-RU": { "en-IN": "Английский (Индия)", "en-US": "Английский (США)", "ru-RU": "Русский" }
  };
  const interfaceNames = {
    "en-IN": { "en-IN": "English (India)", "en-US": "English (United States)", "ru-RU": "Russian" },
    "en-US": { "en-IN": "English (India)", "en-US": "English (United States)", "ru-RU": "Russian" },
    "ru-RU": { "en-IN": "Английский (Индия)", "en-US": "Английский (США)", "ru-RU": "Русский" }
  };

  function refreshSelectorLabels() {
    const locale = interfaceSelect.value;
    [...regionSelect.options].forEach((option) => {
      option.textContent = regionNames[locale][option.value];
    });
    [...questionLocaleSelect.options].forEach((option) => {
      option.textContent = localeNames[locale][option.value];
    });
    [...interfaceSelect.options].forEach((option, index) => {
      option.textContent = interfaceNames[locale][option.value];
    });
  }

  interfaceSelect.addEventListener("change", refreshSelectorLabels);
  document.getElementById("settings-save").addEventListener("click", refreshSelectorLabels);
  refreshSelectorLabels();
})();
