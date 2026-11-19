import { readFile } from "node:fs/promises";

const manifest = await readFile("android/app/src/main/AndroidManifest.xml", "utf8");
const failures = [];
const applicationMatches = [...manifest.matchAll(/<application\b([^>]*)>([\s\S]*?)<\/application>/gu)];
if (applicationMatches.length !== 1) failures.push("Manifest must contain exactly one application element");
if (!/<manifest\b[^>]*xmlns:android="http:\/\/schemas\.android\.com\/apk\/res\/android"/su.test(manifest)) failures.push("Android XML namespace is missing");
if (!/<application\b[^>]*android:allowBackup="false"/su.test(manifest)) failures.push("Android backup must remain disabled");
if (!/<application\b[^>]*android:usesCleartextTraffic="false"/su.test(manifest)) failures.push("Cleartext traffic must remain disabled");
if (!/<application\b[^>]*android:supportsRtl="true"/su.test(manifest)) failures.push("RTL support must remain enabled");
if (!/<application\b[^>]*android:enableOnBackInvokedCallback="true"/su.test(manifest)) failures.push("Predictive back callback support must remain enabled");
if (!/<application\b[^>]*android:label="MindQuest"/su.test(manifest)) failures.push("Application label must remain MindQuest");
const activities = [...manifest.matchAll(/<activity\b([^>]*)>([\s\S]*?)<\/activity>/gu)];
if (activities.length !== 1) failures.push("Exactly one declared activity is expected");
if (activities.length === 1) {
  const [_, attributes, body] = activities[0];
  if (!/android:exported="true"/u.test(attributes)) failures.push("Launcher activity must declare exported=true");
  if (!/android:name="\.MainActivity"/u.test(attributes)) failures.push("Unexpected launcher activity declaration");
  if (!/android:configChanges="orientation\|screenSize\|keyboardHidden"/u.test(attributes)) failures.push("Expected configuration-change handling is missing");
  if (!/android:windowSoftInputMode="adjustResize"/u.test(attributes)) failures.push("Soft keyboard must resize the application viewport");
  if (!/<action android:name="android\.intent\.action\.MAIN"\s*\/>/u.test(body) ||
      !/<category android:name="android\.intent\.category\.LAUNCHER"\s*\/>/u.test(body)) {
    failures.push("Main launcher intent filter is missing");
  }
  if (/android:permission=/u.test(attributes)) failures.push("Launcher activity must not gain an unreviewed permission gate");
}
if (/<uses-permission\b/u.test(manifest)) failures.push("Manifest permissions require explicit product/security review");
if (/<(service|receiver|provider)\b/u.test(manifest)) failures.push("Unexpected Android component requires explicit product/security review");
if (/<application\b[^>]*android:debuggable="true"/su.test(manifest)) failures.push("Debuggable application must not be enabled in the committed manifest");
if (/<application\b[^>]*android:usesCleartextTraffic="true"/su.test(manifest)) failures.push("Cleartext traffic must not be enabled");
if (failures.length) {
  for (const failure of failures) console.error("FAIL: " + failure);
  process.exitCode = 1;
} else {
  console.log("Android manifest audit passed: namespace/application structure, backup and cleartext protections, RTL and predictive-back flags, explicit launcher/configuration/keyboard behaviour, no permissions or additional components, and no debuggable flag.");
}
