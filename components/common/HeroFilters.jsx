"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import Dropdown, { DropdownGroup } from "@/components/ui/Dropdown";
import {
  RENT_PRICE_OPTIONS,
  SALE_PRICE_OPTIONS,
  defaultPropertyFilterValues,
  isActiveFilterValue,
  readFilterValues,
  searchDestination,
  subcategoryOptionsForMarket,
  toFilterQuery,
} from "@/lib/listingFilters";

function hasActiveFilters(values, fields) {
  return fields.some((field) =>
    isActiveFilterValue(values[field.key], field.placeholder, field.options),
  );
}

function selectedMarket(values) {
  return values.category || values.transaction || "";
}

function withCascadingOptions(fields, values) {
  const market = selectedMarket(values);
  const typeOptions = subcategoryOptionsForMarket(market);
  const priceOptions =
    market === "Rent" ? RENT_PRICE_OPTIONS : SALE_PRICE_OPTIONS;

  return fields.map((field) => {
    if (field.key === "type" && typeOptions.length) {
      return { ...field, options: typeOptions };
    }
    if (field.key === "price" && market) {
      return { ...field, options: priceOptions };
    }
    return field;
  });
}

function mergeFilterValues(searchParams, fields, variant) {
  return {
    ...defaultPropertyFilterValues(variant),
    ...readFilterValues(searchParams, fields),
  };
}

function searchHref({ variant, listingPath, values, fields }) {
  const dest = searchDestination({ variant, listingPath, values });
  const params = toFilterQuery(values, fields);
  const query = params.toString();
  return query ? `${dest}?${query}#property-listings` : `${dest}#property-listings`;
}

function ResetFiltersButton({ disabled, onReset }) {
  return (
    <button
      type="button"
      onClick={onReset}
      disabled={disabled}
      className="inline-flex min-h-11 w-full shrink-0 items-center justify-center rounded-xl border border-[#ba8a44] bg-[#ba8a44]/15 px-3 py-2.5 text-[11px] font-semibold uppercase tracking-[1.1px] text-[#eec876] transition hover:border-[#eec876] hover:bg-[#ba8a44]/30 hover:text-white disabled:cursor-not-allowed disabled:border-white/15 disabled:bg-transparent disabled:text-white/35 sm:w-auto sm:px-4 sm:text-xs sm:tracking-[1.3px] lg:min-h-14 lg:px-5"
    >
      Reset filters
    </button>
  );
}

function FilterBar({ fields, values, onChange, href, canReset, onReset }) {
  return (
    <div className="relative z-50 flex w-full max-w-6xl flex-col items-stretch gap-3 lg:items-center">
      <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center">
        <div className="grid w-full min-w-0 grid-cols-1 overflow-visible rounded-xl border border-white/25 bg-white/15 backdrop-blur-md sm:grid-cols-2 lg:flex lg:min-h-14 lg:items-stretch">
          <DropdownGroup>
            {fields.map((field) => (
              <Dropdown
                key={field.key}
                id={field.id}
                options={field.options}
                placeholder={field.placeholder}
                value={values[field.key] || field.placeholder}
                onChange={(next) => onChange(field.key, next)}
                className="w-full min-w-0 border-b border-white/20 last:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:min-h-14 lg:min-w-0 lg:flex-1 lg:border-r lg:border-b-0 lg:last:border-r-0"
              />
            ))}
          </DropdownGroup>
        </div>

        <div className="flex w-full min-w-0 flex-col items-stretch gap-3 sm:flex-row lg:w-auto lg:shrink-0">
          <ResetFiltersButton disabled={!canReset} onReset={onReset} />

          <Link
            href={href}
            aria-label="Search properties"
            className="inline-flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#bc8741] to-[#d6a85e] px-4 py-3 text-xs font-semibold uppercase tracking-[1.3px] text-white transition-all duration-200 hover:from-[#d6a85e] hover:to-[#eec876] lg:hidden"
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
      </div>
    </div>
  );
}

function HeroFiltersForm({ prefix, variant, listingPath, fields }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [values, setValues] = useState(() =>
    mergeFilterValues(searchParams, fields, variant),
  );

  const query = searchParams.toString();

  useEffect(() => {
    setValues(mergeFilterValues(searchParams, fields, variant));
  }, [fields, query, variant]);

  const visibleFields = useMemo(() => {
    const next = withCascadingOptions(fields, values);
    return next.map((field) => ({
      ...field,
      id: `${prefix}-${field.key}`,
    }));
  }, [fields, prefix, values]);

  const href = searchHref({
    variant,
    listingPath,
    values,
    fields: visibleFields,
  });
  const urlHasFilters = hasActiveFilters(
    readFilterValues(searchParams, visibleFields),
    visibleFields,
  );
  const defaults = defaultPropertyFilterValues(variant);
  const canReset =
    urlHasFilters ||
    Boolean(values.type || values.location || values.price) ||
    (defaults.category
      ? values.category !== defaults.category
      : Boolean(values.category));

  return (
    <FilterBar
      fields={visibleFields}
      values={values}
      href={href}
      canReset={canReset}
      onChange={(key, value) => {
        setValues((current) => {
          if (key !== "category" && key !== "transaction") {
            return { ...current, [key]: value };
          }

          const next = { ...current, [key]: value };
          const typeOptions = subcategoryOptionsForMarket(value);
          if (next.type && !typeOptions.includes(next.type)) {
            delete next.type;
          }
          if (next.price) {
            const priceOptions =
              value === "Rent" ? RENT_PRICE_OPTIONS : SALE_PRICE_OPTIONS;
            if (!priceOptions.includes(next.price)) delete next.price;
          }
          return next;
        });
      }}
      onReset={() => {
        setValues(defaultPropertyFilterValues(variant));
        if (urlHasFilters) {
          router.replace(`${pathname}#property-listings`);
        }
      }}
    />
  );
}

export default function HeroFilters({ prefix, variant, listingPath, fields }) {
  const fallbackValues = defaultPropertyFilterValues(variant);
  const fallbackFields = withCascadingOptions(fields, fallbackValues).map(
    (field) => ({
      ...field,
      id: `${prefix}-${field.key}`,
    }),
  );

  return (
    <Suspense
      fallback={
        <FilterBar
          fields={fallbackFields}
          values={fallbackValues}
          href={searchHref({
            variant,
            listingPath,
            values: fallbackValues,
            fields: fallbackFields,
          })}
          canReset={false}
          onChange={() => {}}
          onReset={() => {}}
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
