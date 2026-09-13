import { AppointmentsPage } from "@/components/admin/appointments/AppointmentsPage";
import { AdminDashboardLayout } from "@/components/admin/dashboard/AdminDashboardLayout";

export default function AdminAppointmentsPage() {
  return (
    <AdminDashboardLayout>
      <AppointmentsPage />
    </AdminDashboardLayout>
  );
}
