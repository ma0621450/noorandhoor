export const PAYMENT_MIN = 500_000;
export const PAYMENT_MAX = 10_000_000;
export const PAYMENT_DEFAULT = 3_200_000;
export const DOWN_PAYMENT_RATE = 0.1;
export const INSTALLMENT_COUNT = 24;
export const FIRST_INSTALLMENT = new Date(2025, 7, 1);

export function formatUsd(value) {
  return `$${Math.round(value).toLocaleString("en-US")}`;
}

export function getPaymentBreakdown(price) {
  const downPayment = price * DOWN_PAYMENT_RATE;
  const financed = price - downPayment;
  const monthly = financed / INSTALLMENT_COUNT;
  return { price, downPayment, financed, monthly };
}

export function buildInstallments(price) {
  const { downPayment, financed, monthly } = getPaymentBreakdown(price);
  let remaining = financed;

  const rows = [
    {
      id: "down",
      index: "—",
      date: "Down Payment",
      badge: "10%",
      amount: downPayment,
      remaining,
    },
  ];

  for (let i = 0; i < INSTALLMENT_COUNT; i += 1) {
    remaining = Math.max(0, remaining - monthly);
    const due = new Date(FIRST_INSTALLMENT);
    due.setMonth(FIRST_INSTALLMENT.getMonth() + i);
    rows.push({
      id: `inst-${i + 1}`,
      index: String(i + 1).padStart(2, "0"),
      date: due.toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      amount: monthly,
      remaining,
    });
  }

  return rows;
}
