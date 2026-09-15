export type UserRole = "admin" | "user";

export interface AdminUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  date_of_birth: string;
  address: string;
  gender: string;
  emergency_contact: string | null;
  emergency_contact_number: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface GetAllUsersResponse {
  message: string;
  data: AdminUser[];
}

export interface CreateAdminUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_number: string;
  role_id: number;
  date_of_birth: string;
  address: string;
  gender: string;
  emergency_contact?: string;
  emergency_contact_number?: string;
}

export interface CreatedAdminUser {
  id: number;
  role_id: number;
  created_at: string;
}

export interface CreateAdminUserResponse {
  message: string;
  data: CreatedAdminUser;
}

export interface UserFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_number: string;
  role_id: number;
  date_of_birth: string;
  address: string;
  gender: string;
  emergency_contact: string;
  emergency_contact_number: string;
}

export interface GetArchivedUsersResponse {
  message: string;
  users: ArchivedUser[];
}

export interface UpdateAdminUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  contact_number: string;
  role_id: number;
  date_of_birth: string;
  address: string;
  gender: string;
  emergency_contact?: string;
  emergency_contact_number?: string;
}

export interface UpdatedAdminUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  role_id: number;
  date_of_birth: string;
  address: string;
  gender: string;
  emergency_contact: string | null;
  emergency_contact_number: string | null;
  created_at: string;
  updated_at: string;
}

export interface UpdateAdminUserResponse {
  message: string;
  data: UpdatedAdminUser;
}

export interface ArchivedUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  role_id: number;
  role_name: UserRole;
  created_at: string;
  updated_at: string;
  deleted_at: string;
}
