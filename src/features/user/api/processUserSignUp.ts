import { UserCredential } from "lib/firebase/auth";
import { setUser } from "../utility";
import { Timestamp } from "lib/firebase/firestore";

export function processUserSignUp(userCredential: UserCredential) {
  const userId = userCredential.user.uid;
  return setUser(userId, {
    userName: `User ${userId}`,
    dateCreated: Timestamp.now()
  });
}
