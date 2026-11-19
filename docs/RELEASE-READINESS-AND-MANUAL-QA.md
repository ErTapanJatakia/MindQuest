# Release readiness and manual QA protocol

Last updated: 2026-11-19

## Release boundary

MindQuest is a free, offline-first Android puzzle and trivia game. The release target remains a privately maintained, non-monetised RuStore distribution with GitHub Releases as a supporting channel. No advertising, analytics SDK, accounts, backend, paid API, subscription or mandatory network dependency is in scope.

This document is an execution record and checklist, not a claim that the release is approved. The signed Android release and production deployment remain untouched until a separate explicit release authorization.

## Current product baseline

- 250 stable question IDs: 50 each for India, Russia, United States, Spain and Peru.
- 1,250 localized question records: five question locales per ID (en-IN, en-US, ru-RU, es-ES, es-PE).
- Five interface locales and five regions/question locales are independently selectable.
- 125 interface/region/question-language combinations are covered by automated persistence regression.
- Category quotas per region: Geography 13, History 12, Science 12, Culture 13.
- Difficulty quotas per region: easy 15, medium 20, hard 15.
- Human factual/answer-key review and native-speaker review are marked complete based on project-owner confirmation. This is not independent certification.
- Automated browser and static checks are extensive, but do not replace physical Android, assistive-technology, legal or store review.

## Automated evidence inventory

| Gate | Command / workflow step | What it establishes | What it does not establish |
|---|---|---|---|
| Content structure | `npm run validate:content` | Question schema, locale and core bank structure | Independent factual certification |
| Expansion quotas | `npm run audit:expansion` | Five-region IDs and category/difficulty distribution | Editorial suitability |
| Spanish localization | `npm run validate:spanish` | Spanish locale structure and consistency | Native-speaker certification by itself |
| Staged-region integrity | `npm run validate:staged` | Staged content discovery and guarded activation invariants | Truth of every cited source |
| Runtime security | `npm run audit:security` | Targeted CSP, local-resource and unsafe-runtime-pattern checks | Penetration test or security certification |
| Editorial evidence | `npm run audit:editorial` | Claim-level evidence register coverage and review-gate metadata | Source validity or factual correctness |
| Browser gameplay | `npm run test:browser` | Core browser launch and gameplay smoke | Native Android behaviour |
| Locale persistence | `npm run test:locale-persistence` | 125 independent locale/region/question-language combinations | Human translation review |
| Gameplay integrity | `npm run test:gameplay-integrity` | Answer flow, score, replay and state integrity | Long-duration device soak |
| Accessibility | `npm run test:accessibility`, `npm run test:focus-order`, accessible-name/ARIA audit | Browser semantics, keyboard behavior, focus transitions, inactive-view isolation, accessible names and ARIA references across Home, Settings, Help, Privacy, Accessibility, Quiz and Results | TalkBack certification, switch-access certification or WCAG conformance |
| Responsive viewports | `npm run test:responsive`, `npm run test:theme-accessibility` | Twelve portrait/landscape profiles; ten themes and three accessibility modes across the same viewport matrix | Every device density, OEM or physical orientation |
| Storage resilience and score ledger | `npm run test:storage-resilience`, `npm run test:score-scope` | Malformed/blocked/quota-limited storage, strict score-record schema and range validation, valid-record recovery, legacy migration, failed migration-write preservation and independent score partitions | Android OS backup/restore behaviour or arbitrary external data recovery |
| Theme/accessibility matrix | `npm run test:theme-accessibility` | Ten themes across tested responsive viewports | Formal contrast certification beyond measured cases |
| Score scope | `npm run test:score-scope` | Independent best-score partitions | Data recovery from arbitrary external corruption |
| Runtime bank | `npm run test:runtime-bank` | 250 IDs, 50 per region, quotas and all five locales | Independent factual review |
| Offline isolation | `npm run test:offline-isolation` | No cross-origin browser requests in tested flows | Device-level radio/network isolation |
| Question cycle | `npm run test:question-cycle` | Exhaustion, no within-round duplicates and cycle restart | Human playability assessment |
| Lifecycle | `npm run test:lifecycle` (registered in CI) | Browser reload recovery and interrupted-round handling | Native process death or Android WebView lifecycle |
| Android manifest | `npm run audit:android-manifest` | Static manifest security defaults and component/permission policy | Runtime Android security assessment |
| Android WebView/lifecycle source | `npm run audit:android-webview` | Static local-only navigation, WebView hardening, API 23/24+ callbacks, lifecycle cleanup, API 33+ back callback pairing, API 35+ insets and pinned toolchain | Kotlin compilation, APK inspection, Android framework execution or physical-device behavior |
| Android WebView/lifecycle source | `npm run audit:android-webview` | Static local-only navigation, WebView hardening, API 23/24+ navigation callbacks, lifecycle cleanup, API 33+ back callback pairing, API 35+ insets and pinned toolchain | Kotlin compilation, APK inspection, Android framework execution, emulator or physical-device behavior |

Run the complete web/content CI workflow on the exact candidate commit. Record the run URL, commit SHA, job conclusions and any corrective commits in the release evidence log. A green run on an earlier commit is not evidence for a later candidate.

## Manual Android device acceptance

Perform only after all agreed feature work is complete and the final validation workflow is manually dispatched with `feature_scope_complete=true`. No intermediate APK builds are permitted.

### Device and display matrix

- [ ] Small handset, approximately 320–360 CSS px wide.
- [ ] Standard handset, approximately 390–430 CSS px wide.
- [ ] Large handset / tablet layout.
- [ ] Portrait and landscape.
- [ ] Display scaling / large font setting.
- [ ] System dark/light mode interaction, if applicable.
- [ ] Cut-outs, status/navigation bars and safe-area insets.
- [ ] No clipped controls, overlapping labels or horizontal page scrolling.

Record device manufacturer/model, Android version, display size/density, app build SHA-256 and result for each device. Do not infer physical-device coverage from Playwright viewport tests.

### Gameplay and persistence

- [ ] Fresh install starts with supported defaults.
- [ ] Change interface language without changing region or question language.
- [ ] Change region without changing interface or question language.
- [ ] Change question language without changing interface or region.
- [ ] Exercise all five regions and all five question languages.
- [ ] Complete 5-, 10- and 15-question rounds.
- [ ] Verify score, accuracy, streak, answer review and explanations.
- [ ] Verify replay and question-cycle exhaustion behaviour.
- [ ] Close/reopen the app after changing settings; verify persistence.
- [ ] Interrupt a round and relaunch; confirm incomplete round is not recorded as a best score.
- [ ] Clear app data and confirm safe default recovery.
- [ ] Use airplane mode and verify all game flows remain available.

### Accessibility / assistive technology

- [ ] TalkBack reads screen titles, labels, selected answers, feedback, progress and result summaries in a logical order.
- [ ] TalkBack can reach and operate every interactive control.
- [ ] Focus is visible and is not lost after navigation, answer selection, result review or dialog dismissal.
- [ ] Large text does not clip or obscure essential controls.
- [ ] High-contrast preference remains legible.
- [ ] Reduced-motion preference suppresses non-essential movement.
- [ ] Keyboard / switch-access navigation is coherent where supported by the device.
- [ ] No information is conveyed by colour alone.

Record Android version, TalkBack version/settings, steps, expected/actual result and evidence. Do not claim WCAG 2.2 AA solely from these checks.

### Security and privacy

- [ ] Inspect the exact candidate APK package ID, version, signing certificate and SHA-256.
- [ ] Confirm manifest has no unnecessary permissions, cleartext traffic disabled and backup disabled.
- [ ] Verify no account, ads, analytics SDK, tracking or unexpected outbound traffic.
- [ ] Confirm navigation cannot escape the bundled app content into arbitrary external sites.
- [ ] Confirm game remains usable offline after a clean install.
- [ ] Inspect logs for personal data, secrets or question/answer leakage not needed for operation.
- [ ] Record any network observations and distinguish OS traffic from app-originated traffic.

These are manual verification activities, not a substitute for an independent penetration test.

## Store and release preparation

- [ ] Confirm current RuStore individual-publisher requirements and package format.
- [ ] Prepare app name, short/long descriptions and five-region/five-language feature summary.
- [ ] Prepare original logo, icon, screenshots and any required promotional artwork.
- [ ] Prepare accurate privacy/data-safety disclosures based on the exact release binary.
- [ ] Confirm age rating, content questionnaire and country availability.
- [ ] Confirm package/version code and signing-key custody/recovery plan.
- [ ] Produce signed release package only after explicit release authorization.
- [ ] Verify signature and install/update path on a clean device.
- [ ] Archive source commit, workflow evidence, APK hash, signing certificate fingerprint and store submission receipt.

## Defect handling

1. Capture exact reproduction steps, device/browser/OS, app commit and evidence.
2. Classify as application defect, test defect, environment/tooling issue or documentation mismatch.
3. Fix the root cause and add a regression test where feasible.
4. Never delete or weaken a test merely to obtain a green workflow.
5. After three consecutive failures of the same strategy, stop and change the approach.
6. Re-run the complete required CI on the final candidate commit.
7. Keep native/manual gaps explicitly open until physically verified.

## Release decision

Release readiness requires all automated gates green on the candidate commit, manual device and accessibility checks complete, security/privacy review complete, store assets and disclosures prepared, and explicit owner authorization. Until then, the project remains in pre-release validation; no signed release or store submission is implied.
