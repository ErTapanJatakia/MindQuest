# MindQuest baseline implementation reconciliation

**Date:** 2026-11-18 (updated after consolidated validation)  
**Original baseline:** 2,400 minutes (40 engineering hours)  
**Actual engineering time:** Not tracked

## Why the previous figure was understated

The previous 330 / 2,400 minutes (13.75%) credited only two workstreams whose implementation had reached Review. This all-or-nothing treatment omitted measurable partial deliverables in gameplay, localization, accessibility, persistence, Android packaging and documentation.

This reconciliation decomposes each existing workstream into observable implementation packages. It does not add scope or minutes. Partial credit is awarded only where current repository evidence supports the deliverable. Runtime validation, manual testing, device testing and release work are not credited merely because implementation code exists.

This follows established project-controls practice: use quantifiable work-package completion or weighted observable milestones. References: U.S. GAO [Cost Estimating and Assessment Guide, Table 21](https://www.gao.gov/assets/gao-20-195g.pdf); PMI [Measuring Progress in Software Development](https://www.pmi.org/learning/library/measuring-progress-software-development-9042).

## Reconciled baseline ledger

| # | Workstream | Baseline (min) | Earned implementation (min) | Remaining (min) | Evidence-based allocation |\n|---:|---|---:|---:|---:|---|\n| 1 | Project foundation | 60 | 50 | 10 | Repository structure, metadata and QA planning; final housekeeping remains |\n| 2 | Visual identity | 90 | 30 | 60 | Brand system, logo, ten themes and launch screen; store artwork remains |\n| 3 | Home screen | 120 | 75 | 45 | Home, play, settings/help navigation and best-score surface; final polish remains |\n| 4 | Independent localization | 150 | 115 | 35 | 45 independent interface/region/question-language combinations passed; Spanish question translations remain |\n| 5 | Question-bank architecture | 150 | 150 | 0 | Offline schema, stable IDs, region/category metadata and translation mapping implemented |\n| 6 | Question content | 180 | 180 | 0 | 150 IDs / 450 localized records populated; Spain/Peru and Spanish translations remain expansion scope |\n| 7 | Core gameplay | 180 | 160 | 20 | Answer flow, scoring, review and expanded browser gameplay regression passed; final manual acceptance remains |\n| 8 | Game modes | 120 | 95 | 25 | 5/10/15-question rounds and replay regression passed; complete progression acceptance remains |\n| 9 | Difficulty progression | 90 | 75 | 15 | Difficulty metadata, balanced distribution and all 36 filter combinations passed; balance review remains |\n| 10 | Results screen | 90 | 75 | 15 | Score, accuracy and answer review implemented; final result accessibility acceptance remains |\n| 11 | Local persistence | 120 | 85 | 35 | Local settings, scoped scores, malformed-data recovery and storage-denial fallback tested; device restart remains |\n| 12 | Accessibility | 120 | 100 | 20 | Focus management, live regions, contrast checks, modal splash and selected-answer pressed state implemented; TalkBack audit remains |\n| 13 | Android application shell | 180 | 100 | 80 | Gradle wrapper, debug assembly and APK artifact validated; physical-device retest, signing and release packaging remain |\n| 14 | Offline/security hardening | 120 | 120 | 0 | Bundled assets, CSP, no external requests and restricted WebView configuration; physical offline/security verification remains |\n| 15 | Device compatibility | 180 | 45 | 135 | Responsive browser checks passed at five widths; actual device/density matrix remains |\n| 16 | Functional testing | 180 | 20 | 160 | Automated browser regression passed; manual Android and assistive-technology acceptance remains |\n| 17 | RuStore release readiness | 180 | 0 | 180 | Signing, store metadata, listing assets, disclosures and submission preparation not completed |\n| 18 | Documentation/release | 90 | 70 | 20 | README, architecture, roadmap, QA plan and development status; final legal/editorial review remains |\n|  | **Total** | **2,400** | **1,545** | **855** | |\n
## Progress calculation

1,545 / 2,400 × 100 = 64.375% (displayed as **64.38%**).

| Measure | Reconciled value |
|---|---:|
| Original baseline | 2,400 min / 40 h |
| Earned implementation scope | 1,545 min / 25 h 45 min equivalent |
| Implementation progress | **64.38%** |
| Remaining baseline scope | **855 min / 14 h 15 min equivalent** |
| Actual engineering time logged | Not tracked |
| Workstreams marked Complete | 2 |
| Workstreams in Review | 0 |

**Important:** earned minutes are weighted baseline allocations for evidenced deliverables, not actual labour time. Browser automation is counted as functional testing; physical-device and TalkBack testing remain uncredited.

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


## Expanded browser regression accepted — 2026-11-18

- PR #2 merged into `main` as squash commit `3bf79c806ac1aa63fff91cea80af4e9d574c92c2`.
- Successful workflow: [MindQuest Validation #44307367081](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44307367081), head `3cbc4c417ab4fd6cd85b8c7556c90cf3febb7a58`. Both Android debug assembly and browser/content/static jobs passed.
- Added and verified 5/10/15-question rounds, all 36 region/category/difficulty filter combinations, five viewport widths, ten theme contrast pairs, selector synchronization, keyboard focus, malformed-storage recovery, storage-denial fallback, persistence and blocked external connections.
- The PR #2 debug APK was extracted and inspected. Size: 908,736 bytes. SHA-256: `5917e02d35b6725c1b3a0484f94f6fa7a2a4c2ac930432358f3849577043dd4d`. It is not production-signed and is not a release candidate.
- Evidence-based credit reconciled: 200 minutes across foundation (10), visual identity (5), home (5), localization (5), core gameplay (15), game modes (15), difficulty (5), results (5), local persistence (10), accessibility (35), offline/security (35), device compatibility (20), automated functional testing (20), and documentation (15).
- No manual device, TalkBack, native-speaker, security runtime, signing or RuStore release credit is claimed.
- Updated baseline: 1,545 / 2,400 minutes = **64.38%**; remaining baseline 855 minutes. Actual engineering hours remain untracked.
