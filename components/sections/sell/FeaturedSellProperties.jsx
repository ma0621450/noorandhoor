import DynamicFeaturedProperties from "@/components/sections/property/DynamicFeaturedProperties";

export default function FeaturedSellProperties() {
  return (
    <DynamicFeaturedProperties
      market="sell"
      title="Featured Sell Property"
      href="/sell/properties"
    />
  );
}
