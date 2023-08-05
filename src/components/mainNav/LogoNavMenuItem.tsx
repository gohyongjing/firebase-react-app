import { FirebaseReactAppLogo } from "components/utility";
import { NavigationMenu } from "lib/radixUi";

export function LogoNavMenuItem() {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link>
        <FirebaseReactAppLogo />
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
