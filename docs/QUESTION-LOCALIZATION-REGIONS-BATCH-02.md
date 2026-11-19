# Spain and Peru question-bank expansion — batch 02

## Scope

- 20 additional original staged question IDs: 10 for Spain (ES) and 10 for Peru (PE).
- Five explicit locale records per ID: en-IN, en-US, ru-RU, es-ES and es-PE.
- 100 localized records in this batch; cumulative staged total is 40 IDs / 200 records.
- Batch 02 regional slice: Geography 3, History 2, Science 3, Culture 2; difficulty easy 3, medium 4, hard 3.
- Stable IDs and shared answer keys are fixed. Staged data remains excluded from the live app.

## Stable IDs and source register

| Stable ID | Topic | Primary / institutional factual reference |
|---|---|---|
| ES-GEO-004 | Guadalquivir flows into the Atlantic | [Spanish Government — Geography of Spain](https://www.lamoncloa.gob.es/lang/en/espana/historyandculture/geography/paginas/index.aspx) |
| ES-GEO-005 | Meseta Central is Spain's central plateau | [Spanish Government — Geography of Spain](https://www.lamoncloa.gob.es/lang/en/espana/historyandculture/geography/paginas/index.aspx) |
| ES-GEO-006 | Balearic Islands lie in the Mediterranean | [Spain.info — Geography and landscape](https://www.spain.info/en/discover-spain/facts-spain-geography-landscape/) |
| ES-HIS-004 | Nasrid Granada surrendered in 1492 | [Alhambra / UNESCO — Granada heritage context](https://www.alhambra-patronato.es/en/notas-prensa/the-alhambra-opens-the-enigmatic-gate-of-the-seven-floors-to-the-public) |
| ES-HIS-005 | Magellan expedition departed Seville in 1519 | [Spanish Navy — First circumnavigation](https://armada.defensa.gob.es/ArmadaPortal/page/Portal/ArmadaEspannola/conocenosnoticias/prefLang-en/00noticias--2019--08--NT-094-NAVY-CELEB-500-en) |
| ES-SCI-003 | Juan de la Cierva developed the autogyro; first flight in 1923 | [Spanish Official Gazette — centenary of the first autogyro flight](https://www.boe.es/buscar/doc.php?id=BOE-A-2023-1565) |
| ES-SCI-004 | Isaac Peral launched his submarine in Cádiz Bay in 1888 | [Spanish Navy — submarine history](https://armada.defensa.gob.es/ArmadaPortal/page/Portal/ArmadaEspannola/conocenosorganizacion/prefLang-en/03Flota--06FLOSUB) |
| ES-SCI-005 | Margarita Salas helped characterise phi29 DNA polymerase | [Spanish National Research Council (CSIC) — Margarita Salas](https://www.csic.es/sites/default/files/d7/noticias/02noviembre2021_homenaje_margarita_salas_.pdf) |
| ES-CUL-003 | Antoni Gaudí designed the Sagrada Família | [UNESCO — Works of Antoni Gaudí](https://whc.unesco.org/en/list/320) |
| ES-CUL-004 | Andalusia is the heartland of flamenco | [UNESCO — Flamenco](https://ich.unesco.org/en/RL/flamenco-00363) |
| PE-GEO-004 | Lake Titicaca is shared by Peru and Bolivia | [Peruvian Ministry of Environment — Peru general facts](https://cdn.www.gob.pe/uploads/document/file/12225/1351.pdf) |
| PE-GEO-005 | Colca Canyon is in the Arequipa region | [World Bank — Arequipa–Colca corridor](https://www.worldbank.org/en/news/press-release/2026/07/10/peru-to-strengthen-the-arequipa-colca-tourism-corridor-and-promote-private-investment-and-job-creation-with-world-bank-s) |
| PE-GEO-006 | Peru's western coastline borders the Pacific Ocean | [Peruvian Ministry of Environment — Peru general facts](https://cdn.www.gob.pe/uploads/document/file/12225/1351.pdf) |
| PE-HIS-004 | Battle of Ayacucho took place on 9 December 1824 | [UNESCO — Bicentenario-Ayacucho](https://www.unesco.org/en/mab/bicentenario-ayacucho) |
| PE-HIS-005 | Túpac Amaru II uprising began in 1780 | [Peruvian Government — Peru: a wonder to discover](https://www.gob.pe/institucion/corpac/informes-publicaciones/3612249-peru-una-maravilla-por-descubrir) |
| PE-SCI-003 | Daniel Alcides Carrión's 1885 self-inoculation study | [Universidad Nacional Mayor de San Marcos — Daniel Alcides Carrión](https://medicina.unmsm.edu.pe/unidad-de-biblioteca-hemeroteca-y-centro-documentario/repositorio-historico/daniel-alcides-carrion/) |
| PE-SCI-004 | Quelccaya ice cores preserve past climate signals | [NASA Earth Observatory — Tropical climate history](https://science.nasa.gov/earth/earth-observatory/tropical-climate-historyshrinking-80925/) |
| PE-SCI-005 | Humboldt Current coastal upwelling brings nutrient-rich water toward the surface | [Convention on Biological Diversity — Humboldt Current upwelling system in Peru](https://www.cbd.int/decision/cop/default.shtml?id=13385) |
| PE-CUL-003 | Nasca Lines are large desert geoglyphs | [UNESCO — Lines and Geoglyphs of Nasca and Palpa](https://whc.unesco.org/en/list/700) |
| PE-CUL-004 | Chan Chan was the capital of the Chimú Kingdom | [UNESCO — Chan Chan Archaeological Zone](https://whc.unesco.org/en/list/366/) |

## Quality and release gates

- Every item has five explicit locale versions, with no runtime fallback.
- Each translation contains a question, four distinct answer options and a complete explanation.
- Shared correct-answer keys remain consistent across all five locales.
- The cumulative validator checks both staged source files, all 40 stable IDs, exact locale and translation schemas, option uniqueness, duplicate prompts, batch-level category/difficulty quotas, cumulative quotas and source-register coverage.
- The batch remains unreferenced by `app/index.html`; it is not selectable or playable.
- These are assistant-prepared translation drafts. Native-speaker review of es-ES and es-PE, independent answer-key review and factual/editorial approval remain pending.
- Do not enable Spain/Peru regions or Spanish question-language selectors until each complete 50-question bank and all review gates pass.

## Planned cumulative regional quota

| Batch | Geography | History | Science | Culture | Easy | Medium | Hard |
|---|---:|---:|---:|---:|---:|---:|---:|
| 01 | 3 | 3 | 2 | 2 | 3 | 4 | 3 |
| 02 (this batch) | 3 | 2 | 3 | 2 | 3 | 4 | 3 |
| Cumulative 01–02 | 6 | 5 | 5 | 4 | 6 | 8 | 6 |
| Final target per region | 13 | 12 | 12 | 13 | 15 | 20 | 15 |
