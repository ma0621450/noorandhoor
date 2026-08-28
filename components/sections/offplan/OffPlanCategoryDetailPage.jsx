import PropertyDetailShell from "@/components/sections/detail/PropertyDetailShell";
import { getOffPlanCategory } from "@/components/sections/offplan/offplanCategoryConfig";

export default async function OffPlanCategoryDetailPage({ categoryKey, params }) {
  const { slug } = await params;
  const category = getOffPlanCategory(categoryKey);

  return (
    <PropertyDetailShell
      variant="off-plan"
      slug={slug}
      market="off-plan"
      offPlanCategoryLabel={category.heading}
      header={{
        breadcrumbLabel: "off plan Properties",
        breadcrumbHref: "/off-plan",
        breadcrumbCurrent: category.heading,
      }}
    />
  );
}
