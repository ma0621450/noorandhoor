"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, FileText, House, Key } from "lucide-react";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";
import { FEATURED_BUY_PROPERTIES } from "@/components/sections/buy/FeaturedBuyProperties";
import { FEATURED_SELL_PROPERTIES } from "@/components/sections/sell/FeaturedSellProperties";
import { FEATURED_RENTALS } from "@/components/sections/rent/FeaturedRentals";
import { OFF_PLAN_PROPERTIES } from "@/components/sections/offplan/offPlanProperties";

const OFF_PLAN_SLUGS = [
  "palm-jumeirah-villa",
  "spacious-apartment",
  "downtown-apartment",
  "two-bedroom-with-sauna",
];

const OFF_PLAN_FEATURED = OFF_PLAN_PROPERTIES.slice(0, 4).map((property, index) => ({
  ...property,
  href: `/off-plan/apartments/${OFF_PLAN_SLUGS[index]}`,
}));

const TABS = [
  {
    id: "buy",
    label: "Buy",
    icon: House,
    href: "/buy/properties",
    properties: FEATURED_BUY_PROPERTIES,
  },
  {
    id: "sell",
    label: "Sell",
    icon: Building2,
    href: "/sell/properties",
    properties: FEATURED_SELL_PROPERTIES,
  },
  {
    id: "rent",
    label: "Rent",
    icon: Key,
    href: "/rent/properties",
    properties: FEATURED_RENTALS.slice(0, 4),
  },
  {
    id: "offplan",
    label: "Off Plan",
    icon: FileText,
    href: "/off-plan",
    properties: OFF_PLAN_FEATURED,
  },
];

const FeaturedProperties = () => {
  const [activeId, setActiveId] = useState("buy");
  const activeTab = TABS.find((tab) => tab.id === activeId) || TABS[0];

  return (
    <section className="section-container">
      <div className="mb-10 flex flex-col gap-6 sm:mb-12 sm:gap-8 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex w-full min-w-0 flex-col gap-4 lg:max-w-3xl">
          <h3 className="section-sub-heading">Featured Properties</h3>
          <h2 className="text-gold-gradient max-w-[800px]">
            Explore Properties or Homes in Dubai
          </h2>
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3 md:gap-4">
            {TABS.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={id === activeId ? "primary" : "secondary"}
                className="w-full px-3 text-xs sm:w-auto sm:px-4 sm:text-sm"
                aria-pressed={id === activeId}
                onClick={() => setActiveId(id)}
              >
                <Icon className="h-4 w-4 shrink-0 sm:h-[21px] sm:w-[21px]" />
                <span>{label}</span>
              </Button>
            ))}
          </div>
        </div>

        <Link href={activeTab.href} className="w-full shrink-0 sm:w-auto lg:self-end">
          <Button variant="secondary" className="w-full sm:w-auto">
            View All Properties
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
        {activeTab.properties.map((property) => (
          <PropertyCard key={`${activeTab.id}-${property.id}`} property={property} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProperties;
