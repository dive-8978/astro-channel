const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const css = fs.readFileSync(path.join(root, 'public/assets/readable-type.css'), 'utf8');
for (const [page, theme] of Object.entries({ professional: 'professional',
  'astro-chain': 'chain', painpoints: 'ma', technology: 'technology' })) {
  const html = fs.readFileSync(path.join(root, 'public', page + '.html'), 'utf8');
  assert.match(html, new RegExp(`<body data-reading="${theme}">`));
  assert.match(html, /readable-type\.css\?v=20261009a/);
  assert.ok(html.indexOf('readable-type.css') > html.indexOf('technology-imagery.css'));
  assert.ok(html.indexOf('readable-type.css') < html.indexOf('</head>'));
  assert.ok(css.includes(`body[data-reading="${theme}"]`));
}
assert.match(css, /body\[data-reading\] \{ font-size: 18px; \}/);
assert.match(css, /\.tech-visual figcaption \{\s*font-size: 14px;/);
assert.match(css, /\.three p,[\s\S]*?font-size: 18px; line-height: 1\.8;/);
assert.match(css, /\.phase \{ font-size: 16px;/);
assert.match(css, /\.tech-node small \{ font-size: 14px;/);
assert.match(css, /\.program-pill,/);
assert.match(css, /\.flow \{ grid-template-columns: 1fr; \}/);
assert.ok(!/font-size:\s*(?:[0-9]|1[0-2])px/.test(css), 'No new unreadably small type');
assert.ok(!css.includes('!important'), 'Keep overrides scoped, not globally forced');
assert.ok(!css.includes('overflow-x: hidden'), 'Do not hide layout overflow');
console.log('PASS readable type: 4 scoped pages, stylesheet ordering, 18px body copy, readable captions, narrow-screen flow, no forced clipping.');
