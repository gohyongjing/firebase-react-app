import { ButtonLink } from "components/utility";
import { PATH_SIGN_IN } from "routes";

export function SignInButton() {
  return (
    <ButtonLink
      to={PATH_SIGN_IN}  
    >
      Sign In
    </ButtonLink>
  );
}
