import ApartmentPropertyCard from "@/components/sections/apartments/ApartmentPropertyCard";
import { RELATED_PROPERTIES } from "@/components/sections/detail/detailData";

export default function DetailRelated() {
  return (
    <section className="section-full bg-[#111] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-10">
        <div className="mb-10 flex flex-col items-center gap-3 text-center">
          <p className="text-xs font-normal uppercase tracking-[2.2px] text-white">
            Related Properties
          </p>
          <h2 className="text-gold-gradient">Explore Similar Properties</h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {RELATED_PROPERTIES.map((property) => (
            <ApartmentPropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
}
