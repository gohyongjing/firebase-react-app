import { Timestamp } from "lib/firebase/firestore";
import { addNotification } from "../utility/notification";

const NOTIFICATION_MSG_WELCOME = 'Welcome to firebase-react-app!'

export function sendWelcomeNotification(userId: string) {
  return addNotification({
    type: 'Announcement',
    recipientId: userId,
    message: NOTIFICATION_MSG_WELCOME,
    timestamp: Timestamp.fromDate(new Date())
  })
}
