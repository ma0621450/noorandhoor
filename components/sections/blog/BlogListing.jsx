import Link from "next/link";
import { X } from "lucide-react";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/ui/BlogCard";
import FeaturedPost from "@/components/sections/blog/FeaturedPost";
import Pagination from "@/components/ui/Pagination";
import { BLOG_CATEGORIES } from "@/components/sections/blog/blogData";
import { CONTACT_FORM_HREF } from "@/components/sections/contact/contactData";
import { pickHeroPost } from "@/lib/blog/public";
import { postHasTag, tagLabelForSlug } from "@/lib/blog/tags";
import {
  LISTING_PAGE_SIZE,
  listingPageHref,
  paginateItems,
} from "@/lib/listingPagination";

export const BLOGS_PER_PAGE = LISTING_PAGE_SIZE;

function listingParams(category, tag) {
  const params = new URLSearchParams();
  if (category && category !== "All") params.set("category", category);
  if (tag) params.set("tag", tag);
  return params;
}

function categoryHref(category, tag) {
  return listingPageHref(
    "/blog",
    1,
    listingParams(category, tag),
    "blog-listings",
  );
}

function blogPageHref(category, tag, pageNumber) {
  return listingPageHref(
    "/blog",
    pageNumber,
    listingParams(category, tag),
    "blog-listings",
  );
}

export default function BlogListing({
  activeCategory = "All",
  activeTag = "",
  posts = [],
  page = 1,
}) {
  const activeTagLabel = tagLabelForSlug(posts, activeTag);
  const featured = pickHeroPost(posts);
  const remaining = featured
    ? posts.filter((post) => post.slug !== featured.slug)
    : [];
  const matchesFilters = (post) =>
    postHasTag(post, activeTag) &&
    (activeCategory === "All" || post.category === activeCategory);
  const filtered = remaining.filter(matchesFilters);
  const showFeatured = Boolean(featured) && matchesFilters(featured);

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
              <Link
                key={category}
                href={categoryHref(category, activeTag)}
                scroll={false}
                className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[1.3px] transition-colors duration-200 ${
                  isActive
                    ? "border-[#ba8a44] bg-[#ba8a44] text-white"
                    : "border-white/15 bg-transparent text-white/70 hover:border-[#ba8a44] hover:text-[#eec876]"
                }`}
              >
                {category}
              </Link>
            );
          })}
        </div>

        {activeTag ? (
          <div className="mt-5 flex justify-center">
            <Link
              href={categoryHref(activeCategory, "")}
              className="inline-flex items-center gap-2 rounded-full border border-[#ba8a44]/40 bg-[#ba8a44]/10 px-4 py-2 text-xs font-medium capitalize text-[#eec876] transition hover:border-[#eec876] hover:text-white"
            >
              {activeTagLabel}
              <X className="h-3.5 w-3.5" />
              <span className="sr-only">Clear tag</span>
            </Link>
          </div>
        ) : null}

        {showFeaturedOnPage ? <FeaturedPost post={featured} /> : null}

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
              ? "No articles match this filter yet."
              : "No articles published yet."}
          </p>
        ) : null}

        {filtered.length ? (
          <Pagination
            label="Blog pagination"
            currentPage={currentPage}
            totalPages={totalPages}
            hrefForPage={(pageNumber) =>
              blogPageHref(activeCategory, activeTag, pageNumber)
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
