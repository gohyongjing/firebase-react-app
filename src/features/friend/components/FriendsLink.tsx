import { PATH_FRIENDS } from "routes";
import { PersonIcon } from "@radix-ui/react-icons";
import { NavMenuItemLink } from "components/sideNav/NavMenuItemLink";

export function FriendsLink() {
  return (
    <NavMenuItemLink
      to={PATH_FRIENDS}
      icon={<PersonIcon />}
      label='Friends'
    />
  );
}
