const fs=require('fs'),assert=require('assert/strict'),vm=require('vm');
const read=p=>fs.readFileSync(p,'utf8');
const policy=JSON.parse(read('public/data/ma-program-policy.json'));
assert.equal(policy.burn.days1To364MA*364+policy.burn.day365MA,50000000);
assert.equal(policy.motherFund.allocationMA/policy.initialSupplyReferenceMA*100,1);
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
assert.equal(read('news/official-updates.js'),read('public/news/official-updates.js'));
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
console.log('PASS MA allocation arithmetic, scaled rarity references, page links, seven-language coverage and news mirrors');
