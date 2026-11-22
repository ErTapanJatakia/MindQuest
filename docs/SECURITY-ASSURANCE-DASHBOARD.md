# MindQuest Security Assurance Dashboard

**Programme status:** Security scanner baseline operational on `main`; PRs #83 and #94 merged on 2026-11-22; full repository source review remains in progress; post-PR #100 security and web validation runs passed; APK-level verification is a separate, feature-completion-gated release check.  
**Application:** MindQuest — offline-first Android app with a bundled HTML/CSS/JavaScript runtime and Kotlin WebView wrapper.  
**Android application ID:** `com.mindquest.app`  
**Scope:** Entire repository, application source, Android wrapper, dependencies, build configuration, CI/CD and distributable artefacts.

> This dashboard records engineering evidence. A green workflow means that the configured checks completed; it is not proof that the application is vulnerability-free, a penetration test, a security certification or an independent audit.

## Assurance gates

| Gate | Scope | Evidence / control | Status |
|---|---|---|---|
| A — Repository baseline | Source inventory, architecture, data flows, trust boundaries, secrets and configuration | Manual review + repository checks | In progress |
| B — SAST | JavaScript/TypeScript and Kotlin source | CodeQL security-extended for JavaScript/TypeScript; Semgrep, DevSkim and MobSFscan for broader source coverage | Initial PR scan completed; no new alerts in changed files |
| C — Dependency security | Gradle and any supported package manifests/lockfiles | Dependency Review on PRs; OSV-Scanner; Trivy | Initial scans completed; OSV reports no supported package source/lockfile |
| D — Android hardening | Manifest, WebView settings, navigation, lifecycle, APK permissions and bundled assets | Existing custom audits + CodeQL; final APK inspection | Existing checks; deeper review in progress |
| E — Supply chain | Source inventory, SBOM and repository security posture | Syft CycloneDX SBOM; OpenSSF Scorecard; Dependabot; immutable action pins | PR #94 pinned workflow actions to verified full SHAs and Semgrep to 1.186.0; PR #82 enabled Dependabot; post-PR #100 Scorecard snapshot is 6.1 |
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
- Gradle dependency declarations and the Gradle wrapper distribution must be reviewed; dependency locking and verification are not assumed to exist. The Wrapper distribution checksum is now pinned and statically audited (PR #100 candidate); dependency graph/locking remains open.
- OSV and Trivy coverage depends on supported manifests, lockfiles and package metadata. Their reports must be checked for skipped/unresolved inputs.
- Syft's SBOM is an inventory, not a vulnerability verdict.
- Scorecard measures repository practices, not application runtime security. The first successful main-branch snapshot scored 4.1; the post-PR #100 snapshot scored 6.1. The latest snapshot reports zero known unfixed vulnerabilities, but several remaining findings are repository configuration or release-lifecycle gaps, not application vulnerabilities.
- Dependabot configuration was merged in PR #82. PR #83 subsequently retired the obsolete wrapper-bootstrap workflow, and PR #94 pinned workflow actions to verified immutable commit SHAs and Semgrep to an exact version. The post-PR #100 main-branch snapshot (run `45064544786`, commit `e551a511d63075058c04c17a1064a4d185a7acc4`) scored **6.1**, up from 4.1. It confirms the obsolete dangerous workflow pattern is gone and immutable GitHub Action pins are recognized. It still flags branch protection, fuzzing, no human review signal, CLI installer hash pinning, and the repository's young age. Scorecard's Vulnerabilities check reports zero existing vulnerabilities.
- The Gradle plugin and wrapper dependency graph still needs a resolved, reviewable inventory; the source SBOM's zero package components is not sufficient evidence.
- CodeQL/Semgrep/Trivy results may overlap. Deduplicate by root cause, affected component and CWE before remediation.
- No DAST/API scanner is enabled: the product intentionally has no backend or network API. Do not introduce an external test target or network dependency merely to satisfy a tool catalogue.
- MobSFscan is enabled for source-level Android/Kotlin/XML and hybrid web checks. The full MobSF framework's APK-level and dynamic-analysis stages remain separate: APK scanning requires a completed Android build artifact, while dynamic analysis requires a controlled Android runtime.
- Commercial offerings and free-tier SaaS tools requiring account/API credentials are excluded until the owner explicitly approves their terms, data handling and any credentials.

### First scanner-run triage (PR validation)

- **Trivy:** completed successfully and produced a valid SARIF report with zero findings. This does not establish dependency coverage for manifests that Trivy cannot resolve.
- **Semgrep Community:** the first complete scan ran 236 rules over 44 files and reported two findings. The dynamic-regex warning in `app/src/app.js` was remediated by replacing the constructed expression with a fixed allow-listed pattern and a stricter region/category prefix check. The exported Android launcher activity finding is an expected platform requirement: it is the sole activity with only the `MAIN`/`LAUNCHER` filter and exposes no privileged native bridge or privileged intent operation. It remains documented as an accepted design finding, not silently suppressed.
- **DevSkim:** seven findings were reviewed. Six `DS137138` alerts are false positives on the Android XML namespace URI (`http://schemas.android.com/apk/res/android`), not network requests. One `DS172411` note is a false positive on a static function callback passed to `setTimeout`, not a string or untrusted value. Preserve the rule and rationale; do not suppress the whole rule globally.
- **OSV-Scanner:** the repository contains no supported package source/lockfile for OSV to scan. The workflow now records this as a coverage notice rather than claiming a clean scan or failing with an empty SARIF. Trivy and PR Dependency Review remain enabled.
- **Syft:** generated a valid CycloneDX SBOM with zero package components. This reflects the absence of detected package manifests/lockfiles; it is not an inventory of every bundled application asset.
- **CodeQL:** JavaScript/TypeScript security-extended analysis completed successfully. Kotlin extraction is not claimed: the earlier Android Gradle autobuild could not resolve plugin dependencies on the runner. Kotlin is covered by Semgrep, DevSkim, MobSFscan and manual review.
- **OpenSSF Scorecard:** the first successful main-branch snapshot (commit `2c859356c9a7ae0dd5265c1d9dd59d99f1435699`) scored **4.1** and reported zero known unfixed vulnerabilities, while identifying repository-practice gaps. Since that snapshot, PR #83 retired the obsolete wrapper-bootstrap workflow and PR #94 pinned workflow actions to verified full commit SHAs and Semgrep to `1.186.0`; PR #82 had already enabled Dependabot. The Scorecard result has not yet been refreshed against these changes, so no post-remediation score or cleared finding is claimed.


### Exception and coverage register

| Item | Classification | Disposition / evidence | Closure condition |
|---|---|---|---|
| Android launcher exported activity (Semgrep) | Expected Android platform requirement | Sole exported activity has only MAIN/LAUNCHER; no privileged JS bridge or privileged intent handler is exposed | Retain; re-check merged APK manifest at release gate |
| StrandHogg 2.0 source heuristic (MobSFscan) | Conditional source-only false positive | Gradle config declares targetSdk 35; source scan cannot resolve the effective merged manifest | Release workflow must confirm final APK targetSdkVersion 35 and inspect merged manifest before release |
| DevSkim DS137138 (Android XML namespace URI) | False positive | URI is an XML namespace identifier, not an outbound network request | Retain rationale; no global rule suppression |
| DevSkim DS172411 (setTimeout callback) | False positive | Static function callback, not string evaluation or untrusted input | Retain rationale; no global rule suppression |
| OSV no package sources | Coverage limitation | No supported package lockfile was present; scanner completion is not a clean dependency verdict | Add dependency lockfiles if runtime/build dependency declarations are introduced; inspect Gradle plugin versions and wrapper separately |
| Syft zero package components | Coverage limitation | Source scan did not identify package components; bundled source assets are not equivalent to package inventory | Generate an APK-level SBOM at release gate and reconcile it with source inventory |
| OpenSSF Scorecard skipped on PR | Expected workflow scope | Scorecard job is intentionally main-branch-only; main run now succeeds and publishes SARIF | Keep main/scheduled scan and review each snapshot |
| Scorecard Token-Permissions | Repository hardening item | PR #83 merged and deleted the obsolete wrapper-bootstrap workflow that held top-level `contents: write`; latest Scorecard Dangerous-Workflow and Token-Permissions both score 10 | Closed |
| Scorecard Pinned-Dependencies | Supply-chain hardening item | PR #94 merged; all workflow action references in scope are pinned to verified full commit SHAs, Semgrep is pinned to `1.186.0`; other CLI installers remain version-pinned where supported | Verify the Scorecard result; assess hash-locked Python/Go tool installation separately if still flagged |
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
- [ ] Gradle plugins, repositories, dependency versions, wrapper integrity and build reproducibility (distribution checksum pin and regression audit added in PR #100 candidate; dependency graph/locking remains open)
- [ ] APK package identity, permissions, bundled assets and cryptographic hash

### Repository and delivery
- [ ] GitHub Actions permissions, action pinning, untrusted PR handling and artifact retention
- [ ] Branch protection / repository ruleset on `main`
- [ ] Secret exposure, generated files, release/signing boundaries and branch protection
- [ ] SBOM completeness, dependency provenance and known-vulnerability exposure
- [ ] Privacy policy, security policy, accessibility statement and product claims consistency

## Initial manual source-review observations

The following source-level pass has inspected the HTML entry point, core JavaScript runtime modules, all JavaScript files referenced by the app entry point (including the bundled question/translation data modules), stylesheet, Android manifest, Kotlin activity and Gradle configuration. This is an initial review checkpoint, not the completed repository-wide assessment.

- The reviewed runtime JavaScript contains no detected `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `eval`, `new Function`, `fetch`, `XMLHttpRequest`, `WebSocket`, `EventSource`, `sendBeacon` or `document.cookie` usage. Rendering observed in the core path uses DOM construction, `textContent`, and `replaceChildren()`.
- Settings and score data are read from local storage with exception handling and strict shape/range validation. Theme and accessibility preferences use guarded local-storage access and constrained values.
- The Android activity enables JavaScript for the bundled game, does not expose a JavaScript bridge, disables WebView debugging, content access, file-origin cross-access, universal file-origin access, automatic JavaScript windows and mixed content, and filters main-frame navigation to the bundled entry document.
- The current WebView still uses a `file://` entry point and `allowFileAccess=true`. This is constrained by the other settings and the local-only app design; no exploit has been established from this observation. Consider AndroidX `WebViewAssetLoader` as a future hardening option to move to an HTTPS-like app asset origin and disable general file access, but only after compatibility testing.
- The CSP intentionally includes `'unsafe-inline'` in `style-src`. Review whether this can be narrowed without breaking theme tokens and accessibility presentation; do not remove it blindly.
- The app's privacy and accessibility text contains direct developer contact details. Because the repository is public and these pages are bundled in the application, confirm that the published contact channels are intentionally public and that no personal contact method should be removed or replaced.

### Initial finding register

| ID | Observation | Classification | Priority | Status / next action |
|---|---|---|---|---|
| MQ-PRIV-001 | Direct developer contact details are embedded in public in-app legal pages and shipped assets | Potential privacy exposure; owner intent required | Medium | Needs owner confirmation; no automatic deletion |
| MQ-AND-001 | WebView loads local content through `file://` with `allowFileAccess=true` | Hardening opportunity; not a confirmed vulnerability | Low / Medium | Evaluate WebViewAssetLoader migration and compatibility before changing |
| MQ-CSP-001 | CSP `style-src` allows `'unsafe-inline'` | Defence-in-depth review item | Low / Medium | Determine whether inline style allowance can be narrowed safely |
| MQ-SCA-001 | Gradle dependency graph/lockfile coverage is incomplete; no npm lockfile is present | Coverage gap, not a vulnerability finding | Medium | Dependabot is enabled; resolve and record Gradle plugin/runtime dependency graph; assess lockfile and verification metadata |
| MQ-SUP-002 | Gradle Wrapper distribution URL lacked `distributionSha256Sum` | Build-tool integrity hardening gap; no evidence of a tampered distribution | Medium | PR #100 candidate adds the official Gradle 8.9 binary distribution SHA-256 and a static regression audit; verify after merge |
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

**Next checkpoint (2026-11-23):** PR #98 merged; PR #100 checksum hardening is being rebased onto the updated `main` after all original checks passed. Verify the refreshed main-branch Security Assurance and Scorecard results; continue the repository-wide review of scripts, CI workflows, localization/content assets and Android build chain; resolve Gradle dependency graph/verification coverage; owner configures `main` branch protection; after all feature scope is confirmed complete, run the manually gated Android validation and reconcile the APK-level inventory. PRs #95–#97 (Kotlin, Gradle and Android Gradle Plugin major upgrades) remain held as one coordinated candidate until that build validation is authorized and passes.


## Post-PR #100 verification checkpoint (2026-11-23)

- Main Security Assurance run [`45064544786`](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45064544786): all eight jobs completed successfully. Artifacts retained for 30 days include Trivy, MobSFscan, Syft source SBOM, DevSkim and Semgrep SARIF.
- Main Web Validation run [`45064544844`](https://github.com/ErTapanJatakia/MindQuest/actions/runs/45064544844): browser/static validation completed successfully.
- OpenSSF Scorecard on commit `e551a511d63075058c04c17a1064a4d185a7acc4`: **6.1** (previous baseline 4.1). Dangerous-Workflow, Token-Permissions, Dependency-Update-Tool, Security-Policy, Vulnerabilities and CI-Tests scored 10. The Vulnerabilities check found zero existing vulnerabilities.
- Remaining Scorecard actions: enable branch protection/ruleset (owner/admin action); consider hash-locked CLI installation for npm/pip commands; decide whether property-based fuzzing and explicit human-review policy are appropriate; do not chase age, packaging, signed-release or CII metrics without a product/release requirement.
- This workflow result is not APK validation. APK-level SBOM, merged manifest and exact artifact inspection remain gated on feature-scope completion and owner-triggered Android validation. Physical-device and assistive-technology acceptance remain owner-run.
