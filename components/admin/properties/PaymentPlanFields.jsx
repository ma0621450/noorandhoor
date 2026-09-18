"use client";

import { TextField } from "@/components/admin/ui/Fields";
import {
  DEFAULT_PAYMENT_PLAN,
  expandPaymentPlanToMilestones,
} from "@/lib/admin/propertyPaymentPlan";

function toNumber(value) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function PaymentPlanFields({ value = {}, onChange }) {
  const plan = {
    bookingPercent: value.bookingPercent ?? String(DEFAULT_PAYMENT_PLAN.bookingPercent),
    constructionPercent:
      value.constructionPercent ?? String(DEFAULT_PAYMENT_PLAN.constructionPercent),
    constructionPayments:
      value.constructionPayments ?? String(DEFAULT_PAYMENT_PLAN.constructionPayments),
    handoverPercent:
      value.handoverPercent ?? String(DEFAULT_PAYMENT_PLAN.handoverPercent),
  };

  const total =
    toNumber(plan.bookingPercent) +
    toNumber(plan.constructionPercent) +
    toNumber(plan.handoverPercent);
  const preview = expandPaymentPlanToMilestones(plan);
  const totalOk = Math.abs(total - 100) <= 0.05;

  const setField = (key, nextValue) => {
    onChange({ ...plan, [key]: nextValue });
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
      <div>
        <h2 className="text-sm font-semibold text-white">Payment plan</h2>
        <p className="mt-1 text-xs text-white/45">
          Milestone plan shown on the property page. Phases must total 100%.
          Construction is split into equal payments.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 [&>div>label]:min-h-8 [&>div>label]:items-end">
        <TextField
          id="payment-booking"
          label="Booking %"
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={plan.bookingPercent}
          onChange={(event) => setField("bookingPercent", event.target.value)}
          tooltip="Paid on booking / reservation"
        />
        <TextField
          id="payment-construction"
          label="Construction %"
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={plan.constructionPercent}
          onChange={(event) =>
            setField("constructionPercent", event.target.value)
          }
          tooltip="Total share paid during construction"
        />
        <TextField
          id="payment-construction-count"
          label="Payments"
          type="number"
          min="1"
          max="36"
          value={plan.constructionPayments}
          onChange={(event) =>
            setField("constructionPayments", event.target.value)
          }
          tooltip="Splits construction % into equal installments"
        />
        <TextField
          id="payment-handover"
          label="Handover %"
          type="number"
          min="0"
          max="100"
          step="0.01"
          value={plan.handoverPercent}
          onChange={(event) => setField("handoverPercent", event.target.value)}
          tooltip="Paid on handover / completion"
        />
      </div>

      <div
        className={`rounded-xl border px-4 py-3 text-sm ${
          totalOk
            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
            : "border-red-400/30 bg-red-500/10 text-red-200"
        }`}
      >
        Total: {total}% {totalOk ? "(ready)" : "(must equal 100%)"}
        {preview.ok ? (
          <span className="ml-2 text-white/50">
            · {preview.milestones.length} milestone rows
          </span>
        ) : null}
      </div>
    </section>
  );
}
