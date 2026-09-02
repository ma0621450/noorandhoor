import { isInlineImageSrc } from "@/lib/admin/utils";

export const BLOG_IMAGES_BUCKET = "blog-images";

function extFromMime(mime) {
  if (mime.includes("png")) return "png";
  if (mime.includes("webp")) return "webp";
  if (mime.includes("gif")) return "gif";
  return "jpg";
}

function dataUrlToBytes(dataUrl) {
  const match = /^data:(image\/[a-zA-Z0-9.+-]+);base64,(.+)$/.exec(dataUrl);
  if (!match) throw new Error("The cover image is invalid.");
  const mime = match[1];
  const binary = atob(match[2]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) bytes[i] = binary.charCodeAt(i);
  return { mime, bytes };
}

export function storagePathFromPublicUrl(url) {
  const marker = `/storage/v1/object/public/${BLOG_IMAGES_BUCKET}/`;
  const index = String(url || "").indexOf(marker);
  if (index === -1) return null;
  return decodeURIComponent(url.slice(index + marker.length));
}

export async function uploadCoverImage(supabase, blogId, image) {
  if (!image || !isInlineImageSrc(image)) return image || "";

  const { mime, bytes } = dataUrlToBytes(image);
  const path = `${blogId}/${Date.now()}.${extFromMime(mime)}`;
  const { error } = await supabase.storage
    .from(BLOG_IMAGES_BUCKET)
    .upload(path, bytes, { contentType: mime, upsert: false });

  if (error) {
    throw new Error(error.message || "Could not upload the cover image.");
  }

  const { data } = supabase.storage.from(BLOG_IMAGES_BUCKET).getPublicUrl(path);
  return data.publicUrl;
}

export async function removeCoverImage(supabase, url) {
  const path = storagePathFromPublicUrl(url);
  if (!path) return;
  await supabase.storage.from(BLOG_IMAGES_BUCKET).remove([path]);
}
