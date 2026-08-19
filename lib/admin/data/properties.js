import { ADMIN_PROPERTIES_KEY } from "@/lib/admin/constants";
import { propertyPublicPath, uniqueSlug } from "@/lib/admin/utils";

/**
 * Seed data for the admin property store. Swap the store functions
 * below for Supabase queries later; keep the exported shape stable.
 */
export const ADMIN_PROPERTIES = [
  {
    id: "prop-001",
    title: "Marina Gate Residence",
    slug: "marina-gate-residence",
    location: "Dubai Marina, Dubai",
    market: "buy",
    type: "Apartment",
    price: 2850000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1420,
    status: "available",
    featured: true,
    listedAt: "2026-03-12",
    image: "/images/buy/apartments.png",
    href: "/buy/apartments/downtown-apartment",
  },
  {
    id: "prop-002",
    title: "Palm Jumeirah Garden Villa",
    slug: "palm-jumeirah-garden-villa",
    location: "Palm Jumeirah, Dubai",
    market: "buy",
    type: "Villa",
    price: 18500000,
    bedrooms: 5,
    bathrooms: 6,
    area: 6200,
    status: "available",
    featured: true,
    listedAt: "2026-03-08",
    image: "/images/buy/villas.png",
    href: "/buy/villas/garden-villa",
  },
  {
    id: "prop-003",
    title: "Downtown Penthouse Suite",
    slug: "downtown-penthouse-suite",
    location: "Downtown Dubai, Dubai",
    market: "buy",
    type: "Penthouse",
    price: 9200000,
    bedrooms: 4,
    bathrooms: 5,
    area: 4100,
    status: "reserved",
    featured: true,
    listedAt: "2026-02-28",
    image: "/images/buy/penthouse.png",
    href: "/buy/penthouses/skyline-penthouse",
  },
  {
    id: "prop-004",
    title: "Arabian Ranches Townhouse",
    slug: "arabian-ranches-townhouse",
    location: "Arabian Ranches, Dubai",
    market: "buy",
    type: "Townhouse",
    price: 3750000,
    bedrooms: 3,
    bathrooms: 4,
    area: 2680,
    status: "available",
    featured: false,
    listedAt: "2026-02-21",
    image: "/images/buy/townhouses.png",
    href: "/buy/townhouses/family-townhouse",
  },
  {
    id: "prop-005",
    title: "Business Bay Waterfront Home",
    slug: "business-bay-waterfront-home",
    location: "Business Bay, Dubai",
    market: "rent",
    type: "Apartment",
    price: 165000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1280,
    status: "available",
    featured: true,
    listedAt: "2026-03-14",
    image: "/images/landingpage/propertyImg.png",
    href: "/rent/apartments/downtown-apartment",
  },
  {
    id: "prop-006",
    title: "JBR Beachfront Apartment",
    slug: "jbr-beachfront-apartment",
    location: "JBR, Dubai",
    market: "rent",
    type: "Apartment",
    price: 210000,
    bedrooms: 3,
    bathrooms: 3,
    area: 1860,
    status: "available",
    featured: false,
    listedAt: "2026-03-04",
    image: "/images/landingpage/landingpagecarousel1.jpg",
    href: "/rent/apartments/spacious-apartment-with-parking",
  },
  {
    id: "prop-007",
    title: "Al Barsha Family House",
    slug: "al-barsha-family-house",
    location: "Al Barsha, Dubai",
    market: "rent",
    type: "House",
    price: 280000,
    bedrooms: 4,
    bathrooms: 4,
    area: 3200,
    status: "reserved",
    featured: false,
    listedAt: "2026-02-16",
    image: "/images/landingpage/LuxuryHome.png",
    href: "/rent/houses/family-villa",
  },
  {
    id: "prop-008",
    title: "JVC Garden View Home",
    slug: "jvc-garden-view-home",
    location: "Jumeirah Village Circle, Dubai",
    market: "rent",
    type: "Townhouse",
    price: 145000,
    bedrooms: 3,
    bathrooms: 3,
    area: 2100,
    status: "available",
    featured: false,
    listedAt: "2026-01-29",
    image: "/images/buy/townhouses.png",
    href: "/rent/properties/investment-property",
  },
  {
    id: "prop-009",
    title: "Emirates Hills Estate Villa",
    slug: "emirates-hills-estate-villa",
    location: "Emirates Hills, Dubai",
    market: "sell",
    type: "Villa",
    price: 24500000,
    bedrooms: 6,
    bathrooms: 7,
    area: 9800,
    status: "available",
    featured: true,
    listedAt: "2026-03-01",
    image: "/images/buy/villas.png",
    href: "/sell/properties/premium-property",
  },
  {
    id: "prop-010",
    title: "Dubai Hills Apartment",
    slug: "dubai-hills-apartment",
    location: "Dubai Hills Estate, Dubai",
    market: "sell",
    type: "Apartment",
    price: 1980000,
    bedrooms: 1,
    bathrooms: 2,
    area: 890,
    status: "sold",
    featured: false,
    listedAt: "2026-01-18",
    image: "/images/buy/apartments.png",
    href: "/sell/apartments/downtown-apartment",
  },
  {
    id: "prop-011",
    title: "Meydan Horizon Townhouse",
    slug: "meydan-horizon-townhouse",
    location: "Meydan, Dubai",
    market: "sell",
    type: "Townhouse",
    price: 4200000,
    bedrooms: 4,
    bathrooms: 5,
    area: 3050,
    status: "available",
    featured: false,
    listedAt: "2026-02-09",
    image: "/images/buy/otherproperties.png",
    href: "/sell/properties/city-property",
  },
  {
    id: "prop-012",
    title: "Saadiyat Beach Residence",
    slug: "saadiyat-beach-residence",
    location: "Saadiyat Island, Abu Dhabi",
    market: "off-plan",
    type: "Apartment",
    price: 2650000,
    bedrooms: 2,
    bathrooms: 3,
    area: 1540,
    status: "available",
    featured: true,
    listedAt: "2026-03-10",
    image: "/images/landingpage/landingpagecarousel2.jpg",
    href: "/off-plan/apartments/downtown-apartment",
  },
  {
    id: "prop-013",
    title: "Al Zorah Beachfront Villa",
    slug: "al-zorah-beachfront-villa",
    location: "Al Zorah, Ajman",
    market: "off-plan",
    type: "Villa",
    price: 6700000,
    bedrooms: 5,
    bathrooms: 6,
    area: 5400,
    status: "available",
    featured: true,
    listedAt: "2026-02-25",
    image: "/images/landingpage/landingpagecarousel3.jpg",
    href: "/off-plan/villas/palm-jumeirah-villa",
  },
  {
    id: "prop-014",
    title: "Creekside Commercial Suite",
    slug: "creekside-commercial-suite",
    location: "Dubai Creek Harbour, Dubai",
    market: "off-plan",
    type: "Commercial",
    price: 3100000,
    bedrooms: 0,
    bathrooms: 2,
    area: 2200,
    status: "reserved",
    featured: false,
    listedAt: "2026-02-04",
    image: "/images/buy/otherproperties.png",
    href: "/off-plan/commercial/investment-property",
  },
  {
    id: "prop-015",
    title: "Sharjah Waterfront Penthouse",
    slug: "sharjah-waterfront-penthouse",
    location: "Al Khan, Sharjah",
    market: "buy",
    type: "Penthouse",
    price: 4550000,
    bedrooms: 3,
    bathrooms: 4,
    area: 2780,
    status: "available",
    featured: false,
    listedAt: "2026-01-22",
    image: "/images/buy/penthouse.png",
    href: "/buy/penthouses/skyline-penthouse",
  },
  {
    id: "prop-016",
    title: "Abu Dhabi Corniche Apartment",
    slug: "abu-dhabi-corniche-apartment",
    location: "Corniche, Abu Dhabi",
    market: "rent",
    type: "Apartment",
    price: 125000,
    bedrooms: 2,
    bathrooms: 2,
    area: 1180,
    status: "sold",
    featured: false,
    listedAt: "2026-01-11",
    image: "/images/landingpage/landingpagecarousel4.jpg",
    href: "/rent/apartments/triplex-apartment",
  },
];

const EMPTY = [];
let listeners = new Set();
let snapshot = EMPTY;
let snapshotRaw;
let initialized = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function normalizeProperty(payload, existing = [], currentId) {
  const slug = uniqueSlug(payload.slug || payload.title, existing, currentId);
  const market = payload.market || "buy";
  const type = payload.type || "Apartment";

  return {
    title: String(payload.title || "").trim(),
    slug,
    location: String(payload.location || "").trim(),
    market,
    type,
    price: toNumber(payload.price),
    bedrooms: toNumber(payload.bedrooms),
    bathrooms: toNumber(payload.bathrooms),
    area: toNumber(payload.area),
    status: payload.status || "available",
    featured: Boolean(payload.featured),
    image: payload.image || "",
    description: String(payload.description || "").trim(),
    href: propertyPublicPath(market, type, slug),
  };
}

function persist(next) {
  snapshot = next;
  snapshotRaw = JSON.stringify(next);
  window.localStorage.setItem(ADMIN_PROPERTIES_KEY, snapshotRaw);
  emit();
  return next;
}

export function subscribeProperties(listener) {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
}

export function getPropertiesSnapshot() {
  const raw = window.localStorage.getItem(ADMIN_PROPERTIES_KEY);
  if (initialized && raw === snapshotRaw) return snapshot;

  initialized = true;
  snapshotRaw = raw;

  if (!raw) {
    snapshot = ADMIN_PROPERTIES;
    return snapshot;
  }

  try {
    snapshot = JSON.parse(raw);
  } catch {
    snapshot = ADMIN_PROPERTIES;
  }
  return snapshot;
}

export function getPropertiesServerSnapshot() {
  return EMPTY;
}

export function getAdminProperties() {
  if (typeof window === "undefined") return EMPTY;
  return getPropertiesSnapshot();
}

export function createProperty(payload) {
  const properties = getPropertiesSnapshot();
  const now = new Date().toISOString().slice(0, 10);
  const property = {
    id: crypto.randomUUID(),
    ...normalizeProperty(payload, properties),
    listedAt: now,
  };

  persist([property, ...properties]);
  return property;
}

export function updateProperty(id, payload) {
  const properties = getPropertiesSnapshot();

  const next = properties.map((property) => {
    if (property.id !== String(id)) return property;
    return {
      ...property,
      ...normalizeProperty(payload, properties, property.id),
      listedAt: property.listedAt,
    };
  });

  persist(next);
  return next.find((property) => property.id === String(id)) || null;
}

export function deleteProperty(id) {
  const next = getPropertiesSnapshot().filter(
    (property) => property.id !== String(id),
  );
  persist(next);
  return next;
}

export function getPropertyStats(properties) {
  const list = properties || getAdminProperties();
  return {
    total: list.length,
    featured: list.filter((item) => item.featured).length,
    available: list.filter((item) => item.status === "available").length,
    reserved: list.filter((item) => item.status === "reserved").length,
  };
}
