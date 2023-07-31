import { signInWithGoogle } from "../api/signInWithGoogle";
import { Button } from "components/form";

export function SignInWithGoogleButton() {
  return (
    <Button
      className="w-1/2 m-2"
      onClick={signInWithGoogle}
    >
      Sign In with Google
    </Button>
  );
}

