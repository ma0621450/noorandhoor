import Link from "next/link";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";
import { OFF_PLAN_PROPERTIES } from "@/components/sections/offplan/offPlanProperties";

export default function OffPlanFeatured() {
  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col items-center gap-6 text-center sm:mb-12 lg:mb-12 lg:flex-row lg:items-center lg:justify-between lg:text-left">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <h3 className="section-sub-heading">Featured Properties</h3>
          <h2 className="text-gold-gradient text-[clamp(1.5rem,3.2vw,2.875rem)] leading-[1.04] lg:leading-[48px]">
            <span className="block sm:whitespace-nowrap">Explore Off-Plan Apartments</span>
            <span className="block sm:whitespace-nowrap">and Homes in Dubai</span>
          </h2>
        </div>

        <Link href="/off-plan/apartments" className="w-full sm:w-auto">
          <Button
            variant="secondary"
            className="h-[58px] w-full shrink-0 rounded-xl px-10 text-[13px] tracking-[1.3px] sm:w-[234px]"
          >
            View Properties
          </Button>
        </Link>
      </div>

      <div className="flex flex-col gap-8">
        <p className="text-xs font-normal uppercase tracking-[2.2px] text-[#E9C349]">
          Apartments
        </p>

        <div className="grid grid-cols-1 gap-[30px] sm:grid-cols-2 xl:grid-cols-4">
          {OFF_PLAN_PROPERTIES.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              className="mx-auto max-w-none"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
