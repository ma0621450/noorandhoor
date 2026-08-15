const MATRIX_ROWS = [
  {
    growth: "3.5%",
    yield: "13.5%",
    rent: "$42,000",
    avgPrice: "$736 / Sq.ft",
    community: "Palm Jumeirah",
  },
  {
    growth: "3.0%",
    yield: "13.5%",
    rent: "$42,000",
    avgPrice: "$736 / Sq.ft",
    community: "Dubai Hills",
  },
  {
    growth: "2.5%",
    yield: "13.0%",
    rent: "$42,000",
    avgPrice: "$736 / Sq.ft",
    community: "Downtown Dubai",
  },
  {
    growth: "2.5%",
    yield: "12.5%",
    rent: "$38,000",
    avgPrice: "$736 / Sq.ft",
    community: "Dubai Marina",
  },
  {
    growth: "2.5%",
    yield: "12.8%",
    rent: "$45,000",
    avgPrice: "$736 / Sq.ft",
    community: "Jumeirah Golf Estates",
  },
  {
    growth: "2.5%",
    yield: "13.2%",
    rent: "$43,000",
    avgPrice: "$736 / Sq.ft",
    community: "Dubai Hills Estate",
  },
  {
    growth: "2.5%",
    yield: "13.5%",
    rent: "$42,000",
    avgPrice: "$736 / Sq.ft",
    community: "Business Bay",
  },
];

const COLUMNS = [
  { key: "growth", label: "Projected 3-Year growth" },
  { key: "yield", label: "Net Rental Yield" },
  { key: "rent", label: "Estimated Monthly Rent" },
  { key: "avgPrice", label: "Avg. Price / Sq.ft" },
  { key: "community", label: "Community Name" },
];

export default function RentalMatrix() {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center gap-4 text-center">
        <h3 className="section-sub-heading">Matrix</h3>
        <h2 className="text-gold-gradient max-w-[911px]">
          Estimated Rental Value
        </h2>
        <div className="section-divider" />
      </div>

      <div className="mx-auto mt-10 max-w-[995px] overflow-x-auto [-webkit-overflow-scrolling:touch]">
        <p className="mb-2 text-center text-xs text-white/50 md:hidden">
          Swipe sideways to view all columns
        </p>
        <table className="w-full min-w-[760px] border-collapse">
          <thead>
            <tr
              className="text-sm font-semibold text-[#111]"
              style={{
                background: "linear-gradient(22.27deg, #EEC876 13.91%, #B3813D 86.09%)",
              }}
            >
              {COLUMNS.map((column, index) => (
                <th
                  key={column.key}
                  className={`px-4 py-5 text-left font-semibold sm:px-5 ${
                    index === 0 ? "sticky left-0 z-10 bg-[#d6a85e]" : ""
                  }`}
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
                  className={`border-b border-[#E5E7EB] text-sm ${
                    isLight ? "bg-white text-[#111]" : "bg-transparent text-[#f5f5f5]"
                  }`}
                >
                  {COLUMNS.map((column, colIndex) => (
                    <td
                      key={column.key}
                      className={`px-4 py-5 sm:px-5 ${
                        column.key === "rent" || column.key === "avgPrice" || column.key === "community"
                          ? "font-semibold"
                          : "font-normal"
                      } ${
                        colIndex === 0
                          ? `sticky left-0 z-10 ${isLight ? "bg-white" : "bg-[#111]"}`
                          : ""
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
        <div className="h-px w-full bg-[#E5E7EB]/60" />
      </div>
    </section>
  );
}
