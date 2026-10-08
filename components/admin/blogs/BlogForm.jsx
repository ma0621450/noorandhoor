"use client";

import { useRouter } from "next/navigation";
import BlogEditor from "@/components/admin/blogs/BlogEditor";
import AdminSplash from "@/components/admin/ui/AdminSplash";
import EmptyState from "@/components/admin/ui/EmptyState";
import useAdminBlogs from "@/hooks/useAdminBlogs";

export default function BlogForm({ blogId }) {
  const { blogs, isReady, createBlog, updateBlog } = useAdminBlogs();
  const router = useRouter();

  if (!isReady) return <AdminSplash label="Loading editor" />;

  if (!blogId) {
    return (
      <BlogEditor
        title="Upload blog"
        eyebrow="Create"
        submitLabel="Upload blog"
        blogs={blogs}
        onSave={createBlog}
      />
    );
  }

  const blog = blogs.find((item) => item.id === String(blogId));
  if (!blog) {
    return (
      <EmptyState
        title="Blog not found"
        description="This article is no longer in Supabase."
        actionLabel="Back to blogs"
        onAction={() => router.push("/admin/blogs")}
      />
    );
  }

  return (
    <BlogEditor
      key={blog.id}
      title="Edit blog"
      eyebrow="Edit"
      submitLabel="Save changes"
      initialBlog={blog}
      blogs={blogs}
      onSave={(payload) => updateBlog(blog.id, payload)}
    />
  );
}
