import {
  CalendarDays,
  CircleDollarSign,
  LayoutDashboard,
  Settings,
  Stethoscope,
  TicketPercent,
  Users,
} from "lucide-react";

export const adminNavigation = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Users",
    href: "/admin/users",
    icon: Users,
  },
  {
    label: "Appointments",
    href: "/admin/appointments",
    icon: CalendarDays,
  },
  {
    label: "Services",
    href: "/admin/services",
    icon: Stethoscope,
  },
  {
    label: "Coupons",
    href: "/admin/coupons",
    icon: TicketPercent,
  },
  {
    label: "Points",
    href: "/admin/points",
    icon: CircleDollarSign,
  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];
