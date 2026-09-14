export function getInitials(firstName: string, lastName: string) {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}

export function formatAppointmentDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function formatStatus(status: string) {
  return status
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getStatusClasses(status: string) {
  switch (status) {
    case "APPROVED":
      return "bg-emerald-50 text-emerald-600";

    case "PENDING":
      return "bg-amber-50 text-amber-600";

    case "COMPLETED":
      return "bg-blue-50 text-blue-600";

    case "REJECTED":
      return "bg-red-50 text-red-600";

    case "CANCELLED":
      return "bg-gray-100 text-gray-500";

    default:
      return "bg-gray-100 text-gray-500";
  }
}

export function formatAppointmentTime(time: string): string {
  const [hoursString, minutesString] = time.split(":");

  const hours = Number(hoursString);
  const minutes = Number(minutesString);

  if (
    Number.isNaN(hours) ||
    Number.isNaN(minutes) ||
    hours < 0 ||
    hours > 23 ||
    minutes < 0 ||
    minutes > 59
  ) {
    return time;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const formattedHours = hours % 12 || 12;

  return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
}
