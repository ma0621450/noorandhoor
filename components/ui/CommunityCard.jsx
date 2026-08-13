import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const CommunityCard = ({
  image,
  title,
  subtitle,
  description,
  averageRent,
  ctaLabel = "full guide",
  href = "#",
  width = 346,
}) => {
  return (
    <article
      className="group flex shrink-0 cursor-pointer flex-col overflow-hidden rounded-xl border-2 border-[rgba(212,175,55,0.4)] bg-[#0E1112] transition-all duration-200 hover:border-[#eec876] hover:shadow-[0_0_0_1px_rgba(238,200,118,0.35)]"
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

      <div className="flex min-h-[243px] flex-col gap-[8.5px] p-[21px]">
        <h3 className="!font-accent text-lg font-normal uppercase text-white">
          {title}
        </h3>
        <p className="text-base font-semibold text-[#E9C349]">{subtitle}</p>
        <p className="text-base font-medium leading-[23px] text-[#f5f5f5]">
          {description}
        </p>
        {averageRent && (
          <p className="text-base font-semibold text-[#E9C349]">{averageRent}</p>
        )}
        <Link
          href={href}
          className="mt-auto flex w-fit cursor-pointer items-center gap-2.5 text-base font-bold text-[#E9C349] transition-all hover:gap-3 hover:!text-[#eec876]"
        >
          {ctaLabel}
          <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
};

export default CommunityCard;
