"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import StatCard from "@/components/admin/ui/StatCard";
import AdminSplash from "@/components/admin/ui/AdminSplash";
import useAdminBlogs from "@/hooks/useAdminBlogs";
import useAdminProperties from "@/hooks/useAdminProperties";
import { getPropertyStats } from "@/lib/admin/data/properties";
import { getBlogStats } from "@/lib/admin/data/blogs";

export default function DashboardView() {
  const { properties, isReady: propertiesReady } = useAdminProperties();
  const { blogs, isReady: blogsReady } = useAdminBlogs();

  if (!propertiesReady || !blogsReady) {
    return <AdminSplash label="Loading dashboard" />;
  }

  const propertyStats = getPropertyStats(properties);
  const blogStats = getBlogStats(blogs);
  const recentProperties = properties.slice(0, 5);
  const recentBlogs = blogs.slice(0, 5);

  return (
    <div className="space-y-8">
      <PageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Review listings and publish content. This panel is frontend-only until Supabase is connected."
        actionLabel="Add property"
        actionHref="/admin/properties/new"
      />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Properties" value={propertyStats.total} hint={`${propertyStats.available} available`} />
        <StatCard label="Featured listings" value={propertyStats.featured} hint={`${propertyStats.reserved} reserved`} />
        <StatCard label="Published blogs" value={blogStats.published} hint={`${blogStats.drafts} drafts`} />
        <StatCard label="All posts" value={blogStats.total} hint={`${blogStats.featured} featured`} />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-white/8 bg-[#161616]">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <h2 className="admin-heading text-base font-semibold text-white">Recent properties</h2>
            <Link href="/admin/properties" className="text-xs font-semibold uppercase tracking-wide text-[#eec876]">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-white/6">
            {recentProperties.map((property) => (
              <li key={property.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{property.title}</p>
                  <p className="mt-1 text-xs text-white/45">
                    {property.type} · {property.location}
                  </p>
                </div>
                <Link
                  href={`/admin/properties/${property.id}/edit`}
                  className="inline-flex items-center gap-1 text-xs text-[#eec876]"
                >
                  Edit
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border border-white/8 bg-[#161616]">
          <div className="flex items-center justify-between border-b border-white/8 px-5 py-4">
            <h2 className="admin-heading text-base font-semibold text-white">Recent blogs</h2>
            <Link href="/admin/blogs" className="text-xs font-semibold uppercase tracking-wide text-[#eec876]">
              View all
            </Link>
          </div>
          <ul className="divide-y divide-white/6">
            {recentBlogs.map((blog) => (
              <li key={blog.id} className="flex items-center justify-between gap-4 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">{blog.title}</p>
                  <p className="mt-1 text-xs text-white/45">
                    {blog.category} · {blog.date}
                  </p>
                </div>
                <Link
                  href={`/admin/blogs/${blog.id}/edit`}
                  className="inline-flex items-center gap-1 text-xs text-[#eec876]"
                >
                  Edit
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
