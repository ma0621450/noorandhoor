import PropertyHero from "@/components/common/PropertyHero";
import BlogListing from "@/components/sections/blog/BlogListing";
import { BLOG_CATEGORIES } from "@/components/sections/blog/blogData";
import { getPublishedPosts } from "@/lib/blog/queries";
import { getCategoryFromSearchParams, getPageFromSearchParams } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Blog | Noor & Hoor Properties",
  description:
    "Read Dubai real estate market insights, off-plan guidance, and buying advice from Noor & Hoor Properties.",
};

export default async function BlogPage({ searchParams }) {
  const [activeCategory, posts, page] = await Promise.all([
    getCategoryFromSearchParams(searchParams, BLOG_CATEGORIES),
    getPublishedPosts(),
    getPageFromSearchParams(searchParams),
  ]);

  return (
    <>
      <PropertyHero variant="blog" />
      <BlogListing
        activeCategory={activeCategory}
        posts={posts}
        page={page}
      />
    </>
  );
}
