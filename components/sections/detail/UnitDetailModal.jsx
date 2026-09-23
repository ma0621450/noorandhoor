"use client";

import { useEffect } from "react";
import { AlertTriangle, X } from "lucide-react";
import Link from "next/link";
import MediaImage from "@/components/ui/MediaImage";
import { CONTACT_FORM_HREF } from "@/components/sections/contact/contactData";

function enquireHref(unit) {
  if (!unit?.unitNumber) return CONTACT_FORM_HREF;
  return `/contact?unit=${encodeURIComponent(unit.unitNumber)}#contact-form`;
}

function DetailRow({ label, value }) {
  if (!value) return null;
  return (
    <div className="flex flex-col gap-1 border-b border-white/8 py-3 last:border-b-0 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
      <dt className="text-sm text-white/50">{label}</dt>
      <dd className="m-0 text-left text-sm font-medium text-white sm:text-right">
        {value}
      </dd>
    </div>
  );
}

export default function UnitDetailModal({ unit, onClose }) {
  useEffect(() => {
    if (!unit) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    const previousRootOverflow = document.documentElement.style.overflow;
    const previousRootOverscroll = document.documentElement.style.overscrollBehavior;

    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "contain";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.overscrollBehavior = "contain";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
      document.documentElement.style.overflow = previousRootOverflow;
      document.documentElement.style.overscrollBehavior = previousRootOverscroll;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [unit, onClose]);

  if (!unit) return null;

  const title = [
    unit.unitNumber ? `Unit ${unit.unitNumber}` : null,
    unit.bedroomsLabel || null,
  ]
    .filter(Boolean)
    .join(" • ");

  const details = [
    { label: "Bedrooms amount", value: unit.bedroomsLabel },
    { label: "Unit area", value: unit.areaLabel },
    {
      label: "Floor",
      value: unit.floor != null && unit.floor !== "" ? String(unit.floor) : "",
    },
    {
      label: "Unit number",
      value: unit.unitNumber ? String(unit.unitNumber) : "",
    },
    { label: "Type", value: unit.unitKind },
    {
      label: "Parking",
      value:
        unit.parkingSpaces > 0
          ? `${unit.parkingSpaces} space${unit.parkingSpaces === 1 ? "" : "s"}`
          : "",
    },
  ];

  return (
    <div
      className="fixed inset-0 z-[200] overflow-y-auto bg-black/80 p-2 sm:p-6"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="unit-detail-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 mx-auto grid max-h-[calc(100vh-1rem)] w-full max-w-[980px] grid-cols-1 overflow-y-auto rounded-2xl border border-[#ba8a44]/25 bg-[#161616] shadow-2xl overscroll-contain lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
      >
        <div className="relative min-h-[220px] min-h-0 bg-[#1a1a1a] lg:min-h-full">
          {unit.planImage ? (
            <MediaImage
              src={unit.planImage}
              alt={`${unit.unitNumber || "Unit"} floor plan`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-contain p-4 sm:p-6"
            />
          ) : (
            <div className="flex h-full min-h-[240px] items-center justify-center px-6 text-center text-sm text-white/40 lg:min-h-[420px]">
              Floor plan not available for this unit.
            </div>
          )}
        </div>

        <div className="relative flex min-h-0 flex-col p-4 sm:p-7">
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-4 top-4 rounded-lg p-1.5 text-white/50 transition hover:bg-white/5 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>

          <p
            id="unit-detail-modal-title"
            className="pr-10 text-sm text-white/55"
          >
            {title || "Unit details"}
          </p>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <p className="m-0 font-accent text-2xl font-bold leading-tight text-white sm:text-3xl">
                {unit.priceLabel || "Price on request"}
              </p>
              {unit.pricePerSqftLabel ? (
                <p className="mt-1 text-sm text-white/50">
                  {unit.pricePerSqftLabel.replace("/sqft", " per sqft")}
                </p>
              ) : null}
            </div>
            <span className="shrink-0 self-start rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300">
              Available
            </span>
          </div>

          <div className="mt-8">
            <h3 className="m-0 text-base font-semibold text-white">
              Unit Details
            </h3>
            <dl className="mt-2">
              {details.map((row) => (
                <DetailRow key={row.label} label={row.label} value={row.value} />
              ))}
            </dl>
          </div>

          <div className="mt-6 flex gap-3 rounded-xl border border-[#ba8a44]/35 bg-[#ba8a44]/10 px-4 py-3.5">
            <AlertTriangle
              className="mt-0.5 h-4 w-4 shrink-0 text-[#eec876]"
              strokeWidth={1.75}
            />
            <p className="m-0 text-xs leading-5 text-white/75">
              Project information is provided by the developer and may change.
              Noticed an error? Please contact our support team and specify what
              is incorrect. We will quickly reach out to the developer and update
              the data.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              href={enquireHref(unit)}
              className="inline-flex w-full items-center justify-center rounded-xl border border-[#ba8a44]/50 bg-[#ba8a44]/15 px-4 py-3.5 text-center text-sm font-medium text-[#eec876] transition hover:bg-[#ba8a44]/25"
            >
              Contact sales office to get actual data
            </Link>
            <Link
              href={enquireHref(unit)}
              className="btn-gold inline-flex w-full items-center justify-center rounded-xl px-4 py-3.5 text-center text-sm font-semibold text-[#111111]"
            >
              Enquire about this unit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
