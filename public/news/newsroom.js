(function () {
  const stories = window.ASTRO_ARTICLES || [];
  const programUpdates = window.ASTRO_PROGRAM_UPDATES || [];
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

  const articleUpdates = stories.map((story) => ({
    id: story.slug,
    project: story.project || story.section,
    title: story.title,
    summary: story.dek,
    phase: story.phase || story.type,
    phaseTone: story.phaseTone || "active",
    date: story.date,
    displayDate: story.displayDate,
    url: `news/article.html?slug=${encodeURIComponent(story.slug)}`,
    evidence: (story.facts && story.facts[0]) || story.status
  }));
  const updates = programUpdates.concat(articleUpdates).sort((a, b) =>
    String(b.date).localeCompare(String(a.date))
  );
  const preferredProjects = ["MA", "AstroBridge", "AstroWallet AI", "AstroAI Chain", "AstroRealms", "Open Safety Layer", "Institution"];

  function renderProjectFilters() {
    const root = document.getElementById("projectFilters");
    if (!root) return;
    const available = new Set(updates.map((item) => item.project));
    const projects = preferredProjects.filter((project) => available.has(project));
    Array.from(available).sort().forEach((project) => {
      if (!projects.includes(project)) projects.push(project);
    });
    root.innerHTML = ["All"].concat(projects).map((project, index) => `
      <button class="project-filter${index === 0 ? " active" : ""}" type="button" data-project="${escapeHtml(project)}" role="tab" aria-selected="${index === 0 ? "true" : "false"}">${escapeHtml(project)}</button>
    `).join("");
    root.querySelectorAll(".project-filter").forEach((button) => {
      button.addEventListener("click", () => {
        root.querySelectorAll(".project-filter").forEach((item) => {
          item.classList.toggle("active", item === button);
          item.setAttribute("aria-selected", String(item === button));
        });
        renderUpdates(button.dataset.project);
      });
    });
  }

  function renderUpdates(project) {
    const root = document.getElementById("updateList");
    if (!root) return;
    const visible = project === "All" ? updates : updates.filter((item) => item.project === project);
    root.innerHTML = visible.map((item) => {
      const tone = ["verified", "active", "planned"].includes(item.phaseTone) ? item.phaseTone : "active";
      return `
        <article class="update-item">
          <div class="update-status" aria-hidden="true"><span class="status-dot ${tone}"></span></div>
          <div class="update-content">
            <div class="update-meta">
              <span class="update-project">${escapeHtml(item.project)}</span>
              <span class="phase-badge ${tone}">${escapeHtml(item.phase)}</span>
              <time datetime="${escapeHtml(item.date)}">${escapeHtml(item.displayDate)}</time>
            </div>
            <h3>${escapeHtml(item.title)}</h3>
            <p>${escapeHtml(item.summary)}</p>
            <p class="update-evidence"><strong>Evidence:</strong> ${escapeHtml(item.evidence)}</p>
          </div>
          <a class="update-link" href="${escapeHtml(item.url)}" aria-label="View record: ${escapeHtml(item.title)}">View record <span aria-hidden="true">→</span></a>
        </article>
      `;
    }).join("") || '<div class="update-empty">No updates are available for this project yet.</div>';
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

  renderProjectFilters();
  renderUpdates("All");
  renderStories("All");
  renderWire();
})();
