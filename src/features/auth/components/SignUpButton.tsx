import { ButtonLink } from "components/utility";
import { PATH_SIGN_UP } from "routes";

export function SignUpButton() {
  return (
    <ButtonLink
      to={PATH_SIGN_UP}  
    >
      Sign Up
    </ButtonLink>
  );
}
