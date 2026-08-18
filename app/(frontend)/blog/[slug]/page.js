import { notFound } from "next/navigation";
import BlogArticle from "@/components/sections/blog/BlogArticle";
import { BLOG_POSTS, getBlogBySlug } from "@/components/sections/blog/blogData";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return {
      title: "Article | Noor & Hoor Properties",
    };
  }

  return {
    title: `${post.title} | Noor & Hoor Properties`,
    description: post.excerpt,
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogArticle post={post} />;
}
