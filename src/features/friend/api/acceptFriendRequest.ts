import { Timestamp } from "lib/firebase/firestore";
import {  updateFriendship } from "../utility";
import { getClientFriendship } from "./getClientFriendship";
import { sendAcceptedFriendRequestNotification } from "features/notification/api/sendAcceptedFriendRequestNotification";
import { User } from "features/user";
import { WithId } from "utility/model";

export async function acceptFriendRequest(requester: WithId<User>, recipient: WithId<User>) {
  const clientFriendship = await getClientFriendship(recipient.id, requester.id);
  if (clientFriendship.status !== 'REQUEST_RECEIVED') {
    console.error(`Bad request: User ${recipient.id} cannot accept friend request from user ${requester.id}:`, clientFriendship);
    return;
  }
  const updateFriendshipPromise = updateFriendship(clientFriendship.friendship.id, {
    dateAccepted: Timestamp.now()
  })
  const sendNotificationPromise = sendAcceptedFriendRequestNotification(requester.id, recipient.userName);
  return Promise.all([
    updateFriendshipPromise,
    sendNotificationPromise
  ]);
}
