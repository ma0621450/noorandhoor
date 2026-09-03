import Button from "@/components/ui/Button";
import BlogCard from "@/components/ui/BlogCard";
import { getLatestPosts } from "@/lib/blog/queries";

export default async function Blogs() {
  const posts = await getLatestPosts(3);

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

        <Button
          href="/blog#blog-listings"
          variant="secondary"
          className="w-full sm:w-auto lg:self-start"
        >
          View All Articles
        </Button>
      </div>

      {posts.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
          {posts.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-white/45">
          New articles will appear here once they are published.
        </p>
      )}
    </section>
  );
}
