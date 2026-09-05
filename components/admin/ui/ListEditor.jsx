"use client";

import { Plus, Trash2 } from "lucide-react";
import AdminButton from "@/components/admin/ui/AdminButton";

export default function ListEditor({
  label,
  hint,
  items = [],
  onChange,
  addLabel = "Add item",
  placeholder = "Item",
}) {
  const rows = Array.isArray(items) ? items : [];

  const updateRow = (index, value) => {
    const next = [...rows];
    next[index] = value;
    onChange(next);
  };

  const removeRow = (index) => {
    onChange(rows.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          {label ? (
            <p className="text-xs font-medium uppercase tracking-[1.4px] text-white/60">
              {label}
            </p>
          ) : null}
          {hint ? <p className="mt-1 text-xs text-white/40">{hint}</p> : null}
        </div>
        <AdminButton
          size="sm"
          variant="secondary"
          onClick={() => onChange([...rows, ""])}
        >
          <Plus className="h-3.5 w-3.5" />
          {addLabel}
        </AdminButton>
      </div>
      {rows.length ? (
        rows.map((item, index) => (
          <div key={`list-${index}`} className="flex gap-2">
            <input
              value={item}
              onChange={(event) => updateRow(index, event.target.value)}
              placeholder={`${placeholder} ${index + 1}`}
              className="h-11 w-full rounded-xl border border-white/10 bg-[#171717] px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40"
            />
            <AdminButton
              size="icon"
              variant="ghost"
              aria-label="Remove item"
              onClick={() => removeRow(index)}
            >
              <Trash2 className="h-4 w-4" />
            </AdminButton>
          </div>
        ))
      ) : (
        <p className="text-xs text-white/40">None added yet.</p>
      )}
    </div>
  );
}
