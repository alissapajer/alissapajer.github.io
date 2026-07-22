import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { SITE } from "../site.ts";

export async function GET(context) {
  const posts = (await getCollection("posts")).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf(),
  );
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      link: post.data.url,
    })),
  });
}
