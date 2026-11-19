# Spain and Peru question-bank expansion — batch 01

## Scope

- 20 original staged question IDs: 10 for Spain (ES) and 10 for Peru (PE).
- Five explicit locale records per ID: en-IN, en-US, ru-RU, es-ES and es-PE.
- 100 localized records in this batch.
- Each regional batch slice has Geography 3, History 3, Science 2, Culture 2 and difficulty easy 3, medium 4, hard 3. These are staged increments, not the final 50-question quota.
- Stable IDs and shared answer keys are fixed for this batch.
- Staged data is not loaded into the application, not selectable and not playable. This is deliberate until each complete 50-question region and its editorial checks pass.

## Stable IDs and source register

| Stable ID | Topic | Primary / institutional factual reference |
|---|---|---|
| ES-GEO-001 | Teide is the highest point on Spanish soil | [Spain.info — geography and landscape](https://www.spain.info/en/discover-spain/facts-spain-geography-landscape/) |
| ES-GEO-002 | Ebro discharges into the Mediterranean | [European Commission JRC — Ebro River Basin fact sheet](https://water.jrc.ec.europa.eu/pdf/ebro-fs.pdf) |
| ES-GEO-003 | Pyrenees form the Spain–France mountain boundary | [Spain.info — geography and landscape](https://www.spain.info/en/discover-spain/facts-spain-geography-landscape/) |
| ES-HIS-001 | 1978 Constitution referendum date | [Spanish Senate — Constitution](https://www.senado.es/web/conocersenado/normas/constitucion/index.html?lang=en) |
| ES-HIS-002 | Alhambra is in Granada | [UNESCO — Alhambra, Generalife and Albayzín](https://whc.unesco.org/en/list/314) |
| ES-HIS-003 | Roman Tarraco is modern Tarragona | [UNESCO — Archaeological Ensemble of Tarraco](https://whc.unesco.org/en/list/875) |
| ES-SCI-001 | Severo Ochoa shared the 1959 Physiology or Medicine Nobel | [Nobel Prize — all Nobel Prizes](https://www.nobelprize.org/prizes/lists/all-nobel-prizes/all/) |
| ES-SCI-002 | Ramón y Cajal shared the 1906 Physiology or Medicine Nobel | [Nobel Prize — all Nobel Prizes](https://www.nobelprize.org/prizes/lists/all-nobel-prizes/all/) |
| ES-CUL-001 | Miguel de Cervantes authored Don Quixote | [Biblioteca Nacional de España — first edition](https://www.bne.es/es/colecciones/cervantes/ingenioso-hidalgo-don-quixote-mancha) |
| ES-CUL-002 | Pablo Picasso painted Guernica in 1937 | [Museo Reina Sofía — Guernica](https://www.museoreinasofia.es/en/collections/artwork/guernica-0/) |
| PE-GEO-001 | Huascarán is Peru's highest peak | [UNESCO — Huascarán National Park](https://whc.unesco.org/en/list/333/) |
| PE-GEO-002 | Huascarán National Park is in the Cordillera Blanca | [UNESCO — Huascarán National Park](https://whc.unesco.org/en/list/333/) |
| PE-GEO-003 | Machu Picchu is approximately 2,430 metres above sea level | [UNESCO — Historic Sanctuary of Machu Picchu](https://whc.unesco.org/en/list/274) |
| PE-HIS-001 | José de San Martín proclaimed Peru's independence in 1821 | [Peru Travel — History](https://www.peru.travel/yourperfectperu/about-peru/History) |
| PE-HIS-002 | Caral-Supe is the oldest known centre of civilisation in the Americas | [UNESCO — Sacred City of Caral-Supe](https://whc.unesco.org/en/list/1269) |
| PE-HIS-003 | Caral-Supe entered the World Heritage List in 2009 | [UNESCO — Sacred City of Caral-Supe](https://whc.unesco.org/en/list/1269) |
| PE-SCI-001 | Chankillo's thirteen towers track the annual solar cycle | [UNESCO — Chankillo Archaeoastronomical Complex](https://whc.unesco.org/en/list/1624) |
| PE-SCI-002 | A quipu was found at Caral-Supe as evidence of record keeping | [UNESCO — Sacred City of Caral-Supe](https://whc.unesco.org/en/list/1269) |
| PE-CUL-001 | Machu Picchu is a major tangible legacy of the Inca civilisation | [UNESCO — Historic Sanctuary of Machu Picchu](https://whc.unesco.org/en/list/274) |
| PE-CUL-002 | Cusco is a UNESCO World Heritage city with Inca heritage | [UNESCO — Peru World Heritage properties](https://whc.unesco.org/en/statesparties/pe) |

## Quality and release gates

- Every item contains all five locales explicitly; no runtime fallback or machine-generated locale substitution is used.
- Each translation includes a question, four unique options and a complete explanation.
- The shared correct-answer key remains consistent across all five locales.
- Automated checks cover stable IDs, region/category/difficulty fields, exact locale set, exact translation fields, option uniqueness, prompt duplication and source-register coverage.
- These are assistant-prepared translation drafts. Native-speaker review of es-ES and es-PE, independent answer-key review and factual/editorial approval remain pending.
- Do not enable either region or either Spanish question locale in selectors until the complete 50-question bank per region, full five-locale coverage and all review gates pass.

## Planned cumulative regional quota

| Batch | Geography | History | Science | Culture | Easy | Medium | Hard |
|---|---:|---:|---:|---:|---:|---:|---:|
| 01 (this batch) | 3 | 3 | 2 | 2 | 3 | 4 | 3 |
| Final target per region | 13 | 12 | 12 | 13 | 15 | 20 | 15 |
