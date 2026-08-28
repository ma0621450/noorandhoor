import PropertyDetailShell from "@/components/sections/detail/PropertyDetailShell";
import { getCategory } from "@/components/sections/buy-category/categoryConfig";

export default async function CategoryDetailPage({ categoryKey, params }) {
  const { slug } = await params;
  const category = getCategory(categoryKey);

  return (
    <PropertyDetailShell
      variant="buy"
      slug={slug}
      market="buy"
      header={{
        breadcrumbLabel: category.breadcrumb,
        breadcrumbHref: category.path,
        breadcrumbCurrent: "Home",
      }}
    />
  );
}
