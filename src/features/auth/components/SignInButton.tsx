import { PATH_SIGN_IN } from "routes";
import { ButtonLink } from "./utility/ButtonLink";

export function SignInButton() {
  return (
    <ButtonLink
      className="w-1/2 m-2"
      href={PATH_SIGN_IN}  
    >
      Sign In
    </ButtonLink>
  );
}
