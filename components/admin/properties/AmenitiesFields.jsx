"use client";

import { useRef } from "react";
import { ImagePlus, Plus, Trash2 } from "lucide-react";
import AdminButton from "@/components/admin/ui/AdminButton";
import {
  DEFAULT_PROPERTY_AMENITIES,
  MAX_PROPERTY_AMENITIES,
} from "@/lib/admin/propertyAmenities";
import { MAX_COVER_IMAGE_BYTES } from "@/lib/admin/constants";
import { fileToDataUrl } from "@/lib/admin/utils";

function AmenityCard({ item, index, onChange, onRemove, onPickImage }) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111]">
      <button
        type="button"
        onClick={() => onPickImage(index)}
        className="relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-[#1a1a1a] text-white/40 transition hover:text-[#eec876]"
      >
        {item.image ? (
          // Preview may be a data URL before upload.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.image}
            alt={item.name || "Amenity"}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <span className="inline-flex flex-col items-center gap-2 text-xs">
            <ImagePlus className="h-5 w-5" />
            Add image
          </span>
        )}
      </button>
      <div className="flex items-center gap-2 border-t border-white/8 p-3">
        <input
          type="text"
          value={item.name}
          onChange={(event) => onChange(index, { name: event.target.value })}
          placeholder="Amenity name"
          className="min-w-0 flex-1 rounded-lg border border-white/10 bg-[#161616] px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#ba8a44]"
        />
        <button
          type="button"
          onClick={() => onRemove(index)}
          className="inline-flex size-9 shrink-0 items-center justify-center rounded-lg border border-white/10 text-white/50 transition hover:border-red-400/40 hover:text-red-300"
          aria-label="Remove amenity"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function AmenitiesFields({ value = [], onChange }) {
  const fileInputRef = useRef(null);
  const replaceIndexRef = useRef(null);
  const amenities = Array.isArray(value) ? value : [];

  const updateAt = (index, patch) => {
    onChange(
      amenities.map((item, i) => (i === index ? { ...item, ...patch } : item)),
    );
  };

  const removeAt = (index) => {
    onChange(amenities.filter((_, i) => i !== index));
  };

  const addAmenity = (name = "") => {
    if (amenities.length >= MAX_PROPERTY_AMENITIES) return;
    const trimmed = String(name || "").trim();
    if (
      trimmed &&
      amenities.some(
        (item) => item.name.trim().toLowerCase() === trimmed.toLowerCase(),
      )
    ) {
      return;
    }
    onChange([...amenities, { name: trimmed, image: "" }]);
  };

  const pickImage = (index) => {
    replaceIndexRef.current = index;
    fileInputRef.current?.click();
  };

  const onFileChange = async (event) => {
    const file = event.target.files?.[0];
    const index = replaceIndexRef.current;
    event.target.value = "";
    replaceIndexRef.current = null;
    if (!file || index == null) return;

    if (!file.type.startsWith("image/")) return;
    if (file.size > MAX_COVER_IMAGE_BYTES) return;

    const dataUrl = await fileToDataUrl(file);
    updateAt(index, { image: dataUrl });
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Features / Amenities
          </h2>
          <p className="mt-1 text-xs text-white/45">
            Image cards shown on the public property page. Items without an
            image are hidden on the site.
          </p>
        </div>
        <AdminButton
          type="button"
          variant="secondary"
          onClick={() => addAmenity()}
          disabled={amenities.length >= MAX_PROPERTY_AMENITIES}
          className="gap-1.5 px-3 py-2 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add amenity
        </AdminButton>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onFileChange}
      />

      {amenities.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {amenities.map((item, index) => (
            <AmenityCard
              key={`amenity-${index}`}
              item={item}
              index={index}
              onChange={updateAt}
              onRemove={removeAt}
              onPickImage={pickImage}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/40">
          No amenities yet. Add a card or pick a quick preset below.
        </p>
      )}

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[1.4px] text-white/60">
          Quick add
        </p>
        <div className="flex flex-wrap gap-2">
          {DEFAULT_PROPERTY_AMENITIES.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => addAmenity(name)}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-[#ba8a44] hover:text-[#eec876]"
            >
              {name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
