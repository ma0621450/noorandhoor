"use client";

import { Plus } from "lucide-react";
import AdminButton from "@/components/admin/ui/AdminButton";
import UnitTypeEditor from "@/components/admin/properties/UnitTypeEditor";
import {
  MAX_UNIT_GROUPS,
  UNIT_GROUP_PRESETS,
} from "@/lib/admin/propertyUnits";

function newClientKey() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function emptyGroup(preset = {}) {
  return {
    clientKey: newClientKey(),
    name: preset.name || "",
    bedrooms: preset.bedrooms ?? "",
    accentColor: preset.accentColor || "#22c55e",
    parkingSpaces: preset.parkingSpaces ?? 0,
    inventoryCount: preset.inventoryCount ?? 0,
    units: [],
  };
}

function emptyUnit() {
  return {
    clientKey: newClientKey(),
    unitNumber: "",
    unitKind: "Apartments",
    floor: "",
    areaSqft: "",
    price: "",
    planImage: "",
  };
}

export default function UnitsFields({ value = [], onChange }) {
  const groups = Array.isArray(value) ? value : [];

  const updateGroup = (index, patch) => {
    onChange(
      groups.map((group, i) => (i === index ? { ...group, ...patch } : group)),
    );
  };

  const removeGroup = (index) => {
    onChange(groups.filter((_, i) => i !== index));
  };

  const addGroup = (preset) => {
    if (groups.length >= MAX_UNIT_GROUPS) return;
    const name = preset?.name || "";
    if (
      name &&
      groups.some(
        (group) => group.name.trim().toLowerCase() === name.toLowerCase(),
      )
    ) {
      return;
    }
    onChange([...groups, emptyGroup(preset)]);
  };

  const addUnit = (groupIndex) => {
    const group = groups[groupIndex];
    if (!group) return;
    updateGroup(groupIndex, {
      units: [...(group.units || []), emptyUnit()],
    });
  };

  return (
    <section className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">
            Units & Availability
          </h2>
          <p className="mt-1 text-xs text-white/45">
            Unit types drive inventory and parking cards. Add layout rows with
            floor plans for the accordion table.
          </p>
        </div>
        <AdminButton
          type="button"
          variant="secondary"
          onClick={() => addGroup()}
          disabled={groups.length >= MAX_UNIT_GROUPS}
          className="gap-1.5 px-3 py-2 text-xs"
        >
          <Plus className="h-3.5 w-3.5" />
          Add unit type
        </AdminButton>
      </div>

      {groups.length ? (
        <div className="space-y-4">
          {groups.map((group, index) => (
            <UnitTypeEditor
              key={group.clientKey || group.id || `group-${index}`}
              group={group}
              onChange={(patch) => updateGroup(index, patch)}
              onRemove={() => removeGroup(index)}
              onAddUnit={() => addUnit(index)}
            />
          ))}
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-white/10 px-4 py-8 text-center text-sm text-white/40">
          No unit types yet. Add one or pick a preset below.
        </p>
      )}

      <div>
        <p className="mb-2 text-xs font-medium uppercase tracking-[1.4px] text-white/60">
          Quick add
        </p>
        <div className="flex flex-wrap gap-2">
          {UNIT_GROUP_PRESETS.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => addGroup(preset)}
              className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-[#ba8a44] hover:text-[#eec876]"
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
