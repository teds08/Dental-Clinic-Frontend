export interface AdminNotification {
  id: number;
  title: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface UnreadNotificationCountData {
  unread_count: number;
}

export interface UnreadNotificationCountResponse {
  message: string;
  data: UnreadNotificationCountData;
}

export interface AdminNotificationsResponse {
  message: string;
  data: AdminNotification[];
}

export interface NotificationActionResponse {
  message: string;
}
