const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'public/professional.html'), 'utf8');
const code = fs.readFileSync(path.join(root, 'public/assets/professional-horizons.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'public/assets/professional-horizons.css'), 'utf8');
const baseline = execFileSync('git', ['show', 'HEAD:public/professional.html'], { cwd: root, encoding: 'utf8' });
let position = 0;
for (const line of baseline.trimEnd().split('\n')) {
  const found = html.indexOf(line, position);
  assert.ok(found >= position, `Existing content changed or removed: ${line.slice(0, 90)}`);
  position = found + line.length;
}
const entries = [...html.matchAll(/<([a-z0-9]+)\b[^>]*data-horizon="([^"]+)"[^>]*>([\s\S]*?)<\/\1>/g)];
assert.equal(entries.length, 47);
assert.equal(new Set(entries.map(entry => entry[2])).size, 47);
const nodes = entries.map(entry => ({ dataset: { horizon: entry[2] }, textContent: entry[3].replace(/<[^>]*>/g, '').replace(/&amp;/g, '&') }));
const english = nodes.map(node => node.textContent);
let listener;
let mutation;
const document = {
  documentElement: { lang: 'en' },
  querySelectorAll: () => nodes,
  querySelector: () => ({ addEventListener: (event, callback) => { assert.equal(event, 'change'); listener = callback; } })
};
const context = { document, MutationObserver: class { constructor(callback) { mutation = callback; } observe() {} } };
vm.runInNewContext(code, context);
for (const language of ['zh', 'es', 'fr', 'de', 'ja', 'ko']) {
  document.documentElement.lang = language;
  listener();
  for (const [index, node] of nodes.entries()) {
    assert.ok(node.textContent.length > 2, `${language}: empty ${node.dataset.horizon}`);
    assert.notEqual(node.textContent, english[index], `${language}: English fallback for ${node.dataset.horizon}`);
    assert.ok(!/undefined|<script|\[object/.test(node.textContent));
  }
}
document.documentElement.lang = 'zh-Hans';
mutation();
assert.match(nodes[0].textContent, /2026 年 1 月/);
document.documentElement.lang = 'invalid';
mutation();
assert.equal(nodes[0].textContent, english[0]);
assert.match(nodes.find(node => node.dataset.horizon === 'networkTitle').textContent, /\n/);
vm.runInNewContext(code, { document: { ...document, querySelector: () => null } });
const additions = [...html.matchAll(/<section\b[^>]*class="pro-[^"]+"[\s\S]*?<\/section>/g)].map(entry => entry[0]).join('\n');
for (const [, href] of additions.matchAll(/href="([^"]+)"/g)) {
  if (href.startsWith('#')) assert.ok(html.includes(`id="${href.slice(1)}"`));
  else assert.ok(fs.existsSync(path.join(root, 'public', href)), `Missing destination ${href}`);
}
for (const [, source] of additions.matchAll(/src="([^"]+)"/g)) {
  assert.ok(fs.existsSync(path.join(root, 'public', source)), `Missing image ${source}`);
}
const directory = path.join(root, 'public/assets/horizons-20261015');
const files = fs.readdirSync(directory);
assert.equal(files.length, 4);
let total = 0;
for (const file of files) {
  assert.match(file, /\.webp$/);
  const bytes = fs.readFileSync(path.join(directory, file));
  assert.equal(bytes.toString('ascii', 0, 4), 'RIFF');
  assert.equal(bytes.toString('ascii', 8, 12), 'WEBP');
  assert.ok(bytes.length < 500000, `${file} exceeds image budget`);
  total += bytes.length;
}
assert.ok(total < 900000, 'All responsive variants exceed 900 KB');
assert.match(css, /prefers-reduced-motion/);
assert.match(css, /:focus-visible/);
assert.match(additions, /datetime="2026-01"/);
assert.match(additions, /datetime="2026-10-12"/);
assert.match(additions, /not a production-mainnet/);
assert.match(additions, /not a mainnet launch date/);
assert.doesNotMatch(additions + code, /\/Users\/|\/opt\/|45\.76\.|38\.60\.|130\.94\.|R45|100 亿|100 billion/);
assert.doesNotMatch(code, /innerHTML|fetch\(|setInterval\(|localStorage|eval\(/);
assert.equal((html.match(/<h1\b/g) || []).length, 1);
console.log('PASS: original HTML retained in order; 47 fields in 7 languages; switching/fallback/no-observer; destinations/assets; image budgets; dated claims; private-data and accessibility checks.');
