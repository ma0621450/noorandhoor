import { formatAed } from "@/lib/mortgageCalculator";

export const SELLER_PROCEEDS_FIELDS = [
  {
    key: "propertyValue",
    label: "Estimated Property Value",
    options: [
      { value: "500000-1000000", label: "AED 500,000 - 1,000,000" },
      { value: "1000000-2500000", label: "AED 1,000,000 - 2,500,000" },
      { value: "2500000-5000000", label: "AED 2,500,000 - 5,000,000" },
      { value: "5000000-10000000", label: "AED 5,000,000 - 10,000,000" },
      { value: "10000000-20000000", label: "AED 10,000,000 - 20,000,000" },
    ],
  },
  {
    key: "agentCommission",
    label: "Agent Commission",
    options: [
      { value: "1", label: "1.0%" },
      { value: "1.5", label: "1.5%" },
      { value: "2", label: "2.0%" },
      { value: "2.5", label: "2.5%" },
      { value: "3", label: "3.0%" },
    ],
  },
  {
    key: "transferFees",
    label: "Transfer & Legal Fees",
    options: [
      { value: "2500", label: "AED 2,500" },
      { value: "4500", label: "AED 4,500" },
      { value: "7500", label: "AED 7,500" },
      { value: "10000", label: "AED 10,000" },
      { value: "15000", label: "AED 15,000" },
    ],
  },
  {
    key: "marketingCosts",
    label: "Marketing Costs",
    options: [
      { value: "0", label: "AED 0" },
      { value: "1200", label: "AED 1,200" },
      { value: "2500", label: "AED 2,500" },
      { value: "5000", label: "AED 5,000" },
      { value: "10000", label: "AED 10,000" },
    ],
  },
  {
    key: "outstandingMortgage",
    label: "Outstanding Mortgage",
    options: [
      { value: "0", label: "AED 0 (No mortgage)" },
      { value: "0-250000", label: "AED 0 - 250,000" },
      { value: "250000-500000", label: "AED 250,000 - 500,000" },
      { value: "500000-1000000", label: "AED 500,000 - 1,000,000" },
      { value: "1000000-2500000", label: "AED 1,000,000 - 2,500,000" },
      { value: "2500000-5000000", label: "AED 2,500,000 - 5,000,000" },
    ],
  },
];

export const DEFAULT_SELLER_PROCEEDS_INPUTS = {
  propertyValue: "1000000-2500000",
  agentCommission: "2",
  transferFees: "4500",
  marketingCosts: "1200",
  outstandingMortgage: "250000-500000",
};

function parseAmount(value) {
  const parts = String(value || "")
    .split("-")
    .map((part) => Number(part.trim()))
    .filter((part) => Number.isFinite(part));

  if (parts.length >= 2) return (parts[0] + parts[1]) / 2;
  return parts[0] || 0;
}

function optionLabel(fieldKey, value) {
  const field = SELLER_PROCEEDS_FIELDS.find((item) => item.key === fieldKey);
  const option = field?.options?.find((item) => item.value === value);
  return option?.label || value;
}

export function calculateSellerProceeds(inputs) {
  const propertyValue = parseAmount(inputs.propertyValue);
  const commissionPercent = Number(inputs.agentCommission) || 0;
  const transferFees = parseAmount(inputs.transferFees);
  const marketingCosts = parseAmount(inputs.marketingCosts);
  const outstandingMortgage = parseAmount(inputs.outstandingMortgage);
  const commissionAmount = (propertyValue * commissionPercent) / 100;
  const totalCosts =
    commissionAmount + transferFees + marketingCosts + outstandingMortgage;
  const netProceeds = Math.max(propertyValue - totalCosts, 0);

  return {
    inputs: { ...inputs },
    propertyValue,
    propertyValueLabel: optionLabel("propertyValue", inputs.propertyValue),
    commissionPercent,
    commissionAmount,
    transferFees,
    marketingCosts,
    outstandingMortgage,
    outstandingMortgageLabel: optionLabel(
      "outstandingMortgage",
      inputs.outstandingMortgage,
    ),
    totalCosts,
    netProceeds,
    rows: [
      {
        label: "Estimated Property Value",
        value: formatAed(propertyValue),
      },
      {
        label: "Agent Commission",
        value: `${commissionPercent.toFixed(1)}% (${formatAed(commissionAmount)})`,
      },
      {
        label: "Transfer & Legal Fees",
        value: formatAed(transferFees),
      },
      {
        label: "Marketing Costs",
        value: formatAed(marketingCosts),
      },
      {
        label: "Outstanding Mortgage",
        value: formatAed(outstandingMortgage),
      },
      {
        label: "Estimated Net Proceeds",
        value: formatAed(netProceeds),
        strong: true,
      },
    ],
  };
}
