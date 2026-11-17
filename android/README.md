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

Install a compatible JDK 17, Android SDK Platform 35 and Android Gradle tooling. The Gradle wrapper has not yet been added; wrapper distribution/version pinning is part of the Android integration workstream.

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
