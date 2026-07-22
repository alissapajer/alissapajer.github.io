// @ts-check
import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkImageAttr from "./src/plugins/remark-image-attr.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://alissapajer.github.io",

  // Mirror the on-disk page structure so posts publish as `/posts/<slug>.html`
  // (pinned legacy URLs) while listing pages stay `/posts/`, `/tags/`, etc.
  build: { format: "preserve" },
  trailingSlash: "ignore",

  integrations: [sitemap()],

  vite: {
    resolve: {
      // WASM interactives (built by rust/build.sh into src/wasm/<crate>/) are
      // imported as `@wasm/<crate>`. Vite bundles the JS glue and emits the
      // sibling .wasm as a fingerprinted asset.
      alias: {
        "@wasm": fileURLToPath(new URL("./src/wasm", import.meta.url)),
      },
    },
  },

  markdown: {
    // Render math at build time (no client-side JavaScript), matching the
    // previous Hugo/KaTeX setup. Only `$...$` and `$$...$$` are treated as math.
    remarkPlugins: [remarkMath, remarkImageAttr],
    rehypePlugins: [[rehypeKatex, { throwOnError: false }]],
    // Code blocks were previously unstyled (Chroma classes with no stylesheet);
    // emit plain <pre><code> to match, letting site CSS handle appearance.
    syntaxHighlight: false,
    smartypants: false,
    gfm: true,
  },
});
