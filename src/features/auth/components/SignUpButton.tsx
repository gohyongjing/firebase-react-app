import { PATH_SIGN_UP } from "routes";
import { ButtonLink } from "./utility.ts/ButtonLink";

export function SignUpButton() {
  return (
    <ButtonLink
      className="w-1/2 m-2"
      href={PATH_SIGN_UP}  
    >
      Sign Up
    </ButtonLink>
  );
}
