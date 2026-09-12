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
