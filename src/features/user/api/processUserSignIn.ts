import { UserCredential } from "lib/firebase/auth";
import { defaultUserModel, getUser, setUser } from "../utility";

export async function processUserSignIn(userCredential: UserCredential) {
  const userId = userCredential.user.uid;
  const checkUserDocument = getUser(userId)
    .then(user => {
      if (user === undefined) {
        setUser(userId, defaultUserModel);
      }
    });
  await Promise.all([
    checkUserDocument
  ]);
}
