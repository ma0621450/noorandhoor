import { relatedPosts, toPublicPost } from "@/lib/blog/public";
import { createAnonClient } from "@/lib/supabase/anon";

async function fetchPublishedRows() {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false, nullsFirst: false })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Could not load blog posts:", error.message);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error("Could not load blog posts:", error?.message || error);
    return [];
  }
}

export async function getPublishedPosts() {
  return (await fetchPublishedRows()).map(toPublicPost);
}

export async function getLatestPosts(limit = 3) {
  return (await getPublishedPosts()).slice(0, limit);
}

export async function getPublishedPostBySlug(slug) {
  try {
    const supabase = createAnonClient();
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("status", "published")
      .eq("slug", slug)
      .maybeSingle();

    if (error || !data) return null;
    return toPublicPost(data);
  } catch {
    return null;
  }
}

export async function getRelatedPosts(slug, limit = 3) {
  const posts = await getPublishedPosts();
  return relatedPosts(posts, slug, limit);
}
