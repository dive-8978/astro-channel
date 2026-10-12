'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname,'..');
const html = fs.readFileSync(path.join(root,'public/astro-airdrop.html'),'utf8');
const jsPath = path.join(root,'public/assets/astro-airdrop.js');
const js = fs.readFileSync(jsPath,'utf8');
const {tiers,allocationAt,translations} = require(jsPath);
let total = 0, count = 0, end = 0;
for (const tier of tiers) {
  assert.equal(tier.from,end+1); end=tier.to;
  count += tier.to-tier.from+1; total += (tier.to-tier.from+1)*tier.amount;
  assert.equal(allocationAt(tier.from),tier.amount);
  assert.equal(allocationAt(tier.to),tier.amount);
}
assert.equal(count,100000000); assert.equal(total,1000000000);
for (const input of [-1,0,1.1,NaN,Infinity,100000001,'1']) assert.equal(allocationAt(input),null);
const keys = new Set([...html.matchAll(/data-t="([^"]+)"/g)].map(x=>x[1]).concat(['result','invalid']));
for (const [language,copy] of Object.entries(translations)) {
  for (const key of keys) assert.equal(typeof copy[key],'string',`${language}: missing ${key}`);
  assert.match(copy.result,/\{amount\}/);
  assert.ok(copy.banner.length>15 && copy.bottomBody.length>30);
}
assert.equal(Object.keys(translations).length,6);
assert.equal((html.match(/<option value=/g)||[]).length,7);
assert.match(html,/<button type="button" disabled aria-describedby="claim-note"/);
assert.match(html,/PLAN ONLY/); assert.match(html,/final-note/);
assert.match(html,/Registration and claiming are not open\./);
assert.ok(!/<form\b|type="submit"|name="address"|ethereum:|walletconnect:/i.test(html));
assert.ok(!/\bfetch\s*\(|XMLHttpRequest|eth_requestAccounts|personal_sign|eth_sendTransaction|\/api\/wallet\/airdrop|0x[0-9a-f]{40}/i.test(js));
assert.ok(!/innerHTML/.test(js));
for(const [name,slots,amount] of [['1–1,000',1000,10000000],['1,001–100,000',99000,99000000],['100,001–1,000,000',900000,450000000],['1,000,001–46,000,000',45000000,225000000],['46,000,001–100,000,000',54000000,216000000]]) {
  assert.ok(html.includes(name)); assert.ok(html.includes(slots.toLocaleString('en'))); assert.ok(html.includes(amount.toLocaleString('en')));
}
for(const match of html.matchAll(/(?:src|href)="(\/(?:assets|vendor)\/[^"?]+)[^"]*"/g)) assert.ok(fs.existsSync(path.join(root,'public',match[1])),match[1]);
const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
const menu=home.match(/<div class="nav-menu hidden" id="navMenu">([\s\S]*?)<\/div>/)[1];
assert.match(menu,/href="\/astro-airdrop.html\?lang=en" data-airdrop-entry/);
const entry=fs.readFileSync(path.join(root,'public/assets/astro-airdrop-entry.js'),'utf8');
for(const lang of ['en','zh','es','fr','de','ja','ko']) assert.ok(entry.includes(lang+':'));
assert.match(home,/astro-airdrop-entry\.js/);
console.log('PASS ASTRO plan: exact budget and tier boundaries; 7 complete languages; hamburger entry; permanently disabled claim; no collection/signing/transaction code; local assets.');
