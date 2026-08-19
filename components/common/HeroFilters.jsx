"use client";

import { Search } from "lucide-react";
import Button from "@/components/ui/Button";
import Dropdown, { DropdownGroup } from "@/components/ui/Dropdown";

export default function HeroFilters({ prefix, fields }) {
  return (
    <div className="relative z-50 flex w-full max-w-6xl flex-col gap-3 lg:flex-row lg:items-center">
      <div className="grid w-full grid-cols-1 overflow-visible rounded-xl border border-white/25 bg-white/15 backdrop-blur-md sm:grid-cols-2 lg:flex lg:min-h-14 lg:items-stretch">
        <DropdownGroup>
          {fields.map((field) => (
            <Dropdown
              key={field.key}
              id={`${prefix}-${field.key}`}
              options={field.options}
              placeholder={field.placeholder}
              className="w-full border-b border-white/20 last:border-b-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-last-child(-n+2)]:border-b-0 lg:min-h-14 lg:min-w-[150px] lg:flex-1 lg:border-r lg:border-b-0 lg:last:border-r-0 xl:min-w-[180px]"
            />
          ))}
        </DropdownGroup>
      </div>

      <Button
        type="button"
        variant="primary"
        aria-label="Search properties"
        className="w-full gap-2 py-3 text-xs lg:hidden"
      >
        Search
        <Search className="h-4 w-4" strokeWidth={2.5} />
      </Button>

      <button
        type="button"
        aria-label="Search properties"
        className="hidden size-14 shrink-0 items-center justify-center rounded-full text-[#d6a85e] transition hover:scale-105 lg:flex"
      >
        <Search className="h-8 w-8" strokeWidth={2.25} />
      </button>
    </div>
  );
}
