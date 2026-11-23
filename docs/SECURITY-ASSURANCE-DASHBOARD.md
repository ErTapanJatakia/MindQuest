# MindQuest Security Assurance Dashboard

**Programme status (2026-11-23):** Security scanner baseline operational on `main`; latest main commit is `8310d670af4c9041144c1c3d81d4a5e42fab5ebe` (PR #113). Latest post-merge Security Assurance [run 45128635208](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45128635208) passed all eight jobs; Web Validation [run 45128635330](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45128635330) passed all 41 steps. The latest OpenSSF Scorecard remains 6.2. Core runtime, data, Android wrapper, workflow and test-source review has advanced, but full tracked-file review and independent Gradle plugin/transitive-artifact provenance/configuration coverage remain open; APK-level verification remains feature-completion-gated.
**Application:** MindQuest — offline-first Android app with a bundled HTML/CSS/JavaScript runtime and Kotlin WebView wrapper.  
**Android application ID:** `com.mindquest.app`  
**Scope:** Entire repository, application source, Android wrapper, dependencies, build configuration, CI/CD and distributable artefacts.

> This dashboard records engineering evidence. A green workflow means that the configured checks completed; it is not proof that the application is vulnerability-free, a penetration test, a security certification or an independent audit.


## Latest mainline assurance confirmation — PR #113 (2026-11-23)

- PR [#113](https://github.com/ErTapanJatakia/MindQuest/pull/113), “Restore official Gradle 8.9 wrapper JVM defaults”, merged as `8310d670af4c9041144c1c3d81d4a5e42fab5ebe`. It restores the official UTF-8 default JVM option in the Unix and Windows Gradle wrapper scripts; it does not upgrade Gradle or alter application runtime code.
- Post-merge Security Assurance [run 45128635208](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45128635208) passed all eight jobs. Post-merge Web Validation [run 45128635330](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45128635330) passed all 41 workflow steps.
- Scanner artifacts were downloaded and inspected: Trivy SARIF contained 0 results; Semgrep contained 1 expected exported launcher activity; DevSkim contained the 7 previously triaged false positives (six Android XML namespace URI warnings and one static timeout callback note); MobSFscan contained the documented source-only StrandHogg heuristic plus six informational notes; OSV completed with no supported package source/lockfile detected (coverage limitation, not a clean dependency verdict); CodeQL JavaScript/TypeScript completed successfully.
- The Android dependency-inventory workflow also completed successfully on PR #113 commit `12deb0f6e800fcff3d3413b30d0bea587e2a031f` in [run 45127104403](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127104403), producing the 30,059-byte inventory artifact. A separate redundant run [45127168997](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45127168997) failed after Maven Central returned HTTP 429 for multiple POM requests; this is an upstream repository rate-limit event, not a source/build-configuration failure. The successful same-head artifact remains available, so no blind retry or build-configuration change was made.
- The current CycloneDX source SBOM contains 38 components (30 GitHub Actions usage entries, 7 source-file entries and 1 Gradle Wrapper JAR). It is not an APK/runtime SBOM and does not prove complete Gradle configuration resolution.
- OpenSSF Scorecard v5.7.0 reports **6.2** on commit `8310d670af4c9041144c1c3d81d4a5e42fab5ebe`: Token-Permissions 10/10; Dangerous-Workflow 10/10; Vulnerabilities 10/10 (0 detected by this check); CI-Tests 10/10; Pinned-Dependencies 8/10 (npm/pip installer commands remain unpinned by hash); SAST 8/10 (17 of 29 sampled commits covered); Branch-Protection 0/10; Code-Review 0/10; Fuzzing 0/10. The Maintained check is not yet scored because the repository is under 90 days old. Packaging and signed-release checks are not applicable to the unreleased app at this stage. Scorecard is a repository-practice signal, not a security certification.
- A further source review pass examined the current HTML/CSP, CSS, runtime JavaScript, all question and translation bundles, staged Spain/Peru content, activation guard, key data validators, offline-isolation/fail-closed/storage/lifecycle tests, Android manifest and API-specific WebView helpers. No HTML injection sink, dynamic code evaluation, runtime network API, unsafe URL payload or control-character payload was found in the reviewed application/data files. The theme engine writes only hard-coded palette values to CSS custom properties; the existing `style-src 'unsafe-inline'` allowance remains a hardening item requiring a safe class-based refactor before removal.
- The accessibility statement correctly identifies the WCAG 2.2 AA target, places conformance responsibility on the application owner, and states that the W3C logo is not an audit or certification. Physical Android, TalkBack/screen-reader and switch-access acceptance remains reserved for the owner against the exact candidate build.
- Build-tool provenance was cross-checked against publisher-facing records: [Android's official AGP 8.7 release notes](https://developer.android.com/build/releases/agp-8-7-0-release-notes) include the 8.7.3 fixes and specify Gradle 8.9/JDK 17 compatibility for the 8.7 line; the [Gradle Plugin Portal](https://plugins.gradle.org/plugin/org.jetbrains.kotlin.android/2.0.21) identifies Kotlin Android plugin 2.0.21 as owned by the Kotlin Team, and [Maven Central's component record](https://central.sonatype.com/artifact/org.jetbrains.kotlin/kotlin-gradle-plugin/2.0.21) identifies JetBrains and its Kotlin source repository. These corroborate release identity and declared provenance, **not** artifact cryptographic authenticity. Independent publisher checksum/signature verification for the full AGP/Kotlin artifact set remains incomplete; generated Gradle SHA-256 values must not be treated as independent proof or committed as trusted metadata yet.
- No new confirmed exploitable application vulnerability was established in this pass. The source review is **not complete**: the remaining tracked-file inventory, dependency provenance/configuration-resolution coverage, branch protection, owner confirmation of intentionally public contact details, and feature-complete APK validation remain open. No APK was assembled, signed or released by these checks.

## Latest mainline checkpoint — PR #111 (2026-11-23)

- PR [#111](https://github.com/ErTapanJatakia/MindQuest/pull/111), “Isolate newer Android APIs from the API 23 Activity class”, merged as `de613efd328e18cdb005525e9074208a5eb36be4`.
- The remediation isolates API 30 `WindowInsets.Type` calls and API 33 predictive-back callback/dispatcher types in version-specific helper classes; `MainActivity` retains baseline API types in its fields and method signatures. The callback is held as `Any?` in the API 23-loadable Activity class.
- Post-merge Web Validation [run 45121654625](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45121654625) passed all 41 steps, including the strengthened Android WebView/lifecycle source audit. Post-merge Security Assurance [run 45121654636](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45121654636) passed all eight jobs.
- The Android source audit now explicitly checks API 30/33 class-reference isolation, callback registration/unregistration, API 35 inset handling, and the existing offline WebView boundary. This is static source/configuration evidence only; Kotlin compilation and API 23–32 runtime class-loading behavior remain unverified until the gated Android build and owner device/emulator acceptance.
- PR #109 post-merge Web Validation [run 45116991488](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45116991488) also completed successfully: all 41 steps passed. The earlier “still running” notes in the historical PR #109 checkpoint below are superseded by this final result.

## Gradle wrapper provenance and hardening — PR #113

- The committed `android/gradle/wrapper/gradle-wrapper.jar` was compared directly with the official `gradle/gradle` repository at tag `v8.9.0`; both have the exact Git blob SHA `2c3521197d7c4586c843d1d3e9090525f1898cde`.
- The repository's Unix and Windows wrapper launch scripts were compared line-by-line with the same official tag. Their only semantic deviation was omission of the official `-Dfile.encoding=UTF-8` default JVM option. PR #113 restores that option in both scripts while preserving Windows CRLF line endings.
- `scripts/audit-android-manifest.mjs` now enforces the UTF-8 default in both wrapper scripts. An earlier exact-head Web Validation attempt [run 45124008587](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45124008587) failed only at the new Windows-wrapper audit: its regex incorrectly required the UTF-8 option to be the final token, although the official wrapper correctly retains the standard heap options after it. The assertion was corrected to validate the full option line without relaxing the requirement. The current exact-head Web Validation [run 45125528877](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45125528877) passed all 41 steps.
- PR #113 Security Assurance [run 45125528891](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45125528891) passed all scanner jobs and CycloneDX SBOM; OpenSSF Scorecard was skipped as designed for a pull request. Dependency Review [run 45125528881](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45125528881) passed. Android dependency inventory [run 45125528894](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45125528894) completed successfully with Gradle 8.9; it did not assemble an APK.
- Independent provenance of all Gradle plugins/transitive artifacts and complete configuration-resolution coverage remain open. The 413 SHA-256 verification entries previously generated by Gradle remain candidate metadata only; signatures were not enabled and generated checksums are not independent publisher authentication.

## Assurance gates

| Gate | Scope | Evidence / control | Status |
|---|---|---|---|
| A — Repository baseline | Source inventory, architecture, data flows, trust boundaries, secrets and configuration | Manual review + repository checks | In progress |
| B — SAST | JavaScript/TypeScript and Kotlin source | CodeQL security-extended for JavaScript/TypeScript; Semgrep, DevSkim and MobSFscan for broader source coverage | Initial PR scan completed; no new alerts in changed files |
| C — Dependency security | Gradle and any supported package manifests/lockfiles | Dependency Review on PRs; OSV-Scanner; Trivy | Initial scans completed; OSV reports no supported package source/lockfile |
| D — Android hardening | Manifest, WebView settings, navigation, lifecycle, APK permissions and bundled assets | Existing custom audits + CodeQL; final APK inspection | Existing checks; deeper review in progress |
| E — Supply chain | Source inventory, SBOM and repository security posture | Syft CycloneDX SBOM; OpenSSF Scorecard; Dependabot; immutable action pins | PR #94 pinned workflow actions to verified full SHAs and Semgrep to 1.186.0; PR #82 enabled Dependabot; PR #100 pinned the Gradle 8.9 binary distribution SHA-256; refreshed main-branch Scorecard run 45064544786 scored 6.1 |
| F — Runtime and regression | Offline isolation, CSP, persistence, gameplay, accessibility, responsive layouts and lifecycle | Existing project CI suite | Existing CI; review findings to be correlated |
| G — Remediation verification | Triage, fix, regression test, scanner rerun and closure evidence | Pull requests and this dashboard | Initial scanner triage documented; no new alerts in PR-changed lines |
| H — Release evidence | Exact candidate APK, package identity, permissions, hashes and manual acceptance | Gated Android validation + owner testing | Separate release gate |

## Configured free / open-source controls

| Tool | Purpose | MindQuest fit | Operating model |
|---|---|---|---|
| GitHub CodeQL | Semantic SAST and security queries | JavaScript/TypeScript (Kotlin extraction deferred due Android Gradle autobuild dependency-resolution failure) | GitHub-hosted workflow; SARIF code scanning |
| Semgrep Community Edition | Rule-based SAST | JavaScript and Android/Kotlin source patterns | Self-hosted CLI in GitHub Actions; community rules |
| Microsoft DevSkim | Security linting | JavaScript, Kotlin/Java and configuration patterns | Free open-source GitHub Action; SARIF |
| MobSFscan | Mobile-source SAST | Kotlin, Android XML and hybrid web source | Free open-source CLI pinned to 1.2.0; SARIF |
| Trivy | Filesystem vulnerability, secret and misconfiguration scan | Repository manifests, configuration and detectable secrets | Free open-source CLI/action; SARIF |
| OSV-Scanner | Known vulnerable dependency detection | Supported lockfiles/manifests, including Gradle ecosystems where dependency metadata is available | Free open-source CLI |
| Dependency Review | Detect vulnerable dependency changes in pull requests | PR dependency changes | GitHub-maintained action |
| Dependabot | Automated dependency update proposals | Gradle build plugins and GitHub Actions | Weekly update PRs; manual review and merge only |
| Syft | Software Bill of Materials | Source/dependency inventory | CycloneDX JSON artifact |
| OpenSSF Scorecard | Repository and supply-chain hygiene | Public GitHub repository | Free open-source action |

### Important coverage limitations

- MindQuest currently has no `package-lock.json` and no declared npm runtime dependencies. Do not interpret an empty JavaScript dependency scan as proof that there are no transitive dependencies.
- Gradle dependency declarations and the Gradle wrapper distribution must be reviewed; dependency locking and verification are not assumed to exist. The Wrapper distribution checksum is pinned and statically audited (PR #100 merged). A dedicated, non-release dependency-inventory workflow is being introduced to resolve plugin/build dependency metadata and generate SHA-256 verification candidates without assembling an APK; its output must be reviewed before any metadata is committed.
- OSV and Trivy coverage depends on supported manifests, lockfiles and package metadata. Their reports must be checked for skipped/unresolved inputs.
- Syft's SBOM is an inventory, not a vulnerability verdict.
- Scorecard measures repository practices, not application runtime security. The initial main-branch snapshot scored 4.1. The refreshed snapshot for commit `e551a511d63075058c04c17a1064a4d185a7acc4` scored **6.1**; several findings are repository configuration or release-lifecycle gaps, not application vulnerabilities.
- Dependabot configuration was merged in PR #82. PR #83 retired the obsolete wrapper-bootstrap workflow; PR #94 pinned all 43 GitHub Actions references in scope to verified full SHAs and Semgrep to `1.186.0`; PR #100 pinned the Gradle 8.9 binary distribution checksum. The latest Scorecard confirms Token-Permissions 10/10 and reports all 49 GitHub Action dependencies pinned (39 GitHub-owned and 10 third-party). Its overall score is 6.2.
- The Gradle plugin and wrapper dependency graph now has a resolved candidate inventory (PR #105): 235 components, 71 groups and 413 artifact records. The current Syft source SBOM detects GitHub Actions usage and the Gradle wrapper JAR, but neither artifact is an APK/runtime SBOM or proof of complete Gradle configuration coverage.
- CodeQL/Semgrep/Trivy results may overlap. Deduplicate by root cause, affected component and CWE before remediation.
- No DAST/API scanner is enabled: the product intentionally has no backend or network API. Do not introduce an external test target or network dependency merely to satisfy a tool catalogue.
- MobSFscan is enabled for source-level Android/Kotlin/XML and hybrid web checks. The full MobSF framework's APK-level and dynamic-analysis stages remain separate: APK scanning requires a completed Android build artifact, while dynamic analysis requires a controlled Android runtime.
- Commercial offerings and free-tier SaaS tools requiring account/API credentials are excluded until the owner explicitly approves their terms, data handling and any credentials.

### First scanner-run triage (PR validation)

- **Trivy:** completed successfully and produced a valid SARIF report with zero findings. This does not establish dependency coverage for manifests that Trivy cannot resolve.
- **Semgrep Community:** the first complete scan ran 236 rules over 44 files and reported two findings. The dynamic-regex warning in `app/src/app.js` was remediated by replacing the constructed expression with a fixed allow-listed pattern and a stricter region/category prefix check. The exported Android launcher activity finding is an expected platform requirement: it is the sole activity with only the `MAIN`/`LAUNCHER` filter and exposes no privileged native bridge or privileged intent operation. It remains documented as an accepted design finding, not silently suppressed.
- **DevSkim:** seven findings were reviewed. Six `DS137138` alerts are false positives on the Android XML namespace URI (`http://schemas.android.com/apk/res/android`), not network requests. One `DS172411` note is a false positive on a static function callback passed to `setTimeout`, not a string or untrusted value. Preserve the rule and rationale; do not suppress the whole rule globally.
- **OSV-Scanner:** the repository contains no supported package source/lockfile for OSV to scan. The workflow now records this as a coverage notice rather than claiming a clean scan or failing with an empty SARIF. Trivy and PR Dependency Review remain enabled.
- **Syft (initial baseline):** the first CycloneDX run had zero package components. The later post-PR #109 run now detects 38 components: 30 GitHub Actions usage entries, seven source-file entries and one Gradle Wrapper JAR. This improves workflow/source inventory but does not represent the app's runtime dependencies or a built APK.
- **CodeQL:** JavaScript/TypeScript security-extended analysis completed successfully. Kotlin extraction is not claimed: the earlier Android Gradle autobuild could not resolve plugin dependencies on the runner. Kotlin is covered by Semgrep, DevSkim, MobSFscan and manual review.
- **OpenSSF Scorecard:** the earlier main-branch snapshot for commit `091257120d5b8d07584857db40afd0794c880690` (run `45074825719`) scored 6.1. The latest post-PR #109 main-branch snapshot for commit `4df2a5a2b09f33c19c257b1d96b3e8cd61a333cb` (run `45116991486`) scored **6.2** and reported zero existing vulnerabilities. Token-Permissions scored 10/10; all 49 GitHub Action dependencies were pinned (39 GitHub-owned and 10 third-party); Pinned-Dependencies scored 8/10 because npm and pip installer commands are not hash-pinned. Branch-Protection and Code-Review remain 0/10; Fuzzing is 0/10. These are repository-practice signals, not application vulnerability findings or a security certification.


### Exception and coverage register

| Item | Classification | Disposition / evidence | Closure condition |
|---|---|---|---|
| Android launcher exported activity (Semgrep) | Expected Android platform requirement | Sole exported activity has only MAIN/LAUNCHER; no privileged JS bridge or privileged intent handler is exposed | Retain; re-check merged APK manifest at release gate |
| StrandHogg 2.0 source heuristic (MobSFscan) | Conditional source-only false positive | Gradle config declares targetSdk 35; source scan cannot resolve the effective merged manifest | Release workflow must confirm final APK targetSdkVersion 35 and inspect merged manifest before release |
| DevSkim DS137138 (Android XML namespace URI) | False positive | URI is an XML namespace identifier, not an outbound network request | Retain rationale; no global rule suppression |
| DevSkim DS172411 (setTimeout callback) | False positive | Static function callback, not string evaluation or untrusted input | Retain rationale; no global rule suppression |
| OSV no package sources | Coverage limitation | No supported package lockfile was present; scanner completion is not a clean dependency verdict | Add dependency lockfiles if runtime/build dependency declarations are introduced; inspect Gradle plugin versions and wrapper separately |
| Initial Syft zero package components | Historical coverage limitation | The initial baseline source scan found no components; the post-PR #109 run now detects 38 source/workflow components | Generate an APK-level SBOM at release gate and reconcile it with source inventory |
| OpenSSF Scorecard skipped on PR | Expected workflow scope | Scorecard job is intentionally main-branch-only; main run now succeeds and publishes SARIF | Keep main/scheduled scan and review each snapshot |
| Scorecard Token-Permissions | Repository hardening item | Main run `45074825719` confirms 10/10; no job-level write permissions or dangerous workflow patterns detected | Retain least-privilege workflow permissions and recheck future changes |
| Scorecard Pinned-Dependencies | Supply-chain hardening item | Latest run `45116991486` reports 39/39 GitHub-owned and 10/10 third-party GitHub Action dependencies pinned; Semgrep is pinned to `1.186.0`; npm and pip installer commands remain unpinned by hash (Scorecard 8/10) | Assess reproducible hash-locked npm and Python tool installation without weakening the workflows |
| Scorecard Branch-Protection | Repository settings gap | Scorecard reports main branch protection is not enabled; connected GitHub integration cannot read/update the admin-only setting | Owner to configure and verify GitHub branch protection/ruleset |
| Scorecard Fuzzing / Signed-Releases | Lifecycle maturity items | No fuzzing integration or signed release is currently detected; no public release has been created | Evaluate property-based tests; implement signed release attestations when release process is established |

## Source review checklist

The review must cover every tracked source/configuration file, not only files changed in the latest pull request.

### Application runtime
- [ ] HTML entry point, CSP, external links, local assets and DOM trust boundaries
- [ ] JavaScript modules, event handling, state transitions and dynamic rendering
- [ ] Question bank and localized content integrity; data parsing and fail-closed behaviour
- [ ] Local storage schema, validation, recovery, privacy and data minimisation
- [ ] Keyboard, focus management, accessible names, announcements and reduced-motion/high-contrast behaviour
- [ ] CSS injection surfaces, unsafe HTML sinks, URL handling and resource loading

### Android wrapper and build
- [ ] Manifest permissions, exported components, backup, cleartext and debuggable settings
- [ ] WebView JavaScript, DOM storage, file/content access and universal/file-origin access
- [ ] Navigation allow-list, URL parsing, external intent handling and local asset origin
- [ ] Lifecycle, back navigation, configuration changes, edge-to-edge insets and WebView destruction
- [ ] Gradle plugins, repositories, dependency versions, wrapper integrity and build reproducibility (distribution checksum pin and regression audit added in PR #100 merged; dependency graph/verification remains open)
- [ ] APK package identity, permissions, bundled assets and cryptographic hash

### Repository and delivery
- [ ] GitHub Actions permissions, action pinning, untrusted PR handling and artifact retention
- [ ] Branch protection / repository ruleset on `main`
- [ ] Secret exposure, generated files, release/signing boundaries and branch protection
- [ ] SBOM completeness, dependency provenance and known-vulnerability exposure
- [ ] Privacy policy, security policy, accessibility statement and product claims consistency

## Initial manual source-review observations

The source-review passes to date have inspected the HTML entry point and embedded legal statements, core JavaScript runtime modules, question and localization data bundles, staged regional activation, CSS, SVG assets, the complete scripts inventory, Android manifest, Kotlin Activity, Gradle configuration, CI workflows, privacy/accessibility disclosures, QA/release documentation and the security dashboard. This is a substantial review tranche, not a completed review of every tracked file or the built APK.

- The reviewed runtime JavaScript contains no detected `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `eval`, `new Function`, `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon` or `document.cookie` usage. Rendering observed in the core path uses DOM construction, `textContent`, and `replaceChildren()`.
- Settings and score data are read from local storage with exception handling and strict shape/range validation. Theme and accessibility preferences use guarded local-storage access and constrained values.
- The Android activity enables JavaScript for the bundled game, does not expose a JavaScript bridge, disables WebView debugging, content access, file-origin cross-access, universal file-origin access, automatic JavaScript windows and mixed content, and filters main-frame navigation to the bundled entry document.
- The current WebView still uses a `file://` entry point and `allowFileAccess=true`. This is constrained by the other settings and the local-only app design; no exploit has been established from this observation. Consider AndroidX `WebViewAssetLoader` as a future hardening option to move to an HTTPS-like app asset origin and disable general file access, but only after compatibility testing.
- The CSP intentionally includes `'unsafe-inline'` in `style-src`. A repository search for common runtime inline-style setters and HTML `style` attributes did not return matches, but that search is not a complete proof that inline styles are unused. A controlled browser regression is required before narrowing the directive; do not remove it blindly.
- The app's privacy and accessibility text contains direct developer contact details. Because the repository is public and these pages are bundled in the application, confirm that the published contact channels are intentionally public and that no personal contact method should be removed or replaced. This remains an owner-intent decision; no contact details were altered.

### Initial finding register

| ID | Observation | Classification | Priority | Status / next action |
|---|---|---|---|---|
| MQ-PRIV-001 | Direct developer contact details are embedded in public in-app legal pages and shipped assets | Potential privacy exposure; owner intent required | Medium | Needs owner confirmation; no automatic deletion |
| MQ-AND-001 | WebView loads local content through `file://` with `allowFileAccess=true` | Hardening opportunity; not a confirmed vulnerability | Low / Medium | Evaluate WebViewAssetLoader migration and compatibility before changing |
| MQ-CSP-001 | CSP `style-src` allows `'unsafe-inline'` | Defence-in-depth review item | Low / Medium | Determine whether inline style allowance can be narrowed safely |
| MQ-SCA-001 | Gradle dependency graph/lockfile coverage is incomplete; no npm lockfile is present | Coverage gap, not a vulnerability finding | Medium | Dependabot is enabled; resolve and record Gradle plugin/runtime dependency graph; assess lockfile and verification metadata |
| MQ-SUP-002 | Gradle Wrapper distribution URL lacked `distributionSha256Sum` | Build-tool integrity hardening gap; no evidence of a tampered distribution | Medium | PR #100 merged; official Gradle 8.9 binary distribution SHA-256 and static regression audit are present on `main` |
| MQ-CI-001 | One-time Gradle wrapper bootstrap workflow grants top-level `contents: write` and pushes directly to `main` | CI/CD least-privilege risk; workflow is obsolete because verified wrapper files already exist | Medium | Retire workflow; normal Android CI continues validating the checked-in wrapper |
| MQ-SUP-001 | GitHub Actions and selected npm/pip tools are not pinned to immutable revisions/versions | Supply-chain reproducibility and tag-movement risk | Medium | Pin all workflow actions to verified full commit SHAs and pin scanner/tool versions where supported |
| MQ-REPO-001 | Scorecard reports no branch protection on `main` | Repository governance gap | High | Owner to configure PR/status-check protections; verify with a fresh Scorecard report |

No confirmed exploitable vulnerability is recorded from this initial manual pass. Scanner results and deeper review of the complete repository, build chain and release artefact remain outstanding.

## Finding severity and remediation policy

| Priority | Triage expectation | Required handling |
|---|---|---|
| Critical | Immediate | Stop release; contain exposure; fix and verify before proceeding |
| High | Before next release | Dedicated remediation PR; regression test; full relevant scanner rerun |
| Medium | Planned engineering work | Risk-based prioritisation; owner and target milestone |
| Low / Informational | Track or document | Fix when proportionate; record accepted rationale where applicable |

A scanner alert is a lead, not an automatically confirmed vulnerability. Each finding must be classified as **Confirmed**, **False Positive**, **Accepted Risk** or **Needs Investigation** with evidence. Do not dismiss alerts merely to make the dashboard green.

### Remediation workflow

1. Record scanner, rule/CWE, file and line, severity, evidence and affected build.
2. Reproduce or validate the data/control flow manually.
3. Identify root cause and scope; check whether the issue crosses the web/native boundary.
4. Implement the smallest safe fix and add a regression test where feasible.
5. Run targeted tests, the full relevant CI gate and the originating scanner.
6. Review the diff for regressions; close only with evidence.
7. Record any accepted residual risk, rationale, owner and review date.

**Quality guardrail:** Never weaken or delete tests to obtain a pass. After three consecutive failures with the same strategy, stop repeating it and change approach or defer.

## Current baseline observations

- The product is designed to be offline-first, with no account, backend, analytics SDK or mandatory network connection.
- The Android manifest currently declares no `uses-permission`, disables backup and cleartext traffic, and supports sensor-driven orientation.
- The WebView source disables content access, file-origin cross-access, universal file-origin access, automatic JavaScript windows and mixed content; it loads the bundled local entry point.
- The existing CI includes targeted CSP/offline-boundary, manifest, WebView lifecycle, browser, persistence, accessibility and gameplay checks.
- These are useful controls, but they do not replace a complete source review or inspection of the exact final APK.

## Runbook and links

- [Security Assurance workflow](../.github/workflows/security-assurance.yml)
- [Dependency Review workflow](../.github/workflows/dependency-review.yml)
- [Security policy](../SECURITY.md)
- [Architecture](ARCHITECTURE.md)
- [Release readiness and manual QA](RELEASE-READINESS-AND-MANUAL-QA.md)
- [Repository Code Scanning](https://github.com/ErTapanJatakia/MindQuest/security/code-scanning)
- [Repository Actions](https://github.com/ErTapanJatakia/MindQuest/actions)

**Historical checkpoint after PR #104 (superseded by the post-PR #109 update below):** PR #104 merged. Main Security Assurance run `45074825719` passed all eight jobs; main Web Validation run `45074825740` passed all 38 steps. The refreshed Scorecard remains **6.1** (details above). A dedicated non-release Gradle dependency-inventory workflow is now proposed in PR review; it resolves build/plugin dependency metadata and generates SHA-256 verification candidates without invoking `assembleDebug` or the gated APK validation. Its generated metadata is evidence to review, not automatically trusted or committed. The latest manual review tranche includes the complete `scripts/` inventory, app runtime/data bundles, CSS/SVG assets, legal disclosures, QA/release docs, Android wrapper and CI workflows. No new confirmed exploitable vulnerability was established in this tranche. Remaining work: finish file-by-file review and source-to-build reconciliation; inspect Gradle dependency inventory and decide whether to commit verification metadata and locking; assess CSP/WebView hardening; owner confirms intentional publication of developer contact details and configures `main` branch protection; after all feature scope is confirmed complete, run the manually gated Android validation and reconcile the APK-level inventory. PRs #95–#97 (Kotlin, Gradle and Android Gradle Plugin major upgrades) remain held as one coordinated candidate until build validation is authorized and passes.


## Post-PR #105 / #107 assurance update (2026-11-23)

This section supersedes the earlier checkpoint above where it conflicts with the latest main-branch evidence.

- **PR #105 — Gradle dependency inventory:** merged as commit `4beb3ad1317ee3648077c6ad5e9cfd7c6fa61540`. The non-release inventory workflow completed successfully (run `45076464518`). Its retained candidate artifact contained 235 components across 71 groups and 413 artifact entries, each with a SHA-256 checksum. Gradle generated these checksums during resolution; signature verification was disabled. They are candidate integrity metadata, not independent authenticity proof, and are not yet trusted/enforced. Review upstream provenance and configuration coverage before committing verification metadata.
- **PR #105 post-merge validation:** Security Assurance run `45109663006` passed all eight jobs; Web Validation run `45109663007` passed all 38 steps.
- **PR #107 — Syft action patch update:** merged as commit `e96df5dee0e314d95e19e6b1321ab894c73dd8c4`. Post-merge Security Assurance run `45112362021` completed successfully with all eight jobs passed: Syft SBOM, Semgrep, Trivy, CodeQL JavaScript/TypeScript, OpenSSF Scorecard, OSV-Scanner, MobSFscan and DevSkim. OSV's successful job completion does not remove the documented supported-lockfile coverage limitation; skipped SARIF upload reflects no findings artifact to upload, not proof of complete dependency coverage.
- PRs #101 and #102 were closed as superseded by the consolidated documentation update in PR #104. PR #106 (Gradle 9.9.2) remains held; its Web Validation failure is the intentional Gradle 8.9 static compatibility guard, not a reason to weaken the audit.
- **Current status:** source review remains in progress; APK-level validation remains gated until feature scope is declared complete. Physical-device and assistive-technology acceptance remains owner-performed. No release, signing or production deployment action was taken.

### Dependency verification decision gate

Do not commit the generated `android/gradle/verification-metadata.xml` candidate as trusted merely because it contains SHA-256 values. Before enforcement:

1. Map the resolved metadata to direct plugins, direct dependencies, transitive artifacts and relevant Gradle configurations; identify configurations not actually resolved by the inventory task.
2. Independently validate critical artifact coordinates and checksums/signatures against authoritative upstream publisher sources where available.
3. Record provenance, exceptions and any artifacts for which independent verification is unavailable; do not fabricate trust or disable verification to make the build pass.
4. In a separate PR, test committed metadata in read-only verification mode across appropriate non-release Gradle tasks. Keep candidate generation separate from normal CI and never auto-approve newly generated hashes.

**Next checkpoint:** complete the independent Gradle provenance/configuration review; then prepare a separate dependency-verification PR only if evidence supports it. Continue the remaining tracked-file source review and update this dashboard with concrete coverage. Preserve the gated APK validation boundary and the coordinated Kotlin/AGP/Gradle upgrade hold.


## Gradle dependency provenance review — 2026-11-23

### Evidence examined

- Reviewed the retained PR #105 inventory artifact: 235 component coordinates, 71 groups, 91 versions and 413 artifact records. All 413 records contain SHA-256 values. The generated metadata sets `verify-metadata=true` and `verify-signatures=false`.
- Reviewed the Gradle report produced by the inventory workflow. It ran Gradle 8.9 with Temurin JDK 17.0.21 and completed `help`, `buildEnvironment`, `:app:buildEnvironment` and `:app:dependencies` successfully. It did not run `assembleDebug`, package an APK or test runtime behavior.
- Reviewed `android/settings.gradle.kts`, root and app build scripts, wrapper properties and Gradle properties. Plugin repositories are Google Maven, Maven Central and Gradle Plugin Portal; application dependency repositories are Google Maven and Maven Central. The declared build plugins are Android Gradle Plugin 8.7.3 and Kotlin Android 2.0.21. The app module declares no explicit application-library dependencies.
- The dependency report includes plugin/build-tool dependency trees and Android tooling configurations. The app's debug and release compile and runtime classpaths each include Kotlin stdlib 2.0.21, which brings org.jetbrains:annotations 13.0 transitively. This is resolved Gradle classpath evidence, not proof of the exact packaged APK contents; the app module declares no other explicit application-library dependencies. The generated metadata therefore should not be described as an APK or runtime SBOM.
- The official Android Developers AGP compatibility table identifies Gradle 8.9 as the minimum for AGP 8.7. The Kotlin Gradle plugin 2.0.21 is listed by the Gradle Plugin Portal as a Kotlin Team plugin. These sources establish release/ownership and compatibility context, not the integrity of the downloaded artifact bytes.

### Provenance assessment

**No artifact checksum has yet been independently authenticated against a publisher-controlled checksum or signature.** The 413 SHA-256 values were generated by Gradle during the same dependency-resolution process that retrieved the artifacts. This can detect subsequent changes once safely anchored, but does not independently establish that the initial bytes were authentic. The candidate file also has signature verification disabled.

The public references reviewed for release identity/compatibility are:

- Android Developers, [About the Android Gradle plugin](https://developer.android.com/build/releases/about-agp)
- Gradle Plugin Portal, [org.jetbrains.kotlin.android 2.0.21](https://plugins.gradle.org/plugin/org.jetbrains.kotlin.android/2.0.21)
- Kotlin documentation, [Configure a Gradle project](https://kotlinlang.org/docs/gradle-configure-project.html)

Direct access to publisher-hosted SHA-256 sidecars for the key Google Maven and Gradle Plugin Portal artifacts was not available in this review. Mirror-hosted checksums are not being treated as authoritative publisher evidence. No checksum mismatch or malicious artifact has been established; authenticity remains **unverified**, not failed.

### Decision and controls

- Do not commit or enforce the generated verification metadata yet.
- Do not turn on signature verification with guessed keys or trust all keys from an unverified source.
- Keep the candidate inventory artifact as evidence only. Do not automatically update trusted hashes when dependencies change.
- Before enforcement, independently corroborate critical plugin markers, plugin implementation artifacts and key transitive artifacts against publisher-controlled checksums/signatures; document source, algorithm, key identity and exceptions.
- Resolve and inventory the configurations needed for build, test and release use cases without triggering the feature-gated APK/release workflow. Clearly distinguish empty configurations, unresolved configurations and resolved configurations.
- Once provenance and configuration coverage are established, submit a separate PR that adds reviewed metadata and exercises Gradle in read-only verification mode. Any verification failure must be investigated; do not disable verification or weaken checks to get a green build.

**Current disposition:** dependency verification is an open hardening item. No application code, runtime dependencies, permissions, network access, release configuration or APK validation was changed by this review.


### Gradle's own verification guidance — independent cross-check

The current Gradle User Manual explicitly warns that bootstrapping verification metadata trusts the artifacts currently served by configured repositories; if a malicious artifact is already present, bootstrapping can record its checksum or signature. It also instructs maintainers to review generated entries, independently check hashes against official sources where possible, and change `origin="Generated by Gradle"` only after review. Gradle further notes that dependency resolution performed only during task execution or custom resolution logic may not be discovered automatically. This directly supports keeping the current candidate uncommitted and treating the inventory task as partial evidence until configuration/task coverage is demonstrated.

Reference: Gradle User Manual, [Securing Dependencies — Generating and Bootstrapping Verification Metadata](https://docs.gradle.org/current/userguide/securing_dependencies.html) and [Dependency Verification](https://docs.gradle.org/current/userguide/dependency_verification.html).


## Post-PR #109 security assurance and evidence reconciliation — 2026-11-23

### Merge and exact-head validation

- PR [#109](https://github.com/ErTapanJatakia/MindQuest/pull/109), “Document Gradle dependency provenance review”, merged as `4df2a5a2b09f33c19c257b1d96b3e8cd61a333cb`.
- Exact-head Web Validation [run 45115543410](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45115543410): **success, all 40 workflow steps passed**. This includes browser/gameplay, localization/persistence, accessibility, responsive, offline isolation, Android source-boundary and manifest checks.
- Exact-head Security Assurance [run 45115543280](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45115543280): all six scanner jobs and CycloneDX SBOM job passed; OpenSSF Scorecard was skipped as designed for PR events.
- Exact-head Dependency Review [run 45115543276](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45115543276): success.
- Post-merge mainline Security Assurance [run 45116991486](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45116991486): all eight jobs completed successfully. Post-merge mainline Web Validation [run 45116991488](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45116991488) subsequently completed successfully: all 41 workflow steps passed.

### Post-merge scanner artifact inspection

The retained SARIF and CycloneDX artifacts from run `45116991486` were downloaded and inspected, rather than relying only on green job conclusions.

| Control | Artifact result | Triage |
|---|---|---|
| Trivy filesystem | SARIF contains 0 results | No Trivy findings in this scan; coverage remains dependent on detectable manifests/configuration |
| Semgrep Community | 1 result: exported Android launcher activity | Expected platform requirement; sole exported component is the MAIN/LAUNCHER activity and no privileged JS bridge is exposed. Re-check the exact merged APK manifest at the gated release step |
| DevSkim | 7 results: six DS137138 Android XML namespace URI warnings and one DS172411 static `setTimeout` callback note | Same previously reviewed false positives; namespace identifiers are not outbound URLs, and the callback is a static function rather than string evaluation |
| MobSFscan | 1 error-level `android_task_hijacking2` source heuristic plus 6 informational notes | The error is the documented source-only StrandHogg heuristic, accepted only because targetSdk is 35 and the sole exported activity is the MAIN/LAUNCHER activity. The final merged APK target SDK and manifest are not yet verified. The six informational suggestions (SafetyNet/device attestation, TLS pinning, tapjacking, certificate transparency, screenshot blocking and root detection) are not automatically applicable to this offline app; assess only against a concrete threat model. No TLS pinning is warranted absent network communication. UI text-selection deterrence does not prevent OS screenshots or extraction |
| OSV-Scanner | Job passed with no supported package sources/lockfiles detected | Coverage limitation, not a clean dependency bill of health |
| CodeQL | JavaScript/TypeScript analysis job passed | Kotlin extraction is still not claimed; Kotlin is covered by Semgrep, DevSkim, MobSFscan and manual review |
| CycloneDX/Syft | 38 components: 30 GitHub Actions usage entries, 7 file entries and 1 Gradle Wrapper JAR | Source/workflow inventory only; not an APK/runtime SBOM and not proof of complete Gradle resolution |
| OpenSSF Scorecard | **6.2** on commit `4df2a5a2b09f33c19c257b1d96b3e8cd61a333cb` | See current score details below |

### Latest Scorecard details

Run `45116991486` reports Scorecard v5.7.0 and an overall score of **6.2**:

- Token-Permissions: **10/10**; no job-level write permissions were found.
- Pinned-Dependencies: **8/10**; 39/39 GitHub-owned and 10/10 third-party GitHub Action dependencies are pinned. npm and pip installer commands remain unpinned by hash (0/2 each); the Go installer is pinned (1/1).
- Vulnerabilities: **10/10**, with zero existing vulnerabilities detected by this Scorecard check.
- Branch-Protection: **0/10**; Scorecard reports protection is not enabled for `main`.
- Code-Review: **0/10**; no approved changesets detected in the Scorecard sample.
- Fuzzing: **0/10**; no fuzzer integration detected.
- SAST: **8/10**; CodeQL is detected, but only 13 of 29 sampled commits were checked by a SAST tool.
- Dependency-Update-Tool: **10/10**; Dependabot detected.
- CI-Tests: **10/10**; 29 of 29 merged PRs in the sample were checked by CI.

Scorecard is a repository-practice signal, not an application security certification or vulnerability-free guarantee. The repository is less than 90 days old, which affects the Maintained check; packaging and signed-release checks are not yet applicable to an unreleased project.

### Updated findings and boundaries

- No new confirmed exploitable application vulnerability was established by the PR #109 source review or the post-merge scanner artifacts.
- The one MobSFscan error-level source heuristic remains conditional and is not dismissed as a general rule; final APK merged-manifest verification is still required.
- The source SBOM has improved from the initial empty result, but it does not inventory Android runtime contents. The APK-level SBOM remains a release-gate task.
- Gradle verification metadata remains untrusted and unenforced. The 413 generated hashes have not been independently authenticated against publisher-controlled checksums/signatures; configuration resolution coverage is not yet proven.
- The exact post-merge Web Validation run `45116991488` subsequently completed successfully with all 41 workflow steps passed; see the latest mainline checkpoint above.
- The Android release-validation workflow has not been dispatched. No APK assembly, signing, release, production deployment or store submission occurred in this assurance cycle.

### Owner-level actions still outstanding

1. Configure and verify a GitHub branch protection rule or repository ruleset for `main`, including pull requests, required successful checks, prevention of force pushes/deletion and review requirements appropriate to a single-maintainer project. The connected GitHub integration cannot administer this setting.
2. Confirm whether the developer email addresses, personal mobile number and named DPO contact published in the repository and bundled privacy policy are intentionally public. No contact details were changed.
3. Complete the exact candidate APK build/inspection only after feature scope is confirmed complete; physical-device, TalkBack and switch-access acceptance remain project-owner tasks.
4. Continue the full tracked-file source review and independently authenticate critical Gradle artifacts/configuration coverage before any dependency-verification metadata is committed or enforced.

**Current disposition:** remote source/security assurance remains in progress. PR #109 is merged and its exact-head checks passed; post-merge scanner jobs passed. Do not claim APK-level validation, complete source review, WCAG conformance, penetration-test completion or store approval.


## API 23–32 class-verification compatibility remediation — 2026-11-23

### Finding

A deeper Android compatibility review found two newer platform API families referenced directly from the API 23-loadable `MainActivity` implementation:

- `WindowInsets.Type` (API 30+) was used directly inside the Activity's API 35 inset callback.
- `OnBackInvokedCallback` / `OnBackInvokedDispatcher` (API 33+) were referenced in an Activity field and registration/unregistration code.

An `SDK_INT` guard is not sufficient evidence that newer platform classes are isolated from class verification on older OS versions. This is a platform compatibility/stability issue, not a confirmed security vulnerability. Android's API references document the introduction levels; AndroidX's own compatibility implementation uses version-specific helper classes to keep newer platform references out of baseline classes.

### Source remediation in the current change set

- Store the API 33 callback as `Any?` in `MainActivity`, not as `OnBackInvokedCallback`.
- Move API 30 inset operations into `Api30WindowInsetsHandler`.
- Move API 33 callback creation, registration and unregistration into `Api33BackHandler`; helper method signatures use baseline `Activity` / `Any` types.
- Extend `scripts/audit-android-webview-lifecycle.mjs` to fail if API 30/33 platform types leak back into the `MainActivity` body, or if helper creation/registration/cleanup is removed.

### Evidence and limits

- The change is source-level and is being validated by the normal PR Web Validation, Security Assurance and Dependency Review workflows.
- The static audit does not compile Kotlin and does not prove class loading on Android 6–12L. The gated Android build and physical API 23–32 device/emulator acceptance remain required before release.
- No Gradle toolchain changes, runtime permissions, network access, or release-signing behavior were changed.

References: [Android `WindowInsets.Type` API reference](https://developer.android.com/reference/android/view/WindowInsets.Type), [Android `OnBackInvokedCallback` API reference](https://developer.android.com/reference/android/window/OnBackInvokedCallback), [AndroidX compatibility implementation](https://android.googlesource.com/platform/frameworks/support/+/d3424bfed43c927df54e775c1450934368476c80).

