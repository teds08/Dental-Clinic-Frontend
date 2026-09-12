export interface AdminDashboardAppointment {
  id: number;
  first_name: string;
  last_name: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  status: string;
}

export interface AdminDashboardData {
  total_patients: number;
  appointments_last_month: number;
  upcoming_appointments: AdminDashboardAppointment[];
  monthly_revenue: number;
  revenue_history: AdminDashboardRevenueHistory[];
  appointment_status: AdminDashboardAppointmentStatus[];
}

export interface AdminDashboardResponse {
  success: boolean;
  message: string;
  data: AdminDashboardData;
}

export interface AdminDashboardRevenueHistory {
  month: string;
  revenue: number;
}

export interface AdminDashboardAppointmentStatus {
  status: string;
  count: number;
}
