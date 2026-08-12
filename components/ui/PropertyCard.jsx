import Image from "next/image";
import { Bed, Bath, Scan, Heart } from "lucide-react";
import Badge from "@/components/ui/Badge";

const PropertyCard = ({ property, badge = "Featured" }) => {
  const { image, title, location, features, price, featured } = property;

  return (
    <article className="group flex w-full max-w-[257px] cursor-pointer flex-col overflow-hidden rounded-xl border border-[#ba8a44] bg-[#121212] transition-all duration-200 hover:border-[#eec876] hover:shadow-[0_0_0_1px_rgba(238,200,118,0.35)] sm:max-w-none">
      <div className="relative aspect-[257/217] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 257px"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {featured && (
          <div className="absolute left-3 top-3">
            <Badge variant="gold">{badge}</Badge>
          </div>
        )}

        <button
          type="button"
          aria-label="Add to favorites"
          className="absolute right-3 top-3 cursor-pointer text-white transition hover:scale-110 hover:text-[#eec876]"
        >
          <Heart className="h-[16px] w-[17px]" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col gap-2 px-4 py-4">
        <h3 className="!font-accent mb-1 text-sm font-normal uppercase text-white">
          {title}
        </h3>
        <p className="text-xs font-medium text-white">{location}</p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 stroke-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">{features.bedroom} bed</span>
          </span>
          <span className="text-white/50">•</span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 stroke-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">{features.bathroom} bath</span>
          </span>
          <span className="text-white/50">•</span>
          <span className="flex items-center gap-1.5">
            <Scan className="h-4 w-4 stroke-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">
              {features.area.toLocaleString()}Sq Ft
            </span>
          </span>
        </div>

        <p className="text-xl font-bold">
          <span className="!font-accent text-[#ba8a44]">AED </span>
          <span className="!font-accent text-white">
            {price.toLocaleString()}
          </span>
        </p>
      </div>
    </article>
  );
};

export default PropertyCard;
