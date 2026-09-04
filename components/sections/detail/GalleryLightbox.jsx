"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import MediaImage from "@/components/ui/MediaImage";

export default function GalleryLightbox({ images, startIndex = 0, onClose }) {
  const [index, setIndex] = useState(startIndex);
  const total = images.length;
  const current = images[index];

  const goPrev = () => {
    setIndex((currentIndex) =>
      currentIndex === 0 ? total - 1 : currentIndex - 1,
    );
  };

  const goNext = () => {
    setIndex((currentIndex) =>
      currentIndex === total - 1 ? 0 : currentIndex + 1,
    );
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") {
        setIndex((currentIndex) =>
          currentIndex === 0 ? total - 1 : currentIndex - 1,
        );
      }
      if (event.key === "ArrowRight") {
        setIndex((currentIndex) =>
          currentIndex === total - 1 ? 0 : currentIndex + 1,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, total]);

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex flex-col bg-black/95"
      role="dialog"
      aria-modal="true"
      aria-label="Property photo gallery"
    >
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <p className="text-sm font-medium text-white/70">
          {index + 1} / {total}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close gallery"
          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-full text-white transition hover:bg-white/10"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 pb-4 sm:px-16">
        {total > 1 ? (
          <>
            <button
              type="button"
              onClick={goPrev}
              aria-label="Previous photo"
              className="absolute left-2 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-4"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={goNext}
              aria-label="Next photo"
              className="absolute right-2 z-10 inline-flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-4"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={2} />
            </button>
          </>
        ) : null}

        <div className="relative h-full max-h-[75vh] w-full max-w-6xl">
          <MediaImage
            src={current}
            alt={`Property photo ${index + 1}`}
            fill
            sizes="100vw"
            className="object-contain"
            priority
          />
        </div>
      </div>

      {total > 1 ? (
        <div className="mx-auto flex w-full max-w-5xl gap-2 overflow-x-auto px-4 pb-5 sm:px-6">
          {images.map((image, thumbIndex) => {
            const isActive = thumbIndex === index;
            return (
              <button
                key={`${thumbIndex}-${typeof image === "string" ? image : image?.src}`}
                type="button"
                onClick={() => setIndex(thumbIndex)}
                aria-label={`Show photo ${thumbIndex + 1}`}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition ${
                  isActive
                    ? "border-[#eec876]"
                    : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <MediaImage
                  src={image}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
