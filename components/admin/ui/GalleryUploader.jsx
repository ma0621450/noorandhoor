"use client";

import { useRef, useState } from "react";
import { ImagePlus, Star, Trash2 } from "lucide-react";
import AdminButton from "@/components/admin/ui/AdminButton";
import {
  MAX_COVER_IMAGE_BYTES,
  MAX_GALLERY_IMAGES,
} from "@/lib/admin/constants";
import { fileToDataUrl } from "@/lib/admin/utils";

export default function GalleryUploader({
  value = [],
  onChange,
  error,
  label = "Property gallery",
}) {
  const addInputRef = useRef(null);
  const replaceInputRef = useRef(null);
  const replaceIndexRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState("");
  const images = Array.isArray(value) ? value.filter(Boolean) : [];
  const remaining = MAX_GALLERY_IMAGES - images.length;

  const readValidFile = async (file) => {
    if (!file) return null;

    if (!file.type.startsWith("image/")) {
      setLocalError("Please choose an image file.");
      return null;
    }

    if (file.size > MAX_COVER_IMAGE_BYTES) {
      setLocalError(
        "Keep each image under 1.5MB for now. Supabase Storage will handle larger files later.",
      );
      return null;
    }

    setLocalError("");
    return fileToDataUrl(file);
  };

  const handleFiles = async (fileList) => {
    const files = Array.from(fileList || []);
    if (!files.length) return;

    if (remaining <= 0) {
      setLocalError(`You can upload up to ${MAX_GALLERY_IMAGES} images.`);
      return;
    }

    const accepted = [];
    let rejected = "";

    for (const file of files.slice(0, remaining)) {
      if (!file.type.startsWith("image/")) {
        rejected = "Please choose image files only.";
        continue;
      }
      if (file.size > MAX_COVER_IMAGE_BYTES) {
        rejected =
          "Keep each image under 1.5MB for now. Supabase Storage will handle larger files later.";
        continue;
      }
      accepted.push(file);
    }

    if (!accepted.length) {
      setLocalError(rejected || "No images were added.");
      return;
    }

    setLocalError(rejected);
    const urls = await Promise.all(accepted.map((file) => fileToDataUrl(file)));
    onChange([...images, ...urls]);
  };

  const replaceAt = async (index, file) => {
    const dataUrl = await readValidFile(file);
    if (!dataUrl) return;
    const next = [...images];
    next[index] = dataUrl;
    onChange(next);
  };

  const setCover = (index) => {
    if (index <= 0) return;
    const next = [...images];
    const [cover] = next.splice(index, 1);
    onChange([cover, ...next]);
  };

  const removeAt = (index) => {
    onChange(images.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="space-y-3">
      <div>
        <p className="text-xs font-medium uppercase tracking-[1.4px] text-white/60">
          {label}
        </p>
        <p className="mt-1 text-xs text-white/40">
          The cover photo is used on listing cards. Replace it, or mark another
          gallery image as cover. JPG, PNG or WebP up to 1.5MB each ({images.length}/
          {MAX_GALLERY_IMAGES}).
        </p>
      </div>

      {images.length ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {images.map((src, index) => {
            const isCover = index === 0;
            return (
              <div
                key={`${src.slice(0, 24)}-${index}`}
                className={`overflow-hidden rounded-2xl border ${
                  isCover ? "border-[#eec876]" : "border-[#ba8a44]/30"
                }`}
              >
                <div className="relative aspect-[4/3] bg-[#111]">
                  {/* Uploaded previews are data URLs and cannot use next/image. */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={isCover ? "Cover photo" : `Gallery ${index + 1}`}
                    className="h-full w-full object-cover"
                  />
                  {isCover ? (
                    <span className="absolute left-2 top-2 rounded-md bg-black/70 px-2 py-0.5 text-[10px] uppercase tracking-wide text-[#eec876]">
                      Cover
                    </span>
                  ) : null}
                </div>
                <div className="flex flex-wrap justify-end gap-2 bg-[#171717] p-2">
                  <AdminButton
                    size="sm"
                    variant="secondary"
                    onClick={() => {
                      replaceIndexRef.current = index;
                      replaceInputRef.current?.click();
                    }}
                  >
                    Replace
                  </AdminButton>
                  {!isCover ? (
                    <AdminButton
                      size="sm"
                      variant="secondary"
                      onClick={() => setCover(index)}
                    >
                      <Star className="h-3.5 w-3.5" />
                      Set as cover
                    </AdminButton>
                  ) : null}
                  <AdminButton
                    size="sm"
                    variant="danger"
                    onClick={() => removeAt(index)}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Remove
                  </AdminButton>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}

      {remaining > 0 ? (
        <button
          type="button"
          onClick={() => addInputRef.current?.click()}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(event) => {
            event.preventDefault();
            setIsDragging(false);
            handleFiles(event.dataTransfer.files);
          }}
          className={`flex w-full flex-col items-center justify-center gap-3 rounded-2xl border border-dashed px-6 py-10 text-center transition ${
            isDragging
              ? "border-[#eec876] bg-[#ba8a44]/10"
              : "border-white/15 bg-[#141414] hover:border-[#ba8a44]/50"
          }`}
        >
          <ImagePlus className="h-8 w-8 text-[#eec876]" />
          <div>
            <p className="text-sm font-medium text-white">
              {images.length
                ? "Add more photos"
                : "Drop images here, or click to upload"}
            </p>
            <p className="mt-1 text-xs text-white/45">
              You can select multiple files at once
            </p>
          </div>
        </button>
      ) : null}

      <input
        ref={addInputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <input
        ref={replaceInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => {
          const index = replaceIndexRef.current;
          const file = event.target.files?.[0];
          if (index != null && file) replaceAt(index, file);
          replaceIndexRef.current = null;
          event.target.value = "";
        }}
      />

      {(localError || error) && (
        <p className="text-xs text-red-300">{localError || error}</p>
      )}
    </div>
  );
}
