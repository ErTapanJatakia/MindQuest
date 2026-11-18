# MindQuest Security Policy

## Supported versions

Security fixes are applied to the current development line and, where practical, the latest published release. This is an early-stage project; no long-term support guarantee is made for older builds.

## Reporting a vulnerability

Please do not disclose suspected vulnerabilities in a public issue before coordinating a fix.

Report security concerns privately to **cyber.litigation.advisor@gmail.com** with:

- A concise description and potential impact;
- Affected version, device, Android version, and browser/WebView version;
- Reproduction steps or a proof of concept that does not access another person's data;
- Any suggested mitigation.

Do not include real user data, credentials, private keys, or information belonging to another person. The project does not promise a particular response or remediation deadline, but reports will be reviewed in good faith.

## Scope and security design

MindQuest is designed to be offline-first and self-contained. Its security objectives include:

- No account, backend, analytics SDK, advertising SDK, or gameplay network dependency;
- No unnecessary Android permissions;
- Bundled local content and assets;
- Restricted WebView navigation and file-origin capabilities;
- No release signing credentials or secrets committed to the repository;
- Local-only preferences and score records.

These are design objectives and source-level controls; they do not replace testing of the built release artifact or the Android runtime.

## Disclosure

Please allow reasonable time for investigation and remediation before public disclosure. Coordinated disclosure is preferred. Do not perform destructive testing, denial-of-service testing, social engineering, or testing against infrastructure you do not own or have permission to assess.
