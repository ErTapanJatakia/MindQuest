# MindQuest QA Test Plan

Last updated: 2026-11-23

## Current authoritative status — 2026-11-23

The runtime baseline is five regions (IN, RU, US, ES, PE), five interface locales and five question locales: 250 stable question IDs and 1,250 localized records. PR #113 is the latest application/toolchain change on `main` (`8310d670af4c9041144c1c3d81d4a5e42fab5ebe`). PR #114 was documentation-only and merged as `17b5a6073a2ad3ff1d76efe0b04a0fa21f3402f6`; its post-merge Security Assurance [45133096884](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45133096884) passed all eight jobs and Web Validation [45133096812](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45133096812) passed all 41 steps. Post-merge mainline Web Validation [45128635330](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45128635330) passed all 41 steps and Security Assurance [45128635208](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45128635208) passed all eight jobs, including OpenSSF Scorecard 6.2. PR #113 exact-head Web Validation [45127168946](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127168946), Security Assurance [45127169139](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127169139), and Dependency Review [45127169048](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127169048) passed. Its Android dependency-inventory run [45127104403](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127104403) passed; a separate redundant run [45127168997](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127168997) was throttled by Maven Central HTTP 429, while the successful same-head artifact remains available. See the Security Assurance Dashboard for scanner findings and coverage limitations.

The historical PR #5 debug APK and the older three-region statements below are not the current Gate 2 candidate. Android package validation remains manually gated by `feature_scope_complete=true`. No current Gate 2 APK has been built or inspected. No signing, production deployment or store submission is authorized. Physical-device and assistive-technology acceptance remain owner-performed.

## Purpose

This plan separates repeatable automated browser checks from manual acceptance activities that require a human, a physical Android device, or assistive technology. A passing browser suite is not evidence of native Android, TalkBack, WCAG conformance, or store readiness.

## Automated browser regression

The static offline/security boundary audit (`npm run audit:security`) independently verifies the runtime CSP, local-only script and stylesheet references, absence of inline script handlers and dynamic code evaluation, absence of network APIs in app runtime modules, and exclusion of staged regional content from the live HTML entry point. This is a targeted source/configuration audit, not a penetration test or a complete security certification.

The GitHub Actions browser suite covers the following automated acceptance areas:

| Area | Automated coverage | Acceptance |
|---|---|---|
| Launch experience | Dialog semantics, inert/hidden application shell, keyboard focus containment, Escape dismissal and focus hand-off | Background is unavailable while launch dialog is open; focus returns to Home after dismissal |
| Themes | All ten themes and foreground/muted text contrast against both app and panel surfaces | Text contrast is at least 4.5:1 for tested text/surface pairs |
| Independent selectors | Five interface locales × five regions × five question locales | All 125 supported combinations remain independently selectable |
| Round modes | 5-, 10- and 15-question rounds across all five regions | Selected round length is honoured when the filtered pool is large enough |
| Content filters | Every category × difficulty pairing in each of the five playable regions | Rendered question category and difficulty match the selected filters |
| Keyboard continuity | Answer selection, pressed-state semantics and progression | Exactly one answer exposes `aria-checked=true`; arrow keys move through the four-option radio group and select the focused answer; focus then moves to Next/See results and the next question heading |
| Accessible control structure | Visible controls, image alternatives and DOM identifiers across Home, Settings, Quiz and Results | Every visible interactive control has an accessible name; images have alt attributes; IDs are unique; inactive views expose no tab-reachable controls |
| Responsive layout | Twelve portrait/landscape viewport profiles across Home, Settings, Quiz and Results | No document-level horizontal overflow |
| Persistence and score ledger | 125 locale/region/question-language combinations; settings and accessibility preferences; strict score-record schema, malformed shapes/ranges, valid-record recovery, legacy ten-question migration and migration-write failure | Saved values restore independently; invalid scores are ignored; a readable legacy score survives a failed migration write |
| Offline boundary | Runtime request observation, restrictive Content Security Policy, static runtime API scan and local bundled assets only | No external network request is made by the application |
| Runtime security boundary | CSP directives, no remote scripts/styles, no inline event handlers, no dynamic code evaluation, no network APIs in app runtime, staged content excluded | Security boundary regressions fail CI before merge |
| Gameplay integrity | Exact difficulty quotas for 5/10/15 rounds, result focus/review completeness and 50-question cycle exhaustion in each of the five current regions | No duplicate stable question IDs within a round; all eligible questions are exhausted before a new cycle |
| View focus and inactive-view isolation | Home, Settings, Help, Privacy, Accessibility, Quiz and Results navigation, heading focus, completed-round transitions and replay | Exactly one view is active; inactive views expose no visible tab-reachable controls; destination context receives focus |
| Android WebView/lifecycle source | Static checks for local-only navigation, restrictive WebView settings, API 23/24+ callbacks, lifecycle cleanup, API 30/33 platform-type isolation, API 35+ insets and pinned build metadata | Source/configuration regressions fail CI; this is not Kotlin compilation, APK inspection or device validation |

The test suite must retain strict assertions. If an assertion fails, investigate the product behavior; do not delete or loosen the assertion to obtain a green workflow.

## Historical validated debug build — not the current Gate 2 candidate

- Source commit: `4efab1a65c91adc6160e6b15ecda25c7495b129c` (PR #5 merged).
- Full validation: [workflow #44338675579](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44338675579) completed successfully; both content/static/browser regression and Android debug APK build jobs passed.
- GitHub Actions artifact: `mindquest-debug-apk`, artifact ID `14443565362`, available until 2026-12-02.
- Extracted APK: 909,184 bytes.
- APK SHA-256: `65cce0987d06987a01b3e3fcac300566bd52b55df8a4341a78703201d9adcd54`.
- Package inspection confirmed the bundled HTML entry point, gameplay JavaScript, original MindQuest SVG logo, Android manifest and launcher foreground resource are present.
- This is a historical PR #5 **debug APK**, not the current Gate 2 candidate or a production-signed release. Do not use it for Gate 2 acceptance. Physical-device acceptance must use the exact APK produced by the separately gated workflow.

## Manual acceptance still required

### Android device
- After the gated Android validation workflow is authorized and produces the candidate, install that exact Gate 2 debug APK and confirm clean installation, launch and exit.
- Check splash display and dismissal, including returning from background and relaunching.
- Verify all ten themes and each accessibility preference.
- Complete 5-, 10- and 15-question rounds, including replay and result review.
- Verify settings and best score survive process termination and device restart.
- Test portrait/landscape and small/standard/large displays.
- Confirm airplane-mode operation after a clean install and after content has been used.
- Review Android permissions and WebView behavior on the target device.

### Assistive technology
- Complete the full application flow using TalkBack.
- Confirm the launch dialog is announced, focus remains within it, and the app becomes available after dismissal.
- Verify settings labels, searchable selector alternatives, answer choices, feedback, progress, results and navigation announcements.
- Confirm text scaling, high contrast, reduced motion and system forced-colors behavior.
- Test keyboard-only navigation in the hosted web build with no pointer input.

### Release and security
- Inspect the APK manifest, packaged assets, permissions and signing metadata.
- Verify no runtime external dependency or unexpected outbound request.
- Review privacy and accessibility disclosures against the exact release build.
- Complete the store metadata, screenshots, content rating and release checklist.
- Do not claim WCAG 2.2 AA conformance or display a conformance logo without a valid evaluation.
- Do not treat a debug APK as a release candidate.

## Historical limitations and accepted batches — superseded

- Superseded: Spain and Peru are enabled question regions.
- Superseded: Spanish question locales es-ES and es-PE are available across all five regions.
- PR #2 passed [workflow #44307367081](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44307367081) and was merged as `3bf79c806ac1aa63fff91cea80af4e9d574c92c2`.
- PR #3 passed [workflow #44325807742](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44325807742) and was merged as `a573c2b7e26a78182a34e3d216910aa5c103dcde`.
- PR #4 passed [workflow #44336160667](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44336160667) and was merged as `674abd3ba1174cc2bdecd006a8bfa7858c0dff39`.
- PR #5 passed [workflow #44338004918](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44338004918) and was merged as `4efab1a65c91adc6160e6b15ecda25c7495b129c`.
- The latest post-merge validation [workflow #44338675579](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44338675579) also passed both jobs.
- Physical-device, TalkBack, manual offline runtime, native-speaker review, signing and RuStore submission remain separate acceptance gates.


## Android build policy — feature-complete gate

- Routine feature-development CI must not assemble, package or upload Android APKs.
- Pull-request and push validation during implementation is limited to content integrity, static/syntax checks, browser regression, accessibility, localization, security and responsive behavior.
- Android build validation is isolated in `.github/workflows/android-release-validation.yml` and is manually dispatched only after the complete agreed feature scope has been implemented and reviewed.
- The workflow requires an explicit `feature_scope_complete=true` confirmation; otherwise it skips the Android build.
- No production signing or RuStore submission is authorized by this gate. Those require separate release approval.
- Existing debug APK artifacts are historical development builds and must not be treated as evidence that the final feature-complete Android build has passed.


---

## Current five-region release validation addendum — 2026-11-19

This addendum supersedes earlier matrix sizes and regional availability statements in the historical plan above.

### Current automated coverage

| Area | Current coverage |
|---|---|
| Independent locale settings | 5 interface locales × 5 regions × 5 question locales = 125 combinations |
| Runtime content | 250 unique IDs; 50 per region; 1,250 localized records |
| Regional category distribution | Geography 13, History 12, Science 12, Culture 13 per region |
| Regional difficulty distribution | Easy 15, Medium 20, Hard 15 per region |
| Themes and responsive coverage | Ten themes across the defined responsive viewport matrix |
| Gameplay cycle | Four 15-question rounds per region; all 50 IDs covered without within-round duplicates |
| Offline browser behaviour | Cross-origin requests are blocked/recorded during tested startup, settings and regional gameplay |
| Storage and lifecycle | Malformed/blocked/quota-limited storage, reload recovery, incomplete-round discard and site-data reset |
| Android manifest | Backup/cleartext protections, launcher/component structure and permission policy |

The current workflow also runs the targeted runtime-security audit, staged-bank and editorial-evidence audits, JavaScript syntax checks, browser gameplay, score-scope, keyboard/accessibility and theme regressions.

### Interpretation limits

- Content validators check structure, uniqueness, locale coverage and quotas. They do not prove every claim or explanation is factually correct.
- Editorial evidence audit checks that claim-level evidence records exist and are well-formed. It does not independently verify the source's authority or truth.
- Browser offline isolation does not prove device-level radio isolation or absence of all OS traffic.
- Lifecycle browser checks do not prove native Android process death, WebView storage semantics or OS backup/restore behaviour.
- Static manifest checks do not replace runtime Android security testing.
- Automated accessibility checks do not establish TalkBack usability or WCAG 2.2 AA conformance.

### Manual acceptance remains mandatory

Use [Release readiness and manual QA](RELEASE-READINESS-AND-MANUAL-QA.md) to record physical device models, Android versions, TalkBack results, orientation/display scaling, offline behaviour, persistence/recovery, exact candidate package hashes and release evidence. Do not mark these checks complete until performed on actual devices.


## Keyboard focus order and inactive-view isolation

The `test:focus-order` browser gate verifies that exactly one application view is active during navigation through Home, Settings, Help, Privacy, Accessibility, Quiz and Results. It checks that inactive views are hidden and expose no visible tab-reachable controls, that each destination view has a programmatically focusable heading, and that focus is moved to that heading after navigation. It also completes a configured round, checks focus restoration between questions, validates Results and answer review, and verifies replay navigation. This is DOM/browser regression coverage; it does not replace keyboard-only testing on target devices, screen-reader/TalkBack testing, switch-access testing or a WCAG conformance evaluation.

---

## Current automated coverage addendum — 2026-11-19

This addendum supersedes earlier coverage counts and descriptions above.

| Area | Current automated coverage | Limitation |
|---|---|---|
| Locale persistence | 125 combinations: 5 interface locales × 5 regions × 5 question locales | Does not replace human translation review |
| Runtime question bank | 250 stable IDs, 50 per region, 1,250 localized records; category quotas 13/12/12/13 and difficulty quotas 15/20/15 per region | Structural checks do not independently prove factual accuracy |
| Offline isolation | All 25 region × question-language pairs; startup, selector changes and gameplay are exercised while cross-origin requests are blocked and recorded | Does not prove Android radio isolation or absence of OS-originated traffic |
| Compact accessibility reflow | 320 CSS px; Home, Settings, Quiz, Results and answer review with large text, high contrast and reduced motion enabled together; overflow and escaped visible controls are rejected | Browser viewport test only; physical devices and assistive technology remain manual |
| Score-ledger resilience | Malformed shapes/fields/ranges, valid-record recovery, legacy migration and failed migration-write preservation | Does not prove Android OS backup/restore behavior |
| Android WebView/lifecycle | Static local-only navigation, WebView settings, API 23/24+ callbacks, lifecycle cleanup, API 30/33 platform-type isolation, API 35+ insets | Does not compile Kotlin or execute Android framework callbacks |
| Android build boundary | Static check that routine CI stays web/content-only and final Android validation is manual and gated by feature_scope_complete=true | Does not run Gradle or assemble an APK |

### Latest exact-head CI evidence

- PR #45: [workflow #44581783687](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44581783687) — passed all 28 substantive steps.
- PR #46: [workflow #44582219981](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44582219981) — passed all 28 substantive steps.
- PR #47: [workflow #44582138992](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44582138992) — passed all 28 substantive steps.
- PR #48: [workflow #44582401075](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44582401075) — passed all 29 substantive steps.

These were exact branch-head PR checks completed before merge. They do not constitute a native Android build, manual device acceptance, TalkBack verification, WCAG conformance assessment or store approval.

## Localized streak and results regression — 2026-11-20

The `test:streak-localization` browser gate completes a five-question round in each of the five supported interface locales (25 questions total). It checks that correct answers increment the current streak, an incorrect answer resets only the current streak, the best streak remains the maximum consecutive-correct sequence, and the Results summary uses the selected interface locale. It also checks that the current-streak value is exposed through an atomic polite live region and that replay resets transient streak state. This is automated browser coverage and does not replace assistive-technology testing on physical devices.


## Question-bank fail-closed integrity regression — 2026-11-20

The `test:bank-fail-closed` browser gate injects three controlled corruptions into the enabled India question bank: duplicate stable IDs, duplicate localized prompts across all five question locales, and invalid answer keys. Each scenario must route to the recovery Results state without producing a score, answer-review entries, replay action or persisted best-score record. This validates the app's runtime integrity guardrails against malformed in-memory content; it is not a security penetration test or a factual-content review.


## Staged-region activation fail-closed regression — 2026-11-20

The `test:staged-activation` browser gate injects three controlled corruptions before the guarded regional-bank activation script executes: a staged ID colliding with the canonical bank, a missing `es-PE` translation, and an incomplete staged regional bundle. Each scenario must abort activation, preserve the complete canonical 150-question bank without adding any Spain/Peru records, and leave the release metadata unset. This tests the activation boundary itself, separately from the enabled-bank gameplay corruption tests; it does not establish factual correctness or replace the static staged-content validator.


## Gameplay answer locking and settings-state isolation — 2026-11-20

The `test:gameplay-state` browser gate verifies that Next cannot skip an unanswered question, selecting an answer locks all four choices and maintains one checked radio, and a second selection cannot alter the recorded choice. It verifies that opening and backing out of Settings preserves the active answered question, while saving changed settings during a round discards transient question, answer-review, progress and streak state without recording a best score. A subsequent round must use the newly selected region, interface locale and question locale independently. This is automated browser coverage and does not replace physical-device or assistive-technology acceptance.


## Five-region category, difficulty and round-length matrix — 2026-11-20

The `test:filter-round-matrix` browser gate exercises all 60 region × category × difficulty combinations (five regions, four categories and three difficulty levels), requesting up to five questions per combination and correctly capping the round at the eligible pool size when a filtered pool contains fewer than five. It additionally completes full 5-, 10- and 15-question mixed-filter rounds in each of the five regions. Across 75 rounds it verifies stable-ID region prefixes, exact category/difficulty membership, pool-size and quota diagnostics, no within-round duplicate IDs, completed Results navigation and a full answer-review record for every presented question. This is browser automation over the bundled question bank; it does not replace manual gameplay, device, editorial or assistive-technology review.


## Fresh browser-context persistence regression — 2026-11-20

The `test:fresh-context` browser gate exports the saved origin storage from one browser context, closes that context, and restores the snapshot into a newly created context. It verifies independent interface locale, question region, question locale, round length, category and difficulty preferences, plus a scoped best-score record. It then starts gameplay and checks that the restored Peru region and Spanish (Peru) question language drive the actual question presented. This strengthens coverage beyond a same-page reload, but it remains a browser storage simulation rather than native Android process-death, WebView data-directory, OS backup/restore or physical-device verification.


## Interrupted-round recovery across a fresh browser context — 2026-11-20

The `test:interrupted-context` gate begins a configured five-question Peru/Spanish (Peru) round, records one answer in transient runtime state, then closes the browser context and recreates it from persisted origin storage. It verifies recovery to Home with no restored answer controls or answer-review entries, preserves the previously recorded scoped best score, restores all six independent preferences, checks focus transfer through Settings and back to Home, and confirms the next round uses the restored region and question locale. This simulates process-like browser-context termination; it does not establish native Android process-death, WebView data-directory behavior, OS backup/restore or physical-device acceptance.


## Multilingual live-announcement and answer-review matrix — 2026-11-20

The `test:multilingual-announcements` browser gate exercises all 25 interface-locale × question-locale pairs across all five question regions. It completes 25 five-question rounds (125 questions) and verifies polite atomic status semantics for progress, streak, feedback and Results; focus transfer after answer selection and question navigation; answer-group semantics and accessible naming; question and answer-option language tags; mixed-language feedback boundaries; and localized Results/answer-review language metadata. This is browser regression coverage and does not replace TalkBack, other screen-reader, switch-access or physical-device testing.


## Gate 1 candidate verification notes — 2026-11-21

The multilingual live-announcement and answer-review matrix is registered as `npm run test:multilingual-announcements` and is included in the CI workflow. Its exact-head result must be green before merge. The README command catalogue and release-readiness inventory must remain synchronized with `package.json`. A green browser workflow is not a substitute for physical Android, TalkBack or switch-access acceptance.


## Gate 1 automated QA closeout — 2026-11-21

Gate 1 candidate PR [#62](https://github.com/ErTapanJatakia/MindQuest/pull/62) merged as `39dd889404064e0151efac65449e28eea8705f09` after exact-head workflow [#44820209501](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44820209501) passed all 38 substantive validation steps. The merged test catalogue includes `npm run test:multilingual-announcements`, covering 25 interface/question-locale pairs, all five regions, 25 five-question rounds and 125 questions. It validates polite atomic announcements, focus movement, answer-group semantics, language metadata, mixed-language feedback and answer-review boundaries.

The README command catalogue, package scripts, CI workflow and QA documentation are synchronized. Gate 1 automated QA is complete. Manual/native checks remain distinct: TalkBack and other assistive technology, switch access, physical Android devices, native lifecycle/process-death, Android offline/storage behavior and final candidate validation. Browser tests do not establish WCAG conformance or physical-device acceptance.


## Gate 2 — native Android validation status (2026-11-21)

Gate 1 automated browser/content/static validation is complete. Gate 2 is now active. The current five-region/five-locale regression coverage is documented in the [Gate 2 execution log](GATE-2-EXECUTION-LOG.md) and [release-readiness protocol](RELEASE-READINESS-AND-MANUAL-QA.md). Historical three-region and three-locale limitations in earlier sections are superseded by the five-region addenda and merged PRs #34–#63.

The manually dispatched Android validation workflow remains gated by the required `feature_scope_complete=true` input. Its candidate-package inspection is being hardened to verify package identity/version, absence of manifest permissions, required offline assets and APK SHA-256. No Android build is triggered by this documentation/CI-preparation batch. Physical installation, orientation/inset checks, process-death and restart recovery, airplane-mode operation, TalkBack and switch-access remain open until tested on a real device.

Do not infer native Android acceptance from Playwright, source audits or a successful debug APK build. Do not claim WCAG 2.2 AA conformance, TalkBack certification, penetration-test completion or store approval.


## Gate 2 post-merge CI evidence — 2026-11-21

- PR #64 exact-head validation: [workflow #44831721965](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44831721965) — all 38 substantive validation steps passed.
- Post-merge mainline validation on `c18b549651a243d59bef076216fe3335d368ab1f`: [workflow #44836387831](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44836387831) — all 38 substantive validation steps passed.
- The run includes the full browser/gameplay, locale/persistence, accessibility, responsive/theme, offline-isolation, fail-closed content, Android build-boundary, WebView/lifecycle source and manifest audits.
- No Android build or APK artifact is produced by this routine CI. The manually dispatched validation workflow remains separately gated by `feature_scope_complete=true` and is statically checked to prohibit release signing, production publishing and store submission.
- Passing CI does not close physical-device, TalkBack/switch-access, process-death, airplane-mode runtime or manual package acceptance. Record only checks actually performed on a device.


## Gate 2 release-boundary audit regression — 2026-11-21

PR [#65](https://github.com/ErTapanJatakia/MindQuest/pull/65) merged as `1fab23c732e4e4a26811e5db0483595934a8def6` after exact-head workflow [#44843574405](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44843574405) passed all 38 substantive validation steps on `ffaba22d01a98f71bfdb078c2deeac14ec4566ef`. The strengthened static audit verifies that routine feature CI uses read-only repository permissions, does not invoke release assembly/signing/publishing paths, retains the 14-day debug artifact limit, and requires debug-only package evidence for identity/version, permissions, offline assets and APK SHA-256.

The check is static policy validation. It does not build or inspect an APK, prove Android runtime behavior, or close physical-device, TalkBack/switch-access, native process-death or airplane-mode acceptance. The PR #65 exact-head result is not a post-merge mainline result; record the latter only when the run on merge commit `1fab23c732e4e4a26811e5db0483595934a8def6` is observed. No production signing, deployment or store submission is authorized.


## Gate 2 exact-head and mainline evidence — 2026-11-21

- PR #65 exact-head workflow [#44843574405](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44843574405): 38/38 substantive steps passed.
- PR #66 exact-head workflow [#44841777408](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44841777408): 38/38 substantive steps passed; the version-evidence audit pattern correction is covered.
- PR #67 exact-head workflow [#44846742430](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44846742430): 38/38 substantive steps passed. This is PR-head evidence, not post-merge mainline evidence.
- Do not infer a mainline workflow result when a docs-only push is excluded by the workflow path filter. The CI workflow is being updated to run on documentation and policy-file changes as well as application, script and build-boundary changes.
- Physical Android, TalkBack, switch-access and native lifecycle/offline acceptance remain manual owner-run checks. A debug APK is not a production release and must not be signed or submitted without separate authorization.


## Accessibility statement alignment — 2026-11-21

The public [Accessibility Statement](../ACCESSIBILITY.md) distinguishes implemented browser-tested engineering controls from pending physical Android assistive-technology acceptance. Automated browser evidence includes keyboard/focus behavior, accessible names and ARIA references, live-region semantics, localized language metadata, compact-width large-text/high-contrast/reduced-motion behavior and measured theme contrast cases. TalkBack, other screen readers, switch access and device-specific rendering remain owner-run manual acceptance. No WCAG 2.2 AA conformance claim is made.


## Gate 2 latest evidence — PR #68 (2026-11-21)

PR [#68](https://github.com/ErTapanJatakia/MindQuest/pull/68) passed all 38 substantive checks in exact-head workflow [#44848743446](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44848743446) and merged as `a89a919b3726a4e198df167698c414d380f1f0ec`. Its post-merge mainline workflow [#44851298170](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44851298170) was triggered and is pending as of this update. The current product scope is five regions, five interface locales, five question locales, 250 stable IDs and 1,250 localized records. Do not treat browser/static validation as APK, native Android, TalkBack, switch-access or WCAG conformance evidence.

The next remote hardening batch extends the manually dispatched debug-package workflow to assert the built APK's min SDK 23 and target SDK 35 metadata, and applies a 30-minute job timeout. These assertions are static-policy tested in routine CI; the manually gated Android build remains unexecuted until the complete feature scope is reviewed and the owner explicitly triggers it with `feature_scope_complete=true`.


## Responsive hero regression addendum — 2026-11-21

PR [#72](https://github.com/ErTapanJatakia/MindQuest/pull/72) adds a geometry assertion for the decorative home-hero orbit against the actual rendered eyebrow text, heading, copy and primary actions. The eyebrow measurement uses a DOM Range over its text contents; this avoids treating the full-width block box as if every pixel contained text. The decorative orbit is hidden at compact phone widths (420 CSS px and below), while the overlap assertion remains active across the 12 responsive viewport profiles.

Evidence: exact-head CI [#44857711817](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44857711817) and post-merge mainline CI [#44858943902](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44858943902) passed all 38 substantive validation steps. This is browser geometry evidence, not physical-device acceptance. Device density, cutouts, OEM rendering, orientation, TalkBack and switch access still require owner-run Android checks.
