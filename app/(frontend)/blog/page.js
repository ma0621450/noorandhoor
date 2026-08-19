import PropertyHero from "@/components/common/PropertyHero";
import BlogListing from "@/components/sections/blog/BlogListing";
import { BLOG_CATEGORIES } from "@/components/sections/blog/blogData";
import { getCategoryFromSearchParams } from "@/lib/seo";

export const metadata = {
  title: "Blog | Noor & Hoor Properties",
  description:
    "Read Dubai real estate market insights, off-plan guidance, and buying advice from Noor & Hoor Properties.",
};

export default async function BlogPage({ searchParams }) {
  const activeCategory = await getCategoryFromSearchParams(
    searchParams,
    BLOG_CATEGORIES,
  );

  return (
    <>
      <PropertyHero variant="blog" />
      <BlogListing activeCategory={activeCategory} />
    </>
  );
}
