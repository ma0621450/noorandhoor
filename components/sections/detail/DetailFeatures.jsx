"use client";

import { Check } from "lucide-react";

const COLUMNS = [
  ["Air Conditioning", "Sauna", "Window Coverings"],
  ["Laundry", "Swimming Pool"],
  ["Lawn", "WiFi"],
];

function toColumns(features) {
  if (!features?.length) return COLUMNS;
  const columns = [[], [], []];
  features.forEach((feature, index) => {
    columns[index % 3].push(feature);
  });
  return columns.filter((column) => column.length);
}

export default function DetailFeatures({ features }) {
  const columns = toColumns(features);

  return (
    <section className="w-full bg-[#111111] pb-10 sm:pb-14">
      <div className="mx-auto w-full max-w-[1280px] px-4 pt-14 sm:pt-16">
        <div className="rounded-[10px] border border-[#F5F5F5]/80 p-4 sm:p-6 lg:p-8">
          <h2 className="detail-section-title m-0 text-[20px] font-medium leading-[30px] text-[#F5F5F5]">
            Features
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map((column, columnIndex) => (
              <ul key={`feature-col-${columnIndex}`} className="flex flex-col gap-4">
                {column.map((feature, featureIndex) => (
                  <li
                    key={`feature-${columnIndex}-${featureIndex}-${feature}`}
                    className="flex items-center gap-3 font-[family-name:var(--font-body)] text-[16px] font-normal leading-6 text-[#F5F5F5]"
                  >
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#c5a059]">
                      <Check
                        className="h-3 w-3 text-[#c5a059]"
                        strokeWidth={2.5}
                      />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
