import { PATH_SIGN_UP } from "routes";
import { NavMenuItemLink } from "./utility.ts";

export function SignUpNavMenuItem() {
  return (
    <NavMenuItemLink
      href={PATH_SIGN_UP}
    >
      Sign Up
    </NavMenuItemLink>
  );
}
