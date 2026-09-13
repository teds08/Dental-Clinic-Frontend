export interface AdminProfile {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_number: string;
  date_of_birth: string;
  address: string;
  gender: string;
  emergency_contact: string | null;
  emergency_contact_number: string | null;
  role: string;
  created_at: string;
  updated_at: string;
}

export interface AdminProfileResponse {
  message: string;
  data: AdminProfile;
}
