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
assert.equal(page.elements.length, 84);
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
assert.ok(html.includes('window.MA_PAGE_I18N.message("preparing")'));
assert.ok(html.includes('window.MA_PAGE_I18N.message("downloadError")'));
assert.ok(!html.includes('addEventListener("click", () => document.body.classList.toggle("zh"))'));
console.log('PASS: 84 content elements across 7 languages; metadata, labels, download messages, persistence, query precedence and blocked storage.');
