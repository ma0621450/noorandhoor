import { BUY_CATEGORIES } from "@/components/sections/buy-category/categoryConfig";
import { RENT_CATEGORIES } from "@/components/sections/rent-properties/rentCategoryConfig";
import { SELL_CATEGORIES } from "@/components/sections/sell-properties/sellCategoryConfig";
import { OFF_PLAN_CATEGORIES } from "@/components/sections/offplan/offplanCategoryConfig";
import { BLOG_POSTS } from "@/components/sections/blog/blogData";
import { SITE_URL } from "@/lib/seo";

function categoryEntries(groups) {
  return Object.values(groups).flatMap((category) => {
    const listing = {
      url: `${SITE_URL}${category.path}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    };

    const details = [...new Set(category.homes.map((home) => home.slug))].map(
      (slug) => ({
        url: `${SITE_URL}${category.path}/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.6,
      }),
    );

    return [listing, ...details];
  });
}

export default function sitemap() {
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

  const blogs = BLOG_POSTS.map((post) => ({
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
