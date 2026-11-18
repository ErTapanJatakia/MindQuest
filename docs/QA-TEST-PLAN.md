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
- A follow-up accessibility hardening change in [PR #3](https://github.com/ErTapanJatakia/MindQuest/pull/3) adds selected-answer state and a visible-control structure audit; its CI acceptance is pending.
- Physical-device, TalkBack, offline runtime, APK inspection, signing and RuStore submission remain unverified.
