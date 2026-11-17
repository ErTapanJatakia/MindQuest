(() => {
  "use strict";

  const regionSelect = document.getElementById("question-region");
  const interfaceSelect = document.getElementById("interface-locale");
  const names = {
    "en-IN": { IN: "India", RU: "Russia", US: "United States" },
    "en-US": { IN: "India", RU: "Russia", US: "United States" },
    "ru-RU": { IN: "Индия", RU: "Россия", US: "США" }
  };

  function refreshRegionLabels() {
    const locale = interfaceSelect.value;
    [...regionSelect.options].forEach((option) => {
      option.textContent = names[locale][option.value];
    });
  }

  interfaceSelect.addEventListener("change", refreshRegionLabels);
  document.getElementById("settings-save").addEventListener("click", refreshRegionLabels);
  refreshRegionLabels();
})();
