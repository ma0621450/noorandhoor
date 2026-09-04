import { CheckboxField } from "@/components/admin/ui/Fields";

export default function VisibilityPanel({
  title = "Visibility",
  description = "Control where this item appears on the public site.",
  items = [],
}) {
  return (
    <div className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
      <div>
        <h2 className="text-sm font-semibold text-white">{title}</h2>
        {description ? (
          <p className="mt-1 text-xs leading-5 text-white/45">{description}</p>
        ) : null}
      </div>
      {items.map((item) => (
        <CheckboxField
          key={item.id}
          id={item.id}
          label={item.label}
          description={item.description}
          tooltip={item.tooltip}
          checked={item.checked}
          onChange={item.onChange}
          disabled={item.disabled}
        />
      ))}
    </div>
  );
}
