import { Timestamp } from "lib/firebase/firestore";

type NotificationType = 'Announcement';

export interface Notification {
  type: NotificationType
  recipientId: string
  title: string
  message: string
  timestamp: Timestamp
}
