# MindQuest baseline implementation reconciliation

**Date:** 2026-11-18  
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
| 4 | Independent localization | 150 | 90 | 60 | Three independent selectors, persistence, locale dictionaries, selector labels and mixed-language passage tags exist; exhaustive combination and translation-quality verification remain |
| 5 | Question-bank architecture | 150 | 150 | 0 | Offline schema, stable IDs, region/category/difficulty metadata and translation mapping implemented; status remains Review pending acceptance |
| 6 | Question content | 180 | 180 | 0 | 150 IDs / 450 localized records populated to planned distribution; factual, cultural and native-speaker acceptance remains, so status remains Review |
| 7 | Core gameplay | 180 | 120 | 60 | Multiple-choice flow, answer validation/feedback, scoring, progression and defensive state guards implemented; runtime/regression verification remains |
| 8 | Game modes | 120 | 80 | 40 | Ten-question rounds, category/difficulty selection and replay implemented; runtime behavior and complete mode acceptance remain |
| 9 | Difficulty progression | 90 | 70 | 20 | Easy/medium/hard metadata, balanced per-region distribution and filters implemented; gameplay balance verification remains |
| 10 | Results screen | 90 | 70 | 20 | Score, accuracy, answer review and explanations implemented; complete runtime/accessibility acceptance remains |
| 11 | Local persistence | 120 | 75 | 45 | Settings and scoped best scores, robust comparison/parsing and write-failure warning implemented; storage failure/restart runtime verification remains |
| 12 | Accessibility | 120 | 65 | 55 | Keyboard focus, live-region semantics, language-of-parts tags and selected contrast calculations implemented; full component audit and assistive-technology verification remain |
| 13 | Android application shell | 180 | 65 | 115 | Kotlin WebView activity, manifest hardening, Gradle configuration and asset mapping exist; wrapper, build, signing and package validation remain |
| 14 | Offline/security hardening | 120 | 85 | 35 | Bundled local assets, no declared network permission, blocked external navigation and restricted WebView file/content access exist; offline/runtime/security verification remains |
| 15 | Device compatibility | 180 | 25 | 155 | Responsive CSS and narrow-screen safeguards implemented; actual screen-size, density and device testing not performed |
| 16 | Manual functional testing | 180 | 0 | 180 | No formal browser/manual functional test cycle completed; source inspection is not counted as functional QA |
| 17 | RuStore release readiness | 180 | 0 | 180 | Signing, store metadata, listing assets, disclosures and submission preparation not completed |
| 18 | Documentation/release | 90 | 55 | 35 | README, architecture, roadmap and development-status docs exist; final changelog/versioning/release checklist remains |
|  | **Total** | **2,400** | **1,265** | **1,135** | |

## Progress calculation

1,265 / 2,400 × 100 = 52.7083…%

| Measure | Reconciled value |
|---|---:|
| Original baseline | 2,400 min / 40 h |
| Earned implementation scope | 1,265 min / 21 h 5 min equivalent |
| Implementation progress | **52.71%** |
| Remaining baseline scope | **1,135 min / 18 h 55 min equivalent** |
| Actual engineering time logged | Not tracked |
| Workstreams marked Complete | 0 |
| Workstreams in Review | 2 (question-bank architecture and question content) |

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
