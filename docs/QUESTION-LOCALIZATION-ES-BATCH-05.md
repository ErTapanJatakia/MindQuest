# Spanish question localization — batch 05

## Scope

- Adds Spanish translations for 10 additional existing stable question IDs.
- Adds 20 localized records: one `es-ES` and one `es-PE` record per ID.
- Combined Spanish coverage after batches 01–05: 50 of 150 existing IDs (100 locale records).
- Canonical IDs, region/category/difficulty metadata and correct-answer keys are unchanged.
- The fifth overlay loads after batches 01–04 and before application startup.
- Spanish question-language selectors remain hidden; no partially complete locale is exposed.

## Included IDs

| Stable ID | Subject | Canonical correct key |
|---|---|---:|
| US-HIS-004 | Gettysburg Address | a |
| US-HIS-005 | Thirteenth Amendment | d |
| US-SCI-005 | Hubble Space Telescope | b |
| US-CUL-004 | Broadway theatre district | c |
| US-CUL-005 | Eero Saarinen / Gateway Arch | a |
| IN-GEO-006 | Sundarbans / West Bengal | c |
| IN-GEO-007 | Western Ghats | a |
| IN-HIS-006 | Akbar / Fatehpur Sikri | d |
| IN-SCI-006 | ISRO headquarters / Bengaluru | b |
| IN-CUL-006 | Ajanta Buddhist paintings | c |

## Automated controls

The cumulative validator checks all 50 IDs across both Spanish locales:

- Both `es-ES` and `es-PE` records exist for every expected ID.
- Only the required translation fields are present.
- Questions and explanations are non-empty.
- Exactly four distinct, non-empty answer options exist.
- Canonical answer keys remain unchanged and point to the expected translated answer.
- All five Spanish overlay scripts load before application startup.
- Spanish locale selectors remain unavailable until the complete bank and editorial gates are satisfied.

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

No native-speaker review is claimed. Spanish text is a carefully prepared draft awaiting independent language review.

## Primary-source review targets

These are review targets, not claims that the listed sources have already been independently checked or that they endorse the translations.

- Gettysburg Address / US National Archives: https://www.archives.gov/milestone-documents/gettysburg-address
- Thirteenth Amendment / US National Archives: https://www.archives.gov/milestone-documents/13th-amendment
- Hubble Space Telescope / NASA: https://science.nasa.gov/mission/hubble/
- Broadway / The Broadway League: https://www.broadwayleague.com/
- Gateway Arch / US National Park Service: https://www.nps.gov/jeff/learn/historyculture/gateway-arch.htm
- Sundarbans / UNESCO World Heritage Centre: https://whc.unesco.org/en/list/452/
- Western Ghats / UNESCO World Heritage Centre: https://whc.unesco.org/en/list/1342/
- Fatehpur Sikri / UNESCO World Heritage Centre: https://whc.unesco.org/en/list/255/
- ISRO headquarters / ISRO: https://www.isro.gov.in/
- Ajanta Caves / Archaeological Survey of India: https://asi.nic.in/

## Remaining work

- Continue in small, traceable batches.
- Keep `es-ES` and `es-PE` phrasing independently authored rather than mechanically relabelling one locale.
- Complete both Spanish translations for all 150 existing questions.
- Author original Spain and Peru regional question banks, then localize every question into all five target locales.
- Do not expose Spanish selectors until full content, structural checks, answer-key review, factual review and available language-quality review gates are complete.
