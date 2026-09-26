"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react";
import AdminButton from "@/components/admin/ui/AdminButton";
import AdminSplash from "@/components/admin/ui/AdminSplash";
import ConfirmDialog from "@/components/admin/ui/ConfirmDialog";
import EmptyState from "@/components/admin/ui/EmptyState";
import PageHeader from "@/components/admin/ui/PageHeader";
import Pagination from "@/components/admin/ui/Pagination";
import SearchInput from "@/components/admin/ui/SearchInput";
import { useToast } from "@/components/admin/providers/ToastProvider";
import useAdminDevelopers from "@/hooks/useAdminDevelopers";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import { PAGE_SIZE } from "@/lib/admin/constants";

export default function DeveloperListing() {
  const { developers, isReady, error, deleteDeveloper } = useAdminDevelopers();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const debouncedQuery = useDebouncedValue(query);

  const filtered = useMemo(() => {
    const needle = debouncedQuery.trim().toLowerCase();

    return developers.filter((developer) => {
      const searchable = [
        developer.developerName,
        developer.title,
        developer.pointOne,
        developer.pointTwo,
        developer.pointThree,
      ].filter(Boolean).join(" ").toLowerCase();

      return !needle || searchable.includes(needle);
    });
  }, [debouncedQuery, developers]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  if (!isReady) return <AdminSplash label="Loading developers" />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Partners"
        title="Developers"
        description="Manage trusted developer profiles and showcase them across the public site."
        actionLabel="Add developer"
        actionHref="/admin/developers/new"
      />

      <div className="rounded-2xl border border-white/8 bg-[#161616] p-4">
        <SearchInput
          value={query}
          onChange={(value) => {
            setQuery(value);
            setPage(1);
          }}
          placeholder="Search developer or title"
        />
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-red-400/20 bg-red-400/5 p-4 text-sm text-red-200"
        >
          Could not load developers: {error}
        </p>
      ) : pageItems.length === 0 ? (
        <EmptyState
          title="No developers yet"
          description="Add your first developer profile to start managing partner listings."
          actionLabel="Add developer"
          actionHref="/admin/developers/new"
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-white/8 bg-[#161616] lg:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/8 text-xs uppercase tracking-[1.2px] text-white/45">
                <tr>
                  <th className="px-5 py-4 font-medium">Developer name</th>
                  <th className="px-5 py-4 font-medium">Title</th>
                  <th className="px-5 py-4 font-medium">Points</th>
                  <th className="px-5 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {pageItems.map((developer) => (
                  <tr key={developer.id}>
                    <td className="px-5 py-4">
                      <div className="min-w-0">
                        <p className="font-medium text-white">{developer.developerName || developer.title || developer.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-white/70">{developer.title}</td>
                    <td className="px-5 py-4 text-white/70">
                      {[developer.pointOne, developer.pointTwo, developer.pointThree]
                        .filter(Boolean)
                        .join(" | ")}
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <Link href={`/admin/developers/${developer.id}/edit`}>
                          <AdminButton size="icon" variant="ghost" aria-label="Edit developer">
                            <Pencil className="h-4 w-4" />
                          </AdminButton>
                        </Link>
                        <AdminButton
                          size="icon"
                          variant="danger"
                          aria-label="Delete developer"
                          onClick={() => setPendingDelete(developer)}
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
            {pageItems.map((developer) => (
              <article key={developer.id} className="rounded-2xl border border-white/8 bg-[#161616] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white">{developer.developerName || developer.title || developer.name}</p>
                    <p className="mt-1 text-xs text-white/55">{developer.title}</p>
                  </div>
                </div>

                <div className="mt-3 space-y-1 text-sm text-white/65">
                  {[developer.pointOne, developer.pointTwo, developer.pointThree]
                    .filter(Boolean)
                    .map((point) => (
                      <p key={point}>{point}</p>
                    ))}
                </div>

                <div className="mt-4 flex gap-2">
                  <Link href={`/admin/developers/${developer.id}/edit`} className="flex-1">
                    <AdminButton variant="secondary" className="w-full" size="sm">
                      Edit
                    </AdminButton>
                  </Link>
                  <AdminButton
                    variant="danger"
                    size="sm"
                    onClick={() => setPendingDelete(developer)}
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
        title="Delete this developer?"
        description={`“${pendingDelete?.developerName || pendingDelete?.title || pendingDelete?.name || ""}” will be removed from the management list.`}
        confirmLabel="Delete"
        onClose={() => setPendingDelete(null)}
        onConfirm={async () => {
          try {
            await deleteDeveloper(pendingDelete.id);
            setPendingDelete(null);
            showToast("Developer deleted.");
          } catch (error) {
            showToast(error?.message || "Could not delete developer.", "error");
          }
        }}
      />
    </div>
  );
}
