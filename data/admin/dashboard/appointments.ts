export const appointmentFilters = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Pending",
    value: "PENDING",
  },
  {
    label: "Approved",
    value: "APPROVED",
  },
  {
    label: "Rejected",
    value: "REJECTED",
  },
  {
    label: "Cancelled",
    value: "CANCELLED",
  },
  {
    label: "Completed",
    value: "COMPLETED",
  },
] as const;

export const APPOINTMENTS_PER_PAGE = 10;
