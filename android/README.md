# Android application shell

The Android module is a minimal Kotlin Activity hosting the locally bundled game assets. The canonical web source remains in the repository's `app/` directory and is included as APK assets through the Gradle source set.

## Current configuration

- Application ID: `app.mindquest`
- Minimum SDK: 23
- Compile / target SDK: 35
- Java / Kotlin target: 17
- Runtime permissions: none declared
- Network permission: none declared
- WebView: local APK asset entry point only; no JavaScript bridge; no external navigation.

## Build prerequisites

Install JDK 17 and Android SDK Platform 35. The project pins Android Gradle Plugin 8.7.3 and Kotlin Android plugin 2.0.21; the compatible Gradle distribution target is 8.9. The Gradle wrapper has not yet been added, so the build is not yet self-contained or reproducible from a fresh checkout. `android/gradle.properties` establishes UTF-8/heap, AndroidX and Kotlin style defaults.

From this directory, after Gradle is installed:

```sh
gradle :app:assembleDebug
```

The debug APK is a development artifact only. A production RuStore package must be built as a signed release APK or AAB in accordance with RuStore's current requirements. Signing keys and passwords must never be committed to this repository.

## Security note

The WebView needs local file access to load `file:///android_asset/index.html`. Content access, cross-file-origin access, universal file-origin access, mixed content and external navigation are restricted. Reassess this boundary during the Android source review and device QA.


## WebView lifecycle and navigation boundary

- The permitted document destination is the bundled `file:///android_asset/index.html` entry point. Hash-based in-app state remains supported; other destinations are rejected. On API 24 and newer, the request callback also rejects all subframe navigations through `isForMainFrame`. API 23's legacy string callback cannot distinguish main-frame from subframe requests, so it enforces the same exact local-document URL allowlist without an explicit frame check.
- WebView content debugging is explicitly disabled. JavaScript remains enabled only because the bundled game requires it; cross-file-origin access, universal file-origin access, content-provider access, pop-up windows and mixed content remain disabled.
- The Activity pauses/resumes WebView timers with its lifecycle and stops/destroys the WebView when the Activity is destroyed.
- These are source-level controls. Confirm behaviour against the built APK and supported Android versions during the deferred Android QA stage.


## Android system back compatibility

- Android 13 (API 33) and newer register a platform `OnBackInvokedCallback` through `OnBackInvokedDispatcher` at default priority. It handles the committed system-back action by navigating WebView history when available and otherwise finishing the Activity.
- This is dispatcher integration, not a custom predictive-back animation: the Activity does not implement `OnBackAnimationCallback` progress, cancellation or gesture-preview handling. OS-provided predictive-back presentation and callback timing must be confirmed on supported devices.
- Android 6.0 through Android 12 retain the legacy Activity back callback. The API 33+ callback is unregistered when the Activity is destroyed.
- This uses platform APIs already available through the configured compile SDK and introduces no AndroidX or other dependency. Device/gesture behaviour remains unverified until Android runtime QA.


## Android 15 edge-to-edge layout

- For API 35 and newer, the WebView applies system-bar and display-cutout insets as content padding. This keeps the game interface inside the safe visible area while retaining the platform edge-to-edge window behaviour.
- The inset listener is only installed on API 35+, matching the target-SDK edge-to-edge enforcement boundary. No AndroidX dependency or permission is added.
- Rendering around gesture navigation, three-button navigation, cutouts and keyboard/IME remains subject to runtime device validation.


- The same API 35+ safe-inset calculation includes the on-screen keyboard (IME), so the WebView's usable area can respond when Android displays the keyboard.


- The application manifest explicitly enables Android's platform back-invoked callback dispatch, matching the API 33+ `OnBackInvokedDispatcher` implementation in `MainActivity`.


## Launcher icon resource compatibility

- Android 8.0 (API 26) and newer use a native adaptive launcher icon with a separate foreground mark and the existing dark-navy background colour.
- Android 6.0–7.1 use the matching vector fallback in `mipmap-anydpi`; the branded splash drawable remains unchanged.
- The manifest references the version-qualified `@mipmap/ic_launcher` resource for both standard and round launcher icon slots. Resource compilation and launcher rendering remain unverified until Android validation.


## Android keyboard/IME window configuration

- The launcher Activity declares `android:windowSoftInputMode="adjustResize"` so the Android 15+ edge-to-edge window can receive and dispatch IME insets to the WebView container. The Activity's API 35+ inset listener includes the IME alongside system bars and display cutouts.
- This is a source-level configuration alignment. Keyboard opening, dismissal, animation and viewport behaviour still require runtime validation on supported Android versions.


### API 23 WebView navigation callback compatibility (2026-11-18)
- Added the legacy `shouldOverrideUrlLoading(WebView, String)` override so the explicit local-document navigation allowlist also applies on the minimum supported Android API 23, where `WebResourceRequest` is unavailable.
- Both callback paths now share one URI predicate: only `file:///android_asset/index.html` is permitted, optional URL fragments remain usable for in-app state, query strings are rejected, and API 24+ subframe navigation is blocked.
- Source-level change only. No Kotlin compilation, Android build, API 23 emulator, runtime navigation or device test was run; CI/Android validation remain deferred.
