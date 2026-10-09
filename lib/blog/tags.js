export const MAX_BLOG_TAGS = 8;
export const MAX_TAG_LENGTH = 32;

export function tagSlug(tag) {
  return String(tag || "")
    .trim()
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function normalizeTags(value) {
  const source = Array.isArray(value)
    ? value
    : String(value || "").split(/[,\n]/);
  const seen = new Set();
  const tags = [];

  for (const raw of source) {
    const tag = String(raw || "")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, MAX_TAG_LENGTH);
    const key = tag.toLowerCase();
    if (!tag || seen.has(key)) continue;
    seen.add(key);
    tags.push(tag);
    if (tags.length >= MAX_BLOG_TAGS) break;
  }

  return tags;
}

export function tagHref(tag) {
  const slug = tagSlug(tag);
  if (!slug) return "/blog#blog-listings";
  return `/blog?tag=${encodeURIComponent(slug)}#blog-listings`;
}

export function postHasTag(post, slug) {
  if (!slug) return true;
  return (post?.tags || []).some((tag) => tagSlug(tag) === slug);
}

export function tagLabelForSlug(posts, slug) {
  if (!slug) return "";
  for (const post of posts || []) {
    const match = (post.tags || []).find((tag) => tagSlug(tag) === slug);
    if (match) return match;
  }
  return slug.replace(/-/g, " ");
}
