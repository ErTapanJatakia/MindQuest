# MindQuest Accessibility Statement

**Effective date:** 18 November 2026  
**Application:** MindQuest (Мозговой вызов)

## Commitment

MindQuest aims to provide an inclusive puzzle and trivia experience across supported devices, input methods, languages, and accessibility preferences. Accessibility is an ongoing engineering and review activity; this statement does not represent an independent certification.

## Standards and target

The design and development target is **Web Content Accessibility Guidelines (WCAG) 2.2 Level AA**, where applicable to the bundled web interface. The Android experience also requires platform-level testing with Android accessibility services. A target is not the same as verified conformance.

The W3C WCAG 2.2 Level AA conformance logo links to the official explanation of the conformance requirements. Its display represents the application owner’s conformance declaration; it is not a W3C audit, endorsement, or independent certification. The application owner is responsible for ensuring that the exact version presented as conforming has been evaluated against all applicable WCAG 2.2 Level AA success criteria and conformance requirements, including manual review and assistive-technology testing.

## Accessibility features and design practices

The following engineering features and automated browser checks are implemented:

- Semantic headings, labels, buttons, and form controls;
- Keyboard focus visibility and programmatic focus movement between views;
- Status announcements for progress, answer feedback, and results;
- Language metadata for localized questions and answer choices;
- Responsive layouts and support for narrow screens;
- Reduced-motion styling;
- Forced-colors/high-contrast styling;
- Localized interface and question content with independent language choices.

The presence of source-level support does not guarantee that every combination works with every assistive technology or device configuration.

## Known limitations and verification

Automated browser regression currently covers keyboard navigation and focus transitions, accessible names and ARIA references, live-region semantics, language metadata, large-text/high-contrast/reduced-motion behavior at compact widths, and contrast measurements for ten themes across twelve viewport profiles. These results are limited to the tested browser configurations and do not establish conformance. The remaining acceptance work for this release is physical Android verification with TalkBack and other supported screen readers, switch-access operation, and device-specific focus, text-scaling, contrast and layout behavior. Those checks must be recorded against the exact candidate build.

Please report barriers with the device model, Android/browser version, assistive technology, steps to reproduce, and (if possible) a description of the affected screen. Do not include sensitive personal information in a report.

## Feedback and remediation

Accessibility feedback is welcome. The project will assess reported barriers, prioritize issues by impact, and document material changes. Users may contact the project accessibility feedback contact using the details below.

## Accessibility feedback contact

- **Name:** Er. Tapan Jatakia (C. Eng.)
- **Email:** cyber.litigation.advisor@gmail.com
- **Phone Number:** +91 9664332984
- **Website:** https://linktr.ee/ertapanjatakia

---

*This is an accessibility commitment and status disclosure, not a certificate of WCAG conformance. A conformance logo must not be interpreted as an audit result unless a valid conformance evaluation supports that claim.*
