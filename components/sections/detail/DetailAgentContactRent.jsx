"use client";

import { UserRound } from "lucide-react";

export default function DetailAgentContactRent({ agent }) {
  return (
    <section className="w-full bg-[#111111] py-10 sm:py-12">
      <div className="mx-auto w-full max-w-[1120px] px-4">
        <div className="rounded-[20px] bg-[#1A1A1A] p-8 sm:p-10">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
            <div className="flex size-20 shrink-0 items-center justify-center rounded-full bg-[#111] text-[#BC8741]">
              <UserRound className="h-9 w-9" strokeWidth={1.5} aria-hidden />
            </div>
            <div>
              <h3 className="m-0 font-[family-name:var(--font-body)] text-[22px] font-semibold uppercase leading-9 text-[#F5F5F5] sm:text-[25px]">
                Get Expert Guidance for Your Next Move
              </h3>
              <p className="m-0 pt-1 font-[family-name:var(--font-body)] text-[18px] font-normal leading-[30px] text-[#D1D5DB] sm:text-[20px]">
                Contact our leasing specialist
              </p>
            </div>
          </div>

          <form
            className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              className="h-[62px] w-full rounded-[12px] border border-[#2A2A2A] bg-[#0A0A0A] px-5 font-[family-name:var(--font-body)] text-[18px] text-[#F5F5F5] outline-none placeholder:text-[#F5F5F5]/50 focus:border-[#BC8741] sm:text-[20px]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="h-[62px] w-full rounded-[12px] border border-[#2A2A2A] bg-[#0A0A0A] px-5 font-[family-name:var(--font-body)] text-[18px] text-[#F5F5F5] outline-none placeholder:text-[#F5F5F5]/50 focus:border-[#BC8741] sm:text-[20px]"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="h-[62px] w-full rounded-[12px] border border-[#2A2A2A] bg-[#0A0A0A] px-5 font-[family-name:var(--font-body)] text-[18px] text-[#F5F5F5] outline-none placeholder:text-[#F5F5F5]/50 focus:border-[#BC8741] sm:text-[20px]"
            />
            <input
              type="text"
              name="moveInDate"
              placeholder="Preferred Move-in Date"
              className="h-[62px] w-full rounded-[12px] border border-[#2A2A2A] bg-[#0A0A0A] px-5 font-[family-name:var(--font-body)] text-[18px] text-[#F5F5F5] outline-none placeholder:text-[#F5F5F5]/50 focus:border-[#BC8741] sm:text-[20px]"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Message (optional)"
              className="min-h-[152px] w-full resize-none rounded-[12px] border border-[#2A2A2A] bg-[#0A0A0A] px-5 py-4 font-[family-name:var(--font-body)] text-[18px] text-[#F5F5F5] outline-none placeholder:text-[#F5F5F5]/50 focus:border-[#BC8741] sm:col-span-2 sm:text-[20px]"
            />
            <button
              type="submit"
              className="btn-gold col-span-1 flex h-[60px] w-full cursor-pointer items-center justify-center rounded-full font-[family-name:var(--font-body)] text-[18px] font-semibold leading-[30px] text-[#F5F5F5] transition hover:brightness-110 sm:col-span-2 sm:text-[20px]"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
