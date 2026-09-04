const AED = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  maximumFractionDigits: 0,
});

const AED_EXACT = new Intl.NumberFormat("en-AE", {
  style: "currency",
  currency: "AED",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatAed(value, exact = false) {
  return (exact ? AED_EXACT : AED).format(Number(value) || 0);
}

export const MORTGAGE_FIELDS = [
  {
    key: "residency",
    label: "Residency",
    options: ["UAE National", "UAE Resident", "Non-Resident"],
  },
  {
    key: "employment",
    label: "Employment",
    options: ["Salaried", "Self-Employed", "Business Owner"],
  },
  {
    key: "purpose",
    label: "Loan Purpose",
    options: ["Primary Residence", "Investment Property"],
  },
  {
    key: "propertyType",
    label: "Property Type",
    options: ["Apartment", "Villa", "Townhouse", "Penthouse"],
  },
  {
    key: "propertyPrice",
    label: "Property Price",
    options: [
      { value: "750000", label: "AED 750,000" },
      { value: "1250000", label: "AED 1,250,000" },
      { value: "2500000", label: "AED 2,500,000" },
      { value: "5000000", label: "AED 5,000,000" },
      { value: "10000000", label: "AED 10,000,000" },
    ],
  },
  {
    key: "loanTerm",
    label: "Loan Term",
    options: [
      { value: "5", label: "5 Years" },
      { value: "10", label: "10 Years" },
      { value: "15", label: "15 Years" },
      { value: "20", label: "20 Years" },
      { value: "25", label: "25 Years" },
    ],
  },
  {
    key: "downPayment",
    label: "Down Payment",
    options: [
      { value: "20", label: "20%" },
      { value: "25", label: "25%" },
      { value: "30", label: "30%" },
      { value: "40", label: "40%" },
      { value: "50", label: "50%" },
    ],
  },
  {
    key: "interestRate",
    label: "Interest Rate",
    options: [
      { value: "3.99", label: "3.99%" },
      { value: "4.24", label: "4.24%" },
      { value: "4.49", label: "4.49%" },
      { value: "4.99", label: "4.99%" },
    ],
  },
];

export const DEFAULT_MORTGAGE_INPUTS = {
  residency: "UAE Resident",
  employment: "Salaried",
  purpose: "Primary Residence",
  propertyType: "Apartment",
  propertyPrice: "1250000",
  loanTerm: "25",
  downPayment: "20",
  interestRate: "4.24",
};

function monthlyPayment(principal, annualRate, years) {
  const months = years * 12;
  if (months <= 0) return 0;
  const monthlyRate = annualRate / 100 / 12;
  if (monthlyRate === 0) return principal / months;
  const factor = (1 + monthlyRate) ** months;
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function calculateMortgage(inputs) {
  const price = Number(inputs.propertyPrice) || 0;
  const downPercent = Number(inputs.downPayment) || 0;
  const years = Number(inputs.loanTerm) || 0;
  const rate = Number(inputs.interestRate) || 0;

  const downPaymentAmount = (price * downPercent) / 100;
  const loanAmount = Math.max(price - downPaymentAmount, 0);
  const processingFee = Math.max(Math.round(loanAmount * 0.01), 2500);
  const totalUpfront = downPaymentAmount + processingFee;
  const payment = monthlyPayment(loanAmount, rate, years);

  return {
    inputs: { ...inputs },
    propertyLabel: `${inputs.propertyType} · ${inputs.purpose}`,
    price,
    downPercent,
    downPaymentAmount,
    processingFee,
    totalUpfront,
    loanAmount,
    years,
    months: years * 12,
    rate,
    monthlyPayment: payment,
  };
}
