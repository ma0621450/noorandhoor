import Image from "next/image";
import { Bed, Bath, Scan, Heart } from "lucide-react";
import Badge from "@/components/ui/Badge";

const PropertyCard = ({ property, badge = "Featured" }) => {
  const { image, title, location, features, price, featured } = property;
  return (
    <article className="flex flex-col overflow-hidden rounded-xl bg-[#121212] border border-[#ba8a44]">
      <div className="relative aspect-[4/3] w-full">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover w-full h-full"
        />
        {featured && (
          <div className="absolute left-4 top-4">
            <Badge variant="gold">{badge}</Badge>
          </div>
        )}

        <button
          type="button"
          aria-label="Add to favorites"
          className="absolute right-4 top-4 text-white transition hover:scale-110"
        >
          <Heart className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex flex-col gap-2 px-4 py-4">
        <div className="flex flex-col gap-1">
          <h3 className="!font-accent text-sm font-normal uppercase text-white mb-2">
            {title}
          </h3>
          <p className="text-xs text-white font-medium">{location}</p>
        </div>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-white">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 stroke-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">
            {features.bedroom}
            </span>
          </span>
          <span className="text-white/50">•</span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 stroke-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">
            {features.bathroom}
            </span>
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
          <span className="!font-accent text-white">{price.toLocaleString()}</span>
        </p>
      </div>
    </article>
  );
};

export default PropertyCard;
