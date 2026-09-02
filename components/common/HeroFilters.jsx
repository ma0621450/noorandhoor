"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Dropdown, { DropdownGroup } from "@/components/ui/Dropdown";
import {
  RENT_PRICE_OPTIONS,
  SALE_PRICE_OPTIONS,
  readFilterValues,
  searchDestination,
  toFilterQuery,
} from "@/lib/listingFilters";

function withPriceOptions(fields, transaction) {
  if (!transaction) return fields;
  return fields.map((field) => {
    if (field.key !== "price") return field;
    return {
      ...field,
      options: transaction === "Rent" ? RENT_PRICE_OPTIONS : SALE_PRICE_OPTIONS,
    };
  });
}

function searchHref({ variant, listingPath, values, fields }) {
  const dest = searchDestination({ variant, listingPath, values });
  const params = toFilterQuery(values, fields);
  const hash =
    variant === "developers" ? "developer-listings" : "property-listings";
  const query = params.toString();
  return query ? `${dest}?${query}#${hash}` : `${dest}#${hash}`;
}

function FilterBar({ fields, values, onChange, href }) {
  return (
    <div className="relative z-50 flex w-full max-w-6xl flex-col gap-3 lg:flex-row lg:items-center">
      <div className="grid w-full grid-cols-1 overflow-visible rounded-xl border border-white/25 bg-white/15 backdrop-blur-md sm:grid-cols-2 lg:flex lg:min-h-14 lg:items-stretch">
        <DropdownGroup>
          {fields.map((field) => (
            <Dropdown
              key={field.key}
              id={field.id}
              options={field.options}
              placeholder={field.placeholder}
              value={values[field.key] || field.placeholder}
              onChange={(next) => onChange(field.key, next)}
              className="w-full border-b border-white/20 last:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:min-h-14 lg:min-w-[150px] lg:flex-1 lg:border-r lg:border-b-0 lg:last:border-r-0 xl:min-w-[180px]"
            />
          ))}
        </DropdownGroup>
      </div>

      <Link
        href={href}
        aria-label="Search properties"
        className="inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#bc8741] to-[#d6a85e] px-4 py-3 text-xs font-semibold uppercase tracking-[1.3px] text-white transition-all duration-200 hover:from-[#d6a85e] hover:to-[#eec876] lg:hidden"
      >
        Search
        <Search className="h-4 w-4" strokeWidth={2.5} />
      </Link>

      <Link
        href={href}
        aria-label="Search properties"
        className="hidden size-14 shrink-0 items-center justify-center rounded-full text-[#d6a85e] transition hover:scale-105 lg:flex"
      >
        <Search className="h-8 w-8" strokeWidth={2.25} />
      </Link>
    </div>
  );
}

function HeroFiltersForm({ prefix, variant, listingPath, fields }) {
  const searchParams = useSearchParams();
  const [values, setValues] = useState(() =>
    readFilterValues(searchParams, fields),
  );

  const query = searchParams.toString();

  useEffect(() => {
    setValues(readFilterValues(searchParams, fields));
  }, [query]);

  const visibleFields = useMemo(() => {
    const next = withPriceOptions(fields, values.transaction);
    return next.map((field) => ({
      ...field,
      id: `${prefix}-${field.key}`,
    }));
  }, [fields, prefix, values.transaction]);

  const href = searchHref({
    variant,
    listingPath,
    values,
    fields: visibleFields,
  });

  return (
    <FilterBar
      fields={visibleFields}
      values={values}
      href={href}
      onChange={(key, value) => {
        setValues((current) => ({ ...current, [key]: value }));
      }}
    />
  );
}

export default function HeroFilters({ prefix, variant, listingPath, fields }) {
  const fallbackFields = fields.map((field) => ({
    ...field,
    id: `${prefix}-${field.key}`,
  }));

  return (
    <Suspense
      fallback={
        <FilterBar
          fields={fallbackFields}
          values={{}}
          href={searchHref({
            variant,
            listingPath,
            values: {},
            fields: fallbackFields,
          })}
          onChange={() => {}}
        />
      }
    >
      <HeroFiltersForm
        prefix={prefix}
        variant={variant}
        listingPath={listingPath}
        fields={fields}
      />
    </Suspense>
  );
}
