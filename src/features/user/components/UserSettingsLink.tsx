import { PATH_SETTINGS_USER } from "routes";
import { GearIcon } from "@radix-ui/react-icons";
import { NavMenuItemLink } from "components/sideNav/NavMenuItemLink";

export function UserSettingsLink() {
  return (
    <NavMenuItemLink
      to={PATH_SETTINGS_USER}
      icon={<GearIcon />}
      label='Settings'
    />
  );
}

