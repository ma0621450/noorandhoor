"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Plus, Trash2 } from "lucide-react";
import AdminButton from "@/components/admin/ui/AdminButton";
import { cx } from "@/lib/admin/utils";

function createFaq() {
  return { id: crypto.randomUUID(), question: "", answer: "" };
}

export default function BlogFaqFields({ faqs = [], onChange, error }) {
  const rows = Array.isArray(faqs) ? faqs : [];
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (!rows.length) return;
    if (rows.every((item) => item.id)) return;
    onChange(
      rows.map((item) => ({
        id: item.id || crypto.randomUUID(),
        question: item.question || "",
        answer: item.answer || "",
      })),
    );
  }, [rows, onChange]);

  const updateRow = (id, key, value) => {
    onChange(
      rows.map((row) => (row.id === id ? { ...row, [key]: value } : row)),
    );
  };

  const addRow = () => {
    const next = createFaq();
    onChange([next, ...rows]);
    setExpandedId(next.id);
  };

  const removeRow = (id) => {
    onChange(rows.filter((row) => row.id !== id));
    if (expandedId === id) setExpandedId(null);
  };

  const toggleRow = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium uppercase tracking-[1.4px] text-white/60">
            FAQs
          </p>
          <p className="mt-1 text-xs text-white/40">
            Shown on the article page and as FAQPage structured data.
          </p>
        </div>
        <AdminButton size="sm" variant="secondary" onClick={addRow}>
          <Plus className="h-3.5 w-3.5" />
          Add FAQ
        </AdminButton>
      </div>

      {rows.length ? (
        <div className="space-y-3">
          {rows.map((item, index) => {
            const id = item.id || `faq-${index}`;
            const isOpen = expandedId === id;
            const preview = item.question?.trim() || `Untitled`;

            return (
              <div
                key={id}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#171717]"
              >
                <div className="flex items-center gap-2 px-3 py-2.5">
                  <button
                    type="button"
                    onClick={() => toggleRow(id)}
                    className="flex min-w-0 flex-1 items-center gap-2 text-left"
                    aria-expanded={isOpen}
                  >
                    <ChevronDown
                      className={cx(
                        "h-4 w-4 shrink-0 text-white/45 transition-transform",
                        isOpen && "rotate-180 text-[#eec876]",
                      )}
                    />
                    <span className="truncate text-sm text-white/80">
                      <span className="mr-2 text-xs font-medium uppercase tracking-[1.2px] text-white/45">
                        FAQ {index + 1}
                      </span>
                      {preview}
                    </span>
                  </button>
                  <AdminButton
                    size="icon"
                    variant="ghost"
                    aria-label="Remove FAQ"
                    onClick={() => removeRow(id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </AdminButton>
                </div>

                {isOpen ? (
                  <div className="space-y-3 border-t border-white/8 px-3 py-3">
                    <input
                      value={item.question}
                      onChange={(event) =>
                        updateRow(id, "question", event.target.value)
                      }
                      placeholder="Question"
                      className="h-11 w-full rounded-xl border border-white/10 bg-[#141414] px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40"
                    />
                    <textarea
                      value={item.answer}
                      onChange={(event) =>
                        updateRow(id, "answer", event.target.value)
                      }
                      placeholder="Answer"
                      rows={3}
                      className="w-full rounded-xl border border-white/10 bg-[#141414] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40"
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-xs text-white/40">No FAQs yet. Optional for SEO.</p>
      )}

      {error ? <p className="text-xs text-red-300">{error}</p> : null}
    </div>
  );
}
