import DynamicFeaturedProperties from "@/components/sections/property/DynamicFeaturedProperties";

export default function FeaturedRentals() {
  return (
    <DynamicFeaturedProperties
      market="rent"
      title="Featured Rentals in Dubai"
      href="/rent/properties"
    />
  );
}
