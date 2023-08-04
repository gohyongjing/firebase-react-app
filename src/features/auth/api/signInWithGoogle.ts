import { sendWelcomeNotification } from "features/notification";
import { processUserSignIn } from "features/user";
import { signInWithGoogle as _signInWithGoogle} from "lib/firebase/auth";

export async function signInWithGoogle() {
  const userCredential = await _signInWithGoogle();
  if (!userCredential) {
    return;
  }
  const user = await processUserSignIn(userCredential.user.uid);
  if (!user) {
    sendWelcomeNotification(userCredential.user.uid);
  }
  return userCredential;
}
