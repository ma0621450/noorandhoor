"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
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
import useAdminProperties from "@/hooks/useAdminProperties";
import useDebouncedValue from "@/hooks/useDebouncedValue";
import {
  PAGE_SIZE,
  PROPERTY_MARKETS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} from "@/lib/admin/constants";
import { formatPrice } from "@/lib/admin/utils";

const ALL = "all";

export default function PropertyListing() {
  const { properties, isReady, deleteProperty } = useAdminProperties();
  const { showToast } = useToast();
  const [query, setQuery] = useState("");
  const [market, setMarket] = useState(ALL);
  const [type, setType] = useState(ALL);
  const [status, setStatus] = useState(ALL);
  const [page, setPage] = useState(1);
  const [pendingDelete, setPendingDelete] = useState(null);
  const debouncedQuery = useDebouncedValue(query);

  const filtered = useMemo(() => {
    const needle = debouncedQuery.trim().toLowerCase();

    return properties.filter((property) => {
      const matchesQuery =
        !needle ||
        property.title.toLowerCase().includes(needle) ||
        property.location.toLowerCase().includes(needle) ||
        property.slug.toLowerCase().includes(needle);
      const matchesMarket = market === ALL || property.market === market;
      const matchesType = type === ALL || property.type === type;
      const matchesStatus = status === ALL || property.status === status;
      return matchesQuery && matchesMarket && matchesType && matchesStatus;
    });
  }, [properties, debouncedQuery, market, type, status]);

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

  if (!isReady) return <AdminSplash label="Loading properties" />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Inventory"
        title="Properties"
        description="Create, edit, and remove listings. Data is stored locally until Supabase is connected."
        actionLabel="Add property"
        actionHref="/admin/properties/new"
      />

      <div className="grid gap-3 rounded-2xl border border-white/8 bg-[#161616] p-4 lg:grid-cols-4">
        <SearchInput
          value={query}
          onChange={updateFilter(setQuery)}
          placeholder="Search title, location, or slug"
        />
        <SelectField
          id="market"
          value={market}
          onChange={(event) => updateFilter(setMarket)(event.target.value)}
          options={[
            { value: ALL, label: "All markets" },
            ...PROPERTY_MARKETS.map((item) => ({
              value: item,
              label: item,
            })),
          ]}
        />
        <SelectField
          id="type"
          value={type}
          onChange={(event) => updateFilter(setType)(event.target.value)}
          options={[{ value: ALL, label: "All types" }, ...PROPERTY_TYPES]}
        />
        <SelectField
          id="status"
          value={status}
          onChange={(event) => updateFilter(setStatus)(event.target.value)}
          options={[{ value: ALL, label: "All statuses" }, ...PROPERTY_STATUSES]}
        />
      </div>

      {pageItems.length === 0 ? (
        <EmptyState
          title="No properties yet"
          description="Add your first listing, or clear the current filters."
          actionLabel="Add property"
          actionHref="/admin/properties/new"
        />
      ) : (
        <>
          <div className="hidden overflow-hidden rounded-2xl border border-white/8 bg-[#161616] lg:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-white/8 text-xs uppercase tracking-[1.2px] text-white/45">
                <tr>
                  <th className="px-5 py-4 font-medium">Property</th>
                  <th className="px-5 py-4 font-medium">Market</th>
                  <th className="px-5 py-4 font-medium">Type</th>
                  <th className="px-5 py-4 font-medium">Price</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                  <th className="px-5 py-4 font-medium"> </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/6">
                {pageItems.map((property) => (
                  <tr key={property.id} className="align-middle">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-white/8">
                          <MediaThumb src={property.image} alt={property.title} />
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-white">{property.title}</p>
                          <p className="mt-1 text-xs text-white/45">{property.location}</p>
                          {property.featured ? (
                            <div className="mt-2">
                              <StatusBadge status="featured" />
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 capitalize text-white/70">{property.market}</td>
                    <td className="px-5 py-4 text-white/70">{property.type}</td>
                    <td className="px-5 py-4 text-[#eec876]">{formatPrice(property.price)}</td>
                    <td className="px-5 py-4">
                      <StatusBadge status={property.status} />
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        {property.href ? (
                          <Link
                            href={property.href}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex size-9 items-center justify-center text-[#eec876]"
                            aria-label="View on site"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </Link>
                        ) : null}
                        <Link href={`/admin/properties/${property.id}/edit`}>
                          <AdminButton size="icon" variant="ghost" aria-label="Edit property">
                            <Pencil className="h-4 w-4" />
                          </AdminButton>
                        </Link>
                        <AdminButton
                          size="icon"
                          variant="danger"
                          aria-label="Delete property"
                          onClick={() => setPendingDelete(property)}
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
            {pageItems.map((property) => (
              <article
                key={property.id}
                className="rounded-2xl border border-white/8 bg-[#161616] p-4"
              >
                <div className="flex gap-3">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-white/8">
                    <MediaThumb src={property.image} alt={property.title} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-white">{property.title}</p>
                    <p className="mt-1 text-xs text-white/45">{property.location}</p>
                    <p className="mt-2 text-sm text-[#eec876]">{formatPrice(property.price)}</p>
                  </div>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <StatusBadge status={property.status} />
                  <span className="text-xs capitalize text-white/45">
                    {property.market} · {property.type}
                  </span>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link href={`/admin/properties/${property.id}/edit`} className="flex-1">
                    <AdminButton variant="secondary" className="w-full" size="sm">
                      Edit
                    </AdminButton>
                  </Link>
                  <AdminButton
                    variant="danger"
                    size="sm"
                    onClick={() => setPendingDelete(property)}
                  >
                    Delete
                  </AdminButton>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="text-xs text-white/40">
              Showing {pageItems.length} of {filtered.length} properties
            </p>
            <Pagination
              page={currentPage}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </div>
        </>
      )}

      <ConfirmDialog
        open={Boolean(pendingDelete)}
        title="Delete this listing?"
        description={`“${pendingDelete?.title || ""}” will be removed from the admin preview. This does not yet affect the public site.`}
        confirmLabel="Delete"
        onClose={() => setPendingDelete(null)}
        onConfirm={() => {
          deleteProperty(pendingDelete.id);
          setPendingDelete(null);
          showToast("Property deleted.");
        }}
      />
    </div>
  );
}
