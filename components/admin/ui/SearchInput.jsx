import { Search } from "lucide-react";

export default function SearchInput({
  value,
  onChange,
  placeholder = "Search",
  id = "admin-search",
}) {
  return (
    <label className="relative block min-w-0 flex-1" htmlFor={id}>
      <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/40" />
      <input
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-white/10 bg-[#171717] py-2 pr-3 pl-10 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40"
      />
    </label>
  );
}
