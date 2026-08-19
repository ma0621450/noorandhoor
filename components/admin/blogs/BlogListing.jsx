"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import SearchInput from "@/components/admin/ui/SearchInput";
import { SelectField } from "@/components/admin/ui/Fields";
import StatusBadge from "@/components/admin/ui/StatusBadge";
import EmptyState from "@/components/admin/ui/EmptyState";
import Pagination from "@/components/admin/ui/Pagination";
import MediaThumb from "@/components/admin/ui/MediaThumb";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminSplash from "@/components/admin/ui/AdminSplash";
import { useToast } from "@/components/admin/providers/ToastProvider";
import useAdminBlogs from "@/hooks/useAdminBlogs";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { BLOG_STATUSES, PAGE_SIZE } from "@/lib/admin/constants";
import { ADMIN_BLOG_CATEGORIES } from "@/lib/admin/data/blogs";

const ALL = "all";

export default function BlogListing() {
  const { blogs, isReady, deleteBlog } = useAdminBlogs();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const debouncedQuery = useDebouncedValue(query);

  const filtered = useMemo(() => {
    const needle = debouncedQuery.trim().toLowerCase();

    return blogs.filter((blog) => {
      const matchesQuery =
        !needle ||
        blog.title.toLowerCase().includes(needle) ||
        blog.excerpt.toLowerCase().includes(needle);
      const matchesCategory = category === ALL || blog.category === category;
      const matchesStatus = status === ALL || blog.status === status;
      return matchesQuery && matchesCategory && matchesStatus;
    });
  }, [blogs, debouncedQuery, category, status]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const updateFilter = (setter) => (value) => {
    setter(value);
    setPage(1);
  };

  if (!isReady) return <AdminSplash label="Loading blogs" />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Content"
        title="Blogs"
        description="Upload, edit, and unpublish articles. Posts are stored locally until Supabase is connected."
        actionLabel="Upload blog"
        actionHref="/admin/blogs/new"
      />

      <div className="grid gap-3 rounded-2xl border border-white/8 bg-[#161616] p-4 lg:grid-cols-3">
        <SearchInput
          value={query}
          onChange={updateFilter(setQuery)}
          placeholder="Search title or excerpt"
        />
        <SelectField
          id="blog-category"
          value={category}
          onChange={(event) => updateFilter(setCategory)(event.target.value)}
          options={[{ value: ALL, label: "All categories" }, ...ADMIN_BLOG_CATEGORIES]}
        />
        <SelectField
          id="blog-status"
          value={status}
          onChange={(event) => updateFilter(setStatus)(event.target.value)}
          options={[{ value: ALL, label: "All statuses" }, ...BLOG_STATUSES]}
        />
      </div>

      {pageItems.length === 0 ? (
        <EmptyState
          title="No blog posts yet"
          description="Upload your first article to see it listed here."
          actionLabel="Upload blog"
          actionHref="/admin/blogs/new"
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-white/8 bg-[#161616] lg:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/8 text-xs uppercase tracking-[1.2px] text-white/45">
                <tr>
                  <th className="px-5 py-4 font-medium">Article</th>
                  <th className="px-5 py-4 font-medium">Category</th>
                  <th className="px-5 py-4 font-medium">Date</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium"> </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {pageItems.map((blog) => (
                  <tr key={blog.id}>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-white/8">
                          <MediaThumb src={blog.coverImage} alt={blog.title} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white">{blog.title}</p>
                          <p className="mt-1 line-clamp-1 text-xs text-white/45">{blog.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/70">{blog.category}</td>
                    <td className="px-5 py-4 text-white/70">{blog.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex flex-wrap gap-2">
                        <StatusBadge status={blog.status} />
                        {blog.featured ? <StatusBadge status="featured" /> : null}
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/blogs/${blog.id}/edit`}>
                          <AdminButton size="icon" variant="ghost" aria-label="Edit blog">
                            <Pencil className="h-4 w-4" />
                          </AdminButton>
                        </Link>
                        <AdminButton
                          size="icon"
                          variant="danger"
                          aria-label="Delete blog"
                          onClick={() => setPendingDelete(blog)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </AdminButton>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 lg:hidden">
            {pageItems.map((blog) => (
              <article key={blog.id} className="rounded-2xl border border-white/8 bg-[#161616] p-4">
                <div className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-white/8">
                    <MediaThumb src={blog.coverImage} alt={blog.title} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white">{blog.title}</p>
                    <p className="mt-1 text-xs text-white/45">{blog.category}</p>
                    <div className="mt-2">
                      <StatusBadge status={blog.status} />
                    </div>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/admin/blogs/${blog.id}/edit`} className="flex-1">
                    <AdminButton variant="secondary" className="w-full" size="sm">
                      Edit
                    </AdminButton>
                  </Link>
                  <AdminButton
                    variant="danger"
                    size="sm"
                    onClick={() => setPendingDelete(blog)}
                  >
                    Delete
                  </AdminButton>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this article?"
        description={`“${pendingDelete?.title || ""}” will be removed from the admin preview. This does not yet affect the public site.`}
        confirmLabel="Delete"
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          deleteBlog(pendingDelete.id);
          setPendingDelete(null);
          showToast("Blog deleted.");
        }}
      />
    </div>
  );
}
