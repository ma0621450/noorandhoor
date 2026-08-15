import ApartmentPropertyCard from "@/components/sections/apartments/ApartmentPropertyCard";
import { RELATED_PROPERTIES } from "@/components/sections/detail/detailData";

export default function DetailRelated({
  basePath = "/buy/apartments",
  eyebrow = "Related Properties",
  heading = "Explore Similar Properties",
  properties = RELATED_PROPERTIES,
}) {
  return (
    <section className="section-full bg-[#111] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
            {eyebrow}
          </p>
          <h2 className="text-gold-gradient">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <ApartmentPropertyCard
              key={property.id}
              property={property}
              basePath={basePath}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
