"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Building2, FileText, House, Key } from "lucide-react";
import Button from "@/components/ui/Button";
import PropertyCard from "@/components/ui/PropertyCard";
import useAdminProperties from "@/hooks/useAdminProperties";
import { listingHomes } from "@/lib/admin/propertyPublic";

const TABS = [
  {
    id: "buy",
    label: "Buy",
    icon: House,
    href: "/buy/properties",
    market: "buy",
  },
  {
    id: "sell",
    label: "Sell",
    icon: Building2,
    href: "/sell/properties",
    market: "sell",
  },
  {
    id: "rent",
    label: "Rent",
    icon: Key,
    href: "/rent/properties",
    market: "rent",
  },
  {
    id: "offplan",
    label: "Off Plan",
    icon: FileText,
    href: "/off-plan",
    market: "off-plan",
  },
];

const FeaturedProperties = () => {
  const [activeId, setActiveId] = useState("buy");
  const { properties, isReady } = useAdminProperties();
  const activeTab = TABS.find((tab) => tab.id === activeId) || TABS[0];
  const homes = useMemo(() => {
    if (!isReady) return [];
    return listingHomes(properties, {
      market: activeTab.market,
      featuredOnly: true,
      limit: 4,
    });
  }, [activeTab.market, isReady, properties]);

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

      {!isReady ? (
        <p className="py-10 text-center text-sm text-white/45">
          Loading properties...
        </p>
      ) : homes.length ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 xl:grid-cols-4">
          {homes.map((property) => (
            <PropertyCard key={`${activeTab.id}-${property.id}`} property={property} />
          ))}
        </div>
      ) : (
        <p className="py-10 text-center text-sm text-white/45">
          No properties available yet.
        </p>
      )}
    </section>
  );
};

export default FeaturedProperties;
