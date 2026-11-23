# MindQuest question-bank scope and release controls

**Current status:** Five-region question bank enabled; structural validation and guarded activation are part of routine CI.  
**Last reconciled:** 2026-11-23

## Locked product target — completed

The current runtime bank contains **250 stable question IDs and 1,250 localized records**:

- Regions: India (`IN`), Russia (`RU`), United States (`US`), Spain (`ES`) and Peru (`PE`).
- Question locales: `en-IN`, `en-US`, `ru-RU`, `es-ES` and `es-PE`.
- Each region contains exactly 50 distinct question IDs.
- Each region's category quotas: Geography 13, History 12, Science 12, Culture 13.
- Each region's difficulty quotas: easy 15, medium 20, hard 15.
- Each stable ID has all five locale records before it is exposed to gameplay.

All five interface locales, five regions and five question locales are available independently. The 125 interface-locale × region × question-locale combinations are covered by automated persistence and multilingual regression.

## Stable ID and localization model

IDs use the `{REGION}-{CATEGORY}-{NNN}` convention, with GEO, HIS, SCI and CUL category codes. IDs are permanent: wording, translation or answer-option order changes do not change an ID. The shared correct-answer key (a/b/c/d) must resolve to the same factual answer in every locale.

Translate the question, all four options and explanation. Use `es-ES` for Spain-oriented wording and `es-PE` for Peruvian Spanish; do not treat regional variants as interchangeable where vocabulary or context differs.

## Editorial and translation assurance

1. Questions are intended to be original regional content, not duplicated or relabelled to satisfy quotas.
2. Four answer options should be distinct, plausible and unambiguous.
3. Factual claims are supported by recorded source references in the editorial evidence register.
4. Structural validators check stable IDs, region/category/difficulty quotas, locale coverage and activation invariants.
5. The editorial evidence audit checks register completeness and HTTPS source references; it does not independently establish source authority or factual truth.
6. Human factual/answer-key review and native-speaker review are marked complete based on project-owner confirmation. This is not independent certification.
7. A content or translation change must rerun the relevant validators and browser/regression suite.

## Runtime activation boundary

The Spain and Peru content was originally introduced in staged batches. The current activation script exposes the combined bank only after structural checks confirm the canonical and regional records, unique IDs and complete locale coverage. The historical staged rollout is complete; Spain and Peru are enabled question regions, and Spanish question locales `es-ES` and `es-PE` are available.

## Current validation commands

- `npm run validate:content` — enabled question-bank structure and core quotas.
- `npm run audit:expansion` — five-region expansion counts and quotas.
- `npm run validate:spanish` — Spanish localization structure.
- `npm run validate:staged` — staged content and activation invariants.
- `npm run audit:editorial` — claim-level evidence-register structure.
- `npm run test:runtime-bank` and `npm run test:staged-activation` — runtime bank integrity and fail-closed activation.
- `npm run test:multilingual-announcements` — localized announcements, focus, metadata and review boundaries.

Routine CI also runs browser/gameplay, persistence, offline isolation, accessibility, responsive and Android source-boundary checks. These are not a substitute for human editorial review or native Android acceptance.

## Android and release boundary

**No Android APK is to be assembled as part of routine feature-development or security-assurance work.** The separate Android validation workflow remains manually gated by `feature_scope_complete=true` and must be dispatched only after the complete agreed feature scope is implemented and reviewed. Physical-device, TalkBack/screen-reader and switch-access acceptance remain owner-performed against the exact candidate build. Production signing, publication and store submission require separate authorization.

## Historical note

Earlier sections of this plan tracked a 150-ID canonical bank, 230/250 staged total, hidden Spain/Peru selectors and incomplete Spanish question translations. Those were intermediate snapshots and are superseded by the current five-region, 250-ID runtime baseline above.
