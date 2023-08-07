import { NOTIFICATION_TYPE_ACCEPTED_FRIEND_REQUEST } from "..";
import { addNotification } from "../utility";
import { Timestamp } from "firebase/firestore";

const NOTIFICATION_TITLE_ACCEPTED_FRIEND_REQUEST = 'Friend Request Accepted';
const NOTIFICATION_MSG_ACCEPTED_FRIEND_REQUEST = ' has accepted your friend request!';

export async function sendAcceptedFriendRequestNotification(requesterId: string, recipientName: string) {
  return addNotification({
    type: NOTIFICATION_TYPE_ACCEPTED_FRIEND_REQUEST,
    recipientId: requesterId,
    title: NOTIFICATION_TITLE_ACCEPTED_FRIEND_REQUEST,
    message: recipientName + NOTIFICATION_MSG_ACCEPTED_FRIEND_REQUEST,
    timestamp: Timestamp.now()
  })
}
