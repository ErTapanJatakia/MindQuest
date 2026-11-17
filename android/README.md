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

- The only permitted top-level document destination is the bundled `file:///android_asset/index.html` entry point. Hash-based in-app state remains supported; other top-level destinations and subframe navigations are blocked.
- WebView content debugging is explicitly disabled. JavaScript remains enabled only because the bundled game requires it; cross-file-origin access, universal file-origin access, content-provider access, pop-up windows and mixed content remain disabled.
- The Activity pauses/resumes WebView timers with its lifecycle and stops/destroys the WebView when the Activity is destroyed.
- These are source-level controls. Confirm behaviour against the built APK and supported Android versions during the deferred Android QA stage.


## Android system back compatibility

- Android 13 (API 33) and newer use the platform `OnBackInvokedDispatcher`, including the system predictive-back pathway. Back navigates WebView history when available and otherwise finishes the Activity.
- Android 6.0 through Android 12 retain the legacy Activity back callback. The API 33+ callback is unregistered when the Activity is destroyed.
- This uses platform APIs already available through the configured compile SDK and introduces no AndroidX or other dependency. Device/gesture behaviour remains unverified until Android runtime QA.


## Android 15 edge-to-edge layout

- For API 35 and newer, the WebView applies system-bar and display-cutout insets as content padding. This keeps the game interface inside the safe visible area while retaining the platform edge-to-edge window behaviour.
- The inset listener is only installed on API 35+, matching the target-SDK edge-to-edge enforcement boundary. No AndroidX dependency or permission is added.
- Rendering around gesture navigation, three-button navigation, cutouts and keyboard/IME remains subject to runtime device validation.


- The same API 35+ safe-inset calculation includes the on-screen keyboard (IME), so the WebView's usable area can respond when Android displays the keyboard.
