// Blog posts data source.
//
// This array starts empty on purpose — no sample or AI-written posts are
// published on this site. Add one object here each time you publish a real
// post. See blog/HOW-TO-PUBLISH.md for the full step-by-step process.
//
// Shape of a post entry (copy this when you add one):
// {
//   slug: "your-post-slug",              // matches the .html filename in /blog
//   title: "Your Post Title",
//   excerpt: "One or two sentence summary shown on the blog listing card.",
//   category: "Technical SEO",           // one category per post
//   tags: ["seo", "technical-seo"],      // lowercase, used for tag filtering
//   date: "2026-01-15",                  // ISO format, used for sorting and display
//   readTime: "6 min read"
// }

const blogPosts = [
  {
    slug: "what-is-an-seo-audit",
    title: "What Is an SEO Audit? A Beginner's Guide",
    excerpt: "Learn what an SEO audit is, what it checks, how the process works, and how to prioritize and act on the findings.",
    category: "SEO Audits",
    tags: ["seo-audit", "seo-strategy", "website-audit"],
    date: "2026-09-09",
    readTime: "17 min read"
  },
  {
    slug: "what-is-guest-posting",
    title: "What Is Guest Posting? A Complete Guide",
    excerpt: "A complete guide to guest posting: what it is, how it works, its real connection to SEO, and how to find and pitch legitimate opportunities.",
    category: "Off-Page SEO",
    tags: ["guest-posting", "link-building", "off-page-seo"],
    date: "2026-09-09",
    readTime: "24 min read"
  },
  {
    slug: "what-is-keyword-research",
    title: "What Is Keyword Research? A Complete Beginner's Guide",
    excerpt: "Learn what keyword research is, how to evaluate and cluster keywords, and how research turns into an actual content strategy.",
    category: "Keyword Research",
    tags: ["keyword-research", "seo-strategy", "content-strategy"],
    date: "2026-09-09",
    readTime: "30 min read"
  },
  {
    slug: "what-is-on-page-seo",
    title: "What Is On-Page SEO? A Complete Guide",
    excerpt: "A complete guide to on-page SEO: what it includes, why it matters, and a step-by-step workflow for optimizing a page.",
    category: "On-Page SEO",
    tags: ["on-page-seo", "seo-strategy", "content-optimization"],
    date: "2026-09-09",
    readTime: "26 min read"
  },
  {
    slug: "what-is-off-page-seo",
    title: "What Is Off-Page SEO? A Beginner's Guide",
    excerpt: "Learn what off-page SEO is, how backlinks and other external signals work, and which off-page activities deserve priority.",
    category: "Off-Page SEO",
    tags: ["off-page-seo", "backlinks", "link-building"],
    date: "2026-09-09",
    readTime: "10 min read"
  },
  {
    slug: "what-is-technical-seo",
    title: "What Is Technical SEO? A Beginner's Guide",
    excerpt: "Learn what technical SEO covers, why it matters, and how to run a basic technical SEO audit as a beginner.",
    category: "Technical SEO",
    tags: ["technical-seo", "site-audit", "crawlability"],
    date: "2026-09-09",
    readTime: "15 min read"
  },
  {
    slug: "local-seo-audit-checklist",
    title: "Local SEO Audit Checklist: 15 Steps to Improve Your Google Rankings",
    excerpt: "Learn how to conduct a local SEO audit with 15 practical checks for Google Business Profile, website SEO, reviews, citations, links, and local rankings.",
    category: "Local SEO",
    tags: ["local-seo", "seo-audit", "small-business-seo"],
    date: "2026-09-16",
    readTime: "12 min read"
  }
];
