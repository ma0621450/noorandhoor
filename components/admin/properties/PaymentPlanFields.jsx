"use client";

import { DateField, TextField } from "@/components/admin/ui/Fields";

export default function PaymentPlanFields({ value = {}, onChange }) {
  const plan = {
    paymentDownPercent: value.paymentDownPercent ?? "10",
    paymentInstallments: value.paymentInstallments ?? "24",
    paymentStartDate: value.paymentStartDate ?? "",
  };

  const setField = (key, nextValue) => {
    onChange({ ...plan, [key]: nextValue });
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
      <div>
        <h2 className="text-sm font-semibold text-white">Payment plan</h2>
        <p className="mt-1 text-xs text-white/45">
          Calculator on the property page: down payment percent, monthly
          installment count, and first installment date.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 [&>div>label]:min-h-8 [&>div>label]:items-end">
        <TextField
          id="payment-down-percent"
          label="Down payment %"
          type="number"
          min="1"
          max="99"
          step="0.01"
          value={plan.paymentDownPercent}
          onChange={(event) =>
            setField("paymentDownPercent", event.target.value)
          }
          tooltip="Share paid upfront; remainder is financed across installments"
        />
        <TextField
          id="payment-installments"
          label="Installments (months)"
          type="number"
          min="1"
          max="120"
          value={plan.paymentInstallments}
          onChange={(event) =>
            setField("paymentInstallments", event.target.value)
          }
          tooltip="Number of equal monthly payments after the down payment"
        />
        <DateField
          id="payment-start-date"
          label="First installment date"
          value={plan.paymentStartDate}
          onChange={(event) =>
            setField("paymentStartDate", event.target.value)
          }
          hint="Optional. Schedule starts from this month; otherwise next month."
        />
      </div>
    </section>
  );
}
