# Gate 2 — Android release-candidate and manual validation

Last updated: 2026-11-21

## Current decision

Gate 1 is complete. Gate 2 is **in progress** and is limited to release-candidate preparation, Android package validation, physical-device acceptance, assistive-technology checks, and native lifecycle/offline/storage verification. The PR #64 merge commit `c18b549651a243d59bef076216fe3335d368ab1f` has now passed its post-merge mainline workflow [#44836387831](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44836387831): all 38 substantive validation steps succeeded.

The latest confirmed mainline closeout is PR [#64](https://github.com/ErTapanJatakia/MindQuest/pull/64), merged as `c18b549651a243d59bef076216fe3335d368ab1f`. Its exact-head PR workflow [#44831721965](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44831721965) passed all 38 substantive validation steps. The post-merge main workflow [#44836387831](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44836387831) also passed all 38 substantive validation steps.

No Gate 2 APK has been built from the current closeout. No Gradle build, signing, production deployment or store submission has been performed as part of this Gate 2 entry work.

## Revised execution timeline — updated

| Remaining work package | Remaining effort |
|---|---:|
| Original baseline engineering scope | 655 min |
| Theme and device polish | 120 min |
| Accessibility verification (automated gates complete; native/manual checks remain) | 120 min |
| Legal/editorial documentation review | 60 min |
| Expanded manual, offline and Android regression | 180 min |
| **Total planned remaining** | **1,135 min (18h55m)** |

Human factual/answer-key review and native-speaker review are complete based on project-owner confirmation. The 1,135-minute plan does not add expansion, CI-policy, audit or documentation-batch credit to the original baseline.

## Baseline engineering progress

| Measure | Value |
|---|---:|
| Original baseline | 2,400 min / 40h |
| Earned implementation | 1,745 min |
| Remaining baseline | 655 min |
| Completion | **72.71%** |
| Actual engineering hours logged | Not tracked |

The 72.71% figure describes only the original engineering baseline. It is not an Android release-readiness percentage.

## Current Development Status

| Workstream | Status | Next milestone |
|---|---|---|
| Project foundation | Gate 1 complete | Gate 2 evidence closeout |
| Visual identity | Ten themes implemented | Final device/display polish; store artwork is later release preparation |
| Home screen | Core experience implemented | Physical display and orientation acceptance |
| Independent localization | Five interface locales, five regions and five question locales | Native Android persistence and mixed-language acceptance |
| Question-bank architecture | Complete | Preserve guarded activation |
| Question content | 250 IDs / 1,250 localized records complete | No content expansion planned in Gate 2 |
| Core gameplay | Automated regression complete | Native-device round and recovery checks |
| Game modes | 5/10/15-question browser regression complete | Native-device confirmation |
| Difficulty progression | Automated quotas and filter matrix complete | Native-device confirmation |
| Results screen | Automated review and announcement regression complete | TalkBack review |
| Local persistence | Browser/fresh-context recovery complete | Android process-death and restart verification |
| Accessibility | Automated keyboard, semantic, focus, reflow and theme checks complete | TalkBack and switch-access checks on device |
| Android application shell | Static source/configuration audits pass | Manually gated debug package inspection and installation |
| Offline/security hardening | Browser and static checks pass | Airplane-mode and runtime network observation on device |
| Device compatibility | Twelve browser viewport profiles covered | Physical device, density, orientation and inset matrix |
| Functional testing | Gate 1 automated suite green | Manual Android functional regression |
| RuStore release readiness | Not started | Separate release preparation and authorization |
| Documentation/release | Gate 1 closeout merged | Maintain current Gate 2 evidence |

## Gate 2 entry audit

### Confirmed source/configuration controls

The current Android shell source audit checks and passes for:

- WebView remote debugging disabled.
- JavaScript enabled only for the bundled game; DOM storage enabled for local preferences/scores.
- Content-provider access and file-origin cross-file/universal access disabled.
- JavaScript-created windows and multiple windows disabled.
- Mixed content blocked.
- Exact bundled `file:///android_asset/index.html` entry point and navigation allowlist.
- No JavaScript-to-native bridge.
- WebView pause/resume/timer handling and destruction cleanup.
- API 23-compatible and modern navigation callbacks.
- API 33+ predictive-back callback registration/unregistration.
- API 35+ system-bar, display-cutout and IME inset handling.
- Manifest backup disabled, cleartext disabled, no declared permissions or additional Android components.
- Package ID `app.mindquest`, min SDK 23, target SDK 35, Java/Kotlin 17, pinned Android Gradle Plugin 8.7.3, Kotlin plugin 2.0.21 and Gradle 8.9 wrapper.

These are static source/configuration checks, not Kotlin compilation, runtime Android security testing or physical-device evidence.

### Candidate workflow hardening

The manually dispatched workflow `.github/workflows/android-release-validation.yml` remains gated by the required boolean `feature_scope_complete=true`. The Gate 2 preparation batch adds post-build checks for:

- Exact package ID, version code and version name.
- Absence of Android manifest permissions.
- Presence of the bundled HTML, CSS, gameplay JavaScript and canonical question bank.
- APK SHA-256 and a machine-readable validation evidence file.
- A clearly labelled, short-retention debug validation artifact.

This workflow does not sign a release APK, deploy the application or submit to RuStore. It must not be dispatched until all agreed feature work and pre-build review are complete.

## Physical Android acceptance — pending

These checks require an actual Android device and must not be inferred from browser viewport tests or static source audits.

1. Install and launch the exact Gate 2 debug validation artifact; record device model, Android version, display size/density, package/version and APK SHA-256.
2. Test portrait/landscape, display scaling, large text, cutouts, status/navigation bars and keyboard resizing.
3. Complete 5-, 10- and 15-question rounds, answer review, streaks, replay and all independent language/region selectors.
4. Exercise app background/foreground, Activity recreation, process termination and relaunch. Confirm preferences and best scores persist and interrupted rounds are not recorded as completed scores.
5. Test a clean install and all core flows in airplane mode; observe app-originated network traffic separately from OS traffic.
6. Complete TalkBack end-to-end, including splash, selectors, answer selection, feedback, progress, results and review. Assess switch-access navigation where supported.
7. Verify large text, high contrast, reduced motion, forced-colors-equivalent system behavior and visible focus.
8. Record each result with steps, expected/actual behavior, device/OS/accessibility versions and evidence. Leave any unperformed check open.

## Release boundary

- No APK build or artifact upload during ordinary feature CI.
- No APK/Gradle validation until the agreed feature scope is complete and reviewed and the manually dispatched workflow is explicitly confirmed with `feature_scope_complete=true`.
- A debug validation APK is not a release candidate.
- No production signing, production deployment or RuStore submission without separate explicit authorization.
- Do not claim WCAG 2.2 AA conformance, TalkBack certification, penetration-test completion or store approval from these checks.

## Defect protocol

Capture exact reproduction steps and evidence; classify application defect, test defect, environment/tooling issue or documentation mismatch; fix root cause and add regression coverage. Never weaken/delete tests. After three consecutive failures using the same strategy, change approach.



## Gate 2 post-merge verification — 2026-11-21

- PR #64 is merged; exact-head CI #44831721965 and post-merge mainline CI #44836387831 both passed all 38 substantive validation steps.
- The post-merge run completed browser/gameplay, locale and storage persistence, accessibility, responsive/theme, offline, fail-closed content, Android build-boundary, Android WebView/lifecycle and Android manifest checks.
- This is the first fully green mainline result after the Gate 2 workflow-hardening merge. It does not build an APK and does not close physical-device, TalkBack/switch-access, native process-death, Android offline-runtime or manual package-acceptance items.
- The release workflow remains deliberately manual and gated. The `feature_scope_complete=true` input must only be used after the agreed implementation scope has been reviewed. The connected GitHub integration cannot dispatch this workflow; it must be started from the repository Actions page.
- The debug validation workflow is additionally protected by a static CI audit against production signing, release assembly, publishing and store submission. No signing, deployment or store submission is authorized.
