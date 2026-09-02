import { listingPathForType } from "@/lib/admin/utils";

const TYPE_ALIASES = {
  apartment: "Apartment",
  apartments: "Apartment",
  villa: "Villa",
  villas: "Villa",
  townhouse: "Townhouse",
  townhouses: "Townhouse",
  penthouse: "Penthouse",
  penthouses: "Penthouse",
  house: "House",
  houses: "House",
  commercial: "Commercial",
  "commercial spaces": "Commercial",
};

const KNOWN_TYPES = new Set(Object.values(TYPE_ALIASES));

const SALES_STATUS = {
  "Available property": "available",
  Prelaunch: "reserved",
  "Sold out property": "sold",
};

export const SALE_PRICE_OPTIONS = ["0 - 500K", "500K - 1M", "1M - 5M", "5M+"];
export const RENT_PRICE_OPTIONS = ["0 - 50K", "50K - 100K", "100K - 200K", "200K+"];

export function canonicalPropertyType(value) {
  const raw = String(value || "").trim();
  if (!raw) return "";
  return TYPE_ALIASES[raw.toLowerCase()] || raw;
}

export function isActiveFilterValue(value, placeholder, options = []) {
  if (!value) return false;
  if (value === placeholder && !options.includes(placeholder)) return false;
  return true;
}

function parseAmount(token) {
  const cleaned = String(token || "")
    .replace(/,/g, "")
    .trim()
    .toUpperCase();
  if (!cleaned) return NaN;
  if (cleaned.endsWith("M")) return Number(cleaned.slice(0, -1)) * 1_000_000;
  if (cleaned.endsWith("K")) return Number(cleaned.slice(0, -1)) * 1_000;
  return Number(cleaned);
}

export function parsePriceRange(label) {
  const text = String(label || "").trim();
  if (!text) return null;

  if (text.endsWith("+")) {
    const min = parseAmount(text.slice(0, -1));
    return Number.isFinite(min) ? { min, max: Infinity } : null;
  }

  const [low, high] = text.split("-").map((part) => part.trim());
  const min = parseAmount(low);
  const max = parseAmount(high);
  if (!Number.isFinite(min) || !Number.isFinite(max)) return null;
  return { min, max };
}

export function readFilterValues(searchParams, fields) {
  const values = {};
  if (!searchParams) return values;

  fields.forEach((field) => {
    const raw = searchParams.get?.(field.key) ?? searchParams[field.key];
    const value = Array.isArray(raw) ? raw[0] : raw;
    if (isActiveFilterValue(value, field.placeholder, field.options)) {
      values[field.key] = value;
    }
  });

  return values;
}

export function toFilterQuery(values, fields) {
  const params = new URLSearchParams();
  fields.forEach((field) => {
    const value = values[field.key];
    if (isActiveFilterValue(value, field.placeholder, field.options)) {
      params.set(field.key, value);
    }
  });
  return params;
}

export function marketFromSearch(variant, values = {}) {
  if (variant === "home") {
    return values.transaction === "Buy" ? "buy" : "rent";
  }
  if (variant === "offplan") return "off-plan";
  return variant;
}

export function searchDestination({ variant, listingPath, values = {} }) {
  if (variant === "developers") return "/developers";

  const market = marketFromSearch(variant, values);
  const type = canonicalPropertyType(values.type || values["property-type"]);
  if (KNOWN_TYPES.has(type)) {
    return listingPathForType(market, type);
  }
  if (listingPath) return listingPath;
  return listingPathForType(market);
}

function locationMatches(propertyLocation, filterLocation) {
  const hay = String(propertyLocation || "").toLowerCase();
  const needle = String(filterLocation || "").toLowerCase();
  if (!needle) return true;
  return hay.includes(needle);
}

export function propertyMatchesFilters(property, values = {}) {
  const requestedType = canonicalPropertyType(
    values.type || values["property-type"],
  );
  const propertyType = canonicalPropertyType(property.type);

  if (requestedType === "Residential") {
    if (propertyType === "Commercial") return false;
  } else if (KNOWN_TYPES.has(requestedType) && propertyType !== requestedType) {
    return false;
  }

  if (values.location && !locationMatches(property.location, values.location)) {
    return false;
  }

  const range = parsePriceRange(values.price || values.budget);
  if (range) {
    const price = Number(property.price) || 0;
    if (price < range.min || price > range.max) return false;
  }

  const status = SALES_STATUS[values["sales-status"]];
  if (status && property.status !== status) return false;

  return true;
}

export function filtersFromSearchParams(searchParams) {
  if (!searchParams) return {};
  const keys = [
    "type",
    "location",
    "price",
    "property-type",
    "sales-status",
    "budget",
  ];
  const values = {};
  keys.forEach((key) => {
    const raw = searchParams.get?.(key);
    if (raw) values[key] = raw;
  });
  return values;
}
