import { UserCredential } from "lib/firebase/auth";
import { getUser, setUser } from "../utility";
import { Timestamp } from "lib/firebase/firestore";

export async function processUserSignIn(userCredential: UserCredential) {
  const userId = userCredential.user.uid;
  const user = await getUser(userId);
  if (!user) {
    setUser(userId, {
      userName: `User ${userId}`,
      dateCreated: Timestamp.now()
    });
  }
  return user;
}
