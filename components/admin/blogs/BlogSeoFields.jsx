"use client";

import { TextArea, TextField } from "@/components/admin/ui/Fields";

export default function BlogSeoFields({ form, errors, setField }) {
  const metaTitleLen = form.metaTitle.trim().length;
  const metaDescLen = form.metaDescription.trim().length;

  return (
    <div className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
      <div>
        <p className="text-xs font-medium uppercase tracking-[1.4px] text-white/60">
          SEO
        </p>
        <p className="mt-1 text-xs text-white/40">
          Used for page title, meta tags, Open Graph, and search snippets.
        </p>
      </div>

      <TextField
        id="metaTitle"
        label="Meta title"
        value={form.metaTitle}
        onChange={(event) => setField("metaTitle", event.target.value)}
        error={errors.metaTitle}
        placeholder="Leave blank to use the article title"
        hint={`${metaTitleLen}/60 characters recommended`}
        tooltip="Appears in the browser tab and Google results. Aim for about 50–60 characters."
      />
      <TextArea
        id="metaDescription"
        label="Meta description"
        rows={3}
        value={form.metaDescription}
        onChange={(event) => setField("metaDescription", event.target.value)}
        error={errors.metaDescription}
        placeholder="Leave blank to use the excerpt"
        hint={`${metaDescLen}/160 characters recommended`}
        tooltip="Short summary shown under the title in search results. Aim for about 140–160 characters."
      />
      <TextField
        id="focusKeyword"
        label="Focus keyword"
        value={form.focusKeyword}
        onChange={(event) => setField("focusKeyword", event.target.value)}
        error={errors.focusKeyword}
        placeholder="e.g. Dubai off-plan villas"
        tooltip="Primary keyword for this article. Added to meta keywords and structured data."
      />
    </div>
  );
}
