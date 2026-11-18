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
- Replay selection now tracks question IDs across a session-local cycle: every eligible question is presented once before any question is reused, while each round remains capped at its selected length (5, 10 or 15 distinct questions). When fewer unseen questions remain than the selected round length, all remaining unseen questions are included and the round is filled with previously seen questions; a changed eligible pool starts a fresh cycle.
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

The full 50-question-per-region content target is populated. A bounded cross-locale factual review of all 150 IDs / 450 localized records is complete; exhaustive independent verification of every explanation/distractor and professional native-speaker/cultural editorial acceptance remain outstanding. Gameplay source review has hardened persisted best-score parsing against malformed or out-of-range values. Initial interface copy and accessible navigation labels are localized for the three interface locales; runtime localization acceptance remains open. The Android shell is not yet a release-ready signed package.

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
- Targeted review of gameplay, result rendering, settings flow, HTML structure, CSS and Android WebView configuration is complete for that pass. It is not a complete source audit; runtime localization/accessibility acceptance and Android build readiness remain open. The bounded 150-record cross-locale factual review was subsequently completed in batches 1–10.

## Latest content milestone

- Completed the 150-question content target: 50 questions per region and 450 localized records across English (India), English (US) and Russian. Each region has 13 Geography, 12 History, 12 Science and 13 Culture questions, with 15 easy, 20 medium and 15 hard. Static source inventory checks confirmed coverage. Bounded cross-locale factual review is now complete; exhaustive independent explanation/distractor verification and professional native-speaker/cultural editorial acceptance remain outstanding.

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

- Aligned the question-bank source header and README with the delivered 150 IDs / 450 localized variants. Subsequent bounded factual review of all 150 IDs is recorded in batches 1–10; native-speaker and cultural editorial acceptance remain release gates.
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
- Added round-selection postconditions after shuffle/slice: the selected round must contain the expected number of questions (the selected 5, 10 or 15, capped by pool size), have unique stable IDs and still pass the all-locale runtime integrity gate before play begins. Any failure uses the existing localized integrity recovery path.
- MDN explains that visually equivalent Unicode strings may use different code-point sequences and that NFC normalization converts canonically equivalent sequences to a common form: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize.
- Source-level verification only; no official validator, browser runtime, CI, Android build or device QA was run. CI and Android validation remain deferred until the agreed development freeze.
- No earned allocation changed: baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. Actual engineering time remains untracked.


## Runtime duplicate-prompt pool guard — 2026-11-18

- Added a pre-shuffle duplicate-prompt check across the complete eligible pool, separately for \`en-IN\`, \`en-US\` and \`ru-RU\`. Prompt text is normalized using NFC, trimmed, whitespace-folded and locale-aware case folding before comparison.
- The check runs before randomization, so a duplicate stable question identity/content pair cannot be hidden by selecting a different subset for one particular round. The existing localized integrity-recovery route handles a collision.
- This is a defensive runtime layer; the official question-bank validator remains the primary whole-bank structural gate and its execution is still deferred. This source-only batch did not run browser tests, CI, Android builds or device QA.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining; no additional allocation was claimed. Actual engineering time remains untracked.


## Completed-round answer-ledger schema hardening — 2026-11-18

- The final-round integrity gate now requires each answer-history entry to contain exactly the five fields written by the gameplay flow: choice, correct, explanation, isCorrect and options.
- The captured options object must contain exactly a, b, c and d; the existing checks still compare every captured option and explanation with the active localized question and recompute the score.
- This narrows the accepted in-memory result shape and prevents unexpected fields or malformed option maps from being treated as a valid completed round. It does not change scoring, question content or persistence format.
- Source re-fetch verification is pending in this batch. No parser, browser runtime, official content validator, CI, Android build or device test is run; CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). Actual engineering time remains untracked.


## Question-bank ID taxonomy validation — 2026-11-18

- Extended the dependency-free question-bank validator to enforce the same stable-ID taxonomy used by the runtime: the three-letter region prefix and category code must agree, followed by a three-digit sequence (for example, IN-GEO-001).
- This catches records whose region prefix is plausible but whose category-coded identity is inconsistent before the bank is packaged. It does not validate historical accuracy, translation quality or semantic equivalence.
- Validator source updated in commit c02d3fd. The validator was not executed; no CI, Android build or device validation was run.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. No earned allocation changed; actual engineering time remains untracked.


## Answer-history option snapshot isolation — 2026-11-18

- Answer capture now stores a shallow snapshot of the four localized option strings instead of retaining the question-bank options object by reference.
- The completed-round integrity gate can therefore compare the recorded answer-time option values with the active question data without both sides sharing the same mutable object reference.
- This does not alter question content, displayed choices, scoring, localization or persistence. It strengthens the evidence captured for result review and integrity verification.
- App commit: 17ae826. Source/documentation re-fetch verification pending. No runtime test, CI, official validator or Android validation was run.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). No baseline credit added; actual engineering time remains untracked.


## Streak-summary integrity verification — 2026-11-18

- The completed-round answer-ledger gate now independently recomputes the current consecutive-correct streak and the maximum streak reached during the round.
- Both derived values must match the live `currentStreak` and `bestStreak` state before results are displayed or a best score is persisted. This prevents an inconsistent streak summary from being presented as a verified round result.
- The calculation uses the already-validated per-question correctness entries; it does not affect points, accuracy, question selection or storage.
- App commit: 2699ae0. Source/documentation re-fetch verification pending. No runtime test, CI, official validator or Android validation was run.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). No baseline credit added; actual engineering time remains untracked.


## MVP documentation alignment — 2026-11-18

- Corrected the README MVP summary to describe the implemented 5-, 10- and 15-question round-length choices instead of the superseded fixed ten-question description.
- This is documentation alignment only. It adds no feature, acceptance criterion, workstream or baseline allocation.
- No application source changed; no validator, CI, Android build or device validation was run.
- Baseline remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining. Actual engineering time remains untracked.


## Help fallback wording alignment — 2026-11-18

- Corrected the static HTML fallback text in the Help guide so it describes the selected round length, rather than claiming a fixed ten-question maximum. The live localized dictionaries already described the selected length; this aligns the pre-localization markup fallback with actual 5/10/15 behaviour.
- Documentation/markup alignment only; no new product scope or baseline allocation. No runtime, validator, CI, Android build or device validation was run.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining allocation remains 1,135 minutes (47.29%). Actual engineering time remains untracked.


## Keyboard focus visibility — 2026-11-18

- Added an explicit `:focus-visible` outline to the home brand link. Existing focus styling covered buttons and selects but not the brand anchor, leaving this keyboard-operable navigation link without the same visible focus treatment.
- The new outline uses the existing accent contrast token and does not change layout or introduce a new component. This is a bounded accessibility refinement within the existing accessibility workstream.
- Source/documentation change only. No browser, screen-reader, parser, official validator, CI, Android build or device test was run. Baseline allocation remains 1,265 / 2,400 minutes (52.71%), with 1,135 minutes (47.29%) remaining; actual engineering time remains untracked.


## Forced-colors accessibility fallback — 2026-11-18

- Added a `forced-colors: active` CSS treatment for the existing game interface. It uses system colours for primary/secondary controls, answer choices, cards, selectors, score panel and keyboard-focus outlines so operating-system high-contrast palettes can retain visible boundaries and readable foregrounds.
- Correct and incorrect answers retain distinct non-colour-only cues: a solid Highlight border for correct and a dashed CanvasText border for incorrect. Feedback/status text uses CanvasText rather than depending on the normal theme's accent colours.
- This is an accessibility refinement within the existing workstream, not a new product feature. CSS source/documentation checks only; no browser forced-colors simulation, assistive-technology test, parser, official validator, CI, Android build or device test was run.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining allocation remains 1,135 minutes (47.29%). Actual engineering time remains untracked; no additional baseline credit claimed.

## Latest Android visual-identity refinement — 2026-11-18

- Added a lightweight vector launcher icon using the existing MindQuest dark, mint and gold palette, and referenced it as both the standard and round application icon in the Android manifest. The icon is a native resource and adds no image asset pipeline, dependency or runtime service.
- This closes the missing launcher-icon source asset only. Adaptive-icon masking, launcher rendering across Android versions and installed-device appearance still require Android build/device QA. No CI or Android build was run.


## Native Android launch presentation — 2026-11-18

- Added a branded pre-Android 12 launch background using the existing dark-navy, mint and gold launcher identity.
- Added an Android 12+ system splash configuration using the existing vector launcher mark and the same dark-navy background; the system transitions to the regular application theme after the splash.
- Added shared native application colors and themes, assigned the launch theme to the launcher activity, and explicitly switches to the regular app theme before the Activity creates its WebView.
- This completes the source-level splash integration within the existing visual-identity and Android-shell scope. No new platform, service, dependency, permission or release requirement was added.
- Source files committed. No Gradle build, resource compilation, APK inspection, Android 12 splash rendering, emulator or physical-device test was run. The Android resource/theme integration remains unverified at runtime; CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). No additional baseline credit is claimed pending build and visual validation. Actual engineering time remains untracked.


## Android WebView boundary and lifecycle review — 2026-11-18

- Tightened top-level navigation from a broad APK-assets path prefix to the single bundled entry document, `file:///android_asset/index.html`. Hash-based in-app state remains allowed because it does not change the document path; non-entry-point top-level destinations and subframe navigations are blocked.
- Explicitly disabled WebView content debugging, retained the existing no-pop-up / no-multiple-window and origin-access restrictions, and added Activity pause/resume handling for WebView rendering and timers.
- WebView shutdown now stops loading, pauses the view, removes child views and destroys the instance without initiating a final blank-page navigation.
- This is a bounded hardening of the existing offline WebView shell; it adds no dependency, permission, service, network capability or product scope.
- Source-only review and re-fetch verification; no Kotlin compilation, Gradle build, APK inspection, runtime navigation test, emulator or physical-device test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). No additional baseline credit is claimed pending build and runtime validation. Actual engineering time remains untracked.


## Android system back integration — 2026-11-18

- Added Android 13+ platform `OnBackInvokedDispatcher` handling for the committed system-back action through `OnBackInvokedCallback`. It navigates WebView history when available and finishes the Activity otherwise; no custom `OnBackAnimationCallback` gesture-progress animation is implemented.
- Retained the legacy `onBackPressed()` path for Android 6.0–12 and unregisters the API 33+ callback during Activity destruction.
- Uses platform APIs only; no dependency, permission, service or product scope was added.
- Source-only implementation and re-fetch verification; no Kotlin compilation, Gradle build, emulator, gesture-navigation or physical-device test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). No additional baseline credit is claimed pending build and device validation. Actual engineering time remains untracked.


## Android 15 edge-to-edge safe-area handling — 2026-11-18

- Added API 35+ `WindowInsets` handling to the WebView container, applying system-bar and display-cutout insets as content padding. This addresses edge-to-edge enforcement for the app's target SDK 35 without changing the web game source.
- The listener is gated to API 35+ and uses platform APIs only; no AndroidX dependency, permission, service or product scope was added.
- Source-only implementation and re-fetch verification; no Kotlin compilation, Gradle/resource build, emulator, gesture-navigation, cutout, keyboard/IME or physical-device test was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). No additional baseline credit is claimed pending build and device validation. Actual engineering time remains untracked.


## Android 15 keyboard inset integration — 2026-11-18

- Extended the existing API 35+ WebView safe-inset calculation to include `WindowInsets.Type.ime()` alongside system bars and display cutouts. This keeps the game content area responsive to the on-screen keyboard under edge-to-edge layout.
- No new dependency, permission, service or product scope. This remains a source-level integration change; keyboard animation, focus and resize behaviour require runtime verification.
- No Kotlin compilation, Gradle build, emulator or physical-device testing was run. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). No additional baseline credit is claimed pending build and device validation. Actual engineering time remains untracked.


## Android Gradle project defaults — 2026-11-18

- Added `android/gradle.properties` with UTF-8 Gradle JVM configuration, a 2 GB heap setting, AndroidX project flag and official Kotlin code style.
- Recorded the existing Android Gradle Plugin 8.7.3 / Kotlin 2.0.21 pairing and Gradle 8.9 wrapper target in Android build documentation. Wrapper scripts and wrapper JAR remain absent; no claim of a reproducible wrapper build is made.
- No dependency, permission, service or product scope was added. No Gradle build or Android validation was run; CI remains deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). No additional baseline credit is claimed pending a successful build and runtime acceptance. Actual engineering time remains untracked.


## Predictive-back manifest alignment — 2026-11-18

- Explicitly enabled `android:enableOnBackInvokedCallback` on the application manifest to align Android 13+ system back dispatch with the existing `OnBackInvokedDispatcher` callback. Older supported Android versions ignore the API 33 manifest attribute.
- No dependency, permission or product scope added. Source-level manifest verification only; Android resource/manifest merge and gesture behaviour remain untested until the agreed validation phase.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). No additional baseline credit claimed pending build and runtime acceptance. Actual engineering time remains untracked.


## Adaptive launcher icon resources — 2026-11-18

- Added a foreground-only vector mark and an Android 8.0+ adaptive icon resource, with a matching `mipmap-anydpi` vector fallback for the minimum supported API 23–25 range.
- Updated the manifest to reference the version-qualified `@mipmap/ic_launcher` resource for both launcher icon attributes. Existing splash artwork is retained.
- This is source-level resource integration only; AAPT resource compilation, APK inspection, launcher masking and device rendering remain unverified. CI and Android validation remain deferred until the agreed development freeze.
- Baseline remains 1,265 / 2,400 minutes (52.71%); remaining scope remains 1,135 minutes (47.29%). No additional baseline credit claimed pending build and runtime acceptance. Actual engineering time remains untracked.


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


### English question wording and answer-alignment review — 2026-11-18

- Reviewed all 150 English question variants (75 `en-IN` and 75 `en-US`) against their marked correct-answer options, with attention to prompt scope, grammar, regional spelling conventions and obvious question/answer mismatches.
- No clear English prompt-to-answer mismatch or wording defect justified an edit in this pass. Existing differences such as `colour/color`, `programme/programme` usage and date formatting were retained where they reflect the intended locale style; no stable IDs, answer keys, options, translations or question counts were changed.
- This was a targeted source review, not an independent fact-check of every explanation or distractor, a full factual audit, or native-editorial review. The official content validator, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.


### Question-bank factual consistency review — batch 1 (2026-11-18)

- Reviewed the first 15 stable question records: `IN-GEO-001`, `IN-HIS-001`, `IN-SCI-001`, `RU-GEO-001`, `RU-GEO-002`, `RU-CUL-001`, `US-GEO-001`, `US-HIS-001`, `US-SCI-001`, `IN-GEO-002`, `IN-SCI-002`, `RU-SCI-001`, `RU-HIS-001`, `US-GEO-002`, and `US-HIS-002`.
- Cross-checked key factual claims against primary or institutional references where available: ISRO records Aryabhata as India's first satellite, launched 19 April 1975; the U.S. National Archives dates the Louisiana Purchase treaty to 30 April 1803; the U.S. Department of State historical record dates the Treaty of Brest-Litovsk to 3 March 1918; NobelPrize.org confirms Lev Landau's 1962 Physics Prize; and the U.S. National Park Service identifies the Colorado River as the river that carved the Grand Canyon.
- No clear error in the reviewed question, marked correct answer, or explanation was found that justified a source edit. No question IDs, options, answer keys, translations, or distributions changed.
- This is a bounded review of 15 records, not a complete fact-check of the remaining 135 records, all distractors, or all translations. The official validator, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.
- Reference URLs: https://www.isro.gov.in/aryabhata_1.html ; https://www.archives.gov/milestone-documents/louisiana-purchase-treaty ; https://history.state.gov/historicaldocuments/frus1918Russiav01/d443 ; https://www.nobelprize.org/prizes/lists/all-nobel-prizes/ ; https://www.nps.gov/grca/learn/nature/grca-geology.htm


### Question-bank factual consistency review — batch 2 (records 16–30) — 2026-11-18

- Reviewed the next 15 records in question-bank source order: `IN-CUL-001`, `IN-GEO-003`, `RU-HIS-002`, `RU-CUL-002`, `US-CUL-001`, `US-SCI-002`, `IN-HIS-002`, `IN-CUL-002`, `RU-GEO-003`, `RU-SCI-002`, `US-GEO-003`, `US-SCI-003`, `IN-GEO-004`, `IN-HIS-003`, and `RU-GEO-004`. Checked the three locale prompts, marked correct answers, explanations and plausible distractors for factual fit, ambiguity and translation alignment.
- Institutional and specialist cross-checks supported the reviewed facts: Bharatanatyam's association with Tamil Nadu; Rajasthan as India's largest state by area; Yuri Gagarin's first human spaceflight on 12 April 1961; Tchaikovsky's authorship of *Swan Lake*; New Orleans' recognised role in jazz origins; Perseverance's landing in Jezero Crater on 18 February 2021; adoption and commencement dates of India's Constitution; Baisakhi and the Khalsa's 1699 founding; the Volga as Europe's longest river; Sputnik 1 as the first artificial Earth satellite; Alaska as the largest U.S. state by area; Apollo 11's first crewed lunar landing in 1969; Chilika's location in Odisha and connection to the Bay of Bengal; the Lahore Congress session and Purna Swaraj; and the conventional Ural Mountains Europe–Asia boundary.
- No clear factual error, answer mismatch, misleading explanation or distractor defect justified a question-bank edit in this batch. Stable IDs, four-option sets, correct keys, translations, counts and distributions remain unchanged. The New Orleans wording is appropriately qualified as “widely recognised”; the Europe–Asia boundary wording remains explicitly conventional rather than absolute.
- This is a bounded 15-record source review, not an exhaustive independent verification of every distractor, every explanation, or native-speaker acceptance. The official `npm run validate:content`, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.
- Reference URLs: https://sathee.iitk.ac.in/sathee-railway-exams/student-corner/general-knowledge/indian-culture/classical-dances/ ; https://rising.rajasthan.gov.in/rajasthan-factfile ; https://science.nasa.gov/resource/yuri-gagarin-first-human-in-space/ ; https://home.nps.gov/jazz/learn/historyculture/history_early.htm ; https://science.nasa.gov/mission/mars-2020-perseverance/location-map/ ; https://www.legislative.gov.in/static/uploads/2025/08/7af1daa22d65f9d04c00ae9b9aa5a799.pdf ; https://sgpc.net/ten-guru-sahibs/guru-gobind-singh-sahib/ ; https://education.nationalgeographic.org/resource/understanding-rivers/ ; https://www.nasa.gov/history/dawn-of-the-space-age/ ; https://www.usgs.gov/publications/alaska ; https://www.nasa.gov/mission/apollo-11/ ; https://www.chilika.com/chilika-at-a-glance.php ; https://inc.in/brief-history-of-congress/1925-1935 ; https://digitallibrary.un.org/nanna/record/763977/files/The-Regional-Impact.pdf


### Question-bank factual consistency review — batch 3 (records 31–45) — 2026-11-18

- Reviewed the next 15 source-order records: `RU-CUL-003`, `US-GEO-004`, `US-CUL-002`, `IN-CUL-003`, `IN-SCI-003`, `RU-HIS-003`, `RU-SCI-003`, `US-HIS-003`, `US-SCI-004`, `IN-GEO-005`, `IN-HIS-004`, `RU-GEO-005`, `RU-HIS-004`, `US-GEO-005`, and `US-CUL-003`. Reviewed all en-IN, en-US and ru-RU prompts, marked correct answers, explanations and plausible distractors for factual fit and translation alignment.
- Institutional cross-checks confirmed: Lake Michigan is the only Great Lake entirely within the United States; the Konark Sun Temple represents Surya and dates to the 13th century; C. V. Raman received the 1930 Physics Prize for work on light scattering; Peter the Great founded Saint Petersburg in 1703; Ivan Pavlov's 1904 Nobel recognition concerned digestive physiology; Yellowstone was established in 1872 as the world's first national park; the Wright brothers' first powered flights took place at Kitty Hawk on 17 December 1903; Kaziranga is in Assam and protects the world's largest population of one-horned rhinoceroses; Womesh Chandra Bonnerjee presided over the first Indian National Congress session in Bombay in 1885; Denali is Alaska's highest peak and its official elevation is 20,310 feet; and Walt Whitman's *Leaves of Grass* first appeared in 1855.
- The reviewed Russian geography and culture records also align with the source facts: the Valley of Geysers is within the Kamchatka/Kronotsky protected area; Saint Petersburg's founding date is 1703; and Woland is a character in Bulgakov's *The Master and Margarita*. The checked Russian Emancipation Manifesto entry retains Alexander II as the emperor associated with the 1861 emancipation.
- No clear factual error, marked-answer mismatch, misleading explanation, translation-alignment defect or distractor issue justified editing this batch. IDs, answer keys, four-option sets, translations, question counts and category/difficulty distributions remain unchanged.
- This is a bounded 15-record source review, not a complete independent audit of every distractor or explanation, nor professional native-speaker acceptance. The official `npm run validate:content`, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.
- Reference URLs: Great Lakes Commission https://www.glc.org/lakes/lake-michigan ; UNESCO Konârak Sun Temple https://whc.unesco.org/en/list/246/ ; NobelPrize.org Raman https://data.nobelprize.org/resource/nobelprize/Physics/1930 ; Saint Petersburg Encyclopaedia https://www.encspb.ru/object/2804035580?dv=2853931022&lc=en ; NobelPrize.org Pavlov https://www.nobelprize.org/prizes/medicine/1904/pavlov/lecture/ ; U.S. National Park Service Yellowstone https://www.nps.gov/yell/planyourvisit/parkfacts.htm ; Library of Congress Wright timeline https://www.loc.gov/collections/wilbur-and-orville-wright-papers/articles-and-essays/the-wilbur-and-orville-wright-timeline-1846-to-1948/1901-to-1910/ ; UNESCO Kaziranga https://whc.unesco.org/en/list/00337/ ; Indian National Congress session record https://inc.in/inc-sessions ; UNESCO Volcanoes of Kamchatka https://whc.unesco.org/en/list/0765/maps/ ; USGS Denali elevation https://www.usgs.gov/news/national-news-release/new-elevation-nations-highest-peak ; Library of Congress Walt Whitman exhibition https://www.loc.gov/exhibits/whitman/leavesofgrass.html ; NobelPrize.org Raman award list https://www.nobelprize.org/prizes/lists/all-nobel-prizes/all/ ; SGPC Guru Gobind Singh biography https://new.sgpc.net/ten-guru-sahibs/guru-gobind-singh-sahib/ .


### Question-bank factual consistency review — batch 4 (records 46–60) — 2026-11-18

- Reviewed the next 15 source-order records: `IN-HIS-005`, `IN-SCI-004`, `IN-SCI-005`, `IN-CUL-004`, `IN-CUL-005`, `RU-HIS-005`, `RU-SCI-004`, `RU-SCI-005`, `RU-CUL-004`, `RU-CUL-005`, `US-HIS-004`, `US-HIS-005`, `US-SCI-005`, `US-CUL-004`, and `US-CUL-005`, across en-IN, en-US and ru-RU. Review covered each prompt, marked answer, explanation and plausible distractor options.
- Cross-checked selected claims against institutional and specialist references: Gandhi Heritage Portal on the Salt March departure from Sabarmati Ashram; ISRO and NASA on Chandrayaan-3's 23 August 2023 landing near the lunar south pole; MacTutor History of Mathematics on the Hardy–Ramanujan 1729 anecdote; the Government of India's Ministry of External Affairs encyclopedia on the traditional Bharata attribution for the `Natya Shastra`; ESA on Valentina Tereshkova; the Royal Society of Chemistry on Mendeleev's periodic system; NASA on Luna 9; Penguin Random House on Turgenev's `Fathers and Sons`; Library of Congress on `The Firebird`; the Library of Congress on the Gettysburg Address; U.S. National Archives on the 13th Amendment; NASA on Hubble's launch; and the U.S. National Park Service on the Gateway Arch.
- A terminology refinement was made to `RU-SCI-005` after comparing NASA's current lunar-mission references: the en-IN, en-US and ru-RU prompts/explanations now describe Luna 9 as the first spacecraft to survive a lunar landing and transmit surface photographs. This avoids conflating Luna 9's first survivable landing with NASA's separate “first true soft-landing” description for Surveyor 1. The stable ID, region, category, difficulty, four options and correct key `d` are unchanged. Reference: https://science.nasa.gov/deep-space-exploration/ ; https://science.nasa.gov/mission/surveyor-1/ .
- No other clear factual error, marked-answer mismatch, misleading explanation, translation-alignment defect or distractor issue justified an edit. All 15 records retain their stable IDs, correct-answer keys, four-option sets and three localized variants. Question counts and category/difficulty distributions remain unchanged.
- This is a bounded 15-record review, not a complete independent audit of every distractor or explanation, nor professional native-speaker acceptance. The official `npm run validate:content`, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.
- References: https://www.gandhiheritageportal.org/gandhi_heritage_site/writeup/MzY%3D ; https://www.isro.gov.in/NSPD2024/index.html ; https://science.nasa.gov/mission/chandrayaan-3/ ; https://mathshistory.st-andrews.ac.uk/Biographies/Hardy/quotations/ ; https://www.mea.gov.in/images/pdf/India-ChinaEncyclopedia_Vol-2.pdf ; https://www.esa.int/articles/about-us/who-we-are/history/first-woman-in-space-valentina ; https://periodic-table.rsc.org/history/about ; https://science.nasa.gov/moon/missions/ ; https://www.penguinrandomhousehighereducation.com/book/?isbn=9780307430953 ; https://www.loc.gov/collections/ballets-russes-de-serge-diaghilev/articles-and-essays/works-listing-by-title/f/ ; https://www.loc.gov/item/today-in-history/november-19/ ; https://www.archives.gov/milestone-documents/13th-amendment ; https://science.nasa.gov/mission/hubble/overview/hubble-timeline/hubble-history-timeline-full-text/ ; https://www.nps.gov/jeff/learn/historyculture/index.htm .


### Question-bank factual consistency review — batch 5 (records 61–75) — 2026-11-18

- Reviewed the next 15 source-order records: `IN-GEO-006`, `IN-GEO-007`, `IN-HIS-006`, `IN-SCI-006`, `IN-CUL-006`, `RU-GEO-006`, `RU-GEO-007`, `RU-HIS-006`, `RU-SCI-006`, `RU-CUL-006`, `US-GEO-006`, `US-GEO-007`, `US-HIS-006`, `US-SCI-006`, and `US-CUL-006`, across en-IN, en-US and ru-RU. Review covered prompts, marked answers, explanations and plausible distractors.
- Cross-checked selected claims against UNESCO and government/institutional sources: Sundarbans geography and West Bengal location; UNESCO on the Western Ghats and Ajanta; UNESCO on Akbar and Fatehpur Sikri; ISRO headquarters; the Black Sea coast at Sochi; Smithsonian Global Volcanism Program on Elbrus; Russian Naval Museum on the lifting of the Leningrad siege; NASA on Salyut 1; the U.S. International Boundary and Water Commission on the Rio Grande; U.S. National Park Service on the Grand Canyon; U.S. National Archives on the 19th Amendment; NASA on Alan Shepard's Freedom 7 flight; and the U.S. National Park Service on Maya Lin's memorial design.
- One narrow Russian terminology refinement was made without changing question meaning or correct-answer identity: `RU-GEO-007` now translates English `dormant volcano` as `спящий вулкан` rather than `потухший вулкан`. The earlier NASA terminology refinement to `RU-SCI-005` remains preserved in the source. All 15 reviewed records retain their stable IDs, region/category/difficulty assignments, four options and answer keys. Question counts and distributions are unchanged.
- No other clear factual error, marked-answer mismatch, misleading explanation or distractor issue justified an edit. This is a bounded 15-record review, not a complete independent audit of every distractor or explanation, nor professional native-speaker acceptance. The official `npm run validate:content`, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.
- References: UNESCO Sundarbans https://whc.unesco.org/en/list/452 ; Government of India Ministry of Culture, Sundarbans National Park https://culture.gov.in/sundarbans-national-park ; UNESCO Western Ghats https://whc.unesco.org/en/list/1342 ; UNESCO Ajanta Caves https://whc.unesco.org/en/list/242 ; UNESCO Fatehpur Sikri https://whc.unesco.org/en/list/255 ; ISRO profile https://www.isro.gov.in/ISRO_EN/profile.html ; Smithsonian Global Volcanism Program, Elbrus https://volcano.si.edu/volcano.cfm?vn=214010 ; Russian Naval Museum https://eng.navalmuseum.ru/main_exposition/victory ; NASA Salyut 1 history https://www.nasa.gov/missions/station/50-years-ago-launch-of-salyut-the-worlds-first-space-station/ ; U.S. International Boundary and Water Commission https://www.ibwc.gov/about-us/ ; U.S. National Park Service, Arizona https://www.nps.gov/state/az/index.htm ; U.S. National Archives, 19th Amendment https://www.archives.gov/milestone-documents/19th-amendment ; NASA, Alan Shepard https://www.nasa.gov/history/may-5-1961-alan-shepard-becomes-the-first-american-in-space/ ; U.S. National Park Service, Vietnam Veterans Memorial https://home.nps.gov/places/000/vietnam-veterans-memorial.htm ; Southern Federal University Elbrus expert commentary https://sfedu.ru/press-center/news/70413 .


### Question-bank factual consistency review — batch 6 (records 76–90) — 2026-11-18

- Reviewed the next 15 source-order records: `IN-GEO-008`, `IN-HIS-007`, `IN-HIS-008`, `IN-SCI-007`, `IN-CUL-007`, `RU-GEO-008`, `RU-HIS-007`, `RU-HIS-008`, `RU-SCI-007`, `RU-CUL-007`, `US-GEO-008`, `US-HIS-007`, `US-HIS-008`, `US-SCI-007`, and `US-CUL-007`, across en-IN, en-US and ru-RU. Review covered prompts, marked answers, explanations and plausible distractors.
- Cross-checked selected claims against institutional and specialist references: Government of India's Central Water Commission on the Narmada; Indian National Congress on the Quit India Movement; Oxford Academic and the National Army Museum on Plassey; Government of India science resources and the University of Dhaka on Satyendra Nath Bose; Sangeet Natak Akademi on Sattriya; reference sources on the Kola Peninsula and the Gregorian/Julian calendar distinction; the National Library of Russia and Cambridge University Press on Napoleon's 1812 invasion; the State Russian Museum on Malevich's `Black Square`; U.S. National Park Service and state geological sources on the Appalachians; U.S. National Archives on the 15th Amendment; U.S. National Park Service and Army Center of Military History on the Civil War's 1865 conclusion; WHO and the Salk Institute on Jonas Salk's vaccine; and MoMA on Pollock and Abstract Expressionism.
- No clear factual error, marked-answer mismatch, misleading explanation, translation-alignment defect or distractor issue justified a content edit. All 15 records retain their stable IDs, region/category/difficulty assignments, four-option sets, correct keys and three localized variants. Question counts and distributions remain unchanged.
- This is a bounded 15-record review, not a complete independent audit of every distractor or explanation, nor professional native-speaker acceptance. The official `npm run validate:content`, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.
- References: https://www.cwc.gov.in/sites/default/files/reportwaterresourcesassessmentofindia2024_1.pdf ; https://inc.in/brief-history-of-congress/1935-1945 ; https://academic.oup.com/reference/62399/reference-article-abstract/555388136 ; https://www.nam.ac.uk/explore/battle-plassey ; https://www.indiascienceandtechnology.gov.in/listingpage/satyendra-nath-bose-pioneer-quantum-statistics-and-condensed-matter-physics ; https://www.du.ac.bd/notableAlumni/154/103 ; https://sangeetnatak.gov.in/centres-of-the-akademi/sattriya-kendra ; https://www.encyclopedia.com/reference/encyclopedias-almanacs-transcripts-and-maps/kola-peninsula ; https://www.degruyterbrill.com/document/doi/10.1515/9783110646238-202/pdf?licenseType=free ; https://expositions.nlr.ru/ve/RA5851/to-be-napoleon-each-wishes ; https://assets.cambridge.org/97805218/75424/excerpt/9780521875424_excerpt.pdf ; https://rmgallery.rusmuseumvrm.ru/en/189 ; https://www.dnr.sc.gov/geology/pdfs/education/Landforms.pdf ; https://www.archives.gov/milestone-documents/15th-amendment ; https://www.nps.gov/apco/learn/historyculture/surrender-events-after-appomattox.htm ; https://history.army.mil/Publications/Publications-Catalog/The-Civil-War-Ends-1865/ ; https://www.who.int/news-room/spotlight/history-of-vaccination/history-of-polio-vaccination ; https://www.salk.edu/about/history-of-salk/jonas-salk/ ; https://www.moma.org/collection/terms/abstract-expressionism/the-processes-and-materials-of-abstract-expressionist-painting .


### Question-bank factual consistency review — batch 7 (records 91–105) — 2026-11-18

- Reviewed the next 15 source-order records: `IN-GEO-009`, `IN-HIS-009`, `IN-SCI-008`, `IN-SCI-009`, `IN-CUL-008`, `RU-GEO-009`, `RU-HIS-009`, `RU-SCI-008`, `RU-SCI-009`, `RU-CUL-008`, `US-GEO-009`, `US-HIS-009`, `US-SCI-008`, `US-SCI-009`, and `US-CUL-008`, across en-IN, en-US and ru-RU. Review covered prompts, marked answers, explanations and plausible distractors.
- Selected claims were cross-checked against institutional references: UNESCO and India's Ministry of Culture on the Valley of Flowers; UNESCO and Bihar's Nalanda district administration on Nalanda Mahavihara; Indian National Science Academy and the Indian National Science Academy's journal on Meghnad Saha; ISRO on SLV-3 and Rohini RS-1; Indira Gandhi National Centre for the Arts on Purandara Dasa; U.S. Department of State on the Soviet Union's dissolution; NASA on Luna 3; the State Hermitage Museum on its Saint Petersburg location; the State of Hawaii's official archives on the Aloha State nickname; U.S. National Archives on the 1787 Constitution; U.S. National Park Service on Oppenheimer's Los Alamos directorship; NASA on New Horizons; and the National Endowment for the Arts on Mark Twain's 1876 publication.
- The Lomonosov item was reviewed with historical care: its current wording says he described conservation of mass in chemical transformations, rather than claiming an uncontested sole discovery or priority. The historical relationship between Lomonosov and Lavoisier is debated in specialist historiography; no stronger priority claim was introduced.
- No clear factual error, marked-answer mismatch, misleading explanation, translation-alignment defect or distractor issue justified a content edit. All 15 records retain stable IDs, region/category/difficulty assignments, four-option sets, correct keys and three localized variants. Counts and distributions remain unchanged.
- This is a bounded 15-record review, not a complete independent audit of every distractor or explanation, nor professional native-speaker acceptance. Official `npm run validate:content`, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.
- References: https://whc.unesco.org/en/list/335/ ; https://culture.gov.in/nanda-devi-and-valley-flowers-national-parks ; https://whc.unesco.org/en/list/1502/ ; https://nalanda.nic.in/en/history/ ; https://insaindia.res.in/07062023_no.php?id=F00-0688 ; https://insa.nic.in/writereaddata/UpLoadedFiles/IJHS/Vol53_4_2018__Art11.pdf ; https://www.isro.gov.in/SLV.html ; https://www.isro.gov.in/RohiniSatellite_RS_1.html ; https://sansadkikala.ignca.gov.in/details/sangeet-deergha/en ; https://history.state.gov/milestones/1989-1992/collapse-soviet-union ; https://nssdc.gsfc.nasa.gov/imgcat/html/object_page/lu3_1.html ; https://hermitagemuseum.org/about ; https://digitalarchives-documents.hawaii.gov/documents/1640/32.pdf ; https://www.archives.gov/milestone-documents/constitution ; https://home.nps.gov/people/manhattan-project-scientists-j-robert-oppenheimer.htm ; https://science.nasa.gov/mission/new-horizons/ ; https://www.arts.gov/sites/default/files/Reader-Resources-AdventuresofTomSawyer.pdf ; https://facultyprofiles.vanderbilt.edu/esploro/outputs/journalArticle/The-Law-of-Conservation-of-Matter/991044870545803276?institution=01VAN_INST&recordUsage=false&skipUsageReporting=true .


### Question-bank factual consistency review — batch 8 (records 106–120) — 2026-11-18

- Reviewed the next 15 source-order records: `IN-GEO-010`, `IN-HIS-010`, `IN-SCI-010`, `IN-CUL-009`, `IN-CUL-010`, `RU-GEO-010`, `RU-HIS-010`, `RU-SCI-010`, `RU-CUL-009`, `RU-CUL-010`, `US-GEO-010`, `US-HIS-010`, `US-SCI-010`, `US-CUL-009`, and `US-CUL-010`, across en-IN, en-US and ru-RU. Review covered prompts, marked answers, explanations and plausible distractors.
- Selected claims were checked against institutional and specialist references: IGNOU/eGyanKosh and an Indian Institute of Public Administration resource on Sangam literature; ESA on Alexei Leonov's first spacewalk; the Library of Congress and Smithsonian on Seneca Falls; the Smithsonian National Museum of African American History and Culture on the Harlem Renaissance and Langston Hughes; the Government of India's 1974 statement reproduced in the UN Digital Library and the Indian Parliament record on the Pokhran experiment; and the IAEA country profile timeline for the 18 May 1974 Pokhran test.
- Additional checked context included the Brahmaputra's route into the Bay of Bengal via the Ganges-Brahmaputra delta; Babur's 1526 victory at Panipat; the Yenisei's outlet to the Kara Sea; the 1380 Battle of Kulikovo; the Fabergé imperial egg association; the Tretyakov Gallery's Russian art collection; the Mississippi's outlet into the Gulf of Mexico; Sally Ride's 1983 flight; and the Bronx origins of hip-hop. The review found no clear factual error, answer-key mismatch, misleading explanation, translation-alignment defect or distractor issue requiring a content edit.
- All 15 records retain stable IDs, region/category/difficulty assignments, four-option sets, correct keys and three localized variants. Counts and distributions remain unchanged.
- This is a bounded 15-record review, not a complete independent audit of every distractor or explanation, nor professional native-speaker acceptance. Official `npm run validate:content`, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.
- References: https://egyankosh.ac.in/bitstream/123456789/67203/3/Block-3.pdf ; https://www.iipa.org.in/cms/public/page/iks ; https://www.esa.int/articles/about-us/who-we-are/history/alexei-leonov-the-artistic-spaceman ; https://www.loc.gov/exhibitions/women-fight-for-the-vote/about-this-exhibition/seneca-falls-and-building-a-movement-1776-1890/ ; https://www.si.edu/exhibitions/the-seneca-falls-convention-event-exhib-4629 ; https://nmaahc.si.edu/explore/stories/new-african-american-identity-harlem-renaissance ; https://digitallibrary.un.org/record/697762/files/A_9627-EN.pdf ; https://rsdebate.nic.in/bitstream/123456789/445689/2/ID_89_22071974_1_p162_p185_18.pdf ; https://www-pub.iaea.org/mtcd/publications/pdf/cnpp2003/cnpp_webpage/PDF/2003/Documents/Documents/India%202003.pdf ; https://www.vec.ac.in/documents/History/Learning_Resources/India_The_Ancient_Past.pdf ; https://www.kulpole.ru/discover/about ; https://nmaahc.si.edu/langston-hughes .


### Question-bank factual consistency review — batch 9 (records 121–135) — 2026-11-18

- Reviewed the next 15 source-order records: `IN-GEO-011`, `IN-GEO-012`, `IN-HIS-011`, `IN-SCI-011`, `IN-CUL-011`, `RU-GEO-011`, `RU-GEO-012`, `RU-HIS-011`, `RU-SCI-011`, `RU-CUL-011`, `US-GEO-011`, `US-GEO-012`, `US-HIS-011`, `US-SCI-011`, and `US-CUL-011`, across en-IN, en-US and ru-RU. Review covered prompts, marked answers, explanations and plausible distractors.
- Selected claims were checked against institutional and specialist sources: the Government of India's Press Information Bureau and National Archives of India on the 1857 outbreak at Meerut; ISRO and the Indian Space Science Data Centre on the Mars Orbiter Mission's first-attempt Mars orbit insertion; Government of Nagaland tourism material on Hornbill Festival; the International Lake Environment Committee's World Lake Database on Lake Ladoga; NASA's Sputnik chronology on Sputnik 2 and Laika; the Metropolitan Museum of Art on Fabergé's imperial Easter egg commission; the Russian Ministry of Culture's Kulikovo Field museum on the 1380 battle; NASA on Explorer 1; the US National Archives on the Emancipation Proclamation; and the Smithsonian on Delta blues.
- Additional claims reviewed include Loktak Lake and phumdis in Manipur; Nanda Devi's height and status as the highest summit wholly within India; the Yenisei/Kara Sea, Strait of Tartary and Sakhalin; the October Manifesto and State Duma; matryoshka nesting dolls; Everglades in Florida; and Mount Elbert in Colorado. No clear factual error, answer-key mismatch, misleading explanation, translation-alignment defect or distractor issue warranted a question-bank edit.
- All 15 records retain stable IDs, region/category/difficulty assignments, four-option sets, correct keys and three localized variants. Counts and distributions remain unchanged.
- This is a bounded 15-record review, not a complete independent audit of every distractor or explanation, nor professional native-speaker acceptance. Official `npm run validate:content`, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.
- References: https://www.pib.gov.in/newsite/erelcontent.aspx?lang=2&reg=48&relid=27696 ; https://nationalarchives.nic.in/sites/default/files/2026-01/28.Indian%20Historical%20Records%20Commission%2Csources%20on%20Indian%20history.pdf ; https://www.isro.gov.in/Mars%20Orbiter%20Mission.html ; https://www.issdc.gov.in/marsmission.html ; https://tourism.nagaland.gov.in/ ; https://wldb.ilec.or.jp/Display/html/3499 ; https://www.nasa.gov/history/sputnik/chronology.html ; https://www.metmuseum.org/it/exhibitions/faberge ; https://ar.culture.ru/en/museum/muzey-zapovednik-kulikovo-pole ; https://science.nasa.gov/mission/explorer-1/about/ ; https://www.archives.gov/milestone-documents/emancipation-proclamation ; https://www.si.edu/spotlight/mississippi ; https://whc.unesco.org/en/list/335 ; https://www.indmount.org/IMF/mountaineering ; https://www.nps.gov/locations/lowermsdeltaregion/history-and-culture-of-the-mississippi-delta-region.htm .


### Question-bank factual consistency review — batch 10 (records 136–150) — 2026-11-18

- Reviewed the final 15 source-order records: `IN-GEO-013`, `IN-HIS-012`, `IN-SCI-012`, `IN-CUL-012`, `IN-CUL-013`, `RU-GEO-013`, `RU-HIS-012`, `RU-SCI-012`, `RU-CUL-012`, `RU-CUL-013`, `US-GEO-013`, `US-HIS-012`, `US-SCI-012`, `US-CUL-012`, and `US-CUL-013`, across en-IN, en-US and ru-RU. Reviewed prompts, marked answers, explanations and plausible distractors.
- Cross-checked selected claims against institutional sources including the Indian Agricultural Research Institute on M. S. Swaminathan; NASA and ESA on Mir; the Smithsonian on `American Gothic`; NASA on the James Webb Space Telescope; the US National Archives on the Civil Rights Act; the USGS on the Mojave Desert; and the Library of Congress and University of Mississippi on William Faulkner's fictional Yoknapatawpha County. Other selected references included the PICES North Pacific Ecosystem Status Report on the Sea of Okhotsk, Yale's Modernism Lab and Cambridge University Press on Chekhov, and the Smithsonian/Library of Congress on American literature and art.
- Corrected one clear English (India) wording defect in `US-CUL-013`: replaced “fictional town of Yoknapatawpha County” with “fictional Yoknapatawpha County, used as the setting for several of his novels.” Yoknapatawpha is a fictional county, not a town. The Library of Congress describes it as a fictional county and confirms it is the setting for many of Faulkner's novels. The English (US) and Russian versions already expressed the county accurately. Stable ID, correct key, category, difficulty and four-option set remain unchanged.
- No other clear factual error, answer-key mismatch, misleading explanation, translation-alignment defect or distractor issue warranted an edit. The bank remains 150 unique IDs, 50 per region and 150 localized records per language; category and difficulty distributions are unchanged.
- Bounded cross-locale review of all 150 records is now complete (ten 15-record batches). This does not constitute independent exhaustive verification of every distractor/explanation or professional native-speaker acceptance. Official `npm run validate:content`, CI, Android build and runtime tests remain deferred until the agreed development freeze. No baseline allocation or product scope changed.
- References: https://iari.res.in/hi/padma-awards.php ; https://www.nasa.gov/history/20-years-ago-space-station-mir-reenters-earths-atmosphere/ ; https://science.nasa.gov/mission/webb/ ; https://www.archives.gov/milestone-documents/civil-rights-act ; https://pubs.usgs.gov/fs/fs117-03/ ; https://www.si.edu/object/american-gothic-painting%3Asiris_ari_374423 ; https://www.loc.gov/exhibits/books-that-shaped-america/1900-to-1950.html ; https://www.loc.gov/item/today-in-history/september-25/ ; https://meetings.pices.int/publications/special-publications/NPESR/2010/PICES_PUB4_Chp6_Okhotsk.pdf ; https://campuspress.yale.edu/modernismlab/anton-chekhov/ ; https://assets.cambridge.org/052182/5938/excerpt/0521825938_excerpt.htm .


### Foundation/interface source-readiness review — 2026-11-18

- Re-inspected the current home, quiz, results, settings and help markup alongside the application controller and selector-label localization module. Confirmed that all static application DOM references resolve to existing HTML IDs; HTML IDs are unique; all six settings selectors have explicit associated labels; and the interface-language, question-region and question-language selectors expose the supported independent values.
- Confirmed the three selector-label maps contain entries for all supported interface locales; the document root language follows the selected interface locale; question prompt and answer-option text carry the selected question locale; and the app controller updates accessible labels for the settings and answer controls.
- No concrete defect was found that justified an application-code change in this bounded pass. This is a static source inspection, not browser execution, keyboard/screen-reader testing, localization proofreading, or official validator execution.
- CI, `npm run validate:content`, Android compilation/package validation and runtime/device testing remain deferred until the agreed development freeze. No baseline allocation or product scope changed.


### Gameplay and round-selection source review — 2026-11-18

- Re-inspected `app/src/app.js` round selection and state transitions: regional eligibility, category/difficulty filters, stable-ID uniqueness, normalized duplicate-prompt detection across all three locales, session-local cycle signatures, unseen-question prioritization, largest-remainder difficulty quotas, shortage filling, final question shuffle and selected-round postconditions.
- Reviewed defensive paths for malformed/empty pools, question rendering, stale answer callbacks, advancement gating, answer-ledger snapshots and completed-round score/streak recomputation. Recovery consistently discards active round state and presents the localized recovery view.
- Source inspection confirmed the selection code applies the configured region through `isPlayableQuestion`, filters category and difficulty before selection, verifies unique IDs and prompts, and checks selected-round length/uniqueness/playability before rendering. The quota algorithm uses integer largest-remainder apportionment; unseen questions are preferred, and seen questions are used only when the remaining unseen pool cannot fill the round.
- No concrete correctness defect was identified in this bounded source review; no application-code change was justified. These are source-presence and control-flow checks, not execution of the browser app, randomized property tests, or full functional regression.
- The official content validator, CI, Android build and runtime/device testing remain deferred until the agreed development freeze. No baseline allocation or product scope changed.


### Gameplay completion, results and score-persistence source review — 2026-11-18

- Reviewed the connected answer-to-results workflow: answer selection is single-use, answer snapshots retain the active localized option text and explanation, Next is gated by the current answer-history entry, and the final results transition revalidates the entire round ledger before showing or persisting a score.
- Confirmed answer review renders the captured selected answer, canonical correct answer and explanation with separate interface/question language annotations. The result summary reports score, accuracy and best streak; the review section is labelled by its heading; the result message is a polite atomic status region.
- Reviewed best-score scope and persistence: records are isolated by region, category, difficulty and round length; stored records are shape/range checked; legacy 10-question records are lazily migrated; percentage comparisons use integer cross-multiplication and equal accuracy prefers the larger round. Storage read/write failures are surfaced through the existing status warning.
- Checked Home, Replay and Settings transitions: replay begins a fresh round under the current selection; Home discards round state; changing settings persists normalized values and clears the previous round; Help/back preserves the originating view.
- No concrete correctness defect was identified in this bounded source review, so no application-code change was justified. This does not establish browser runtime behaviour, real storage quota/private-mode behaviour, screen-reader announcement quality or full functional regression.
- Official content validation, CI, Android build and runtime/device testing remain deferred until the agreed development freeze. No baseline allocation or product scope changed.


### Localization, settings persistence and accessibility source review — 2026-11-18

- Re-inspected the settings markup, app controller and selector-label module together. Confirmed the interface-language and question-language selectors each expose all three supported locales, the region selector exposes IN/RU/US, all settings controls have explicit associated labels, and the three selector-label maps provide every locale/region combination.
- Verified script ordering and refresh behaviour: the app initializes normalized settings before the selector-label module refreshes labels; changing the interface selector refreshes region/language option labels immediately; saving settings applies the normalized interface/region/question-language/category/difficulty/round-length values before returning Home; the selector-label save listener then refreshes option labels against the selected interface locale. Question locale remains an independent setting and is not derived from region.
- Rechecked storage failure paths: unavailable settings reads fall back to normalized defaults and set the warning state; failed settings/best-score writes and best-score reads surface the localized storage warning; malformed stored settings are normalized; malformed best-score records are rejected; a missing key remains a normal first-run condition.
- Reviewed accessible settings labels, view-heading focus, localized storage status, document-root language, question-content language annotations, result live-region semantics and forced-colors focus/answer-state styling in the existing source. No concrete defect justified an application-code change in this bounded pass.
- These checks are static source inspection only. They do not establish all 27 interface/region/question-language combinations at runtime, browser storage behaviour, keyboard operation, screen-reader output or actual forced-colors rendering. Professional native-speaker acceptance and runtime accessibility testing remain outstanding.
- CI, official content validation, Android build and runtime/device testing remain deferred until the agreed development freeze. No baseline allocation or product scope changed.


### Android shell, resource and build-configuration source review — 2026-11-18

- Re-inspected `MainActivity.kt`, the app Gradle configuration, settings/root Gradle files, manifest, Android themes/colours, pre-Android-12 launch drawable, Android 12+ splash theme, legacy launcher vector, adaptive icon and Android README.
- Confirmed the Android module declares application ID `app.mindquest`, min SDK 23, compile/target SDK 35 and Java/Kotlin 17; the root build pins Android Gradle Plugin 8.7.3 and Kotlin plugin 2.0.21, with Gradle 8.9 documented as the compatible distribution target. The canonical `app/` directory is configured as the main source set's APK assets directory. The Gradle wrapper remains absent, so no self-contained build path is claimed.
- Checked the manifest/resource references: `AppTheme`, `LaunchTheme`, `@mipmap/ic_launcher`, and the splash/icon drawables and colours all have matching source resources in the inspected tree. API 26+ adaptive icon and API 23–25 vector fallback are present; API 31+ splash attributes are in the version-qualified theme.
- Re-reviewed WebView security and lifecycle source: JavaScript is enabled for the bundled game, debugging is disabled, local file access is limited to loading packaged assets, content access and cross-origin file access are disabled, mixed content/pop-ups/multiple windows are blocked, and the navigation callback restricts document navigation to the local entry point. The manifest declares no permissions, including no network permission, and disables backup/cleartext traffic. Activity pause/resume/destroy handling and API-specific system-back callbacks are present.
- Reviewed the API 35+ inset listener against target SDK 35 and the manifest's `adjustResize` setting. The listener includes system bars, display cutout and IME insets. This is source consistency only; it does not prove keyboard resizing, edge-to-edge rendering, splash appearance, icon rendering, navigation policy or lifecycle behaviour on devices.
- No concrete source defect justified an Android code/resource change in this bounded review. No build was attempted: the Gradle wrapper is still missing, and Android compilation/package validation remains deliberately deferred with CI until development freeze. No baseline allocation or product scope changed.


### Android asset-packaging and build-reproducibility source review — 2026-11-18

- Inspected the canonical web entry point and its referenced local resources. `app/index.html` references only `./styles.css` and the three local scripts `./src/data/questions.js`, `./src/app.js` and `./src/ui-polish.js`; all are present in the repository. The stylesheet contains no external font/image imports or URL-backed assets. A bounded scan of the application JavaScript, question bank, HTML and CSS found no `fetch`, `XMLHttpRequest`, WebSocket, EventSource, dynamic import, or HTTP(S) resource reference. This supports the intended bundled/offline asset layout at source level; it does not prove APK contents or actual airplane-mode runtime behaviour.
- Rechecked `assets.srcDir("../../app")` against the module layout: from `android/app`, the configured path resolves to the repository's canonical `app/` directory, matching the WebView entry point `file:///android_asset/index.html`. No duplicate web assets or generated copy step is needed in the current source layout.
- The wrapper cannot be safely added through the available text-only file update path: Gradle's official guidance is to generate the wrapper using the built-in `gradle :wrapper` task, which creates the executable JAR and platform scripts. No Gradle build or wrapper generation was run here, and no synthetic binary/script was committed. Updated `android/README.md` with the exact Gradle 8.9 generation command, required generated files, checksum-verification instruction and subsequent wrapper build invocation.
- Re-fetched the updated Android README and both project status documents after the documentation batch. CI, official content validation, Android compilation/APK inspection and runtime/device checks remain deferred until development freeze. No application source defect was found, no baseline allocation was changed and no product scope was added.


### Android release configuration and signing-safety source review — 2026-11-18

- Re-inspected the Android application Gradle file, plugin/dependency repository configuration, manifest, Activity, root ignore rules and Android build/release instructions. The project has a single application module, no declared third-party runtime dependencies, Java/Kotlin 17 targets, initial development version `versionCode 1` / `versionName 0.1.0`, and a release build type with minification disabled. No signing configuration or signing secrets are present in the checked-in build file.
- Confirmed root ignore rules already exclude Gradle/build outputs, local SDK properties, JKS/keystore files and JVM heap dumps. Added explicit ignore entries for `android/keystore.properties`, `*.p12` and `*.pfx` to reduce the chance of accidentally committing future local signing material.
- Updated `android/README.md` to document that release signing is intentionally unconfigured, describe safe use of protected CI secrets or an untracked local properties file, prohibit secrets in source control/logs/command lines, call for an access-controlled keystore backup, and identify the current version values as development values that must be reviewed/incremented for publication.
- No release signing configuration was invented and no credentials were requested or stored. The exact RuStore package/signing requirements, final version, signing ownership and secure recovery plan remain release decisions. The APK/AAB has not been built or signed, and no store submission readiness is claimed.
- Source review only; no Gradle wrapper generation, build, signing, CI, official content validation or device test was run. These remain deferred until the agreed development freeze and release-validation stage. No baseline allocation or product scope changed.


### Android release-metadata and documentation consistency review — 2026-11-18

- Rechecked the application module's current release metadata against the Android README, repository README, roadmap and development status. The source still identifies the application as `app.mindquest`, version `0.1.0` / code `1`, target/compile SDK 35, min SDK 23, Java/Kotlin 17, with no release signing configuration. These are development settings, not a built or store-approved package.
- Confirmed the Android README now accurately distinguishes the installed-Gradle build path from the future wrapper-based path and explicitly states that no signed APK/AAB or release candidate exists. The release signing instructions do not ask for credentials in chat or commit secrets. Root ignore rules cover the documented local keystore/property file formats.
- Corrected one stale development-status sentence: best-score records are keyed by region, category, difficulty and round length; compatible legacy 10-question scoped records are lazily migrated, while the earlier global-score format is not migrated. This now matches the implemented persistence key and migration behaviour.
- No Android source/configuration change was justified by this pass. No Gradle wrapper, package build, signing configuration, CI, content validator or runtime test was generated or run. No baseline allocation or product scope changed.


- Android manifest identity review (2026-11-18): confirmed the `MindQuest` application label, standard/round launcher icon references, explicitly exported `MAIN` / `LAUNCHER` Activity, RTL support, explicit themes, disabled backup and cleartext traffic, and absence of declared permissions. The API 33+ back-invoked manifest flag matches the Activity implementation. No source change was warranted. This was not a merged-manifest, resource-compile, APK, store-policy or runtime test; Android validation remains deferred.


- Android build-configuration review (2026-11-18): verified pinned AGP/Kotlin plugin versions, centralized plugin/dependency repositories, single `:app` module, Java/Kotlin 17 targets, no declared external app dependencies, and ignore coverage for local build/SDK/signing files. No source/configuration change was warranted. The wrapper remains absent; no Gradle configuration, dependency resolution, compile, APK, CI or device test was run. Android validation remains deferred.


- Android reproducibility blocker (2026-11-18; historical snapshot): repository directory inspection at that time found no official wrapper files. This prerequisite was subsequently cleared by successful manual workflow run [44208837336](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44208837336), which generated, checksum-validated and committed the four official Gradle wrapper artifacts. The remaining release gates still include Android build/APK inspection, executable content validation, browser/Android runtime QA, native-speaker acceptance and release signing/store preparation.

- Android WebView navigation/lifecycle source review (2026-11-18): rechecked the exact bundled-entry-point allowlist, API 24+ main-frame restriction, disabled cross-origin/file capabilities, pop-up/mixed-content/debugging controls, Activity lifecycle cleanup and API-specific back callbacks. No source change was justified; API 23 callback behavior and all runtime/device behavior remain unverified. Build, CI and validation remain deferred.

- Zero-local Gradle wrapper bootstrap (2026-11-18): added a dedicated manually triggered GitHub Actions workflow for the public MindQuest repository. It provisions Gradle 8.9/Java 17 on a standard hosted runner, generates the official wrapper, validates its JAR checksum, and commits only the four wrapper files. It is restricted to manual dispatch on `main`, uses only `contents: write`, and does not run the general CI suite or Android build. Workflow is committed but not yet dispatched; wrapper generation/validation and the build-reproducibility gate remain pending.

- Gradle Wrapper bootstrap run 44208167123: Gradle 8.9 provisioning, official wrapper generation and Gradle wrapper-JAR validation passed. Final commit step failed because Git's cached diff check interpreted the generated Windows batch file's CRLF line endings as trailing whitespace. Workflow corrected to recognise CRLF while retaining other whitespace checks; correction commit `5112d9e034c38d1cbd04522f020ab26c4c94dfc0`. A fresh manual dispatch is required; wrapper files have not yet been committed. No general CI or Android build was run.


- Gradle Wrapper bootstrap completed (2026-11-18): successful workflow run [44208837336](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44208837336) completed all seven steps, including official Gradle 8.9 wrapper generation, wrapper-JAR checksum validation and commit. Verified repository paths: `android/gradlew`, `android/gradlew.bat`, `android/gradle/wrapper/gradle-wrapper.jar`, and `android/gradle/wrapper/gradle-wrapper.properties`. Git tree confirms `android/gradlew` mode `100755`; wrapper properties pin `gradle-8.9-bin.zip`. This supersedes the earlier pending-bootstrap notes above. It clears only the wrapper bootstrap gate; Android build, APK inspection, general CI, content validator and runtime/device QA remain deferred.


- Current tooling checkpoint (2026-11-18): the official Gradle 8.9 wrapper is now present and validated on `main`; the generated shell script retains executable mode. This removes wrapper generation as a blocker, but no Android project build or APK assembly has yet been run. Preserve the agreed validation gate: complete the planned implementation batch first, then enable/run the general CI, official content validator and Android build/runtime validation together as appropriate.


- Gameplay/accessibility source-readiness review (2026-11-18): inspected question validation and cross-locale identity, round selection/cycling, difficulty apportionment, answer ledger/result integrity, scoped local persistence, document language, semantic labels/live regions, focus handling, reduced motion, forced-colors styling and Android WebView navigation/security/lifecycle boundaries. No source defect warranted a speculative patch. This does not constitute runtime or accessibility validation; keep the official content validator, browser/assistive-technology checks, Android build and broader CI deferred until the planned development batch is complete.
