const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const source = fs.readFileSync('public/assets/ma-programs/mother-fund.js', 'utf8');
const sandbox = {window: {addEventListener(){}}, document: {readyState:'loading',addEventListener(){}}, Date};
vm.runInNewContext(source.replace(/\}\)\(\);\s*$/, 'window.verifyParticipant = authorizedParticipant;})();'), sandbox);
const valid = {status:'confirmed',name:'LOCAL TEST',role:'Joint statement only',namePermission:true,approvedAt:'2026-10-01',permissionExpiresAt:'2099-01-01',document:{kind:'joint-statement',verified:true,publicationPermission:true,url:'/fund-records/local-test.pdf',sha256:'a'.repeat(64)}};
assert(sandbox.window.verifyParticipant(valid));
for (const change of [{status:'invited'},{namePermission:false},{permissionExpiresAt:'2020-01-01'},{document:{...valid.document,publicationPermission:false}},{document:{...valid.document,url:'javascript:alert(1)'}},{document:{...valid.document,url:'/fund-records/../secret.pdf'}},{document:{...valid.document,sha256:'missing'}}]) assert(!sandbox.window.verifyParticipant({...valid,...change}));
const data = JSON.parse(fs.readFileSync('public/data/ma-fund-supporters.json','utf8'));
assert.equal(data.schemaVersion,2);
for (const person of data.participants) {
 if (person.status !== 'confirmed') continue;
 assert(sandbox.window.verifyParticipant(person),'Invalid/expired permission: '+person.name);
 const file = path.join('public', person.document.url);
 assert(fs.existsSync(file),'Missing signed document: '+file);
 assert.equal(crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex'),person.document.sha256,'Document digest mismatch');
 if (person.logoPermission === true) {
  assert(/^\/assets\/[a-zA-Z0-9_./-]+\.(png|webp|jpg|svg)$/.test(person.logo||'') && !person.logo.includes('..'));
  assert(fs.existsSync(path.join('public',person.logo)));
 }
}
console.log('PASS: unsigned/unapproved/expired/unsafe entries excluded; published document hashes checked.');
