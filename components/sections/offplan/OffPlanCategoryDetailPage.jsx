import PropertyDetailShell from "@/components/sections/detail/PropertyDetailShell";
import { PROPERTY_DETAIL } from "@/components/sections/detail/detailData";
import {
  getOffPlanCategory,
  getRelatedOffPlanHomes,
} from "@/components/sections/offplan/offplanCategoryConfig";

export default async function OffPlanCategoryDetailPage({ categoryKey, params }) {
  const { slug } = await params;
  const category = getOffPlanCategory(categoryKey);
  const home = category.homes.find((item) => item.slug === slug);
  const source = home || category.homes[0];
  const related = getRelatedOffPlanHomes(category, source.slug, 4);

  const fallbackProperty = {
    ...PROPERTY_DETAIL,
    slug,
    title: home?.title || PROPERTY_DETAIL.title,
    location: home?.location || PROPERTY_DETAIL.location,
    price: home?.price ?? PROPERTY_DETAIL.price,
    gallery:
      source.images?.length >= 5
        ? source.images
        : [...(source.images || []), ...PROPERTY_DETAIL.gallery].slice(0, 5),
  };

  return (
    <PropertyDetailShell
      variant="off-plan"
      slug={slug}
      market="off-plan"
      fallbackProperty={fallbackProperty}
      hasMockHome={Boolean(home)}
      related={related}
      offPlanCategoryLabel={category.heading}
      header={{
        breadcrumbLabel: "off plan Properties",
        breadcrumbHref: "/off-plan",
        breadcrumbCurrent: category.heading,
      }}
    />
  );
}
