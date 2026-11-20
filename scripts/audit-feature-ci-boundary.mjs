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
if (!/Inspect APK identity, permissions and bundled offline assets[\s\S]*?aapt dump badging[\s\S]*?aapt dump permissions[\s\S]*?unzip -Z1[\s\S]*?sha256sum/u.test(releaseWorkflow)) {
  failures.push("The final validation workflow must inspect APK metadata, permissions, bundled offline assets and SHA-256 after assembly");
}
for (const required of ["package_id=app.mindquest", "version_code=1", "version_name=0.1.0", "versionCode='1'", "assets/index.html", "assets/styles.css", "assets/src/app.js", "assets/src/data/questions.js", "mindquest-gate2-debug-validation"]) {
  if (!releaseWorkflow.includes(required)) failures.push("Final Android package inspection is missing required assertion: " + required);
}
if (failures.length) {
  for (const failure of failures) console.error("FAIL: " + failure);
  process.exitCode = 1;
} else {
  console.log("Android build-boundary audit passed: routine CI remains web/content-only; final Android validation is manual, explicitly gated by feature_scope_complete=true, and retains a safe no-build path.");
  console.log("Scope: static workflow configuration audit only; no Android toolchain, Gradle task or APK was executed.");
}
