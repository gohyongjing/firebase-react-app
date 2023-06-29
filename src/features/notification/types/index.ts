import { Timestamp } from "firebase/firestore";

type NotificationType = 'Announcement';

export interface Notification {
  type: NotificationType
  recipientId: string
  message: string
  timestamp: Timestamp
}
