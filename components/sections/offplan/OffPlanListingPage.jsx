import CategoryListingPage from "@/components/sections/buy-category/CategoryListingPage";

export default function OffPlanListingPage({ categoryKey, searchParams }) {
  return (
    <CategoryListingPage
      market="offplan"
      categoryKey={categoryKey}
      searchParams={searchParams}
    />
  );
}
