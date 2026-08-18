import CategoryListingPage from "@/components/sections/buy-category/CategoryListingPage";

export default function SellCategoryListingPage({ categoryKey }) {
  return <CategoryListingPage market="sell" categoryKey={categoryKey} />;
}
