import { AsyncButton } from "components/form/AsyncButton";
import { signInWithGoogle } from "../api/signInWithGoogle";

export function SignInWithGoogleButton() {
  return (
    <AsyncButton
      className="w-1/2 m-2"
      onClick={signInWithGoogle}
    >
      Sign In with Google
    </AsyncButton>
  );
}

