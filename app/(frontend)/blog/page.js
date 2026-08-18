import PropertyHero from "@/components/common/PropertyHero";
import BlogListing from "@/components/sections/blog/BlogListing";

export const metadata = {
  title: "Blog | Noor & Hoor Properties",
  description:
    "Read Dubai real estate market insights, off-plan guidance, and buying advice from Noor & Hoor Properties.",
};

export default function BlogPage() {
  return (
    <>
      <PropertyHero variant="blog" />
      <BlogListing />
    </>
  );
}
