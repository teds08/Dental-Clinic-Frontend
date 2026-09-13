import {
  Circle,
  HeartPulse,
  ScanLine,
  ShieldCheck,
  Smile,
  Sparkles,
  Stethoscope,
  Syringe,
  Toothbrush,
  WandSparkles,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";
import type { ServiceCategory, ServiceIcon } from "@/types/admin/services";

export const serviceStatusFilters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Archived", value: "archived" },
] as const;

export const serviceSortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
  { label: "Name: A–Z", value: "name-asc" },
  { label: "Name: Z–A", value: "name-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
] as const;

export const serviceCategories: ServiceCategory[] = [
  "Preventive",
  "Restorative",
  "Cosmetic",
  "Surgical",
  "Orthodontics",
  "Prosthetic",
];

export interface ServiceDuration {
  label: string;
  value: number;
}

export const serviceDurations: ServiceDuration[] = [
  {
    label: "30 minutes",
    value: 30,
  },
  {
    label: "45 minutes",
    value: 45,
  },
  {
    label: "60 minutes",
    value: 60,
  },
  {
    label: "90 minutes",
    value: 90,
  },
  {
    label: "120 minutes",
    value: 120,
  },
];

export interface ServiceIconOption {
  value: ServiceIcon;
  label: string;
  icon: LucideIcon;
}

export const serviceIcons: ServiceIconOption[] = [
  {
    value: "toothbrush",
    label: "Toothbrush",
    icon: Toothbrush,
  },
  {
    value: "stethoscope",
    label: "Stethoscope",
    icon: Stethoscope,
  },
  {
    value: "sparkles",
    label: "Sparkles",
    icon: Sparkles,
  },
  {
    value: "heart-pulse",
    label: "Heart",
    icon: HeartPulse,
  },
  {
    value: "shield-check",
    label: "Shield",
    icon: ShieldCheck,
  },
  {
    value: "syringe",
    label: "Syringe",
    icon: Syringe,
  },
  {
    value: "scan",
    label: "Scan",
    icon: ScanLine,
  },
  {
    value: "wand-sparkles",
    label: "Wand",
    icon: WandSparkles,
  },
  {
    value: "smile",
    label: "Smile",
    icon: Smile,
  },
  {
    value: "circle",
    label: "General",
    icon: Circle,
  },
];

import type { AdminService } from "@/types/admin/services";

export const dummyServices: AdminService[] = [
  {
    id: 1,
    image: "/service1.png",
    image_public_id: "service1",
    title: "Dental Cleaning",
    description:
      "Professional dental cleaning to remove plaque, tartar, and surface stains while keeping your teeth and gums healthy.",
    price: "1500",
    points: 15,
    duration_minutes: 60,
    icon: "toothbrush",
    category: "Preventive",
    status: "active",
    created_at: "2026-09-10T08:00:00.000Z",
    updated_at: "2026-09-10T08:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 2,
    image: "/service2.png",
    image_public_id: "service2",
    title: "Tooth Extraction",
    description:
      "Safe and professional tooth extraction performed with proper dental care and attention to patient comfort.",
    price: "2500",
    points: 25,
    duration_minutes: 45,
    icon: "stethoscope",
    category: "Surgical",
    status: "active",
    created_at: "2026-09-09T08:00:00.000Z",
    updated_at: "2026-09-09T08:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 3,
    image: "/service3.png",
    image_public_id: "service3",
    title: "Teeth Whitening",
    description:
      "Professional teeth whitening treatment designed to brighten your smile and reduce common tooth discoloration.",
    price: "5000",
    points: 50,
    duration_minutes: 90,
    icon: "sparkles",
    category: "Cosmetic",
    status: "active",
    created_at: "2026-09-08T08:00:00.000Z",
    updated_at: "2026-09-08T08:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 4,
    image: "/service4.png",
    image_public_id: "service4",
    title: "Dental Filling",
    description:
      "Tooth-colored dental filling treatment used to restore teeth affected by decay or minor damage.",
    price: "2000",
    points: 20,
    duration_minutes: 45,
    icon: "heart-pulse",
    category: "Restorative",
    status: "active",
    created_at: "2026-09-07T08:00:00.000Z",
    updated_at: "2026-09-07T08:00:00.000Z",
    deleted_at: null,
  },
  {
    id: 5,
    image: "/service5.png",
    image_public_id: "service5",
    title: "Dental Implant",
    description:
      "A dental implant treatment designed to replace missing teeth with a stable and natural-looking restoration.",
    price: "35000",
    points: 350,
    duration_minutes: 120,
    icon: "shield-check",
    category: "Prosthetic",
    status: "active",
    created_at: "2026-09-06T08:00:00.000Z",
    updated_at: "2026-09-06T08:00:00.000Z",
    deleted_at: null,
  },
];
