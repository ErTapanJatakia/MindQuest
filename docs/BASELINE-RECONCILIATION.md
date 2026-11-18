# MindQuest baseline implementation reconciliation

**Date:** 2026-11-18 (updated after consolidated validation)  
**Original baseline:** 2,400 minutes (40 engineering hours)  
**Actual engineering time:** Not tracked

## Why the previous figure was understated

The previous 330 / 2,400 minutes (13.75%) credited only two workstreams whose implementation had reached Review. This all-or-nothing treatment omitted measurable partial deliverables in gameplay, localization, accessibility, persistence, Android packaging and documentation.

This reconciliation decomposes each existing workstream into observable implementation packages. It does not add scope or minutes. Partial credit is awarded only where current repository evidence supports the deliverable. Runtime validation, manual testing, device testing and release work are not credited merely because implementation code exists.

This follows established project-controls practice: use quantifiable work-package completion or weighted observable milestones. References: U.S. GAO [Cost Estimating and Assessment Guide, Table 21](https://www.gao.gov/assets/gao-20-195g.pdf); PMI [Measuring Progress in Software Development](https://www.pmi.org/learning/library/measuring-progress-software-development-9042).

## Reconciled baseline ledger

| # | Workstream | Baseline (min) | Earned implementation (min) | Remaining (min) | Evidence-based allocation |
|---:|---|---:|---:|---:|---|
| 1 | Project foundation | 60 | 40 | 20 | Repository structure, metadata and core docs exist; clean-baseline/release housekeeping remains |
| 2 | Visual identity | 90 | 25 | 65 | Dark visual system, typography and responsive styling exist; complete brand assets/icon/splash and final visual acceptance remain |
| 3 | Home screen | 120 | 70 | 50 | Home, play entry, settings/help navigation and best-score surface exist; final polish remains |
| 4 | Independent localization | 150 | 110 | 40 | All 27 interface/region/question-language selector combinations passed browser runtime checks; translation-quality and broader persistence acceptance remain |
| 5 | Question-bank architecture | 150 | 150 | 0 | Offline schema, stable IDs, region/category/difficulty metadata and translation mapping implemented; status remains Review pending acceptance |
| 6 | Question content | 180 | 180 | 0 | 150 IDs / 450 localized records populated to planned distribution; factual, cultural and native-speaker acceptance remains, so status remains Review |
| 7 | Core gameplay | 180 | 145 | 35 | Nine five-question browser rounds passed across every region/question-language pair, including answer progression and result review; broader regression remains |
| 8 | Game modes | 120 | 80 | 40 | Configurable 5/10/15-question rounds, category/difficulty selection and replay implemented; runtime behavior and complete mode acceptance remain |
| 9 | Difficulty progression | 90 | 70 | 20 | Easy/medium/hard metadata, balanced per-region distribution and filters implemented; gameplay balance verification remains |
| 10 | Results screen | 90 | 70 | 20 | Score, accuracy, answer review and explanations implemented; complete runtime/accessibility acceptance remains |
| 11 | Local persistence | 120 | 75 | 45 | Settings and scoped best scores, robust comparison/parsing and write-failure warning implemented; storage failure/restart runtime verification remains |
| 12 | Accessibility | 120 | 65 | 55 | Keyboard focus, live-region semantics, language-of-parts tags and selected contrast calculations implemented; full component audit and assistive-technology verification remain |
| 13 | Android application shell | 180 | 100 | 80 | Official Gradle 8.9 wrapper validated and Android debug APK assembled successfully; APK inspection, signing and release packaging remain |
| 14 | Offline/security hardening | 120 | 85 | 35 | Bundled local assets, no declared network permission, blocked external navigation and restricted WebView file/content access exist; offline/runtime/security verification remains |
| 15 | Device compatibility | 180 | 25 | 155 | Responsive CSS and narrow-screen safeguards implemented; actual screen-size, density and device testing not performed |
| 16 | Manual functional testing | 180 | 0 | 180 | No formal browser/manual functional test cycle completed; source inspection is not counted as functional QA |
| 17 | RuStore release readiness | 180 | 0 | 180 | Signing, store metadata, listing assets, disclosures and submission preparation not completed |
| 18 | Documentation/release | 90 | 55 | 35 | README, architecture, roadmap and development-status docs exist; final changelog/versioning/release checklist remains |
|  | **Total** | **2,400** | **1,345** | **1,055** | |

## Progress calculation

1,345 / 2,400 × 100 = 56.0417…%

| Measure | Reconciled value |
|---|---:|
| Original baseline | 2,400 min / 40 h |
| Earned implementation scope | 1,345 min / 22 h 25 min equivalent |
| Implementation progress | **56.04%** |
| Remaining baseline scope | **1,055 min / 17 h 35 min equivalent** |
| Actual engineering time logged | Not tracked |
| Workstreams marked Complete | 2 |
| Workstreams in Review | 0 (both question-bank workstreams accepted) |

**Important:** 21 h 5 min equivalent is the sum of baseline estimate allocations credited to implemented deliverables. It is not actual labour time. The remaining baseline is unearned original estimate, not a guaranteed future-duration forecast.

## Credit rules going forward

1. Preserve original parent estimates; scope changes require explicit change control.
2. Decompose workstreams into observable deliverables whose allocations sum exactly to each parent estimate.
3. Award partial implementation credit only for repository-evidenced deliverables.
4. Do not award runtime, manual QA, device, security-validation, CI or release credit until performed and recorded.
5. Keep implementation progress separate from acceptance status and actual engineering time.
6. Update this ledger, ROADMAP.md and DEVELOPMENT-STATUS.md after each meaningful batch.
7. Reconcile only when evidence changes; do not mechanically increase progress for edits that do not satisfy a defined deliverable.

## Verification limitations

This was a repository/documentation reconciliation, not a new execution of the application. No browser runtime, official question-bank validator, CI, Android build, emulator, physical-device test, screen-reader test or RuStore submission was performed.


## Consolidated validation evidence — 2026-11-18

- Workflow: [MindQuest Validation run 44212850901](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44212850901), final conclusion **success**, commit `73c7a4094dbf77d92a905b139182ec83b473b724`.
- Official question-bank validator passed: 150 unique question IDs, 50 per region, three locales, and the required category/difficulty distributions.
- JavaScript syntax checks passed for the question bank, application, UI-polish layer and validation scripts.
- Browser runtime smoke passed: home/settings navigation, all 27 independent interface/region/question-language combinations, nine five-question rounds covering all region/question-language pairs, localized question/answer language tags and five-item answer reviews. No uncaught browser page errors were reported.
- Android SDK setup, Gradle wrapper checksum validation and `assembleDebug` passed. A debug APK was uploaded as workflow artifact `mindquest-debug-apk` (888,611 bytes; artifact expires 2026-12-02).
- The first Android build exposed an invalid `android:postSplashScreenTheme` framework attribute in `values-v31/styles.xml`; it was removed in commit `9f32f049e8133ba874bd4ad69cbb149a87530561`, and the subsequent consolidated build passed.
- CI implementation commits: `830fad1` (browser test command), `625059c` (browser smoke suite), `4b3135e` (consolidated workflow), `9bc7daf` (lockfile-free Node setup), `870b8b6` (Ubuntu 24.04 runners), `72c5959` (Android platform-tools setup), and `73c7a40` (Chromium runner dependency adjustment).
- Evidence-based credit added: 20 minutes to independent localization, 25 minutes to core gameplay and 35 minutes to the Android application shell. This reflects newly executed runtime/build acceptance evidence, not actual labour time. No manual functional-QA, device, screen-reader, security runtime, signing or release credit is claimed.
- Updated implementation progress: 1,345 / 2,400 minutes = **56.04%**; remaining baseline 1,055 minutes. Actual engineering time remains untracked.
