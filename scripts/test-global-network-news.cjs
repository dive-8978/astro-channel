const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const path = require("node:path");
const base = path.resolve(__dirname, "../public");
const registry = fs.readFileSync(path.join(base, "news/articles.js"), "utf8");
const renderer = fs.readFileSync(path.join(base, "news/article.js"), "utf8");
function render(query) {
  const root = { innerHTML: "" };
  const description = { content: "" };
  const document = {
    title: "", documentElement: { lang: "en" },
    getElementById: () => root, querySelector: () => description
  };
  const context = { window: { location: { search: query } }, document, URLSearchParams };
  vm.runInNewContext(registry, context);
  vm.runInNewContext(renderer, context);
  return { html: root.innerHTML, document, description, articles: context.window.ASTRO_ARTICLES };
}
const slug = "astro-ai-chain-global-read-access-20261009";
const en = render("?slug=" + slug);
const zh = render("?slug=" + slug + "&lang=zh");
assert.equal(en.articles[0].slug, slug);
assert.equal(en.articles.filter(item => item.slug === slug).length, 1);
assert.match(en.document.title, /Across Four Continents/);
assert.equal(zh.document.title, en.document.title);
assert.equal(zh.document.documentElement.lang, "en");
assert.equal(en.articles[0].translations, undefined);
assert.doesNotMatch(en.html, /article-languages|跨越四大洲/);
assert.match(en.html, /<figure class="article-media">/);
assert.match(en.html, /srcset=/);
assert.match(en.html, /not a live node, validator or payment-network map/);
assert.match(en.html, /real-asset Chain payments remain closed/);
assert.deepEqual(render("?slug=" + slug + "&lang=unsupported").document.title, en.document.title);
const old = en.articles[1];
assert.equal(render("?slug=" + old.slug + "&lang=zh").document.title, old.title + " | Astro Open Infrastructure");
assert.match(render("?slug=not-a-story").html, /Story not found/);
for (const key of ["image", "imageSrcset"]) {
  for (const entry of en.articles[0][key].split(",")) {
    const asset = entry.trim().split(" ")[0];
    assert.ok(fs.existsSync(path.join(base, asset)), asset);
  }
}
const record = JSON.parse(fs.readFileSync(path.join(base, "data/global-read-access-2026-10-09.json"), "utf8"));
assert.equal(record.release, "R19");
assert.equal(record.recordDate, "2026-10-09");
assert.equal(record.independentValidatorsAdded, 0);
assert.equal(record.realAssetChainPaymentsEnabled, false);
assert.equal(record.formalMaDeployment, null);
const newText = JSON.stringify(en.articles[0]) + JSON.stringify(record);
assert.doesNotMatch(newText, /https?:\/\/[^" ]*(workers\.dev|railway|render\.com)|Bearer |privateKey|BEGIN.*PRIVATE KEY/);
console.log("PASS English-only article, artwork, language fallback and bounded public record.");
