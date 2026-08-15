"use client";

import { Phone, UserRound } from "lucide-react";

export default function DetailAgentContact({ agent }) {
  return (
    <section className="w-full bg-[#111111] py-10 sm:py-14">
      <div className="mx-auto w-full max-w-[1280px] px-4">
        <p className="text-xs font-normal uppercase tracking-[2.2px] text-[#c59d5f]">
          Contact Our Agent
        </p>
        <h2 className="detail-heading mt-3 max-w-[900px] text-left font-[family-name:var(--font-heading)] text-[clamp(1.5rem,3vw,2.5rem)] font-extrabold uppercase leading-[1.15] text-gold-gradient">
          Get Expert Guidance for Your Next Move
        </h2>
        <div className="section-divider mt-3 ml-0 mr-auto" />

        <div className="mt-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-4">
            <div className="flex size-[72px] items-center justify-center rounded-full bg-[#1a1a1a] text-[#c59d5f] sm:size-20">
              <UserRound className="h-8 w-8" strokeWidth={1.5} aria-hidden />
            </div>
            <div>
              <p className="text-sm text-white/55">Contact Agent</p>
              <p className="text-lg font-semibold text-white sm:text-xl">{agent.name}</p>
            </div>
          </div>

          <a
            href={`tel:${agent.phone}`}
            aria-label="Call agent"
            className="flex size-14 cursor-pointer items-center justify-center rounded-full bg-[#00d600] text-white shadow-lg transition hover:brightness-110"
          >
            <Phone className="h-6 w-6" fill="currentColor" strokeWidth={0} />
          </a>
        </div>

        <form
          className="relative mt-8 min-h-[180px] w-full rounded-xl border border-white/20 p-4 sm:p-5"
          onSubmit={(e) => e.preventDefault()}
        >
          <textarea
            rows={5}
            placeholder="write your Message"
            className="w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-white/40"
          />
          <div className="mt-2 flex justify-end">
            <button
              type="submit"
              className="cursor-pointer rounded-lg bg-[#c59d5f] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#d6a85e]"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
