# MindQuest QA Test Plan

Last updated: 2026-11-19

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
| Round modes | 5-, 10- and 15-question rounds across India, Russia and the United States | Selected round length is honoured when the filtered pool is large enough |
| Content filters | Every category × difficulty pairing in each of the three playable regions | Rendered question category and difficulty match the selected filters |
| Keyboard continuity | Answer selection, pressed-state semantics and progression | Exactly one answer exposes `aria-checked=true`; arrow keys move through the four-option radio group and select the focused answer; focus then moves to Next/See results and the next question heading |
| Accessible control structure | Visible controls, image alternatives and DOM identifiers across Home, Settings, Quiz and Results | Every visible interactive control has an accessible name; images have alt attributes; IDs are unique; inactive views expose no tab-reachable controls |
| Responsive layout | Twelve portrait/landscape viewport profiles across Home, Settings, Quiz and Results | No document-level horizontal overflow |
| Persistence and score ledger | 125 locale/region/question-language combinations; settings and accessibility preferences; strict score-record schema, malformed shapes/ranges, valid-record recovery, legacy ten-question migration and migration-write failure | Saved values restore independently; invalid scores are ignored; a readable legacy score survives a failed migration write |
| Offline boundary | Runtime request observation, restrictive Content Security Policy, static runtime API scan and local bundled assets only | No external network request is made by the application |
| Runtime security boundary | CSP directives, no remote scripts/styles, no inline event handlers, no dynamic code evaluation, no network APIs in app runtime, staged content excluded | Security boundary regressions fail CI before merge |
| Gameplay integrity | Exact difficulty quotas for 5/10/15 rounds, result focus/review completeness and 50-question cycle exhaustion in each current region | No duplicate stable question IDs within a round; all eligible questions are exhausted before a new cycle |
| View focus and inactive-view isolation | Home, Settings, Help, Privacy, Accessibility, Quiz and Results navigation, heading focus, completed-round transitions and replay | Exactly one view is active; inactive views expose no visible tab-reachable controls; destination context receives focus |
| Android WebView/lifecycle source | Static checks for local-only navigation, restrictive WebView settings, API 23/24+ callbacks, lifecycle cleanup, API 33+ back handling, API 35+ insets and pinned build metadata | Source/configuration regressions fail CI; this is not Kotlin compilation, APK inspection or device validation |

The test suite must retain strict assertions. If an assertion fails, investigate the product behavior; do not delete or loosen the assertion to obtain a green workflow.

## Latest validated debug build

- Source commit: `4efab1a65c91adc6160e6b15ecda25c7495b129c` (PR #5 merged).
- Full validation: [workflow #44338675579](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44338675579) completed successfully; both content/static/browser regression and Android debug APK build jobs passed.
- GitHub Actions artifact: `mindquest-debug-apk`, artifact ID `14443565362`, available until 2026-12-02.
- Extracted APK: 909,184 bytes.
- APK SHA-256: `65cce0987d06987a01b3e3fcac300566bd52b55df8a4341a78703201d9adcd54`.
- Package inspection confirmed the bundled HTML entry point, gameplay JavaScript, original MindQuest SVG logo, Android manifest and launcher foreground resource are present.
- This is a **debug APK**, not a production-signed release or store-ready candidate. The latest APK has not yet been physically device-tested.

## Manual acceptance still required

### Android device
- Install the latest debug APK and confirm clean installation, launch and exit.
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

## Current limitations and accepted batches

- Spain and Peru are not playable question regions.
- Spanish question translations are not available; the question-language selector remains limited to the three fully populated locales.
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
| Android WebView/lifecycle | Static local-only navigation, WebView settings, API 23/24+ callbacks, lifecycle cleanup, API 33+ back handling and API 35+ insets | Does not compile Kotlin or execute Android framework callbacks |
| Android build boundary | Static check that routine CI stays web/content-only and final Android validation is manual and gated by feature_scope_complete=true | Does not run Gradle or assemble an APK |

### Latest exact-head CI evidence

- PR #45: [workflow #44581783687](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44581783687) — passed all 28 substantive steps.
- PR #46: [workflow #44582219981](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44582219981) — passed all 28 substantive steps.
- PR #47: [workflow #44582138992](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44582138992) — passed all 28 substantive steps.
- PR #48: [workflow #44582401075](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44582401075) — passed all 29 substantive steps.

These were exact branch-head PR checks completed before merge. They do not constitute a native Android build, manual device acceptance, TalkBack verification, WCAG conformance assessment or store approval.

## Question-bank fail-closed integrity regression — 2026-11-20

The `test:bank-fail-closed` browser gate injects three controlled corruptions into the enabled India question bank: duplicate stable IDs, duplicate localized prompts across all five question locales, and invalid answer keys. Each scenario must route to the recovery Results state without producing a score, answer-review entries, replay action or persisted best-score record. This validates the app's runtime integrity guardrails against malformed in-memory content; it is not a security penetration test or a factual-content review.
