const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const publicRoot = path.resolve(__dirname, "../public");
const registry = fs.readFileSync(path.join(publicRoot, "news/articles.js"), "utf8");
const renderer = fs.readFileSync(path.join(publicRoot, "news/article.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(registry, context);
const articles = context.window.ASTRO_ARTICLES;
const slugs = [
  "astrobridge-professional-website-refresh-20261015",
  "ma-square-efficient-playback-candidate-20261015",
  "astro-ai-chain-design-journey-20261015"
];
assert.equal(new Set(articles.map(article => article.slug)).size, articles.length);
const historicalOctoberArticles = articles.filter(article => slugs.includes(article.slug));
assert.deepEqual(Array.from(historicalOctoberArticles, article => article.slug), slugs);
function render(slug, language) {
  const root = { innerHTML: "" };
  const description = { content: "" };
  const document = {
    title: "", documentElement: { lang: "en" },
    getElementById: () => root, querySelector: () => description
  };
  const runtime = {
    window: { location: { search: "?slug=" + slug + "&lang=" + language } },
    document, URLSearchParams
  };
  vm.runInNewContext(registry, runtime);
  vm.runInNewContext(renderer, runtime);
  return { html: root.innerHTML, document, description };
}
function checkLocalLink(url) {
  if (!url.startsWith("/")) return;
  const target = new URL(url, "https://www.astrochannel.one");
  const file = path.join(publicRoot, target.pathname);
  assert.ok(fs.existsSync(file), url);
  if (target.hash) {
    assert.ok(fs.readFileSync(file, "utf8").includes('id="' + target.hash.slice(1) + '"'), url);
  }
}
for (const slug of slugs) {
  const article = articles.find(item => item.slug === slug);
  assert.equal(article.date, "2026-10-15");
  assert.ok(["Institution", "Products", "Protocol"].includes(article.section));
  assert.ok(article.body.length >= 4);
  for (const language of ["en", "zh"]) {
    const copy = language === "zh" ? article.translations.zh : article;
    const rendered = render(slug, language);
    assert.equal(rendered.document.title, copy.title + " | Astro Open Infrastructure");
    assert.equal(rendered.document.documentElement.lang, language === "zh" ? "zh-Hans" : "en");
    assert.equal(rendered.description.content, copy.dek);
    assert.match(rendered.html, /article-languages/);
    assert.match(rendered.html, /aria-current="page"/);
    assert.ok(rendered.html.includes(copy.status));
    assert.equal(copy.body.length, article.body.length);
    assert.equal(copy.facts.length, article.facts.length);
    copy.links.forEach(link => checkLocalLink(link.url));
  }
  assert.equal(render(slug, "unsupported").document.documentElement.lang, "en");
  assert.ok(fs.existsSync(path.join(publicRoot, article.image)));
  for (const source of (article.imageSrcset || article.image).split(",")) {
    assert.ok(fs.existsSync(path.join(publicRoot, source.trim().split(" ")[0])));
  }
  assert.ok(article.imageWidth > 0 && article.imageHeight > 0);
  assert.ok(article.imageCaption && article.translations.zh.imageCaption);
}
const record = JSON.parse(fs.readFileSync(path.join(publicRoot, "data/company-actions-2026-10-15.json"), "utf8"));
assert.equal(record.website.postReleaseHttpChecksPassed, 13);
assert.equal(record.website.hashMatchedFiles, 7);
assert.equal(record.website.existingContentPreserved, true);
assert.equal(record.maPlaybackCandidate.localValidationGroupsPassed, 12);
assert.equal(record.maPlaybackCandidate.productionDeployed, false);
assert.equal(record.maPlaybackCandidate.nativeDevicePlaybackVerified, false);
assert.equal(record.maPlaybackCandidate.streamingImplemented, false);
assert.equal(record.maPlaybackCandidate.privateMomentsChatAndRecoveryCached, false);
assert.equal(record.chainDesign.productionMainnetLaunchAnnounced, false);
assert.equal(record.chainDesign.independentAuditAnnounced, false);
assert.equal(historicalOctoberArticles[1].phaseTone, "active");
assert.match(historicalOctoberArticles[1].dek, /remain pending/);
assert.match(historicalOctoberArticles[1].status, /Local candidate only/);
assert.match(historicalOctoberArticles[2].status, /no new production-network launch/);
const safeCopy = JSON.stringify(historicalOctoberArticles) + JSON.stringify(record);
assert.doesNotMatch(safeCopy, /\/Users\/|Bearer |BEGIN.*PRIVATE KEY|baow59671|ssh |root@/);
const newsroom = fs.readFileSync(path.join(publicRoot, "newsroom.html"), "utf8");
const leadSlug = newsroom.match(/class="lead-story" href="news\/article\.html\?slug=([^"]+)"/)?.[1];
assert.ok(articles.some(article => article.slug === leadSlug));
assert.match(newsroom, /news\/articles\.js\?v=20261021/);
assert.match(fs.readFileSync(path.join(publicRoot, "news/article.html"), "utf8"), /articles\.js\?v=20261021/);
checkLocalLink(record.chainDesign.publicOverview);
console.log("PASS three bilingual updates, scoped claims, local links, artwork, lead story and cache version.");
