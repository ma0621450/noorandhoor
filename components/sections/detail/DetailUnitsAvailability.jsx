"use client";

import { useState } from "react";
import { Car, ChevronDown, Eye } from "lucide-react";
import Link from "next/link";
import MediaImage from "@/components/ui/MediaImage";
import { CONTACT_FORM_HREF } from "@/components/sections/contact/contactData";
import {
  buildInventoryOverview,
  buildParkingGroups,
  buildUnitTypeSummaries,
  hasUnitAvailability,
} from "@/lib/admin/propertyUnitSummaries";

function enquireHref(unit) {
  if (!unit?.unitNumber) return CONTACT_FORM_HREF;
  return `/contact?unit=${encodeURIComponent(unit.unitNumber)}#contact-form`;
}

function AccordionGroup({ group, open, onToggle }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#161616]">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-3 px-3 py-4 text-left sm:gap-4 sm:px-4"
        aria-expanded={open}
      >
        <span
          className="h-12 w-1.5 shrink-0 rounded-full sm:h-14"
          style={{ backgroundColor: group.accentColor }}
          aria-hidden
        />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-white sm:text-base">
            {group.displayName}
          </p>
          <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-white/55 sm:text-sm">
            <span>{group.inventoryLabel}</span>
            {group.areaLabel ? <span>{group.areaLabel}</span> : null}
            {group.priceLabel ? <span>{group.priceLabel}</span> : null}
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white/50 transition ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open ? (
        <div className="border-t border-white/10">
          {group.units.length ? (
            <div className="overflow-x-auto">
              <table className="min-w-[720px] w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-xs uppercase tracking-[1.2px] text-white/45">
                    <th className="px-4 py-3 font-medium">Plan</th>
                    <th className="px-3 py-3 font-medium">Bedrooms</th>
                    <th className="px-3 py-3 font-medium">Type</th>
                    <th className="px-3 py-3 font-medium">Number</th>
                    <th className="px-3 py-3 font-medium">Floor</th>
                    <th className="px-3 py-3 font-medium">Area</th>
                    <th className="px-3 py-3 font-medium">Price From</th>
                    <th className="px-4 py-3 font-medium"> </th>
                  </tr>
                </thead>
                <tbody>
                  {group.units.map((unit) => (
                    <tr
                      key={unit.clientKey || unit.id || unit.unitNumber}
                      className="border-b border-white/8 last:border-b-0"
                    >
                      <td className="px-4 py-3">
                        <div className="relative h-14 w-20 overflow-hidden rounded-md bg-[#1a1a1a]">
                          {unit.planImage ? (
                            <MediaImage
                              src={unit.planImage}
                              alt={`${unit.unitNumber} floor plan`}
                              fill
                              sizes="80px"
                              className="object-cover"
                            />
                          ) : null}
                        </div>
                      </td>
                      <td className="px-3 py-3 text-white/80">
                        {unit.bedroomsLabel}
                      </td>
                      <td className="px-3 py-3 text-white/80">{unit.unitKind}</td>
                      <td className="px-3 py-3 text-white">
                        № {unit.unitNumber}
                      </td>
                      <td className="px-3 py-3 text-white/80">
                        {unit.floor ?? "—"}
                      </td>
                      <td className="px-3 py-3 text-white/80">
                        {unit.areaLabel || "—"}
                      </td>
                      <td className="px-3 py-3">
                        <p className="font-semibold text-white">
                          {unit.priceLabel || "—"}
                        </p>
                        {unit.pricePerSqftLabel ? (
                          <p className="mt-0.5 text-xs text-white/45">
                            {unit.pricePerSqftLabel}
                          </p>
                        ) : null}
                      </td>
                      <td className="px-4 py-3">
                        <Link
                          href={enquireHref(unit)}
                          className="inline-flex size-9 items-center justify-center rounded-lg border border-[#ba8a44]/50 text-[#eec876] transition hover:bg-[#ba8a44]/15"
                          aria-label={`Enquire about unit ${unit.unitNumber}`}
                        >
                          <Eye className="h-4 w-4" strokeWidth={1.75} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="px-4 py-6 text-sm text-white/45">
              No individual layouts listed for this type yet.
            </p>
          )}
        </div>
      ) : null}
    </div>
  );
}

function InventoryCard({ items }) {
  if (!items.length) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#161616] p-5 sm:p-6">
      <h3 className="text-base font-semibold text-white">
        Total inventory overview
      </h3>
      <ul className="mt-5 space-y-4">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span
              className="size-8 shrink-0 rounded-lg"
              style={{ backgroundColor: item.accentColor }}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white">{item.name}</p>
              <p className="text-xs text-white/50">
                {item.inventoryLabel}
                {item.fromAreaLabel ? ` · ${item.fromAreaLabel}` : ""}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ParkingCard({ groups }) {
  if (!groups.length) return null;

  return (
    <div className="rounded-2xl border border-white/10 bg-[#161616] p-5 sm:p-6">
      <h3 className="text-base font-semibold text-white">
        Parking per unit type
      </h3>
      <div className="mt-5 space-y-5">
        {groups.map((group) => (
          <div key={group.parkingSpaces}>
            <div className="flex items-center gap-2 text-sm font-medium text-white">
              <Car className="h-4 w-4 shrink-0 text-[#eec876]" strokeWidth={1.75} />
              {group.label}
            </div>
            <ul className="mt-3 space-y-2">
              {group.types.map((type) => (
                <li
                  key={type.id}
                  className="flex items-center gap-2 text-sm text-white/75"
                >
                  <span className="flex size-4 items-center justify-center rounded border border-[#ba8a44] text-[10px] text-[#eec876]">
                    ✓
                  </span>
                  {type.shortName}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function DetailUnitsAvailability({ unitGroups = [] }) {
  const summaries = buildUnitTypeSummaries(unitGroups);
  const [openId, setOpenId] = useState(
    () => summaries[0]?.clientKey || summaries[0]?.id || summaries[0]?.slug || null,
  );

  if (!hasUnitAvailability(unitGroups)) return null;

  const inventory = buildInventoryOverview(unitGroups);
  const parking = buildParkingGroups(unitGroups);

  return (
    <section className="w-full bg-[#111111]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:py-12">
        <h2 className="detail-section-title m-0 text-[20px] font-medium leading-[30px] text-[#F5F5F5]">
          Units & Availability
        </h2>

        <div className="mt-8 space-y-3">
          {summaries.map((group) => {
            const id = group.clientKey || group.id || group.slug;
            return (
              <AccordionGroup
                key={id}
                group={group}
                open={openId === id}
                onToggle={() => setOpenId((current) => (current === id ? null : id))}
              />
            );
          })}
        </div>

        <div className="mt-8 grid gap-5 lg:grid-cols-2">
          <InventoryCard items={inventory} />
          <ParkingCard groups={parking} />
        </div>
      </div>
    </section>
  );
}
