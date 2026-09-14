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
