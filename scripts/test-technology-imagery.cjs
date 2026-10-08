const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const code = fs.readFileSync(path.join(root, 'public/assets/technology-imagery.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'public/assets/technology-imagery.css'), 'utf8');
function boot({ cached = true, width = 1280, lazy = false, reduce = false,
  observer = true, brokenObserver = false, decodeReject = false, lang = 'en' } = {}) {
  const classes = new Set();
  const parentClasses = new Set();
  const handlers = {};
  const caption = {};
  let intersection;
  let mutation;
  const image = { complete: cached, naturalWidth: width, loading: lazy ? 'lazy' : 'eager',
    decode: async () => { if (decodeReject) throw Error('decode unsupported'); },
    addEventListener(name, callback) { handlers[name] = callback; } };
  const frame = { classList: { add: name => classes.add(name) },
    parentElement: { classList: { add: name => parentClasses.add(name) } },
    querySelector: () => image };
  const document = { documentElement: { lang }, querySelectorAll: selector =>
    selector === '.tech-visual' ? [frame] : [caption] };
  const context = { document, window: { matchMedia: () => ({ matches: reduce }) },
    MutationObserver: class { constructor(cb) { mutation = cb; } observe() {} } };
  if (observer) context.IntersectionObserver = class {
    constructor(cb) { if (brokenObserver) throw Error('unavailable'); intersection = cb; }
    observe() {} disconnect() {}
  };
  vm.runInNewContext(code, context);
  return { classes, parentClasses, handlers, caption, document,
    enter: () => intersection([{ isIntersecting: true }]), mutate: () => mutation() };
}
async function test() {
  const tick = () => new Promise(resolve => setImmediate(resolve));
  let state = boot(); await tick(); assert.ok(state.classes.has('is-ready'));
  state = boot({ cached: false }); await state.handlers.load();
  assert.ok(state.classes.has('is-ready'));
  state = boot({ lazy: true }); await tick();
  assert.ok(!state.classes.has('is-ready')); state.enter();
  assert.ok(state.classes.has('is-ready'));
  state = boot({ cached: false, lazy: true }); state.enter();
  await state.handlers.load(); assert.ok(state.classes.has('is-ready'));
  for (const options of [{ lazy: true, observer: false }, { lazy: true, brokenObserver: true },
    { lazy: true, reduce: true }, { decodeReject: true }]) {
    state = boot(options); await tick(); assert.ok(state.classes.has('is-ready'));
  }
  state = boot({ width: 0 }); await tick();
  assert.ok(state.classes.has('image-failed'));
  assert.ok(state.parentClasses.has('image-failed'));
  state = boot({ cached: false }); state.handlers.error();
  await state.handlers.load(); assert.ok(!state.classes.has('is-ready'));
  for (const lang of ['en', 'zh', 'es', 'fr', 'de', 'ja', 'ko']) {
    state = boot({ lang }); assert.ok(state.caption.textContent.length > 10);
  }
  state = boot(); state.document.documentElement.lang = 'zh-Hans'; state.mutate();
  assert.match(state.caption.textContent, /概念配图/);
  assert.match(css, /prefers-reduced-motion: reduce/);
  assert.match(css, /animation: none/);
  assert.ok(!css.includes('is-pending'), 'Default rendering must not depend on JS');
  for (const page of ['professional', 'astro-chain', 'technology', 'painpoints']) {
    const html = fs.readFileSync(path.join(root, 'public', page + '.html'), 'utf8');
    assert.match(html, /technology-imagery\.js/); assert.match(html, /technology-imagery\.css/);
    const images = [...html.matchAll(/<img\b[^>]*technology-20261009[^>]*>/g)];
    assert.ok(images.length);
    for (const [image] of images) {
      assert.match(image, /width="1280"/); assert.match(image, /height="(?:720|960)"/);
      assert.match(image, /decoding="async"/); assert.match(image, /srcset=/);
      const src = image.match(/src="([^"]+)"/)[1];
      assert.ok(fs.existsSync(path.join(root, 'public', src)));
    }
    if (page === 'professional' || page === 'astro-chain') {
      assert.match(images[0][0], /loading="eager" fetchpriority="high"/);
      assert.match(html, /tech-fallback/);
    } else { assert.match(images[0][0], /loading="lazy"/); }
  }
  for (const file of fs.readdirSync(path.join(root, 'public/assets/technology-20261009'))) {
    assert.ok(fs.statSync(path.join(root, 'public/assets/technology-20261009', file)).size < 70000);
  }
  console.log('PASS imagery: cached/async/lazy/error/decode/observer fallbacks, reduced motion, 7-language captions, 4 pages, asset budgets.');
}
test().catch(error => { console.error(error); process.exitCode = 1; });
