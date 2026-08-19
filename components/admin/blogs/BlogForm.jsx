"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import AdminButton from "@/components/admin/ui/AdminButton";
import ImageUploader from "@/components/admin/ui/ImageUploader";
import AdminSplash from "@/components/admin/ui/AdminSplash";
import EmptyState from "@/components/admin/ui/EmptyState";
import {
  CheckboxField,
  SelectField,
  TextArea,
  TextField,
} from "@/components/admin/ui/Fields";
import { useToast } from "@/components/admin/providers/ToastProvider";
import useAdminBlogs from "@/hooks/useAdminBlogs";
import { BLOG_STATUSES } from "@/lib/admin/constants";
import { ADMIN_BLOG_CATEGORIES } from "@/lib/admin/data/blogs";
import { slugify } from "@/lib/admin/utils";

const EMPTY_FORM = {
  title: "",
  slug: "",
  category: ADMIN_BLOG_CATEGORIES[0],
  excerpt: "",
  content: "",
  items: [""],
  coverImage: "",
  featured: false,
  status: "published",
};

function toForm(blog) {
  return {
    title: blog.title,
    slug: blog.slug,
    category: blog.category,
    excerpt: blog.excerpt,
    content: blog.content,
    items: blog.items?.length ? blog.items : [""],
    coverImage: blog.coverImage,
    featured: blog.featured,
    status: blog.status,
  };
}

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
        onSave={createBlog}
      />
    );
  }

  const blog = blogs.find((item) => item.id === String(blogId));
  if (!blog) {
    return (
      <EmptyState
        title="Blog not found"
        description="This article is no longer in the local admin store."
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
      onSave={(payload) => updateBlog(blog.id, payload)}
    />
  );
}

function BlogEditor({ title, eyebrow, submitLabel, initialBlog, onSave }) {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState(() =>
    initialBlog ? toForm(initialBlog) : EMPTY_FORM,
  );
  const [errors, setErrors] = useState({});
  const [slugLocked, setSlugLocked] = useState(Boolean(initialBlog));

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onTitleChange = (value) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugLocked ? current.slug : slugify(value),
    }));
    setErrors((current) => ({ ...current, title: undefined }));
  };

  const validation = useMemo(() => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.slug.trim()) next.slug = "Slug is required.";
    if (!form.excerpt.trim()) next.excerpt = "Excerpt is required.";
    if (!form.content.trim()) next.content = "Write at least one paragraph.";
    if (!form.coverImage) next.coverImage = "Upload a cover image.";
    return next;
  }, [form]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(validation).length) {
      setErrors(validation);
      showToast("Please complete the required fields.", "error");
      return;
    }

    onSave({
      ...form,
      items: form.items.filter((item) => item.trim()),
    });
    showToast(initialBlog ? "Blog updated." : "Blog uploaded.");
    router.push("/admin/blogs");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description="Cover image, copy, and publishing state are stored locally for now."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
          <TextField
            id="title"
            label="Title"
            value={form.title}
            onChange={(event) => onTitleChange(event.target.value)}
            error={errors.title}
            placeholder="Dubai property market trends"
          />
          <TextField
            id="slug"
            label="Slug"
            value={form.slug}
            onChange={(event) => {
              setSlugLocked(true);
              setField("slug", slugify(event.target.value));
            }}
            error={errors.slug}
            hint="Used in the public URL: /blog/your-slug"
          />
          <TextArea
            id="excerpt"
            label="Excerpt"
            rows={3}
            value={form.excerpt}
            onChange={(event) => setField("excerpt", event.target.value)}
            error={errors.excerpt}
            placeholder="A short summary for listing cards."
          />
          <TextArea
            id="content"
            label="Article body"
            rows={10}
            value={form.content}
            onChange={(event) => setField("content", event.target.value)}
            error={errors.content}
            hint="Separate paragraphs with a blank line."
          />

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium uppercase tracking-[1.4px] text-white/60">
                Key points
              </p>
              <AdminButton
                size="sm"
                variant="secondary"
                onClick={() => setField("items", [...form.items, ""])}
              >
                <Plus className="h-3.5 w-3.5" />
                Add point
              </AdminButton>
            </div>
            {form.items.map((item, index) => (
              <div key={`item-${index}`} className="flex gap-2">
                <input
                  value={item}
                  onChange={(event) => {
                    const next = [...form.items];
                    next[index] = event.target.value;
                    setField("items", next);
                  }}
                  placeholder={`Point ${index + 1}`}
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#171717] px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40"
                />
                <AdminButton
                  size="icon"
                  variant="ghost"
                  aria-label="Remove point"
                  onClick={() =>
                    setField(
                      "items",
                      form.items.filter((_, itemIndex) => itemIndex !== index),
                    )
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </AdminButton>
              </div>
            ))}
          </div>
        </div>

        <aside className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
          <ImageUploader
            value={form.coverImage}
            onChange={(value) => setField("coverImage", value)}
            error={errors.coverImage}
          />
          <SelectField
            id="category"
            label="Category"
            value={form.category}
            onChange={(event) => setField("category", event.target.value)}
            options={ADMIN_BLOG_CATEGORIES}
          />
          <SelectField
            id="status"
            label="Status"
            value={form.status}
            onChange={(event) => setField("status", event.target.value)}
            options={BLOG_STATUSES}
          />
          <CheckboxField
            id="featured"
            label="Feature this article"
            checked={form.featured}
            onChange={(checked) => setField("featured", checked)}
          />
        </aside>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <AdminButton variant="secondary" onClick={() => router.push("/admin/blogs")}>
          Cancel
        </AdminButton>
        <AdminButton type="submit">{submitLabel}</AdminButton>
      </div>
    </form>
  );
}
