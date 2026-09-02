export const BLOG_CATEGORIES = [
  "All",
  "Market Insights",
  "Off-Plan",
  "Buying Guide",
  "Investment",
  "Lifestyle",
];

export const ADMIN_BLOG_CATEGORIES = BLOG_CATEGORIES.filter(
  (category) => category !== "All",
);
