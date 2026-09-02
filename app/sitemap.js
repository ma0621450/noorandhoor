import { BUY_CATEGORIES } from "@/components/sections/buy-category/categoryConfig";
import { RENT_CATEGORIES } from "@/components/sections/rent-properties/rentCategoryConfig";
import { SELL_CATEGORIES } from "@/components/sections/sell-properties/sellCategoryConfig";
import { OFF_PLAN_CATEGORIES } from "@/components/sections/offplan/offplanCategoryConfig";
import { getPublishedPosts } from "@/lib/blog/queries";
import { SITE_URL } from "@/lib/seo";

function categoryEntries(groups) {
  return Object.values(groups).flatMap((category) => {
    const listing = {
      url: `${SITE_URL}${category.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    };

    return [listing];
  });
}

export default async function sitemap() {
  const posts = await getPublishedPosts();

  const staticRoutes = [
    "",
    "/buy",
    "/rent",
    "/sell",
    "/off-plan",
    "/developers",
    "/about-us",
    "/contact",
    "/blog",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));

  const blogs = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  return [
    ...staticRoutes,
    ...categoryEntries(BUY_CATEGORIES),
    ...categoryEntries(RENT_CATEGORIES),
    ...categoryEntries(SELL_CATEGORIES),
    ...categoryEntries(OFF_PLAN_CATEGORIES),
    ...blogs,
  ];
}
