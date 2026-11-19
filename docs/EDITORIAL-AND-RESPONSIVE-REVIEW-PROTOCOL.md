# MindQuest editorial evidence, locale persistence and responsive regression protocol

## Editorial evidence register

The staged Spain and Peru question bank is not runtime-enabled. Each staged stable ID must have exactly one claim-level row across the five regional batch registers. Each row must identify the fact being tested and link at least one HTTPS institutional or primary reference.

The automated evidence audit verifies register completeness, ID matching, descriptive claim text, HTTPS links, duplicate/missing rows, the documented human-review gates, and continued exclusion of staged source files from the runtime HTML.

The audit does **not** fetch or assess source pages. It does not establish that a source supports a claim, that a question or answer key is factually correct, that distractors are unambiguous, or that any translation is idiomatic. Reviewers must open the source, verify the precise claim and answer key, inspect all distractors, and record human sign-off.

## Required human review

- Independent factual review against the cited primary or institutional source.
- Independent answer-key and distractor review.
- Native-speaker review for es-ES and es-PE.
- Editorial approval of terminology, spelling, locale conventions and explanation quality.
- Completion of the full 125-combination matrix (5 interface locales × 5 question-bank regions × 5 question locales) only after every region and question locale is eligible for release. The current runtime intentionally exposes only 3 regions and 3 question locales, yielding 45 supported combinations.

Automated structural checks must never be treated as substitutes for these approvals.

## Automated locale and preference regression

The locale-persistence browser gate exercises all 45 currently supported combinations of five interface locales, three playable regions and three playable question locales. It checks that the three choices remain independent, that the document language follows the interface locale, and that all three persisted values survive a full reload at each interface-locale checkpoint.

It additionally starts a live round for each of the nine currently playable region/question-language pairs and checks that the stable question ID belongs to the selected region and that question and answer text carry the selected question-language metadata. This is browser regression coverage, not native-speaker acceptance or factual verification.

## Responsive viewport regression

The browser regression matrix checks Home, Settings and Quiz at seven viewport profiles:

| Profile | CSS viewport |
|---|---:|
| Compact phone | 320 × 720 |
| Small phone | 360 × 800 |
| Modern phone | 390 × 844 |
| Large phone | 414 × 896 |
| Tablet portrait | 768 × 1024 |
| Tablet landscape | 1024 × 768 |
| Desktop | 1366 × 768 |

It checks horizontal document overflow, header brand/action overlap, Settings control bounds, Quiz content bounds and browser page errors. These Chromium viewport simulations are regression coverage, not physical-device certification. Android device validation and assistive-technology checks remain separate manual activities.

## Automated accessibility and gameplay integrity gates

The accessibility browser gate verifies launch-dialog focus isolation, destination-heading focus across Home/Settings/Help/Privacy/Accessibility views, accessible names on searchable settings, persisted large-text/reduced-motion/high-contrast preferences, keyboard theme operation, forced-colors availability and arrow-key answer navigation. It checks browser behaviour and DOM semantics; it does not emulate a full screen reader or certify assistive-technology interoperability.

The gameplay integrity gate completes a mixed-answer round using each question's canonical answer key, verifies the expected score against the answer ledger, checks unique stable IDs, prevents progression before an answer, confirms answer controls lock after selection, checks complete answer review, and verifies that replay and settings changes do not retain stale round state.

## Manual accessibility and device acceptance

Before release, record separate results for keyboard-only operation, visible focus, screen-reader/TalkBack announcements, text scaling at OS and app levels, high-contrast and forced-colors behaviour on target devices, reduced motion, portrait/landscape layout, airplane-mode gameplay, app restart and local-data recovery. Automated checks and viewport simulation do not establish WCAG conformance or physical-device acceptance.

## Release boundary

All Spain/Peru questions remain staged and excluded from runtime selectors and gameplay. No Android build, APK, signing, store submission, production deployment, or paid service is part of these checks.


## Theme and accessibility responsive matrix

The theme/accessibility regression cycles through all ten shipped themes (Obsidian, Midnight, Aurora, Deep Ocean, Forest, Ember, Royal, Rose Quartz, Desert Sand and Paper) at four Chromium viewport profiles: 320 × 720, 390 × 844, 768 × 1024 and 1366 × 768. It checks theme application, non-empty palette tokens, persisted theme selection, Home header geometry, accessibility-mode application, Quiz content bounds and preference persistence after reload. This is automated browser regression, not a colour-contrast measurement, native-device certification or WCAG conformance assessment.

Large text, reduced motion and high contrast are enabled together during the responsive Quiz check. The test does not assert that every possible combination of accessibility settings and all ten themes has passed independent human review.

## Best-score scope integrity

The score-scope regression seeds independent records and checks that best scores remain isolated by question region, category, difficulty and round length. It also verifies that question language remains independent of the score key and that the combined selected preferences survive reload. The automated test checks the current browser persistence implementation; it does not validate recovery from physical storage failure or establish native Android data migration.
