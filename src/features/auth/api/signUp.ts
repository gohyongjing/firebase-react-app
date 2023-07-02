import { sendWelcomeNotification } from "features/notification";
import { processUserSignUp } from "features/user";
import { signUp as _signUp } from "lib/firebase/auth";

export function signUp(email: string, password: string) {
  return _signUp(
    email,
    password
  ).then(async (userCredential) => {
    if (!userCredential) {
      return;
    }
    await Promise.all([
      processUserSignUp(userCredential),
      sendWelcomeNotification(userCredential.user.uid)
    ]);
    return userCredential;
  });
};
