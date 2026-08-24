import PropertyDetailShell from "@/components/sections/detail/PropertyDetailShell";
import { PROPERTY_DETAIL } from "@/components/sections/detail/detailData";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";

export default async function CategoryDetailPage({ categoryKey, params }) {
  const { slug } = await params;
  const category = getCategory(categoryKey);
  const home = category.homes.find((item) => item.slug === slug);
  const source = home || category.homes[0];

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
      variant="buy"
      slug={slug}
      market="buy"
      fallbackProperty={fallbackProperty}
      hasMockHome={Boolean(home)}
      header={{
        breadcrumbLabel: category.breadcrumb,
        breadcrumbHref: category.path,
        breadcrumbCurrent: "Home",
      }}
    />
  );
}
