import { UsersPage } from "@/components/admin/users/UsersPage";
import { AdminDashboardLayout } from "@/components/admin/dashboard/AdminDashboardLayout";

export default function AdminUsersPage() {
  return (
    <AdminDashboardLayout>
      <UsersPage />
    </AdminDashboardLayout>
  );
}
