import { API_URL } from "@/lib/api";
import type { LoginFormData } from "@/types/auth/login";
import type { SignupFormData } from "@/types/auth/signup";

export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  contact_number: string;
  date_of_birth: string;
  address: string;
  gender: string;
}

const TOKEN_KEY = "rafe_auth_token";

export function setAuthToken(token: string) {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(TOKEN_KEY, token);
  window.dispatchEvent(new Event("rafe-auth-changed"));
}

export function getAuthToken() {
  if (typeof window === "undefined") {
    return null;
  }

  return localStorage.getItem(TOKEN_KEY);
}

export function removeAuthToken() {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
  window.dispatchEvent(new Event("rafe-auth-changed"));
}

export function notifySessionExpired() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event("rafe-session-expired"));
}

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

export async function loginUser(formData: LoginFormData) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to log in. Please check your credentials.",
    );
  }

  return data;
}
