const MATRIX_ROWS = [
  {
    community: "Palm Jumeirah",
    avgPrice: "$736/ Sq.ft",
    rentalYield: "13.5%",
    growth: "3.5%",
  },
  {
    community: "Downtown Dubai",
    avgPrice: "$736/ Sq.ft",
    rentalYield: "12.5%",
    growth: "2.5%",
  },
  {
    community: "Downtown Dubai Marina",
    avgPrice: "$736/ Sq.ft",
    rentalYield: "13.5%",
    growth: "3.5%",
  },
  {
    community: "Jumeirah Golf Estates",
    avgPrice: "$736/ Sq.ft",
    rentalYield: "12.5%",
    growth: "2.5%",
  },
  {
    community: "Jumeirah Golf Estates",
    avgPrice: "$736/ Sq.ft",
    rentalYield: "13.5%",
    growth: "3.5%",
  },
  {
    community: "Dubai Marina",
    avgPrice: "$736/ Sq.ft",
    rentalYield: "12.5%",
    growth: "2.5%",
  },
  {
    community: "Dubai Hills",
    avgPrice: "$736/ Sq.ft",
    rentalYield: "13.5%",
    growth: "3.5%",
  },
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
        <h2 className="text-gold-gradient">
          Investment Value &amp; Comparison Matrix
        </h2>
        <div className="h-[3px] w-16 bg-[#B3813D]" />
      </div>

      <div className="mt-10 mx-auto max-w-5xl overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr
              className="text-sm font-medium uppercase tracking-wide text-[#1a1a1a] sm:text-base"
              style={{
                background: "var(--gold-gradient)",
              }}
            >
              {COLUMNS.map((column, index) => (
                <th
                  key={column.key}
                  className={`px-4 py-4 sm:px-6 sm:py-5 ${
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
                  className={
                    isLight
                      ? "bg-white text-[#111] text-sm sm:text-base"
                      : "bg-transparent text-white text-sm sm:text-base"
                  }
                >
                  {COLUMNS.map((column) => (
                    <td
                      key={column.key}
                      className={`px-4 py-4 sm:px-6 sm:py-5 ${
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

        <div className="mt-0 h-px w-full bg-white" />
      </div>
    </section>
  );
}
