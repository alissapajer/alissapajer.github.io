import { visit } from "unist-util-visit";

/**
 * Honor Pelican/Hugo-style image attribute lines. In the Markdown, a standalone
 * image may be immediately followed by an attribute token on the next line:
 *
 *     ![Torus](/images/pyramid/torus.jpg "torus")
 *     {width="25%"}
 *
 * CommonMark parses the image and the `{width="25%"}` token into the same
 * paragraph (separated by a soft line break). This plugin finds an image node
 * whose next sibling text begins with such a token, applies the width as an
 * inline style on the image, and strips the token from the text.
 */
const TOKEN = /^\s*\{width="([^"]+)"\}[^\S\n]*\n?/;

export default function remarkImageAttr() {
  return (tree) => {
    visit(tree, "paragraph", (paragraph) => {
      const children = paragraph.children;
      for (let i = 0; i < children.length; i++) {
        const node = children[i];
        if (node.type !== "image") continue;
        const next = children[i + 1];
        if (!next || next.type !== "text") continue;
        const match = next.value.match(TOKEN);
        if (!match) continue;

        const width = match[1];
        node.data = node.data || {};
        node.data.hProperties = {
          ...(node.data.hProperties || {}),
          style: `width:${width};`,
        };

        // Remove the consumed token (and its trailing newline) from the text.
        next.value = next.value.slice(match[0].length);
        if (next.value.length === 0) {
          children.splice(i + 1, 1);
        }
      }
    });
  };
}
