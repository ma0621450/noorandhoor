import { notFound } from "next/navigation";
import BlogArticle from "@/components/sections/blog/BlogArticle";
import { getPublishedPostBySlug, getRelatedPosts } from "@/lib/blog/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: "Article | Noor & Hoor Properties",
    };
  }

  return {
    title: `${post.title} | Noor & Hoor Properties`,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      title: `${post.title} | Noor & Hoor Properties`,
      description: post.excerpt,
      type: "article",
      url: `/blog/${slug}`,
    },
  };
}

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const related = await getRelatedPosts(slug);

  return <BlogArticle post={post} related={related} />;
}
