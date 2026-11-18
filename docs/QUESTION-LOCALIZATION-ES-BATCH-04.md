# Spanish question localization — batch 04

## Scope

- Adds Spanish translations for 10 additional existing stable question IDs.
- Adds 20 localized records: one `es-ES` and one `es-PE` record per ID.
- Combined Spanish coverage after batches 01–04: 40 of 150 existing IDs (80 locale records).
- Canonical question IDs, region/category/difficulty metadata and correct-answer keys are unchanged.
- The fourth overlay loads after batches 01–03 and before application startup.
- Spanish question-language selectors remain hidden; no partially complete locale is exposed.

## Included IDs

| Stable ID | Subject | Canonical correct key |
|---|---|---:|
| IN-HIS-005 | Gandhi's Salt March starting point | b |
| IN-SCI-004 | Hardy–Ramanujan number | b |
| IN-SCI-005 | Chandrayaan-3 lunar landing | a |
| IN-CUL-004 | Kathakali and Kerala | c |
| IN-CUL-005 | Natya Shastra | b |
| RU-HIS-005 | Valentina Tereshkova | c |
| RU-SCI-004 | Dmitri Mendeleev and periodic law | a |
| RU-SCI-005 | Luna 9 lunar landing | d |
| RU-CUL-004 | Ivan Turgenev / Fathers and Sons | c |
| RU-CUL-005 | Igor Stravinsky / The Firebird | c |

## Automated controls

The cumulative validator checks all 40 IDs across both Spanish locales:

- Both `es-ES` and `es-PE` records exist for every expected ID.
- Only the required translation fields are present.
- Questions and explanations are non-empty.
- Exactly four distinct, non-empty answer options exist.
- The canonical answer key remains unchanged and points to the expected translated answer.
- All four Spanish overlay scripts are loaded before the application code.
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

No native-speaker review is claimed. The Spanish text is a carefully prepared draft and must remain marked as awaiting independent language review.

## Primary-source review targets

These are review targets, not claims that the listed sources have already been independently checked or that they endorse the translations.

- Salt March / Gandhi Heritage Portal: https://www.gandhiheritageportal.org/
- Ramanujan / MacTutor History of Mathematics: https://mathshistory.st-andrews.ac.uk/Biographies/Ramanujan/
- Chandrayaan-3 / ISRO: https://www.isro.gov.in/Chandrayaan3.html
- Kathakali / Sangeet Natak Akademi: https://sangeetnatak.gov.in/
- Natya Shastra / Encyclopaedia Britannica: https://www.britannica.com/topic/Natyashastra
- Valentina Tereshkova / NASA history: https://www.nasa.gov/
- Mendeleev / Royal Society of Chemistry: https://www.rsc.org/periodic-table
- Luna 9 / NASA Space Science Data Coordinated Archive: https://nssdc.gsfc.nasa.gov/
- Fathers and Sons / Encyclopaedia Britannica: https://www.britannica.com/topic/Fathers-and-Sons
- The Firebird / Encyclopaedia Britannica: https://www.britannica.com/topic/The-Firebird

## Remaining work

- Continue in small, traceable batches.
- Keep `es-ES` and `es-PE` phrasing independently authored rather than mechanically relabelling one locale.
- Complete both Spanish translations for all 150 existing questions.
- Author original Spain and Peru regional question banks, then localize every question into all five target locales.
- Do not expose Spanish selectors until the full content, structural checks, answer-key review, factual review and available language-quality review gates are complete.
