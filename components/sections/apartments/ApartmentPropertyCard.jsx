"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Bed, Bath, Scan, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";

export default function ApartmentPropertyCard({ property }) {
  const { images, title, location, features, price, featured, slug } = property;
  const href = slug ? `/buy/apartments/${slug}` : "/buy/apartments/spacious-apartment-with-parking";
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
    <article className="group flex w-full cursor-pointer flex-col overflow-hidden rounded-xl bg-[#1a1a1a] transition-transform duration-200 hover:-translate-y-1">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        <Link href={href} className="absolute inset-0 z-[1]" aria-label={title} />
        <Image
          src={images[index]}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover"
        />

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
            className="h-5 w-5"
            strokeWidth={1.5}
            fill={liked ? "currentColor" : "none"}
          />
        </button>

        <button
          type="button"
          aria-label="Previous image"
          onClick={prev}
          className="absolute left-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-white/90 transition hover:text-white"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={(e) => {
            e.preventDefault();
            next(e);
          }}
          className="absolute right-2 top-1/2 z-20 -translate-y-1/2 cursor-pointer text-white/90 transition hover:text-white"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={1.5} />
        </button>
      </div>

      <div className="relative z-[2] flex flex-col gap-2 px-4 py-4">
        <Link href={href}>
          <h3 className="font-[family-name:var(--font-heading)] text-base font-bold uppercase leading-snug text-white transition-colors group-hover:text-[#ba8a44]">
            {title}
          </h3>
        </Link>
        <p className="text-xs font-medium text-white/90">{location}</p>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white">
          <span className="flex items-center gap-1.5">
            <Bed className="h-4 w-4 text-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">{features.bedroom} bed</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">{features.bathroom} bath</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Scan className="h-4 w-4 text-[#ba8a44]" strokeWidth={1.5} />
            <span className="text-xs font-medium">
              {features.area.toLocaleString()}Sq Ft
            </span>
          </span>
        </div>

        <p className="font-[family-name:var(--font-heading)] text-xl font-bold text-[#ba8a44]">
          AED {price.toLocaleString()}
        </p>
      </div>
    </article>
  );
}
