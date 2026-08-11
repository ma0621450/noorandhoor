import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

const CommunityCard = ({
  image,
  title,
  subtitle,
  description,
  href = "#",
  width = 350,
}) => {
  return (
    <article
      className="flex shrink-0 flex-col overflow-hidden rounded-xl border border-[#ba8a44] bg-[#121212]"
      style={{ width }}
    >
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes={`${width}px`}
          className="object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 p-5">
        <h3 className="!font-accent text-sm font-normal uppercase tracking-wide text-white/80">
          {title}
        </h3>
        <p className="text-lg font-medium text-[#ba8a44]">{subtitle}</p>
        <p className="text-xs leading-relaxed text-white/90">{description}</p>
        <Link
          href={href}
          className="mt-2 flex w-fit items-center text-sm font-semibold tracking-wide text-[#ba8a44] transition-all hover:gap-1 hover:!text-[#ba8a44]"
        >
          full guide
          <ChevronRight className="h-4 w-4" strokeWidth={2.5} />
        </Link>
      </div>
    </article>
  );
};

export default CommunityCard;
