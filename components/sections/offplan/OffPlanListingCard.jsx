"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bed, Bath, Scan, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function OffPlanListingCard({ property, basePath }) {
  const { images, title, location, features, price, featured, slug } = property;
  const href = `${property.basePath || basePath}/${slug}`;
  const [index, setIndex] = useState(0);
  const [liked, setLiked] = useState(false);

  const prev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  };

  const next = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  };

  return (
    <article className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-[9.5px] border border-[rgba(212,175,55,0.4)] bg-[#0E1112] transition-all duration-200 hover:border-[#eec876] hover:shadow-[0_0_0_1px_rgba(238,200,118,0.35)]">
      <div className="relative aspect-[257/217] w-full overflow-hidden">
        <Link href={href} className="absolute inset-0 z-[1]" aria-label={title} />
        <Image
          src={images[index]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 257px"
          className="object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[rgba(119,118,118,0.4)] to-[rgba(0,0,0,0.4)]" />

        {featured && (
          <div className="absolute left-3 top-3 z-10">
            <Badge variant="gold">Featured</Badge>
          </div>
        )}

        <button
          type="button"
          aria-label="Add to favorites"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setLiked((v) => !v);
          }}
          className="absolute right-3 top-3 z-20 cursor-pointer text-white transition hover:scale-110 hover:text-[#eec876]"
        >
          <Heart
            className="h-4 w-[17px]"
            strokeWidth={1.5}
            fill={liked ? "currentColor" : "none"}
          />
        </button>

        <button
          type="button"
          aria-label="Previous image"
          onClick={prev}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-[#f5f5f5] transition hover:text-white"
        >
          <ChevronLeft className="h-7 w-7" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={next}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-[#f5f5f5] transition hover:text-white"
        >
          <ChevronRight className="h-7 w-7" strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative z-[2] flex flex-col gap-[6px] px-4 py-4">
        <Link href={href}>
          <h3 className="!font-accent mb-0.5 text-sm font-normal capitalize leading-[22px] text-[#f5f5f5] transition-colors group-hover:text-[#D4AF37] group-hover:underline">
            {title}
          </h3>
        </Link>
        <p className="text-xs font-medium text-[#f5f5f5]">{location}</p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#f5f5f5]">
          <span className="flex items-center gap-1">
            <Bed className="h-4 w-4 text-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">{features.bedroom} bed</span>
          </span>
          <span className="flex items-center gap-1">
            <Bath className="h-4 w-4 text-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">{features.bathroom} bath</span>
          </span>
          <span className="flex items-center gap-1">
            <Scan className="h-4 w-4 text-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">
              {features.area.toLocaleString()}Sq Ft
            </span>
          </span>
        </div>

        <p className="!font-accent text-lg font-bold text-[#E9C349]">
          AED {price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
