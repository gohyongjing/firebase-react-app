import { FriendsLink } from "features/friend";
import { UserSettingsLink } from "features/user";
import { NavigationMenu } from "lib/radixUi";


export function SideNav() {
  return (
    <NavigationMenu.Root orientation="vertical">
      <NavigationMenu.List>
        <UserSettingsLink />
        <FriendsLink />
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}