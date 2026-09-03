export const LISTING_PAGE_SIZE = 9;

export function pageFromSearchParams(searchParams) {
  const raw = Number.parseInt(searchParams?.get?.("page") || "1", 10);
  return Number.isFinite(raw) && raw > 0 ? raw : 1;
}

export function listingPageHref(path, pageNumber, searchParams, hash) {
  const params = new URLSearchParams(searchParams?.toString?.() || "");
  if (pageNumber <= 1) params.delete("page");
  else params.set("page", String(pageNumber));
  const query = params.toString();
  const href = query ? `${path}?${query}` : path;
  return hash ? `${href}#${hash}` : href;
}

export function paginateItems(items, page, pageSize) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize) || 1);
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const start = (currentPage - 1) * pageSize;
  return {
    currentPage,
    totalPages,
    total,
    pageItems: items.slice(start, start + pageSize),
  };
}
