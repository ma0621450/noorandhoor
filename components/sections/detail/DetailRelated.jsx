import PropertyCard from "@/components/ui/PropertyCard";
import { RELATED_PROPERTIES } from "@/components/sections/detail/detailData";

export default function DetailRelated({
  basePath = "/buy/apartments",
  eyebrow = "Related Properties",
  heading = "Explore Similar Properties",
  properties = RELATED_PROPERTIES,
}) {
  if (!properties.length) return null;

  return (
    <section className="section-full bg-[#111] py-10 sm:py-14">
      <div className="section-inner">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="section-sub-heading">{eyebrow}</p>
          <h2 className="text-gold-gradient">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id || property.slug}
              property={property}
              basePath={property.basePath || basePath}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
