import { COMPARISON_ROWS } from "@/components/sections/developers/developersData";

const COLUMNS = [
  { key: "developer", label: "Developer" },
  { key: "specialty", label: "Core Specialty" },
  { key: "milestone", label: "Historic Milestone" },
  { key: "rating", label: "Capital Liquidity Rating" },
];

export default function DevelopersComparison() {
  return (
    <section className="section-container">
      <div className="flex flex-col items-center gap-4 text-center">
        <p className="section-sub-heading">Comparison Matrix</p>
        <h2 className="text-gold-gradient">Developer Comparison</h2>
        <div className="section-divider" />
      </div>

      <div className="mx-auto mt-10 max-w-[883px] overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse">
          <thead>
            <tr
              className="text-sm font-semibold text-[#111]"
              style={{ background: "var(--gold-gradient)" }}
            >
              {COLUMNS.map((column, index) => (
                <th
                  key={column.key}
                  className={`px-4 py-5 text-left sm:px-6 ${
                    index === 0 ? "rounded-tl-xl" : ""
                  } ${index === COLUMNS.length - 1 ? "rounded-tr-xl" : ""}`}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row, index) => {
              const isLight = index % 2 === 1;
              return (
                <tr
                  key={row.developer}
                  className={`border-b border-[#E5E7EB] text-sm ${
                    isLight ? "bg-white text-[#111]" : "bg-transparent text-[#F5F5F5]"
                  }`}
                >
                  {COLUMNS.map((column) => (
                    <td key={column.key} className="px-4 py-5 sm:px-6">
                      {row[column.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
