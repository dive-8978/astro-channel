const fs=require('fs'),assert=require('assert/strict'),vm=require('vm'),crypto=require('crypto');
const read=p=>fs.readFileSync(p,'utf8');
const policy=JSON.parse(read('public/data/ma-program-policy.json'));
assert.equal(policy.burn.days1To364MA*364+policy.burn.day365MA,50000000);
assert.equal(policy.motherFund.allocationMA/policy.initialSupplyReferenceMA*100,2);
// The fund allocation, separate reserve and profit split must not drift apart.
assert.equal(policy.motherFund.allocationMA,20000000);
assert.equal(policy.motherFund.initialSupplyPercent,2);
assert.equal(policy.motherFund.matchingBurn.allocationMA,20000000);
assert.equal(policy.motherFund.matchingBurn.source,'separate-company-reserve');
assert.equal(policy.motherFund.matchingBurn.separateFromDailyBurn,true);
assert.equal(policy.annualBuyback.totalProfitPercent,4);
assert.equal(policy.annualBuyback.fundProfitPercent,2);
assert.equal(policy.annualBuyback.burnProfitPercent,2);
assert.equal(policy.annualBuyback.nonPositiveProfitAllocation,0);
assert.equal(policy.motherFund.publicWallet,null);
let apiHandler;vm.runInNewContext(read('api/ma-program-state.js').replace('export default function handler','function handler')+'; apiHandler=handler;', {set apiHandler(v){apiHandler=v;}});
let response;apiHandler({method:'GET'},{setHeader(){},status(code){assert.equal(code,200);return this;},json(body){response=body;}});
assert.equal(Number(response.motherFund.plannedAllocationMA),policy.motherFund.allocationMA);
assert.equal(Number(response.motherFund.initialSupplySharePercent),policy.motherFund.initialSupplyPercent);
assert.equal(response.mode,'planning');assert.equal(response.verified,false);assert.equal(response.motherFund.disbursementsEnabled,false);
const cards=read('public/assets/ma-programs/cards.js');
const rates=JSON.parse(cards.match(/var PROPOSED_REFERENCE_SCHEDULE = Object.freeze\((\{[\s\S]*?\})\);/)[1]);
assert.deepEqual(rates,policy.redemption.referenceMA);
const old=[10,25,60,150,400,1000,2500,10000,50000];
Object.values(rates).forEach((rate,i)=>assert.equal(rate,Math.floor(old[i]*700/30)/100));
for(const file of ['ma-card-redemption.html','ma-mother-love.html','ma-burn.html']){
 const html=read('public/'+file);assert(!/30,000,000|100,000,000|273,972/.test(html));assert(html.includes('Planned'));
 for(const match of html.matchAll(/(?:src|href)="([^"#?]+)(?:[?#][^"]*)?"/g))if(!/^(https?:|mailto:)/.test(match[1]))assert(fs.existsSync('public/'+match[1])||fs.existsSync(match[1]),match[1]);
}
const table=read('public/ma-card-redemption.html');
for(const [tier,rate]of Object.entries(rates))assert(table.includes(`<span class="rarity">${tier}</span></td><td>${rate.toLocaleString('en-US',{minimumFractionDigits:2})} MA`));
const pro=read('public/assets/professional.js');
const fields=vm.runInNewContext(pro.match(/const fields = (\[[\s\S]*?\]);/)[1]);
const translations=vm.runInNewContext('('+pro.match(/const translations = (\{[\s\S]*?\n  \});/)[1]+')');
assert.equal(Object.keys(translations).length,6);
Object.entries(translations).forEach(([lang,values])=>assert.equal(values.length,fields.length,lang));
for(const key of fields)assert(read('public/professional.html').includes(`data-p="${key}"`),key);
assert(read('public/news/official-updates.js').includes('window.ASTRO_PROGRAM_UPDATES'));
const sandbox={window:{}};vm.runInNewContext(read('public/assets/professional-content.js'),sandbox);
const content=sandbox.window.ASTRO_PROFESSIONAL_CONTENT;
assert.equal(Object.keys(content).length,7);
for(const [lang,copy]of Object.entries(content)){
  for(const [key,value]of Object.entries(content.en)){
    assert.equal(typeof copy[key],'string',`${lang}:${key}`);assert(copy[key].length>0);
    assert(read('public/professional.html').includes(`data-p="${key}"`),key);
  }
}
assert(content.en.boundBody.includes('cannot cancel'));
assert(content.en.techScope.includes('roadmap'));
assert(content.en.impactStatus.includes('No completed aid cases'));
assert(!read('public/professional.html').includes('data-p="f3"'), 'Official MA marketing must omit Full-only reader card');
for(const copy of Object.values(content)) assert(!('f3' in copy) && !('f3b' in copy));
for(const lang of ['en','zh','es','fr','de','ja','ko']){
  const nodes=['label','title','tagline','body'].map(key=>({dataset:{maVision:key},textContent:''}));
  const root={lang},section={};let callback;
  const document={documentElement:root,querySelector:()=>({}),querySelectorAll:selector=>selector==='[data-ma-vision]'?nodes:[section]};
  vm.runInNewContext(read('public/assets/ma-vision.js'),{document,location:{search:''},URLSearchParams,MutationObserver:class {constructor(fn){callback=fn;}observe(){}}});
  assert(nodes.every(n=>n.textContent.length>0));assert.equal(section.lang,lang);
  if(lang==='zh')assert.equal(nodes[1].textContent,'让数字货币成为全球通用货币。');
  root.lang='en';callback();assert.equal(nodes[0].textContent,'OUR VISION');
  assert.equal(nodes[1].textContent,'Make digital currency a universal currency.');
}
for(const file of ['index.html','public/professional.html'])assert(read(file).includes('data-ma-vision="label">OUR VISION'));
// Company evidence stays accessible through secondary navigation.
for(const page of ['company.html','trust.html'])assert(read('index.html').includes(`href="${page}"`));
const certificatePath='public/company-documents/astrobridge-certificate-of-incorporation-2026-09-14.pdf';
const certificateHash=crypto.createHash('sha256').update(fs.readFileSync(certificatePath)).digest('hex');
assert.equal(certificateHash,'50d3f6c714b862706de19aaf35af19f229ca8e142f18ea86094c2f56e8948ee7');
for(const file of ['public/company.html','public/trust.html'])assert(read(file).includes(certificatePath.replace('public','')));
assert(read('public/company.html').includes(certificateHash));
assert(read('public/company.html').includes('Business Registration Number (BRN)'));
assert(!read('public/company.html').includes('Certificate No. / 证书编号'));
const signatureRecordPath='/company-documents/astrobridge-ci-signature-verification-2026-09-27.html';
for(const file of ['public/company.html','public/trust.html'])assert(read(file).includes(signatureRecordPath));
assert(read('public/trust.html').includes('Government-issued certificate / 政府签发证书'));
const signatureRecord=read('public'+signatureRecordPath);
assert(read('public/sitemap.xml').includes(signatureRecordPath));
assert(signatureRecord.includes(certificateHash));
assert(signatureRecord.includes('CMS Verification successful'));
assert(signatureRecord.includes('-noverify'));
assert(signatureRecord.includes('did not validate a complete trust chain'));
assert(signatureRecord.includes('does not establish current company-register or business-registration status'));
console.log('PASS MA policy, seven-language coverage, public news data, and company certificate integrity');
