import CategoryListingPage from "@/components/sections/buy-category/CategoryListingPage";

export default function RentCategoryListingPage({ categoryKey, searchParams }) {
  return (
    <CategoryListingPage
      market="rent"
      categoryKey={categoryKey}
      searchParams={searchParams}
    />
  );
}
