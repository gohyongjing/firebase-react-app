import { PATH_SIGN_UP } from "routes";
import { ButtonLink } from "./utility/ButtonLink";

export function SignUpButton() {
  return (
    <ButtonLink
      href={PATH_SIGN_UP}  
    >
      Sign Up
    </ButtonLink>
  );
}
