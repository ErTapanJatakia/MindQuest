(() => {
  "use strict";

  const regionSelect = document.getElementById("question-region");
  const interfaceSelect = document.getElementById("interface-locale");
  const questionLocaleSelect = document.getElementById("question-locale");
  const regionNames = {
    "en-IN": { IN:"Republic of India — IN", RU:"Russian Federation — RU", US:"United States of America — US" },
    "en-US": { IN:"Republic of India — IN", RU:"Russian Federation — RU", US:"United States of America — US" },
    "ru-RU": { IN:"Республика Индия — IN", RU:"Российская Федерация — RU", US:"Соединённые Штаты Америки — US" }
  };
  const localeNames = {
    "en-IN": { "en-IN":"English (Republic of India) — en-IN", "en-US":"English (United States of America) — en-US", "ru-RU":"Russian (Russian Federation) — ru-RU" },
    "en-US": { "en-IN":"English (Republic of India) — en-IN", "en-US":"English (United States of America) — en-US", "ru-RU":"Russian (Russian Federation) — ru-RU" },
    "ru-RU": { "en-IN":"Английский (Республика Индия) — en-IN", "en-US":"Английский (Соединённые Штаты Америки) — en-US", "ru-RU":"Русский (Российская Федерация) — ru-RU" }
  };

  function refreshSelectorLabels() {
    const locale = interfaceSelect.value;
    [...regionSelect.options].forEach(option => { option.textContent = regionNames[locale][option.value]; });
    [...questionLocaleSelect.options].forEach(option => { option.textContent = localeNames[locale][option.value]; });
    [...interfaceSelect.options].forEach(option => { option.textContent = localeNames[locale][option.value]; });
  }

  interfaceSelect.addEventListener("change", refreshSelectorLabels);
  document.getElementById("settings-save").addEventListener("click", refreshSelectorLabels);
  refreshSelectorLabels();
})();