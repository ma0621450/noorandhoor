export const PAYMENT_PHASES = [
  {
    key: "booking",
    label: "On booking",
    color: "#22c55e",
    defaultPercent: 10,
  },
  {
    key: "construction",
    label: "During construction",
    color: "#3b82f6",
    defaultPercent: 30,
    defaultPayments: 5,
  },
  {
    key: "handover",
    label: "Upon Handover",
    color: "#d1d5db",
    defaultPercent: 60,
  },
];

export const DEFAULT_PAYMENT_PLAN = {
  bookingPercent: 10,
  constructionPercent: 30,
  constructionPayments: 5,
  handoverPercent: 60,
};

function toPositivePercent(value, fallback = 0) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) return fallback;
  return Math.round(parsed * 100) / 100;
}

function toPaymentCount(value, fallback = 1) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < 1) return fallback;
  return Math.min(36, Math.round(parsed));
}

/**
 * Expand phase editor values into sorted milestone rows that sum to 100.
 */
export function expandPaymentPlanToMilestones(plan = {}) {
  const bookingPercent = toPositivePercent(
    plan.bookingPercent,
    DEFAULT_PAYMENT_PLAN.bookingPercent,
  );
  const constructionPercent = toPositivePercent(
    plan.constructionPercent,
    DEFAULT_PAYMENT_PLAN.constructionPercent,
  );
  const handoverPercent = toPositivePercent(
    plan.handoverPercent,
    DEFAULT_PAYMENT_PLAN.handoverPercent,
  );
  const constructionPayments = toPaymentCount(
    plan.constructionPayments,
    DEFAULT_PAYMENT_PLAN.constructionPayments,
  );

  const total = bookingPercent + constructionPercent + handoverPercent;
  if (Math.abs(total - 100) > 0.05) {
    return {
      ok: false,
      error: `Payment phases must total 100% (currently ${total}%).`,
      milestones: [],
    };
  }

  const milestones = [
    {
      phase: "booking",
      label: "On booking",
      percent: bookingPercent,
    },
  ];

  if (constructionPercent > 0) {
    const base = Math.floor((constructionPercent / constructionPayments) * 100) / 100;
    let allocated = 0;
    for (let i = 0; i < constructionPayments; i += 1) {
      const isLast = i === constructionPayments - 1;
      const percent = isLast
        ? Math.round((constructionPercent - allocated) * 100) / 100
        : base;
      allocated = Math.round((allocated + percent) * 100) / 100;
      milestones.push({
        phase: "construction",
        label:
          constructionPayments === 1
            ? "During construction"
            : `Construction payment ${i + 1}`,
        percent,
      });
    }
  }

  if (handoverPercent > 0) {
    milestones.push({
      phase: "handover",
      label: "Upon Handover",
      percent: handoverPercent,
    });
  }

  return { ok: true, error: "", milestones: normalizePaymentMilestones(milestones) };
}

export function normalizePaymentMilestones(value) {
  if (!Array.isArray(value)) return [];

  return value
    .map((item, index) => {
      const phase = String(item?.phase || "").trim();
      if (!["booking", "construction", "handover"].includes(phase)) return null;

      const percent = Number(item?.percent);
      if (!Number.isFinite(percent) || percent <= 0 || percent > 100) return null;

      return {
        id: item.id || null,
        clientKey: item.clientKey || item.id || null,
        phase,
        label:
          String(item.label || "").trim() ||
          PAYMENT_PHASES.find((entry) => entry.key === phase)?.label ||
          phase,
        percent: Math.round(percent * 100) / 100,
        sortOrder: Number.isFinite(Number(item.sortOrder))
          ? Number(item.sortOrder)
          : index,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.sortOrder - b.sortOrder);
}

export function paymentMilestonesFromRelation(rows = []) {
  if (!Array.isArray(rows) || !rows.length) return [];
  return normalizePaymentMilestones(
    [...rows]
      .sort((a, b) => Number(a.sort_order ?? 0) - Number(b.sort_order ?? 0))
      .map((row) => ({
        id: row.id,
        phase: row.phase,
        label: row.label,
        percent: row.percent,
        sortOrder: row.sort_order,
      })),
  );
}

export function paymentMilestonesToInsertRows(propertyId, milestones) {
  return normalizePaymentMilestones(milestones).map((item, index) => ({
    property_id: propertyId,
    phase: item.phase,
    label: item.label,
    percent: item.percent,
    sort_order: index,
  }));
}

export function paymentPlanFromMilestones(milestones = []) {
  const list = normalizePaymentMilestones(milestones);
  const sumPhase = (phase) =>
    list
      .filter((item) => item.phase === phase)
      .reduce((sum, item) => sum + item.percent, 0);

  const constructionRows = list.filter((item) => item.phase === "construction");

  return {
    bookingPercent: Math.round(sumPhase("booking") * 100) / 100 || "",
    constructionPercent: Math.round(sumPhase("construction") * 100) / 100 || "",
    constructionPayments: constructionRows.length || 1,
    handoverPercent: Math.round(sumPhase("handover") * 100) / 100 || "",
  };
}

export function paymentPlanToForm(milestones = []) {
  const plan = paymentPlanFromMilestones(milestones);
  if (!normalizePaymentMilestones(milestones).length) {
    return {
      bookingPercent: String(DEFAULT_PAYMENT_PLAN.bookingPercent),
      constructionPercent: String(DEFAULT_PAYMENT_PLAN.constructionPercent),
      constructionPayments: String(DEFAULT_PAYMENT_PLAN.constructionPayments),
      handoverPercent: String(DEFAULT_PAYMENT_PLAN.handoverPercent),
    };
  }
  return {
    bookingPercent: String(plan.bookingPercent || ""),
    constructionPercent: String(plan.constructionPercent || ""),
    constructionPayments: String(plan.constructionPayments || 1),
    handoverPercent: String(plan.handoverPercent || ""),
  };
}

export function buildPaymentPlanSummary(milestones = [], totalPrice = 0) {
  const list = normalizePaymentMilestones(milestones);
  if (!list.length) return null;

  const phases = PAYMENT_PHASES.map((phase) => {
    const rows = list.filter((item) => item.phase === phase.key);
    const percent = Math.round(
      rows.reduce((sum, item) => sum + item.percent, 0) * 100,
    ) / 100;
    return {
      key: phase.key,
      label: phase.label,
      color: phase.color,
      percent,
      paymentCount: rows.length,
      amount:
        Number(totalPrice) > 0
          ? Math.round((Number(totalPrice) * percent) / 100)
          : 0,
      rows: rows.map((row) => ({
        ...row,
        amount:
          Number(totalPrice) > 0
            ? Math.round((Number(totalPrice) * row.percent) / 100)
            : 0,
      })),
    };
  }).filter((phase) => phase.percent > 0);

  const totalPercent = Math.round(
    phases.reduce((sum, phase) => sum + phase.percent, 0) * 100,
  ) / 100;

  return {
    phases,
    totalPercent,
    milestones: list,
  };
}

export function hasPaymentPlan(milestones = []) {
  return normalizePaymentMilestones(milestones).length > 0;
}
