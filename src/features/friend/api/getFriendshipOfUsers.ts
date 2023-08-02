import { getFriendshipWhere,  } from "../utility";
import { and, or, where } from "lib/firebase/firestore";

export function getFriendshipOfUsers(
  userId1: string,
  userId2: string
) {
  return getFriendshipWhere(or(
    and(where('requesterId', '==', userId1), where('recipientId', '==', userId2)),
    and(where('requesterId', '==', userId2), where('recipientId', '==', userId1))
  ))
}
