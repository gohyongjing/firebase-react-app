import { PATH_SIGN_IN } from "routes";
import { ButtonLink } from "./utility/ButtonLink";

export function SignInButton() {
  return (
    <ButtonLink
      href={PATH_SIGN_IN}  
    >
      Sign In
    </ButtonLink>
  );
}
