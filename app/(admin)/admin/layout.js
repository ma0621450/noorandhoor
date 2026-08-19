import { AdminAuthProvider } from "@/components/admin/providers/AdminAuthProvider";
import { ToastProvider } from "@/components/admin/providers/ToastProvider";

export const metadata = {
  title: {
    default: "Admin",
    template: "%s | Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({ children }) {
  return (
    <AdminAuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AdminAuthProvider>
  );
}
