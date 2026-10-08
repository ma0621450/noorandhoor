import { sanitizeBlogHtml } from "@/lib/blog/sanitizeHtml";

export function isHtmlContent(content) {
  return /<\/?[a-z][\s\S]*>/i.test(String(content || ""));
}

export function isContentEmpty(content) {
  const text = String(content || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  return !text;
}

export function paragraphsFromContent(content) {
  return String(content || "")
    .split(/\n\s*\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

export function toRenderableContent(content) {
  const raw = String(content || "").trim();
  if (!raw) {
    return { kind: "html", html: "" };
  }
  if (isHtmlContent(raw)) {
    return { kind: "html", html: sanitizeBlogHtml(raw) };
  }
  return { kind: "paragraphs", paragraphs: paragraphsFromContent(raw) };
}
