# Spanish question localization — batch 02

## Scope

- Adds Spanish translations for 10 additional existing stable question IDs.
- Adds 20 localized records: one `es-ES` and one `es-PE` record per ID.
- Combined Spanish coverage after batches 01 and 02: 20 of 150 existing IDs (40 locale records).
- Canonical question IDs, region/category/difficulty metadata and correct-answer keys are unchanged.
- The translation overlay remains loaded before application startup.
- Spanish question-language selectors remain hidden. This batch does not enable a partially complete locale.

## Included IDs

| Stable ID | Subject | Canonical correct key |
|---|---|---:|
| IN-HIS-002 | Adoption of the Constitution of India | b |
| IN-CUL-002 | Vaisakhi / Baisakhi | c |
| RU-GEO-003 | Volga River | a |
| RU-SCI-002 | Sputnik 1 | d |
| US-GEO-003 | Alaska land area | b |
| IN-GEO-004 | Chilika Lake | c |
| IN-HIS-003 | Purna Swaraj resolution | a |
| RU-GEO-004 | Ural Mountains | b |
| RU-CUL-003 | Woland / The Master and Margarita | d |
| US-GEO-004 | Lake Michigan | c |

## Automated controls

The cumulative Spanish localization validator checks all 20 IDs across both Spanish locales:

- Both `es-ES` and `es-PE` records exist for every expected ID.
- Only the required translation fields are present.
- Questions and explanations are non-empty.
- Exactly four distinct, non-empty answer options exist.
- The canonical answer key remains unchanged and points to the expected translated answer.
- Spanish locale selectors remain unavailable until the complete bank and editorial gates are satisfied.
- The translation overlay is referenced by the application HTML.

These checks establish structure and answer-key alignment. They do not establish factual accuracy, idiomatic quality, or native-speaker approval.

## Editorial review register

| Review item | Status |
|---|---|
| Translation field completeness | Implemented; automated validation required |
| Answer-key alignment | Preserved; automated validation required |
| es-ES orthography and idiom | Native-speaker review pending |
| es-PE orthography and idiom | Native-speaker review pending |
| Independent factual source review | Pending |
| Selector exposure | Blocked pending full-bank completion and review |

No native-speaker review is claimed. The Spanish text is a carefully prepared draft and must remain marked as awaiting independent language review.

## Primary-source review targets

These are review targets, not claims that the listed sources have already been independently checked or that they endorse the translations.

- Constitution of India / Legislative Department: https://legislative.gov.in/constitution-of-india/
- Sikh history and Vaisakhi / Encyclopaedia Britannica: https://www.britannica.com/topic/Vaisakhi
- Volga River / Encyclopaedia Britannica: https://www.britannica.com/place/Volga-River
- Sputnik 1 / NASA: https://www.nasa.gov/history/sputnik/
- Alaska area / US Census Bureau: https://www.census.gov/geographies/reference-files/2010/geo/state-area.html
- Chilika Lake / Ramsar Sites Information Service: https://rsis.ramsar.org/ris/229
- Purna Swaraj / Indian National Congress historical materials and National Archives of India: https://www.indianculture.gov.in/
- Ural Mountains / Encyclopaedia Britannica: https://www.britannica.com/place/Ural-Mountains
- The Master and Margarita / Encyclopaedia Britannica: https://www.britannica.com/topic/The-Master-and-Margarita
- Great Lakes geography / NOAA: https://oceanservice.noaa.gov/facts/greatlakes.html

## Remaining work

- Continue in small, traceable batches.
- Keep `es-ES` and `es-PE` phrasing independently authored rather than mechanically relabelling one locale.
- Complete both Spanish translations for all 150 existing questions.
- Author original Spain and Peru regional question banks, then localize every question into all five target locales.
- Do not expose Spanish selectors until the full content, structural checks, answer-key review, factual review and available language-quality review gates are complete.
