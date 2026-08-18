import apartmentsImage from "@/public/images/buy/apartments.png";
import villasImage from "@/public/images/buy/villas.png";
import penthouseImage from "@/public/images/buy/penthouse.png";
import otherPropertiesImage from "@/public/images/buy/otherproperties.png";
import townhousesImage from "@/public/images/buy/townhouses.png";
import luxuryHome from "@/public/images/landingpage/LuxuryHome.png";
import propertyImg from "@/public/images/landingpage/propertyImg.png";
import carousel1 from "@/public/images/landingpage/landingpagecarousel1.jpg";
import carousel2 from "@/public/images/landingpage/landingpagecarousel2.jpg";
import carousel3 from "@/public/images/landingpage/landingpagecarousel3.jpg";
import carousel4 from "@/public/images/landingpage/landingpagecarousel4.jpg";

export const HOMES_PER_PAGE = 12;
export const TOTAL_PAGES = 3;

const UAE_LOCATIONS = [
  "Ajman, United Arab Emirates",
  "Dubai UAE",
  "Sharjah, United Arab Emirates",
  "Abu Dhabi, United Arab Emirates",
  "Al Zorah, Ajman",
];

const IMAGE_SETS = [
  [apartmentsImage, carousel1, propertyImg],
  [carousel2, apartmentsImage, luxuryHome],
  [carousel3, penthouseImage, otherPropertiesImage],
  [villasImage, carousel4, luxuryHome],
  [townhousesImage, apartmentsImage, carousel1],
  [penthouseImage, carousel2, propertyImg],
  [otherPropertiesImage, carousel3, luxuryHome],
  [luxuryHome, apartmentsImage, carousel4],
];

function buildHomes({ titles, slugs, locations = UAE_LOCATIONS }) {
  const count = HOMES_PER_PAGE * TOTAL_PAGES;
  return Array.from({ length: count }, (_, i) => {
    const title = titles[i % titles.length];
    return {
      id: i + 1,
      images: IMAGE_SETS[i % IMAGE_SETS.length],
      title,
      location: locations[i % locations.length],
      features: { bedroom: 6, bathroom: 2, area: 2900 },
      price: i % 6 === 5 ? 95000000 : 45000000,
      featured: i % 4 !== 3,
      slug: slugs[i % slugs.length],
    };
  });
}

function category(config) {
  return {
    ...config,
    eyebrow: config.eyebrow || "off plan Properties",
    homes: buildHomes({ titles: config.titles, slugs: config.slugs }),
  };
}

export const OFF_PLAN_CATEGORIES = {
  apartments: category({
    key: "apartments",
    path: "/off-plan/apartments",
    heading: "Apartments",
    breadcrumb: "Off plan apartments",
    metaTitle: "Off Plan Apartments in UAE | Noor and Hoor",
    metaDescription:
      "Browse off-plan apartments in the UAE. Purchase directly from developers before construction is completed.",
    titles: [
      "Palm Jumeirah Villa",
      "Spacious apartment",
      "Downtown apartment",
      "Two-bedroom with sauna",
      "Triplex apartment",
      "Al Zorah Beachfront Villa",
      "Two-bedroom with storage",
      "Loft conversion apartment",
      "Luxury apartment with pool",
      "New construction apartment",
    ],
    slugs: [
      "palm-jumeirah-villa",
      "spacious-apartment",
      "downtown-apartment",
      "two-bedroom-with-sauna",
      "triplex-apartment",
      "al-zorah-beachfront-villa",
      "two-bedroom-with-storage",
      "loft-conversion-apartment",
      "luxury-apartment-with-pool",
      "new-construction-apartment",
    ],
  }),
  villas: category({
    key: "villas",
    path: "/off-plan/villas",
    heading: "Villas",
    breadcrumb: "Off plan villas",
    metaTitle: "Off Plan Villas in UAE | Noor and Hoor",
    metaDescription:
      "Browse off-plan villas in the UAE. Private luxury homes purchased directly from developers.",
    titles: [
      "Palm Jumeirah Villa",
      "Al Zorah Beachfront Villa",
      "Garden Villa",
      "Independent Villa With Pool",
    ],
    slugs: [
      "palm-jumeirah-villa",
      "al-zorah-beachfront-villa",
      "garden-villa",
      "independent-villa-with-pool",
    ],
  }),
  commercial: category({
    key: "commercial",
    path: "/off-plan/commercial",
    heading: "Commercial",
    breadcrumb: "Off plan commercial",
    metaTitle: "Off Plan Commercial & Residential | Noor and Hoor",
    metaDescription:
      "Browse off-plan commercial and residential developments in the UAE.",
    titles: [
      "Downtown Commercial",
      "Mixed-Use Residence",
      "Waterfront Commercial",
      "City Commercial Suite",
    ],
    slugs: [
      "downtown-commercial",
      "mixed-use-residence",
      "waterfront-commercial",
      "city-commercial-suite",
    ],
  }),
  penthouses: category({
    key: "penthouses",
    path: "/off-plan/penthouses",
    heading: "Penthouse",
    breadcrumb: "Off plan penthouses",
    metaTitle: "Off Plan Penthouses in UAE | Noor and Hoor",
    metaDescription:
      "Browse off-plan penthouses in the UAE. Exclusive sky residences from leading developers.",
    titles: [
      "Skyline Penthouse",
      "Duplex Penthouse",
      "Marina View Penthouse",
      "Terrace Penthouse",
    ],
    slugs: [
      "skyline-penthouse",
      "duplex-penthouse",
      "marina-view-penthouse",
      "terrace-penthouse",
    ],
  }),
  townhouses: category({
    key: "townhouses",
    path: "/off-plan/townhouses",
    heading: "Townhouse",
    breadcrumb: "Off plan townhouses",
    metaTitle: "Off Plan Townhouses in UAE | Noor and Hoor",
    metaDescription:
      "Browse off-plan townhouses in the UAE. Family homes with private outdoor space.",
    titles: [
      "Spacious Townhouse",
      "Marina Townhouse",
      "Family Townhouse With Garden",
      "Corner Townhouse",
    ],
    slugs: [
      "spacious-townhouse",
      "marina-townhouse",
      "family-townhouse-with-garden",
      "corner-townhouse",
    ],
  }),
  guide: category({
    key: "guide",
    path: "/off-plan/guide",
    heading: "Off Plan Guide",
    breadcrumb: "Off plan guide",
    metaTitle: "Off Plan Guide | Noor and Hoor",
    metaDescription:
      "Explore featured off-plan properties and guidance for buying before construction is completed.",
    titles: [
      "Spacious apartment",
      "Palm Jumeirah Villa",
      "Downtown apartment",
      "Luxury apartment with pool",
    ],
    slugs: [
      "spacious-apartment",
      "palm-jumeirah-villa",
      "downtown-apartment",
      "luxury-apartment-with-pool",
    ],
  }),
};

export function getOffPlanCategory(key) {
  return OFF_PLAN_CATEGORIES[key];
}

function uniqueHomes(category) {
  return [...new Map(category.homes.map((item) => [item.slug, item])).values()].map(
    (item) => ({ ...item, basePath: category.path })
  );
}

export function getRelatedOffPlanHomes(category, currentSlug, count = 4) {
  const related = uniqueHomes(category).filter((item) => item.slug !== currentSlug);

  if (related.length >= count) return related.slice(0, count);

  const extras = Object.values(OFF_PLAN_CATEGORIES)
    .filter((item) => item.key !== category.key)
    .flatMap(uniqueHomes);

  const seen = new Set(related.map((item) => `${item.basePath}/${item.slug}`));
  for (const item of extras) {
    const key = `${item.basePath}/${item.slug}`;
    if (seen.has(key)) continue;
    related.push(item);
    seen.add(key);
    if (related.length >= count) break;
  }

  return related.slice(0, count);
}
