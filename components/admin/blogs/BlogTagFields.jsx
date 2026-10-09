"use client";

import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { MAX_BLOG_TAGS, normalizeTags } from "@/lib/blog/tags";

export default function BlogTagFields({
  tags = [],
  suggestions = [],
  onChange,
}) {
  const [draft, setDraft] = useState("");
  const normalized = normalizeTags(tags);
  const atLimit = normalized.length >= MAX_BLOG_TAGS;

  const unusedSuggestions = useMemo(() => {
    const taken = new Set(normalized.map((tag) => tag.toLowerCase()));
    return normalizeTags(suggestions)
      .filter((tag) => !taken.has(tag.toLowerCase()))
      .slice(0, 8);
  }, [normalized, suggestions]);

  const commit = (value) => {
    if (atLimit) return;
    const next = normalizeTags([...normalized, value]);
    if (next.length === normalized.length) {
      setDraft("");
      return;
    }
    onChange(next);
    setDraft("");
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <label
          htmlFor="blog-tags"
          className="text-xs font-medium uppercase tracking-[1.4px] text-white/60"
        >
          Tags
        </label>
        <span className="text-[11px] text-white/35">
          {normalized.length}/{MAX_BLOG_TAGS}
        </span>
      </div>

      {normalized.length ? (
        <ul className="flex flex-wrap gap-2">
          {normalized.map((tag) => (
            <li key={tag.toLowerCase()}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-[#ba8a44]/40 bg-[#ba8a44]/10 py-1 pr-1 pl-3 text-xs text-[#eec876]">
                {tag}
                <button
                  type="button"
                  aria-label={`Remove ${tag}`}
                  onClick={() =>
                    onChange(
                      normalized.filter(
                        (item) => item.toLowerCase() !== tag.toLowerCase(),
                      ),
                    )
                  }
                  className="inline-flex size-5 items-center justify-center rounded-full text-[#eec876]/80 transition hover:bg-white/10 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            </li>
          ))}
        </ul>
      ) : null}

      <input
        id="blog-tags"
        value={draft}
        disabled={atLimit}
        onChange={(event) => setDraft(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === ",") {
            event.preventDefault();
            commit(draft);
            return;
          }
          if (event.key === "Backspace" && !draft && normalized.length) {
            onChange(normalized.slice(0, -1));
          }
        }}
        onBlur={() => {
          if (draft.trim()) commit(draft);
        }}
        placeholder={atLimit ? "Tag limit reached" : "Add a tag and press Enter"}
        className="h-11 w-full rounded-xl border border-white/10 bg-[#171717] px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40 disabled:cursor-not-allowed disabled:opacity-50"
      />
      <p className="text-xs text-white/40">
        Short topics for this article. Press Enter or comma to add one.
      </p>

      {unusedSuggestions.length ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] uppercase tracking-[1.2px] text-white/35">
            Recent
          </span>
          {unusedSuggestions.map((tag) => (
            <button
              key={tag.toLowerCase()}
              type="button"
              disabled={atLimit}
              onClick={() => commit(tag)}
              className="rounded-full border border-white/10 px-2.5 py-1 text-[11px] text-white/70 transition hover:border-[#ba8a44] hover:text-[#eec876] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {tag}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
