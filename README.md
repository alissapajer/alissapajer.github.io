# alissapajer.github.io

Alissa Pajer's blog, built with [Hugo](https://gohugo.io/) (extended).

## Local development

```sh
brew install hugo        # extended build (needed for server-side math)
hugo server              # live preview at http://localhost:1313
```

## Writing a post

Add a Markdown file under `content/posts/`. Frontmatter:

```yaml
---
title: "My Post"
date: 2026-01-30
tags: ["math"]
---
```

- **Math** is rendered at build time via Hugo's embedded KaTeX (no client-side
  JavaScript). Use `$...$` for inline and `$$...$$` for display math.
- **URLs**: posts publish to `/posts/{slug}.html` by default. To pin an exact
  URL (e.g. to preserve an old link), set `url:` in frontmatter; add `aliases:`
  for any additional paths that should redirect to it.

## Layout

- `content/posts/` — blog posts
- `layouts/` — custom theme (no external theme dependency)
- `static/` — images, favicon, vendored KaTeX CSS/fonts, site CSS
- `hugo.toml` — site config
- `.github/workflows/hugo.yml` — builds and deploys to GitHub Pages

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which builds the site
and deploys it to GitHub Pages.

> **One-time setup:** in the repo's **Settings → Pages**, set **Source** to
> **GitHub Actions**.
