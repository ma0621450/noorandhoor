import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";
import { getSupabaseEnv } from "@/lib/supabase/env";
import { isAdminLoginPath, isAdminPath, safeAdminNext } from "@/lib/admin/paths";

function copyCookies(from, to) {
  from.cookies.getAll().forEach((cookie) => {
    to.cookies.set(cookie);
  });
  return to;
}

export async function updateSession(request) {
  let supabaseResponse = NextResponse.next({ request });
  const { url, key } = getSupabaseEnv();

  const supabase = createServerClient(url, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet, headers = {}) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
        Object.entries(headers).forEach(([header, value]) => {
          supabaseResponse.headers.set(header, value);
        });
      },
    },
  });

  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = Boolean(data?.claims);
  const pathname = request.nextUrl.pathname;

  if (isAdminPath(pathname) && !isAdminLoginPath(pathname) && !isAuthenticated) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    loginUrl.searchParams.set("next", pathname);
    return copyCookies(supabaseResponse, NextResponse.redirect(loginUrl));
  }

  if (isAdminLoginPath(pathname) && isAuthenticated) {
    const destination = request.nextUrl.clone();
    destination.pathname = safeAdminNext(request.nextUrl.searchParams.get("next"));
    destination.search = "";
    return copyCookies(supabaseResponse, NextResponse.redirect(destination));
  }

  return supabaseResponse;
}
