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
| 1 | Project foundation | 60 | 50 | 10 | Repository structure, metadata, release principles and QA planning; final housekeeping remains |
| 2 | Visual identity | 90 | 30 | 60 | Logo, ten themes, launch screen and brand system; store artwork remains |
| 3 | Home screen | 120 | 85 | 35 | Home, play, settings/help navigation, best-score surface and accessible theme-picker keyboard flow; final polish remains |
| 4 | Independent localization | 150 | 115 | 35 | 45 independent interface/region/question-language combinations passed; Spanish question translations remain |
| 5 | Question-bank architecture | 150 | 150 | 0 | Offline schema, stable IDs, region/category metadata and translation mapping implemented |
| 6 | Question content | 180 | 180 | 0 | 150 IDs / 450 localized records populated; Spain/Peru and Spanish translations remain expansion scope |
| 7 | Core gameplay | 180 | 180 | 0 | Answer flow, scoring, review, stable question IDs and four-round 50-question cycle integrity verified |
| 8 | Game modes | 120 | 120 | 0 | 5/10/15-question rounds validated across all three regions |
| 9 | Difficulty progression | 90 | 90 | 0 | Exact easy/medium/hard quotas validated for 5/10/15 rounds in all three regions |
| 10 | Results screen | 90 | 90 | 0 | Result-heading focus, polite result announcement and complete per-question answer review validated |
| 11 | Local persistence | 120 | 100 | 20 | Preferences, scoped scores, malformed-data recovery, storage-denial fallback and best-score scope regression tested; device restart remains |
| 12 | Accessibility | 120 | 120 | 0 | Focus management, live regions, modal splash, semantic answer radio group, arrow/Home/End keyboard behavior, accessible-name and ARIA-reference audits, theme text/focus contrast checks implemented; manual TalkBack acceptance remains separate |
| 13 | Android application shell | 180 | 100 | 80 | Gradle wrapper, debug assembly and APK artifact validated; physical-device retest, signing and release packaging remain |
| 14 | Offline/security hardening | 120 | 120 | 0 | Bundled assets, CSP, no external requests and restricted WebView configuration; physical offline/security verification remains separate |
| 15 | Device compatibility | 180 | 65 | 115 | Responsive browser checks cover eight portrait/landscape profiles across Home, Settings, Quiz and Results; physical device/density matrix remains |
| 16 | Functional testing | 180 | 60 | 120 | Automated gameplay, filters, keyboard, responsive, persistence, question-cycle and results regression passed; manual Android and assistive-technology acceptance remains |
| 17 | RuStore release readiness | 180 | 0 | 180 | Signing, store metadata, listing assets, disclosures and submission preparation not completed |
| 18 | Documentation/release | 90 | 90 | 0 | README, architecture, roadmap, QA plan, development status and baseline reconciliation are current; legal/editorial review remains separate |
|  | **Total** | **2,400** | **1,745** | **655** | |

## Progress calculation

1,745 / 2,400 × 100 = 72.7083% (displayed as **72.71%**).

| Measure | Reconciled value |
|---|---:|
| Original baseline | 2,400 min / 40 h |
| Earned implementation scope | 1,745 min / 29 h 5 min equivalent |
| Implementation progress | **72.71%** |
| Remaining baseline scope | **655 min / 10 h 55 min equivalent** |
| Actual engineering time logged | Not tracked |
| Workstreams with no baseline minutes remaining | 10 |

**Important:** earned minutes are weighted baseline allocations for evidenced deliverables, not actual labour time. PR #3, #4 and #5 are accepted and reconciled. Manual device, TalkBack and store acceptance are not implied by automated browser coverage.


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


## Accessibility, responsive and gameplay progression acceptance — 2026-11-18

- PR #3 merged as `a573c2b7e26a78182a34e3d216910aa5c103dcde`; [workflow #44325807742](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44325807742) passed both Android debug assembly and browser/content/static checks.
- PR #4 merged as `674abd3ba1174cc2bdecd006a8bfa7858c0dff39`; [workflow #44336160667](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44336160667) passed both jobs.
- PR #3 introduced semantic single-choice radio controls, arrow-key selection, checked state, and visible-control accessible-name/DOM structure assertions.
- PR #4 added Home/End keyboard selection, valid ARIA ID-reference checks, focus-indicator contrast checks for all ten themes, eight viewport profiles across Home/Settings/Quiz/Results, and scoped best-score persistence checks.
- Evidence-based allocation after accepted PR #3/#4: +20 accessibility minutes, +20 device-compatibility minutes, +15 local-persistence minutes, +25 functional-testing minutes and +10 documentation minutes (70 total).
- Updated baseline: 1,635 / 2,400 minutes = **68.13%**; remaining baseline 765 minutes. Actual engineering hours remain untracked.
- PR #5 gameplay progression work is active and not yet credited.


## Gameplay progression acceptance — 2026-11-18

- PR #5 merged as `4efab1a65c91adc6160e6b15ecda25c7495b129c`.
- [Workflow #44338004918](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44338004918) passed both Android debug APK assembly and browser/content/static regression jobs.
- Active question heading exposes the stable question ID for deterministic QA diagnostics.
- Exact difficulty quotas passed for 5/10/15-question rounds in India, Russia and the United States: 5 = 2 easy / 2 medium / 1 hard; 10 = 3 / 4 / 3; 15 = 5 / 6 / 4.
- Four consecutive 15-question rounds per region verified that all 50 unique questions are exhausted before a new cycle begins, with no duplicate within a round.
- Results focus, polite announcement and four-part answer-review content passed; theme-picker keyboard open/Escape/focus restoration passed.
- Evidence-based baseline allocation: +20 core gameplay, +25 game modes, +15 difficulty progression, +15 results, +10 home screen, +15 functional testing and +10 documentation (110 total).
- Updated baseline: 1,745 / 2,400 minutes = **72.71%**; remaining baseline 655 minutes. Actual engineering hours remain untracked.
