import { API_URL } from "@/lib/api";
import type { SignupFormData } from "@/types/auth";

export async function createUser(formData: SignupFormData) {
  const payload = {
    first_name: formData.first_name,
    last_name: formData.last_name,
    email: formData.email,
    password: formData.password,
    contact_number: formData.contact_number,
    date_of_birth: formData.date_of_birth.replaceAll("-", "/"),
    address: formData.address,
    gender: formData.gender,
  };

  const response = await fetch(`${API_URL}/api/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to create your account.");
  }

  return data;
}
