# Architecture decisions

## Product shape

MindQuest will ship as a self-contained Android application. The initial game experience is implemented with local HTML, CSS and JavaScript, hosted inside a minimal Android WebView shell. This keeps the game lightweight and makes the same UI straightforward to inspect and manually exercise during development. The Android wrapper is a packaging target, not a dependency on a hosted website.

## Runtime constraints

- All production HTML, CSS, JavaScript, fonts, icons and question data are bundled in the APK.
- No runtime CDN, remote font, remote script, analytics, advertising, login, API or network dependency.
- WebView JavaScript is enabled only for the bundled local application. Do not expose a JavaScript bridge unless a reviewed native feature strictly requires it.
- Disable cleartext traffic and unnecessary WebView capabilities; use the narrowest Android permissions possible.
- Store preferences and best score locally. Do not store personal data because the MVP does not need it.

## Localization model

The app maintains three separate language/content settings plus independent gameplay filters. The gameplay filters include category, difficulty and a configurable round length of 5, 10 or 15 questions (default 10). If the eligible pool is smaller than the selected length, the round uses every available question. Best-score records are scoped by region, category, difficulty and selected round length. Each stored record has exactly two integer fields, `score` and `total`; the reader rejects malformed shapes, non-positive totals, totals above the selected round length and scores outside the total.

The app maintains three separate settings:

1. `interfaceLocale`: controls navigation, buttons, labels, help and feedback UI.
2. `questionRegion`: chooses the regional content pool (`IN`, `RU`, `US`).
3. `questionLocale`: selects the language variant for the selected question IDs.

No setting is inferred from or forcibly coupled to another after initial setup. Device locale may be used only as a first-launch suggestion for `interfaceLocale`.

## Question data model

Every conceptually unique question has a stable ID, region, category, difficulty, and a localized representation for each supported locale. All localized representations share the same answer identity and correct-answer key. Explanations are translated alongside the question and answer options. Runtime selection filters by region, category and difficulty, then renders the selected locale. Missing translations must be detected during content review; silently substituting a different question is not acceptable.

## Proposed Android packaging

Use a minimal native Android project with a WebView loading the bundled app from Android assets. Keep the app's web runtime offline and local. Android build tooling and SDK versions will be pinned after the initial wrapper review. Release signing material must remain outside Git and be supplied securely by the owner at release time.

## Quality strategy

- Source review and manual checks during feature implementation.
- No CI workflows or CI runs until the feature-complete checkpoint.
- At the final validation gate, introduce a focused CI suite and Android build validation.
- Do not weaken or remove tests to force a pass. After three consecutive failures with the same approach, change the approach.
