export const SITE_NAME = "Noor and Hoor";
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://noorandhoorproperties.com";
export const SITE_DESCRIPTION =
  "Noor and Hoor is a UAE real estate firm offering expert guidance for buying, selling, renting, and off-plan property investment.";

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
  const home = category.homes.find((item) => item.slug === slug);

  if (!home) {
    return {
      title: `${category.heading || "Property"} | ${SITE_NAME}`,
      description: category.metaDescription,
    };
  }

  const title = `${home.title} | ${SITE_NAME}`;
  const description = category.metaDescription || `View ${home.title} in ${home.location}.`;
  const path = `${category.path}/${home.slug}`;

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
