import { createClient } from "@/lib/supabase/client";
import {
  defaultPropertyType,
  normalizePropertyType,
} from "@/lib/admin/constants";
import { isInlineImageSrc, propertyPublicPath, uniqueSlug } from "@/lib/admin/utils";

const PROPERTY_IMAGES_BUCKET = "property-images";
const EMPTY = [];

let listeners = new Set();
let snapshot = EMPTY;
let loadPromise = null;

function emit() {
  listeners.forEach((listener) => listener());
}

function toNumber(value, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function toOptionalNumber(value) {
  if (value === "" || value == null) return "";
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : "";
}

function toDbNumber(value) {
  if (value === "" || value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function toStringList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }
  return String(value || "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function toParagraphs(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item || "").trim()).filter(Boolean);
  }
  return String(value || "")
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function normalizeDocuments(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map((doc) => ({
      name: String(doc?.name || "").trim(),
      available: Boolean(doc?.available),
    }))
    .filter((doc) => doc.name);
}

function normalizeImages(payload) {
  const fromArray = Array.isArray(payload.images)
    ? payload.images.filter(Boolean)
    : [];
  if (fromArray.length) return fromArray;
  return payload.image ? [payload.image] : [];
}

function hydrateProperty(property) {
  const images = normalizeImages(property);
  const market = property.market || "buy";
  const type = normalizePropertyType(market, property.type);
  const slug = property.slug || "";
  return {
    ...property,
    market,
    type,
    slug,
    featured: Boolean(property.featured),
    images,
    image: property.image || images[0] || "",
    about: Array.isArray(property.about) ? property.about : [],
    descriptionItems: Array.isArray(property.descriptionItems)
      ? property.descriptionItems
      : [],
    features: Array.isArray(property.features) ? property.features : [],
    documents: Array.isArray(property.documents) ? property.documents : [],
    parking: toNumber(property.parking),
    view: property.view || "",
    mapLat: property.mapLat ?? "",
    mapLng: property.mapLng ?? "",
    mapLabel: property.mapLabel || "",
    agentName: property.agentName || "",
    agentPhone: property.agentPhone || "",
    paymentDownPercent: toNumber(property.paymentDownPercent, 10) || 10,
    paymentInstallments: toNumber(property.paymentInstallments, 24) || 24,
    paymentStartDate: property.paymentStartDate
      ? String(property.paymentStartDate).slice(0, 10)
      : "",
    href: propertyPublicPath(market, type, slug),
  };
}

function fromRow(row) {
  return hydrateProperty({
    id: row.id,
    title: row.title,
    slug: row.slug,
    location: row.location,
    market: row.market,
    type: row.property_type,
    price: toNumber(row.price),
    bedrooms: toNumber(row.bedrooms),
    bathrooms: toNumber(row.bathrooms),
    area: toNumber(row.area),
    parking: toNumber(row.parking),
    view: row.view || "",
    listedAt: String(row.listed_at || "").slice(0, 10),
    status: row.status,
    featured: Boolean(row.featured),
    images: Array.isArray(row.images) ? row.images : [],
    image: row.images?.[0] || "",
    about: Array.isArray(row.about) ? row.about : [],
    description: Array.isArray(row.about) ? row.about.join("\n\n") : "",
    descriptionItems: Array.isArray(row.description_items)
      ? row.description_items
      : [],
    features: Array.isArray(row.features) ? row.features : [],
    documents: Array.isArray(row.documents) ? row.documents : [],
    mapLat: row.map_lat ?? "",
    mapLng: row.map_lng ?? "",
    mapLabel: row.map_label || "",
    agentName: row.agent_name || "",
    agentPhone: row.agent_phone || "",
    paymentDownPercent: toNumber(row.payment_down_percent, 10) || 10,
    paymentInstallments: toNumber(row.payment_installments, 24) || 24,
    paymentStartDate: String(row.payment_start_date || "").slice(0, 10),
  });
}

function toRow(property, { createdBy, includeId = false } = {}) {
  const row = {
    title: property.title,
    slug: property.slug,
    location: property.location,
    market: property.market,
    property_type: property.type,
    status: property.status,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    area: property.area,
    parking: property.parking,
    view: property.view,
    listed_at: property.listedAt,
    featured: property.featured,
    images: property.images,
    about: property.about,
    description_items: property.descriptionItems,
    features: property.features,
    documents: property.documents,
    map_lat: toDbNumber(property.mapLat),
    map_lng: toDbNumber(property.mapLng),
    map_label: property.mapLabel,
    agent_name: property.agentName,
    agent_phone: property.agentPhone,
    payment_down_percent: property.paymentDownPercent ?? 10,
    payment_installments: property.paymentInstallments ?? 24,
    payment_start_date: property.paymentStartDate || null,
  };

  if (includeId && property.id) row.id = property.id;
  if (createdBy) row.created_by = createdBy;
  return row;
}

function normalizeProperty(payload, existing = [], currentId) {
  const market = payload.market || "buy";
  const slug = uniqueSlug(
    payload.slug || payload.title,
    existing.filter((item) => item.market === market),
    currentId,
  );
  const type = normalizePropertyType(
    market,
    payload.type || defaultPropertyType(market),
  );
  const images = normalizeImages(payload);
  const about = toParagraphs(
    payload.about ?? payload.aboutText ?? payload.description,
  );

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
    parking: toNumber(payload.parking),
    view: String(payload.view || "").trim(),
    listedAt: payload.listedAt || new Date().toISOString().slice(0, 10),
    status: payload.status || "available",
    featured: Boolean(payload.featured),
    images,
    image: images[0] || "",
    about,
    description: about.join("\n\n") || String(payload.description || "").trim(),
    descriptionItems: toStringList(payload.descriptionItems),
    features: toStringList(payload.features),
    documents: normalizeDocuments(payload.documents),
    mapLat: toOptionalNumber(payload.mapLat),
    mapLng: toOptionalNumber(payload.mapLng),
    mapLabel: String(payload.mapLabel || "").trim(),
    agentName: String(payload.agentName || "").trim(),
    agentPhone: String(payload.agentPhone || "").trim(),
    paymentDownPercent: (() => {
      const value = toNumber(payload.paymentDownPercent, 10);
      return value > 0 && value < 100 ? value : 10;
    })(),
    paymentInstallments: Math.max(
      1,
      toNumber(payload.paymentInstallments, 24) || 24,
    ),
    paymentStartDate: payload.paymentStartDate
      ? String(payload.paymentStartDate).slice(0, 10)
      : "",
    href: propertyPublicPath(market, type, slug),
  };
}

function dbErrorMessage(error, fallback) {
  const message = error?.message || "";
  if (error?.code === "23505") {
    return "A property with this slug already exists in this market.";
  }
  if (/row-level security/i.test(message)) {
    return "You need to be signed in as admin to save properties.";
  }
  return message || fallback;
}

function extFromMime(mime) {
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("gif")) return "gif";
  return "jpg";
}

function dataUrlToBytes(dataUrl) {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error("One of the gallery images is invalid.");
  const mime = match[1];
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return { mime, bytes };
}

function storagePathFromPublicUrl(url) {
  const marker = `/storage/v1/object/public/${PROPERTY_IMAGES_BUCKET}/`;
  const index = String(url || "").indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

async function uploadPropertyImages(supabase, propertyId, images) {
  const uploaded = [];

  for (const [index, image] of images.entries()) {
    if (!image || !isInlineImageSrc(image)) {
      uploaded.push(image);
      continue;
    }

    const { mime, bytes } = dataUrlToBytes(image);
    const path = `${propertyId}/${Date.now()}-${index}.${extFromMime(mime)}`;
    const { error } = await supabase.storage
      .from(PROPERTY_IMAGES_BUCKET)
      .upload(path, bytes, { contentType: mime, upsert: false });

    if (error) {
      throw new Error(error.message || "Could not upload gallery images.");
    }

    const { data } = supabase.storage
      .from(PROPERTY_IMAGES_BUCKET)
      .getPublicUrl(path);
    uploaded.push(data.publicUrl);
  }

  return uploaded;
}

async function removeUnusedImages(supabase, previousImages = [], nextImages = []) {
  const kept = new Set(nextImages);
  const paths = previousImages
    .filter((url) => url && !kept.has(url))
    .map(storagePathFromPublicUrl)
    .filter(Boolean);

  if (!paths.length) return;
  await supabase.storage.from(PROPERTY_IMAGES_BUCKET).remove(paths);
}

async function currentUserId(supabase) {
  const { data } = await supabase.auth.getUser();
  return data.user?.id || null;
}

function setSnapshot(next) {
  snapshot = next;
  emit();
  return snapshot;
}

export function subscribeProperties(listener) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getPropertiesSnapshot() {
  return snapshot;
}

export function getPropertiesServerSnapshot() {
  return EMPTY;
}

export async function loadProperties() {
  if (typeof window === "undefined") return EMPTY;
  if (!loadPromise) {
    loadPromise = (async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from("properties")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        loadPromise = null;
        throw new Error(dbErrorMessage(error, "Could not load properties."));
      }

      return setSnapshot((data || []).map(fromRow));
    })();
  }

  return loadPromise;
}

export function getAdminProperties() {
  if (typeof window === "undefined") return EMPTY;
  return getPropertiesSnapshot();
}

export async function createProperty(payload) {
  const supabase = createClient();
  const properties = getPropertiesSnapshot();
  const id = crypto.randomUUID();
  const property = {
    id,
    ...normalizeProperty(payload, properties),
  };
  property.images = await uploadPropertyImages(supabase, id, property.images);
  property.image = property.images[0] || "";

  const { data, error } = await supabase
    .from("properties")
    .insert(
      toRow(property, {
        createdBy: await currentUserId(supabase),
        includeId: true,
      }),
    )
    .select("*")
    .single();

  if (error) {
    throw new Error(dbErrorMessage(error, "Could not save this property."));
  }

  const created = fromRow(data);
  setSnapshot([created, ...properties.filter((item) => item.id !== created.id)]);
  return created;
}

export async function updateProperty(id, payload) {
  const supabase = createClient();
  const properties = getPropertiesSnapshot();
  const current = properties.find((item) => item.id === String(id));
  if (!current) throw new Error("Property not found.");

  const next = {
    ...current,
    ...normalizeProperty(
      { listedAt: current.listedAt, ...payload },
      properties,
      current.id,
    ),
  };
  next.images = await uploadPropertyImages(supabase, current.id, next.images);
  next.image = next.images[0] || "";

  const { data, error } = await supabase
    .from("properties")
    .update(toRow(next))
    .eq("id", current.id)
    .select("*")
    .single();

  if (error) {
    throw new Error(dbErrorMessage(error, "Could not update this property."));
  }

  await removeUnusedImages(supabase, current.images, next.images);
  const updated = fromRow(data);
  setSnapshot(
    properties.map((item) => (item.id === updated.id ? updated : item)),
  );
  return updated;
}

export async function deleteProperty(id) {
  const supabase = createClient();
  const properties = getPropertiesSnapshot();
  const current = properties.find((item) => item.id === String(id));

  const { error } = await supabase.from("properties").delete().eq("id", id);
  if (error) {
    throw new Error(dbErrorMessage(error, "Could not delete this property."));
  }

  if (current?.images?.length) {
    await removeUnusedImages(supabase, current.images, []);
  }

  return setSnapshot(properties.filter((item) => item.id !== String(id)));
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
