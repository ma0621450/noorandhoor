import OffPlanListingCard from "@/components/sections/offplan/OffPlanListingCard";

export default function OffPlanRelated({
  basePath,
  properties = [],
  heading = "Explore Similar Offplan Properties",
}) {
  if (!properties.length) return null;

  return (
    <section className="w-full bg-[#111111] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <div className="mb-8 flex flex-col items-center gap-4 text-center sm:mb-10">
          <p className="text-xs font-normal uppercase leading-[26px] text-[#F5F5F5]">
            related properties
          </p>
          <h2 className="text-gold-gradient m-0 max-w-[900px]">{heading}</h2>
        </div>

        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 lg:grid-cols-4">
          {properties.map((property) => (
            <OffPlanListingCard
              key={`${property.basePath || basePath}-${property.slug}`}
              property={property}
              basePath={property.basePath || basePath}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
