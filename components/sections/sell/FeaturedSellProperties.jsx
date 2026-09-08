import DynamicFeaturedProperties from "@/components/sections/property/DynamicFeaturedProperties";

export default function FeaturedSellProperties() {
  return (
    <DynamicFeaturedProperties
      market="sell"
      eyebrow="Featured Sell Property"
      title="Featured Sell Property"
      description="Explore a handpicked selection of properties currently listed for sale by our clients."
      href="/sell/properties"
    />
  );
}
