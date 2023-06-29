import { sendWelcomeNotification } from "features/notification";
import { processUserSignIn } from "features/user";
import { signIn as _signIn} from "lib/firebase/auth";

export async function signIn(email: string, password: string) {
  const userCredential = await _signIn(
    email,
    password
  );
  if (!userCredential) {
    return;
  }
  await Promise.all([
    processUserSignIn(userCredential),
    sendWelcomeNotification(userCredential.user.uid)
  ]);
  return userCredential;
};
