"use client";

import { Plus, Trash2 } from "lucide-react";
import AdminButton from "@/components/admin/ui/AdminButton";

export default function BlogKeyPointsFields({ items = [""], onChange }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium uppercase tracking-[1.4px] text-white/60">
          Key points
        </p>
        <AdminButton
          size="sm"
          variant="secondary"
          onClick={() => onChange([...items, ""])}
        >
          <Plus className="h-3.5 w-3.5" />
          Add point
        </AdminButton>
      </div>
      {items.map((item, index) => (
        <div key={`item-${index}`} className="flex gap-2">
          <input
            value={item}
            onChange={(event) => {
              const next = [...items];
              next[index] = event.target.value;
              onChange(next);
            }}
            placeholder={`Point ${index + 1}`}
            className="h-11 w-full rounded-xl border border-white/10 bg-[#171717] px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40"
          />
          <AdminButton
            size="icon"
            variant="ghost"
            aria-label="Remove point"
            onClick={() =>
              onChange(items.filter((_, itemIndex) => itemIndex !== index))
            }
          >
            <Trash2 className="h-4 w-4" />
          </AdminButton>
        </div>
      ))}
    </div>
  );
}
