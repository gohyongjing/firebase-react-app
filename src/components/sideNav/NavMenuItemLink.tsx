import { ReactNode } from "react";
import { Link } from "lib/reactRouterDom";
import { NavigationMenu } from "lib/radixUi";

type Props = {
  to: string,
  icon: ReactNode,
  label: string
}

export function NavMenuItemLink({
  to,
  icon,
  label
}: Props) {

  return (
    <NavigationMenu.Item
      className="flex items-center gap-1 hover:cursor-pointer text-sm text-clickable"
    >
      { icon }
      <NavigationMenu.Link asChild>
        <Link
          to={to}
        >
          { label }
        </Link>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
