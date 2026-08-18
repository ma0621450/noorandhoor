import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import BlogCard from "@/components/ui/BlogCard";
import { getRelatedPosts } from "@/components/sections/blog/blogData";

export default function BlogArticle({ post }) {
  const related = getRelatedPosts(post.slug);

  return (
    <div className="min-h-screen bg-[#111] pt-28 pb-16 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24">
      <article className="section-inner">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#eec876]"
        >
          <ArrowLeft className="h-4 w-4" strokeWidth={2} />
          Back to Blog
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="rounded-md bg-gradient-to-r from-[#BC8741] to-[#D6A85E] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.96px] text-white">
            {post.category}
          </span>
          <p className="text-xs font-medium text-[#ba8a44] sm:text-sm">
            {post.date}
          </p>
        </div>

        <h1 className="detail-heading text-gold-gradient mt-5">
          {post.title}
        </h1>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-[#ba8a44]/30 sm:mt-10">
          <Image
            src={post.image}
            alt={post.title}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1280px"
            className="object-cover"
          />
        </div>

        <div className="mt-8 space-y-5 text-sm leading-7 text-white/75 sm:mt-10 sm:text-base">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {post.items?.length ? (
          <ul className="mt-8 space-y-3 rounded-2xl border border-white/10 bg-[#171717] p-6 sm:p-8">
            {post.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-7 text-white/80 sm:text-base"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#ba8a44]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-12 rounded-2xl bg-[#171717] px-6 py-10 text-center sm:px-10">
          <h2 className="text-gold-gradient text-3xl sm:text-4xl">
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70">
            Speak with Noor &amp; Hoor Properties about buying, selling,
            renting, or investing in Dubai.
          </p>
          <Link href="/contact" className="mt-7 inline-flex">
            <Button className="px-7 py-3 text-sm">Contact Our Team</Button>
          </Link>
        </div>

        {related.length > 0 && (
          <section className="mt-16 sm:mt-20">
            <div className="mb-8 flex flex-col gap-3 sm:mb-10">
              <p className="section-sub-heading">Keep Reading</p>
              <h2 className="text-gold-gradient">Related Articles</h2>
              <div className="h-[4px] w-25 bg-[#B3813D]" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 xl:grid-cols-3">
              {related.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  );
}
