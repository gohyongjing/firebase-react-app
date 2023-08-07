import {  deleteFriendship } from "../utility";
import { getClientFriendship } from "./getClientFriendship";

export async function cancelFriendRequest(requesterId: string, recipientId: string) {
  const clientFriendship = await getClientFriendship(requesterId, recipientId);
  if (clientFriendship.status !== 'REQUEST_SENT') {
    console.error(`Bad request: User ${requesterId} cannot cancel friend request to user ${recipientId}:`, clientFriendship);
    return;
  }
  return deleteFriendship(clientFriendship.friendship.id)
}

