"use client";

import { Search } from "lucide-react";
import Dropdown, { DropdownGroup } from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button";

const FILTER_BORDER =
  "max-[639px]:border-b max-[639px]:border-white/25 max-[639px]:last:border-b-0 max-[1023px]:w-full max-[1023px]:min-w-0 min-[1024px]:border-r min-[1024px]:border-white/25 min-[1024px]:last:border-r-0";

const FILTERS = [
  {
    id: "offplan-property-type",
    placeholder: "Property Type",
    width: "min-[1024px]:w-[180px] xl:w-[217px]",
    options: ["Commercial", "Residential", "Default"],
  },
  {
    id: "offplan-property-status",
    placeholder: "Property Status",
    width: "min-[1024px]:w-[180px] xl:w-[217px]",
    options: ["Ready", "off plan", "Development phase"],
  },
  {
    id: "offplan-sales-status",
    placeholder: "Sales Status",
    width: "min-[1024px]:w-[180px] xl:w-[217px]",
    options: ["Available property", "Prelunch", "Sold out property"],
  },
  {
    id: "offplan-developer",
    placeholder: "Developer",
    width: "min-[1024px]:w-[150px] xl:w-[187px]",
    options: ["Emaar", "Damac", "Sobha", "Azizi", "Nakheel"],
  },
  {
    id: "offplan-location",
    placeholder: "Location",
    width: "min-[1024px]:w-[180px] xl:w-[217px]",
    options: ["Dubai Marina", "Downtown", "Palm Jumeirah", "Business Bay", "JBR"],
  },
];

export default function OffPlanFilterBar() {
  return (
    <div className="relative z-50 flex w-full max-w-[1115px] flex-col items-stretch gap-3 min-[1024px]:flex-row min-[1024px]:items-center">
      <div className="w-full rounded-[10px] border border-white/20 bg-white/20 backdrop-blur-[6px] max-[1023px]:grid max-[1023px]:grid-cols-1 min-[640px]:max-[1023px]:grid-cols-2 min-[1024px]:flex min-[1024px]:h-14 min-[1024px]:overflow-visible min-[1024px]:rounded-[10px] min-[1024px]:border-0">
        <DropdownGroup>
          {FILTERS.map((filter) => (
            <Dropdown
              key={filter.id}
              id={filter.id}
              options={filter.options}
              placeholder={filter.placeholder}
              compact
              className={`!min-w-0 text-base font-semibold capitalize xl:text-lg min-[1024px]:h-14 ${filter.width} ${FILTER_BORDER} ${
                filter.id === "offplan-property-type"
                  ? "min-[1024px]:rounded-l-[10px]"
                  : ""
              } ${
                filter.id === "offplan-location"
                  ? "min-[1024px]:rounded-r-[10px]"
                  : ""
              }`}
            />
          ))}
        </DropdownGroup>
      </div>

      <Button
        type="button"
        variant="primary"
        aria-label="Search off-plan properties"
        className="w-full gap-2 py-3 text-xs min-[1024px]:hidden"
      >
        <span>Search</span>
        <Search className="h-4 w-4" strokeWidth={2.5} />
      </Button>

      <button
        type="button"
        aria-label="Search off-plan properties"
        className="hidden size-[52px] shrink-0 cursor-pointer items-center justify-center rounded transition hover:scale-105 min-[1024px]:flex xl:size-[60px]"
      >
        <Search className="text-[#d6a85e]" width={32} height={32} strokeWidth={2.5} />
      </button>
    </div>
  );
}
