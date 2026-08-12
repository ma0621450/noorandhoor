import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const CommunityCard = ({
  image,
  title,
  subtitle,
  description,
  href = "#",
  width = 346,
}) => {
  return (
    <article
      className="group flex shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border border-[#ba8a44] bg-[#121212] transition-all duration-200 hover:border-[#eec876] hover:shadow-[0_0_0_1px_rgba(238,200,118,0.35)]"
      style={{ width }}
    >
      <div className="relative h-[215px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes={`${width}px`}
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex min-h-[198px] flex-col gap-2 p-5">
        <h3 className="!font-accent text-sm font-normal uppercase tracking-wide text-white/80">
          {title}
        </h3>
        <p className="text-lg font-medium text-[#ba8a44]">{subtitle}</p>
        <p className="text-xs leading-relaxed text-white/90">{description}</p>
        <Link
          href={href}
          className="mt-auto flex w-fit cursor-pointer items-center gap-1 text-sm font-semibold tracking-wide text-[#ba8a44] transition-all hover:gap-2 hover:!text-[#eec876]"
        >
          full guide
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
};

export default CommunityCard;
