export type ServiceCategory =
  | "Preventive"
  | "Restorative"
  | "Cosmetic"
  | "Surgical"
  | "Orthodontics"
  | "Prosthetic";

export type ServiceIcon =
  | "toothbrush"
  | "stethoscope"
  | "sparkles"
  | "heart-pulse"
  | "shield-check"
  | "syringe"
  | "scan"
  | "wand-sparkles"
  | "smile"
  | "circle";

export type ServiceStatus = "active" | "archived";

export interface AdminService {
  id: number;
  image: string;
  image_public_id: string;
  title: string;
  description: string;
  price: string;
  points: number;
  duration_minutes: number;
  icon: ServiceIcon;
  category: ServiceCategory;
  status: ServiceStatus;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

export interface CreateServiceRequest {
  image: string;
  image_public_id: string;
  title: string;
  description: string;
  price: string;
  points: number;
  duration_minutes: number;
  icon: ServiceIcon;
  category: ServiceCategory;
}

export interface CreateServiceResponse {
  message: string;
  service: AdminService;
}
