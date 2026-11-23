import { readFile } from "node:fs/promises";

const files = {
  activity: "android/app/src/main/java/com/mindquest/app/MainActivity.kt",
  manifest: "android/app/src/main/AndroidManifest.xml",
  appGradle: "android/app/build.gradle.kts",
  rootGradle: "android/build.gradle.kts",
  gradleProperties: "android/gradle.properties",
  wrapper: "android/gradle/wrapper/gradle-wrapper.properties"
};
const source = Object.fromEntries(await Promise.all(Object.entries(files).map(async ([key, path]) => [key, await readFile(path, "utf8")])));
const failures = [];
const requirePattern = (key, pattern, message) => {
  if (!pattern.test(source[key])) failures.push(message);
};
const forbidPattern = (key, pattern, message) => {
  if (pattern.test(source[key])) failures.push(message);
};

// WebView must load only the bundled offline document and must not expose a native bridge.
requirePattern("activity", /^package com\.mindquest\.app$/mu, "Kotlin source package must remain com.mindquest.app");
requirePattern("activity", /WebView\.setWebContentsDebuggingEnabled\(false\)/u, "WebView remote debugging must remain disabled");
requirePattern("activity", /javaScriptEnabled\s*=\s*true/u, "Bundled game JavaScript must remain enabled");
requirePattern("activity", /domStorageEnabled\s*=\s*true/u, "Local DOM storage must remain enabled for preferences and scores");
requirePattern("activity", /allowFileAccess\s*=\s*true/u, "Bundled APK asset file access must remain enabled");
requirePattern("activity", /allowContentAccess\s*=\s*false/u, "Content-provider access must remain disabled");
requirePattern("activity", /allowFileAccessFromFileURLs\s*=\s*false/u, "File-origin cross-file access must remain disabled");
requirePattern("activity", /allowUniversalAccessFromFileURLs\s*=\s*false/u, "Universal file-origin access must remain disabled");
requirePattern("activity", /javaScriptCanOpenWindowsAutomatically\s*=\s*false/u, "JavaScript-triggered windows must remain disabled");
requirePattern("activity", /setSupportMultipleWindows\(false\)/u, "Multiple WebView windows must remain disabled");
requirePattern("activity", /MIXED_CONTENT_NEVER_ALLOW/u, "Mixed content must remain blocked");
requirePattern("activity", /gameView\.loadUrl\("file:\/\/\/android_asset\/index\.html"\)/u, "WebView must load the exact bundled entry point");
requirePattern("activity", /uri\.scheme\s*==\s*"file"/u, "Navigation allowlist must require file scheme");
requirePattern("activity", /uri\.path\s*==\s*"\/android_asset\/index\.html"/u, "Navigation allowlist must require the bundled index document");
requirePattern("activity", /uri\.query\s*==\s*null/u, "Navigation allowlist must reject query strings");
requirePattern("activity", /override fun shouldOverrideUrlLoading\(view: WebView, url: String\)/u, "API 23 legacy navigation callback must remain present");
requirePattern("activity", /override fun shouldOverrideUrlLoading\([\s\S]*?request: WebResourceRequest[\s\S]*?\)\s*:\s*Boolean/u, "Modern WebView navigation callback must remain present");
requirePattern("activity", /!request\.isForMainFrame\s*\|\|\s*!isAllowedEntryPoint\(request\.url\)/u, "Modern navigation callback must reject subframes and non-allowlisted destinations");
forbidPattern("activity", /addJavascriptInterface\s*\(/u, "A JavaScript-to-native bridge is not approved");
forbidPattern("activity", /loadUrl\(\s*["']https?:/u, "WebView must not load a remote HTTP(S) document");

// Lifecycle and platform-version handling.
requirePattern("activity", /override fun onResume\(\)[\s\S]*?gameView\.onResume\(\)[\s\S]*?gameView\.resumeTimers\(\)/u, "Activity resume must resume WebView and its timers");
requirePattern("activity", /override fun onPause\(\)[\s\S]*?gameView\.onPause\(\)[\s\S]*?gameView\.pauseTimers\(\)/u, "Activity pause must pause WebView and its timers");
requirePattern("activity", /override fun onDestroy\(\)[\s\S]*?gameView\.apply\s*\{[\s\S]*?stopLoading\(\)[\s\S]*?onPause\(\)[\s\S]*?removeAllViews\(\)[\s\S]*?destroy\(\)/u, "Activity destruction must stop, detach and destroy WebView");
requirePattern("activity", /SDK_INT\s*>=\s*Build\.VERSION_CODES\.TIRAMISU[\s\S]*?Api33BackHandler\.createCallback/u, "Predictive-back callback creation must be API 33+ guarded");
requirePattern("activity", /Api33BackHandler\.register\(this, callback\)/u, "Predictive-back registration must use the API 33 helper");
requirePattern("activity", /Api33BackHandler\.unregister\(this, callback\)/u, "Predictive-back unregistration must use the API 33 helper");
requirePattern("activity", /override fun onBackPressed\(\)[\s\S]*?SDK_INT\s*<\s*Build\.VERSION_CODES\.TIRAMISU/u, "Legacy back handling must be retained below API 33");
requirePattern("activity", /SDK_INT\s*>=\s*35[\s\S]*?Api30WindowInsetsHandler\.apply\(view, insets\)/u, "API 35+ safe-area handling must call the API 30 helper");

// API 30/33 platform types must not leak into the API 23-loadable Activity class.
const mainClassStart = source.activity.indexOf("class MainActivity");
const api30HelperStart = source.activity.indexOf("private object Api30WindowInsetsHandler");
const api33HelperStart = source.activity.indexOf("private object Api33BackHandler");
if (mainClassStart < 0 || api30HelperStart < 0 || api33HelperStart < api30HelperStart) {
  failures.push("API-specific compatibility helpers must remain separate from MainActivity");
} else {
  const mainActivityBody = source.activity.slice(mainClassStart, api30HelperStart);
  const api30Helper = source.activity.slice(api30HelperStart, api33HelperStart);
  const api33Helper = source.activity.slice(api33HelperStart);
  if (/WindowInsets\.Type|OnBackInvokedCallback|OnBackInvokedDispatcher/u.test(mainActivityBody)) {
    failures.push("API 30/33 platform types must not appear in the API 23-loadable MainActivity body");
  }
  if (!/private var backCallback: Any\? = null/u.test(mainActivityBody)) {
    failures.push("MainActivity must store the API 33 callback through an Any/Object field");
  }
  if (!/Api30WindowInsetsHandler\.apply\(view, insets\)/u.test(mainActivityBody) ||
      !/WindowInsets\.Type\.systemBars\(\)[\s\S]*?WindowInsets\.Type\.displayCutout\(\)[\s\S]*?WindowInsets\.Type\.ime\(\)/u.test(api30Helper)) {
    failures.push("API 30 WindowInsets.Type references must be isolated in Api30WindowInsetsHandler");
  }
  if (!/Api33BackHandler\.createCallback/u.test(mainActivityBody) ||
      !/OnBackInvokedCallback/u.test(api33Helper) ||
      !/onBackInvokedDispatcher/u.test(api33Helper) ||
      !/registerOnBackInvokedCallback/u.test(api33Helper) ||
      !/unregisterOnBackInvokedCallback/u.test(api33Helper)) {
    failures.push("API 33 predictive-back references must be isolated in Api33BackHandler");
  }
}

// Build metadata and bundled asset path must match the documented Android support boundary.
requirePattern("appGradle", /namespace\s*=\s*"com\.mindquest\.app"/u, "Android namespace must remain com.mindquest.app");
requirePattern("appGradle", /applicationId\s*=\s*"com\.mindquest\.app"/u, "Android application ID must remain com.mindquest.app");
requirePattern("appGradle", /minSdk\s*=\s*23/u, "Minimum Android API must remain 23");
requirePattern("appGradle", /targetSdk\s*=\s*35/u, "Target Android API must remain 35");
requirePattern("appGradle", /assets\.srcDir\("\.\.\/\.\.\/app"\)/u, "APK assets must use the canonical repository app directory");
requirePattern("appGradle", /compilerOptions\s*\{[\s\S]*?jvmTarget\s*=\s*org\.jetbrains\.kotlin\.gradle\.dsl\.JvmTarget\.JVM_17/u, "Kotlin JVM target must use the typed compilerOptions DSL and remain aligned to Java 17");
forbidPattern("appGradle", /kotlinOptions\s*\{/u, "Deprecated Kotlin kotlinOptions DSL must not be reintroduced");
requirePattern("rootGradle", /com\.android\.application"\) version "8\.11\.1"/u, "Android Gradle Plugin version must remain pinned");
requirePattern("rootGradle", /org\.jetbrains\.kotlin\.android"\) version "2\.2\.21"/u, "Kotlin Android plugin version must remain pinned");
requirePattern("gradleProperties", /android\.useAndroidX=true/u, "AndroidX Gradle setting must remain explicit");
requirePattern("wrapper", /distributionUrl=.*gradle-8\.14\.8-bin\.zip/u, "Gradle wrapper distribution must remain pinned to 8.14.8");

if (failures.length) {
  for (const failure of failures) console.error("FAIL: " + failure);
  process.exitCode = 1;
} else {
  console.log("Android WebView/lifecycle source audit passed: local-only document boundary, WebView hardening, no JavaScript bridge, API 23/24+ navigation guards, lifecycle cleanup, API 30/33 platform-type isolation, predictive-back registration/unregistration, API 35 inset handling, pinned SDK/toolchain and canonical offline asset source.");
  console.log("Scope: static source/configuration regression only; no Kotlin compilation, Gradle task, APK assembly, emulator or physical-device validation was run.");
}
