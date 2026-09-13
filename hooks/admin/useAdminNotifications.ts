"use client";

import { useCallback, useEffect, useState } from "react";

import {
  deleteNotification,
  getAdminNotifications,
  getUnreadNotificationCount,
  markAllNotificationsAsRead,
  markNotificationAsRead,
} from "@/lib/api/admin/notifications";

import type { AdminNotification } from "@/types/admin/notifications";

export function useAdminNotifications() {
  const [notifications, setNotifications] = useState<AdminNotification[]>([]);

  const [unreadCount, setUnreadCount] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [isActionLoading, setIsActionLoading] = useState(false);

  const [error, setError] = useState("");

  /*
   * Fetch unread notification count.
   */
  const fetchUnreadCount = useCallback(async () => {
    try {
      const response = await getUnreadNotificationCount();

      setUnreadCount(response.data.unread_count);
    } catch {
      /*
       * The notification badge should not break
       * the rest of the admin header if the count
       * request fails.
       */
    }
  }, []);

  /*
   * Fetch notifications.
   */
  const fetchNotifications = useCallback(async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await getAdminNotifications();

      setNotifications(response.data);
    } catch (error) {
      setNotifications([]);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load notifications.",
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  /*
   * Fetch the unread count when the hook
   * is initialized.
   *
   * setTimeout moves the state update outside
   * the synchronous effect body.
   */
  useEffect(() => {
    const timeout = setTimeout(() => {
      void fetchUnreadCount();
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [fetchUnreadCount]);

  /*
   * Open or close notification dropdown.
   *
   * Notifications are fetched whenever
   * the dropdown is opened.
   */
  function toggleNotifications() {
    setIsOpen((current) => {
      const nextState = !current;

      if (nextState) {
        void fetchNotifications();
      }

      return nextState;
    });
  }

  /*
   * Close notification dropdown.
   */
  function closeNotifications() {
    setIsOpen(false);
  }

  /*
   * Mark one notification as read.
   */
  async function markAsRead(notificationId: number) {
    try {
      setIsActionLoading(true);
      setError("");

      await markNotificationAsRead(notificationId);

      setNotifications((current) =>
        current.map((notification) =>
          notification.id === notificationId
            ? {
                ...notification,
                is_read: true,
              }
            : notification,
        ),
      );

      setUnreadCount((current) => (current > 0 ? current - 1 : 0));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to mark notification as read.",
      );
    } finally {
      setIsActionLoading(false);
    }
  }

  /*
   * Mark all notifications as read.
   */
  async function markAllAsRead() {
    try {
      setIsActionLoading(true);
      setError("");

      await markAllNotificationsAsRead();

      setNotifications((current) =>
        current.map((notification) => ({
          ...notification,
          is_read: true,
        })),
      );

      setUnreadCount(0);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to mark all notifications as read.",
      );
    } finally {
      setIsActionLoading(false);
    }
  }

  /*
   * Delete one notification.
   */
  async function removeNotification(notificationId: number) {
    try {
      setIsActionLoading(true);
      setError("");

      const notification = notifications.find(
        (item) => item.id === notificationId,
      );

      await deleteNotification(notificationId);

      setNotifications((current) =>
        current.filter((item) => item.id !== notificationId),
      );

      /*
       * If the deleted notification was unread,
       * decrease the badge count.
       */
      if (notification && !notification.is_read) {
        setUnreadCount((current) => (current > 0 ? current - 1 : 0));
      }
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to delete notification.",
      );
    } finally {
      setIsActionLoading(false);
    }
  }

  return {
    notifications,
    unreadCount,
    isOpen,
    isLoading,
    isActionLoading,
    error,
    toggleNotifications,
    closeNotifications,
    markAsRead,
    markAllAsRead,
    removeNotification,
    refreshNotifications: fetchNotifications,
    refreshUnreadCount: fetchUnreadCount,
  };
}
