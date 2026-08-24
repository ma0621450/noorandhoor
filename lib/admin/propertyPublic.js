import { DEFAULT_PROPERTY_AGENT } from "@/lib/admin/constants";
import { listedAgoLabel, propertyPublicPath } from "@/lib/admin/utils";

export function findAdminProperty(properties, slug, market) {
  const list = properties || [];
  return (
    list.find((item) => item.slug === slug && item.market === market) ||
    list.find((item) => item.slug === slug) ||
    null
  );
}

export function propertyMatchesCategory(property, categoryPath) {
  const href = property.href || propertyPublicPath(property.market, property.type, property.slug);
  return href === categoryPath || href.startsWith(`${categoryPath}/`);
}

export function buildPropertyTags(property) {
  const tags = [];
  if (property.bedrooms) {
    tags.push({
      label: `${property.bedrooms} Bed${property.bedrooms === 1 ? "" : "s"}`,
      type: "bed",
    });
  }
  if (property.bathrooms) {
    tags.push({
      label: `${property.bathrooms} Bath${property.bathrooms === 1 ? "" : "s"}`,
      type: "bath",
    });
  }
  if (property.area) {
    tags.push({
      label: `${Number(property.area).toLocaleString()} sqft`,
      type: "area",
    });
  }
  if (property.parking) {
    tags.push({
      label: `${property.parking} Parking`,
      type: "parking",
    });
  }
  if (property.view) {
    tags.push({ label: property.view, type: "view" });
  }
  if (property.listedAt) {
    tags.push({ label: listedAgoLabel(property.listedAt), type: "calendar" });
  }
  return tags;
}

export function galleryFromProperty(property) {
  if (Array.isArray(property.images) && property.images.length) {
    return property.images.filter(Boolean);
  }
  if (property.image) return [property.image];
  return [];
}

export function adminToListingHome(property) {
  const images = galleryFromProperty(property);
  return {
    id: property.id,
    images,
    image: images[0] || "",
    title: property.title,
    location: property.location,
    features: {
      bedroom: Number(property.bedrooms) || 0,
      bathroom: Number(property.bathrooms) || 0,
      area: Number(property.area) || 0,
    },
    price: Number(property.price) || 0,
    featured: Boolean(property.featured),
    slug: property.slug,
    href: property.href,
  };
}

export function adminToDetailProperty(admin, fallback = {}) {
  const about = Array.isArray(admin.about) && admin.about.length
    ? admin.about
    : admin.description
      ? [admin.description]
      : fallback.about || [];
  const gallery = galleryFromProperty(admin);
  const tags = buildPropertyTags(admin);

  return {
    ...fallback,
    slug: admin.slug,
    title: admin.title,
    location: admin.location,
    price: Number(admin.price) || fallback.price,
    tags: tags.length ? tags : fallback.tags,
    gallery: gallery.length ? gallery : fallback.gallery || [],
    about,
    description:
      Array.isArray(admin.descriptionItems) && admin.descriptionItems.length
        ? admin.descriptionItems
        : fallback.description || [],
    features:
      Array.isArray(admin.features) && admin.features.length
        ? admin.features
        : fallback.features || [],
    documents:
      Array.isArray(admin.documents) && admin.documents.length
        ? admin.documents
        : fallback.documents || [],
    map: {
      lat: admin.mapLat === "" || admin.mapLat == null ? fallback.map?.lat : admin.mapLat,
      lng: admin.mapLng === "" || admin.mapLng == null ? fallback.map?.lng : admin.mapLng,
      label: admin.mapLabel || fallback.map?.label || admin.location,
    },
    agent: {
      name: admin.agentName || fallback.agent?.name || DEFAULT_PROPERTY_AGENT.name,
      phone: admin.agentPhone || fallback.agent?.phone || DEFAULT_PROPERTY_AGENT.phone,
    },
    listedAt: admin.listedAt || fallback.listedAt,
    market: admin.market,
    type: admin.type,
    parking: admin.parking,
    view: admin.view,
    href: admin.href,
  };
}
