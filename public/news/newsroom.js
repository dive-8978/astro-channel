(function () {
  const stories = window.ASTRO_ARTICLES || [];
  const grid = document.getElementById("storyGrid");
  const filters = Array.from(document.querySelectorAll(".filter"));

  function escapeHtml(value) {
    return String(value || "").replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#039;"
    })[char]);
  }

  function renderStories(filter) {
    const visible = filter === "All" ? stories : stories.filter((story) => story.section === filter);
    grid.innerHTML = visible.map((story) => `
      <article class="story-card">
        <a href="news/article.html?slug=${encodeURIComponent(story.slug)}">
          <img src="${escapeHtml(story.image)}" alt="" loading="lazy">
          <div class="story-body">
            <div class="story-meta"><span>${escapeHtml(story.type)}</span><time datetime="${story.date}">${escapeHtml(story.displayDate)}</time></div>
            <h3>${escapeHtml(story.title)}</h3>
            <p>${escapeHtml(story.dek)}</p>
            <span class="story-read">Read dispatch →</span>
          </div>
        </a>
      </article>
    `).join("");
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => {
        item.classList.toggle("active", item === button);
        item.setAttribute("aria-selected", String(item === button));
      });
      renderStories(button.dataset.filter);
    });
  });

  async function renderWire() {
    const list = document.getElementById("wireList");
    const status = document.getElementById("wireStatus");
    try {
      const response = await fetch("news/feed.json", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const feed = await response.json();
      const items = (feed.items || []).slice(0, 18);
      status.textContent = `Updated ${new Date(feed.generatedAt).toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}`;
      list.innerHTML = items.map((item) => `
        <a class="wire-item" href="${escapeHtml(item.url)}" target="_blank" rel="noopener noreferrer">
          <span class="wire-source">${escapeHtml(item.source)}</span>
          <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.summary)}</p></div>
          <time class="wire-date" datetime="${escapeHtml(item.publishedAt)}">${new Date(item.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })} ↗</time>
        </a>
      `).join("") || '<div class="wire-empty">No current headlines are available.</div>';
    } catch (error) {
      status.textContent = "Live wire temporarily unavailable";
      list.innerHTML = '<div class="wire-empty">The official dispatches remain available above. External headlines will return on the next successful source refresh.</div>';
    }
  }

  renderStories("All");
  renderWire();
})();
