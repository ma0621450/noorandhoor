/**
 * Payment milestone relation helpers.
 * Public off-plan pages use calculator fields on `properties`
 * (payment_down_percent, payment_installments, payment_start_date).
 * Milestone rows are cleared on save and no longer shown on the site.
 */

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
        label: String(item.label || "").trim() || phase,
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
