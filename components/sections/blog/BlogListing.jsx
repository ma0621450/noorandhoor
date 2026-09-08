import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/ui/BlogCard";
import MediaImage from "@/components/ui/MediaImage";
import Pagination from "@/components/ui/Pagination";
import { BLOG_CATEGORIES } from "@/components/sections/blog/blogData";
import { CONTACT_FORM_HREF } from "@/components/sections/contact/contactData";
import { pickHeroPost } from "@/lib/blog/public";
import {
  LISTING_PAGE_SIZE,
  listingPageHref,
  paginateItems,
} from "@/lib/listingPagination";

export const BLOGS_PER_PAGE = LISTING_PAGE_SIZE;

function categoryHref(category) {
  const path =
    category === "All"
      ? "/blog"
      : `/blog?category=${encodeURIComponent(category)}`;
  return `${path}#blog-listings`;
}

function blogPageHref(category, pageNumber) {
  const params = new URLSearchParams();
  if (category && category !== "All") params.set("category", category);
  return listingPageHref("/blog", pageNumber, params, "blog-listings");
}

export default function BlogListing({
  activeCategory = "All",
  posts = [],
  page = 1,
}) {
  const featured = pickHeroPost(posts);
  const remaining = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : [];
  const filtered =
    activeCategory === "All"
      ? remaining
      : remaining.filter((post) => post.category === activeCategory);
  const showFeatured =
    Boolean(featured) &&
    (activeCategory === "All" || featured.category === activeCategory);

  const { currentPage, totalPages, pageItems } = paginateItems(
    filtered,
    page,
    BLOGS_PER_PAGE,
  );
  const showFeaturedOnPage = showFeatured && currentPage === 1;

  return (
    <div id="blog-listings" className="scroll-mt-28 bg-[#111] pb-16 sm:pb-20 lg:pb-24">
      <section className="section-inner pt-10 sm:pt-12">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {BLOG_CATEGORIES.map((category) => {
            const isActive = category === activeCategory;
            return (
              <a
                key={category}
                href={categoryHref(category)}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[1.3px] transition-colors duration-200 ${
                  isActive
                    ? "border-[#ba8a44] bg-[#ba8a44] text-white"
                    : "border-white/15 bg-transparent text-white/70 hover:border-[#ba8a44] hover:text-[#eec876]"
                }`}
              >
                {category}
              </a>
            );
          })}
        </div>

        {showFeaturedOnPage ? (
          <Link
            href={`/blog/${featured.slug}`}
            className="group mt-10 grid overflow-hidden rounded-2xl border border-[#ba8a44]/40 bg-[#121212] transition-colors hover:border-[#ba8a44] lg:mt-14 lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
              <MediaImage
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
            </div>
            <div className="flex flex-col justify-center gap-4 p-6 sm:p-8 lg:p-12">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md bg-gradient-to-r from-[#BC8741] to-[#D6A85E] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.96px] text-white">
                  {featured.category}
                </span>
                <p className="text-xs font-medium text-[#ba8a44]">{featured.date}</p>
              </div>
              <h2 className="!font-accent text-2xl font-normal uppercase leading-snug tracking-wide text-white transition-colors duration-300 sm:text-3xl group-hover:text-[#ba8a44]">
                {featured.title}
              </h2>
              <p className="text-sm leading-7 text-white/75 sm:text-base">
                {featured.excerpt}
              </p>
              <span className="mt-2 flex w-fit items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#ba8a44] transition-all duration-300 group-hover:gap-2">
                Read Article
                <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </span>
            </div>
          </Link>
        ) : null}

        {pageItems.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
            {pageItems.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>
        ) : null}

        {!showFeaturedOnPage && pageItems.length === 0 ? (
          <p className="mt-12 text-center text-sm text-white/60">
            {posts.length
              ? "No articles in this category yet."
              : "No articles published yet."}
          </p>
        ) : null}

        {filtered.length ? (
          <Pagination
            label="Blog pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            hrefForPage={(pageNumber) =>
              blogPageHref(activeCategory, pageNumber)
            }
          />
        ) : null}

        <div className="mt-16 rounded-2xl bg-[#171717] px-6 py-10 text-center sm:px-10 sm:py-12">
          <h2 className="text-gold-gradient text-3xl sm:text-4xl">
            Want Market Updates Delivered To You?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Subscribe to get the latest property trends, price updates, and
            expert tips, straight to your inbox.
          </p>
          <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#newsletter" className="px-7 py-3 text-sm">
              Subscribe to Newsletter
            </Button>
            <Button
              href={CONTACT_FORM_HREF}
              variant="secondary"
              className="px-7 py-3 text-sm"
            >
              Talk to a Specialist
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
