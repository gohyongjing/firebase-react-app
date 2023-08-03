import { NOTIFICATION_TYPE_FRIEND_REQUEST } from "..";
import { addNotification, getNotificationWhere } from "../utility";
import { Timestamp, where } from "firebase/firestore";

const NOTIFICATION_TITLE_FRIEND_REQUEST = 'New Friend Request';
const NOTIFICATION_MSG_FRIEND_REQUEST = 'You have a new friend request!';

export async function sendFriendRequestNotification(recipientId: string) {
  const existingNotification = await getNotificationWhere(
    where('type', '==', NOTIFICATION_TYPE_FRIEND_REQUEST),
    where('recipientId', '==', recipientId)
  )
  if (!existingNotification) {
    return addNotification({
    type: NOTIFICATION_TYPE_FRIEND_REQUEST,
    recipientId,
    title: NOTIFICATION_TITLE_FRIEND_REQUEST,
    message: NOTIFICATION_MSG_FRIEND_REQUEST,
    timestamp: Timestamp.now()
    })
  }
}
