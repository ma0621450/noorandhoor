"use client";

import { useMemo, useState } from "react";
import MediaImage from "@/components/ui/MediaImage";
import GalleryLightbox from "@/components/sections/detail/GalleryLightbox";

function GalleryTile({
  image,
  alt,
  className = "",
  sizes,
  priority = false,
  children,
  onOpen,
}) {
  if (!image) return null;

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={alt}
      className={`relative overflow-hidden rounded-2xl bg-[#1a1a1a] ${className}`}
    >
      <MediaImage
        src={image}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
        priority={priority}
      />
      {children}
    </button>
  );
}

function ViewAllOverlay({ count }) {
  if (count <= 1) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
      <span className="btn-gold flex h-12 min-w-[161px] items-center justify-center rounded-[10px] px-6 font-[family-name:var(--font-body)] text-[16px] font-semibold leading-6 text-[#F5F5F5]">
        View All Photos
      </span>
    </div>
  );
}

export default function DetailGallery({ images = [] }) {
  const allImages = useMemo(
    () => (Array.isArray(images) ? images.filter(Boolean) : []),
    [images],
  );
  const total = allImages.length;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  if (!total) return null;

  const openAt = (index) => {
    setStartIndex(((index % total) + total) % total);
    setLightboxOpen(true);
  };

  const showViewAll = total > 1;

  return (
    <section className="w-full bg-[#111111]">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-8">
        {/* Desktop layouts by image count */}
        <div className="hidden md:block">
          {total === 1 ? (
            <GalleryTile
              image={allImages[0]}
              alt="Property photo"
              className="aspect-[21/9] h-auto min-h-[420px] w-full lg:h-[560px] lg:aspect-auto"
              sizes="100vw"
              priority
              onOpen={() => openAt(0)}
            />
          ) : null}

          {total === 2 ? (
            <div className="grid h-[520px] grid-cols-2 gap-3 lg:h-[560px]">
              {allImages.slice(0, 2).map((image, index) => (
                <GalleryTile
                  key={`pair-${index}`}
                  image={image}
                  alt={`Property photo ${index + 1}`}
                  className="h-full w-full"
                  sizes="50vw"
                  priority={index === 0}
                  onOpen={() => openAt(index)}
                >
                  {index === 1 ? <ViewAllOverlay count={total} /> : null}
                </GalleryTile>
              ))}
            </div>
          ) : null}

          {total === 3 ? (
            <div className="grid h-[520px] grid-cols-2 gap-3 lg:h-[560px]">
              <GalleryTile
                image={allImages[0]}
                alt="Property main photo"
                className="h-full w-full"
                sizes="50vw"
                priority
                onOpen={() => openAt(0)}
              />
              <div className="grid h-full grid-rows-2 gap-3">
                {allImages.slice(1, 3).map((image, index) => (
                  <GalleryTile
                    key={`triple-${index + 1}`}
                    image={image}
                    alt={`Property photo ${index + 2}`}
                    className="h-full w-full"
                    sizes="50vw"
                    onOpen={() => openAt(index + 1)}
                  >
                    {index === 1 ? <ViewAllOverlay count={total} /> : null}
                  </GalleryTile>
                ))}
              </div>
            </div>
          ) : null}

          {total === 4 ? (
            <div className="grid h-[520px] grid-cols-2 gap-3 lg:h-[560px]">
              <GalleryTile
                image={allImages[0]}
                alt="Property main photo"
                className="h-full w-full"
                sizes="50vw"
                priority
                onOpen={() => openAt(0)}
              />
              <div className="grid h-full grid-cols-2 grid-rows-2 gap-3">
                {allImages.slice(1, 4).map((image, index) => (
                  <GalleryTile
                    key={`quad-${index + 1}`}
                    image={image}
                    alt={`Property photo ${index + 2}`}
                    className="h-full w-full"
                    sizes="25vw"
                    onOpen={() => openAt(index + 1)}
                  >
                    {index === 2 ? <ViewAllOverlay count={total} /> : null}
                  </GalleryTile>
                ))}
              </div>
            </div>
          ) : null}

          {total >= 5 ? (
            <div className="grid h-[520px] grid-cols-3 gap-3 lg:h-[600px]">
              <GalleryTile
                image={allImages[0]}
                alt="Property main photo"
                className="h-full w-full"
                sizes="33vw"
                priority
                onOpen={() => openAt(0)}
              />
              <div className="col-span-2 grid h-full grid-cols-2 grid-rows-2 gap-3">
                {allImages.slice(1, 5).map((image, index) => (
                  <GalleryTile
                    key={`mosaic-${index + 1}`}
                    image={image}
                    alt={`Property photo ${index + 2}`}
                    className="h-full w-full"
                    sizes="33vw"
                    onOpen={() => openAt(index + 1)}
                  >
                    {index === 3 && showViewAll ? (
                      <ViewAllOverlay count={total} />
                    ) : null}
                  </GalleryTile>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Mobile: show up to 4 unique photos, never repeat */}
        <div
          className={`grid gap-3 md:hidden ${
            total === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {allImages.slice(0, Math.min(total, 4)).map((image, index) => {
            const shown = Math.min(total, 4);
            const isLast = index === shown - 1;
            const isHero = total === 1 || (total >= 3 && index === 0);

            return (
              <GalleryTile
                key={`mobile-${index}`}
                image={image}
                alt={`Property photo ${index + 1}`}
                className={`w-full ${
                  isHero ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"
                }`}
                sizes="100vw"
                priority={index === 0}
                onOpen={() => openAt(index)}
              >
                {isLast && showViewAll ? (
                  <ViewAllOverlay count={total} />
                ) : null}
              </GalleryTile>
            );
          })}
        </div>
      </div>

      {lightboxOpen ? (
        <GalleryLightbox
          images={allImages}
          startIndex={startIndex}
          onClose={() => setLightboxOpen(false)}
        />
      ) : null}
    </section>
  );
}
