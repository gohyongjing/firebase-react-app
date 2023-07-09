import { PATH_SIGN_UP } from "routes";
import { NavMenuLink } from "./utility";

export function SignUpNavMenuLink() {
  return (
    <NavMenuLink
      href={PATH_SIGN_UP}
    >
      Sign Up
    </NavMenuLink>
  );
}
