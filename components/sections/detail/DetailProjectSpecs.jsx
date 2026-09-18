import { Info } from "lucide-react";
import {
  buildProjectDetailRows,
  hasProjectDetails,
} from "@/lib/admin/propertyDetails";

function SpecRow({ label, value, hint }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] gap-3 border-b border-white/10 py-3.5 last:border-b-0 sm:gap-6">
      <dt className="text-sm font-normal text-white/55 sm:text-[15px]">{label}</dt>
      <dd className="flex items-start gap-1.5 text-sm font-semibold text-white sm:text-[15px]">
        <span>{value}</span>
        {hint ? (
          <span
            className="mt-0.5 inline-flex shrink-0 text-[#ba8a44]"
            title={hint}
            aria-label={hint}
          >
            <Info className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
        ) : null}
      </dd>
    </div>
  );
}

export default function DetailProjectSpecs({ property }) {
  if (!hasProjectDetails(property)) return null;

  const rows = buildProjectDetailRows(property);
  const midpoint = Math.ceil(rows.length / 2);
  const left = rows.slice(0, midpoint);
  const right = rows.slice(midpoint);

  return (
    <section className="w-full bg-[#111111]">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:py-12">
        <h2 className="detail-section-title m-0 text-[18px] font-medium leading-[27px] text-[#F5F5F5]">
          Details
        </h2>
        <dl className="mt-6 grid gap-x-10 gap-y-0 md:grid-cols-2">
          <div>
            {left.map((row) => (
              <SpecRow key={row.label} {...row} />
            ))}
          </div>
          <div>
            {right.map((row) => (
              <SpecRow key={row.label} {...row} />
            ))}
          </div>
        </dl>
      </div>
    </section>
  );
}
