export interface SignupFormData {
  first_name: string;
  last_name: string;
  email: string;
  contact_number: string;
  address: string;
  date_of_birth: string;
  gender: string;
  password: string;
  confirm_password: string;
}

export type SignupFormErrors = Partial<Record<keyof SignupFormData, string>>;
