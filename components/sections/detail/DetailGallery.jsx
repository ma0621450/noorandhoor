"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import MediaImage from "@/components/ui/MediaImage";
import GalleryLightbox from "@/components/sections/detail/GalleryLightbox";

const AUTO_MS = 5000;
const SWIPE_THRESHOLD = 48;

export default function DetailGallery({ images = [] }) {
  const allImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images],
  );
  const total = allImages.length;
  const showControls = total > 1;

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    currentX: 0,
    width: 0,
  });

  const goTo = (nextIndex) => {
    if (!total) return;
    const wrapped = ((nextIndex % total) + total) % total;
    setIndex(wrapped);
  };

  const goPrev = () => goTo(index - 1);
  const goNext = () => goTo(index + 1);

  useEffect(() => {
    if (!showControls || paused || isDragging || lightboxOpen) return undefined;
    const timer = window.setInterval(() => goTo(index + 1), AUTO_MS);
    return () => window.clearInterval(timer);
  }, [showControls, paused, isDragging, lightboxOpen, index, total]);

  const onPointerDown = (event) => {
    if (!showControls) return;
    const width = trackRef.current?.offsetWidth || 1;
    dragRef.current = {
      active: true,
      startX: event.clientX,
      currentX: event.clientX,
      width,
    };
    setIsDragging(true);
    setPaused(true);
    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!dragRef.current.active) return;
    dragRef.current.currentX = event.clientX;
    const delta = event.clientX - dragRef.current.startX;
    setDragOffset(delta);
  };

  const endDrag = (event) => {
    if (!dragRef.current.active) return;
    const delta = dragRef.current.currentX - dragRef.current.startX;
    dragRef.current.active = false;
    setIsDragging(false);
    setDragOffset(0);
    setPaused(false);
    event.currentTarget.releasePointerCapture?.(event.pointerId);

    if (Math.abs(delta) >= SWIPE_THRESHOLD) {
      if (delta < 0) goNext();
      else goPrev();
      return;
    }

    if (Math.abs(delta) < 8) {
      setLightboxOpen(true);
    }
  };

  if (!total) return null;

  const dragPercent = dragRef.current.width
    ? (dragOffset / dragRef.current.width) * 100
    : 0;
  const trackOffset = -(index * 100) + (isDragging ? dragPercent : 0);

  return (
    <section className="w-full bg-[#111111]">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8">
        <div
          className="relative overflow-hidden rounded-2xl bg-[#171717]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            if (!isDragging) setPaused(false);
          }}
        >
          <div
            ref={trackRef}
            className="relative aspect-[16/10] w-full touch-pan-y select-none sm:aspect-[21/9] lg:h-[560px] lg:aspect-auto"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerCancel={endDrag}
          >
            <div
              className={`flex h-full w-full ${
                isDragging
                  ? "transition-none"
                  : "transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              }`}
              style={{ transform: `translate3d(${trackOffset}%, 0, 0)` }}
            >
              {allImages.map((image, slideIndex) => (
                <div
                  key={`${slideIndex}-${typeof image === "string" ? image : image?.src}`}
                  className="relative h-full w-full shrink-0 grow-0 basis-full overflow-hidden bg-[#0c0c0c]"
                >
                  <MediaImage
                    src={image}
                    alt=""
                    fill
                    sizes="100vw"
                    className="pointer-events-none scale-110 object-cover opacity-35 blur-2xl"
                    aria-hidden
                    draggable={false}
                  />
                  <MediaImage
                    src={image}
                    alt={`Property photo ${slideIndex + 1}`}
                    fill
                    sizes="100vw"
                    className="pointer-events-none object-contain p-2 sm:p-3"
                    priority={slideIndex === 0}
                    draggable={false}
                  />
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />

            {showControls ? (
              <>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goPrev();
                  }}
                  onPointerDown={(event) => event.stopPropagation()}
                  aria-label="Previous photo"
                  className="absolute left-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition hover:border-[#eec876]/50 hover:bg-black/60 sm:left-5"
                >
                  <ChevronLeft className="h-5 w-5" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    goNext();
                  }}
                  onPointerDown={(event) => event.stopPropagation()}
                  aria-label="Next photo"
                  className="absolute right-3 top-1/2 z-10 inline-flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-sm transition hover:border-[#eec876]/50 hover:bg-black/60 sm:right-5"
                >
                  <ChevronRight className="h-5 w-5" strokeWidth={2} />
                </button>
              </>
            ) : null}

            <div className="pointer-events-none absolute bottom-4 left-4 right-4 z-10 flex items-end justify-between gap-4 sm:bottom-6 sm:left-6 sm:right-6">
              <p className="rounded-full bg-black/45 px-3 py-1.5 text-xs font-medium text-white/90 backdrop-blur-sm">
                {index + 1} / {total}
              </p>
              {showControls ? (
                <div
                  className="pointer-events-auto flex items-center gap-2"
                  role="tablist"
                  aria-label="Property photos"
                >
                  {allImages.map((_, dotIndex) => {
                    const isActive = dotIndex === index;
                    return (
                      <button
                        key={dotIndex}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-label={`Go to photo ${dotIndex + 1}`}
                        onClick={() => goTo(dotIndex)}
                        onPointerDown={(event) => event.stopPropagation()}
                        className={`h-2 cursor-pointer rounded-full transition-all duration-300 ${
                          isActive
                            ? "w-10 bg-[#ba8a44]"
                            : "w-2 bg-white/40 hover:bg-[#ba8a44]/70"
                        }`}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        {showControls ? (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {allImages.map((image, thumbIndex) => {
              const isActive = thumbIndex === index;
              return (
                <button
                  key={`thumb-${thumbIndex}`}
                  type="button"
                  onClick={() => goTo(thumbIndex)}
                  aria-label={`Show photo ${thumbIndex + 1}`}
                  className={`relative h-16 w-[88px] shrink-0 overflow-hidden rounded-xl border transition sm:h-[72px] sm:w-28 ${
                    isActive
                      ? "border-[#eec876]"
                      : "border-white/10 opacity-65 hover:opacity-100"
                  }`}
                >
                  <MediaImage
                    src={image}
                    alt=""
                    fill
                    sizes="112px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>
        ) : null}
      </div>

      {lightboxOpen ? (
        <GalleryLightbox
          images={allImages}
          startIndex={index}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </section>
  );
}
