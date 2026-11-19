import { readFile } from "node:fs/promises";

const manifest = await readFile("android/app/src/main/AndroidManifest.xml", "utf8");
const failures = [];
if (!/<application\\b[^>]*android:allowBackup="false"/su.test(manifest)) failures.push("Android backup must remain disabled");
if (!/<application\\b[^>]*android:usesCleartextTraffic="false"/su.test(manifest)) failures.push("Cleartext traffic must remain disabled");
if (!/<application\\b[^>]*android:supportsRtl="true"/su.test(manifest)) failures.push("RTL support must remain enabled");
const activities = [...manifest.matchAll(/<activity\\b([^>]*)>([\\s\\S]*?)<\\/activity>/gu)];
if (activities.length !== 1) failures.push("Exactly one declared activity is expected");
if (activities.length === 1) {
  const [_, attributes, body] = activities[0];
  if (!/android:exported="true"/u.test(attributes)) failures.push("Launcher activity must declare exported=true");
  if (!/android:name="\\.MainActivity"/u.test(attributes)) failures.push("Unexpected launcher activity declaration");
  if (!/<action android:name="android\\.intent\\.action\\.MAIN"\\s*\\/>/u.test(body) ||
      !/<category android:name="android\\.intent\\.category\\.LAUNCHER"\\s*\\/>/u.test(body)) {
    failures.push("Main launcher intent filter is missing");
  }
}
if (/<uses-permission\\b/u.test(manifest)) failures.push("Manifest permissions require explicit product/security review");
if (/<application\\b[^>]*android:debuggable="true"/su.test(manifest)) failures.push("Debuggable application must not be enabled in the committed manifest");
if (failures.length) {
  for (const failure of failures) console.error("FAIL: " + failure);
  process.exitCode = 1;
} else {
  console.log("Android manifest audit passed: backup disabled, cleartext disabled, RTL enabled, one explicit launcher activity, no declared permissions and no debuggable flag.");
}
