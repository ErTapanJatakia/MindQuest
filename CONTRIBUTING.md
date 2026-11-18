# Contributing to MindQuest

Thank you for your interest in improving MindQuest. The project is proprietary and accepts contributions only under the conditions below.

## Before proposing a change

1. Read the [README](README.md), [Architecture](docs/ARCHITECTURE.md), [Roadmap](docs/ROADMAP.md), [Security Policy](SECURITY.md), and [Code of Conduct](CODE_OF_CONDUCT.md).
2. Open an issue or contact the maintainer to discuss substantial changes before implementation.
3. Do not assume that public repository visibility grants a right to reuse, redistribute, or create derivative works. See [LICENSE](LICENSE).

## Contribution permission

Do not submit copied third-party code, assets, datasets, translations, or question content unless you have the rights needed for the project to use them. By submitting a patch or contribution, you confirm that you have the right to submit it and grant the project owner permission to review and incorporate it into MindQuest. No broader public licence is granted by this guide.

For substantial external contributions, obtain written agreement on the intended use and ownership/licensing terms before submission.

## Engineering expectations

- Preserve offline-first operation and avoid introducing mandatory network services, paid APIs, advertising, telemetry, or accounts.
- Keep interface language, question region, and question language independent.
- Preserve stable question IDs, translation parity, answer identity, and the official content validator.
- Add or update tests for behaviour changes.
- Do not weaken, delete, or bypass tests to obtain a passing result.
- Keep Android permissions and WebView capabilities to the minimum required.
- Never commit secrets, signing keys, credentials, personal data, or local machine configuration.
- Document user-visible changes and update the roadmap/status records.

## Validation

Run the repository's documented checks when available:

- `npm run validate:content`
- `npm run test:browser`
- Android Gradle validation through the configured workflow.

If the same test or CI strategy fails three consecutive times, stop repeating it and change the approach or defer with a documented reason. Do not weaken the test.

## Pull requests

A useful pull request includes:

- A clear problem statement and proposed solution;
- Scope and user-visible impact;
- Tests and validation evidence;
- Accessibility, localization, privacy, and security considerations;
- Screenshots for substantial visual changes, where appropriate.

Keep changes focused and avoid unrelated formatting or dependency churn.
