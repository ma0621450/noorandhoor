import { formatDisplayDate } from "@/lib/admin/utils";

export function paragraphsFromContent(content) {
  return String(content || "")
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toPublicPost(row) {
  const publishedAt = row.published_at || row.created_at;
  return {
    id: row.id,
    slug: row.slug,
    featured: Boolean(row.featured),
    image: row.cover_image || "",
    date: formatDisplayDate(publishedAt),
    category: row.category,
    title: row.title,
    excerpt: row.excerpt || "",
    paragraphs: paragraphsFromContent(row.content),
    items: Array.isArray(row.items) ? row.items : [],
  };
}

export function pickFeaturedPost(posts) {
  return posts.find((post) => post.featured) || posts[0] || null;
}

export function relatedPosts(posts, slug, limit = 3) {
  return posts.filter((post) => post.slug !== slug).slice(0, limit);
}
