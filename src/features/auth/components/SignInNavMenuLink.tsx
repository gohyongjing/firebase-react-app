import { PATH_SIGN_IN } from "routes";
import { NavMenuLink } from "./utility";

export function SignInNavMenuLink() {
  return (
    <NavMenuLink
      href={PATH_SIGN_IN}
    >
      Sign In
    </NavMenuLink>
  );
}
