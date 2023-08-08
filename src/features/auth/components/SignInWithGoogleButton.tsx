import { signInWithGoogle } from "../api";
import { AsyncButton } from "components/form";

export function SignInWithGoogleButton() {
  return (
    <AsyncButton
      onClick={signInWithGoogle}
      className="wide"
    >
      Sign In with Google
    </AsyncButton>
  );
}

