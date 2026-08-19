"use client";

import { Heart, Share2 } from "lucide-react";

export default function DetailHeaderActions() {
  return (
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
  );
}
