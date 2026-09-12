import { AdminDashboardLayout } from "@/components/admin/dashboard/AdminDashboardLayout";
import { AdminRouteGuard } from "@/components/admin/dashboard/AdminRouteGuard";
export default function Home() {
  return (
    <AdminRouteGuard>
      <AdminDashboardLayout />
    </AdminRouteGuard>
  );
}
