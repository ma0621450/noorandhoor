import Link from "next/link";

export default function NavDropdownMenu({ links, onNavigate }) {
  return (
    <div className="min-w-0 w-full rounded-xl bg-[#1a1a1a] p-2 shadow-[0_12px_40px_rgba(0,0,0,0.45)] sm:min-w-[240px] sm:w-auto">
      <ul className="flex flex-col gap-0.5">
        {links.map(({ label, href = "#", Icon }) => (
          <li key={label}>
            <Link
              href={href}
              onClick={onNavigate}
              className="group/item flex cursor-pointer items-center gap-4 rounded-lg px-3 py-2.5 text-sm font-medium !text-white transition-colors duration-200 hover:bg-[#7b613b]"
            >
              {Icon ? (
                <span className="shrink-0 text-[#ba8a44] transition-colors group-hover/item:text-[#eec876]">
                  <Icon className="h-6 w-6" />
                </span>
              ) : null}
              <span className="min-w-0 whitespace-normal break-words">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
