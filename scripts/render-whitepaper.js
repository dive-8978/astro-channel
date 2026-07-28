const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const source = path.join(root, 'content', 'ASTROBRIDGE_MA_WHITEPAPER_V1.5.1_EN.md');
const destination = path.join(root, 'public', 'whitepaper.html');

const escapeHtml = value => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;');

const inline = value => escapeHtml(value)
  .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  .replace(/`(.+?)`/g, '<code>$1</code>');

const slugify = value => value
  .toLowerCase()
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '');

function markdownToHtml(markdown) {
  const lines = markdown.split(/\r?\n/);
  const output = [];
  let paragraph = [];
  let listType = null;
  let list = [];

  const flushParagraph = () => {
    if (!paragraph.length) return;
    output.push(`<p>${inline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    const tag = listType === 'ol' ? 'ol' : 'ul';
    output.push(`<${tag}>${list.map(item => `<li>${inline(item)}</li>`).join('')}</${tag}>`);
    list = [];
    listType = null;
  };

  for (let i = 0; i < lines.length; i += 1) {
    const raw = lines[i].trim();
    if (!raw) {
      flushParagraph();
      flushList();
      continue;
    }

    if (raw.startsWith('|') && i + 1 < lines.length && /^\|?\s*:?-+/.test(lines[i + 1].trim())) {
      flushParagraph();
      flushList();
      const rows = [];
      while (i < lines.length && lines[i].trim().startsWith('|')) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map(cell => cell.trim()));
        i += 1;
      }
      i -= 1;
      rows.splice(1, 1);
      const [header, ...body] = rows;
      output.push(`<div class="table-scroll"><table><thead><tr>${header.map(cell => `<th>${inline(cell)}</th>`).join('')}</tr></thead><tbody>${body.map(row => `<tr>${row.map(cell => `<td>${inline(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`);
      continue;
    }

    const heading = raw.match(/^(#{1,3})\s+(.+)$/);
    if (heading) {
      flushParagraph();
      flushList();
      const level = heading[1].length;
      const text = heading[2];
      if (level === 1) continue;
      output.push(`<h${level} id="${slugify(text)}">${inline(text)}</h${level}>`);
      continue;
    }

    const unordered = raw.match(/^[-*]\s+(.+)$/);
    if (unordered) {
      flushParagraph();
      if (listType && listType !== 'ul') flushList();
      listType = 'ul';
      list.push(unordered[1]);
      continue;
    }

    const ordered = raw.match(/^\d+\.\s+(.+)$/);
    if (ordered) {
      flushParagraph();
      if (listType && listType !== 'ol') flushList();
      listType = 'ol';
      list.push(ordered[1]);
      continue;
    }

    flushList();
    if (/^(Version|Publication date|Status):/.test(raw)) {
      output.push(`<p class="meta-line">${inline(raw)}</p>`);
    } else {
      paragraph.push(raw);
    }
  }

  flushParagraph();
  flushList();
  return output.join('\n');
}

const markdown = fs.readFileSync(source, 'utf8');
const body = markdownToHtml(markdown);

const html = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="description" content="AstroBridge and MA Whitepaper v1.5.1: private P2P communication, non-custodial architecture, BNB Smart Chain and BNB payments.">
  <meta property="og:title" content="AstroBridge and MA Whitepaper v1.5.1">
  <meta property="og:description" content="A communication-first, non-custodial application architecture with native BNB Smart Chain support.">
  <title>AstroBridge and MA Whitepaper v1.5.1</title>
  <link rel="icon" href="favicon.ico">
  <style>
    :root{--bg:#040914;--panel:#0b1324;--panel2:#101c31;--text:#f3f7ff;--muted:#a9b8ce;--line:#263b58;--cyan:#5ad5ff;--blue:#5c8dff;--gold:#f3ba2f}
    *{box-sizing:border-box}
    html{scroll-behavior:smooth}
    body{margin:0;background:radial-gradient(circle at 12% 0%,rgba(34,92,153,.24),transparent 34%),radial-gradient(circle at 88% 15%,rgba(243,186,47,.11),transparent 28%),var(--bg);color:var(--text);font-family:Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;line-height:1.75}
    a{color:inherit}
    .topbar{position:sticky;top:0;z-index:10;border-bottom:1px solid rgba(90,213,255,.14);background:rgba(4,9,20,.86);backdrop-filter:blur(18px)}
    .nav{max-width:1120px;margin:auto;padding:16px 24px;display:flex;align-items:center;justify-content:space-between;gap:20px}
    .brand{font-weight:850;font-size:1.25rem;letter-spacing:-.02em;text-decoration:none}
    .brand span{background:linear-gradient(90deg,var(--cyan),#bb7dff,#ff4c9f);background-clip:text;-webkit-background-clip:text;color:transparent}
    .navlinks{display:flex;gap:12px;align-items:center}
    .navlinks a{text-decoration:none;color:var(--muted);font-weight:650;padding:8px 12px;border-radius:12px}
    .navlinks a:hover{color:#fff;background:rgba(255,255,255,.06)}
    .download{display:inline-flex!important;align-items:center;gap:8px;color:#04111e!important;background:linear-gradient(90deg,var(--cyan),#8edaff)!important}
    .hero{max-width:1120px;margin:auto;padding:84px 24px 48px;display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:42px;align-items:end}
    .eyebrow{display:inline-flex;gap:9px;align-items:center;color:var(--cyan);font-weight:750;text-transform:uppercase;letter-spacing:.11em;font-size:.76rem}
    .dot{width:9px;height:9px;border-radius:50%;background:#42df9a;box-shadow:0 0 18px #42df9a}
    h1{font-size:clamp(2.7rem,7vw,5.6rem);line-height:.98;letter-spacing:-.065em;margin:18px 0 22px;max-width:850px}
    .lead{font-size:1.16rem;color:var(--muted);max-width:760px}
    .facts{background:linear-gradient(145deg,rgba(16,28,49,.94),rgba(8,16,30,.94));border:1px solid var(--line);border-radius:24px;padding:24px;box-shadow:0 24px 80px rgba(0,0,0,.22)}
    .fact{padding:13px 0;border-bottom:1px solid rgba(255,255,255,.07)}
    .fact:last-child{border-bottom:0}
    .fact small{display:block;color:var(--muted);text-transform:uppercase;letter-spacing:.09em;font-size:.68rem}
    .fact strong{display:block;margin-top:3px}
    .bsc{color:var(--gold)}
    main{max-width:1120px;margin:auto;padding:0 24px 100px;display:grid;grid-template-columns:250px minmax(0,1fr);gap:48px}
    .toc{position:sticky;top:92px;align-self:start;padding:20px;border:1px solid var(--line);border-radius:18px;background:rgba(11,19,36,.72)}
    .toc strong{font-size:.78rem;text-transform:uppercase;letter-spacing:.12em;color:var(--cyan)}
    .toc a{display:block;color:var(--muted);text-decoration:none;font-size:.88rem;padding:5px 0}
    .toc a:hover{color:#fff}
    article{min-width:0}
    h2{font-size:2rem;line-height:1.2;letter-spacing:-.035em;margin:58px 0 16px;color:#fff;padding-top:24px;border-top:1px solid rgba(255,255,255,.08)}
    h2:first-child{margin-top:0}
    h3{font-size:1.25rem;line-height:1.35;margin:30px 0 10px;color:var(--cyan)}
    p,li{color:#c1cee0}
    ul,ol{padding-left:22px}
    li{margin:6px 0}
    code{color:#9de5ff;background:#081522;border:1px solid #18334a;border-radius:6px;padding:2px 5px}
    .meta-line{display:none}
    .table-scroll{overflow-x:auto;margin:22px 0}
    table{border-collapse:collapse;width:100%;min-width:680px;background:var(--panel);border-radius:16px;overflow:hidden}
    th,td{padding:13px 14px;border:1px solid var(--line);text-align:left;font-size:.9rem}
    th{background:#132743;color:#fff}
    td{color:#c1cee0}
    .notice{margin-top:44px;padding:20px 22px;border:1px solid rgba(243,186,47,.35);background:rgba(243,186,47,.07);border-radius:16px;color:#e5d69d}
    footer{border-top:1px solid rgba(255,255,255,.08);padding:30px 24px 50px;text-align:center;color:var(--muted)}
    @media(max-width:850px){.hero{grid-template-columns:1fr;padding-top:60px}.facts{display:grid;grid-template-columns:1fr 1fr}.fact{padding:10px;border-bottom:0}.toc{display:none}main{grid-template-columns:1fr}.navlinks a:not(.download){display:none}}
    @media(max-width:560px){.facts{grid-template-columns:1fr}h1{font-size:2.7rem}.hero{padding-top:46px}h2{font-size:1.65rem}.download{font-size:.82rem}}
  </style>
</head>
<body>
  <header class="topbar">
    <nav class="nav">
      <a class="brand" href="index.html"><span>AstroBridge</span></a>
      <div class="navlinks">
        <a href="painpoints.html">MA</a>
        <a href="technology.html">Technology</a>
        <a class="download" href="AstroBridge-MA-Whitepaper-v1.5.1-EN.pdf" download>Download PDF</a>
      </div>
    </nav>
  </header>
  <section class="hero">
    <div>
      <div class="eyebrow"><span class="dot"></span>Public technical whitepaper</div>
      <h1>AstroBridge<br>and MA</h1>
      <p class="lead">A communication-first, non-custodial application architecture with local identity, signed intents, native BNB Smart Chain support, and user-authorized BNB payments.</p>
    </div>
    <aside class="facts">
      <div class="fact"><small>Document version</small><strong>v1.5.1</strong></div>
      <div class="fact"><small>Published</small><strong>July 2026</strong></div>
      <div class="fact"><small>Primary chain</small><strong class="bsc">BNB Smart Chain</strong></div>
      <div class="fact"><small>Custody model</small><strong>Non-custodial</strong></div>
    </aside>
  </section>
  <main>
    <aside class="toc">
      <strong>Contents</strong>
      <a href="#1-executive-summary">Executive Summary</a>
      <a href="#3-product-family">Product Family</a>
      <a href="#5-system-architecture">Architecture</a>
      <a href="#6-bnb-smart-chain-and-bnb-payments">BSC &amp; BNB Payments</a>
      <a href="#7-private-communication-and-calls">Private Communication</a>
      <a href="#12-security-model">Security Model</a>
      <a href="#14-distribution-and-compliance">Distribution</a>
      <a href="#16-roadmap">Roadmap</a>
      <a href="#17-risk-disclosure">Risk Disclosure</a>
    </aside>
    <article>
${body}
      <div class="notice"><strong>Important:</strong> This document is not financial, legal, tax, or investment advice. Experimental balances do not guarantee market value, listing, liquidity, or future rewards.</div>
    </article>
  </main>
  <footer>© 2026 AstroBridge · Whitepaper v1.5.1 · English public edition</footer>
</body>
</html>`;

fs.writeFileSync(destination, html);
console.log(destination);
