# MindQuest implementation tracker

**Planning baseline:** 2,400 minutes (40 engineering hours). Estimates are working-time estimates, not a calendar delivery promise. Actual effort will be updated as implementation progresses.

Statuses: `Planned` = not started; `In progress` = partial implementation; `Review` = implementation complete, awaiting review; `Complete` = accepted against its criteria.

| # | Workstream | Acceptance criteria | Status | Estimate (min) | Earned implementation (min) | Remaining baseline (min) |
|---:|---|---|---|---:|
| 1 | Project foundation | Standalone repository structure, documentation, metadata and clean baseline | In progress | 60 | 40 | 20 |
| 2 | Visual identity | Branding, icon, splash, typography and responsive game interface | In progress | 90 | 25 | 65 |
| 3 | Home screen | Play, settings, help/about and navigation | In progress | 120 | 70 | 50 |
| 4 | Independent localization | Three independent selectors; all combinations work; preferences persist separately | In progress | 150 | 90 | 60 |
| 5 | Question-bank architecture | Offline data, stable IDs, region/category metadata and translation mapping | Review | 150 | 150 | 0 |
| 6 | Question content | 150 original questions: 50 per region, each in all three supported languages | Review | 180 | 180 | 0 |
| 7 | Core gameplay | Multiple-choice flow, validation, feedback, scoring and progression | In progress | 180 | 120 | 60 |
| 8 | Game modes | Configurable 5/10/15-question rounds, category selection and replay | In progress | 120 | 80 | 40 |
| 9 | Difficulty progression | Easy/medium/hard classifications and balanced selection | In progress | 90 | 70 | 20 |
| 10 | Results screen | Score, accuracy, per-question answers, explanations and replay | In progress | 90 | 70 | 20 |
| 11 | Local persistence | Settings and best score persist locally without an account | In progress | 120 | 75 | 45 |
| 12 | Accessibility | Scalable text, contrast, keyboard and assistive-technology support | In progress | 120 | 65 | 55 |
| 13 | Android application shell | Lightweight native Android wrapper, bundled assets, minimal permissions | In progress | 180 | 65 | 115 |
| 14 | Offline/security hardening | Airplane-mode operation, safe WebView configuration and no remote runtime dependencies | In progress | 120 | 85 | 35 |
| 15 | Device compatibility | Small/standard/large screen and density checks | Planned | 180 | 25 | 155 |
| 16 | Manual functional testing | Gameplay, all language combinations, data integrity, persistence and regression | Planned | 180 | 0 | 180 |
| 17 | RuStore release readiness | Package, signing, metadata, Russian listing, screenshots, disclosures and rating preparation | Planned | 180 | 0 | 180 |
| 18 | Documentation/release | Installation, changelog, versioning and release checklist | In progress | 90 | 55 | 35 |
|  | **Total** |  |  | **2,400** | **1,265** | **1,135** |

## Delivery milestones

| Milestone | Scope | Estimate (min) |
|---|---|---:|
| 1 | Repository, foundation, branding direction and localization/data architecture | 150 |
| 2 | Question content, gameplay, modes, scoring and results | 720 |
| 3 | Localization, persistence and accessibility | 360 |
| 4 | Android integration, offline support, security and device compatibility | 480 |
| 5 | Manual testing, RuStore readiness and documentation | 690 |
|  | **Total** | **2,400** |

Milestone allocations are planning buckets and will be reconciled against the detailed workstream estimates as implementation progresses.

## Current implementation slice

- Repository and project documentation created.
- Responsive web game shell with home, quiz, result, settings and localized help views.
- Three independent preference values and local persistence.
- One hundred fifty questions (fifty per region), each with three language variants (450 localized records).
- Current difficulty spread per region: fifteen easy, twenty medium and fifteen hard questions.
- Basic quiz flow, answer feedback, score, replay and best-score persistence.
- Replay selection now tracks question IDs across a session-local cycle: every eligible question is presented once before any question is reused, while each round remains capped at ten distinct questions. When fewer than ten unseen questions remain, all remaining unseen questions are included and the round is filled with previously seen questions; a changed eligible pool starts a fresh cycle.
- Mixed-difficulty rounds now apportion their easy/medium/hard question counts proportionally to the eligible filtered pool, using whole-number largest-remainder quotas. Remaining unseen questions take priority if a difficulty's quota cannot be met near the end of a session cycle; previously seen questions are used only to fill the final round. The final selected questions are shuffled after quota allocation so difficulty levels do not appear in fixed consecutive blocks.
- Results accuracy percentage and localized per-question answer review.
- Configurable 5-, 10- or 15-question rounds, persisted independently of region, category and difficulty; short eligible pools automatically cap the actual round length to the number of available questions.
- Answer choices are independently shuffled for every question with Fisher–Yates; each stable answer key remains attached to its option text, preserving scoring, feedback and answer-review identity.
- Live correct-answer streak indicator during a round and a localized best-streak summary on results; streaks reset after an incorrect answer and do not change scoring or best-score calculations.
- Help guide in all three interface locales, accessible from home and settings with return-to-origin navigation.
- View navigation moves focus to the active heading; quiz progress and results expose accessible announcements.
- Empty-filter recovery routes players back to settings instead of presenting a dead-end replay action.
- Best scores are scoped to region, category and difficulty and compared by percentage. The home card shows the best score, percentage accuracy and active pool scope.
- Persisted category and difficulty filters (All categories / Any difficulty), applied to question selection.
- Each quiz question displays its localized difficulty level alongside its category, including mixed-difficulty rounds.
- Category and difficulty filter labels localised for English (India), English (US) and Russian.
- Initial English (India) / English (US) UI copy differentiation, localized accessible names for navigation controls and answer group, and localized final-question results action.
- All four question categories are represented in each regional bank, with thirteen Geography, twelve History, twelve Science and thirteen Culture questions.
- Dependency-free question-bank structural validator, strengthened with strict schema/type checks, duplicate normalized question-text detection and exact 50-per-region / 150-total assertions (execution deferred).
- Initial Kotlin/Gradle Android WebView shell; not yet built or device-validated.

The full 50-question-per-region content target is now populated, but the bank remains a development seed pending factual, cultural and native-speaker review. Gameplay source review has also hardened persisted best-score parsing against malformed or out-of-range values. Initial interface copy and accessible navigation labels have now been differentiated/localized for the three interface locales; a full localization audit remains open. The Android shell is also not yet a release-ready signed package.

## Latest development review

- Improved quiz keyboard focus: answer selection moves focus to the newly enabled Next / See results button after disabling answer options; advancing moves focus to the new question heading. This is a source implementation change and still needs keyboard and screen-reader runtime testing.
- Reviewed Android Gradle Kotlin DSL: plugin versions are pinned, dependency repositories are centrally declared, app SDK levels are set to min 23 / compile-target 35, and Java/Kotlin target 17. No Gradle wrapper is present and no build was attempted.
- No parser, browser runtime, official validator, CI, Android build or device test was run in this batch.


- Corrected a malformed literal newline sequence in the application script found during manual source inspection; the accessible-label assignments are now validly separated in source. No JavaScript parser or runtime was run, so syntax validation remains an explicit QA item.
- Added accessible default text and explicit minimum/maximum values for the quiz progress indicator in the static HTML.
- Rechecked all three locale dictionaries for the answer-group and navigation accessible labels, and confirmed local script loading order.
- Re-reviewed Android shell source configuration: no declared network permission, cleartext disabled, file/content access restrictions and external top-level navigation blocking are present. This does not replace a compiled APK security test.
- No validator, browser runtime, CI, Android build or physical-device test was run in this batch.


- Added initial English (India) / English (US) wording differentiation, including regional spelling, and refined the independence guidance for the three selectors.
- Localized accessible labels for the settings button, home brand link and answer-option group in English (India), English (US) and Russian.
- Replaced the misleading fixed “ROUND 1” quiz label with a localized neutral “ROUND” label and localized the final-question results action.
- Source changes committed; no runtime, validator, CI or Android validation was run in this batch.



- Hardened best-score persistence reads: malformed values, fractional scores, negative scores, scores above the recorded total and impossible round totals are ignored.
- Expanded the dependency-free content validator with strict object/string validation, normalized duplicate question-text checks per region and locale, and exact regional/total question-count assertions. The validator has not yet been executed; CI and Android validation remain deferred.
- Targeted review of gameplay, result rendering, settings flow, HTML structure, CSS and Android WebView configuration is complete for this pass. It is not a complete source audit; localization, accessibility, factual/native-speaker review and Android build readiness remain open.

## Latest content milestone

- Completed the 150-question content target: 50 questions per region and 450 localized records across English (India), English (US) and Russian. Each region has 13 Geography, 12 History, 12 Science and 13 Culture questions, with 15 easy, 20 medium and 15 hard. Static structural checks passed; factual and native-speaker review remains outstanding.

## Release gates

1. Feature development complete.
2. Static source review and dependency review complete.
3. Manual functional, localization, offline and Android QA complete.
4. Release candidate and signing configuration prepared.
5. Only then enable/run the agreed CI suite and Android release validation.
6. Submit to RuStore after all release gates pass.

**CI is intentionally deferred.** No workflow should be run during development. The repository currently has no workflow files.


## Latest development review — 2026-11-17

- Added polite, atomic live announcements for the quiz question counter while preserving the progress bar's percentage value and localized accessible label.
- Added responsive safeguards for narrow viewports and long localized strings, including flexible footer wrapping and a compact treatment at 340px and below.
- A source-level scan confirmed that every HTML `data-i18n` key exists in all three UI dictionaries. Translation quality and runtime localization behavior remain to be reviewed.
- No JavaScript parser, browser runtime, official validator, CI, Android build or device test was run. Responsive, keyboard and screen-reader behavior remain pending runtime QA.


## Additional source-review update — 2026-11-17

- Quiz feedback and final result messages now explicitly use atomic polite live-region semantics.
- Source-level scans found complete dictionary coverage for statically referenced runtime strings and HTML translation / accessible-label keys in all three locales.
- Android asset mapping, local-only navigation controls and manifest permissions received another source inspection. Build and runtime validation remain outstanding.
- The official content validator, parser/runtime, CI and Android validation remain deferred.


## Latest selector-label and gameplay source review — 2026-11-17

- Standardized the Russian-language selector option as “Russian” in the English (India) interface, matching English (US); Russian UI continues to use “Русский”.
- Inspected selector refresh ordering and the gameplay transitions for duplicate answer protection, answer-history indexing, empty-pool cleanup, replay reset and settings navigation. This was source review only; no browser runtime or automated test was run.
- Official content validation, parser/runtime checks, CI, Android build and device QA remain deferred until the development batch is complete.


## Latest validator and accessibility source review — 2026-11-17

- The content validator now rejects array-shaped translation containers, validates the shared correct-answer key at question level, and enforces exact category and difficulty distributions per region (13/12/12/13 categories; 15/20/15 difficulty levels).
- Source-level palette contrast calculations exceeded WCAG AA normal-text thresholds for the checked foreground/background combinations. Full component/state contrast and runtime accessibility verification remain pending.
- Validator execution, browser/runtime testing, CI, Android build and device QA remain deferred until the agreed development freeze.


## Latest validator schema-integrity refinement — 2026-11-17

- Validator now requires exact question and translation object fields and rejects empty/control-character text in prompts, explanations and answer options.
- This is a source change only. The official validator remains unexecuted until the agreed development freeze; CI and Android validation remain deferred.


## Latest gameplay accessibility refinement — 2026-11-17

- Incorrect-answer feedback now announces the correct answer text as part of the existing polite atomic feedback message, using the active interface language for the label and the selected question language for the answer content.
- Source-only change; runtime keyboard and screen-reader verification remains pending. Official validator, CI and Android validation remain deferred until development freeze.


## Latest settings-state validation refinement — 2026-11-17

- A shared settings normalizer now validates both loaded preferences and settings-control values before persistence, keeping locale, region, category and difficulty values within supported options.
- Source-only hardening; no runtime or automated validation was run. Official validator, CI and Android validation remain deferred until development freeze.


## Latest content and documentation consistency pass — 2026-11-17

- Aligned the question-bank source header and README with the delivered 150 IDs / 450 localized variants; human factual, cultural and native-speaker review remains a release gate.
- Clarified that the initial Android WebView shell is implemented, but packaging/build validation remains pending.
- Corrected the architecture's filter description to include category, region and difficulty.
- No runtime, official validator, CI or Android validation was run.


## Latest best-score comparison refinement — 2026-11-17

- Best-score comparison uses exact integer cross-multiplication for accuracy; equal-accuracy results prefer the larger question count. Existing storage format and scope remain unchanged.
- Source-only refinement; no runtime, official validator, CI or Android validation was run.


## Latest runtime question-record guard — 2026-11-17

- Gameplay now checks question record structure and selected-locale content before including a record in a round, including region/category/difficulty, correct-answer key, question/explanation text and all four options.
- A malformed question collection or record no longer causes the round filter to throw. This guard complements, and does not replace, the strict official content validator.
- Source-only refinement; no runtime, official validator, CI or Android validation was run.


## Baseline progress accounting — 2026-11-17

- The 2,400-minute baseline currently has **330 minutes (13.75%) of workstream scope implemented and moved to Review**: question-bank architecture (150 min) and question content population (180 min).
- This is an estimate-weighted implementation measure derived from the roadmap, **not a timesheet or a claim that 330 minutes of engineer time were actually spent**. Actual elapsed/recorded engineering minutes have not been tracked.
- No workstream is yet marked Complete in the roadmap; Review means implementation is present but acceptance/review remains outstanding. The remaining 2,070 minutes (86.25%) are still In progress, Planned, or awaiting acceptance across the remaining workstreams.
- Future progress reporting will keep these measures separate: baseline scope implemented, baseline scope accepted, and actual engineering time logged. No actual-time figure will be invented.


## Latest answer-group context refinement — 2026-11-17

- Associated the current question heading with the answer-options group through `aria-describedby`, retaining the localized group name. This provides question context when assistive-technology users navigate into the four answer controls.
- Source-only accessibility refinement; runtime keyboard and screen-reader verification remains pending. Official content validation, CI and Android validation remain deferred.
- The change does not alter the baseline workstream status or estimate-weighted progress accounting.


## Latest HTML-to-gameplay source consistency review — 2026-11-17

- Verified that all 32 unique JavaScript element-ID selectors resolve in `app/index.html`, with no duplicate HTML IDs across the inspected document.
- Verified all 43 distinct static HTML translation/accessibility keys exist in the English (India) dictionary. This confirms key presence only, not translation quality or rendered behavior.
- No parser, browser runtime, official content validator, CI, Android build or device QA was run. CI and Android validation remain deferred until the development batch is complete.
- This review does not change workstream status or baseline progress accounting (330 / 2,400 minutes; 13.75%). Actual engineering time is not tracked.


## Latest factual content correction — 2026-11-18

- Corrected the Baisakhi explanation for `IN-CUL-002` across English (India), English (US) and Russian. The old wording incorrectly described Baisakhi as the Sikh New Year under the Nanakshahi calendar; the revised copy identifies its Punjab spring-harvest association and its significance as commemorating the founding of the Khalsa by Guru Gobind Singh in 1699.
- Cross-checked against the [World Sikh Organization of Canada Vaisakhi FAQ](https://assets.nationbuilder.com/worldsikh/pages/5435/attachments/original/1775773649/Upload_Vaisakhi___Sikh_Heritage_Month_Resource_Guide.pdf?1775773649=) and the [U.S. Office of Personnel Management's Sikh significant-days guidance](https://www.reginfo.gov/public/do/eoDownloadDocument?documentID=219143&eodoc=true).
- Preserved the question ID, correct answer key and option identity across translations. This is one targeted factual correction, not full content certification. Official validator, CI, browser/runtime, Android and device validation remain deferred.
- Baseline progress remains 330 / 2,400 minutes (13.75%); this correction does not reclassify a roadmap workstream.


## Latest question-bank diversity review — 2026-11-18

- Replaced the repeated U.S. Declaration of Independence date question in `US-HIS-004` with a distinct Gettysburg Address question in English (India), English (US) and Russian. The Library of Congress confirms Lincoln delivered the address at the cemetery dedication on 19 November 1863: https://guides.loc.gov/gettysburg-address.
- Stable ID, region, category, difficulty and correct-answer key were preserved. The three translations retain the same correct option identity.
- This is a targeted content-quality correction, not full content certification. No official validator, browser/runtime, CI, Android build or device QA was run.
- Baseline implementation remains 330 / 2,400 minutes (13.75%); no full workstream status or estimate changed.


## Latest U.S. history duplication and context review — 2026-11-18

- Replaced duplicate Louisiana Purchase coverage in `US-HIS-006` with the Nineteenth Amendment ratification question (18 August 1920), with all three locale variants preserving correct-answer key `d`.
- Explanations note that discriminatory laws continued to disenfranchise many women after ratification, particularly women of colour. Reference: U.S. National Archives, https://www.archives.gov/milestone-documents/19th-amendment.
- Stable question ID and metadata were preserved. This targeted change is not full content certification; validator, browser/runtime, CI, Android and device QA remain deferred.
- Baseline implementation remains 330 / 2,400 minutes (13.75%); no full workstream status or estimate changed.


## Latest U.S. history content review — 2026-11-18

- Removed duplicate Nineteenth Amendment coverage between `US-HIS-006` and `US-HIS-007`. The latter now tests the Fifteenth Amendment's ratification and voting-rights protection, with a historical caveat about continued disenfranchisement.
- Kept the stable question ID, metadata and correct-answer key; English (India), English (US) and Russian retain the same answer identity.
- Source: U.S. National Archives, https://www.archives.gov/milestone-documents/15th-amendment.
- Targeted source/content review only. No official validator, browser/runtime, CI, Android build or device QA was run; CI and Android validation remain deferred.
- No roadmap workstream status or estimate changed. Baseline implementation remains 330 / 2,400 minutes (13.75%); actual engineering time remains untracked.


## Latest mixed-language accessibility refinement — 2026-11-18

- Added language metadata to question prompts, answer choices, explanations and result-review passages so the question language remains programmatically identifiable when it differs from the interface language. Interface-language labels remain separately marked.
- The change follows WCAG 2.2 Success Criterion 3.1.2 guidance on identifying the language of passages: https://www.w3.org/WAI/WCAG22/Understanding/language-of-parts.
- Source-level implementation only; browser, screen-reader, official validator, CI, Android build and device testing remain pending. No conformance claim is made.
- No workstream estimate or status changed; estimate-weighted implementation remains 330 / 2,400 minutes (13.75%). Actual engineering time remains untracked.


## Latest local-persistence resilience review — 2026-11-18

- Storage writes now return an explicit success/failure result to the application layer. A failed settings or best-score write triggers a localized polite warning, while gameplay remains usable without storage.
- Help text no longer guarantees persistence unconditionally; it states that settings and best scores are saved on-device when browser storage is available. The change follows MDN's guidance to feature-detect storage availability and handle Storage.setItem exceptions.
- Source/documentation review only. Browser runtime, denied-storage simulation, official validator, CI, Android build and physical-device verification remain pending.
- No full workstream status or estimate changed. Baseline implementation remains 330 / 2,400 minutes (13.75%); actual engineering time remains untracked.


## Latest round-state integrity review — 2026-11-18

- Empty-pool recovery explicitly resets prior round data and disables the Next/Results action. Results processing now rejects empty, incomplete or not-yet-final rounds before answer review and best-score writes.
- These are defensive source-level safeguards; runtime gameplay verification and automated tests remain pending. The content validator, CI, Android build and device validation remain deferred until the agreed development batch is complete.
- No workstream status or estimate changed. Baseline implementation remains 330 / 2,400 minutes (13.75%); actual engineering time remains untracked.


## Baseline implementation reconciliation — 2026-11-18

The original 2,400-minute estimate has been decomposed into measurable implementation packages without changing any parent estimate. The earned-implementation column credits repository deliverables evidenced in source and documentation. Partial work packages receive partial credit; runtime validation, device testing, release tasks and unperformed work receive no credit. Detailed allocations and evidence rules are recorded in [BASELINE-RECONCILIATION.md](BASELINE-RECONCILIATION.md).

- **Earned implementation scope:** 1,265 / 2,400 minutes = **52.71%**.
- **Unimplemented or unverified baseline scope:** 1,135 / 2,400 minutes = **47.29%**.
- The previous 330-minute figure counted only two fully implemented workstreams. It understated partial implementation in other workstreams and is superseded by this deliverable-based reconciliation.
- This is estimate-weighted scope implementation, not actual engineering time, calendar duration, test pass rate or release readiness. Actual time remains untracked.
- Workstream status labels remain conservative: partial work remains In progress; implementation awaiting acceptance remains Review. No workstream is marked Complete solely because source code exists.


## Latest local-storage read-failure handling — 2026-11-18

- Changed the storage adapter's read contract to distinguish a successful missing-key result from a failed storage access. A missing key remains a normal first-run state; a thrown access error is now recorded as a persistence warning.
- Settings reads and best-score reads now surface the existing localized storage-unavailable notice when browser storage cannot be read. The app continues with safe defaults/no stored best score rather than crashing.
- This complements the earlier write-failure handling and avoids silently presenting inaccessible storage as an empty profile. Technical reference: MDN, [Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API), which explains that localStorage may be unavailable even when the API exists.
- Source-level change only. No browser runtime, denied-storage simulation, official content validator, CI, Android build or device QA was run. Baseline allocation unchanged; actual engineering time remains untracked.


## Latest gameplay navigation and round teardown review — 2026-11-18

- Centralized round teardown so an intentionally abandoned round clears its question list, score, answer history, feedback, progress display, answer controls and answer-review content.
- Empty-pool recovery now uses the same teardown path. Returning Home, following the brand-home link, or saving changed settings also discards hidden round data; opening Help or backing out of Settings without saving continues to preserve the current view/round.
- Added defensive checks so an answer callback cannot score against a stale question/translation, and the Next/Results action requires a non-empty round, an answered current question and a recorded answer at the current index.
- Re-fetched the committed application source and confirmed the teardown and guards are present. These are source-level checks only; no browser runtime, automated test, official content validator, CI, Android build or device QA was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline allocations remain unchanged at 1,265 / 2,400 minutes (52.71%); this targeted refinement is included in existing gameplay/navigation allocations, not counted as actual engineering time.


## Latest defensive question-render recovery — 2026-11-18

- Consolidated the no-playable-questions state into a shared recovery routine used both when a new round has no eligible questions and when an active round's current question fails its runtime integrity check.
- Before rendering, the app now verifies that the round is an array, the current index is an in-range integer, and the selected question still passes the existing region/category/difficulty/answer/translation/content checks. Invalid state is discarded and the player receives the existing localized Settings recovery path rather than a rendering exception.
- Re-fetched the committed source and confirmed six targeted source checks. MDN documents the standard semantics of [Array.isArray()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray) and [Number.isInteger()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger), used for the type and index guards.
- Source inspection only: no browser runtime, automated test, official content validator, CI, Android build or device QA was run. CI and Android validation remain deferred until the agreed development freeze.
- No roadmap estimate or earned allocation changed. Baseline implementation remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%).


## Latest answer-ledger integrity review — 2026-11-18

- Replaced the minimal final-round completion check with a complete answer-ledger validation before results are displayed or best scores are persisted.
- The gate now revalidates every question against the active settings, checks the answer-history length and each record's selected/correct answer identity, verifies the captured option and explanation snapshots against the active localized question, checks the correctness flag, and recomputes the score from the answer ledger.
- Results review and best-score persistence are reached only after the complete ledger matches the recorded score. This reduces the chance that malformed, stale or internally inconsistent answer state is treated as a completed round.
- Re-fetched the committed source and confirmed ten targeted source checks. No browser runtime, automated test, official content validator, CI, Android build or device QA was run. CI and Android validation remain deferred until the agreed development freeze.
- No roadmap estimate or earned allocation changed: 1,265 / 2,400 minutes (52.71%) implemented; 1,135 minutes (47.29%) remain. Actual engineering time remains untracked.


## Latest invalid-round recovery UX refinement — 2026-11-18

- Extended the shared recovery view so it can present distinct localized messages for an empty question selection and an internally inconsistent completed round.
- If the complete answer-ledger integrity gate rejects a round, the app now clears the invalid round and presents a clear recovery message directing the player to Settings to begin again, rather than silently leaving the final quiz screen stuck.
- Added the recovery title and guidance in English (India), English (US) and Russian. Recovery text follows the selected interface language, while the question bank and question language remain unchanged.
- Technical accessibility reference: W3C WCAG 2.2 Technique H58 explains using HTML language attributes to identify passages in a different language; the existing recovery status uses the selected interface locale. Reference: https://www.w3.org/WAI/WCAG22/Techniques/html/H58.
- A post-commit source consistency check caught one stale reference to the former recovery function name; it was corrected in a follow-up commit before final verification. The final re-fetch confirmed ten targeted checks, including no stale function references and correct recovery routing for empty pools, invalid active questions and invalid answer ledgers.
- Source-level verification only. No browser runtime, automated test, official content validator, CI, Android build or device QA was run. CI and Android validation remain deferred until the agreed development freeze.
- No roadmap estimate or earned allocation changed: 1,265 / 2,400 minutes (52.71%) implemented; 1,135 minutes (47.29%) remain. Actual engineering time remains untracked.


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
