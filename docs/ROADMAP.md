# MindQuest implementation tracker

**Planning baseline:** 2,400 minutes (40 engineering hours). Estimates are working-time estimates, not a calendar delivery promise. Actual effort will be updated as implementation and source review progress.

Statuses: `Planned` = not started; `In progress` = actively being implemented; `Review` = implementation complete, awaiting source review; `Complete` = accepted against its criteria.

| # | Workstream | Acceptance criteria | Status | Estimate (min) |
|---:|---|---|---|---:|
| 1 | Project foundation | Standalone repository structure, documentation, metadata and clean baseline | In progress | 60 |
| 2 | Visual identity | Branding, icon, splash, typography and responsive game interface | Planned | 90 |
| 3 | Home screen | Play, settings, help/about and navigation | Planned | 120 |
| 4 | Independent localization | Three independent selectors; all combinations work; preferences persist separately | Planned | 150 |
| 5 | Question-bank architecture | Offline data, stable IDs, region/category metadata and translation mapping | Planned | 150 |
| 6 | Question content | 150 original questions: 50 per region, each in all three supported languages | Planned | 180 |
| 7 | Core gameplay | Multiple-choice flow, validation, feedback, scoring and progression | Planned | 180 |
| 8 | Game modes | Ten-question rounds, category selection and replay | Planned | 120 |
| 9 | Difficulty progression | Easy/medium/hard classifications and balanced selection | Planned | 90 |
| 10 | Results screen | Score, accuracy, answers, explanations and replay | Planned | 90 |
| 11 | Local persistence | Settings and best score persist locally without an account | Planned | 120 |
| 12 | Accessibility | Scalable text, contrast, keyboard and assistive-technology support | Planned | 120 |
| 13 | Android application shell | Lightweight native Android wrapper, bundled assets, minimal permissions | Planned | 180 |
| 14 | Offline/security hardening | Airplane-mode operation, safe WebView configuration and no remote runtime dependencies | Planned | 120 |
| 15 | Device compatibility | Small/standard/large screen and density checks | Planned | 180 |
| 16 | Manual functional testing | Gameplay, all language combinations, data integrity, persistence and regression | Planned | 180 |
| 17 | RuStore release readiness | Package, signing, metadata, Russian listing, screenshots, disclosures and rating preparation | Planned | 180 |
| 18 | Documentation/release | Installation, changelog, versioning and release checklist | Planned | 90 |
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

## Release gates

1. Feature development complete.
2. Static source review and dependency review complete.
3. Manual functional, localization, offline and Android QA complete.
4. Release candidate and signing configuration prepared.
5. Only then enable/run the agreed CI suite and Android release validation.
6. Submit to RuStore after all release gates pass.

**CI is intentionally deferred.** No workflow should be run during development. The repository must not contain an accidentally active CI trigger.
