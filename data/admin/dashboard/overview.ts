import { CalendarCheck, CircleDollarSign, Users } from "lucide-react";

export const adminOverviewStats = [
  {
    title: "Total Patients",
    value: "1,248",
    change: "+12.5%",
    changeLabel: "from last month",
    icon: Users,
  },
  {
    title: "Appointments",
    value: "86",
    change: "+8.2%",
    changeLabel: "from last month",
    icon: CalendarCheck,
  },
  {
    title: "Upcoming Appointments",
    value: "32",
    change: "This month",
    changeLabel: "scheduled appointments",
    icon: CalendarCheck,
  },
  {
    title: "Monthly Revenue",
    value: "₱128,450",
    change: "+14.8%",
    changeLabel: "from last month",
    icon: CircleDollarSign,
  },
];

export const adminWelcomeContent = {
  eyebrow: "Overview",
  title: "Good morning, Admin",
  description: "Here's what's happening with RAFE Dental Clinic today.",
};
