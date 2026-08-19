import { redirect } from "next/navigation";
import AuthGate from "@/components/admin/layout/AuthGate";
import AdminShell from "@/components/admin/layout/AdminShell";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPanelLayout({ children }) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (!data?.claims) {
    redirect("/admin/login");
  }

  return (
    <AuthGate>
      <AdminShell>{children}</AdminShell>
    </AuthGate>
  );
}
