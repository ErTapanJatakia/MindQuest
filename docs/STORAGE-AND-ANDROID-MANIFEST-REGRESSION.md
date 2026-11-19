# Storage resilience and Android manifest regression protocol

## Automated storage scenarios

The browser regression suite exercises the production application against isolated browser contexts:

- Malformed persisted settings fall back to supported defaults without blocking Home.
- Storage read denial is surfaced to the player while core gameplay remains available.
- Preference and best-score write failures (including quota-style exceptions) do not crash navigation.
- Malformed or out-of-range best-score records are rejected.
- Legacy ten-question best-score records migrate to the round-length-aware key without changing their payload.
- Best-score data remains isolated by question region and round length; the production key also scopes category and difficulty.

These checks simulate browser storage failure modes. They do not guarantee persistence where the operating system, browser, WebView or device denies storage.

## Android manifest source audit

The static manifest gate verifies that backup and cleartext traffic remain disabled, RTL support remains enabled, exactly one explicit launcher activity is declared, no Android permissions are introduced without review, and the committed manifest does not enable debugging.

This is a source-configuration regression check, not an APK inspection, dynamic Android security assessment, penetration test or release certification. Android build/device validation remains a separate final-stage activity and is not run in this feature-development workflow.

## Failure handling

A failing assertion must be traced to the exact browser scenario or manifest property. Fix the underlying behavior or test fixture; do not remove or relax the assertion to obtain a green run.
