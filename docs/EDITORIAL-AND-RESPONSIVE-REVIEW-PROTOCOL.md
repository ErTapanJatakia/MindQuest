# MindQuest editorial evidence, locale persistence and responsive regression protocol

## Editorial evidence register

The 100 Spain and Peru questions are runtime-enabled through the guarded regional-bank activation script after all staged source bundles load. Each regional stable ID must have exactly one claim-level row across the five regional batch registers. Each row must identify the fact being tested and link at least one HTTPS institutional or primary reference.

The automated evidence audit verifies register completeness, ID matching, descriptive claim text, HTTPS links, duplicate/missing rows and the documented human-review gates. The runtime security and staged-content validators verify that all four regional source bundles are loaded before the guarded activation script. Activation checks the expected 150 canonical and 100 regional records, unique IDs and complete five-locale coverage before exposing 250 records to gameplay.

The audit does **not** fetch or assess source pages. It does not establish that a source supports a claim, that a question or answer key is factually correct, that distractors are unambiguous, or that any translation is idiomatic. Reviewers must open the source, verify the precise claim and answer key, inspect all distractors, and record human sign-off.


## Offline, question-cycle and release-readiness regression

- The browser offline-isolation gate exercises application startup, settings persistence and Spanish regional gameplay while aborting and recording any cross-origin request. A passing run must record zero external requests.
- The runtime bank integrity gate checks all 250 enabled stable IDs, 50 questions per region, category quotas (13 Geography, 12 History, 12 Science, 13 Culture), difficulty quotas (15 easy, 20 medium, 15 hard), all five locale records, non-empty explanations and four distinct answer options per locale.
- The question-cycle gate completes four 15-question rounds for each of the five regions. It requires no duplicate IDs within a round and coverage of all 50 IDs per region before verifying replay starts a fresh cycle. This is browser automation, not a statistical fairness proof for the random-number generator.
- Static offline security checks and browser request monitoring are complementary. They do not constitute a penetration test, network-layer packet capture, mobile-platform assessment or independent security certification.
- Android manifest checks are static configuration checks only. Android packaging, physical-device testing, TalkBack verification, signing and store submission remain separate release activities.

## Required human review

- Independent factual review against the cited primary or institutional source.
- Independent answer-key and distractor review.
- Native-speaker review for es-ES and es-PE.
- Editorial approval of terminology, spelling, locale conventions and explanation quality.
- Human factual, answer-key/distractor and native-speaker reviews are recorded complete per the project owner's confirmation in [REGIONAL-BANK-RELEASE-SIGNOFF.md](REGIONAL-BANK-RELEASE-SIGNOFF.md).
- The runtime release gate exercises all 125 combinations (5 interface locales × 5 question-bank regions × 5 question locales). The five-region runtime bank test additionally verifies the 250-ID total, 50 questions per region, category/difficulty quotas and complete five-locale answer/explanation content.

Automated structural checks must never be treated as substitutes for these approvals.

## Automated locale and preference regression

The locale-persistence browser gate exercises all 125 combinations of five interface locales, five playable regions and five playable question locales. It checks that the three choices remain independent, that the document language follows the interface locale, and that all three persisted values survive a full reload at each interface-locale checkpoint.

It additionally starts a live round for each of the 25 playable region/question-language pairs and checks that the stable question ID belongs to the selected region and that question and answer text carry the selected question-language metadata. This is browser regression coverage, not native-speaker acceptance or factual verification.

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

The 100 Spain/Peru questions are included in runtime through a guarded activation script that verifies the expected 150 canonical and 100 regional records, unique IDs and five-locale coverage before merging the arrays. The automated editorial evidence audit still does not independently validate source contents or human reviewer actions. No Android build, APK, signing, store submission, production deployment, or paid service is part of these checks.


## Theme and accessibility responsive matrix

The theme/accessibility regression cycles through all ten shipped themes (Obsidian, Midnight, Aurora, Deep Ocean, Forest, Ember, Royal, Rose Quartz, Desert Sand and Paper) at four Chromium viewport profiles: 320 × 720, 390 × 844, 768 × 1024 and 1366 × 768. It checks theme application, non-empty palette tokens, persisted theme selection, Home header geometry, accessibility-mode application, Quiz content bounds and preference persistence after reload. This is automated browser regression, not a colour-contrast measurement, native-device certification or WCAG conformance assessment.

Large text, reduced motion and high contrast are enabled together during the responsive Quiz check. The test does not assert that every possible combination of accessibility settings and all ten themes has passed independent human review.

## Best-score scope integrity

The score-scope regression seeds independent records and checks that best scores remain isolated by question region, category, difficulty and round length. It also verifies that question language remains independent of the score key and that the combined selected preferences survive reload. The automated test checks the current browser persistence implementation; it does not validate recovery from physical storage failure or establish native Android data migration.

\n\n## Application lifecycle and storage-reset regression\n\nThe lifecycle browser gate verifies that interface language, question region, question language, category, difficulty and round length survive reload independently, together with large-text and reduced-motion preferences. It reloads during a partially answered round and requires the app to recover to Home without restoring transient progress or persisting an incomplete best score. It also clears all site data and checks that supported defaults are restored and gameplay remains available. This browser test does not establish native Android process-death behaviour, OS backup/restore behaviour or device-specific WebView storage guarantees.

## Application lifecycle and storage-reset regression

The lifecycle browser gate verifies that interface language, question region, question language, category, difficulty and round length survive reload independently, together with large-text and reduced-motion preferences. It reloads during a partially answered round and requires the app to recover to Home without restoring transient progress or persisting an incomplete best score. It also clears all site data and checks that supported defaults are restored and gameplay remains available. This browser test does not establish native Android process-death behaviour, OS backup/restore behaviour or device-specific WebView storage guarantees.
