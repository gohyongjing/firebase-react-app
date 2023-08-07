import { Timestamp } from "lib/firebase/firestore";
import { addNotification } from "../utility/notification";
import { NOTIFICATION_TYPE_ANNOUNCEMENT } from "..";

export const NOTIFICATION_TITLE_WELCOME = 'Welcome!'
export const NOTIFICATION_MSG_WELCOME = 'Welcome to firebase-react-app!'

export function sendWelcomeNotification(userId: string) {
  return addNotification({
    type: NOTIFICATION_TYPE_ANNOUNCEMENT,
    recipientId: userId,
    title: NOTIFICATION_TITLE_WELCOME,
    message: NOTIFICATION_MSG_WELCOME,
    timestamp: Timestamp.now()
  })
}
