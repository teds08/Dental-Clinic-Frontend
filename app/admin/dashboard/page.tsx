import { AdminDashboardLayout } from "@/components/admin/dashboard/AdminDashboardLayout";
import { AdminOverview } from "@/components/admin/dashboard/AdminOverview";
import { AppointmentStatusOverview } from "@/components/admin/dashboard/AppointmentStatusOverview";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";
import { RevenueOverview } from "@/components/admin/dashboard/RevenueOverview";
import { UpcomingAppointments } from "@/components/admin/appointments/UpcomingAppointments";

export default function AdminDashboardPage() {
  return (
    <AdminDashboardLayout>
      <AdminOverview />

      <br />

      <AppointmentStatusOverview />

      <br />

      <div className="grid gap-6 xl:grid-cols-[1.6fr_1fr]">
        <RevenueOverview />
        <QuickActions />
      </div>

      <br />

      <UpcomingAppointments />
    </AdminDashboardLayout>
  );
}
