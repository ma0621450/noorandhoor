"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";

function TestimonialCard({ quote, person }) {
  const [name, title] = person;

  return (
    <article className="flex h-full min-h-[300px] w-full flex-col gap-6 rounded-xl border border-[#e9c34926] bg-[#141414]/80 p-5 transition hover:border-[#e9c34973] sm:min-h-[320px] sm:p-8">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-1" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-[#ba8a44] text-[#ba8a44]"
              strokeWidth={0}
            />
          ))}
        </div>
        <Quote
          className="h-6 w-6 shrink-0 fill-[#ba8a44] text-[#ba8a44]"
          strokeWidth={0}
        />
      </div>

      <p className="flex-1 text-sm leading-7 text-white/90 sm:text-base">
        “{quote}”
      </p>

      <div className="border-t border-[#e9c34926] pt-5">
        <p className="text-xs font-bold uppercase tracking-wide text-white">
          {name}
        </p>
        <p className="mt-1 text-xs text-white/60">{title}</p>
      </div>
    </article>
  );
}

function useSlidesPerView() {
  const [perView, setPerView] = useState(1);

  useEffect(() => {
    const update = () => {
      if (window.matchMedia("(min-width: 1280px)").matches) setPerView(3);
      else if (window.matchMedia("(min-width: 768px)").matches) setPerView(2);
      else setPerView(1);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return perView;
}

export default function TestimonialSlider({ items }) {
  const perView = useSlidesPerView();
  const maxIndex = Math.max(0, items.length - perView);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(null);

  useEffect(() => {
    setIndex((current) => Math.min(current, maxIndex));
  }, [maxIndex]);

  const goTo = useEffectEvent((next) => {
    if (maxIndex === 0) return;
    if (next < 0) {
      setIndex(maxIndex);
      return;
    }
    if (next > maxIndex) {
      setIndex(0);
      return;
    }
    setIndex(next);
  });

  useEffect(() => {
    if (paused || maxIndex === 0) return undefined;
    const timer = window.setInterval(() => goTo(index + 1), 5000);
    return () => window.clearInterval(timer);
  }, [goTo, index, maxIndex, paused]);

  const slidePercent = 100 / perView;

  return (
    <div
      className="relative w-full max-w-[1120px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setPaused(false);
        }
      }}
    >
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${index * slidePercent}%)`,
          }}
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0]?.clientX ?? null;
          }}
          onTouchEnd={(event) => {
            if (touchStartX.current == null) return;
            const delta = event.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) < 40) return;
            goTo(delta < 0 ? index + 1 : index - 1);
          }}
        >
          {items.map((item) => (
            <div
              key={item.name}
              className="shrink-0 px-3"
              style={{ width: `${slidePercent}%` }}
            >
              <TestimonialCard quote={item.quote} person={item.person} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => goTo(index - 1)}
          className="flex size-11 items-center justify-center rounded-full border border-[#ba8a44]/50 text-[#eec876] transition hover:border-[#eec876] hover:bg-[#ba8a44]/15"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
          {Array.from({ length: maxIndex + 1 }).map((_, dotIndex) => {
            const active = dotIndex === index;
            return (
              <button
                key={dotIndex}
                type="button"
                role="tab"
                aria-selected={active}
                aria-label={`Go to slide ${dotIndex + 1}`}
                onClick={() => goTo(dotIndex)}
                className={`h-2.5 rounded-full transition-all ${
                  active
                    ? "w-8 bg-[#ba8a44]"
                    : "w-2.5 bg-white/25 hover:bg-white/45"
                }`}
              />
            );
          })}
        </div>

        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => goTo(index + 1)}
          className="flex size-11 items-center justify-center rounded-full border border-[#ba8a44]/50 text-[#eec876] transition hover:border-[#eec876] hover:bg-[#ba8a44]/15"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
