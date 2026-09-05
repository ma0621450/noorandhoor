export const PAYMENT_DEFAULT = 3_200_000;
export const DEFAULT_DOWN_PERCENT = 10;
export const DEFAULT_INSTALLMENTS = 24;

/** @deprecated use DEFAULT_INSTALLMENTS */
export const INSTALLMENT_COUNT = DEFAULT_INSTALLMENTS;
/** @deprecated use DEFAULT_DOWN_PERCENT / 100 */
export const DOWN_PAYMENT_RATE = DEFAULT_DOWN_PERCENT / 100;

export function formatMoney(value) {
  return `AED ${Math.round(Number(value) || 0).toLocaleString("en-AE")}`;
}

/** @deprecated use formatMoney */
export function formatUsd(value) {
  return formatMoney(value);
}

function parseStartDate(value) {
  if (value) {
    const parsed = new Date(`${String(value).slice(0, 10)}T00:00:00`);
    if (!Number.isNaN(parsed.getTime())) {
      return new Date(parsed.getFullYear(), parsed.getMonth(), 1);
    }
  }
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth() + 1, 1);
}

export function resolvePaymentPlan({
  downPercent,
  installments,
  startDate,
} = {}) {
  const percent = Number(downPercent);
  const count = Number(installments);

  return {
    downPercent:
      Number.isFinite(percent) && percent > 0 && percent < 100
        ? percent
        : DEFAULT_DOWN_PERCENT,
    installments:
      Number.isFinite(count) && count >= 1
        ? Math.round(count)
        : DEFAULT_INSTALLMENTS,
    startDate: parseStartDate(startDate),
  };
}

export function paymentSliderBounds(basePrice) {
  const step = 10_000;
  const price = Math.max(Number(basePrice) || PAYMENT_DEFAULT, step);
  const min = Math.max(step, Math.floor((price * 0.5) / step) * step);
  const max = Math.max(
    Math.ceil((price * 2) / step) * step,
    Math.ceil((price + 1_000_000) / step) * step,
    1_000_000,
  );
  return {
    min,
    max,
    step,
    defaultPrice: Math.min(max, Math.max(min, price)),
  };
}

export function getPaymentBreakdown(price, planConfig = {}) {
  const plan = resolvePaymentPlan(planConfig);
  const safePrice = Math.max(Number(price) || 0, 0);
  const downPayment = (safePrice * plan.downPercent) / 100;
  const financed = Math.max(safePrice - downPayment, 0);
  const monthly = plan.installments > 0 ? financed / plan.installments : 0;
  return { price: safePrice, downPayment, financed, monthly, plan };
}

export function buildInstallments(price, planConfig = {}) {
  const { downPayment, financed, monthly, plan } = getPaymentBreakdown(
    price,
    planConfig,
  );
  let remaining = financed;

  const rows = [
    {
      id: "down",
      index: "—",
      date: "Down Payment",
      badge: `${Math.round(plan.downPercent)}%`,
      amount: downPayment,
      remaining,
    },
  ];

  for (let i = 0; i < plan.installments; i += 1) {
    remaining = Math.max(0, remaining - monthly);
    const due = new Date(plan.startDate);
    due.setMonth(plan.startDate.getMonth() + i);
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
