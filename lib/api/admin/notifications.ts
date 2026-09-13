import { apiFetch } from "@/lib/api";

import type {
  AdminNotificationsResponse,
  NotificationActionResponse,
  UnreadNotificationCountResponse,
} from "@/types/admin/notifications";

/**
 * Get the number of unread notifications
 * for the currently authenticated user.
 */
export async function getUnreadNotificationCount(): Promise<UnreadNotificationCountResponse> {
  const response = await apiFetch("/api/unread-count", {
    method: "GET",
  });

  const data: UnreadNotificationCountResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to load unread notification count.",
    );
  }

  return data;
}

/**
 * Get notifications for the currently authenticated user.
 */
export async function getAdminNotifications(): Promise<AdminNotificationsResponse> {
  const response = await apiFetch("/api/get-notif", {
    method: "GET",
  });

  const data: AdminNotificationsResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to load notifications.");
  }

  return data;
}

/**
 * Mark a single notification as read.
 */
export async function markNotificationAsRead(
  notificationId: number,
): Promise<NotificationActionResponse> {
  const response = await apiFetch(`/api/read/${notificationId}`, {
    method: "PATCH",
  });

  const data: NotificationActionResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to mark notification as read.");
  }

  return data;
}

/**
 * Mark all notifications as read.
 */
export async function markAllNotificationsAsRead(): Promise<NotificationActionResponse> {
  const response = await apiFetch("/api/read-all", {
    method: "PATCH",
  });

  const data: NotificationActionResponse = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Unable to mark all notifications as read.",
    );
  }

  return data;
}

/**
 * Delete a notification.
 */
export async function deleteNotification(
  notificationId: number,
): Promise<NotificationActionResponse> {
  const response = await apiFetch(`/api/delete/notify/${notificationId}`, {
    method: "DELETE",
  });

  const data: NotificationActionResponse = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to delete notification.");
  }

  return data;
}
