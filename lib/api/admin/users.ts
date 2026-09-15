import { apiFetch } from "@/lib/api";
import type {
  AdminUser,
  ArchivedUser,
  CreateAdminUserPayload,
  CreateAdminUserResponse,
  CreatedAdminUser,
  GetAllUsersResponse,
  GetArchivedUsersResponse,
  UpdateAdminUserPayload,
  UpdatedAdminUser,
  UpdateAdminUserResponse,
} from "@/types/admin/users";

export async function getAllActiveUsers(): Promise<AdminUser[]> {
  const response = await apiFetch("/api/active/users");

  const result = (await response.json()) as GetAllUsersResponse;

  if (!response.ok) {
    throw new Error(result.message ?? "Failed to fetch users.");
  }

  return result.data;
}

export async function createAdminUser(
  payload: CreateAdminUserPayload,
): Promise<CreatedAdminUser> {
  const response = await apiFetch("/api/admin/create", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as CreateAdminUserResponse;

  if (!response.ok) {
    throw new Error(result.message ?? "Failed to create user.");
  }

  return result.data;
}

export async function archiveUser(userId: number): Promise<void> {
  const response = await apiFetch(`/api/soft/delete/${userId}`, {
    method: "PATCH",
  });

  const result = (await response.json()) as {
    message: string;
  };

  if (!response.ok) {
    throw new Error(result.message ?? "Failed to archive user.");
  }
}

export async function deleteUser(userId: number): Promise<void> {
  const response = await apiFetch(`/api/hard/delete/${userId}`, {
    method: "DELETE",
  });

  const result = (await response.json()) as {
    message: string;
  };

  if (!response.ok) {
    throw new Error(result.message ?? "Failed to delete user.");
  }
}

export async function getArchivedUsers(): Promise<ArchivedUser[]> {
  const response = await apiFetch("/api/archive/users");

  const result = (await response.json()) as GetArchivedUsersResponse;

  if (!response.ok) {
    throw new Error(result.message ?? "Failed to fetch archived users.");
  }

  return result.users;
}

export async function restoreUser(userId: number): Promise<void> {
  const response = await apiFetch(`/api/restore/user/${userId}`, {
    method: "PATCH",
  });

  const result = (await response.json()) as {
    message: string;
  };

  if (!response.ok) {
    throw new Error(result.message ?? "Failed to restore user.");
  }
}

export async function updateAdminUser(
  userId: number,
  payload: UpdateAdminUserPayload,
): Promise<UpdatedAdminUser> {
  const response = await apiFetch(`/api/admin/update/${userId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

  const result = (await response.json()) as UpdateAdminUserResponse;

  if (!response.ok) {
    throw new Error(result.message ?? "Failed to update user.");
  }

  return result.data;
}
