import CategoryListingPage from "@/components/sections/buy-category/CategoryListingPage";

export default function SellCategoryListingPage({ categoryKey, searchParams }) {
  return (
    <CategoryListingPage
      market="sell"
      categoryKey={categoryKey}
      searchParams={searchParams}
    />
  );
}
