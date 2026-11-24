# Gate 2 — Android release-candidate and manual validation

## Post-merge Gate 2 and assurance status — 2026-11-24

The current `main` commit is [`20cf687e428568cc269593910b1f69362c94fcef`](https://github.com/ErTapanJatakia/MindQuest/commit/20cf687e428568cc269593910b1f69362c94fcef). PRs [#115](https://github.com/ErTapanJatakia/MindQuest/pull/115) (assurance documentation), [#116](https://github.com/ErTapanJatakia/MindQuest/pull/116) (Android toolchain alignment) and [#118](https://github.com/ErTapanJatakia/MindQuest/pull/118) (typed Kotlin compilerOptions) are merged. PR [#117](https://github.com/ErTapanJatakia/MindQuest/pull/117) was closed unmerged and superseded by the clean, non-stacked PR #118.

- Post-merge Web Validation [run 45294179582](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45294179582) and Security Assurance [run 45294179733](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45294179733) completed successfully on the exact main commit. All nine reported checks passed, including CodeQL, OSV, Trivy, Semgrep, DevSkim, MobSF, CycloneDX generation and OpenSSF Scorecard.
- Android Release Validation [run 45262565854](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45262565854) built and inspected a debug APK on the pre-merge candidate branch at `2329025d7ecb86cb25ae1e355f27c2cb2243dbc3`. It confirmed package `com.mindquest.app`, versionCode 1, versionName 0.1.0, minSdk 23, targetSdk 35, only the exported MAIN/LAUNCHER activity, no manifest permissions, and required bundled offline assets. Artifact: [debug validation ZIP](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45262565854/artifacts/14860982111). This is build evidence for the candidate stack, **not an APK rebuilt from the exact current main SHA**, and it is not production-signed.
- The Android build configuration and Kotlin compilerOptions remediation represented by that candidate are now merged to main through #116 and #118. No new Android Release Validation run has been performed against the exact post-merge main SHA.
- The current source-level WebView boundary permits only the bundled `file:///android_asset/index.html` entry point, disables remote debugging, content access, file-origin cross-file access, universal file access, popups and mixed content, and exposes no JavaScript-to-native bridge. The HTML CSP still allows `style-src 'unsafe-inline'`; removing that allowance requires a reviewed refactor of runtime style updates and is not claimed complete.
- The current source CycloneDX inventory is not an APK/runtime SBOM and does not establish complete Gradle dependency coverage. The Android dependency inventory workflow generates candidate SHA-256 metadata from the same resolver; those generated values are not independent publisher authentication. Full configuration-resolution coverage and independent publisher checksum/signature verification remain open.
- Physical-device functional/offline/lifecycle acceptance and TalkBack/screen-reader/switch-access acceptance remain owner-level checks. Branch-protection and intentional public contact-disclosure decisions also remain open. No production signing, deployment, release publication or store submission is authorized.

These automated results are evidence that configured checks passed; they are not proof of zero vulnerabilities, complete security assurance, WCAG 2.2 AA conformance, or release readiness.

## Latest Gate 2 / security assurance status — 2026-11-23

The latest application/toolchain commit on `main` is `8310d670af4c9041144c1c3d81d4a5e42fab5ebe` (PR #113). PR #114 was a documentation-only reconciliation merged as `17b5a6073a2ad3ff1d76efe0b04a0fa21f3402f6`; its post-merge Security Assurance [45133096884](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45133096884) passed all eight jobs and Web Validation [45133096812](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45133096812) passed all 41 steps. PR #113 exact-head Web Validation [45127168946](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127168946) passed all 41 steps; Security Assurance [45127169139](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127169139) passed all eight jobs; Dependency Review [45127169048](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127169048) passed. Its Android dependency-inventory run [45127104403](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127104403) also succeeded and produced the 30,059-byte inventory artifact. A separate redundant inventory run [45127168997](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127168997) failed after Maven Central returned HTTP 429 for multiple POM requests; the successful same-head artifact is available, so this is recorded as transient upstream throttling, not an application/build-configuration failure.

Post-merge mainline Web Validation [45128635330](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45128635330) passed all 41 steps and Security Assurance [45128635208](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45128635208) passed all eight jobs, including OpenSSF Scorecard. Scorecard is 6.2. The Security Assurance Dashboard records the current SARIF/SBOM triage, source-review coverage, provenance limitations and remaining owner actions.

PR #111's API 23–32 class-verification remediation and PR #113's official Gradle wrapper JVM-default restoration are merged. The Android configuration remains application ID `com.mindquest.app`, minSdk 23, compileSdk/targetSdk 35, Java/Kotlin 17, AGP 8.7.3, Kotlin plugin 2.0.21 and Gradle 8.9.

Current product scope is five regions, five interface locales and five question locales: 250 stable question IDs and 1,250 localized records. The Android release-validation workflow remains manually gated by `feature_scope_complete=true`. It has not been dispatched; no current Gate 2 APK has been assembled or inspected. Do not infer Kotlin compilation, merged-manifest or APK-level security from browser/static CI. Physical-device, TalkBack/screen-reader and switch-access acceptance remain project-owner tasks. No production signing, release publication, deployment or store submission is authorized.

Security assurance remains open for complete tracked-file source review, independent Gradle artifact checksum/signature verification and configuration-resolution coverage, APK-level SBOM reconciliation, WebView/CSP hardening assessment, and owner-level branch-protection/contact-disclosure decisions. Generated Gradle verification metadata remains untrusted and unenforced.

Open toolchain upgrade proposals PR #95 (Kotlin 2.4.21), PR #97 (AGP 9.5.2) and PR #106 (Gradle 9.9.2) remain held as a coordinated set; all are based on older mainline snapshots. PR #96 is closed/superseded. Do not merge any upgrade independently or bypass the explicit Gradle 8.9 compatibility guard.


---


## Historical Gate 2 status — PR #68 merged (2026-11-21)

- PR [#68](https://github.com/ErTapanJatakia/MindQuest/pull/68) merged to `main` as `a89a919b3726a4e198df167698c414d380f1f0ec` after exact-head workflow [#44848743446](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44848743446) passed all 38 substantive validation steps on head `3adefe2429eb04f30eb5738d469cb52e843d2814`.
- Post-merge mainline workflow [#44851298170](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44851298170) was triggered on the merge commit and is pending at the time of this update; do not report it as passed until its conclusion is observed.
- PR #68 reconciles current five-region/five-locale scope, accessibility evidence boundaries and documentation/policy push-trigger coverage. It does not modify runtime application code or build an APK.
- The latest remote batch is extending the manually gated debug-package inspection to verify APK min/target SDK metadata (23/35) and enforce a 30-minute validation-job timeout. The workflow remains manual, debug-only and gated by `feature_scope_complete=true`.
- Gate 2 remains open for remote engineering closeout, debug-package inspection and project-owner physical-device/assistive-technology acceptance. No production signing, deployment or store submission is authorized.

---

Last updated: 2026-11-23

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
- Package ID `com.mindquest.app`, min SDK 23, target SDK 35, Java/Kotlin 17, pinned Android Gradle Plugin 8.7.3, Kotlin plugin 2.0.21 and Gradle 8.9 wrapper.

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


## Gate 2 release-boundary audit closeout — 2026-11-21

- PR [#65](https://github.com/ErTapanJatakia/MindQuest/pull/65) is merged to `main` as `1fab23c732e4e4a26811e5db0483595934a8def6`.
- Exact-head workflow [#44843574405](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44843574405) ran against `ffaba22d01a98f71bfdb078c2deeac14ec4566ef` and passed all 38 substantive validation steps.
- The audit now guards against release assembly/signing/publishing paths, enforces read-only repository permissions for routine feature CI, retains the 14-day debug-artifact retention boundary, and checks debug-only package evidence including package/version identity, permissions, bundled offline assets and APK SHA-256.
- This PR changed audit/documentation only; it did not modify runtime app code or question content and did not build an APK.
- PR #65 exact-head success does not itself establish a post-merge mainline run on `1fab23c732e4e4a26811e5db0483595934a8def6`; that evidence must be recorded only after the corresponding run is observed.
- Gate 2 remains in progress. Physical installation/display/orientation, TalkBack and switch access, native process-death/storage recovery, airplane-mode runtime observation and manual candidate-package acceptance remain outstanding.
- No APK/Gradle build, production signing, deployment or RuStore submission has been performed or authorized.


## Gate 2 evidence reconciliation — 2026-11-21 (PRs #65–#67)

- PR [#65](https://github.com/ErTapanJatakia/MindQuest/pull/65) merged as `1fab23c732e4e4a26811e5db0483595934a8def6`; exact-head workflow [#44843574405](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44843574405) passed all 38 substantive validation steps on head `ffaba22d01a98f71bfdb078c2deeac14ec4566ef`.
- PR [#66](https://github.com/ErTapanJatakia/MindQuest/pull/66) merged as `a8c8ba53d4194fde4e0104d51c45d806db6c4786`; exact-head workflow [#44841777408](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44841777408) passed all 38 steps and verified the corrected version-evidence audit expression.
- PR [#67](https://github.com/ErTapanJatakia/MindQuest/pull/67) merged as `e044efa1bd7171e1c3bb601c87ae2fa9126abb43`; exact-head workflow [#44846742430](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44846742430) passed all 38 substantive validation steps.
- The PR #67 workflow is exact-head PR evidence. A post-merge mainline run on `e044efa1bd7171e1c3bb601c87ae2fa9126abb43` has not been observed; do not claim one passed.
- PR #67 is documentation-only. It does not build an APK, execute Gradle or close native/physical acceptance.
- The CI push path filter is being expanded to include project documentation and policy files so future docs-only main-branch changes receive the same required regression suite after merge.
- Gate 2 remains open for final remote review and debug-package validation, followed by project-owner physical Android and assistive-technology acceptance. No signing, deployment or store submission is authorized.


## Latest verified Gate 2 checkpoint — PR #72 (2026-11-21)

- PR [#72](https://github.com/ErTapanJatakia/MindQuest/pull/72) merged to `main` as `bf205a4dfb8b3a0a19ada06bca5f88b0d06a77d5`.
- Exact-head CI [#44857711817](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44857711817) passed all 38 substantive validation steps.
- Post-merge mainline CI [#44858943902](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44858943902) passed all 38 substantive validation steps on the merge commit.
- The compact-phone hero overlap correction and actual rendered-text geometry regression are now merged and green. The regression remains enabled across the 12 responsive profiles.
- The remote status checkpoint is documented in [Gate 2 remote engineering status](GATE-2-REMOTE-ENGINEERING-STATUS-2026-11-21.md).
- Gate 2 remains open: no debug APK has been built/inspected; physical-device, TalkBack/switch-access, native process-death/storage and airplane-mode runtime acceptance remain outstanding. The remote hand-off has not yet been declared.
- No APK/Gradle build, production signing, deployment or RuStore submission occurred in this batch. No release authorization is inferred.

## Post-PR #73 mainline closeout — 2026-11-21

- PR [#73](https://github.com/ErTapanJatakia/MindQuest/pull/73) merged as `41f8e68fee2993279f722c4ea9a0e303413e3a9b`.
- Post-merge mainline workflow [#44917735958](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44917735958) passed **all 38/38 substantive validation steps** on the merge commit. This supersedes the earlier pending status recorded in historical entries.
- Final passing steps include question exhaustion/cycle restart/replay, persistence and site-data reset, fresh-context preferences and interrupted-round recovery, multilingual live announcements and answer review, keyboard focus isolation, Android build-boundary, WebView/lifecycle source and manifest security audits.
- Remote source/configuration and disclosure review reconfirmed the Android package identity/version and SDK configuration, local-only WebView boundaries, disabled backup/cleartext, no declared manifest permissions, and privacy/accessibility limitations.
- The manually gated debug APK workflow has not been dispatched or executed. No APK/Gradle build, artifact inspection, signing, deployment or store submission has occurred.
- Gate 2 remains open pending gated debug-package build/inspection and project-owner physical-device, native lifecycle/offline/storage and assistive-technology acceptance. No remote hand-off is declared yet.
- To run the package validation after the agreed feature scope is confirmed complete, the project owner must manually dispatch `.github/workflows/android-release-validation.yml` with `feature_scope_complete=true`. The connected GitHub integration has no workflow-dispatch action.



## Android package identity migration — 2026-11-21

The project owner approved `com.mindquest.app` as the permanent Android application ID. The former `app.mindquest` package ID remains only in historical records. The migration updates Gradle namespace/applicationId, Kotlin package/source path, static source audit and final APK package/evidence assertions as one change set. Version code/name and SDK levels remain unchanged (1 / 0.1.0; minSdk 23; targetSdk 35). The prior debug artifact carries the old identity and must not be used for Gate 2C acceptance. After this change is merged, the owner must manually dispatch the final validation workflow with `feature_scope_complete=true` to produce the replacement debug APK. No signing, production release or store submission is authorized.
