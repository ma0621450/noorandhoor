"use client";

import { useMemo } from "react";
import FeaturedPropertySection from "@/components/sections/property/FeaturedPropertySection";
import useAdminProperties from "@/hooks/useAdminProperties";
import { listingHomes } from "@/lib/admin/propertyPublic";

export default function DynamicFeaturedProperties({
  market,
  limit = 4,
  featuredOnly = true,
  recent = false,
  ...sectionProps
}) {
  const { properties, isReady } = useAdminProperties();
  const homes = useMemo(() => {
    if (!isReady) return [];
    return listingHomes(properties, {
      market,
      featuredOnly,
      recent,
      limit,
    });
  }, [featuredOnly, isReady, limit, market, properties, recent]);

  return (
    <FeaturedPropertySection
      {...sectionProps}
      properties={homes}
      loading={!isReady}
    />
  );
}
