import { formatAed } from "@/lib/mortgageCalculator";

export const RENTAL_COST_FIELDS = [
  {
    key: "monthlyRent",
    label: "Monthly Rent",
    options: [
      { value: "4000-6000", label: "AED 4,000 - 6,000" },
      { value: "6000-8500", label: "AED 6,000 - 8,500" },
      { value: "8500-12000", label: "AED 8,500 - 12,000" },
      { value: "12000-18000", label: "AED 12,000 - 18,000" },
      { value: "18000-30000", label: "AED 18,000 - 30,000" },
      { value: "30000-50000", label: "AED 30,000 - 50,000" },
    ],
  },
  {
    key: "securityDeposit",
    label: "Security Deposit",
    options: [
      { value: "5", label: "5%" },
      { value: "8", label: "8%" },
      { value: "10", label: "10%" },
    ],
  },
  {
    key: "contractDuration",
    label: "Contract Duration",
    options: [
      { value: "6", label: "6 Months" },
      { value: "12", label: "12 Months" },
      { value: "24", label: "24 Months" },
    ],
  },
  {
    key: "agencyFee",
    label: "Agency Fee",
    options: [
      { value: "0", label: "0%" },
      { value: "2.5", label: "2.5%" },
      { value: "5", label: "5%" },
    ],
  },
  {
    key: "cheques",
    label: "Payment Cheques",
    options: [
      { value: "1", label: "1 Cheque" },
      { value: "2", label: "2 Cheques" },
      { value: "4", label: "4 Cheques" },
      { value: "12", label: "12 Cheques" },
    ],
  },
];

export const DEFAULT_RENTAL_COST_INPUTS = {
  monthlyRent: "6000-8500",
  securityDeposit: "5",
  contractDuration: "12",
  agencyFee: "5",
  cheques: "4",
};

function parseAmount(value) {
  const parts = String(value || "")
    .split("-")
    .map((part) => Number(part.trim()))
    .filter((part) => Number.isFinite(part));

  if (parts.length >= 2) return (parts[0] + parts[1]) / 2;
  return parts[0] || 0;
}

export function calculateRentalCost(inputs) {
  const monthlyRent = parseAmount(inputs.monthlyRent);
  const depositPercent = Number(inputs.securityDeposit) || 0;
  const agencyPercent = Number(inputs.agencyFee) || 0;
  const months = Number(inputs.contractDuration) || 12;
  const cheques = Number(inputs.cheques) || 1;

  const annualRent = monthlyRent * 12;
  const securityDeposit = (annualRent * depositPercent) / 100;
  const agencyFee = (annualRent * agencyPercent) / 100;
  const totalMoveIn = monthlyRent + securityDeposit + agencyFee;
  const chequeAmount = annualRent / cheques;
  const contractTotal = monthlyRent * months;

  return {
    inputs: { ...inputs },
    monthlyRent,
    depositPercent,
    securityDeposit,
    agencyPercent,
    agencyFee,
    months,
    cheques,
    chequeAmount,
    annualRent,
    totalMoveIn,
    contractTotal,
    rows: [
      {
        label: "Monthly Rent",
        value: formatAed(monthlyRent),
      },
      {
        label: "Security Deposit",
        value: `${depositPercent}% (${formatAed(securityDeposit)})`,
      },
      {
        label: "Contract Duration",
        value: `${months} Months`,
      },
      {
        label: "Agency Fee",
        value: `${agencyPercent}% (${formatAed(agencyFee)})`,
      },
      {
        label: "Payment Cheques",
        value: `${cheques} × ${formatAed(chequeAmount)}`,
      },
      {
        label: "Total Move-In Cost",
        value: formatAed(totalMoveIn),
      },
      {
        label: "Monthly Commitment",
        value: formatAed(monthlyRent),
        strong: true,
      },
    ],
  };
}
