# MindQuest Product and Release Requirements

## Product identity

- **Name:** MindQuest (Мозговой вызов)
- **Tagline:** Stay Curious. Outsmart the Ordinary.
- **Purpose:** Free, offline-first puzzle and trivia game for a broad audience.
- **Distribution target:** RuStore first, with a GitHub APK release.
- **Commercial model:** Non-monetized; no ads, subscriptions, paid APIs, or mandatory services.

## Independent selectors

Interface language, question-bank region, and question language are independent preferences. Device locale may suggest only the initial interface language.

Interface languages implemented or planned; question-language availability is gated on complete translation coverage:

| Display name | Locale |
|---|---|
| English (Republic of India) | `en-IN` |
| English (United States of America) | `en-US` |
| Russian (Russian Federation) | `ru-RU` |
| Spanish (Republic of Peru) | `es-PE` | Interface implemented; question translations pending |
| Spanish (Kingdom of Spain) | `es-ES` | Interface implemented; question translations pending |

Planned question regions:

| Display name | Code |
|---|---|
| Republic of India | `IN` |
| Russian Federation | `RU` |
| United States of America | `US` |
| Kingdom of Spain | `ES` |
| Republic of Peru | `PE` |

All selector controls should be searchable, keyboard-operable, labelled, and compatible with assistive technologies. Display locale codes alongside language names.

## Question-bank expansion

The target content model is 50 stable question IDs per region, across five regions (250 IDs), with five localized variants per question (1,250 localized records). The existing distribution pattern is retained per region unless an editorially justified update is documented:

- Geography: 13;
- History: 12;
- Science: 12;
- Culture: 13;
- Difficulty: 15 easy, 20 medium, 15 hard.

Translations must preserve question meaning, answer identity, correct-answer key, and explanation. Spanish (es-PE) and Spanish (es-ES) must be reviewed for regional vocabulary and cultural appropriateness. Structural validation does not replace native-speaker editorial and factual review.

## Themes and presentation

Provide at least ten coherent themes. Theme selection must persist locally, apply consistently across every view and state, maintain readable contrast, and remain accessible in forced-colors and reduced-motion settings. A theme control belongs in the top-right area of every application screen.

## Accessibility and policy surfaces

- Provide an Accessibility section in Settings.
- Provide a privacy-policy link on every page.
- Provide an Accessibility Statement link and the approved W3C WCAG 2.2 logo asset at the bottom centre of every page.
- The Accessibility Statement page must place the WCAG 2.2 logo at its top centre and bottom centre.
- Do not claim WCAG conformance or use a conformance badge as proof of compliance without a valid evaluation.

## Launch experience

On each cold application launch, show a translucent branded splash with the logo and consistent tagline for up to five seconds. A user tap dismisses it immediately. Respect reduced-motion preferences and do not block accessibility navigation.

## Release gates

- Content schema and validator cover all five regions and locales.
- All 125 independent selector combinations are tested.
- Browser regression, Android build, offline runtime and security checks pass.
- Theme contrast, keyboard navigation, screen-reader and TalkBack checks are completed.
- Privacy and accessibility documents accurately describe the shipped build.
- Release APK is inspected, signed securely, and prepared for store review.
