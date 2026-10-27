const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'public/painpoints.html'), 'utf8');
const code = fs.readFileSync(path.join(root, 'public/painpoints-i18n.js'), 'utf8');
const languages = ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko'];
// Capture balanced language elements, including headings with nested spans.
function sources() {
  const result = [];
  const opening = /<(span|p)\b[^>]*data-lang="en"[^>]*>/g;
  let match;
  while ((match = opening.exec(html))) {
    const tags = new RegExp(`<\\/?${match[1]}\\b[^>]*>`, 'g');
    tags.lastIndex = opening.lastIndex;
    let depth = 1;
    let tag;
    while ((tag = tags.exec(html))) {
      depth += tag[0].startsWith('</') ? -1 : 1;
      if (!depth) break;
    }
    assert.ok(tag, 'unclosed language element');
    const innerHTML = html.slice(opening.lastIndex, tag.index);
    result.push({ innerHTML, textContent: innerHTML.replace(/<[^>]*>/g, '').replace(/&amp;/g, '&') });
    opening.lastIndex = tags.lastIndex;
  }
  return result;
}
function boot(search = '', saved, blocked = false) {
  const elements = sources();
  const originals = elements.map(element => element.innerHTML);
  const nodes = new Map();
  const get = key => {
    if (!nodes.has(key)) nodes.set(key, { attributes: {}, setAttribute(name, value) { this.attributes[name] = value; } });
    return nodes.get(key);
  };
  const selector = get('#lang');
  selector.addEventListener = (event, listener) => { selector[event] = listener; };
  const stored = new Map(saved === undefined ? [] : [['ma-page-language', saved]]);
  const classes = new Set();
  const document = {
    documentElement: {},
    body: { classList: { toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); } } },
    querySelectorAll(selector) { assert.equal(selector, '[data-lang="en"]'); return elements; },
    getElementById(id) { assert.equal(id, 'lang'); return selector; },
    querySelector: get
  };
  const context = { document, window: {}, location: { search }, URLSearchParams,
    localStorage: {
      getItem(key) { if (blocked) throw new Error('blocked'); return stored.get(key); },
      setItem(key, value) { if (blocked) throw new Error('blocked'); stored.set(key, value); }
    }
  };
  vm.runInNewContext(code, context);
  return { context, elements, originals, nodes, selector, classes, stored };
}
const page = boot();
assert.ok(page.elements.length >= 70, 'Cover all substantial homepage copy');
assert.deepEqual(Array.from(page.context.window.MA_PAGE_I18N.languages), languages);
for (const language of languages) {
  page.selector.value = language;
  page.selector.change();
  assert.equal(page.context.document.documentElement.lang, language === 'zh' ? 'zh-Hans' : language);
  assert.equal(page.classes.has('zh'), language === 'zh');
  assert.equal(page.stored.get('ma-page-language'), language);
  assert.ok(page.context.window.MA_PAGE_I18N.message('preparing'));
  assert.ok(page.context.window.MA_PAGE_I18N.message('downloadError'));
  assert.ok(page.context.document.title);
  assert.ok(page.nodes.get('meta[name="description"]').content);
  for (let i = 0; i < page.elements.length; i += 1) {
    const translated = page.elements[i].innerHTML;
    assert.equal(typeof translated, 'string', `${language}: missing translation ${i}`);
    assert.ok(translated.trim(), `${language}: empty translation ${i}`);
    assert.ok(!/<(?!\/?span\b|br\b)/i.test(translated), 'only static formatting tags allowed');
    if (language === 'en' || language === 'zh') assert.equal(translated, page.originals[i]);
  }
}
assert.equal(boot('?lang=ja', 'fr').selector.value, 'ja');
assert.equal(boot('', 'ko').selector.value, 'ko');
assert.equal(boot('?lang=xx', 'de').selector.value, 'de');
assert.equal(boot('', 'invalid').selector.value, 'en');
assert.equal(boot('?lang=%3Cscript%3E', undefined, true).selector.value, 'en');
for (const language of languages) assert.ok(html.includes(`<option value="${language}">`));
// The public homepage now sends visitors to the two current store listings.
// No stale service-worker download, test build or developer-only AAB links.
for (const packageName of ['com.astrobridge.ma', 'com.astrobridge.ma.full']) {
  assert.ok(html.includes(`https://play.google.com/store/apps/details?id=${packageName}"`));
}
assert.equal((html.match(/data-edition="/g) || []).length, 2);
assert.match(html, /1\.6\.91 \(116\)/);
assert.match(html, /MA Square · Beta/);
assert.match(html, /Card redemption is not active/);
assert.match(html, /iOS · Release pending/);
assert.match(html, /Chat history is stored locally\. Online delivery/);
assert.doesNotMatch(html + code, /1\.5\.1|MA Website|MA Social|Store-safe|multipart-download|ma-download-sw/);
assert.doesNotMatch(html, /href="[^"]+\.(?:aab|ipa)(?:["?])/);
assert.ok(html.includes('ma-support.html'));
assert.ok(html.includes('ma-policies.html'));
assert.ok(!html.includes('addEventListener("click", () => document.body.classList.toggle("zh"))'));
console.log(`PASS: ${page.elements.length} content elements across 7 languages; metadata, labels, persistence, query precedence, blocked storage, two store editions and release boundaries.`);
