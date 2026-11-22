# MindQuest Security Assurance Dashboard

**Programme status:** Baseline configuration proposed; awaiting CI execution and source-review findings.  
**Application:** MindQuest — offline-first Android app with a bundled HTML/CSS/JavaScript runtime and Kotlin WebView wrapper.  
**Android application ID:** `com.mindquest.app`  
**Scope:** Entire repository, application source, Android wrapper, dependencies, build configuration, CI/CD and distributable artefacts.

> This dashboard records engineering evidence. A green workflow means that the configured checks completed; it is not proof that the application is vulnerability-free, a penetration test, a security certification or an independent audit.

## Assurance gates

| Gate | Scope | Evidence / control | Status |
|---|---|---|---|
| A — Repository baseline | Source inventory, architecture, data flows, trust boundaries, secrets and configuration | Manual review + repository checks | In progress |
| B — SAST | JavaScript/TypeScript and Kotlin source | CodeQL security-extended; Semgrep Community | Configured; first run pending |
| C — Dependency security | Gradle and any supported package manifests/lockfiles | Dependency Review on PRs; OSV-Scanner; Trivy | Configured; first run pending |
| D — Android hardening | Manifest, WebView settings, navigation, lifecycle, APK permissions and bundled assets | Existing custom audits + CodeQL; final APK inspection | Existing checks; deeper review in progress |
| E — Supply chain | Source inventory, SBOM and repository security posture | Syft CycloneDX SBOM; OpenSSF Scorecard | Configured; first run pending |
| F — Runtime and regression | Offline isolation, CSP, persistence, gameplay, accessibility, responsive layouts and lifecycle | Existing project CI suite | Existing CI; review findings to be correlated |
| G — Remediation verification | Triage, fix, regression test, scanner rerun and closure evidence | Pull requests and this dashboard | Pending findings |
| H — Release evidence | Exact candidate APK, package identity, permissions, hashes and manual acceptance | Gated Android validation + owner testing | Separate release gate |

## Configured free / open-source controls

| Tool | Purpose | MindQuest fit | Operating model |
|---|---|---|---|
| GitHub CodeQL | Semantic SAST and security queries | JavaScript/TypeScript and Kotlin | GitHub-hosted workflow; SARIF code scanning |
| Semgrep Community Edition | Rule-based SAST | JavaScript and Android source patterns | Self-hosted CLI in GitHub Actions; community rules |
| Trivy | Filesystem vulnerability, secret and misconfiguration scan | Repository manifests, configuration and detectable secrets | Free open-source CLI/action; SARIF |
| OSV-Scanner | Known vulnerable dependency detection | Supported lockfiles/manifests, including Gradle ecosystems where dependency metadata is available | Free open-source CLI |
| Dependency Review | Detect vulnerable dependency changes in pull requests | PR dependency changes | GitHub-maintained action |
| Syft | Software Bill of Materials | Source/dependency inventory | CycloneDX JSON artifact |
| OpenSSF Scorecard | Repository and supply-chain hygiene | Public GitHub repository | Free open-source action |

### Important coverage limitations

- MindQuest currently has no `package-lock.json` and no declared npm runtime dependencies. Do not interpret an empty JavaScript dependency scan as proof that there are no transitive dependencies.
- Gradle dependency declarations and the Gradle wrapper distribution must be reviewed; dependency locking and verification are not assumed to exist.
- OSV and Trivy coverage depends on supported manifests, lockfiles and package metadata. Their reports must be checked for skipped/unresolved inputs.
- Syft's SBOM is an inventory, not a vulnerability verdict.
- Scorecard measures repository practices, not application runtime security.
- CodeQL/ Semgrep/Trivy results may overlap. Deduplicate by root cause, affected component and CWE before remediation.
- No DAST/API scanner is enabled: the product intentionally has no backend or network API. Do not introduce an external test target or network dependency merely to satisfy a tool catalogue.
- Mobile SaaS products such as Appknox, NowSecure and zScan are not part of the free baseline. MobSF can be evaluated separately for local APK static analysis; dynamic testing still requires a controlled Android runtime.
- Commercial offerings and free-tier SaaS tools requiring account/API credentials are excluded until the owner explicitly approves their terms, data handling and any credentials.

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
- [ ] Gradle plugins, repositories, dependency versions, wrapper integrity and build reproducibility
- [ ] APK package identity, permissions, bundled assets and cryptographic hash

### Repository and delivery
- [ ] GitHub Actions permissions, action pinning, untrusted PR handling and artifact retention
- [ ] Secret exposure, generated files, release/signing boundaries and branch protection
- [ ] SBOM completeness, dependency provenance and known-vulnerability exposure
- [ ] Privacy policy, security policy, accessibility statement and product claims consistency

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

**Next checkpoint:** Run the new workflows on the default branch, inspect all scanner output (including skipped coverage), then complete the source review module-by-module and publish a finding register with remediation status.
