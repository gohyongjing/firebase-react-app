import { setUser } from "../utility";
import { Timestamp } from "lib/firebase/firestore";

export function processUserSignUp(userId: string) {
  return setUser(userId, {
    userName: `User ${userId}`,
    dateCreated: Timestamp.now()
  });
}
