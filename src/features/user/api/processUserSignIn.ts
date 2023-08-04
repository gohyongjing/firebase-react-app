import { getUser, setUser } from "../utility";
import { Timestamp } from "lib/firebase/firestore";

export async function processUserSignIn(userId: string) {
  const user = await getUser(userId);
  if (!user) {
    setUser(userId, {
      userName: `User ${userId}`,
      dateCreated: Timestamp.now()
    });
  }
  return user;
}
