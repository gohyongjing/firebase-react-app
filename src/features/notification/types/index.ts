import { Timestamp } from "lib/firebase/firestore";

type NotificationType = 'Announcement';

export interface Notification {
  type: NotificationType
  recipientId: string
  message: string
  timestamp: Timestamp
}
