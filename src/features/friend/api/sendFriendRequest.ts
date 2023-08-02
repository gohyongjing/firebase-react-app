import { Timestamp } from "lib/firebase/firestore";
import { addFriendship } from "../utility";
import { getClientFriendship } from "./getClientFriendship";

export async function sendFriendRequest(requesterId: string, recipientId: string) {
  const clientFriendship = await getClientFriendship(requesterId, recipientId);
  if (clientFriendship.status !== 'NOT_FRIENDS') {
    console.error(`Bad request: User ${requesterId} cannot send friend request to user ${recipientId}`);
    return;
  }
  return addFriendship({
    requesterId,
    recipientId,
    dateRequested: Timestamp.now(),
    dateAccepted: null
  });
}
