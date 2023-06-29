import { UserCredential } from "firebase/auth";
import { sendWelcomeNotification } from "features/notification";
import { defaultUserModel, setUser } from "../utility";

export function processUserSignUp(userCredential: UserCredential) {
  const userId = userCredential.user.uid;
  const createUserDocument = setUser(userId, defaultUserModel);
  const createWelcomeNotification = sendWelcomeNotification(userId);
  return Promise.all([
    createUserDocument,
    createWelcomeNotification
  ])
};
