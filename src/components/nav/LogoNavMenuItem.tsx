import { NavigationMenu } from "lib/radixUi";
import { PATH_HOME } from "routes";

export function LogoNavMenuItem() {
  return (
    <NavigationMenu.Item>
      <NavigationMenu.Link
        className="text-primary-2 items-center"
        href={PATH_HOME}
      >
        <b>
          <span
            className="text-secondary-1"
          >
            firebase
          </span>
          -
          <span
            className="text-primary-2"
          >
            react-app
          </span>
        </b>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
