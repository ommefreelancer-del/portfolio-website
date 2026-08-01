(function () {
  // Auto-fills share links with this page's real URL/title, and renders
  // related posts by matching category. No manual editing needed here.
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
    const related = blogPosts
      .filter(p => p.category === category && p.slug !== currentSlug)
      .slice(0, 3);

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
