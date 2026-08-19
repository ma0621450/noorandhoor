import { Suspense } from "react";
import LoginForm from "@/components/admin/auth/LoginForm";
import AdminSplash from "@/components/admin/ui/AdminSplash";

export const metadata = {
  title: "Sign in",
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<AdminSplash label="Loading sign in" />}>
      <LoginForm />
    </Suspense>
  );
}
