(function () {
  const params = new URLSearchParams(window.location.search);
  const slug = params.get("slug");
  const original = (window.ASTRO_ARTICLES || []).find((item) => item.slug === slug);
  const language = params.get("lang") === "zh" && original?.translations?.zh ? "zh" : "en";
  const story = original && { ...original, ...(language === "zh" ? original.translations.zh : {}) };
  const root = document.getElementById("article");

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#039;"
    })[char]);
  }

  if (!story) {
    document.title = "Story not found | Astro Open Infrastructure";
    root.innerHTML = '<section class="not-found shell"><div><p class="eyebrow">Newsroom</p><h1>Story not found.</h1><p><a href="../newsroom.html">Return to all news</a></p></div></section>';
    return;
  }

  document.title = `${story.title} | Astro Open Infrastructure`;
  document.documentElement.lang = language === "zh" ? "zh-Hans" : "en";
  document.querySelector('meta[name="description"]').content = story.dek;
  const phaseTone = ["verified", "active", "planned"].includes(story.phaseTone) ? story.phaseTone : "active";
  const languageLinks = original.translations?.zh ? `<nav class="article-languages" aria-label="${language === "zh" ? "文章语言" : "Article language"}"><a href="?slug=${encodeURIComponent(slug)}&amp;lang=en" ${language === "en" ? 'aria-current="page"' : ""}>English</a><a href="?slug=${encodeURIComponent(slug)}&amp;lang=zh" ${language === "zh" ? 'aria-current="page"' : ""}>中文</a></nav>` : "";
  const heroImage = story.imageCaption
    ? `<figure class="article-media"><img class="article-image" src="${escapeHtml(story.image)}" srcset="${escapeHtml(story.imageSrcset || story.image)}" sizes="(max-width: 720px) 100vw, 1280px" width="${Number(story.imageWidth) || 1280}" height="${Number(story.imageHeight) || 720}" alt="${escapeHtml(story.imageAlt)}" fetchpriority="high"><figcaption class="shell">${escapeHtml(story.imageCaption)}</figcaption></figure>`
    : `<img class="article-image" src="${escapeHtml(story.image)}" alt="">`;
  root.innerHTML = `
    <article>
      <header class="article-hero">
        <div class="shell">
          ${languageLinks}
          <div class="article-kicker">${escapeHtml(story.project || story.section)} · ${escapeHtml(story.type)}</div>
          <h1>${escapeHtml(story.title)}</h1>
          <p class="article-dek">${escapeHtml(story.dek)}</p>
          <div class="article-byline"><strong>${escapeHtml(story.byline)}</strong><time datetime="${story.date}">${escapeHtml(story.displayDate)}</time><span class="phase-badge ${phaseTone}">${escapeHtml(story.phase || "Official publication")}</span></div>
        </div>
      </header>
      ${heroImage}
      <div class="shell article-layout">
        <div class="prose">${story.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
        <aside class="fact-panel">
          <h2>${language === "zh" ? "发布记录" : "Verified record"}</h2>
          <ul>${story.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul>
          <div class="status-note">${escapeHtml(story.status)}</div>
          <div class="official-links">${story.links.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener">${escapeHtml(link.label)} ↗</a>`).join("")}</div>
        </aside>
      </div>
    </article>
  `;
})();
