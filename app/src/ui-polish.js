(() => {
  "use strict";
  const regionSelect = document.getElementById("question-region");
  const interfaceSelect = document.getElementById("interface-locale");
  const questionLocaleSelect = document.getElementById("question-locale");
  const regionNames = {
    "en-IN": { IN:"Republic of India — IN", RU:"Russian Federation — RU", US:"United States of America — US", ES:"Kingdom of Spain — ES", PE:"Republic of Peru — PE" },
    "en-US": { IN:"Republic of India — IN", RU:"Russian Federation — RU", US:"United States of America — US", ES:"Kingdom of Spain — ES", PE:"Republic of Peru — PE" },
    "ru-RU": { IN:"Республика Индия — IN", RU:"Российская Федерация — RU", US:"Соединённые Штаты Америки — US", ES:"Королевство Испания — ES", PE:"Республика Перу — PE" },
    "es-PE": { IN:"República de la India — IN", RU:"Federación de Rusia — RU", US:"Estados Unidos de América — US", ES:"Reino de España — ES", PE:"República del Perú — PE" },
    "es-ES": { IN:"República de la India — IN", RU:"Federación de Rusia — RU", US:"Estados Unidos de América — US", ES:"Reino de España — ES", PE:"República del Perú — PE" }
  };
  const localeNames = {
    "en-IN": { "en-IN":"English (Republic of India) — en-IN", "en-US":"English (United States of America) — en-US", "ru-RU":"Russian (Russian Federation) — ru-RU", "es-PE":"Spanish (Republic of Peru) — es-PE", "es-ES":"Spanish (Kingdom of Spain) — es-ES" },
    "en-US": { "en-IN":"English (Republic of India) — en-IN", "en-US":"English (United States of America) — en-US", "ru-RU":"Russian (Russian Federation) — ru-RU", "es-PE":"Spanish (Republic of Peru) — es-PE", "es-ES":"Spanish (Kingdom of Spain) — es-ES" },
    "ru-RU": { "en-IN":"Английский (Республика Индия) — en-IN", "en-US":"Английский (Соединённые Штаты Америки) — en-US", "ru-RU":"Русский (Российская Федерация) — ru-RU", "es-PE":"Испанский (Республика Перу) — es-PE", "es-ES":"Испанский (Королевство Испания) — es-ES" },
    "es-PE": { "en-IN":"Inglés (República de la India) — en-IN", "en-US":"Inglés (Estados Unidos de América) — en-US", "ru-RU":"Ruso (Federación de Rusia) — ru-RU", "es-PE":"Español (República del Perú) — es-PE", "es-ES":"Español (Reino de España) — es-ES" },
    "es-ES": { "en-IN":"Inglés (República de la India) — en-IN", "en-US":"Inglés (Estados Unidos de América) — en-US", "ru-RU":"Ruso (Federación de Rusia) — ru-RU", "es-PE":"Español (República del Perú) — es-PE", "es-ES":"Español (Reino de España) — es-ES" }
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