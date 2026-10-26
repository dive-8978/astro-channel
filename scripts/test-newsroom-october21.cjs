const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const crypto = require("node:crypto");

const publicRoot = path.resolve(__dirname, "../public");
const approved = require("./fixtures/newsroom-20261021-approved.json");
const registry = fs.readFileSync(path.join(publicRoot, "news/articles.js"), "utf8");
const renderer = fs.readFileSync(path.join(publicRoot, "news/article.js"), "utf8");
const context = { window: {} };
vm.runInNewContext(registry, context);
const articles = JSON.parse(JSON.stringify(context.window.ASTRO_ARTICLES));
const slugs = approved.map(item => item.slug);
const digest = value => crypto.createHash("sha256").update(value).digest("hex");
const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
  "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
})[char]);

assert.equal(approved.length, 3);
assert.equal(new Set(articles.map(article => article.slug)).size, articles.length);
const approvedArticles = articles.filter(article => slugs.includes(article.slug));
assert.deepEqual(approvedArticles.map(article => article.slug), slugs);
assert.deepEqual(articles.filter(article => article.date === "2026-10-21").map(article => article.slug), slugs);
const historicalArticles = articles.filter(article => article.date < "2026-10-21");
assert.equal(historicalArticles.length, 24);
assert.equal(digest(JSON.stringify(historicalArticles)), "daedcf5f7198060bc90ba4945a83d594552840396a2f10ce3fed0b0f27f09c94");

function render(stories, slug, language = "en") {
  const root = { innerHTML: "" };
  const description = { content: "" };
  const document = {
    title: "", documentElement: { lang: "en" },
    getElementById: () => root, querySelector: () => description
  };
  vm.runInNewContext(renderer, {
    window: { ASTRO_ARTICLES: stories, location: { search: "?slug=" + slug + "&lang=" + language } },
    document, URLSearchParams
  });
  return { html: root.innerHTML, document, description };
}

const expectedSections = ["Products", "Engineering", "Institution"];
const expectedTones = ["active", "verified", "planned"];
const expectedStatus = [
  "Refinement and device validation continue.",
  approved[1].body.split("\n\n")[0],
  approved[2].body.split("\n\n").at(-1)
];
for (const [index, item] of approved.entries()) {
  const article = articles.find(story => story.slug === item.slug);
  assert.equal(article.title, item.title);
  assert.equal(article.dek, item.summary);
  assert.equal(article.body.join("\n\n"), item.body);
  assert.equal(article.imageCaption, item.caption);
  assert.equal(article.image, "/assets/news-20261021/" + item.image);
  assert.equal(article.imageAlt, item.caption);
  assert.equal(article.imageWidth, 1672);
  assert.equal(article.imageHeight, 941);
  assert.equal(article.date, "2026-10-21");
  assert.equal(article.displayDate, "October 21, 2026");
  assert.equal(article.section, expectedSections[index]);
  assert.equal(article.phaseTone, expectedTones[index]);
  assert.equal(article.translations, undefined);
  assert.deepEqual(article.facts, [item.summary]);
  assert.equal(article.status, expectedStatus[index]);
  assert.deepEqual(article.links, []);
  const words = item.body.trim().split(/\s+/).length;
  assert.ok(words >= 70 && words <= 110);
  const png = fs.readFileSync(path.join(publicRoot, article.image));
  assert.equal(png.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(png.readUInt32BE(16), 1672);
  assert.equal(png.readUInt32BE(20), 941);
  assert.equal(digest(png), item.imageSha256);
  for (const language of ["en", "zh", "unsupported"]) {
    const result = render(articles, item.slug, language);
    assert.equal(result.document.documentElement.lang, "en");
    assert.equal(result.document.title, item.title + " | Astro Open Infrastructure");
    assert.equal(result.description.content, item.summary);
    assert.ok(result.html.includes("<h1>" + escapeHtml(item.title) + "</h1>"));
    assert.ok(result.html.includes(escapeHtml(item.caption)));
    for (const paragraph of article.body) assert.ok(result.html.includes("<p>" + escapeHtml(paragraph) + "</p>"));
    assert.doesNotMatch(result.html, /article-languages|Story not found/);
  }
}

const hostile = { ...articles[0], title: '<img src=x onerror="bad()">', body: ['<script>bad()</script> & "quoted"'] };
const safe = render([hostile], hostile.slug);
assert.ok(safe.html.includes("&lt;img src=x onerror=&quot;bad()&quot;&gt;"));
assert.ok(safe.html.includes("&lt;script&gt;bad()&lt;/script&gt; &amp; &quot;quoted&quot;"));
assert.doesNotMatch(safe.html, /<script>bad\(\)<\/script>|<h1><img/);

const newsroom = fs.readFileSync(path.join(publicRoot, "newsroom.html"), "utf8");
const articlePage = fs.readFileSync(path.join(publicRoot, "news/article.html"), "utf8");
const leadArticle = articles[0];
assert.ok(newsroom.includes('class="lead-story" href="news/article.html?slug=' + leadArticle.slug + '"'));
assert.ok(newsroom.includes("<strong>" + leadArticle.title + "</strong>"));
assert.ok(newsroom.includes(leadArticle.dek));
const cacheVersion = leadArticle.date.replaceAll("-", "");
assert.ok(newsroom.includes("news/articles.js?v=" + cacheVersion));
assert.ok(articlePage.includes("articles.js?v=" + cacheVersion));
const sitemap = fs.readFileSync(path.join(publicRoot, "sitemap.xml"), "utf8");
assert.ok(sitemap.includes("<loc>https://www.astrochannel.one/newsroom.html</loc><lastmod>" + leadArticle.date + "</lastmod>"));
for (const slug of slugs) {
  const entry = "<loc>https://www.astrochannel.one/news/article.html?slug=" + slug + "</loc><lastmod>2026-10-21</lastmod>";
  assert.equal(sitemap.split(entry).length - 1, 1);
}
assert.doesNotMatch(JSON.stringify(approvedArticles), /\/Users\/|Bearer |PRIVATE KEY|fully secure|zero data collection|100 million|100,000,000/);
console.log("PASS three exact approved English dispatches, original image hashes, 24 unchanged historical articles, rendering, escaping, cache and sitemap.");
