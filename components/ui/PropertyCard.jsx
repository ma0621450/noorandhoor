"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Bed, Bath, Scan, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import MediaImage from "@/components/ui/MediaImage";

export default function PropertyCard({
  property,
  badge = "Featured",
  className = "",
  href,
  basePath,
}) {
  const {
    image,
    images,
    title,
    location,
    features,
    price,
    featured,
    status,
    slug,
  } = property;
  const gallery = images?.length ? images : image ? [image] : [];
  const to =
    href ||
    property.href ||
    (slug && basePath ? `${basePath}/${slug}` : undefined);
  const showCarousel = gallery.length > 1;
  const showEoiTag = String(status || "").toUpperCase() === "EOI";

  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(false);
  const router = useRouter();

  const currentImage = gallery[index] || gallery[0];

  const handleCardClick = () => {
    if (to) router.push(to);
  };

  const prev = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIndex((current) => (current === 0 ? gallery.length - 1 : current - 1));
  };

  const next = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIndex((current) => (current === gallery.length - 1 ? 0 : current + 1));
  };

  return (
    <article
      onClick={(event) => {
        if (!to) return;
        if (event.target instanceof HTMLElement && event.target.closest("button")) {
          return;
        }
        handleCardClick();
      }}
      className={`group relative flex w-full flex-col overflow-hidden rounded-[9.5px] border border-[rgba(212,175,55,0.4)] bg-[#0E1112] transition-all duration-200 hover:border-[#eec876] hover:shadow-[0_0_0_1px_rgba(238,200,118,0.35)] ${to ? "cursor-pointer" : ""} ${className}`}
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {currentImage && (
          <MediaImage
            src={currentImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {(featured || showEoiTag) && (
          <div className="absolute left-3 top-3 z-[2] flex flex-row flex-wrap items-center gap-2">
            {featured ? <Badge variant="gold">{badge}</Badge> : null}
            {showEoiTag ? <Badge variant="gold">EOI</Badge> : null}
          </div>
        )}

        {showCarousel && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={prev}
              className="absolute left-2 top-1/2 z-[2] -translate-y-1/2 text-white/90 transition hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={next}
              className="absolute right-2 top-1/2 z-[2] -translate-y-1/2 text-white/90 transition hover:text-white"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
            </button>
          </>
        )}
      </div>

      <button
        type="button"
        aria-label={liked ? "Remove from favorites" : "Add to favorites"}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          setLiked((value) => !value);
        }}
        className="absolute right-3 top-3 z-[2] text-white transition hover:scale-110 hover:text-[#eec876]"
      >
        <Heart
          className="h-4 w-4 sm:h-[16px] sm:w-[17px]"
          strokeWidth={1.5}
          fill={liked ? "currentColor" : "none"}
        />
      </button>

      <div className="relative z-[2] flex flex-col gap-1.5 px-4 py-4">
        <h3 className="!font-accent mb-0.5 break-words text-sm font-normal uppercase text-[#f5f5f5] transition-colors group-hover:text-[#ba8a44]">
          {title}
        </h3>
        <p className="break-words text-xs font-medium text-[#f5f5f5]">{location}</p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-white">
          {(features?.bedroom ?? 0) > 0 ? (
            <span className="flex items-center gap-1.5">
              <Bed className="h-4 w-4 stroke-[#ba8a44]" strokeWidth={1.5} />
              <span className="text-xs font-medium">
                {features.bedroom} bed
              </span>
            </span>
          ) : null}
          {(features?.bathroom ?? 0) > 0 ? (
            <>
              {(features?.bedroom ?? 0) > 0 ? (
                <span className="text-white/50">•</span>
              ) : null}
              <span className="flex items-center gap-1.5">
                <Bath className="h-4 w-4 stroke-[#ba8a44]" strokeWidth={1.5} />
                <span className="text-xs font-medium">
                  {features.bathroom} bath
                </span>
              </span>
            </>
          ) : null}
          {(features?.area ?? 0) > 0 ? (
            <>
              {(features?.bedroom ?? 0) > 0 || (features?.bathroom ?? 0) > 0 ? (
                <span className="text-white/50">•</span>
              ) : null}
              <span className="flex items-center gap-1.5">
                <Scan className="h-4 w-4 stroke-[#ba8a44]" strokeWidth={1.5} />
                <span className="text-xs font-medium">
                  {features.area.toLocaleString()} Sq Ft
                </span>
              </span>
            </>
          ) : null}
        </div>

        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-[0.08em] text-white/55">
            From
          </span>
          <p className="!font-accent m-0 text-lg font-bold text-[#E9C349]">
            AED {price.toLocaleString()}
          </p>
        </div>
      </div>
    </article>
  );
}
