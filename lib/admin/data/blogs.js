import { BLOG_CATEGORIES, BLOG_POSTS } from "@/components/sections/blog/blogData";
import { ADMIN_BLOGS_KEY } from "@/lib/admin/constants";
import { formatDisplayDate, resolveImageSrc, uniqueSlug } from "@/lib/admin/utils";

export const ADMIN_BLOG_CATEGORIES = BLOG_CATEGORIES.filter(
  (category) => category !== "All",
);

const EMPTY = [];
let listeners = new Set();
let snapshot = EMPTY;
let snapshotRaw;
let initialized = false;

function emit() {
  listeners.forEach((listener) => listener());
}

function normalizePost(post) {
  return {
    id: String(post.id),
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: post.category,
    content: (post.paragraphs || []).join("\n\n"),
    items: post.items || [],
    coverImage: resolveImageSrc(post.image),
    featured: Boolean(post.featured),
    status: post.status || "published",
    date: post.date,
    createdAt: post.createdAt || post.date,
    updatedAt: post.updatedAt || post.date,
  };
}

function seedBlogs() {
  return BLOG_POSTS.map(normalizePost);
}

function persist(next) {
  snapshot = next;
  snapshotRaw = JSON.stringify(next);
  window.localStorage.setItem(ADMIN_BLOGS_KEY, snapshotRaw);
  emit();
  return next;
}

export function subscribeBlogs(listener) {
  listeners.add(listener);
  if (typeof window !== "undefined") {
    window.addEventListener("storage", listener);
  }
  return () => {
    listeners.delete(listener);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", listener);
    }
  };
}

export function getBlogsSnapshot() {
  const raw = window.localStorage.getItem(ADMIN_BLOGS_KEY);
  if (initialized && raw === snapshotRaw) return snapshot;

  initialized = true;
  snapshotRaw = raw;

  if (!raw) {
    snapshot = seedBlogs();
    return snapshot;
  }

  try {
    snapshot = JSON.parse(raw);
  } catch {
    snapshot = seedBlogs();
  }
  return snapshot;
}

export function getBlogsServerSnapshot() {
  return EMPTY;
}

export function getBlogs() {
  if (typeof window === "undefined") return EMPTY;
  return getBlogsSnapshot();
}

export function getBlogById(id) {
  return getBlogs().find((blog) => blog.id === String(id)) || null;
}

export function createBlog(payload) {
  const blogs = getBlogsSnapshot();
  const now = new Date().toISOString();
  const blog = {
    id: crypto.randomUUID(),
    slug: uniqueSlug(payload.slug || payload.title, blogs),
    title: payload.title.trim(),
    excerpt: payload.excerpt.trim(),
    category: payload.category,
    content: payload.content.trim(),
    items: (payload.items || []).map((item) => item.trim()).filter(Boolean),
    coverImage: payload.coverImage || "",
    featured: Boolean(payload.featured),
    status: payload.status || "draft",
    date: formatDisplayDate(now),
    createdAt: now,
    updatedAt: now,
  };

  persist([blog, ...blogs]);
  return blog;
}

export function updateBlog(id, payload) {
  const blogs = getBlogsSnapshot();
  const now = new Date().toISOString();

  const next = blogs.map((blog) => {
    if (blog.id !== String(id)) return blog;

    return {
      ...blog,
      slug: uniqueSlug(payload.slug || payload.title, blogs, blog.id),
      title: payload.title.trim(),
      excerpt: payload.excerpt.trim(),
      category: payload.category,
      content: payload.content.trim(),
      items: (payload.items || []).map((item) => item.trim()).filter(Boolean),
      coverImage: payload.coverImage || "",
      featured: Boolean(payload.featured),
      status: payload.status || blog.status,
      date: blog.date,
      updatedAt: now,
    };
  });

  persist(next);
  return next.find((blog) => blog.id === String(id)) || null;
}

export function deleteBlog(id) {
  const next = getBlogsSnapshot().filter((blog) => blog.id !== String(id));
  persist(next);
  return next;
}

export function getBlogStats(blogs) {
  const list = blogs || getBlogs();
  return {
    total: list.length,
    published: list.filter((blog) => blog.status === "published").length,
    drafts: list.filter((blog) => blog.status === "draft").length,
    featured: list.filter((blog) => blog.featured).length,
  };
}
