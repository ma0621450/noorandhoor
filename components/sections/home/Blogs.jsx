import Link from "next/link";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/ui/BlogCard";
import { LATEST_POSTS } from "@/components/sections/blog/blogData";

export default function Blogs() {
  return (
    <section className="section-container">
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

        <Link href="/blog" className="w-full shrink-0 sm:w-auto lg:self-start">
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
          >
            View All Articles
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
        {LATEST_POSTS.map((blog) => (
          <BlogCard key={blog.id} blog={blog} />
        ))}
      </div>
    </section>
  );
}
