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
  SelectField,
  TextArea,
  TextField,
} from "@/components/admin/ui/Fields";
import VisibilityPanel from "@/components/admin/ui/VisibilityPanel";
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
  featuredOnHome: false,
  featuredAsHero: false,
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
    featuredOnHome: Boolean(blog.featuredOnHome),
    featuredAsHero: Boolean(blog.featuredAsHero),
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

function BlogEditor({
  title,
  eyebrow,
  submitLabel,
  initialBlog,
  blogs = [],
  onSave,
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState(() =>
    initialBlog ? toForm(initialBlog) : EMPTY_FORM,
  );
  const [errors, setErrors] = useState({});
  const [slugLocked, setSlugLocked] = useState(Boolean(initialBlog));
  const [isSaving, setIsSaving] = useState(false);

  const currentHero = useMemo(
    () => blogs.find((item) => item.featuredAsHero) || null,
    [blogs],
  );
  const heroTakenByOther = Boolean(
    currentHero && currentHero.id !== initialBlog?.id,
  );

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

  const onSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(validation).length) {
      setErrors(validation);
      showToast("Please complete the required fields.", "error");
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        ...form,
        items: form.items.filter((item) => item.trim()),
      });
      showToast(initialBlog ? "Blog updated." : "Blog uploaded.");
      router.push("/admin/blogs");
    } catch (error) {
      showToast(
        error?.message || "Could not save this blog. Please try again.",
        "error",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description="Cover image, copy, and publishing state are stored in Supabase."
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
            tooltip="Auto-fills from the title. Change only if you need a custom URL."
          />
          <TextArea
            id="excerpt"
            label="Excerpt"
            rows={3}
            value={form.excerpt}
            onChange={(event) => setField("excerpt", event.target.value)}
            error={errors.excerpt}
            placeholder="A short summary for listing cards."
            tooltip="Short summary shown on blog cards and the home Blog section."
          />
          <TextArea
            id="content"
            label="Article body"
            rows={10}
            value={form.content}
            onChange={(event) => setField("content", event.target.value)}
            error={errors.content}
            hint="Separate paragraphs with a blank line."
            tooltip="Main article content. Use a blank line between paragraphs."
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

        <aside className="space-y-5">
          <div className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
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
              tooltip="Used for blog filters and labels on listing cards."
            />
            <SelectField
              id="status"
              label="Status"
              value={form.status}
              onChange={(event) => setField("status", event.target.value)}
              options={BLOG_STATUSES}
              tooltip="Published posts are public. Drafts stay hidden until you publish."
            />
          </div>

          <VisibilityPanel
            title="Featured placement"
            description="Home can feature several articles. The blog listing hero is limited to one."
            items={[
              {
                id: "featured-on-home",
                label: "Feature on home page",
                description:
                  "Include this post in Blog & Latest News on the home page. Multiple articles can be featured.",
                tooltip:
                  "Home shows featured articles first. If none are featured, it falls back to the latest posts.",
                checked: form.featuredOnHome,
                onChange: (checked) => setField("featuredOnHome", checked),
              },
              {
                id: "featured-as-hero",
                label: "Use as blog hero",
                description: heroTakenByOther
                  ? `Hero is already set to “${currentHero.title}”. Uncheck it there first to choose a different hero.`
                  : "Show this post as the large hero at the top of the Blog listing page. Only one hero is allowed.",
                tooltip: heroTakenByOther
                  ? "Only one blog hero is allowed. Open the current hero article and turn this off first."
                  : "Only one article can be the blog hero at a time.",
                checked: form.featuredAsHero,
                onChange: (checked) => setField("featuredAsHero", checked),
                disabled: heroTakenByOther,
              },
            ]}
          />
        </aside>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <AdminButton
          variant="secondary"
          disabled={isSaving}
          onClick={() => router.push("/admin/blogs")}
        >
          Cancel
        </AdminButton>
        <AdminButton type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : submitLabel}
        </AdminButton>
      </div>
    </form>
  );
}
