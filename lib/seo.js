export const SITE_NAME = "Noor and Hoor";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://noorandhoorproperties.com";
export const SITE_DESCRIPTION =
  "Trusted UAE real estate experts helping buyers, sellers, and investors find the right residential, commercial, and off-plan properties.";

export async function getPageFromSearchParams(searchParams, fallback = 1) {
  const params = await searchParams;
  const raw = params?.page;
  const value = Number.parseInt(Array.isArray(raw) ? raw[0] : raw, 10);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

export async function getCategoryFromSearchParams(searchParams, allowed, fallback = "All") {
  const params = await searchParams;
  const raw = Array.isArray(params?.category) ? params.category[0] : params?.category;
  if (!raw || !allowed.includes(raw)) return fallback;
  return raw;
}

export async function generateListingItemMetadata({ params, category }) {
  const { slug } = await params;
  const title = `${category.heading || "Property"} | ${SITE_NAME}`;
  const description =
    category.metaDescription || `View this ${category.heading || "property"} with Noor and Hoor.`;
  const path = `${category.path}/${slug}`;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "article",
    },
  };
}
