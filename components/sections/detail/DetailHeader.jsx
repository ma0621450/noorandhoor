"use client";

import Link from "next/link";
import {
  MapPin,
  Heart,
  Share2,
  Bed,
  Bath,
  Scan,
  Car,
  Eye,
  CalendarDays,
} from "lucide-react";

const TAG_ICONS = {
  bed: Bed,
  bath: Bath,
  area: Scan,
  parking: Car,
  view: Eye,
  calendar: CalendarDays,
};

const GOLD_ICON_TYPES = new Set(["view", "calendar"]);

export default function DetailHeader({
  property,
  breadcrumbLabel = "Buy apartments",
  breadcrumbHref = "/buy/apartments",
  breadcrumbCurrent = "Home",
  priceLabel = "Price",
}) {
  const { title, location, price, tags } = property;
  const priceText = `AED ${Number(price).toLocaleString("en-US")}`;

  return (
    <section className="w-full bg-[#111111] pt-28 sm:pt-32 lg:pt-36">
      {/* PropertyDetail: max 1280, padding 64px 16px — top already includes nav clearance */}
      <div className="mx-auto flex w-full max-w-[1280px] flex-col items-start px-4">
        {/* Frame 165: gap 20px — breadcrumb + title/gallery block */}
        <div className="flex w-full flex-col items-start gap-5">
          {/* Breadcrumb: Inter 18/27, #F5F5F5 */}
          <div className="flex items-center gap-2 font-[family-name:var(--font-body)] text-[18px] font-medium leading-[27px] text-[#F5F5F5]">
            <Link
              href={breadcrumbHref}
              className="transition hover:text-[#c5a059]"
            >
              {breadcrumbLabel}
            </Link>
            <span className="text-[#F5F5F5]/80" aria-hidden>
              &gt;
            </span>
            <span>{breadcrumbCurrent}</span>
          </div>

          {/* Title + price row */}
          <div className="flex w-full flex-col gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
            <div className="flex min-w-0 flex-1 flex-col items-start lg:max-w-[851px]">
              <h1 className="detail-heading m-0 text-left font-[family-name:var(--font-heading)] text-[28px] font-extrabold uppercase leading-[1.05] tracking-normal text-gold-gradient sm:text-[36px] lg:text-[46px] lg:leading-[48px]">
                {title}
              </h1>

              {/* Location: pt 16, gap 8, icon 20, Montserrat 16/24 */}
              <div className="flex items-center gap-2 pt-4">
                <MapPin
                  className="h-5 w-5 shrink-0 text-[#F5F5F5]"
                  strokeWidth={1.75}
                  aria-hidden
                />
                <span className="font-[family-name:var(--font-body)] text-[16px] font-normal leading-6 text-[#F5F5F5]">
                  {location}
                </span>
              </div>

              {/* Tags: pt 12 — #F3F4F6, radius 10, pad 8 16, gap 8 */}
              <div className="flex flex-wrap gap-3 pt-3">
                {tags.map(({ label, type }) => {
                  const Icon = TAG_ICONS[type] || Scan;
                  const goldIcon = GOLD_ICON_TYPES.has(type);
                  return (
                    <span
                      key={label}
                      className="inline-flex h-9 items-center gap-2 rounded-[10px] bg-[#F3F4F6] px-4 py-2 font-[family-name:var(--font-body)] text-[14px] font-medium leading-5 text-[#0A0A0A]"
                    >
                      <Icon
                        className={`h-4 w-4 shrink-0 ${
                          goldIcon ? "text-[#BA8A44]" : "text-[#0A0A0A]"
                        }`}
                        strokeWidth={1.6}
                      />
                      {label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Price column: align end, gap 12 */}
            <div className="flex shrink-0 flex-col items-start gap-3 lg:items-end">
              <div className="flex flex-col items-start lg:items-end">
                <span className="font-[family-name:var(--font-body)] text-[14px] font-normal leading-5 text-[#F5F5F5]">
                  {priceLabel}
                </span>
                <p className="m-0 pt-1 font-accent text-[28px] font-bold uppercase leading-[1.25] tracking-normal text-gold-gradient sm:text-[36px] lg:text-[40px] lg:leading-[51px]">
                  {priceText}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Add to favorites"
                  className="btn-gold flex size-11 cursor-pointer items-center justify-center rounded-full p-3 text-[#F5F5F5] transition hover:brightness-110"
                >
                  <Heart className="h-5 w-5" strokeWidth={1.6} />
                </button>
                <button
                  type="button"
                  aria-label="Share property"
                  className="btn-gold flex size-11 cursor-pointer items-center justify-center rounded-full p-3 text-[#F5F5F5] transition hover:brightness-110"
                >
                  <Share2 className="h-5 w-5" strokeWidth={1.6} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
