export const userRoleFilters = [
  {
    value: "all",
    label: "All Roles",
  },
  {
    value: "admin",
    label: "Admin",
  },
  {
    value: "user",
    label: "User",
  },
] as const;

export const usersTableColumns = [
  "User",
  "Contact",
  "Role",
  "Registered",
  "Actions",
] as const;

export const USERS_PER_PAGE = 8;
