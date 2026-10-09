const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const home = read("index.html");
const page = read("public/ma-support.html");
const css = read("public/assets/ma-support.css");
const record = JSON.parse(read("public/data/ma-support-channels.json"));
assert.match(home, /X \/ Twitter<\/a>\s*<a href="\/ma-support\.html">MA \/ Astro Chat<\/a>/);
assert.match(page, /<html lang="en">/);
assert.match(page, /Official support is being prepared/);
assert.match(page, /not a web chat or a live customer-service session/);
assert.equal((page.match(/class="badge">Preparing/g) || []).length, 2);
assert.match(page, /display name alone does not establish an official identity/);
assert.match(page, /chat identity is separate from a funds-wallet address/);
assert.match(page, /Never share your recovery phrase, private keys, passwords or verification codes/);
assert.doesNotMatch(page, /<form\b|<input\b|<textarea\b|<script\b|mailto:|0x[a-fA-F0-9]{40}|(?:ma|astrochat):\/\//);
assert.equal(record.status, "preparing");
assert.equal(record.liveWebChatEnabled, false);
assert.equal(record.supportEmail, null);
assert.equal(record.supportEmailVerified, false);
assert.equal(record.accounts.length, 2);
for (const account of record.accounts) {
  assert.equal(account.status, "preparing");
  assert.equal(account.chatId, null);
  assert.equal(account.qrCodeUrl, null);
  assert.equal(account.contactVerified, false);
  assert.ok(page.includes('data-account-role="' + account.role + '"'));
  assert.ok(page.includes(account.plannedDisplayName));
}
assert.equal(record.accounts.find(account => account.role === "support").responseHours, null);
assert.match(read("public/sitemap.xml"), /https:\/\/www\.astrochannel\.one\/ma-support\.html/);
assert.match(css, /font: 18px\/1\.75/);
assert.match(css, /@media \(max-width: 640px\)/);
assert.match(css, /\.account-grid \{ grid-template-columns: 1fr; \}/);
assert.doesNotMatch(css, /overflow-x:\s*hidden/);
for (const match of page.matchAll(/(?:href|src)="(\/[^"]+)"/g)) {
  const file = match[1].split(/[?#]/)[0];
  if (file === "/") continue;
  assert.ok(fs.existsSync(path.join(root, "public", file)), "Local destination exists: " + file);
}
console.log("PASS MA official/support directory: footer entry, pending identities, no live contact or data collection, local links and responsive readable layout.");
