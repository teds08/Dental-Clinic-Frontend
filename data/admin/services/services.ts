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
  { label: "30 minutes", value: 30 },
  { label: "45 minutes", value: 45 },
  { label: "60 minutes", value: 60 },
  { label: "90 minutes", value: 90 },
  { label: "120 minutes", value: 120 },
];

export interface ServiceIconOption {
  value: ServiceIcon;
  label: string;
  src: string;
}

export const serviceIcons: ServiceIconOption[] = [
  {
    value: "braces",
    label: "Braces",
    src: "/icons/services/braces.png",
  },
  {
    value: "dental-care",
    label: "Dental Care",
    src: "/icons/services/dental-care.png",
  },
  {
    value: "dental-crown",
    label: "Dental Crown",
    src: "/icons/services/dental-crown.png",
  },
  {
    value: "dental-veneer",
    label: "Dental Veneer",
    src: "/icons/services/dental-veneer.png",
  },
  {
    value: "extraction",
    label: "Extraction",
    src: "/icons/services/extraction.png",
  },
  {
    value: "implant",
    label: "Implant",
    src: "/icons/services/implant.png",
  },
  {
    value: "root-canal",
    label: "Root Canal",
    src: "/icons/services/root-canal.png",
  },
  {
    value: "teeth-cleaning",
    label: "Teeth Cleaning",
    src: "/icons/services/teeth-cleaning.png",
  },
  {
    value: "toothache",
    label: "Toothache",
    src: "/icons/services/toothache.png",
  },
  {
    value: "wisdom",
    label: "Wisdom Tooth",
    src: "/icons/services/wisdom.png",
  },
];
