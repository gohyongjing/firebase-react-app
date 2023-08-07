import { Timestamp } from "lib/firebase/firestore";

export const NOTIFICATION_TYPE_ANNOUNCEMENT = 'Announcement';
export const NOTIFICATION_TYPE_FRIEND_REQUEST = 'NewFriendRequest';
export const NOTIFICATION_TYPE_ACCEPTED_FRIEND_REQUEST = 'AcceptedFriendRequest';

type NotificationType = typeof NOTIFICATION_TYPE_ANNOUNCEMENT
  | typeof NOTIFICATION_TYPE_FRIEND_REQUEST
  | typeof NOTIFICATION_TYPE_ACCEPTED_FRIEND_REQUEST;

export type Notification = {
  type: NotificationType
  recipientId: string
  title: string
  message: string
  timestamp: Timestamp
}
