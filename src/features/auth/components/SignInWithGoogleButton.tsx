import { signInWithGoogle } from "../api";
import { LongAsyncButton } from "components/form";

export function SignInWithGoogleButton() {
  return (
    <LongAsyncButton
      onClick={signInWithGoogle}
    >
      Sign In with Google
    </LongAsyncButton>
  );
}

