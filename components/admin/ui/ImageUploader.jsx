"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import AdminButton from "@/components/admin/ui/AdminButton";
import { MAX_COVER_IMAGE_BYTES } from "@/lib/admin/constants";
import { fileToDataUrl } from "@/lib/admin/utils";

export default function ImageUploader({
  value,
  onChange,
  error,
  label = "Cover image",
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState("");

  const handleFile = async (file) => {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setLocalError("Please choose an image file.");
      return;
    }

    if (file.size > MAX_COVER_IMAGE_BYTES) {
      setLocalError("Keep the image under 1.5MB for now. Supabase Storage will handle larger files later.");
      return;
    }

    setLocalError("");
    const dataUrl = await fileToDataUrl(file);
    onChange(dataUrl);
  };

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[1.4px] text-white/60">
        {label}
      </p>

      {value ? (
        <div className="overflow-hidden rounded-2xl border border-[#ba8a44]/30">
          <div className="relative aspect-[16/9] bg-[#111]">
            {/* Uploaded previews are data URLs and cannot use next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={value} alt="Cover preview" className="h-full w-full object-cover" />
          </div>
          <div className="flex items-center justify-end gap-2 bg-[#171717] p-3">
            <AdminButton
              size="sm"
              variant="secondary"
              onClick={() => inputRef.current?.click()}
            >
              Replace
            </AdminButton>
            <AdminButton
              size="sm"
              variant="danger"
              onClick={() => onChange("")}
            >
              <Trash2 className="h-3.5 w-3.5" />
              Remove
            </AdminButton>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={onDrop}
          className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-12 text-center transition ${
            isDragging
              ? "border-[#eec876] bg-[#ba8a44]/10"
              : "border-white/15 bg-[#141414] hover:border-[#ba8a44]/50"
          }`}
        >
          <ImagePlus className="h-8 w-8 text-[#eec876]" />
          <div>
            <p className="text-sm font-medium text-white">Drop an image here, or click to upload</p>
            <p className="mt-1 text-xs text-white/45">JPG, PNG or WebP up to 1.5MB</p>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {(localError || error) && (
        <p className="text-xs text-red-300">{localError || error}</p>
      )}
    </div>
  );
}
