import { Timestamp } from "lib/firebase/firestore";

export const NOTIFICATION_TYPE_ANNOUNCEMENT = 'Announcement';
export const NOTIFICATION_TYPE_FRIEND_REQUEST = 'FriendRequest';

type NotificationType = typeof NOTIFICATION_TYPE_ANNOUNCEMENT
  | typeof NOTIFICATION_TYPE_FRIEND_REQUEST;

export type Notification = {
  type: NotificationType
  recipientId: string
  title: string
  message: string
  timestamp: Timestamp
}
