# Security notes for this repo

## Content Security Policy (CSP) and inline JSON-LD

Every page sets a CSP via a `<meta http-equiv="Content-Security-Policy">` tag. `script-src` is locked to `'self'` plus, on pages that carry a `<script type="application/ld+json">` block, a SHA-256 hash of that exact block's contents. There is no `'unsafe-inline'` on `script-src` anywhere on the site.

**Pages with zero inline scripts** (strictest possible policy, no hash needed):
`404.html`, `privacy-policy.html`, `terms.html`

**Pages with one inline JSON-LD block** (script-src includes that block's hash):
`index.html`, `about/index.html`, `services/index.html`, `skills/index.html`, `portfolio/index.html`, `faq/index.html`, `contact/index.html`, `blog/index.html`, `blog/post-template.html`

### If you edit a page's JSON-LD block

The hash is tied to the exact bytes of the script content. Editing the JSON-LD (adding a service, fixing a description, changing dates, etc.) without updating the hash means the browser will silently refuse to execute that script — no visible error to a site visitor, but the structured data stops being read by search engines and the browser console will show a CSP violation.

To regenerate the hash for a page, run from the project root (Git Bash / any shell with `openssl`):

```bash
awk '/<script type="application\/ld\+json">/{flag=1; next} /<\/script>/{if(flag){flag=0}} flag' PAGE.html \
  | openssl dgst -sha256 -binary \
  | openssl base64 -A
```

Replace `PAGE.html` with the file path (e.g. `about/index.html`). The command prints a base64 string — paste it into that page's CSP meta tag as `'sha256-<the string>='` (the trailing `=` from base64 padding is part of the value; the CSP hash format is `sha256-BASE64VALUE`).

The quickest way to confirm you got it right without running the command yourself: open the page in a browser with DevTools open. If the hash is wrong, the console prints a CSP violation error that includes the *correct* hash it expected — you can copy that directly.

### Why script-src doesn't just use `'unsafe-inline'`

`'unsafe-inline'` would accept *any* inline script, which defeats most of what CSP is for. Hashing the one legitimate inline block per page keeps that protection while still allowing the JSON-LD structured data every page needs for SEO.

### Why style-src includes `'unsafe-inline'`

The site uses scattered inline `style="..."` attributes (mostly one-off spacing tweaks) rather than one consolidated block, so hashing isn't practical there. This is a deliberate, lower-risk trade-off: no user input is ever written into a `style` attribute anywhere in the codebase, so there's no realistic injection path through it.

## What this CSP does not cover (hosting-dependent)

A `<meta http-equiv="Content-Security-Policy">` tag cannot set `frame-ancestors`, and browsers ignore that directive entirely when delivered this way (per the CSP spec). Clickjacking protection (`X-Frame-Options` or a real `Content-Security-Policy` HTTP header with `frame-ancestors`) requires the hosting layer to send real HTTP response headers. GitHub Pages does not support custom response headers. If clickjacking protection matters for your deployment, either:

- Put Cloudflare (free tier) in front of GitHub Pages and add the header there, or
- Host on a platform that supports header configuration for static sites (Netlify `_headers`, Vercel `vercel.json`, Cloudflare Pages `_headers`).

The same limitation applies to `X-Content-Type-Options: nosniff` and `Strict-Transport-Security` (though GitHub Pages does already enforce HTTPS automatically for `*.github.io` and verified custom domains).

## No secrets in this repo

There is no backend, no API keys, no environment variables, and no credentials anywhere in this codebase — verified by direct search, not assumed. See the security review delivered in-session for the full audit trail. `.gitignore` exists as a preventive measure for anything added later.
