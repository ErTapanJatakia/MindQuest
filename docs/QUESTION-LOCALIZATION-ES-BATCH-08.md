# Spanish question localization — batch 08

## Scope
- Adds independent es-ES and es-PE drafts for ten existing stable question IDs (20 localized records).
- Cumulative Spanish coverage after batches 01–08: 80 IDs / 160 localized records.
- Canonical question IDs, region/category/difficulty metadata and correct-answer keys are unchanged.
- Overlay loads after batch 07 and before application startup; Spanish question selectors remain hidden.

## Included IDs
| ID | Topic | Correct key |
|---|---|---:|
| US-CUL-001 | New Orleans and jazz | d |
| US-SCI-002 | Perseverance rover / Mars | b |
| US-SCI-003 | Apollo 11 lunar landing | c |
| IN-CUL-003 | Konark Sun Temple / Surya | d |
| IN-SCI-003 | C. V. Raman / Nobel Prize in Physics | b |
| RU-HIS-003 | Founding of Saint Petersburg | a |
| RU-SCI-003 | Ivan Pavlov / digestive physiology | c |
| US-HIS-003 | Yellowstone National Park | d |
| US-SCI-004 | Wright brothers' powered flight | a |
| IN-GEO-005 | Kaziranga National Park / Assam | a |

## Quality gates and editorial status
The cumulative validator checks both Spanish locales, exact fields, non-empty text, four distinct options, canonical answer keys and expected correct-answer text for all 80 IDs. Structural checks do not certify historical/scientific interpretation, factual accuracy or idiomatic quality. Native-speaker review and independent factual sign-off remain pending.

## Primary-source review targets
- Jazz origins / Smithsonian National Museum of American History: https://americanhistory.si.edu/
- Perseverance mission / NASA: https://mars.nasa.gov/mars2020/
- Apollo 11 / NASA: https://www.nasa.gov/mission/apollo-11/
- Konark Sun Temple / Archaeological Survey of India: https://asi.nic.in/
- C. V. Raman / Nobel Prize: https://www.nobelprize.org/prizes/physics/1930/raman/facts/
- Saint Petersburg / Encyclopaedia Britannica: https://www.britannica.com/place/St-Petersburg-Russia
- Ivan Pavlov / Nobel Prize: https://www.nobelprize.org/prizes/medicine/1904/pavlov/facts/
- Yellowstone / US National Park Service: https://www.nps.gov/yell/
- Wright brothers / US National Park Service: https://www.nps.gov/wrbr/
- Kaziranga / UNESCO World Heritage Centre: https://whc.unesco.org/en/list/337/

## Release restrictions
- Do not expose Spanish question-language selectors before the full-bank completion and editorial review gates pass.
- No Android build/APK generation, signing or store submission in this batch.
