export function cx(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPrice(value) {
  return `AED ${Number(value || 0).toLocaleString("en-AE")}`;
}

export function formatDisplayDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) return String(value || "");
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function resolveImageSrc(image) {
  if (!image) return "";
  if (typeof image === "string") return image;
  return image.src || "";
}

export function truncate(value, length = 80) {
  const text = String(value || "");
  if (text.length <= length) return text;
  return `${text.slice(0, length).trim()}…`;
}

export function uniqueSlug(base, existingSlugs, currentId) {
  const root = slugify(base) || "post";
  const taken = new Set(
    existingSlugs
      .filter((entry) => entry.id !== currentId)
      .map((entry) => entry.slug),
  );

  if (!taken.has(root)) return root;

  let index = 2;
  while (taken.has(`${root}-${index}`)) index += 1;
  return `${root}-${index}`;
}

export function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error("Could not read the selected file."));
    reader.readAsDataURL(file);
  });
}

export function isInlineImageSrc(src) {
  return Boolean(src && (src.startsWith("data:") || src.startsWith("blob:")));
}

const MARKET_TYPE_PATHS = {
  buy: {
    Apartment: "/buy/apartments",
    Villa: "/buy/villas",
    Townhouse: "/buy/townhouses",
    Penthouse: "/buy/penthouses",
    House: "/buy/villas",
    Commercial: "/buy/properties",
  },
  rent: {
    Apartment: "/rent/apartments",
    House: "/rent/houses",
    Villa: "/rent/houses",
    Townhouse: "/rent/properties",
    Penthouse: "/rent/apartments",
    Commercial: "/rent/properties",
  },
  sell: {
    Apartment: "/sell/apartments",
    Villa: "/sell/properties",
    Townhouse: "/sell/properties",
    Penthouse: "/sell/properties",
    House: "/sell/properties",
    Commercial: "/sell/properties",
  },
  "off-plan": {
    Apartment: "/off-plan/apartments",
    Villa: "/off-plan/villas",
    Townhouse: "/off-plan/townhouses",
    Penthouse: "/off-plan/penthouses",
    House: "/off-plan/villas",
    Commercial: "/off-plan/commercial",
  },
};

export function propertyPublicPath(market, type, slug) {
  const base = MARKET_TYPE_PATHS[market]?.[type] || "/buy/properties";
  return slug ? `${base}/${slug}` : base;
}
