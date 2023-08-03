import { Timestamp } from "lib/firebase/firestore";
import { addFriendship } from "../utility";
import { getClientFriendship } from "./getClientFriendship";
import { sendFriendRequestNotification } from "features/notification/api/sendFriendRequestNotification";

export async function sendFriendRequest(requesterId: string, recipientId: string) {
  const clientFriendship = await getClientFriendship(requesterId, recipientId);
  if (clientFriendship.status !== 'NOT_FRIENDS') {
    console.error(`Bad request: User ${requesterId} cannot send friend request to user ${recipientId}`);
    return;
  }
  const addFriendshipPromise = addFriendship({
    requesterId,
    recipientId,
    dateRequested: Timestamp.now(),
    dateAccepted: null
  });
  const sendNotificationPromise = sendFriendRequestNotification(recipientId);
  return Promise.all([
    addFriendshipPromise,
    sendNotificationPromise
  ])
}
