import { FirebaseReactAppLogo } from "components/utility";
import { NavigationMenu } from "lib/radixUi";
import { PATH_HOME } from "routes";

export function LogoNavMenuItem() {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link
        href={PATH_HOME}
      >
        <FirebaseReactAppLogo />
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
