# MindQuest QA Test Plan

Last updated: 2026-11-18

## Purpose

This plan separates repeatable automated browser checks from manual acceptance activities that require a human, a physical Android device, or assistive technology. A passing browser suite is not evidence of native Android, TalkBack, WCAG conformance, or store readiness.

## Automated browser regression

The GitHub Actions browser suite covers the following automated acceptance areas:

| Area | Automated coverage | Acceptance |
|---|---|---|
| Launch experience | Dialog semantics, inert/hidden application shell, keyboard focus containment, Escape dismissal and focus hand-off | Background is unavailable while launch dialog is open; focus returns to Home after dismissal |
| Themes | All ten themes and foreground/muted text contrast against both app and panel surfaces | Text contrast is at least 4.5:1 for tested text/surface pairs |
| Independent selectors | Five interface locales × three regions × three available question locales | All 45 supported combinations remain independently selectable |
| Round modes | 5-, 10- and 15-question rounds across India, Russia and the United States | Selected round length is honoured when the filtered pool is large enough |
| Content filters | Every category × difficulty pairing in each of the three playable regions | Rendered question category and difficulty match the selected filters |
| Keyboard continuity | Answer selection, pressed-state semantics and progression | Exactly one answer exposes `aria-checked=true`; arrow keys move through the four-option radio group and select the focused answer; focus then moves to Next/See results and the next question heading |
| Accessible control structure | Visible controls, image alternatives and DOM identifiers across Home, Settings, Quiz and Results | Every visible interactive control has an accessible name; images have alt attributes; IDs are unique |
| Responsive layout | 320, 360, 390, 768 and 1024 CSS-pixel widths across Home, Settings and Quiz | No document-level horizontal overflow |
| Persistence | Interface locale, region, question locale, round length, theme and accessibility preferences across reload | Saved values are restored independently |
| Offline boundary | Runtime request observation and restrictive Content Security Policy (`connect-src 'none'`, local bundled assets only) | No external network request is made by the application |

The test suite must retain strict assertions. If an assertion fails, investigate the product behavior; do not delete or loosen the assertion to obtain a green workflow.

## Manual acceptance still required

### Android device
- Install the latest debug APK and confirm clean installation, launch and exit.
- Check splash display and dismissal, including returning from background and relaunching.
- Verify all ten themes and each accessibility preference.
- Complete 5-, 10- and 15-question rounds, including replay and result review.
- Verify settings and best score survive process termination and device restart.
- Test portrait/landscape and small/standard/large displays.
- Confirm airplane-mode operation after a clean install and after content has been used.
- Review Android permissions and WebView behavior on the target device.

### Assistive technology
- Complete the full application flow using TalkBack.
- Confirm the launch dialog is announced, focus remains within it, and the app becomes available after dismissal.
- Verify settings labels, searchable selector alternatives, answer choices, feedback, progress, results and navigation announcements.
- Confirm text scaling, high contrast, reduced motion and system forced-colors behavior.
- Test keyboard-only navigation in the hosted web build with no pointer input.

### Release and security
- Inspect the APK manifest, packaged assets, permissions and signing metadata.
- Verify no runtime external dependency or unexpected outbound request.
- Review privacy and accessibility disclosures against the exact release build.
- Complete the store metadata, screenshots, content rating and release checklist.
- Do not claim WCAG 2.2 AA conformance or display a conformance logo without a valid evaluation.
- Do not treat a debug APK as a release candidate.

## Current limitations

- Spain and Peru are not playable question regions.
- Spanish question translations are not available.
- The expanded browser regression suite passed in [workflow #44307367081](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44307367081) and was merged in [PR #2](https://github.com/ErTapanJatakia/MindQuest/pull/2).
- [PR #3](https://github.com/ErTapanJatakia/MindQuest/pull/3) passed [workflow #44325807742](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44325807742) and was merged as `a573c2b7e26a78182a34e3d216910aa5c103dcde`.
- [PR #4](https://github.com/ErTapanJatakia/MindQuest/pull/4) passed [workflow #44336160667](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44336160667) and was merged as `674abd3ba1174cc2bdecd006a8bfa7858c0dff39`.
- Physical-device, TalkBack, offline runtime, APK inspection, signing and RuStore submission remain unverified.


## Gameplay progression acceptance — PR #5

- Active pull request: [PR #5 — gameplay progression and results acceptance](https://github.com/ErTapanJatakia/MindQuest/pull/5).
- Adds stable active-question IDs for deterministic regression diagnostics.
- Adds exact 5/10/15 difficulty quota assertions, result-heading focus and review completeness checks.
- Adds four-round 50-question cycle-exhaustion tests for each of the three current regions.
- Full CI passed in [workflow #44338004918](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44338004918); PR #5 was merged as `4efab1a65c91adc6160e6b15ecda25c7495b129c`.


## Accepted gameplay progression regression — 2026-11-18

- [PR #5](https://github.com/ErTapanJatakia/MindQuest/pull/5) merged as `4efab1a65c91adc6160e6b15ecda25c7495b129c`.
- [Workflow #44338004918](https://github.com/ErTapanJatakia/MindQuest/actions/runs/44338004918) passed both Android debug APK assembly and browser/content/static checks.
- The active question heading exposes the stable question-bank ID for deterministic regression diagnostics.
- Exact difficulty quotas passed for 5/10/15-question rounds in all three regions: 5 = 2/2/1, 10 = 3/4/3, 15 = 5/6/4 (easy/medium/hard).
- Four consecutive 15-question rounds per region cover all 50 unique questions without duplicates inside a round.
- Results heading focus, polite announcement, complete four-part answer review and theme-selector keyboard focus/Escape restoration passed.
