export const DEFAULT_PROPERTY_AMENITIES = [
  "Beach-style Pool",
  "Rooftop Pool",
  "Kids' Pool",
  "Kids' Play Area",
  "Yoga Area",
  "Energy Zone",
  "Outdoor Lounge",
  "Tennis Court",
  "Cycling Track",
  "Swimming Pool",
  "Fitness Center",
  "24/7 Security",
  "Parking",
  "Sauna",
];

export const MAX_PROPERTY_AMENITIES = 18;

export function normalizeAmenities(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => {
      if (typeof item === "string") {
        const name = item.trim();
        return name ? { name, image: "", amenityTypeId: null } : null;
      }

      const name = String(item?.name || "").trim();
      if (!name) return null;

      return {
        id: item.id || null,
        name,
        image: String(item?.image || item?.image_url || "").trim(),
        amenityTypeId: item.amenityTypeId || item.amenity_type_id || null,
      };
    })
    .filter(Boolean)
    .slice(0, MAX_PROPERTY_AMENITIES);
}

/**
 * Map joined `property_amenities` rows (or legacy features text[]) into app shape.
 */
export function amenitiesFromRelation(rows, fallbackFeatures = []) {
  if (Array.isArray(rows) && rows.length) {
    const sorted = [...rows].sort(
      (a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0),
    );
    return normalizeAmenities(
      sorted.map((row) => ({
        id: row.id,
        name: row.name,
        image: row.image_url,
        amenityTypeId: row.amenity_type_id,
      })),
    );
  }

  if (Array.isArray(fallbackFeatures) && fallbackFeatures.length) {
    return normalizeAmenities(fallbackFeatures);
  }

  return [];
}

export function amenitiesToInsertRows(propertyId, amenities) {
  return normalizeAmenities(amenities).map((item, index) => ({
    property_id: propertyId,
    amenity_type_id: item.amenityTypeId || null,
    name: item.name,
    image_url: item.image || "",
    sort_order: index,
  }));
}

export function amenitiesToForm(amenities = []) {
  return normalizeAmenities(amenities);
}

export function publicAmenities(amenities) {
  return normalizeAmenities(amenities).filter((item) => item.image);
}

export function amenityNames(amenities) {
  return normalizeAmenities(amenities).map((item) => item.name);
}
