export const serviceStatusFilters = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Active",
    value: "active",
  },
  {
    label: "Archived",
    value: "archived",
  },
] as const;

export const serviceSortOptions = [
  {
    label: "Newest",
    value: "newest",
  },
  {
    label: "Oldest",
    value: "oldest",
  },
  {
    label: "Name: A–Z",
    value: "name-asc",
  },
  {
    label: "Name: Z–A",
    value: "name-desc",
  },
  {
    label: "Price: Low to High",
    value: "price-asc",
  },
  {
    label: "Price: High to Low",
    value: "price-desc",
  },
] as const;

export interface DummyService {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  status: "active" | "archived";
  createdAt: string;
}

export const dummyServices: DummyService[] = [
  {
    id: 1,
    title: "Dental Cleaning",
    description:
      "Professional cleaning to remove plaque, tartar, and surface stains for a healthier smile.",
    price: 800,
    image: "/service1.png",
    status: "active",
    createdAt: "2026-09-10",
  },
  {
    id: 2,
    title: "Dental Filling",
    description:
      "Restorative treatment to repair teeth affected by cavities and prevent further damage.",
    price: 1200,
    image: "/service2.png",
    status: "active",
    createdAt: "2026-09-08",
  },
  {
    id: 3,
    title: "Tooth Extraction",
    description:
      "Safe and carefully performed tooth extraction with appropriate aftercare guidance.",
    price: 1000,
    image: "/service3.png",
    status: "active",
    createdAt: "2026-09-05",
  },
  {
    id: 4,
    title: "Orthodontic Treatment",
    description:
      "Personalized orthodontic care designed to improve tooth alignment, function, and smile aesthetics.",
    price: 35000,
    image: "/service4.png",
    status: "active",
    createdAt: "2026-08-28",
  },
  {
    id: 5,
    title: "Dental Crown",
    description:
      "Custom dental crown treatment to restore the strength, shape, and appearance of damaged teeth.",
    price: 8500,
    image: "/service5.png",
    status: "active",
    createdAt: "2026-08-20",
  },
  {
    id: 6,
    title: "Dental Implant",
    description:
      "A long-term tooth replacement solution designed to restore function and natural appearance.",
    price: 45000,
    image: "/service6.png",
    status: "active",
    createdAt: "2026-08-15",
  },
  {
    id: 7,
    title: "Teeth Whitening",
    description:
      "Professional whitening treatment to brighten teeth and improve the appearance of your smile.",
    price: 5000,
    image: "/service7.png",
    status: "archived",
    createdAt: "2026-07-30",
  },
];
