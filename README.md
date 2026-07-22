# alissapajer.github.io

Alissa Pajer's blog, built with [Astro](https://astro.build/).

## Local development

```sh
npm install
npm run dev        # live preview at http://localhost:4321
npm run build      # production build into dist/
npm run preview    # serve the production build locally
```

Requires Node 18.20.8+, 20.3+, or 22+.

## Writing a post

Add a Markdown file under `src/content/posts/`. Frontmatter:

```yaml
---
title: "My Post"
date: 2026-01-30
tags: ["math"]
url: /posts/my-post.html
aliases: ["/posts/old-path.html"]
---
```

- **`url`** (required) pins the published path. Posts publish to exactly this
  URL, e.g. `/posts/my-post.html`.
- **`aliases`** (optional) are legacy paths that redirect to `url` (each becomes
  a small `<meta refresh>` page).
- **`tags`** (optional) drive the `/tags/` and `/tags/{tag}/` pages.
- **Math** is rendered at build time via `remark-math` + `rehype-katex` (no
  client-side JavaScript). Use `$...$` for inline and `$$...$$` for display math.
- **Image width**: follow a standalone image with a `{width="25%"}` line to set
  its width (handled by `src/plugins/remark-image-attr.mjs`).
- Raw HTML in Markdown is passed through as-is.

## Layout

- `src/content/posts/` — blog posts (Markdown)
- `src/pages/` — routes (home, `/posts/`, `/tags/`, post pages, RSS)
- `src/layouts/Base.astro` — shared page shell
- `src/plugins/` — custom remark plugins
- `public/` — static assets served verbatim (CSS, images, favicon, vendored
  KaTeX CSS/fonts)
- `astro.config.mjs` — site config and Markdown pipeline
- `.github/workflows/deploy.yml` — builds and deploys to GitHub Pages

## Deployment

Pushing to `main` triggers the GitHub Actions workflow, which builds the site
with Astro and deploys `dist/` to GitHub Pages.

> **One-time setup:** in the repo's **Settings → Pages**, set **Source** to
> **GitHub Actions**.
