import { listingPathForType } from "@/lib/admin/utils";
import {
  PROPERTY_LOCATIONS,
  PROPERTY_TYPES_BY_MARKET,
} from "@/lib/admin/constants";

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
const CATCH_ALL_PROPERTY_TYPES = new Set([
  "properties",
  "dubai",
  "guide",
  "noor-hoor",
]);

const SALES_STATUS = {
  "Available property": "available",
  Prelaunch: "reserved",
  "Sold out property": "sold",
};

export const SALE_PRICE_OPTIONS = ["0 - 500K", "500K - 1M", "1M - 5M", "5M+"];
export const RENT_PRICE_OPTIONS = ["0 - 50K", "50K - 100K", "100K - 200K", "200K+"];

/** Shared across every hero filter on the site. */
export const FILTER_LOCATION_OPTIONS = PROPERTY_LOCATIONS;

export const MARKET_FILTER_OPTIONS = ["Buy", "Rent", "Sell", "Off Plan"];

const MARKET_LABEL_TO_KEY = {
  Buy: "buy",
  Rent: "rent",
  Sell: "sell",
  "Off Plan": "off-plan",
};

const VARIANT_CATEGORY = {
  buy: "Buy",
  rent: "Rent",
  sell: "Sell",
  offplan: "Off Plan",
};

/** Same filter bar on every property page (not developers). */
export function buildPropertyFilterFields() {
  return [
    {
      key: "category",
      placeholder: "Category",
      options: MARKET_FILTER_OPTIONS,
    },
    {
      key: "type",
      placeholder: "Property Type",
      options: [],
    },
    {
      key: "location",
      placeholder: "Location",
      options: FILTER_LOCATION_OPTIONS,
    },
    {
      key: "price",
      placeholder: "Price Range",
      options: SALE_PRICE_OPTIONS,
    },
  ];
}

export function defaultPropertyFilterValues(variant) {
  const category = VARIANT_CATEGORY[variant];
  return category ? { category } : {};
}

export function marketKeyFromFilter(value) {
  if (!value) return "";
  if (MARKET_LABEL_TO_KEY[value]) return MARKET_LABEL_TO_KEY[value];
  if (value === "buy" || value === "rent" || value === "sell" || value === "off-plan") {
    return value;
  }
  return "";
}

export function subcategoryOptionsForMarket(value) {
  const market = marketKeyFromFilter(value);
  const categories = PROPERTY_TYPES_BY_MARKET[market];
  if (!categories?.length) return [];
  return categories.map((item) => item.label);
}

export function pathForMarketSubcategory(marketValue, subcategoryLabel) {
  const market = marketKeyFromFilter(marketValue);
  if (!market) return "";
  const categories = PROPERTY_TYPES_BY_MARKET[market] || [];
  const hit = categories.find((item) => item.label === subcategoryLabel);
  if (hit) return hit.path;
  return listingPathForType(market);
}

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
  const fromCategory = marketKeyFromFilter(
    values.category || values.transaction,
  );
  if (fromCategory) return fromCategory;
  if (variant === "home") return "buy";
  if (variant === "offplan") return "off-plan";
  if (variant === "buy" || variant === "rent" || variant === "sell") {
    return variant;
  }
  return "buy";
}

export function searchDestination({ variant, listingPath, values = {} }) {
  const market = marketFromSearch(variant, values);
  const subcategory = values.type || values["property-type"];

  if (subcategory) {
    const byLabel = pathForMarketSubcategory(
      values.category || values.transaction || market,
      subcategory,
    );
    if (byLabel) return byLabel;
  }

  const type = canonicalPropertyType(subcategory);
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

function resolveRequestedType(property, filterValue) {
  if (!filterValue) return null;

  const market = property.market || "";
  const categories = PROPERTY_TYPES_BY_MARKET[market] || [];
  const hit = categories.find(
    (item) => item.label === filterValue || item.value === filterValue,
  );

  if (hit) {
    if (CATCH_ALL_PROPERTY_TYPES.has(hit.value)) return { catchAll: true };
    return { value: hit.value };
  }

  const canonical = canonicalPropertyType(filterValue);
  if (KNOWN_TYPES.has(canonical)) return { value: canonical.toLowerCase() };
  return { value: String(filterValue).toLowerCase() };
}

export function propertyMatchesFilters(property, values = {}) {
  const requested = resolveRequestedType(
    property,
    values.type || values["property-type"],
  );

  if (requested && !requested.catchAll) {
    const propertyType = String(property.type || "").toLowerCase();
    const isCatchAllType = CATCH_ALL_PROPERTY_TYPES.has(propertyType);
    const requestedValue = String(requested.value || "").toLowerCase();

    if (requestedValue === "residential") {
      if (propertyType === "commercial") return false;
    } else if (!isCatchAllType && requestedValue && propertyType !== requestedValue) {
      const canonicalProperty = canonicalPropertyType(property.type).toLowerCase();
      const canonicalRequested = canonicalPropertyType(requested.value).toLowerCase();
      if (canonicalProperty !== canonicalRequested) return false;
    }
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
    "category",
    "transaction",
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
