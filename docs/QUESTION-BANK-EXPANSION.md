# Question-bank expansion plan

## Locked product target

The expansion target is **250 stable question IDs and 1,250 localized records**:

- Regions: India (IN), Russia (RU), United States (US), Spain (ES), Peru (PE).
- Question locales: en-IN, en-US, ru-RU, es-ES and es-PE.
- Each region: exactly 50 distinct questions.
- Each region's category quotas: Geography 13, History 12, Science 12, Culture 13.
- Each region's difficulty quotas: easy 15, medium 20, hard 15.
- Every stable question ID must have all five locale records before its region/locale combination is exposed in the app.

The interface locale selector and question locale selector are separate product concerns. Spanish interface translations already exist; they do **not** imply that Spanish question content is complete.

## Stable ID convention

Use `{REGION}-{CATEGORY}-{NNN}`, where category codes are GEO, HIS, SCI and CUL. IDs are permanent identifiers: changing wording, translation or answer-option order must not change an ID. The shared correct-answer key (a/b/c/d) must resolve to the same factual answer in every locale.

## Editorial and translation gates

1. Write original regional questions; do not relabel another region's question or duplicate a question to satisfy quotas.
2. Keep the four options mutually distinct, plausible and unambiguous.
3. Verify factual claims against reputable primary or institutional sources. Record the source in the editorial review log, not in user-facing question text.
4. Translate the question, all four options and explanation independently for each locale. Do not use English text as a fallback for Spanish or Russian.
5. Use es-ES for Spain-oriented wording and es-PE for Peruvian Spanish. Avoid treating regional variants as interchangeable where vocabulary or cultural context matters.
6. Native-speaker review and answer-key review are release gates. Automated structural validation is necessary but cannot establish translation quality or factual correctness.
7. Do not expose a region or locale in selectors until its complete 50-question bank and all required locale records pass validation and editorial review.

## Current baseline and gap

The canonical bank remains unchanged at 150 IDs (50 each for IN, RU and US). Its five-locale coverage is complete: 750 localized records across en-IN, en-US, ru-RU, es-ES and es-PE. Spain and Peru now have 40 staged original IDs with five locale records each, adding 200 staged records.

- Current structural total: **190 / 250 stable IDs and 950 / 1,250 localized records**.
- Spain: 20 / 50 staged IDs; 100 / 250 localized records.
- Peru: 20 / 50 staged IDs; 100 / 250 localized records.
- Remaining: **60 new IDs and 300 localized records**.
- Spanish question selectors and the Spain/Peru region selectors remain hidden; staged records are not loaded into gameplay.

Run `npm run audit:expansion` to see the live structural gap. The audit deliberately reports incomplete target coverage without failing routine CI; it fails only on malformed records, unsupported regions/locales or duplicate IDs. The existing strict question-bank validator remains the release gate for the currently enabled 150-ID bank.

## Rollout sequence

1. Complete and review the Spanish translations for existing IDs.
2. Author Spain and Peru question sets to the exact category/difficulty quotas, with all five translations.
3. Extend the strict bank validator and app selector allow-lists together, only when each complete bank is ready.
4. Add combination-matrix tests for all five regions × five question locales (25 combinations).
5. Complete native-speaker, factual, accessibility and offline regression before the feature-complete Android validation gate.

**No Android APK is to be assembled during this expansion work.** The separate manual Android workflow remains reserved for the completed and reviewed feature set.
