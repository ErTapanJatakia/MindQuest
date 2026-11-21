# MindQuest Product and Release Requirements

## Product identity

- **Name:** MindQuest (Мозговой вызов)
- **Tagline:** Stay Curious. Outsmart the Ordinary.
- **Purpose:** Free, offline-first puzzle and trivia game for a broad audience.
- **Distribution target:** RuStore first, with a GitHub APK release.
- **Commercial model:** Non-monetized; no ads, subscriptions, paid APIs, or mandatory services.

## Independent selectors

Interface language, question-bank region, and question language are independent preferences. Device locale may suggest only the initial interface language.

All five interface locales, question regions and question locales are implemented:

| Display name | Locale / code | Current state |
|---|---|---|
| English (Republic of India) | `en-IN` | Implemented |
| English (United States of America) | `en-US` | Implemented |
| Russian (Russian Federation) | `ru-RU` | Implemented |
| Spanish (Republic of Peru) | `es-PE` | Implemented |
| Spanish (Kingdom of Spain) | `es-ES` | Implemented |

| Question-bank region | Code | Current state |
|---|---|---|
| Republic of India | `IN` | Enabled |
| Russian Federation | `RU` | Enabled |
| United States of America | `US` | Enabled |
| Kingdom of Spain | `ES` | Enabled |
| Republic of Peru | `PE` | Enabled |

The three selectors are independent and the 125 interface-locale × region × question-locale combinations are covered by automated persistence regression. All selector controls must remain searchable, keyboard-operable, labelled and compatible with assistive technologies. Display locale codes alongside language names.

## Question bank

The current runtime bank contains 250 stable question IDs (50 per region) and 1,250 localized records (five locale variants per ID). Each region follows the validated distribution:

- Geography: 13;
- History: 12;
- Science: 12;
- Culture: 13;
- Difficulty: 15 easy, 20 medium, 15 hard.

The expanded Spain and Peru content is activated only after guarded structural validation. Human factual/answer-key review and native-speaker review are recorded as complete based on project-owner confirmation; this is not independent certification. Structural validation and evidence-register coverage do not independently certify every factual claim or translation.

## Themes and presentation

The application includes ten themes. Theme selection must persist locally, apply consistently across every view and state, maintain readable contrast, and remain usable in forced-colors and reduced-motion settings. Automated regression covers the ten-theme responsive accessibility matrix. Physical display rendering and device-specific appearance remain subject to device acceptance.

## Accessibility and policy surfaces

- Provide an Accessibility section in Settings.
- Provide a privacy-policy link on applicable application policy/help surfaces.
- Provide an Accessibility Statement link on applicable policy/help surfaces.
- Do not display or imply a WCAG/W3C conformance badge or logo as proof of compliance without a valid evaluation.
- Browser automation covers keyboard navigation, focus order, semantic answer controls, accessible names, ARIA references, language metadata, live-region semantics, responsive large-text/high-contrast/reduced-motion states and theme contrast cases.
- Physical Android assistive-technology acceptance (including TalkBack and switch access) remains a separate manual release gate.
- Do not claim WCAG 2.2 AA conformance or assistive-technology certification based solely on automated tests.

## Launch experience

On each cold application launch, show the branded splash experience with the logo and consistent tagline. A user tap dismisses it immediately. Respect reduced-motion preferences and do not block accessibility navigation. Browser regression verifies its modal/inert behavior and focus restoration.

## Release gates

- Content schema and validators cover all five regions and five locales.
- All 125 independent selector combinations are tested.
- Browser regression, offline-isolation, security source audits and Android manifest checks pass on the exact candidate commit.
- Theme contrast, keyboard navigation and browser accessibility regression pass.
- Physical Android, TalkBack/switch-access and native lifecycle acceptance are completed by the project owner.
- Privacy and accessibility documents accurately describe the exact shipped build.
- The final debug validation APK is inspected for package identity/version, manifest permissions, bundled offline assets and SHA-256 before device acceptance.
- Production signing, release publication and RuStore submission require separate explicit authorization.
