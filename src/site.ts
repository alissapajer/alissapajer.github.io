export const SITE = {
  title: "Alissa Pajer's Blog",
  author: "Alissa Pajer",
  description: "Alissa Pajer's Blog",
} as const;

/** Basename slug for a pinned post URL, e.g. "/posts/lambdacalc.html" -> "lambdacalc". */
export function slugFromUrl(url: string): string {
  return url.replace(/^\/posts\//, "").replace(/\.html$/, "");
}

/** Slugify a tag for use in a URL, e.g. "Category Theory" -> "category-theory". */
export function urlize(tag: string): string {
  return tag.toLowerCase().replace(/\s+/g, "-");
}

/** Title-case a tag for display, matching Hugo's default taxonomy titling. */
export function titleCase(tag: string): string {
  return tag.replace(/\b\w/g, (c) => c.toUpperCase());
}
