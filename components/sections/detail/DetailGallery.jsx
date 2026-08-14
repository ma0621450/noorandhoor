"use client";

import Image from "next/image";
import { useState } from "react";

function fillPhotos(images, count = 5) {
  if (!images.length) return [];
  return Array.from({ length: count }, (_, i) => images[i % images.length]);
}

export default function DetailGallery({ images = [] }) {
  const [open, setOpen] = useState(false);
  const photos = fillPhotos(images, 5);
  const [main, midTop, midBottom, rightTop, rightBottom] = photos;

  return (
    <section className="w-full bg-[#111111]">
      <div className="mx-auto w-full max-w-[1280px] px-4">
        {/* Gallery wrapper: pt 32px — 1248×600 grid, 408 cells, 12px gutters */}
        <div className="pt-8">
          <div className="relative hidden h-[600px] w-full md:block">
            {main && (
              <div className="absolute left-0 top-0 h-[600px] w-[calc((100%-24px)/3)] overflow-hidden rounded-2xl">
                <Image
                  src={main}
                  alt="Property main photo"
                  fill
                  sizes="33vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {midTop && (
              <div className="absolute left-[calc((100%-24px)/3+12px)] top-0 h-[294.5px] w-[calc((100%-24px)/3)] overflow-hidden rounded-2xl">
                <Image
                  src={midTop}
                  alt="Property photo 2"
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            )}

            {rightTop && (
              <div className="absolute left-[calc(2*((100%-24px)/3)+24px)] top-0 h-[294.5px] w-[calc((100%-24px)/3)] overflow-hidden rounded-2xl">
                <Image
                  src={rightTop}
                  alt="Property photo 3"
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            )}

            {midBottom && (
              <div className="absolute left-[calc((100%-24px)/3+12px)] top-[305.5px] h-[294.5px] w-[calc((100%-24px)/3)] overflow-hidden rounded-2xl">
                <Image
                  src={midBottom}
                  alt="Property photo 4"
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
              </div>
            )}

            {rightBottom && (
              <div className="absolute left-[calc(2*((100%-24px)/3)+24px)] top-[305.5px] h-[294.5px] w-[calc((100%-24px)/3)] overflow-hidden rounded-2xl">
                <Image
                  src={rightBottom}
                  alt="Property photo 5"
                  fill
                  sizes="33vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="btn-gold flex h-12 w-[161px] cursor-pointer items-center justify-center rounded-[10px] font-[family-name:var(--font-body)] text-[16px] font-semibold leading-6 text-[#F5F5F5] transition hover:brightness-110"
                  >
                    View All Photos
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile stack */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {photos.map((image, index) => {
              const isLast = index === photos.length - 1;
              return (
                <div
                  key={index}
                  className="relative aspect-[4/3] overflow-hidden rounded-2xl"
                >
                  <Image
                    src={image}
                    alt={`Property photo ${index + 1}`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority={index === 0}
                  />
                  {isLast && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <button
                        type="button"
                        onClick={() => setOpen(true)}
                        className="btn-gold flex h-12 cursor-pointer items-center justify-center rounded-[10px] px-6 font-[family-name:var(--font-body)] text-[16px] font-semibold text-[#F5F5F5]"
                      >
                        View All Photos
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(false)}
        >
          <button
            type="button"
            className="absolute right-5 top-5 cursor-pointer text-sm text-white"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          <div
            className="grid max-h-[90vh] w-full max-w-5xl grid-cols-1 gap-3 overflow-y-auto sm:grid-cols-2"
            onClick={(e) => e.stopPropagation()}
          >
            {images.map((image, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] overflow-hidden rounded-xl"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="50vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
