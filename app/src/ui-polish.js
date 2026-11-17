(() => {
  const regionSelect = document.getElementById("question-region");
  const interfaceSelect = document.getElementById("interface-locale");
  const bestScore = document.getElementById("best-score");
  const finalScore = document.getElementById("final-score");
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
  function refreshScoreLabels() {
    const best = localStorage.getItem("mindquest.best") || "0";
    bestScore.textContent = best;
    if (finalScore.textContent === "0/10") finalScore.textContent = "0";
  }
  interfaceSelect.addEventListener("change", refreshRegionLabels);
  document.getElementById("settings-save").addEventListener("click", () => {
    refreshRegionLabels();
    refreshScoreLabels();
  });
  refreshRegionLabels();
  refreshScoreLabels();
})();
