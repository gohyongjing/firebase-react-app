import { Timestamp } from "lib/firebase/firestore";
import {  updateFriendship } from "../utility";
import { getClientFriendship } from "./getClientFriendship";

export async function acceptFriendRequest(requesterId: string, recipientId: string) {
  const clientFriendship = await getClientFriendship(requesterId, recipientId);
  if (clientFriendship.status !== 'REQUEST_RECEIVED') {
    console.error(`Bad request: User ${requesterId} cannot accept friend request from user ${recipientId}:`, clientFriendship);
    return;
  }
  return updateFriendship(clientFriendship.friendship.id, {
    dateAccepted: Timestamp.now()
  })
}
