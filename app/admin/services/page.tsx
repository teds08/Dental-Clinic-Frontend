import { AdminDashboardLayout } from "@/components/admin/dashboard/AdminDashboardLayout";
import { ServicesPage } from "@/components/admin/services/ServicesPage";

export default function AdminServicesPage() {
  return (
    <AdminDashboardLayout>
      <ServicesPage />
    </AdminDashboardLayout>
  );
}
