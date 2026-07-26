(function () {
  const slug = new URLSearchParams(window.location.search).get("slug");
  const story = (window.ASTRO_ARTICLES || []).find((item) => item.slug === slug);
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
  document.querySelector('meta[name="description"]').content = story.dek;
  root.innerHTML = `
    <article>
      <header class="article-hero">
        <div class="shell">
          <div class="article-kicker">${escapeHtml(story.type)} · ${escapeHtml(story.section)}</div>
          <h1>${escapeHtml(story.title)}</h1>
          <p class="article-dek">${escapeHtml(story.dek)}</p>
          <div class="article-byline"><strong>${escapeHtml(story.byline)}</strong><time datetime="${story.date}">${escapeHtml(story.displayDate)}</time><span>Official publication</span></div>
        </div>
      </header>
      <img class="article-image" src="${escapeHtml(story.image)}" alt="">
      <div class="shell article-layout">
        <div class="prose">${story.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}</div>
        <aside class="fact-panel">
          <h2>Verified record</h2>
          <ul>${story.facts.map((fact) => `<li>${escapeHtml(fact)}</li>`).join("")}</ul>
          <div class="status-note">${escapeHtml(story.status)}</div>
          <div class="official-links">${story.links.map((link) => `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener">${escapeHtml(link.label)} ↗</a>`).join("")}</div>
        </aside>
      </div>
    </article>
  `;
})();
