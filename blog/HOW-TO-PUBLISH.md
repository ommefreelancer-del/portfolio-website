# How to publish a blog post

The blog system is fully built and ready to use. No code changes are required to publish a post, just these five steps.

## 1. Duplicate the template

Copy `blog/post-template.html` and rename it to your post's slug, using lowercase words separated by hyphens, no dates or query strings:

```
blog/technical-seo-checklist.html
```

## 2. Fill in the template

Open your new file and replace every block marked `<!-- REPLACE: ... -->`, including:

- `<title>` and meta description in `<head>`
- canonical / Open Graph / Twitter URLs (they should match the real published URL)
- the `Article` and `BreadcrumbList` JSON-LD block near the top
- the breadcrumb text
- the category, date, and read time row
- the `<h1>` title
- the article content itself (replace the example `<h2>` sections with your real writing)
- the `data-current-category` and `data-current-slug` attributes on the related-posts container, so related articles pull correctly

Delete the yellow "template note" box near the top before publishing, it's a reminder for you, not for readers.

Write for the person reading it. One clear idea per section, short paragraphs, no padding just to hit a word count.

## 3. Register the post

Open `assets/js/blog-posts-data.js` and add one object to the `blogPosts` array:

```js
const blogPosts = [
  {
    slug: "technical-seo-checklist",
    title: "Your Post Title",
    excerpt: "One or two sentence summary shown on the blog listing card.",
    category: "Technical SEO",
    tags: ["seo", "technical-seo"],
    date: "2026-01-15",
    readTime: "6 min read"
  }
];
```

This is what powers the blog listing page: search, category filters, tag filters, pagination, and related posts on other articles all read from this one array. As soon as you add an entry, the "New Articles Coming Soon" empty state on `blog/index.html` disappears automatically and your post shows up.

## 4. Add it to the sitemap

Open `sitemap.xml` at the project root and add a `<url>` entry pointing to the new page, following the pattern already used for the other pages.

## 5. Regenerate the CSP hash

Every page locks down which scripts are allowed to run via a Content-Security-Policy meta tag, and that includes a hash of the JSON-LD block you just edited in step 2. The hash from the template no longer matches once you've changed the content, so the browser will silently block your post's structured data until you update it. See `SECURITY.md` for the exact command and why this exists.

That's it, no build step, no deployment tooling. Push the new files and they're live.
