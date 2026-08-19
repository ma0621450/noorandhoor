export function isAdminPath(pathname) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

export function isAdminLoginPath(pathname) {
  return pathname === "/admin/login";
}

export function safeAdminNext(path) {
  if (
    typeof path !== "string" ||
    !path.startsWith("/admin") ||
    path.startsWith("//") ||
    path.includes("\\")
  ) {
    return "/admin";
  }

  return path;
}
