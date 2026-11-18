# Spanish question localization — batch 07

## Scope
- Adds independent es-ES and es-PE translations for ten existing stable question IDs.
- Adds 20 localized records; cumulative coverage is 70 IDs / 140 Spanish records across batches 01–07.
- Canonical IDs, region/category/difficulty metadata and correct-answer keys remain unchanged.
- The overlay loads after batches 01–06 and before application startup.
- Spanish question-language selectors remain hidden.

## Included stable IDs

| ID | Topic | Correct key |
|---|---|---:|
| IN-GEO-008 | Narmada River | c |
| IN-HIS-008 | Battle of Plassey | a |
| IN-SCI-008 | Meghnad Saha and ionisation equation | b |
| IN-CUL-008 | Purandara Dasa / Carnatic music | c |
| RU-GEO-008 | Kola Peninsula | a |
| RU-HIS-008 | Napoleon's 1812 invasion | b |
| RU-SCI-008 | Mikhail Lomonosov and conservation of mass | b |
| RU-CUL-008 | State Hermitage Museum | a |
| US-GEO-008 | Appalachian Mountains | b |
| US-HIS-008 | End of the American Civil War | d |

## Automated and editorial gates
The cumulative validator confirms both Spanish locales, exact fields, non-empty text, four distinct options, canonical answer keys and expected correct-answer text for all 70 IDs. It also verifies Spanish selectors remain unavailable and all seven overlay scripts load before app startup.

Structural automation does not certify historical interpretation, scientific nuance, factual accuracy or idiomatic quality. Native-speaker review and independent factual sign-off remain pending. These are carefully prepared translation drafts, not native-speaker-approved copy.

## Primary-source review targets
- Narmada River / Encyclopaedia Britannica: https://www.britannica.com/place/Narmada-River
- Battle of Plassey / Encyclopaedia Britannica: https://www.britannica.com/event/Battle-of-Plassey
- Meghnad Saha / Encyclopaedia Britannica: https://www.britannica.com/biography/Meghnad-Saha
- Carnatic music / Encyclopaedia Britannica: https://www.britannica.com/art/Carnatic-music
- Kola Peninsula / Encyclopaedia Britannica: https://www.britannica.com/place/Kola-Peninsula
- Napoleon's 1812 campaign / Encyclopaedia Britannica: https://www.britannica.com/event/Napoleonic-Wars
- Lomonosov / Encyclopaedia Britannica: https://www.britannica.com/biography/Mikhail-Vasilyevich-Lomonosov
- State Hermitage Museum: https://www.hermitagemuseum.org/
- Appalachian Mountains / US National Park Service: https://www.nps.gov/
- American Civil War / US National Archives: https://www.archives.gov/

## Release restrictions
- Do not expose Spanish question-language selectors before full-bank completion and editorial review.
- No Android build or APK generation in this batch.
- No signing or store submission.
