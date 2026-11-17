# MindQuest implementation tracker

**Planning baseline:** 2,400 minutes (40 engineering hours). Estimates are working-time estimates, not a calendar delivery promise. Actual effort will be updated as implementation progresses.

Statuses: `Planned` = not started; `In progress` = partial implementation; `Review` = implementation complete, awaiting review; `Complete` = accepted against its criteria.

| # | Workstream | Acceptance criteria | Status | Estimate (min) |
|---:|---|---|---|---:|
| 1 | Project foundation | Standalone repository structure, documentation, metadata and clean baseline | In progress | 60 |
| 2 | Visual identity | Branding, icon, splash, typography and responsive game interface | In progress | 90 |
| 3 | Home screen | Play, settings, help/about and navigation | In progress | 120 |
| 4 | Independent localization | Three independent selectors; all combinations work; preferences persist separately | In progress | 150 |
| 5 | Question-bank architecture | Offline data, stable IDs, region/category metadata and translation mapping | In progress | 150 |
| 6 | Question content | 150 original questions: 50 per region, each in all three supported languages | In progress | 180 |
| 7 | Core gameplay | Multiple-choice flow, validation, feedback, scoring and progression | In progress | 180 |
| 8 | Game modes | Ten-question rounds, category selection and replay | In progress | 120 |
| 9 | Difficulty progression | Easy/medium/hard classifications and balanced selection | In progress | 90 |
| 10 | Results screen | Score, accuracy, per-question answers, explanations and replay | In progress | 90 |
| 11 | Local persistence | Settings and best score persist locally without an account | In progress | 120 |
| 12 | Accessibility | Scalable text, contrast, keyboard and assistive-technology support | In progress | 120 |
| 13 | Android application shell | Lightweight native Android wrapper, bundled assets, minimal permissions | In progress | 180 |
| 14 | Offline/security hardening | Airplane-mode operation, safe WebView configuration and no remote runtime dependencies | In progress | 120 |
| 15 | Device compatibility | Small/standard/large screen and density checks | Planned | 180 |
| 16 | Manual functional testing | Gameplay, all language combinations, data integrity, persistence and regression | Planned | 180 |
| 17 | RuStore release readiness | Package, signing, metadata, Russian listing, screenshots, disclosures and rating preparation | Planned | 180 |
| 18 | Documentation/release | Installation, changelog, versioning and release checklist | In progress | 90 |
|  | **Total** |  |  | **2,400** |

## Delivery milestones

| Milestone | Scope | Estimate (min) |
|---|---|---:|
| 1 | Repository, foundation, branding direction and localization/data architecture | 150 |
| 2 | Question content, gameplay, modes, scoring and results | 720 |
| 3 | Localization, persistence and accessibility | 360 |
| 4 | Android integration, offline support, security and device compatibility | 480 |
| 5 | Manual testing, RuStore readiness and documentation | 690 |
|  | **Total** | **2,400** |

Milestone allocations are planning buckets and will be reconciled against the detailed workstream estimates as implementation progresses.

## Current implementation slice

- Repository and project documentation created.
- Responsive web game shell with home, quiz, result, settings and localized help views.
- Three independent preference values and local persistence.
- One hundred thirty-five starter questions (forty-five per region), each with three language variants.
- Starter difficulty spread per region: thirteen easy, eighteen medium and fourteen hard questions.
- Basic quiz flow, answer feedback, score, replay and best-score persistence.
- Results accuracy percentage and localized per-question answer review.
- Help guide in all three interface locales, accessible from home and settings with return-to-origin navigation.
- View navigation moves focus to the active heading; quiz progress and results expose accessible announcements.
- Empty-filter recovery routes players back to settings instead of presenting a dead-end replay action.
- Best scores are scoped to region, category and difficulty and compared by percentage. The home card shows the best score, percentage accuracy and active pool scope.
- Persisted category and difficulty filters (All categories / Any difficulty), applied to question selection.
- Category and difficulty filter labels localised for English (India), English (US) and Russian.
- All four question categories are represented in each regional bank, with twelve Geography, eleven History, eleven Science and eleven Culture questions.
- Dependency-free question-bank structural validator.
- Initial Kotlin/Gradle Android WebView shell; not yet built or device-validated.

The current content is a development seed, not the release bank. It is not yet the full 50 questions per region. The Android shell is also not yet a release-ready signed package.

## Release gates

1. Feature development complete.
2. Static source review and dependency review complete.
3. Manual functional, localization, offline and Android QA complete.
4. Release candidate and signing configuration prepared.
5. Only then enable/run the agreed CI suite and Android release validation.
6. Submit to RuStore after all release gates pass.

**CI is intentionally deferred.** No workflow should be run during development. The repository currently has no workflow files.
