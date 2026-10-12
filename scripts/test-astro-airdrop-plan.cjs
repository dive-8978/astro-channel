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
const policy=JSON.parse(fs.readFileSync(path.join(root,'public/data/astro-airdrop-policy.json'),'utf8'));
assert.equal(policy.mode,'planning');
for(const key of ['registrationEnabled','claimsEnabled','addressCollectionEnabled']) assert.equal(policy[key],false);
assert.equal(policy.mainnetDeployment,null);
assert.equal(policy.allowBothProgramsAfterVerification,true);
assert.deepEqual(policy.deduplicationKey,['campaignId','beneficiary']);
assert.notEqual(policy.registration.campaignId,policy.holders.campaignId);
assert.equal(policy.registration.proposedBudgetASTRO,String(total));
assert.equal(policy.registration.targetSlots,String(count));
assert.deepEqual(policy.registration.tiers.map(t=>({from:t.from,to:t.to,amount:Number(t.amountASTRO)})),tiers);
assert.equal(policy.registration.lockYears,1);
assert.equal(policy.registration.lockStartsAt,'successful-funded-onchain-lock');
assert.equal(policy.registration.exactYearConvention,null);
assert.equal(policy.holders.sourceChainId,56);
assert.equal(policy.holders.plannedContinuousHoldingMonths,6);
assert.equal(policy.holders.issuanceVerified,false);
assert.equal(policy.holders.usesRegistrationBudget,false);
assert.equal(policy.holders.singleSnapshotProvesContinuity,false);
for(const key of ['officialTokenContract','minimumHoldingUnits','holdingStartPolicy','exactMonthConvention','rewardRatio','proposedBudgetASTRO','rewardLockPolicy','distributionSchedule']) assert.equal(policy.holders[key],null,key);
assert.equal(policy.collector.mode,'disabled-preview');
assert.equal(policy.collector.persistentStorageConfigured,false);
assert.equal(policy.collector.sharedVerificationPipeline,true);
assert.match(html,/<fieldset disabled aria-describedby="collector-status">/);
assert.match(html,/id="bnb-source"/);assert.match(html,/id="astro-recipient"/);
assert.ok(!/bnb-source|astro-recipient/.test(js),'No address input may be read by this planning-page script');
assert.match(html,/Neither MA nor ASTRO has been issued/);
assert.match(html,/not included in the registration budget/);
const meme=fs.readFileSync(path.join(root,'public/memeastro.html'),'utf8');
assert.match(meme,/six full, consecutive months/);
assert.match(meme,/Neither token has been issued/);
assert.match(meme,/once per program/);
assert.match(meme,/Buying MA is not required/);
assert.match(meme,/astro-airdrop\.html\?lang=en#registration/);
assert.ok(!/ONLY PASSPORT|automatically airdropped|1:1|2:1|HISTORICAL AIRDROP PROPOSAL/.test(meme));
assert.ok(!html.includes('chain-network-1280.webp'),'Do not reuse the old network artwork on the airdrop page');
for(const [file,limit] of [['dual-paths-1280.jpg',400000],['dual-paths-640.jpg',120000]]) {
 const image=path.join(root,'public/assets/airdrop-20261012',file);
 assert.ok(fs.statSync(image).size<limit,'Airdrop image budget: '+file);
 assert.ok(html.includes('/assets/airdrop-20261012/'+file));
}
console.log('PASS ASTRO dual plan: exact registration budget; separate holder pool and campaign IDs; 7 complete languages; hamburger entry; disabled address/claim controls; no collection/signing/transaction code; token issuance unclaimed.');
