import Link from "next/link";
import { tagHref } from "@/lib/blog/tags";

const CHIP =
  "rounded-full border border-[#ba8a44]/35 bg-[#ba8a44]/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.8px] text-[#eec876]";

export default function BlogTags({ tags = [], linked = false, limit }) {
  const visible = (limit ? tags.slice(0, limit) : tags).filter(Boolean);
  if (!visible.length) return null;

  return (
    <ul className="flex flex-wrap gap-2">
      {visible.map((tag) => (
        <li key={tag.toLowerCase()}>
          {linked ? (
            <Link
              href={tagHref(tag)}
              className={`${CHIP} transition hover:border-[#eec876] hover:text-white`}
            >
              {tag}
            </Link>
          ) : (
            <span className={CHIP}>{tag}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
