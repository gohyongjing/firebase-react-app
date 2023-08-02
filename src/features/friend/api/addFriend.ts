import { Timestamp } from "lib/firebase/firestore";
import { addFriendship, updateFriendship } from "../utility";
import { getFriendshipOfUsers } from "./getFriendshipOfUsers";
import { getFriendshipStatus } from "./getFriendshipStatus";

export async function addFriend(requesterId: string, recipientId: string) {
  if (requesterId === recipientId) {
    console.warn(`User ${requesterId} cannot add themselves as a friend`);
    return;
  }
  const friendship = await getFriendshipOfUsers(requesterId, recipientId);
  switch (getFriendshipStatus(recipientId, friendship)) {
    case 'NOT_FRIENDS': {
      return addFriendship({
        requesterId,
        recipientId,
        dateRequested: Timestamp.now(),
        dateAccepted: null
      });
    }
    case 'REQUEST_RECEIVED': {
      if (!friendship) {
        return;
      }
      return updateFriendship(friendship.id, {
        dateAccepted: Timestamp.now()
      })
    }
    default: {
      console.warn(`User ${requesterId} cannot add user ${recipientId} as friend:`, friendship);
    }
  }
}
