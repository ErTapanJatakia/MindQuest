import { readFile } from "node:fs/promises";

const routineCi = await readFile(".github/workflows/ci.yml", "utf8");
const releaseWorkflow = await readFile(".github/workflows/android-release-validation.yml", "utf8");
const failures = [];

const forbiddenRoutineBuild = /\b(?:gradle|gradlew|assemble(?:Debug|Release)|bundle(?:Debug|Release)|upload-artifact|setup-android|setup-java)\b/iu;
if (forbiddenRoutineBuild.test(routineCi)) {
  failures.push("Routine web/content CI must not install Android build tooling, invoke Gradle, assemble APKs or upload Android artifacts");
}
if (!/^\s*workflow_dispatch:\s*$/mu.test(releaseWorkflow)) {
  failures.push("Final Android validation must remain manually dispatched only");
}
if (/^\s*(?:push|pull_request|schedule):/mu.test(releaseWorkflow)) {
  failures.push("Final Android validation must not be triggered by push, pull request or schedule events");
}
if (!/feature_scope_complete:[\s\S]*?required:\s*true[\s\S]*?type:\s*boolean[\s\S]*?default:\s*false/u.test(releaseWorkflow)) {
  failures.push("Final Android validation must require the explicit boolean feature_scope_complete input, default false");
}
if (!/^\s*if:\s*inputs\.feature_scope_complete\s*==\s*true\s*$/mu.test(releaseWorkflow)) {
  failures.push("Android build job must be guarded by feature_scope_complete == true");
}
if (!/^\s*if:\s*inputs\.feature_scope_complete\s*!=\s*true\s*$/mu.test(releaseWorkflow)) {
  failures.push("Android validation must retain a safe guard path when feature scope is incomplete");
}
if (!/Assemble debug APK[\s\S]*?assembleDebug/u.test(releaseWorkflow)) {
  failures.push("The final validation workflow must retain its explicit debug APK validation step");
}
if (!/Upload debug APK[\s\S]*?upload-artifact/u.test(releaseWorkflow)) {
  failures.push("The final validation workflow must retain its explicit validation artifact step");
}
if (!/Inspect APK identity, permissions and bundled offline assets[\s\S]*?dump badging[\s\S]*?sdkVersion:'23'[\s\S]*?targetSdkVersion:'35'[\s\S]*?dump permissions[\s\S]*?unzip -Z1[\s\S]*?sha256sum/u.test(releaseWorkflow)) {
  failures.push("The final validation workflow must inspect APK metadata, permissions, bundled offline assets and SHA-256 after assembly");
}
for (const required of ["package_id=app.mindquest", "version_code=1", "version_name=0.1.0", "min_sdk=23", "target_sdk=35", "sdkVersion:'23'", "targetSdkVersion:'35'", "versionCode='1'", "assets/index.html", "assets/styles.css", "assets/src/app.js", "assets/src/data/questions.js", "mindquest-gate2-debug-validation"]) {
  if (!releaseWorkflow.includes(required)) failures.push("Final Android package inspection is missing required assertion: " + required);
}
if (!/^permissions:\s*\n\s*contents:\s*read\s*$/mu.test(releaseWorkflow)) {
  failures.push("Final Android validation must retain read-only repository permissions");
}
if (!/^\s*timeout-minutes:\s*30\s*$/mu.test(releaseWorkflow)) {
  failures.push("Final Android package validation must have a bounded 30-minute job timeout");
}
if (!/retention-days:\s*14/u.test(releaseWorkflow)) {
  failures.push("Debug validation artifact retention must remain limited to 14 days");
}
if (!/validation_scope=debug-package-inspection-only/u.test(releaseWorkflow) || !/apk_sha256=/u.test(releaseWorkflow)) {
  failures.push("Validation evidence must identify its debug-only scope and record the APK SHA-256");
}
if (/\b(?:assembleRelease|bundleRelease|signingConfig|apksigner\s+sign|jarsigner|publish.*(?:play|store)|upload.*(?:play|store|rustore))\b/iu.test(releaseWorkflow)) {
  failures.push("Gate 2 workflow must not sign, publish or submit a production package");
}
if (!/versionName=\x270\\\.1\\\.0\x27/u.test(releaseWorkflow) || !/manifest_permissions=none/u.test(releaseWorkflow) || !/required_offline_assets=present/u.test(releaseWorkflow)) {
  failures.push("Debug package evidence must assert version identity, zero permissions and bundled offline assets");
}
if (failures.length) {
  for (const failure of failures) console.error("FAIL: " + failure);
  process.exitCode = 1;
} else {
  console.log("Android build-boundary audit passed: routine CI remains web/content-only; final Android validation is manual, explicitly gated by feature_scope_complete=true, and retains a safe no-build path.");
  console.log("Scope: static workflow configuration audit only; no Android toolchain, Gradle task or APK was executed.");
}
