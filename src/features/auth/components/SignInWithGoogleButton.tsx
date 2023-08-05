import { signInWithGoogle } from "../api/signInWithGoogle";
import { LongAsyncButton } from "components/form/LongAsyncButton";

export function SignInWithGoogleButton() {
  return (
    <LongAsyncButton
      onClick={signInWithGoogle}
    >
      Sign In with Google
    </LongAsyncButton>
  );
}

