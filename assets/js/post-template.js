(function () {
  // Auto-fills share links with this page's real URL/title, and renders
  // related posts by matching category (with a shared-tag fallback when
  // no other post is in the same category). No manual editing needed here.
  const pageUrl = encodeURIComponent(window.location.href);
  const pageTitle = encodeURIComponent(document.title);

  const twitter = document.getElementById('shareTwitter');
  const linkedin = document.getElementById('shareLinkedIn');
  const facebook = document.getElementById('shareFacebook');
  const whatsapp = document.getElementById('shareWhatsApp');

  if (twitter) twitter.href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
  if (linkedin) linkedin.href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
  if (facebook) facebook.href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
  if (whatsapp) whatsapp.href = `https://wa.me/?text=${pageTitle}%20${pageUrl}`;

  function escapeHtml(str) {
    return String(str).replace(/[&<>"']/g, (c) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    }[c]));
  }

  const relatedEl = document.getElementById('relatedPosts');
  const noRelated = document.getElementById('noRelated');
  if (relatedEl && typeof blogPosts !== 'undefined') {
    const category = relatedEl.dataset.currentCategory;
    const currentSlug = relatedEl.dataset.currentSlug;
    let related = blogPosts
      .filter(p => p.category === category && p.slug !== currentSlug)
      .slice(0, 3);

    // Fallback: only when no other post shares this category, show posts
    // that share at least one tag with the current post (most shared tags
    // first, then newest). Posts with no shared tags are never shown.
    if (!related.length) {
      const current = blogPosts.find(p => p.slug === currentSlug);
      const currentTags = (current && Array.isArray(current.tags)) ? current.tags : [];
      related = blogPosts
        .filter(p => p.slug !== currentSlug)
        .map((p, i) => ({
          p,
          i,
          shared: (p.tags || []).filter(t => currentTags.includes(t)).length
        }))
        .filter(x => x.shared > 0)
        .sort((a, b) => (b.shared - a.shared) || b.p.date.localeCompare(a.p.date) || (a.i - b.i))
        .slice(0, 3)
        .map(x => x.p);
    }

    if (!related.length) {
      noRelated.style.display = 'block';
    } else {
      relatedEl.innerHTML = related.map(p => `
        <article class="post-card">
          <div class="post-card-body">
            <span class="post-category">${escapeHtml(p.category)}</span>
            <h3><a href="${escapeHtml(p.slug)}.html">${escapeHtml(p.title)}</a></h3>
            <p>${escapeHtml(p.excerpt)}</p>
          </div>
        </article>
      `).join('');
    }
  }
})();
