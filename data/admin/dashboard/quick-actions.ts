import { CalendarPlus, Plus, TicketPercent, UserPlus } from "lucide-react";

export const adminQuickActions = [
  {
    title: "Add Patient",
    description: "Create a new patient account",
    href: "/admin/users",
    icon: UserPlus,
  },
  {
    title: "View Appointment",
    description: "Show patient appointment",
    href: "/admin/appointments",
    icon: CalendarPlus,
  },
  {
    title: "Add Service",
    description: "Create a new dental service",
    href: "/admin/services",
    icon: Plus,
  },
  {
    title: "Create Coupon",
    description: "Add a promotional coupon",
    href: "/admin/coupons",
    icon: TicketPercent,
  },
];
