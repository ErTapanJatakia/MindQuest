# Spanish question localization — batch 01

## Scope

- Existing stable IDs localized: 10 of 150.
- New locale records: 20 (es-ES and es-PE for each ID).
- Stable IDs and shared answer keys are unchanged.
- The overlay is loaded after the canonical question bank and before the application code.
- Spanish locales are deliberately **not selectable yet**. The existing region and question-language selectors remain limited to the complete, currently enabled bank.

## Included IDs

| ID | Topic | Shared correct key |
|---|---|---|
| IN-GEO-001 | Jaipur / Pink City | b |
| IN-HIS-001 | First Prime Minister of independent India | c |
| IN-SCI-001 | ISRO / Chandrayaan | a |
| RU-GEO-001 | Capital of Russia | b |
| RU-GEO-002 | Lake Baikal | d |
| RU-CUL-001 | *War and Peace* | a |
| US-GEO-001 | US national capital | c |
| US-HIS-001 | Declaration of Independence | a |
| US-SCI-001 | US civilian space programme | d |
| IN-GEO-002 | Tropic of Cancer across Indian states | c |

## Quality controls

- Both locales contain a question, four answer options and an explanation.
- Answer option order and the canonical correct-answer key are preserved.
- Spain and Peru variants are authored as separate locale records, not relabelled English strings.
- No question selector or region selector was expanded by this batch.
- Automated structural validation is not a substitute for native-speaker review or factual review.

## Editorial review register

| Review item | Status |
|---|---|
| Translation completeness / field structure | Implemented; automated validation pending |
| Answer-key alignment | Preserved by shared canonical key; automated validation pending |
| es-ES idiom and orthography | Native-speaker review pending |
| es-PE idiom and orthography | Native-speaker review pending |
| Factual source verification | Pending editorial sign-off |
| Selector exposure | Intentionally blocked until full-bank completion |

## Primary-source review targets

These are source targets for the editorial reviewer; listing them does not claim that independent review has already been completed.

- India / ISRO: https://www.isro.gov.in/
- India / Prime Minister of India: https://www.pmindia.gov.in/en/former_pm/
- Rajasthan tourism / Jaipur: https://www.tourism.rajasthan.gov.in/jaipur.html
- UNESCO World Heritage Centre / Lake Baikal: https://whc.unesco.org/en/list/754/
- US National Archives / Declaration of Independence: https://www.archives.gov/founding-docs/declaration-transcript
- NASA: https://www.nasa.gov/

Russia's capital, Tolstoy authorship, and the Tropic of Cancer state count require dedicated authoritative-source entries before final editorial acceptance.

## Next batch

Continue with the remaining 140 existing IDs, keeping the two Spanish variants independently written and reviewed. Do not enable either Spanish question locale until all 150 existing IDs have both Spanish variants and the complete Spain/Peru banks have all five locales.
