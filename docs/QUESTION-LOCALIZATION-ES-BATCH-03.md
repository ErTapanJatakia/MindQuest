# Spanish question localization — batch 03

## Scope

- Adds Spanish translations for 10 additional existing stable question IDs.
- Adds 20 localized records: one `es-ES` and one `es-PE` record per ID.
- Combined Spanish coverage after batches 01–03: 30 of 150 existing IDs (60 locale records).
- Canonical question IDs, region/category/difficulty metadata and correct-answer keys are unchanged.
- This batch is loaded as a separate runtime overlay after batches 01–02 and before application startup.
- Spanish question-language selectors remain hidden; no partially complete locale is exposed.

## Included IDs

| Stable ID | Subject | Canonical correct key |
|---|---|---:|
| IN-SCI-002 | Aryabhata launch year | a |
| RU-SCI-001 | Lev Landau / 1962 Nobel Prize | a |
| RU-HIS-001 | Treaty of Brest-Litovsk | b |
| US-GEO-002 | Colorado River and Grand Canyon | a |
| US-HIS-002 | Louisiana Purchase | c |
| IN-CUL-001 | Bharatanatyam and Tamil Nadu | b |
| IN-GEO-003 | Largest Indian state by area | d |
| RU-HIS-002 | Yuri Gagarin's first spaceflight | a |
| RU-CUL-002 | Tchaikovsky and Swan Lake | c |
| US-CUL-002 | Frank Lloyd Wright / Fallingwater | a |

## Automated controls

The cumulative validator checks all 30 IDs across both Spanish locales:

- Both `es-ES` and `es-PE` records exist for every expected ID.
- Only the required translation fields are present.
- Questions and explanations are non-empty.
- Exactly four distinct, non-empty answer options exist.
- The canonical answer key remains unchanged and points to the expected translated answer.
- Both Spanish overlay scripts are loaded before the application code.
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

- Aryabhata / ISRO: https://www.isro.gov.in/aryabhata.html
- Lev Landau / Nobel Prize: https://www.nobelprize.org/prizes/physics/1962/landau/facts/
- Treaty of Brest-Litovsk / Encyclopaedia Britannica: https://www.britannica.com/event/Treaty-of-Brest-Litovsk
- Grand Canyon geology / US National Park Service: https://www.nps.gov/grca/learn/nature/geology.htm
- Louisiana Purchase / US National Archives: https://www.archives.gov/milestone-documents/louisiana-purchase-treaty
- Bharatanatyam / Encyclopaedia Britannica: https://www.britannica.com/art/bharata-natyam
- State area / Government of India and Census references: https://censusindia.gov.in/
- Yuri Gagarin / NASA history: https://www.nasa.gov/history/60-years-ago-first-human-entered-space/
- Swan Lake / Encyclopaedia Britannica: https://www.britannica.com/topic/Swan-Lake
- Fallingwater / Frank Lloyd Wright Foundation: https://franklloydwright.org/site/fallingwater/

## Remaining work

- Continue in small, traceable batches.
- Keep `es-ES` and `es-PE` phrasing independently authored rather than mechanically relabelling one locale.
- Complete both Spanish translations for all 150 existing questions.
- Author original Spain and Peru regional question banks, then localize every question into all five target locales.
- Do not expose Spanish selectors until the full content, structural checks, answer-key review, factual review and available language-quality review gates are complete.
