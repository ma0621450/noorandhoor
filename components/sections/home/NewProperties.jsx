import FeaturedPropertySection from "@/components/sections/property/FeaturedPropertySection";
import { FEATURED_BUY_PROPERTIES } from "@/components/sections/buy/FeaturedBuyProperties";

export default function NewProperties() {
  return (
    <FeaturedPropertySection
      eyebrow="New Properties"
      title="Recently Added Properties"
      href="/buy/properties"
      ctaLabel="View All New Properties"
      properties={FEATURED_BUY_PROPERTIES}
      badge="New"
    />
  );
}
