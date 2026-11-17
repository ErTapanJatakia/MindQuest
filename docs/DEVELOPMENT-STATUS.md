# Development status

Last updated: 2026-11-18

## Current phase

**Phase 1 — foundation and playable web vertical slice; content volume is complete and source-quality review is underway.**

Repository: [ErTapanJatakia/MindQuest](https://github.com/ErTapanJatakia/MindQuest), default branch `main`.

### Delivered to the repository

- Project README, product boundaries and release principles.
- Architecture decisions for offline operation, independent localization, question identity and Android packaging.
- Roadmap covering 18 workstreams with a 2,400-minute / 40-hour planning baseline.
- Responsive home, quiz, results, settings and localized help views.
- Independent interface locale, question region and question locale settings.
- Device-locale suggestion for the interface only; it does not change question region or question language.
- Category filter: All categories, Geography, History, Science and Culture.
- Difficulty filter: Any difficulty, Easy, Medium and Hard.
- Category and difficulty preferences persist locally and are applied together with region and question-language filters when a round starts.
- Question bank expanded to **150 question IDs**, with 50 per region and all 3 language variants (450 localized question records).
- Current difficulty spread in each region: 15 easy, 20 medium and 15 hard questions.
- Answer feedback, scoring, replay and local best-score persistence.
- Results now display percentage accuracy and a per-question answer review with the player's answer, correct answer and explanation; the review is built with DOM text nodes rather than injecting question content as HTML.
- A localized help guide explains round flow, scoring, filters, independent language/region settings and offline/privacy principles.
- Accessible view-focus management when navigating between home, quiz, results and settings; quiz progression now transfers focus to the next action after answering and to the new question heading on progression.
- Quiz progress exposes progress-bar semantics and a localized accessible label/value; result updates use a polite live region.
- Fair Fisher–Yates question shuffle and defensive handling of malformed persisted settings.
- Best scores are stored independently by question region, category and difficulty; comparisons use percentages and retain the round denominator. The home card displays score, accuracy percentage and the active pool scope.
- Localised region, language, category and difficulty selector labels.
- Initial English (India) / English (US) copy differentiation, including regional spelling (PERSONALISE / PERSONALIZE) and independently worded settings guidance.
- Localized accessible names for the settings control and home brand link, plus localized answer-group labels in all three interface locales.
- Corrected the quiz eyebrow from a misleading fixed “ROUND 1” to a neutral localized “ROUND” label; the final-question action now uses a localized results label.
- Dependency-free question-bank structural validator, including exact locale coverage, region-matching IDs, supported category/difficulty values, exact option keys, duplicate-option checks, duplicate question-text detection, strict text types and exact regional/total counts.
- Initial Android WebView shell with restrictive navigation / network configuration.

### Current implementation limits

- The question bank contains the full **150-question target**: 50 India, 50 Russia and 50 United States.
- Each question has 3 locale variants: all 450 localized records are present.
- The content is an initial development seed. It needs factual review and native-speaker review, particularly Russian phrasing and cultural context.
- Existing best-score records from the earlier global-score format are not migrated; new scores are tracked by region/category/difficulty. This avoids mixing unlike question pools.
- Difficulty balance is only a starter distribution; the full bank needs a deliberate progression and quality review.
- Interface localization now has initial English (India) / English (US) copy differentiation, localized settings/home accessible names, and localized answer-group labels. A targeted pass corrected a malformed JavaScript newline sequence and improved static quiz/progress accessibility defaults; a complete audit of every visible and assistive-technology string, plus full accessibility review and final visual polish, remains outstanding.
- Android Gradle wrapper has not been added; the Android shell has not been compiled or tested on physical devices.
- No APK or AAB has been produced. This is **not a release candidate**.

## Validation status

- No GitHub Actions workflows have been introduced for this development work.
- CI and Android validation remain deliberately deferred until feature development and source review are complete.
- No CI run has been started.
- The structural validator now requires all four categories in each regional bank, exactly 50 questions per region / 150 total, strict non-empty text values, exact option keys, unique options and no duplicate question text within a region/locale; the official validator has **not yet been executed**.
- Previous static review checked the current 150-question bank for unique IDs, regional assignment, all three locales, option keys and category coverage, all referenced JavaScript element IDs present in the HTML, and category/difficulty filters connected to question selection. The strengthened validator is a separate executable check and has not been run.
- Latest question-bank expansion added fifteen questions (five per region), with all three translations. Static structural checks passed for 150 unique IDs, regional assignment, translation completeness, option integrity, category coverage and difficulty distribution. The official validator, CI, Android build and device validation remain deferred.
- No physical-device, offline-runtime or Android build validation is claimed.

## Latest completed batch

- Improved keyboard continuity during quiz progression: after a player selects an answer, focus moves from the now-disabled answer buttons to the enabled Next / See results action. When the next question renders, focus moves to its question heading so keyboard and screen-reader users are oriented to the new content.
- Reviewed the Android Gradle Kotlin DSL configuration. Plugin versions are pinned (Android Gradle Plugin 8.7.3 and Kotlin 2.0.21), repositories are centrally declared, the app targets SDK 35 with min SDK 23, and Java/Kotlin targets are 17. The Android Gradle wrapper is still absent; no Gradle build was attempted.
- No JavaScript parser, browser runtime, validator, CI, Android build or device test was run in this batch.


- Completed another targeted localization/accessibility source pass. Corrected a malformed literal newline sequence in `app/src/app.js` that had been introduced during the previous localization edit; the three accessible-label assignments are now separate JavaScript statements. This was identified by direct source inspection, not by running a JavaScript parser.
- Updated the static HTML defaults for the quiz round/category labels and added explicit accessible progress-bar minimum/maximum values and a default accessible label.
- Re-verified all three UI locale dictionaries contain accessible labels for the answer group, Settings control and home link. Confirmed the HTML loads the question bank before the application script and the UI-polish script afterward.
- Android source review reconfirmed that the shell has no declared network permission, cleartext traffic is disabled, WebView content access and file-to-file/universal access are disabled, mixed content is blocked, and top-level external navigation is rejected. This is a source-level observation only; no Android security test or build was run.
- No JavaScript parser, browser runtime, official content validator, CI, Android build or physical-device test was run in this batch.


- Improved interface localization: English (India) and English (US) now use distinct regional wording/spelling and independently phrased settings guidance; Russian remains separately localized.
- Localized accessible names for the Settings control, home brand link and answer-option group across all three interface locales.
- Corrected the static quiz round label so it no longer implies that every question is Round 1; localized the final-question action (“See results” / “К результатам”).
- This was a source change only. No validator, browser test, CI, Android build or device test was run.



- Reviewed the gameplay/persistence path and hardened saved best-score parsing: only integer scores from 0 through the recorded total, with a valid round total of 1–10, are accepted. Invalid or stale/corrupt records are ignored instead of being rendered or used in percentage comparisons.
- Strengthened the question-bank validator to reject malformed question/translation/option types, duplicate normalized question text per region and locale, unexpected total counts, and regional banks that do not contain exactly 50 questions. Whitespace normalization is applied before duplicate-text and duplicate-option comparisons. The validator remains unexecuted pending the agreed QA phase.
- Source review covered the question validator, gameplay flow, result review, settings persistence, HTML view structure, responsive CSS and Android WebView configuration. This was a targeted review, not a complete line-by-line audit; full localization, accessibility and Android build reviews remain open.



- Expanded the question bank from 135 to **150 stable IDs** (50 per region), adding fifteen questions with all three translations. New topics include the Palk Strait, Chandragupta Maurya, M. S. Swaminathan, the veena and Yakshagana (India); the Sea of Okhotsk, Battle of Borodino, Mir space station, balalaika and Anton Chekhov's plays (Russia); and the Mojave Desert, the Civil Rights Act of 1964, the James Webb Space Telescope, Grant Wood's *American Gothic* and William Faulkner's Yoknapatawpha County (United States). Each region now has 13 Geography, 12 History, 12 Science and 13 Culture questions; difficulty distribution is 15 easy, 20 medium and 15 hard per region. The bank now contains 450 localized records. Static in-memory syntax and structural checks passed for all 150 unique IDs, three locale variants per question, non-empty question/explanation text, four distinct options, valid answer keys, supported metadata, category coverage and balanced difficulty distribution. The official validator, CI, Android build and device validation remain deferred.

- Expanded the question bank from 120 to **135 stable IDs** (45 per region), adding fifteen questions with all three translations. New topics include Loktak Lake, Nanda Devi, the 1857 uprising at Meerut, Mangalyaan and Bihu (India); Lake Ladoga, the Valley of Geysers, the October Manifesto, Sputnik 2 and matryoshka dolls (Russia); and the Everglades, Mount Elbert, the Emancipation Proclamation, Explorer 1 and Delta blues (United States). Each region now has 12 Geography and 11 each in History, Science and Culture. Difficulty distribution is 13 easy, 18 medium and 14 hard per region. The 135-question source passed in-memory syntax and structural checks; the official validator, CI and Android validation remain deferred. New topics include the Brahmaputra, the First Battle of Panipat, Pokhran-I, Sangam literature and Kuchipudi (India); the Yenisei, Battle of Kulikovo, Alexei Leonov, Fabergé eggs and the Tretyakov Gallery (Russia); and the Mississippi, Seneca Falls Convention, Sally Ride, the Harlem Renaissance and hip-hop (United States). Each region now has exactly ten questions in each of the four categories. Difficulty distribution is 12 easy, 16 medium and 12 hard per region. The 120-question source passed in-memory syntax and structural checks; the official validator, CI and Android validation remain deferred.

- Expanded the question bank from 75 to 90 stable IDs (30 per region), adding fifteen questions with all three translations. New material covers the Narmada River, Quit India Movement, Battle of Plassey, Satyendra Nath Bose and Sattriya (India); the Kola Peninsula, October Revolution, Napoleon's 1812 invasion, Konstantin Tsiolkovsky and Kazimir Malevich (Russia); and the Appalachian Mountains, the 19th Amendment, the end of the Civil War, Jonas Salk and Abstract Expressionism (United States). Each region now has eight Geography, eight History, seven Science and seven Culture questions. The difficulty distribution is eleven easy, fourteen medium and ten hard per region.

- Refined the home-screen best-score card to show score, percentage accuracy and the active region/category/difficulty scope; the scope is localized using the current interface language.

- Added a five-topic help guide in English (India), English (US) and Russian, reachable from both the home and settings views. Back navigation returns to the originating view.

- Fixed category and difficulty translation dictionary placement so the game resolves labels from the active interface language.
- Added a recovery path when filters produce no questions: the replay action is hidden, the settings action is offered, and saving revised filters returns to the home screen.
- Segmented best-score persistence by region, category and difficulty, with defensive parsing of saved records.
- Settings saves now return to home so changed locale/filter preferences cannot leave an active round displaying stale question content.
- Added keyboard/screen-reader focus movement to each view heading, accessible progress-bar state and localized progress announcements.
- Added six regional questions: one easy and one medium question for each region.
- Implemented results accuracy percentage and a localized per-question review of selected answer, correct answer and explanation; cleared stale review content for empty question selections.
- Expanded the bank to 105 stable question IDs / 315 localized records; each region has nine Geography, nine History, nine Science and eight Culture questions (previous batch).
- Retained the three existing independent selectors and filter preferences.
- Strengthened the question-bank validator to enforce the supported category list, supported difficulty values and exact answer-option key set.
- Updated the roadmap and this status record to reflect 105 questions, category coverage and the current difficulty spread.

## Remaining development priorities

1. Continue source review of gameplay and persistence edge cases, including score history, result navigation and review-state cleanup; the saved-score parser hardening is complete.
2. Complete factual, cultural and native-speaker review of all 150 questions, especially Russian phrasing and translation alignment.
3. Complete the interface localization audit; initial English (India) / English (US) wording and accessibility-label differentiation is implemented. A malformed source escape was corrected, but parser/runtime validation remains pending.
4. Continue accessibility review and final visual refinement; keyboard focus now follows answer → next action → next question heading.
5. Finish and review the Android wrapper, Gradle wrapper and release configuration.
6. Conduct manual source, offline and Android device QA.
7. Only after feature development and source review, enable and run final CI / Android validation.
8. Prepare RuStore and GitHub APK release materials after a successful signed build.


## Latest development batch — progress announcements and narrow-screen resilience

- Added a polite, atomic live announcement to the quiz question counter so assistive technology can announce progression as the player advances. The existing progress bar retains its numeric percentage semantics and localized accessible label.
- Added narrow-screen layout safeguards for very small devices: flexible footer wrapping, minimum-width protection for key containers and controls, long localized text wrapping, and a compact layout treatment at viewport widths of 340px and below.
- Ran a source-level localization coverage scan: every HTML `data-i18n` key is present in each of the three interface dictionaries. This checks key coverage only; it does not validate translation quality or runtime behavior.
- No JavaScript parser, browser runtime, official question-bank validator, CI, Android build or physical-device test was run. The responsive and assistive-technology changes still require runtime verification.


## Latest source review — live-region semantics and localization coverage

- Made quiz feedback and final result announcements explicitly atomic polite live regions, so assistive technology can announce each complete updated message rather than an isolated changed fragment.
- Ran a source-level dictionary coverage scan for every statically referenced runtime translation key and every HTML `data-i18n` / `data-i18n-aria-label` key. All scanned keys are present in all three interface dictionaries.
- Reviewed the Android Activity's local asset loading and navigation restrictions, manifest permissions, and Gradle asset source mapping. This was source inspection only; it does not establish build success or runtime security.
- No official content validator, JavaScript parser, browser runtime, CI, Android build or device test was run.


## Latest selector-label consistency refinement — 2026-11-17

- Standardized the Russian-language option label to “Russian” in the English (India) interface, matching the English (US) interface. Russian interface labels remain native-language labels.
- Reviewed the settings-selector refresh sequence: interface-language changes refresh the region, question-language and interface-language option labels immediately; saving settings refreshes labels again after the application persists and applies the selected interface locale.
- Re-reviewed gameplay state transitions for this pass: answer selection is guarded against duplicate scoring, answer history is indexed by round position, empty-filter recovery clears stale review content, replay starts a fresh round, and settings saves return to home to avoid stale question content. These are source-inspection findings, not runtime test results.
- No JavaScript parser, browser runtime, content validator, CI, Android build or device test was run. All remain pending the agreed development freeze and QA sequence.


## Latest question-bank validator strengthening — 2026-11-17

- Strengthened the dependency-free validator to reject array-shaped translation containers and to validate each question's shared correct-answer key once at question level.
- Added exact per-region distribution assertions: 13 Geography, 12 History, 12 Science, 13 Culture; and 15 easy, 20 medium, 15 hard. The validator now checks these targets rather than merely reporting difficulty counts or checking that each category appears.
- Reviewed the existing palette contrast ratios at source level: primary text, muted text, accent, warning and feedback colors exceed WCAG AA normal-text contrast against the main background and primary panel in the checked combinations. This calculation does not replace full UI-state/contrast testing.
- The validator source was updated but deliberately not executed; no parser, browser runtime, CI, Android build or device test was run. Content accuracy and native-speaker review remain separate requirements.


## Latest validator schema-integrity refinement — 2026-11-17

- Tightened the question-bank validator to require exact top-level question fields and exact translation-object fields, preventing unreviewed schema drift.
- Added clean-text checks for question prompts, explanations and answer options; empty values and ASCII control characters are now rejected.
- Kept the existing exact locale, option-key, question-count, category and difficulty distribution assertions.
- Re-fetched the committed validator source and confirmed the strict-field and text checks are present. The official validator was deliberately not executed, in accordance with the development-freeze QA sequence.
- No browser runtime, CI, Android build or device test was run. Translation meaning, factual accuracy and cross-language answer identity still require human review.


## Latest gameplay accessibility refinement — 2026-11-17

- Incorrect-answer feedback now explicitly includes the correct answer text before the explanation. The existing polite, atomic live region therefore communicates the correction without relying on colour-only highlighting or requiring the player to reach the results review.
- The correction label is sourced from the active interface dictionary, while the answer text and explanation use the independently selected question locale. This preserves all supported interface/region/question-language combinations.
- Source change committed and subsequently re-fetched. No parser, browser runtime, accessibility-tree inspection, screen-reader test, official content validator, CI, Android build or device test was run.


## Latest settings-state validation refinement — 2026-11-17

- Extracted a shared settings normalizer and applied it both when loading persisted preferences and immediately before saving values from the settings controls.
- Unsupported interface locales, question locales, regions, categories or difficulty values now fall back to the documented defaults at both boundaries, rather than relying only on startup validation.
- This hardens the independent-selector model against malformed or unexpected values without changing normal user selections or the persisted settings schema.
- Source change committed and re-fetched. No JavaScript parser, browser runtime, official content validator, CI, Android build or device test was run.


## Latest content and documentation consistency pass — 2026-11-17

- Corrected the question-bank source header: the repository now contains 150 stable question IDs (50 per region) with three localized variants each; factual, cultural and native-speaker review remains outstanding.
- Updated the README to report the delivered 150-question / 450-localized-record content set and distinguish structural implementation from pending content-quality review.
- Updated the repository layout description to reflect that the initial Android WebView shell exists, while Android packaging/build validation remains pending.
- Corrected the architecture description to include category as a runtime question filter alongside region and difficulty.
- Documentation/source consistency pass only. No parser, official content validator, browser runtime, CI, Android build or device test was run.


## Latest best-score comparison refinement — 2026-11-17

- Best-score comparisons now use integer cross-multiplication rather than floating-point division, avoiding precision-dependent percentage comparisons.
- When two results have exactly equal accuracy, the result completed across more questions is now retained as the stronger record. Lower accuracy never replaces a higher-accuracy record.
- Existing best-score storage format and region/category/difficulty scoping are unchanged.
- Source change committed and re-fetched. No JavaScript parser, browser runtime, content validator, CI, Android build or device test was run.


## Latest runtime question-record guard — 2026-11-17

- Added a runtime playability check before a question can enter a round. It verifies the record shape, active region, supported category and difficulty, correct-answer key, selected-language translation, non-empty question/explanation text, and four non-empty answer options.
- The question-bank collection itself is checked to be an array before filtering, preventing malformed top-level data or null records from causing a gameplay exception.
- This is a defensive runtime boundary, not a replacement for the strict content validator; invalid records are excluded from play and the official validator remains a separate release gate.
- Source change committed and re-fetched. No JavaScript parser, browser runtime, official content validator, CI, Android build or device test was run.


## Baseline progress accounting — 2026-11-17

- **330 / 2,400 baseline minutes (13.75%)** are currently represented by workstreams whose implementation has reached Review: question-bank architecture (150 min) and question content population (180 min).
- This is roadmap-estimate-weighted implementation progress, not actual engineer time spent. Actual engineering minutes have not been recorded, so an actual-time-completed figure cannot be stated.
- No workstream is yet marked Complete; both Review workstreams still require acceptance. The remaining baseline scope is 2,070 minutes (86.25%), subject to the existing workstream statuses and release gates.
- Progress reporting will distinguish implementation estimate, accepted scope, and actual time logged.


## Latest answer-group context refinement — 2026-11-17

- The multiple-choice answer group now exposes the current question prompt as its accessible description while retaining its localized “Answer options” accessible name. This gives assistive-technology users the question context when entering the answer controls.
- The change is source-level only. Keyboard, accessibility-tree and screen-reader behavior still require runtime verification; no parser, browser runtime, official validator, CI, Android build or device test was run.
- Baseline implementation accounting remains 330 / 2,400 minutes (13.75%) estimate-weighted; this small accessibility refinement does not reclassify a full roadmap workstream or count as logged engineering time.


## Latest HTML-to-gameplay source consistency review — 2026-11-17

- Cross-checked every static element ID referenced by the gameplay script against the HTML document: all 32 unique JavaScript ID selectors resolve to an existing element.
- Checked the HTML document for duplicate IDs: none were found across its 40 identified elements.
- Checked all static HTML translation and accessible-label keys against the English (India) UI dictionary: all 43 distinct keys are present. Prior three-locale dictionary coverage remains a source-level check, not a translation-quality assessment.
- This was a source consistency inspection only. No JavaScript parser, browser runtime, accessibility tree, official question-bank validator, CI, Android build or physical-device test was run. CI and Android validation remain deferred until the development batch is complete.
- No roadmap workstream was reclassified; estimate-weighted implementation remains 330 / 2,400 baseline minutes (13.75%). Actual engineering time remains untracked.


## Latest factual question-bank review — 2026-11-18

- Corrected the Baisakhi explanation for question `IN-CUL-002` in both English variants and Russian. The previous wording incorrectly called Baisakhi the Sikh New Year under the Nanakshahi calendar. The revised wording accurately describes its spring-harvest association in Punjab and its significance commemorating the founding of the Khalsa by Guru Gobind Singh in 1699.
- Reference checks: [World Sikh Organization of Canada — Vaisakhi FAQ](https://assets.nationbuilder.com/worldsikh/pages/5435/attachments/original/1775773649/Upload_Vaisakhi___Sikh_Heritage_Month_Resource_Guide.pdf?1775773649=), which distinguishes the harvest festival, the 1699 Khalsa founding and the Nanakshahi New Year; and [U.S. Office of Personnel Management — Significant Days for Sikhs](https://www.reginfo.gov/public/do/eoDownloadDocument?documentID=219143&eodoc=true), which describes Vaisakhi as a Punjab spring-harvest occasion and the 1699 formalization of the Khalsa.
- Stable question ID, category, difficulty, answer key and option identities were preserved. No new question records were added or removed.
- This is a targeted factual correction, not a full factual or native-speaker audit. No official question-bank validator, browser runtime, CI, Android build or physical-device test was run.
- No workstream was reclassified; estimate-weighted implementation remains 330 / 2,400 baseline minutes (13.75%). Actual engineering time remains untracked.


## Latest question-bank diversity review — 2026-11-18

- Replaced the repeated U.S. Declaration of Independence date question in `US-HIS-004` with a distinct question about the Gettysburg Address, delivered by Abraham Lincoln at the dedication of the Soldiers' National Cemetery in Gettysburg on 19 November 1863.
- Kept the stable question ID, region, category, difficulty and correct-answer key (`a`). All three locale variants now use the same answer identity, with localized wording and explanations.
- Reference: [U.S. Library of Congress — Gettysburg Address: Primary Documents in American History](https://guides.loc.gov/gettysburg-address), which records the delivery date and dedication context.
- This targeted correction improves topic diversity; it is not a full factual or native-speaker review. No official content validator, browser/runtime, CI, Android build or physical-device test was run.
- No roadmap workstream was reclassified; estimate-weighted implementation remains 330 / 2,400 baseline minutes (13.75%). Actual engineering time remains untracked.


## Latest U.S. history duplication and context review — 2026-11-18

- Replaced the second Louisiana Purchase question (`US-HIS-006`), which duplicated the topic already covered by `US-HIS-002`, with a question about the Nineteenth Amendment's ratification on 18 August 1920.
- Preserved the stable ID, region, category, difficulty and correct-answer key (`d`). All three language variants identify the Nineteenth Amendment as the correct answer.
- Added historical context to the explanations: although the amendment prohibited denying or abridging voting rights on account of sex, discriminatory laws continued to disenfranchise many women, particularly women of colour.
- Reference: [U.S. National Archives — 19th Amendment to the U.S. Constitution: Women's Right to Vote](https://www.archives.gov/milestone-documents/19th-amendment), including the ratification date and the continuing limits on full enfranchisement.
- This is a targeted duplicate-removal and context correction, not full factual or native-speaker certification. No official content validator, browser/runtime, CI, Android build or physical-device test was run.
- No roadmap workstream was reclassified; estimate-weighted implementation remains 330 / 2,400 baseline minutes (13.75%). Actual engineering time remains untracked.


## Latest U.S. history duplication and rights-context review — 2026-11-18

- A source-level scan of the twelve U.S. history records found that `US-HIS-006` and `US-HIS-007` both tested the Nineteenth Amendment. Replaced `US-HIS-007` with a question about the Fifteenth Amendment, ratified on 3 February 1870.
- Preserved the stable ID, region, History category, hard difficulty and correct-answer key `a`; all three locale variants now identify the Fifteenth Amendment as the same correct answer.
- Explanations distinguish the amendment's legal prohibition from historical reality: discriminatory practices continued to obstruct many Black Americans' access to voting. Reference: U.S. National Archives, https://www.archives.gov/milestone-documents/15th-amendment.
- This is a targeted factual and duplication correction, not full content certification. The official validator, browser/runtime, CI, Android build and device QA were not run. CI and Android validation remain deferred.
- Baseline implementation remains 330 / 2,400 minutes (13.75%); this targeted correction does not reclassify a roadmap workstream.


## Latest mixed-language accessibility refinement — 2026-11-18

- Gameplay questions, answer-option text, answer feedback and answer-review content can use the independently selected question language while the interface and its labels use a different language. Added explicit `lang` attributes to the relevant question-language passages and kept interface-language labels marked separately.
- In incorrect-answer feedback, the interface-language correction label is now separate from the question-language correct answer and explanation. In the results review, question text, selected/correct option text and explanations are marked with the question language, while labels and status text retain the interface language.
- This addresses the source-level language-identification gap for mixed-language gameplay content. WCAG 2.2 SC 3.1.2 requires the language of passages to be programmatically determinable; see https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.
- Source change committed and re-fetched. No browser runtime, assistive-technology test, official content validator, CI, Android build or device QA was run. This does not establish WCAG conformance; runtime and screen-reader verification remain required.
- Baseline implementation remains 330 / 2,400 minutes (13.75%); this targeted refinement does not reclassify a roadmap workstream.


## Latest local-persistence failure handling — 2026-11-18

- Changed the storage adapter to report whether a write succeeded instead of silently swallowing write failures. Settings and best-score writes remain best-effort; gameplay continues if browser storage is blocked or unavailable.
- Added a localized, polite status message on the home screen when a settings or best-score write fails. The notice explains that settings and best scores may not be saved; it does not imply that gameplay or question content needs network access.
- Updated the Help copy in English (India), English (US) and Russian to qualify local persistence on browser storage being available. This avoids promising persistence in restricted/private browsing contexts or when quota/access errors prevent writes.
- Technical basis: MDN documents that localStorage availability must be tested in the active browsing context and that Storage.setItem can throw, including QuotaExceededError: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API and https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem.
- Source changes committed and re-fetched for verification. No browser runtime, storage-denial simulation, content validator, CI, Android build or device QA was run. Runtime verification remains pending.
- No roadmap workstream was reclassified; estimate-weighted implementation remains 330 / 2,400 baseline minutes (13.75%). Actual engineering time remains untracked.


## Latest round-state integrity review — 2026-11-18

- Empty question-pool recovery now clears the prior round, question index, score, answer flag and answer history, and keeps the Next/Results action disabled. This prevents stale gameplay state from surviving when a newly selected filter combination has no playable questions.
- Results rendering now has a defensive completion guard: a non-empty round must be at its final question, the final question must be answered, and every round position must have a recorded answer before scoring/review/best-score persistence can proceed.
- This is a source-level state-integrity refinement. No browser runtime, unit test, official content validator, CI, Android build or device QA was run. CI and Android validation remain deferred.
- No roadmap workstream was reclassified. Estimate-weighted implementation remains 330 / 2,400 baseline minutes (13.75%); actual engineering time remains untracked.


## Baseline implementation reconciliation — 2026-11-18

- Reconciled all 18 original roadmap workstreams into evidence-backed implementation allocations without changing the original 2,400-minute / 40-hour baseline.
- **Earned implementation scope is 1,265 / 2,400 minutes (52.71%)**; remaining baseline scope is 1,135 minutes (47.29%).
- The previous 330-minute / 13.75% report counted only the two fully implemented workstreams and omitted partial deliverables in other workstreams. It is superseded by the deliverable-based ledger in [BASELINE-RECONCILIATION.md](BASELINE-RECONCILIATION.md).
- The 1,265 minutes are estimate-weighted implemented scope, not actual labour hours. Actual engineering time remains untracked.
- No workstream has been marked Complete. Question-bank architecture and content remain in Review; partial workstreams remain In progress. Formal acceptance and validation are separate from implementation credit.
- No application code was changed in this reconciliation. No browser runtime, official content validator, CI, Android build, emulator, physical-device, screen-reader or RuStore validation was run. CI and Android validation remain deferred until the agreed development freeze.


## Latest local-storage read-failure handling — 2026-11-18

- The storage adapter now distinguishes a successful read of a missing key from an exception while accessing local storage.
- Settings-load failures and best-score-read failures now set the existing localized storage warning. A normal missing key remains a normal first-run condition; inaccessible storage no longer masquerades as an empty record.
- Gameplay continues with normalized defaults or without a displayed best score when storage cannot be read. This complements the existing write-failure warning.
- Source change committed and re-fetched. No browser runtime, denied-storage simulation, official content validator, CI, Android build or device QA was run. Runtime verification remains pending.
- No roadmap estimate or earned implementation allocation changed; baseline remains 1,265 / 2,400 minutes (52.71%). Actual engineering time remains untracked.


## Latest gameplay navigation and round teardown refinement — 2026-11-18

- Added a shared round-discard routine that clears active questions, score, answer history, feedback, progress state, answer controls and prior answer-review content.
- Empty-pool recovery, deliberate Home navigation, the brand-home link and saving changed settings now use the shared teardown. Help navigation and returning from Settings without saving continue to preserve the in-progress round.
- Added stale-answer protection: a callback must still refer to the active question and active question-language translation. Advancing requires a non-empty round, a completed current answer and a recorded answer-history entry for that index.
- Post-commit source re-fetch confirmed all seven targeted source checks: shared teardown exists; empty-pool branch uses it; Home navigation clears the round; settings save clears before returning home; stale item/translation callbacks are rejected; Next requires a recorded answer; and review content is cleared.
- This is source inspection, not runtime verification. No browser test, automated test, official content validator, CI, Android build, emulator, physical-device or screen-reader test was run. CI and Android validation remain deferred until the agreed development freeze.
- No roadmap estimate or earned allocation changed. Baseline implementation remains 1,265 / 2,400 minutes (52.71%); remaining baseline scope remains 1,135 minutes (47.29%). Actual engineering time remains untracked.


## Latest defensive question-render recovery — 2026-11-18

- Consolidated the empty-question recovery UI into one shared function, used by both round startup and question rendering.
- Added a pre-render guard for round type, non-empty content, integer/in-range question index and the existing playable-question integrity contract. If the active question becomes invalid after selection, the app now clears the stale round and routes to the localized Settings recovery view rather than dereferencing invalid translation data.
- Post-commit re-fetch confirmed six targeted source checks: shared recovery exists; empty-pool startup uses it; render checks the round array; render checks index bounds; render revalidates the active question; and recovery discards stale round state.
- This is source-level verification only. No browser runtime, automated test, official content validator, CI, Android build, emulator, physical-device or screen-reader test was run. CI and Android validation remain deferred until the agreed development freeze.
- Technical reference: MDN, [Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) and [Number.isInteger()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger).
- No workstream estimate or earned allocation changed. Baseline implementation remains 1,265 / 2,400 minutes (52.71%); remaining baseline scope remains 1,135 minutes (47.29%). Actual engineering time remains untracked.


## Latest answer-ledger integrity review — 2026-11-18

- Added a dedicated complete-round integrity gate before results rendering, answer review and best-score persistence.
- The gate validates the round and answer-history lengths; rechecks every question; validates selected and correct answer keys; compares the captured answer options and explanation with the active localized question; verifies each correctness flag; and recomputes the total score from recorded answers.
- A round with missing, stale or inconsistent answer data is rejected before result or persistence side effects.
- Post-commit source re-fetch confirmed ten targeted checks covering the validator, each integrity condition, score recomputation and the ordering of the guard before answer review.
- Source-level verification only. No browser runtime, automated test, official question-bank validator, CI, Android build, emulator, physical-device or screen-reader test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%) with 1,135 minutes remaining (47.29%); no earned allocation changed. Actual engineering time remains untracked.


## Latest invalid-round recovery UX refinement — 2026-11-18

- Generalized the shared recovery screen to support a distinct localized integrity-error message in addition to the existing empty-question-selection guidance.
- When the completed answer ledger fails validation, the app now discards the invalid round and shows a clear Settings recovery path instead of returning silently and leaving the player on a non-progressing final-question screen.
- Added the new recovery title and guidance in all three interface locales. The recovery message is marked with the selected interface language; question language and region settings remain independent.
- A source consistency check initially detected one stale call to the previous recovery-function name. That call was corrected and the updated source was re-fetched. Final source checks passed 10/10, including verification that no stale function reference remains.
- Reference: W3C WCAG 2.2 Technique H58 describes identifying language changes with the HTML `lang` attribute: https://www.w3.org/WAI/WCAG22/Techniques/html/H58.
- Source-level verification only. No browser runtime, automated test, official content validator, CI, Android build, emulator, physical-device or screen-reader test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%) with 1,135 minutes remaining (47.29%); no earned allocation changed. Actual engineering time remains untracked.


## Runtime question-record integrity boundary — 2026-11-18

- Strengthened `isPlayableQuestion()` to reject malformed question records before they enter a round: exact question and active-translation field sets, category-coded stable IDs matching the selected region, exact four-option keys, non-empty/control-character-free text, and four distinct normalized answer choices.
- Answer-choice duplicate detection applies NFC Unicode normalization, whitespace folding and locale-aware case folding. MDN documents that canonically equivalent Unicode text can have different code-point sequences and that `String.prototype.normalize()` converts them to a common normalization form: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize.
- Added a pool-level duplicate-ID guard. If otherwise playable records collide on stable identity, the app discards the candidate round and shows the existing localized integrity recovery instead of presenting ambiguous question identities.
- The official dependency-free question-bank validator remains unchanged and stronger in scope: it continues to validate every locale, global uniqueness, total counts and regional distributions. It was not executed in this batch; no tests, browser runtime, CI, Android build or device QA were run.
- This source-level hardening is included in existing gameplay/content-integrity allocations; baseline accounting remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. Actual engineering time remains untracked.


## Cross-locale question integrity and round-selection postconditions — 2026-11-18

- Expanded the runtime question gate from checking only the active question language to checking all three required locales (\`en-IN\`, \`en-US\`, \`ru-RU\`) before a shared question ID can enter the eligible pool. Each locale must have the exact translation fields, exact four option keys, clean non-empty question/explanation/option text, unique normalized options and a non-empty option at the single question-level correct-answer key.
- This makes the question-level \`correct\` key the explicit shared answer identity across translations; runtime checks confirm that this key resolves to text in every locale. Automated structure checks cannot establish that translations are semantically equivalent or that the answer text is factually correct; human linguistic/content review remains required.
- The official validator now applies NFC Unicode normalization to duplicate question and option comparisons in every locale, and explicitly checks that the shared correct-answer key resolves to localized text for each translation. It remains dependency-free and was not executed in this batch.
- Added round-selection postconditions after shuffle/slice: the selected round must contain the expected number of questions (up to ten), have unique stable IDs and still pass the all-locale runtime integrity gate before play begins. Any failure uses the existing localized integrity recovery path.
- MDN explains that visually equivalent Unicode strings may use different code-point sequences and that NFC normalization converts canonically equivalent sequences to a common form: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize.
- Source-level verification only; no official validator, browser runtime, CI, Android build or device QA was run. CI and Android validation remain deferred until the agreed development freeze.
- No earned allocation changed: baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. Actual engineering time remains untracked.


## Runtime duplicate-prompt pool guard — 2026-11-18

- Added a pre-shuffle duplicate-prompt check across the complete eligible pool, separately for \`en-IN\`, \`en-US\` and \`ru-RU\`. Prompt text is normalized using NFC, trimmed, whitespace-folded and locale-aware case folding before comparison.
- The check runs before randomization, so a duplicate stable question identity/content pair cannot be hidden by selecting a different subset for one particular round. The existing localized integrity-recovery route handles a collision.
- This is a defensive runtime layer; the official question-bank validator remains the primary whole-bank structural gate and its execution is still deferred. This source-only batch did not run browser tests, CI, Android builds or device QA.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining; no additional allocation was claimed. Actual engineering time remains untracked.

## Consecutive-round variety safeguard — 2026-11-18

- Added a session-local signature for the most recently completed/selected question set. When a new shuffle would select the identical set and the eligible pool contains at least one alternative, the final selected question is replaced with the next item from that same shuffled pool.
- The safeguard preserves the maximum ten-question round size, does not change question IDs or content, and does not block play when ten or fewer eligible questions exist. It compares sets rather than order, so merely rearranging the same questions does not count as a new round.
- The safeguard is intentionally session-local; it does not persist player history or add storage requirements. It is a replay-variety improvement, not a security control.
- Source change committed in `app/src/app.js`; the roadmap implementation slice was updated. The original 2,400-minute baseline and 1,265-minute earned allocation remain unchanged.
- No browser runtime, automated test, official content validator, CI, Android build, emulator, physical-device or screen-reader test was run. CI and Android validation remain deferred until the agreed development freeze.
- Technical note: the existing Fisher–Yates shuffle uses `Math.random()` for ordinary game variation, not security-sensitive decisions. MDN documents `Math.random()` as approximately uniformly distributed but not cryptographically secure: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random.

## Visible difficulty feedback — 2026-11-18

- Added a dedicated difficulty indicator beside the question category during gameplay. It displays Easy, Medium or Hard using the active interface locale, including when the player selects Any difficulty and the round contains mixed levels.
- The indicator is marked with the interface language because its label is UI text; the question itself continues to carry the independently selected question-language tag. MDN documents `lang` as the BCP 47 language tag for an element's text and notes its accessibility relevance for language changes: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang.
- Updated `app/index.html`, `app/src/app.js` and `app/styles.css`; updated the roadmap implementation slice. Commits: `451e7a1`, `beecad7`, `158da1a`, `0f9093f` (roadmap).
- Post-commit re-fetch verification passed 10/10 targeted source/documentation checks, including the HTML target, localized runtime rendering, interface-language marking, CSS styling, all three difficulty dictionaries, roadmap/status updates and unchanged baseline. No browser runtime, automated gameplay test, official question-bank validator, CI, Android build, emulator, physical-device or screen-reader test was run.
- No additional baseline credit claimed; earned implementation remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes remaining. Actual engineering time remains untracked.

## Duplicate-prompt whitespace normalization correction — 2026-11-18

- A focused source review found that the runtime duplicate-prompt normalization expression had an over-escaped whitespace pattern. It matched a literal backslash-plus-s rather than whitespace, so its comment overstated the normalization actually performed.
- Corrected the runtime expression to use the Unicode-aware whitespace matcher `/\\s+/gu`, matching the already-correct official validator implementation. The normalization now folds tabs, line breaks and repeated whitespace before case comparison.
- Updated `app/src/app.js` in commit `86b1925`. The official validator source was inspected but not executed or changed.
- This is a source correction, not a new feature or baseline-progress increment. No browser runtime, validator execution, CI, Android build, emulator or device QA was performed.

## Session-wide question rotation — 2026-11-18

- Replaced the previous immediate-repeat-set safeguard with a session-local question cycle keyed to the exact eligible question pool (region, category and difficulty filters).
- Each eligible question is selected once before any question is reused. Rounds remain capped at ten and contain no duplicate IDs. If fewer than ten unseen questions remain, all remaining unseen questions are included and the round is filled from previously seen questions without duplicating an ID within that round.
- When the eligible pool changes, the cycle resets. When all eligible questions have appeared, a new cycle begins. The tracking is in memory only; it does not add storage, accounts, network access or persistent player history.
- App change committed as `650f29c`; roadmap updated as `4ab043c`.
- This is source-level implementation only. No browser gameplay test, question-bank validator, CI, Android build, emulator, physical-device or screen-reader validation was run. Baseline credit remains unchanged pending validation.

## Proportional difficulty mix — 2026-11-18

- Mixed-difficulty rounds now allocate easy, medium and hard question counts in proportion to the eligible filtered pool, using integer largest-remainder quotas that sum to the round size.
- The current 15/20/15 per-region distribution produces a 3 easy / 4 medium / 3 hard mix for an unfiltered ten-question round. Category-filtered pools receive quotas based on their own composition; single-difficulty filters remain entirely within the selected difficulty.
- The session-wide unseen-question cycle remains authoritative: available unseen questions are preferred within each difficulty quota, other unseen questions fill any quota shortfall, and previously seen questions are only used when fewer than ten unseen questions remain.
- App change committed as `c8065a3`; roadmap updated as `214f74f`.
- Source-level change only. No browser gameplay test, question-bank validator, CI, Android build, emulator, physical-device or screen-reader validation was run. Baseline credit remains unchanged pending validation.

## Balanced round ordering and source correction — 2026-11-18

- Corrected a block-scoped duplicate `const selectedIds` declaration in `startRound()` by giving the temporary membership set its own `selectedIdSet` name. This defect was found during source review of the previous difficulty-quota batch.
- After difficulty quotas and unseen-question fill are complete, the selected round is now shuffled with Fisher–Yates. The intended proportional difficulty mix is retained without presenting fixed Easy/Medium/Hard blocks.
- App change committed as `7ddbfc5`; roadmap updated as `476ab0c`.
- The source was re-fetched for review. No JavaScript parser, browser gameplay test, question-bank validator, CI, Android build, emulator, physical-device or screen-reader validation was run. The correction is not counted as additional baseline progress.

## Correct-answer streak feedback — 2026-11-18

- Added a live current-streak counter to the quiz view and a localized best-streak summary to the results message in English (India), English (US) and Russian.
- A correct answer increments the current streak and updates the round's best streak; an incorrect answer resets the current streak to zero. New rounds and discarded rounds reset both values.
- Streaks are informational only: they do not award bonus points, alter accuracy, change best-score comparisons or add persistent storage.
- App logic committed as `523e717`; quiz markup as `643ff80`; styling as `dee866c`; roadmap as `3b0f05c`.
- Source/documentation changes only. No JavaScript parser, browser gameplay, accessibility runtime, official question-bank validator, CI, Android build, emulator or device test was run. Baseline credit remains unchanged pending validation.

## Per-question answer-position randomization — 2026-11-18

- Each question now shuffles its four answer positions independently using Fisher–Yates rather than always displaying option keys in A/B/C/D order.
- The stable answer key remains bound to its original option text throughout selection, correctness feedback, answer-history capture and result review. The question-bank data and shared correct-answer identity are unchanged.
- App change committed as 178e8a2; roadmap updated as a5d5c7e.
- Source-level review only. No JavaScript parser, browser gameplay test, official question-bank validator, CI, Android build, emulator, physical-device or screen-reader test was run. Baseline credit remains unchanged pending validation.

## Configurable round length — 2026-11-18

- Added a persisted round-length preference with 5, 10 and 15 question choices; 10 remains the default for existing installations and malformed values normalize back to 10.
- Round selection now targets the selected length, caps the actual round to the eligible pool size and retains proportional difficulty quotas, unseen-question rotation and randomized question ordering.
- Best-score records are now separated by selected round length so a short-round result cannot overwrite or be compared against a longer-round record. The score-record reader accepts valid totals up to 15. Existing ten-question best scores are lazily migrated to the new length-scoped key when first read; five- and fifteen-question records remain independent.
- Updated all three interface locales, the settings control, Help copy, roadmap and architecture documentation. The selected length is also shown in the home best-score scope.
- App logic committed as 88dd1a4 and f54566c; localization as 99f5263; settings markup as e54b668; roadmap as e3db899; architecture as b3d2fda.
- Source/documentation changes only. No JavaScript parser, browser runtime, official question-bank validator, CI, Android build, emulator, physical-device or screen-reader test was run. Baseline credit remains unchanged pending validation.


## Best-score record schema hardening — 2026-11-18

- Tightened local best-score parsing to accept only a plain JSON object with exactly the two expected fields, `score` and `total`, before applying the existing integer, range and selected-round-length checks.
- This rejects malformed arrays and unexpected record shapes rather than silently treating extra fields as part of the supported persistence contract. Valid historical two-field records and the lazy ten-question migration path remain compatible.
- Corrected the question-cycle source comment to describe the selected round length (5/10/15) rather than implying a fixed ten-question round. Updated the roadmap's round postcondition wording to reflect the configurable length and eligible-pool cap.
- Source/documentation change only. No parser, browser runtime, official content validator, CI, Android build or device test was run. Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). Actual engineering time remains untracked.


## Completed-round answer-ledger schema hardening — 2026-11-18

- Tightened the final-round answer-history integrity gate to require the exact five-field answer-entry shape and the exact four-key option map (a/b/c/d).
- Existing semantic checks remain in place: selected and correct keys, localized option values, explanation text, correctness flag and recomputed score must all agree with the active question bank.
- This is defensive source hardening; it does not change gameplay, scoring or the persisted best-score schema. No baseline credit was added.
- App commit: 654c44d. Roadmap documentation commit: ff060cf.
- No JavaScript parser, browser runtime, official question-bank validator, CI, Android build, emulator, physical-device or screen-reader test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining baseline scope remains 1,135 minutes (47.29%). Actual engineering time remains untracked.


## Question-bank stable-ID taxonomy guard — 2026-11-18

- The structural validator now checks that each question ID follows the runtime's region/category taxonomy, such as IN-GEO-001, RU-HIS-004 or US-SCI-012, rather than checking only the region prefix.
- This adds an offline whole-bank check for mismatched category codes and preserves all existing stable IDs and question content.
- Validator commit: c02d3fd. The official validator remains unexecuted until the agreed development freeze. No CI or Android validation was run.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining allocation remains 1,135 minutes (47.29%). Actual engineering time remains untracked.


## Validator source correction and post-commit verification — 2026-11-18

- During the stable-ID validator edit, a malformed intermediate source update was detected by immediate re-fetch inspection before any validator execution. The validator was restored as a complete file and the region/category/three-digit ID check was reapplied.
- Final re-fetch checks passed 9/9: imports and source loading, category mapping, complete ID expression and diagnostic, locale/option checks, regional distributions, and both documentation records.
- Final validator commit: c431a20. The earlier intermediate validator commit c02d3fd is superseded by this repair.
- This remains source inspection only. The official validator was not executed, and CI/Android validation remain deferred. Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). Actual engineering time is untracked.


## Answer-history option snapshot isolation — 2026-11-18

- `chooseAnswer()` now copies the active localized option map into the answer-history entry rather than storing the original question-bank object reference.
- `isCompleteRound()` continues to compare the captured four option values with the active question translation; snapshotting ensures that comparison is meaningful if the source object is later mutated.
- App commit: 17ae826. This is source hardening only; no baseline credit added. No browser runtime, parser, official content validator, CI, Android build or device testing was run.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. Actual engineering time remains untracked.


## Streak-summary integrity verification — 2026-11-18

- `isCompleteRound()` now recomputes both the trailing current streak and the maximum correct-answer streak from the validated answer ledger.
- Results are accepted only when those derived values agree with the in-memory streak counters, in addition to the existing option snapshot, correctness, explanation and score checks.
- App commit: 2699ae0. Source hardening only; no baseline credit added. No browser runtime, parser, official content validator, CI, Android build or device testing was run.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. Actual engineering time remains untracked.


## MVP scope wording alignment — 2026-11-18

- Updated the README MVP feature summary from fixed ten-question rounds to the implemented configurable 5/10/15-question choices.
- Re-fetched the README and both tracking documents after the commits to verify the wording and scope note. This documentation correction does not change product scope or baseline progress.
- No validator, CI, Android build, emulator or physical-device test was run.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). Actual engineering time remains untracked.


## Help fallback wording alignment — 2026-11-18

- Updated the static Help copy in `app/index.html` to say “the selected number” rather than “ten”, matching the existing localized Help dictionaries and configurable 5/10/15-question setting.
- Re-fetched the HTML and both tracking documents after commits to verify the updated fallback and scope/baseline notes. This is wording alignment only.
- No runtime, official validator, CI, Android build, emulator or physical-device validation was run. Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. Actual engineering time remains untracked.


## Keyboard focus visibility — 2026-11-18

- Added a visible keyboard `:focus-visible` outline for the home brand anchor. The existing shared focus rule applied to buttons and selects but did not include this link, so keyboard focus on the brand navigation target could be difficult to locate.
- Reused the existing accent token and kept the change within the planned accessibility workstream; no new product scope or baseline credit claimed.
- Post-commit verification checks the selector and documentation record only. No browser runtime, screen-reader, parser, official validator, CI, Android build or device validation was run. Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes remaining. Actual engineering time remains untracked.


## Forced-colors accessibility fallback — 2026-11-18

- Added a system-colour fallback for forced-colors mode covering existing cards, controls, answer options, score panel and keyboard-focus outlines.
- Correct and incorrect answer states remain distinguishable through solid versus dashed borders, not colour alone. This stays within the planned accessibility workstream and introduces no new product scope.
- Post-commit verification is source-level only. No forced-colors browser simulation, screen-reader, parser, official validator, CI, Android build or device test was run. Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. Actual engineering time remains untracked.

## Latest documentation consistency correction — 2026-11-18

- Corrected the session-rotation description in the roadmap: round capacity follows the player's selected 5-, 10- or 15-question setting, rather than the superseded ten-question cap. The implementation and current product setting were already configurable; this change aligns the planning document with delivered behaviour. No application code, scope or baseline allocation changed.
- Re-fetched both updated documentation files after committing. No parser, validator, CI, Android build or runtime test was run in this documentation-only correction.

## Latest completed batch — Android launcher identity

- Added `android/app/src/main/res/drawable/ic_launcher.xml`, a scalable vector launcher mark based on the existing MindQuest visual palette.
- Connected the vector resource through `android:icon` and `android:roundIcon` in the application manifest. This replaces the platform-default launcher artwork when the APK is built.
- This is a source-level resource integration; no Gradle build, APK inspection, launcher rendering test or physical-device validation was performed. Existing scope and 2,400-minute baseline are unchanged.


## Native Android launch presentation — 2026-11-18

- Added values/colors.xml and values/styles.xml for the shared MindQuest native palette, regular app theme and pre-Android 12 launch theme.
- Added drawable/launch_background.xml for a centered branded launch mark on the dark-navy background on Android 6.0 through Android 11.
- Added values-v31/styles.xml for the Android 12+ system splash background, vector icon and post-splash application theme.
- Updated the manifest to apply the regular application theme and the launch-only Activity theme. MainActivity switches to the regular theme before super.onCreate() and WebView creation.
- This is source-level integration only. No Gradle/resource build, APK inspection, Android 12 splash rendering, emulator or physical-device validation was run. CI and Android validation remain deferred until the agreed development freeze.
- No new product scope, dependency, permission, service or release requirement was introduced. Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. No additional baseline credit claimed; actual engineering time remains untracked.


## Android WebView boundary and lifecycle review — 2026-11-18

- Restricted permitted top-level WebView navigation to the exact bundled `/android_asset/index.html` document; hash-based in-app navigation remains valid. Other top-level destinations and subframe navigations are rejected.
- Explicitly disabled WebView content debugging. Existing JavaScript requirement for the local game, disabled content access, disabled cross-file and universal file-origin access, disabled pop-ups and blocked mixed content are retained.
- Added Activity lifecycle handling to pause/resume the WebView and its timers; shutdown stops loading and destroys the WebView without navigating to a blank page.
- Updated the Android implementation notes. No new dependency, permission, service, network access or product scope was added.
- Source-level verification only. No Kotlin compiler, Gradle build, APK inspection, runtime navigation test, emulator or physical-device test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. No additional baseline credit claimed; actual engineering time remains untracked.


## Android system back integration — 2026-11-18

- Added platform `OnBackInvokedDispatcher` handling for Android 13+ committed system-back actions through `OnBackInvokedCallback`; WebView history is used when available, otherwise the Activity finishes. No custom `OnBackAnimationCallback` gesture-progress animation is implemented.
- Retained legacy Activity back handling for Android 6.0–12 and unregisters the API 33+ callback during Activity destruction.
- No AndroidX dependency, permission, service or new product scope added. Device/gesture behaviour remains unverified.
- No Kotlin compilation, Gradle build, emulator or physical-device test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. No additional baseline credit claimed; actual engineering time remains untracked.


## Android 15 edge-to-edge safe-area handling — 2026-11-18

- Added API 35+ platform `WindowInsets` handling to apply system-bar and display-cutout safe insets to the WebView content area.
- This is scoped to the configured target SDK 35 behaviour and introduces no dependency, permission, service or new feature.
- No Kotlin compilation, Gradle/resource build, emulator, gesture-navigation, display-cutout, keyboard/IME or physical-device test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. No additional baseline credit claimed; actual engineering time remains untracked.


## Android 15 keyboard inset integration — 2026-11-18

- Extended API 35+ WebView safe-area padding to include on-screen keyboard (IME) insets, in addition to system bars and display cutouts.
- No new dependency, permission, service or product scope. Keyboard animation, focus and resize behaviour remain unverified at runtime.
- No Kotlin compilation, Gradle build, emulator or physical-device test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. No additional baseline credit claimed; actual engineering time remains untracked.


## Android Gradle project defaults — 2026-11-18

- Added `android/gradle.properties` for consistent UTF-8 JVM output, a 2 GB Gradle heap setting and Kotlin official code style; enabled the AndroidX project flag without adding AndroidX dependencies.
- Documented the current Android Gradle Plugin 8.7.3 / Kotlin 2.0.21 pairing and Gradle 8.9 wrapper target. Wrapper scripts and JAR remain outstanding, so fresh-checkout reproducibility is not yet achieved.
- No Gradle build, Kotlin compilation, APK packaging or Android validation was run. CI remains deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. No additional baseline credit claimed; actual engineering time remains untracked.


## Predictive-back manifest alignment — 2026-11-18

- Explicitly enabled Android platform back-invoked callback dispatch in the application manifest, matching the API 33+ dispatcher implementation already present in `MainActivity`.
- No dependency, permission or product scope added. Manifest merge, compilation and gesture behaviour remain unverified.
- No Gradle build or Android validation was run; CI remains deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. No additional baseline credit claimed; actual engineering time remains untracked.


## Adaptive launcher icon resources — 2026-11-18

- Added Android 8.0+ adaptive launcher icon resources with separate foreground/background layers and a matching vector fallback for Android 6.0–7.1.
- Updated both manifest launcher icon references to `@mipmap/ic_launcher`; existing splash artwork is unchanged.
- Resource compilation, APK inspection and launcher rendering have not been run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. No additional baseline credit claimed; actual engineering time remains untracked.


## Android keyboard resize dispatch alignment — 2026-11-18

- Added `android:windowSoftInputMode="adjustResize"` to the launcher Activity so the target-SDK 35 edge-to-edge window can receive IME inset updates, matching the existing API 35+ `WindowInsets.Type.ime()` handling in `MainActivity`.
- Updated Android build notes to document the manifest/window relationship. No dependency, permission, service or product scope was added.
- Source and post-commit fetch verification only; no Gradle build, emulator, keyboard animation, viewport or physical-device test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. No additional baseline credit claimed; actual engineering time remains untracked.


## Android resource-linkage source audit — 2026-11-18

- Cross-checked the application manifest's `@mipmap/ic_launcher` and `@style/AppTheme` / `@style/LaunchTheme` references against the available resource files.
- Confirmed the adaptive icon's foreground and background references resolve to the existing vector and colour resources; the API 23–25 `mipmap-anydpi` fallback is present, and the Android 12+ splash theme's `@drawable/ic_launcher` reference also resolves.
- Confirmed the Activity's `adjustResize` declaration and API 35+ IME/system-bar/display-cutout inset listener are both present in source. The Android asset source set points to the repository's canonical `app/` directory.
- This was a source/reference audit only. AAPT resource linking, Gradle configuration, Kotlin compilation, APK contents, splash rendering and keyboard behaviour remain unverified until the agreed Android validation phase. No baseline credit added; CI remains deferred.


## Android resource-reference and build-configuration audit — 2026-11-18

- Rechecked the Android settings/plugin declarations: Google, Maven Central and Gradle Plugin Portal are configured; Android Gradle Plugin 8.7.3 and Kotlin Android plugin 2.0.21 are pinned; the app targets compile/target SDK 35 with min SDK 23 and Java/Kotlin 17.
- A source-level resource-reference scan covered 16 manifest/theme/splash/adaptive-icon references across the Android XML resources. All 16 matched a resource definition in the inspected source files; no unresolved reference was found.
- Confirmed the canonical web asset source set remains `../../app` from the Android app module and that the Gradle wrapper is still absent. The configured Gradle 8.9 distribution target is documented, but no wrapper scripts/JAR were fabricated.
- This audit does not substitute for Gradle configuration, AAPT resource linking, Kotlin compilation, APK inspection or runtime testing. No build/CI was run; the agreed validation deferral remains in force. Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining; no additional baseline credit is claimed. Actual engineering time remains untracked.


### API 23 WebView navigation callback compatibility (2026-11-18)
- Added the legacy `shouldOverrideUrlLoading(WebView, String)` override so the explicit local-document navigation allowlist also applies on the minimum supported Android API 23, where `WebResourceRequest` is unavailable.
- Both callback paths now share one URI predicate: only `file:///android_asset/index.html` is permitted, optional URL fragments remain usable for in-app state, query strings are rejected, and API 24+ subframe navigation is blocked.
- Source-level change only. No Kotlin compilation, Android build, API 23 emulator, runtime navigation or device test was run; CI/Android validation remain deferred.


### Question-bank inventory source audit (2026-11-18)
- Parsed the checked-in question-bank source text without executing the official validator or app. Found exactly 150 unique stable IDs: 50 each for India, Russia and the United States.
- Each region has the intended category split: 13 Geography, 12 History, 12 Science and 13 Culture. Every category sequence is contiguous from 001 through its regional/category total; no duplicate IDs or sequence gaps were found in this inventory scan.
- Found 150 translation blocks for each supported locale (en-IN, en-US, ru-RU), consistent with 450 localized question records.
- This was a narrow source inventory check, not question-bank schema validation, factual verification, translation-quality review, or execution of npm run validate:content. The official validator, CI and Android validation remain deferred. Baseline remains 1,265 / 2,400 minutes (52.71%); no additional credit is claimed.


### Android predictive-back capability wording review (2026-11-18)
- Clarified that the API 33+ implementation registers `OnBackInvokedCallback` and handles the committed system-back action; it does not implement `OnBackAnimationCallback` gesture progress, cancellation or a custom predictive animation.
- This corrects documentation precision only. No Android source change, build, emulator test or device validation was performed. Baseline remains 1,265 / 2,400 minutes (52.71%); no additional credit is claimed.


### Interface-language selector label correction (2026-11-18)
- Corrected the English (India) interface-language selector so its Russian option is labelled `Russian`, consistent with the English-language selector convention and the established product decision. The Russian interface continues to label the option `Русский`.
- This is a targeted localization consistency fix; no new locale or product scope was added. Source and documentation were re-fetched for verification. No browser runtime, official content validator, CI, Android build or device test was run. Baseline remains 1,265 / 2,400 minutes (52.71%); no additional credit is claimed.


### Locale selector mapping hardening (2026-11-18)
- Replaced positional interface-language option labels with explicit locale-value mappings in `app/src/ui-polish.js`, matching the value-keyed approach already used for region and question-language labels. This preserves current visible labels while removing dependence on HTML option order.
- Updated and re-fetched the roadmap and development-status records. Source-level verification only; no browser runtime, content validator, CI, Android build or device test was run. Baseline remains 1,265 / 2,400 minutes (52.71%); no additional credit is claimed.


### Help privacy fallback accuracy — 2026-11-18
- Aligned the static HTML Help fallback with the three localized Help dictionaries: settings and best scores are stored on-device when browser storage is available, rather than implying persistence is guaranteed.
- This is wording accuracy only; no storage implementation, feature scope or baseline allocation changed. No browser runtime, official content validator, CI, Android build or device test was run.


### Android API 23 navigation documentation precision — 2026-11-18
- Clarified that API 24+ `WebResourceRequest.isForMainFrame` enables explicit subframe rejection, while API 23's legacy string callback cannot distinguish frame type and instead enforces the exact bundled-document URL allowlist.
- This aligns documentation with the existing `MainActivity` implementation; no application code, dependency, permission, scope or baseline allocation changed. No Kotlin compilation, Gradle build, emulator, runtime navigation or CI validation was run.


### Baseline ledger round-length wording correction — 2026-11-18
- Corrected the game-modes evidence description in `docs/BASELINE-RECONCILIATION.md` from fixed ten-question rounds to the implemented configurable 5/10/15-question rounds.
- This aligns the baseline evidence ledger with the current README, architecture and gameplay settings. No implementation, scope, earned allocation or remaining estimate changed. No validator, CI, Android build or runtime test was run.


### Question-bank topic-overlap refinement — 2026-11-18

- A targeted content review found repeated knowledge points despite distinct prompt wording: Aryabhata's first-satellite status; Mendeleev and the periodic table; authorship of *War and Peace*; Lake Baikal's depth; Luna 9's first lunar soft landing; and the Valley of Geysers' location.
- Replaced six localized question records while preserving their stable IDs, regions, categories, difficulty assignments, four-option format and shared correct-answer identity across en-IN, en-US and ru-RU:
  - `IN-SCI-004`: replaced the repeated Aryabhata fact with Srinivasa Ramanujan and the Hardy–Ramanujan number.
  - `RU-SCI-001`: replaced the second Mendeleev question with Lev Landau's 1962 Nobel Prize in Physics.
  - `RU-CUL-004`: replaced the second *War and Peace* authorship question with Ivan Turgenev's *Fathers and Sons*.
  - `RU-GEO-006`: replaced the second Lake Baikal depth question with Sochi's Black Sea location.
  - `RU-SCI-009`: replaced the repeated Luna 9 soft-landing question with Luna 3's first photographs of the lunar far side.
  - `RU-GEO-012`: replaced the second Valley of Geysers location question with the Strait of Tartary separating Sakhalin from mainland Asia.
- Factual cross-check references: Nobel Prize (Lev Landau, 1962) https://www.nobelprize.org/prizes/physics/1962/summary/ ; NASA (Luna 3 first far-side images) https://science.nasa.gov/resource/first-close-up-of-the-far-side-of-moon/ ; Penguin Random House (Ivan Turgenev, *Fathers and Sons*) https://www.penguinrandomhouse.com/books/180980/fathers-and-sons-by-ivan-turgenev/ ; FIA Sochi media guide (Black Sea coast) https://www.fia.com/sites/default/files/2019_russian_media_kit_eng_1-min.pdf ; ASPRS Sakhalin geography reference https://www.asprs.org/a/resources/grids/09-2008-sakhalin.pdf ; University of Connecticut mathematics text (1729 / Hardy–Ramanujan number) https://alozano.clas.uconn.edu/wp-content/uploads/sites/490/2022/12/amstext35.pdf .
- Post-commit source inventory checks confirmed 150 unique IDs (50 per region), 150 translation entries per locale, unchanged category/difficulty distributions, no exact duplicate prompts within a region/locale, and all six revised records resolve their correct answer to four localized options.
- This is targeted source review, not a complete fact audit or native-speaker translation acceptance. The official `npm run validate:content`, CI and Android validation were not run, in line with the agreed development freeze. No baseline allocation or product scope changed.


### Cross-region science-topic overlap refinement — 2026-11-18

- A wider cross-region scan identified repeated science knowledge points: Aryabhata's first-satellite identity (`IN-SCI-002` / `IN-SCI-009`), C. V. Raman and the Raman effect (`IN-SCI-003` / `IN-SCI-008`), Jonas Salk and the inactivated polio vaccine (`US-SCI-007` / `US-SCI-008`), and Apollo 11's first crewed lunar landing (`US-SCI-003` / `US-SCI-009`).
- Replaced four records, retaining IDs, regions, Science category, original difficulty and four-option structure, with the correct answer identity aligned across all three locales:
  - `IN-SCI-008` now tests Meghnad Saha's ionisation equation and its use in interpreting stellar atmospheres.
  - `IN-SCI-009` now tests the SLV-3 launch of Rohini RS-1 in July 1980.
  - `US-SCI-008` now tests J. Robert Oppenheimer's direction of the Los Alamos Laboratory during the Manhattan Project.
  - `US-SCI-009` now tests the New Horizons spacecraft's first close flyby of Pluto in July 2015.
- Factual cross-check references: Indian National Science Academy on Meghnad Saha's thermal-ionisation theory and stellar spectra https://insaindia.res.in/07062023_no.php?id=F00-0688 ; ISRO on SLV-3 and Rohini RS-1 https://www.isro.gov.in/SLV.html and https://www.isro.gov.in/RohiniSatellite_RS_1.html ; U.S. National Park Service on Oppenheimer and Los Alamos https://home.nps.gov/people/manhattan-project-scientists-j-robert-oppenheimer.htm ; NASA on the New Horizons Pluto flyby https://science.nasa.gov/mission/new-horizons/ .
- Post-commit source scan confirmed 150 unique IDs (50 per region), 150 translation entries per locale, unchanged category/difficulty distributions, no exact duplicate prompts within each region/locale, and four options plus the intended correct answer in all three translations for each replacement.
- This is a targeted source/content review, not a full factual audit, native-speaker review or execution of the official content validator. CI and Android validation remain deferred until the agreed development freeze. No baseline allocation or product scope changed.


### Broadway street terminology correction — 2026-11-18

- Corrected the en-IN wording in `US-CUL-004`: Broadway is a street, not an avenue. The question now asks which New York City street is associated with the Broadway theatre district. The en-US and ru-RU variants already used accurate street/thoroughfare wording; answer options, correct key and record taxonomy are unchanged.
- Cross-check: U.S. Department of State American Spaces Broadway resource describes the Broadway theatre district and the street for which it is named: https://americanspaces.state.gov/wp-content/uploads/sites/292/22-Americana-Broadway-Resource-Toolkit.pdf ; Broadway Theater District transportation page identifies Broadway as the street after which the area is named: https://broadwaytheaterdistrict.com/transportation/ .
- This is a narrow factual wording correction. No question count, product scope or baseline allocation changed. No official validator, CI, Android build or runtime test was run; the agreed validation deferral remains in force.


### Russian history fact-overlap and answer-consistency correction — 2026-11-18

- Full-file extraction now accounts for both compact and expanded record formatting in the question-bank source. It confirms 150 unique stable IDs (50 per region), not a 75-question bank; the earlier 75 count was an incomplete extraction of the compact-formatted half.
- Review found `RU-HIS-004` overlapped with `RU-HIS-001` on the Treaty of Brest-Litovsk. The en-IN wording also described the Brest-Litovsk treaty while its marked correct answer and explanation referred to the Treaty of Rapallo, creating a factual answer mismatch.
- Replaced `RU-HIS-004` in all three locales with a question about Alexander II and the 1861 Emancipation Manifesto. Preserved the stable ID, Russia region, History category, hard difficulty, four-option schema and correct key `b`; all translations identify Alexander II as the correct answer.
- Factual references: Cambridge University Press, “The reign of Alexander II: a watershed?” https://www.cambridge.org/core/books/abs/cambridge-history-of-russia/reign-of-alexander-ii-a-watershed/136BC2DA5C0E6AD904F1BDC24C6CB0CC ; Polish Office of the Commissioner for Human Rights, “The 1861 Emancipation Manifesto of Tzar Alexander II” https://bip.brpo.gov.pl/pliki/12289971420.pdf .
- Post-update source scan verified 150 unique IDs, 50 records per region, 150 translations per locale, unchanged per-region category and difficulty distributions, four unique options and a valid correct key in every translation, and no exact duplicate prompts within any region/locale.
- This is source-level structural and targeted factual review only. The official `npm run validate:content` validator remains unexecuted until the agreed development freeze; no CI, Android build or runtime testing was performed. No baseline allocation or product scope changed.


### US culture topic-variety correction — 2026-11-18

- A cross-record scan of correct-answer identities within each region/category found two repeated answer identities in US culture/geography. The two Alaska answers refer to distinct geography facts (largest state by area; location of Denali) and were retained.
- The US culture pair both tested Frank Lloyd Wright: `US-CUL-002` (Fallingwater) and `US-CUL-006` (Solomon R. Guggenheim Museum). Replaced `US-CUL-006` in all three locales with a question about Maya Lin designing the Vietnam Veterans Memorial.
- Preserved stable ID, US region, Culture category, hard difficulty, four-option schema and correct key `c`. All translations identify Maya Lin as the correct answer.
- Factual source: U.S. National Park Service, Vietnam Veterans Memorial overview https://www.nps.gov/places/000/vietnam-veterans-memorial.htm . The National Park Service confirms Maya Lin designed the memorial; it was selected through a national design competition and dedicated in 1982.
- This is a targeted topic-variety correction and source-level review. No baseline allocation or product scope changed. The official content validator, CI, Android build and runtime tests remain deferred until the agreed development freeze.


### Indian culture topic-variety correction — 2026-11-18

- The cross-record correct-answer scan found `IN-CUL-007` (Sattriya dance) and `IN-CUL-011` (Bihu festival) both used Assam as the answer in the India/Culture category. The facts were distinct, but this repeated state answer reduced answer variety.
- Replaced `IN-CUL-011` in all three locales with a question about the Hornbill Festival and Nagaland. Preserved stable ID, India region, Culture category, hard difficulty, four-option schema and correct key `a`; all translations identify Nagaland as the answer.
- Factual references: Tourism Nagaland, Hornbill Festival https://tourism.nagaland.gov.in/events/hornbill-festival/ ; Ministry of Tourism, Government of India, Utsav portal https://www.utsav.gov.in/view-event/hornbill-festival . Both describe the festival as organised by Nagaland's state government to showcase Naga cultural heritage.
- Source-level checks are targeted, not a complete factual audit or native-speaker review. The official content validator, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or scope changed.


### Russian localization wording correction — 2026-11-18

- Review of the Russian question set found a redundant construction in `US-CUL-002`: `дом «Дом над водопадом»` (literally “house ‘House above the Waterfall’”) duplicated the generic noun and the translated title.
- Reworded the Russian prompt to `виллу «Фоллингуотер» (Fallingwater)`, retaining the same question meaning, answer key, options, explanation, stable ID and all English translations.
- This is a language-quality correction only; no factual answer or product scope changed. Broader native-speaker review remains pending.


### Russian answer-meaning alignment correction — US-GEO-009 — 2026-11-18

- The Russian variant of `US-GEO-009` asked for Hawaii's nickname but its four answer options were state names; the marked correct option was “Гавайи”. That made the Russian prompt/options semantically inconsistent, although the English variants were correct.
- Rephrased the Russian question to ask which US state is known by the nickname “Штат Алоха”, and clarified the explanation as “Официальное прозвище штата Гавайи — «Штат Алоха».” The four state options, correct key `d`, stable ID, region, category and difficulty remain unchanged.
- Verified against the State of Hawaii's official archives, which identify “The Aloha State” as the official popular name: https://digitalarchives-documents.hawaii.gov/documents/1640/32.pdf ; the state legislature's joint resolution adopting the name is https://digitalarchives-documents.hawaii.gov/documents/1055/274.pdf .
- This correction aligns the Russian question with the existing answer choices; it does not alter the underlying fact or any English translation. Broader native-speaker review remains pending.


- Post-commit source inspection caught a malformed closing quote in the first Russian explanation edit before any validator or build was run. Corrected the record formatting in follow-up commit `b85f22e`; a fresh fetch confirms the question, option set, explanation and record boundaries are now properly quoted and closed. This correction is recorded transparently; no claim of validator or runtime success is made.
