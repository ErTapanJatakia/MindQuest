# MindQuest (Мозговой вызов)

**Stay Curious. Outsmart the Ordinary.** | **Будь любознателен. Думай шире.**

MindQuest is a free, offline-first multilingual puzzle and trivia game for Android. The project is independently maintained and currently in pre-release engineering and validation. The intended first distribution channel is RuStore, with GitHub Releases as a supporting channel.

## Product principles

- Free to use: no advertisements, subscriptions, paid APIs or monetisation.
- Offline-first: question content and interface assets are bundled with the application.
- No account, backend, analytics SDK or mandatory network connection.
- Android-first, with a lightweight web application used for development and browser regression.
- Interface language, question-bank region and question language remain independent preferences.
- Privacy-conscious local persistence; no gameplay telemetry is required.

## Independent language and content settings

| Setting | Supported values |
|---|---|
| Interface language | English (India) `en-IN`, English (US) `en-US`, Russian `ru-RU`, Spanish (Spain) `es-ES`, Spanish (Peru) `es-PE` |
| Question-bank region | India `IN`, Russia `RU`, United States `US`, Spain `ES`, Peru `PE` |
| Question language | English (India) `en-IN`, English (US) `en-US`, Russian `ru-RU`, Spanish (Spain) `es-ES`, Spanish (Peru) `es-PE` |

The three preferences are independent. For example, a Russian interface can be used with the India question bank and Spanish (Peru) questions. Changing one preference must not silently change either of the others. Device locale may suggest an initial interface language only.

## Question bank

The runtime bank contains **250 stable question IDs**: 50 each for India, Russia, the United States, Spain and Peru. Every question has five localized variants, for **1,250 localized records** across `en-IN`, `en-US`, `ru-RU`, `es-ES` and `es-PE`.

Each region has the same structural distribution:

- Categories: Geography 13, History 12, Science 12, Culture 13.
- Difficulty: Easy 15, Medium 20, Hard 15.

The runtime loader activates the expanded bank only after its structural invariants pass. The human factual/answer-key review and native-speaker review are marked complete based on project-owner confirmation. Automated validators establish structural consistency and evidence-register coverage; they do not independently certify every factual claim, translation or source.

## Gameplay

- Offline multiple-choice trivia and puzzle rounds.
- 5-, 10- and 15-question round lengths.
- Region, category, difficulty and question-language filters.
- Answer feedback, scoring, current streak and result review with explanations.
- Replay and session question-cycle protection against within-round duplicates.
- Locally persisted preferences and best scores scoped to the applicable question pool.
- Ten colour themes, large-text, reduced-motion and high-contrast preferences.
- Keyboard-accessible navigation and semantic answer selection.

## Privacy and security posture

The app is designed to run without accounts, ads, analytics SDKs, cloud leaderboards or mandatory network access. Browser regression checks exercise offline flows and reject cross-origin requests in the tested paths. Static security audits check CSP and selected unsafe runtime patterns. Android manifest checks verify restrictive defaults, including disabled backup and cleartext traffic.

These checks are targeted engineering controls, not a penetration test, independent security certification, WCAG conformance statement or proof of every device-level behaviour. Physical-device, TalkBack, native lifecycle, final APK and store acceptance checks remain distinct release gates.

## Repository layout

```
app/                 Offline web application and bundled question content
  index.html
  styles.css
  src/
    app.js
    data/
    i18n/
android/             Native Android WebView wrapper
docs/                Architecture, roadmap, QA and release evidence
scripts/             Content, security and browser regression gates
.github/workflows/   Automated validation and gated final Android validation
```

## Development and validation

The GitHub Actions workflow validates content, localization, editorial evidence, runtime security boundaries, gameplay, persistence, accessibility, responsive behaviour, offline isolation, question-cycle integrity and Android manifest defaults.

Useful local commands (Node.js 20 or later):

- `npm run validate:content`
- `npm run audit:expansion`
- `npm run validate:spanish`
- `npm run audit:security`
- `npm run audit:editorial`
- `npm run test:browser`
- `npm run test:locale-persistence`
- `npm run test:gameplay-integrity`
- `npm run test:accessibility`
- `npm run test:responsive`
- `npm run test:storage-resilience`
- `npm run test:theme-accessibility`
- `npm run test:score-scope`
- `npm run test:runtime-bank`
- `npm run test:offline-isolation`
- `npm run test:question-cycle`
- `npm run test:lifecycle`
- `npm run test:accessible-names`
- `npm run test:focus-order`

Never delete or weaken a test to obtain a passing result. After three consecutive failures with the same strategy, change the approach rather than repeating it.

## Release policy

No intermediate Android APK/Gradle assembly or artifact upload is performed during feature implementation. Final Android validation is a separately gated, manually triggered workflow and is permitted only after the agreed feature scope is complete. Signing, production release, RuStore submission and deployment require separate explicit authorization.

Before release, complete the physical-device and TalkBack checklist, verify offline operation and storage recovery on Android, inspect the exact candidate package and signing identity, prepare store artwork and accurate disclosures, and archive reproducible CI/manual evidence. See [Release readiness and manual QA](docs/RELEASE-READINESS-AND-MANUAL-QA.md).

## Project documentation

- [Implementation tracker](docs/ROADMAP.md)
- [Development status](docs/DEVELOPMENT-STATUS.md)
- [QA test plan](docs/QA-TEST-PLAN.md)
- [Architecture decisions](docs/ARCHITECTURE.md)
- [Product and release requirements](docs/PRODUCT-AND-RELEASE-REQUIREMENTS.md)
- [Release readiness and manual QA](docs/RELEASE-READINESS-AND-MANUAL-QA.md)
- [Privacy Policy](PRIVACY-POLICY.md)
- [Accessibility Statement](ACCESSIBILITY.md)
- [Security Policy](SECURITY.md)
- [Code of Conduct](CODE_OF_CONDUCT.md)
- [Contributing Guide](CONTRIBUTING.md)
- [Proprietary Licence](LICENSE)
