"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import MatchMakingForm from "@/components/sections/buy/MatchMakingForm";

export default function EnquiryModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close enquiry form"
        className="absolute inset-0 bg-black/75"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-[#ba8a44]/25 bg-[#1a1a1a] px-5 py-8 shadow-2xl sm:px-8 sm:py-10"
      >
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          className="absolute right-4 top-4 text-white/50 transition hover:text-white"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6 flex flex-col items-center gap-3 text-center">
          <h2 id="enquiry-modal-title" className="text-gold-gradient text-2xl sm:text-3xl">
            Discover Properties That Match Your Vision
          </h2>
          <div className="section-divider" />
          <p className="max-w-2xl text-sm font-medium leading-[26px] text-[#f5f5f5]">
            Share your requirements, and we&apos;ll connect you with carefully selected
            UAE properties that fit your lifestyle and budget.
          </p>
        </div>

        <MatchMakingForm
          compact
          source="header"
          submitLabel="Submit Enquiry"
          onSuccess={() => {
            window.setTimeout(onClose, 1600);
          }}
        />
      </div>
    </div>
  );
}
