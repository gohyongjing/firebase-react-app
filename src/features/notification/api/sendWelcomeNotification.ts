import { Timestamp } from "lib/firebase/firestore";
import { addNotification } from "../utility/notification";

const NOTIFICATION_TITLE_WELCOME = 'Welcome!'
const NOTIFICATION_MSG_WELCOME = 'Welcome to firebase-react-app!'

export function sendWelcomeNotification(userId: string) {
  return addNotification({
    type: 'Announcement',
    recipientId: userId,
    title: NOTIFICATION_TITLE_WELCOME,
    message: NOTIFICATION_MSG_WELCOME,
    timestamp: Timestamp.fromDate(new Date())
  })
}
