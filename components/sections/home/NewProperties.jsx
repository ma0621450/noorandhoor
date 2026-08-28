import DynamicFeaturedProperties from "@/components/sections/property/DynamicFeaturedProperties";

export default function NewProperties() {
  return (
    <DynamicFeaturedProperties
      market="buy"
      featuredOnly={false}
      recent
      eyebrow="New Properties"
      title="Recently Added Properties"
      href="/buy/properties"
      ctaLabel="View All New Properties"
      badge="New"
    />
  );
}
