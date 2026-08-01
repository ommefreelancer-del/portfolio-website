(function () {
  const grid = document.getElementById('postGrid');
  const emptyState = document.getElementById('blogEmpty');
  const noResults = document.getElementById('noResults');
  const controls = document.getElementById('blogControls');
  const searchInput = document.getElementById('blogSearch');
  const categoryFilters = document.getElementById('categoryFilters');
  const tagFilters = document.getElementById('tagFilters');
  const paginationEl = document.getElementById('pagination');

  const postsPerPage = 9;
  let currentPage = 1;
  let activeCategory = null;
  let activeTag = null;
  let searchTerm = '';

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  function uniqueValues(list) {
    return Array.from(new Set(list)).sort();
  }

  function getCategories() {
    return uniqueValues(blogPosts.map(p => p.category));
  }

  function getTags() {
    return uniqueValues(blogPosts.flatMap(p => p.tags || []));
  }

  function applyFilters() {
    let results = blogPosts.slice();
    if (activeCategory) results = results.filter(p => p.category === activeCategory);
    if (activeTag) results = results.filter(p => (p.tags || []).includes(activeTag));
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      results = results.filter(p =>
        p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      );
    }
    results.sort((a, b) => new Date(b.date) - new Date(a.date));
    return results;
  }

  function postCardHTML(post) {
    return `<article class="post-card">
      <div class="post-card-body">
        <span class="post-category">${escapeHtml(post.category)}</span>
        <h3><a href="${escapeHtml(post.slug)}.html">${escapeHtml(post.title)}</a></h3>
        <p>${escapeHtml(post.excerpt)}</p>
        <div class="post-meta"><span>${escapeHtml(post.date)}</span><span>${escapeHtml(post.readTime || '')}</span></div>
      </div>
    </article>`;
  }

  function renderPagination(totalPages) {
    if (totalPages <= 1) { paginationEl.innerHTML = ''; return; }
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
      html += `<button type="button" class="${i === currentPage ? 'active' : ''}" data-page="${i}" aria-label="Page ${i}">${i}</button>`;
    }
    paginationEl.innerHTML = html;
    paginationEl.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        currentPage = parseInt(btn.dataset.page, 10);
        renderPage();
        grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  function renderPage() {
    const filtered = applyFilters();
    const totalPages = Math.max(1, Math.ceil(filtered.length / postsPerPage));
    currentPage = Math.min(currentPage, totalPages);
    const start = (currentPage - 1) * postsPerPage;
    const pageItems = filtered.slice(start, start + postsPerPage);
    grid.innerHTML = pageItems.map(postCardHTML).join('');
    noResults.style.display = filtered.length === 0 ? 'block' : 'none';
    renderPagination(totalPages);
  }

  function renderFilterRow(container, values, active, onSelect) {
    if (!values.length) { container.innerHTML = ''; return; }
    let html = `<button type="button" class="filter-pill${active === null ? ' active' : ''}" data-value="">All</button>`;
    html += values.map(v => `<button type="button" class="filter-pill${active === v ? ' active' : ''}" data-value="${escapeHtml(v)}">${escapeHtml(v)}</button>`).join('');
    container.innerHTML = html;
    container.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        onSelect(btn.dataset.value || null);
      });
    });
  }

  function refreshCategoryFilters() {
    renderFilterRow(categoryFilters, getCategories(), activeCategory, (val) => {
      activeCategory = val;
      currentPage = 1;
      refreshCategoryFilters();
      renderPage();
    });
  }

  function refreshTagFilters() {
    renderFilterRow(tagFilters, getTags(), activeTag, (val) => {
      activeTag = val;
      currentPage = 1;
      refreshTagFilters();
      renderPage();
    });
  }

  function init() {
    if (!blogPosts.length) {
      controls.style.display = 'none';
      emptyState.style.display = 'block';
      paginationEl.innerHTML = '';
      return;
    }

    refreshCategoryFilters();
    refreshTagFilters();

    searchInput.addEventListener('input', (e) => {
      searchTerm = e.target.value.trim();
      currentPage = 1;
      renderPage();
    });

    renderPage();
  }

  init();
})();
