export interface AdminAppointment {
  id: number;
  user_id: number;
  service_id: number;
  first_name: string;
  last_name: string;
  age: number;
  contact_number: string;
  service_name: string;
  appointment_date: string;
  appointment_time: string;
  doctor_notes: string;
  status: string;
  patient_coupon_id: number | null;
  coupon_id: number | null;
  original_amount: string;
  discount_amount: string;
  final_amount: string;
  points_earned: number;
  created_at: string;
  updated_at: string;
}

export interface AdminAppointmentsPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface AdminAppointmentsResponse {
  message: string;
  appointments: AdminAppointment[];
  pagination: AdminAppointmentsPagination;
}

export interface AdminAppointmentActionData {
  id: number;
  status: string;
}

export interface AdminAppointmentActionResponse {
  message: string;
  data: AdminAppointmentActionData;
}

export interface AdminAppointmentDetails {
  id: number;
  user_id: number;
  first_name: string;
  last_name: string;
  age: number;
  contact_number: string;
  service_id: number;
  service: string;
  description: string;
  price: string;
  points: number;
  duration_minutes: number;
  appointment_date: string;
  appointment_time: string;
  doctor_notes: string;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface AdminAppointmentDetailsResponse {
  message: string;
  data: AdminAppointmentDetails;
}
