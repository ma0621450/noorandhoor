import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const BlogCard = ({ blog }) => {
  const { image, title, date, excerpt, slug, category } = blog;
  const href = slug ? `/blog/${slug}` : undefined;

  return (
    <article className="group relative overflow-hidden rounded-xl border border-[#ba8a44]/40 bg-[#121212]">
      {href && (
        <Link href={href} className="absolute inset-0 z-[1]" aria-label={title} />
      )}
      <div className="transition-transform duration-300 ease-out group-hover:scale-102">
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-3 p-5">
          <div className="flex flex-wrap items-center gap-2">
            {category ? (
              <span className="text-[10px] font-semibold uppercase tracking-[0.96px] text-[#eec876]">
                {category}
              </span>
            ) : null}
            <p className="text-xs font-medium text-[#ba8a44]">{date}</p>
          </div>
          <h3 className="!font-accent text-md min-h-12 font-normal uppercase leading-snug tracking-wide text-white transition-colors duration-300 line-clamp-2 group-hover:text-[#ba8a44]">
            {title}
          </h3>
          <p className="line-clamp-3 text-xs leading-relaxed text-white">
            {excerpt}
          </p>
          <span className="mt-1 flex w-fit items-center gap-1 text-xs font-semibold uppercase tracking-wide text-[#ba8a44] transition-all duration-300 group-hover:gap-2">
            Read More
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogCard;
