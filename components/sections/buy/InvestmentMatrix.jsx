const MATRIX_ROWS = [
  { community: "Palm Jumeirah", avgPrice: "$736/ Sq.ft", rentalYield: "13.5%", growth: "3.5%" },
  { community: "Downtown Dubai", avgPrice: "$736/ Sq.ft", rentalYield: "12.5%", growth: "2.5%" },
  { community: "Downtown Dubai Marina", avgPrice: "$736/ Sq.ft", rentalYield: "13.5%", growth: "3.5%" },
  { community: "Jumeirah Golf Estates", avgPrice: "$736/ Sq.ft", rentalYield: "12.5%", growth: "2.5%" },
  { community: "Jumeirah Golf Estates (alt.)", avgPrice: "$736/ Sq.ft", rentalYield: "13.5%", growth: "3.5%" },
  { community: "Dubai Marina (alt.)", avgPrice: "$736/ Sq.ft", rentalYield: "12.5%", growth: "2.5%" },
  { community: "Dubai Hills", avgPrice: "$736/ Sq.ft", rentalYield: "13.5%", growth: "3.5%" },
];

const COLUMNS = [
  { key: "community", label: "Community Name", align: "left" },
  { key: "avgPrice", label: "Avg.price/Sq.ft", align: "center" },
  { key: "rentalYield", label: "Net Rental Yield", align: "center" },
  { key: "growth", label: "Projected 3-yr growth", align: "center" },
];

export default function InvestmentMatrix() {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center gap-4 text-center">
        <h3 className="section-sub-heading">Matrix</h3>
        <h2 className="text-gold-gradient max-w-[911px]">
          Investment Value &amp; Comparison Matrix
        </h2>
        <div className="section-divider" />
      </div>

      <div className="mx-auto mt-10 max-w-[793px] overflow-x-auto rounded-t-xl">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr
              className="text-sm font-medium text-[#1a1a1a] sm:text-base"
              style={{ background: "var(--gold-gradient)" }}
            >
              {COLUMNS.map((column, index) => (
                <th
                  key={column.key}
                  className={`px-4 py-5 sm:px-6 ${
                    index === 0 ? "rounded-tl-xl text-left" : "text-center"
                  } ${index === COLUMNS.length - 1 ? "rounded-tr-xl" : ""}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {MATRIX_ROWS.map((row, index) => {
              const isLight = index % 2 === 1;
              return (
                <tr
                  key={`${row.community}-${index}`}
                  className={`text-sm sm:text-base ${
                    isLight
                      ? "bg-white text-[#111]"
                      : "bg-transparent text-white"
                  }`}
                >
                  {COLUMNS.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-5 sm:px-6 ${
                        column.align === "left" ? "text-left" : "text-center"
                      }`}
                    >
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="h-px w-full bg-white" />
      </div>
    </section>
  );
}
