# Spanish question localization — batch 06

## Scope
- Adds `es-ES` and `es-PE` translations for ten existing stable question IDs.
- Adds 20 localized records; cumulative coverage is 60 IDs / 120 Spanish records across batches 01–06.
- Canonical IDs, region/category/difficulty metadata and correct-answer keys remain unchanged.
- The overlay loads after batches 01–05 and before application startup.
- Spanish question-language selectors remain hidden.

## Included stable IDs

| ID | Topic | Correct key |
|---|---|---:|
| RU-GEO-006 | Sochi and the Black Sea | a |
| RU-GEO-007 | Mount Elbrus / Caucasus | d |
| RU-HIS-006 | End of the Siege of Leningrad | a |
| RU-SCI-006 | Salyut 1 | c |
| RU-CUL-006 | Bolshoi Theatre | b |
| US-GEO-006 | Rio Grande / Texas–Mexico border | a |
| US-GEO-007 | Grand Canyon / Arizona | c |
| US-HIS-006 | Nineteenth Amendment | d |
| US-SCI-006 | Alan Shepard / Freedom 7 | b |
| US-CUL-006 | Maya Lin / Vietnam Veterans Memorial | c |

## Automated and editorial gates
The cumulative validator must confirm both Spanish locales, exact fields, non-empty text, four distinct options, canonical answer keys and expected correct-answer text for all 60 IDs. It also verifies Spanish selectors remain unavailable and all six overlay scripts load before app startup.

Structural automation does not certify historical interpretation, factual accuracy or idiomatic quality. Native-speaker review and independent factual sign-off remain pending. The Spanish records are carefully prepared drafts, not native-speaker-approved copy.

## Primary-source review targets
- Sochi / Encyclopaedia Britannica: https://www.britannica.com/place/Sochi-Russia
- Mount Elbrus / Encyclopaedia Britannica: https://www.britannica.com/place/Mount-Elbrus
- Siege of Leningrad / Encyclopaedia Britannica: https://www.britannica.com/event/Siege-of-Leningrad
- Salyut 1 / NASA: https://www.nasa.gov/
- Bolshoi Theatre: https://www.bolshoi.ru/en/
- Rio Grande / US International Boundary and Water Commission: https://www.ibwc.gov/
- Grand Canyon / US National Park Service: https://www.nps.gov/grca/
- Nineteenth Amendment / US National Archives: https://www.archives.gov/milestone-documents/19th-amendment
- Alan Shepard / NASA: https://www.nasa.gov/people/alan-b-shepard-jr/
- Vietnam Veterans Memorial / US National Park Service: https://www.nps.gov/vive/

## Release restrictions
- Do not expose Spanish question-language selectors before full-bank completion and editorial review.
- No Android build or APK generation in this batch.
- No signing or store submission.
