"use client";

import { useRef, useState } from "react";
import { ImagePlus, Trash2 } from "lucide-react";
import AdminButton from "@/components/admin/ui/AdminButton";
import { MAX_COVER_IMAGE_BYTES } from "@/lib/admin/constants";
import { fileToDataUrl } from "@/lib/admin/utils";
import { createClient } from "@/lib/supabase/client";

function readImageSize(src) {
  return new Promise((resolve, reject) => {
    const image = new window.Image();
    image.onload = () =>
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => reject(new Error("Could not read image dimensions."));
    image.src = src;
  });
}

export default function ImageUploader({
  value,
  onChange,
  error,
  label = "Cover image",
  storageBucket,
  maxBytes = MAX_COVER_IMAGE_BYTES,
  requiredWidth,
  requiredHeight,
  aspectClassName = "aspect-[16/9]",
  hint,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState("");

  const sizeHint =
    hint ||
    (requiredWidth && requiredHeight
      ? `JPG, PNG or WebP · Exact size ${requiredWidth}×${requiredHeight}px · Max ${(maxBytes / (1024 * 1024)).toFixed(1)}MB`
      : `JPG, PNG or WebP up to ${(maxBytes / (1024 * 1024)).toFixed(1)}MB`);

  const handleFile = async (file) => {
    if (!file) return;

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setLocalError("Choose a JPG, PNG, or WebP image.");
      return;
    }

    if (file.size > maxBytes) {
      setLocalError(
        `Choose an image smaller than ${(maxBytes / (1024 * 1024)).toFixed(1)}MB.`,
      );
      return;
    }

    setLocalError("");

    try {
      if (storageBucket) {
        const extension =
          file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "") ||
          "image";
        const path = `developers/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await createClient().storage
          .from(storageBucket)
          .upload(path, file, { contentType: file.type, upsert: false });

        if (uploadError) throw uploadError;
        onChange(path);
        return;
      }

      const dataUrl = await fileToDataUrl(file);

      if (requiredWidth && requiredHeight) {
        const { width, height } = await readImageSize(dataUrl);
        if (width !== requiredWidth || height !== requiredHeight) {
          setLocalError(
            `Image must be exactly ${requiredWidth}×${requiredHeight}px (got ${width}×${height}).`,
          );
          return;
        }
      }

      onChange(dataUrl);
    } catch (uploadError) {
      setLocalError(uploadError?.message || "Could not upload image.");
    }
  };

  const onDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFile(event.dataTransfer.files?.[0]);
  };
  const preview =
    value && storageBucket
      ? createClient().storage.from(storageBucket).getPublicUrl(value).data
          .publicUrl
      : value;

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase tracking-[1.4px] text-white/60">
        {label}
      </p>

      {preview ? (
        <div className="overflow-hidden rounded-2xl border border-[#ba8a44]/30">
          <div className={`relative bg-[#111] ${aspectClassName}`}>
            {/* Uploaded previews are data URLs and cannot use next/image. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Cover preview"
              className="h-full w-full object-cover"
            />
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
            <p className="text-sm font-medium text-white">
              Drop an image here, or click to upload
            </p>
            <p className="mt-1 text-xs text-white/45">{sizeHint}</p>
          </div>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={(event) => {
          handleFile(event.target.files?.[0]);
          event.target.value = "";
        }}
      />

      {(localError || error) && (
        <p className="text-xs text-red-300">{localError || error}</p>
      )}
      {!localError && !error && requiredWidth && requiredHeight ? (
        <p className="text-xs text-white/40">
          Required cover size: {requiredWidth}×{requiredHeight}px (16:9).
        </p>
      ) : null}
    </div>
  );
}
