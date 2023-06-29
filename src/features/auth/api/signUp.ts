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
    await processUserSignUp(userCredential);
    return userCredential;
  });
};
