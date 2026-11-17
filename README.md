# MindQuest (Мозговой вызов)

**Check. Think. Conquer.** | **Проверь. Подумай. Победи.**

MindQuest is a free, offline-first puzzle and trivia game designed for Android, with a lightweight web development shell. The first release is intended for RuStore and GitHub Releases.

## Product principles

- Free to use: no advertisements, subscriptions, paid APIs, or monetisation.
- Offline-first: game content and interface assets are bundled with the application.
- No account, backend, telemetry SDK, or mandatory network connection.
- Android-first, with a simple, maintainable application architecture.
- Preserve the independence of interface language, question-bank region, and question language.

## Independent language and content settings

| Setting | Supported values |
|---|---|
| Interface language | Indian English (`en-IN`), American English (`en-US`), Russian (`ru-RU`) |
| Question-bank region | India, Russia, United States |
| Question language | Indian English (`en-IN`), American English (`en-US`), Russian (`ru-RU`) |

These are three separate preferences. For example, Russian interface + India question bank + American English questions is a valid combination. Device locale may suggest an initial interface language only; it must not silently select the question region or question language.

## Question bank

The current content set contains 150 question IDs: 50 for each region, with three localized variants per question (450 localized records). Each question has a stable ID. The three language versions share the same correct-answer identity and are intended to preserve the same meaning, answer options and explanation. Structural coverage is implemented, and a bounded cross-locale factual review of all 150 question IDs (450 localized records) has been completed. This is not exhaustive independent verification of every explanation/distractor or professional native-speaker acceptance; cultural/editorial acceptance and the official structural validator remain release gates.

## MVP scope

- Home screen, settings, help/about.
- Offline multiple-choice quiz with feedback and scoring.
- Configurable 5-, 10- or 15-question rounds, category selection, replay, and difficulty levels.
- Results and explanations.
- Locally persisted preferences and best score.
- Accessibility and small-screen support.
- Android package with bundled assets and a hardened, minimal WebView shell.

Multiplayer, accounts, cloud leaderboards, push notifications, advertising, and monetisation are out of scope for the first release.

## Repository layout

```
app/                 Offline web application
  index.html
  styles.css
  src/
    app.js
    data/
    i18n/
android/             Native Android WebView wrapper (initial shell implemented)
docs/                Architecture, roadmap, QA and release notes
assets/              App artwork and local assets
```

## Development and CI policy

**GitHub Actions / CI are intentionally not configured or enabled during implementation.** Development will proceed through source review and manual checks. CI and Android release validation will be introduced only after feature development is complete, as agreed.

No test will be deleted or weakened to obtain a passing result. If the same validation approach fails three consecutive times, the approach will be changed rather than repeated.

## Release readiness

The release candidate must have a correctly signed Android package, verified offline operation, tested language combinations, no unnecessary permissions, store listing assets and disclosures, and a completed manual QA checklist. RuStore acceptance remains subject to its current review and publishing requirements.

## Status

See [the implementation tracker](docs/ROADMAP.md) and [architecture decisions](docs/ARCHITECTURE.md).
