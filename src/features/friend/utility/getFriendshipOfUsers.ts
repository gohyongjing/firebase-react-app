import { getFriendshipWhere,  } from ".";
import { and, or, where } from "lib/firebase/firestore";

export async function getFriendshipOfUsers(
  userId1: string,
  userId2: string
) {
  if (userId1 === userId2) {
    console.error(`User ${userId1} cannot befriend themselves`);
    return;
  }
  return getFriendshipWhere(or(
    and(where('requesterId', '==', userId1), where('recipientId', '==', userId2)),
    and(where('requesterId', '==', userId2), where('recipientId', '==', userId1))
  ))
}
