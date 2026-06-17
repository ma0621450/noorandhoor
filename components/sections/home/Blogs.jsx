import Button from "@/components/ui/Button";
import BlogCard from "@/components/ui/BlogCard";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carousel2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carousel3 from "@/public/images/landingpage/landingpagecarousel3.jpg";

const BLOGS = [
  {
    id: 1,
    image: carousel1,
    date: "March 12, 2026",
    title: "Dubai Property Market Trends to Watch",
    excerpt:
      "Explore the latest shifts in Dubai's real estate market, from rising demand in waterfront communities to new off-plan launches shaping investor opportunities across the UAE.",
  },
  {
    id: 2,
    image: carousel2,
    date: "March 8, 2026",
    title: "A Smart Guide to Off-Plan Investments",
    excerpt:
      "Learn how off-plan properties work, what to evaluate before buying, and how to secure strong returns with the right developer, payment plan, and location strategy.",
  },
  {
    id: 3,
    image: carousel3,
    date: "March 3, 2026",
    title: "Top Areas to Buy Property in Dubai",
    excerpt:
      "From Dubai Marina to Business Bay, discover the neighborhoods offering the best lifestyle, rental yields, and long-term value for homeowners and investors alike.",
  },
];

export default function Blogs() {
  return (
    <section className="section-container py-12 sm:py-16">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-start lg:justify-between lg:gap-8">
        <div className="flex min-w-0 flex-col gap-4">
          <h3 className="section-sub-heading">Blog & Latest News</h3>
          <div>
            <h2 className="mb-2 text-gold-gradient max-w-full sm:max-w-[640px]">
              Dubai Real Estate Market Insights
            </h2>
            <div className="h-[4px] w-25 bg-[#B3813D]" />
          </div>
          <p className="text-md font-medium">
            Get the latest property updates, expert investment tips, and market
            trends delivered straight to you.
          </p>
        </div>

        <Button
          variant="secondary"
          className="w-full shrink-0 sm:w-auto lg:self-start"
        >
          View All Articles
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
        {BLOGS.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
