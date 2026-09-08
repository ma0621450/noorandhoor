import DynamicFeaturedProperties from "@/components/sections/property/DynamicFeaturedProperties";

export default function FeaturedBuyProperties() {
  return (
    <DynamicFeaturedProperties
      market="buy"
      eyebrow="Featured Properties"
      title="Explore Featured Properties"
      description="Discover exceptional properties selected for lifestyle appeal, investment value, and long term potential."
      href="/buy/properties"
    />
  );
}
