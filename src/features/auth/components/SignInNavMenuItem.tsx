import { PATH_SIGN_IN } from "routes";
import { NavMenuItemLink } from "./utility.ts";

export function SignInNavMenuItem() {
  return (
    <NavMenuItemLink
      href={PATH_SIGN_IN}
    >
      Sign In
    </NavMenuItemLink>
  );
}
