import { createClient } from "@/lib/supabase/client";

const TABLE = "developers";
const IMAGE_BUCKET = "developer-images";
const EMPTY = [];
const DEVELOPER_COLUMNS =
  "id, developer_name, title, image_path, point_one, point_two, point_three, cta_url, created_at, updated_at";

let listeners = new Set();
let snapshot = EMPTY;
let client;

function getClient() {
  client ??= createClient();
  return client;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function setSnapshot(next) {
  snapshot = next;
  emit();
  return snapshot;
}

function fromDatabase(row) {
  const imagePath = row.image_path || "";
  const image = imagePath
    ? getClient().storage.from(IMAGE_BUCKET).getPublicUrl(imagePath).data.publicUrl
    : "";

  return {
    id: row.id,
    developerName: row.developer_name,
    title: row.title,
    imagePath,
    image,
    pointOne: row.point_one,
    pointTwo: row.point_two,
    pointThree: row.point_three,
    ctaUrl: row.cta_url || "/off-plan",
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function toDatabase(payload) {
  return {
    developer_name: String(payload.developerName || "").trim(),
    title: String(payload.title || "").trim(),
    image_path: String(payload.imagePath || payload.image || "").trim() || null,
    point_one: String(payload.pointOne || "").trim(),
    point_two: String(payload.pointTwo || "").trim(),
    point_three: String(payload.pointThree || "").trim(),
    cta_url: String(payload.ctaUrl || "/off-plan").trim(),
    updated_at: new Date().toISOString(),
  };
}

function throwOnError(error) {
  if (error) throw new Error(error.message || "Developer request failed.");
}

export function subscribeDevelopers(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getDevelopersSnapshot() {
  return snapshot;
}

export function getDevelopersServerSnapshot() {
  return EMPTY;
}

export async function loadDevelopers() {
  if (typeof window === "undefined") return EMPTY;

  const { data, error } = await getClient()
    .from(TABLE)
    .select(DEVELOPER_COLUMNS)
    .order("created_at", { ascending: false });

  throwOnError(error);
  return setSnapshot((data || []).map(fromDatabase));
}

export function getDevelopers() {
  return snapshot;
}

export async function createDeveloper(payload) {
  const { data, error } = await getClient()
    .from(TABLE)
    .insert(toDatabase(payload))
    .select(DEVELOPER_COLUMNS)
    .single();

  throwOnError(error);
  const created = fromDatabase(data);
  setSnapshot([created, ...snapshot]);
  return created;
}

export async function updateDeveloper(id, payload) {
  const { data, error } = await getClient()
    .from(TABLE)
    .update(toDatabase(payload))
    .eq("id", id)
    .select(DEVELOPER_COLUMNS)
    .single();

  throwOnError(error);
  const updated = fromDatabase(data);
  setSnapshot(
    snapshot.map((developer) =>
      developer.id === id ? updated : developer,
    ),
  );
  return updated;
}

export async function deleteDeveloper(id) {
  const { error } = await getClient().from(TABLE).delete().eq("id", id);
  throwOnError(error);
  setSnapshot(snapshot.filter((developer) => developer.id !== id));
}