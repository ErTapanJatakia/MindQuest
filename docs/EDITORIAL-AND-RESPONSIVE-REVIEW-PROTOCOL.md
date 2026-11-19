# MindQuest editorial evidence and responsive regression protocol

## Editorial evidence register

The staged Spain and Peru question bank is not runtime-enabled. Each staged stable ID must have exactly one claim-level row across the five regional batch registers. Each row must identify the fact being tested and link at least one HTTPS institutional or primary reference.

The automated evidence audit verifies register completeness, ID matching, descriptive claim text, HTTPS links, duplicate/missing rows, the documented human-review gates, and continued exclusion of staged source files from the runtime HTML.

The audit does **not** fetch or assess source pages. It does not establish that a source supports a claim, that a question or answer key is factually correct, that distractors are unambiguous, or that any translation is idiomatic. Reviewers must open the source, verify the precise claim and answer key, inspect all distractors, and record human sign-off.

## Required human review

- Independent factual review against the cited primary or institutional source.
- Independent answer-key and distractor review.
- Native-speaker review for es-ES and es-PE.
- Editorial approval of terminology, spelling, locale conventions and explanation quality.
- Completion of the 25 interface/region/question-language combinations after the relevant selectors become eligible for release.

Automated structural checks must never be treated as substitutes for these approvals.

## Responsive viewport regression

The browser regression matrix checks Home, Settings and Quiz at seven viewport profiles:

| Profile | CSS viewport |
|---|---:|
| Compact phone | 320 × 720 |
| Small phone | 360 × 800 |
| Modern phone | 390 × 844 |
| Large phone | 414 × 896 |
| Tablet portrait | 768 × 1024 |
| Tablet landscape | 1024 × 768 |
| Desktop | 1366 × 768 |

It checks horizontal document overflow, header brand/action overlap, Settings control bounds, Quiz content bounds and browser page errors. These Chromium viewport simulations are regression coverage, not physical-device certification. Android device validation and assistive-technology checks remain separate manual activities.

## Release boundary

All Spain/Peru questions remain staged and excluded from runtime selectors and gameplay. No Android build, APK, signing, store submission, production deployment, or paid service is part of these checks.
