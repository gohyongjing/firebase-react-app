import { NavigationMenu } from "lib/radixUi";
import { ReactNode } from "react";

interface Props {
  href?: string,
  children:  ReactNode
}

export function NavMenuItemLink({ href, children }: Props) {
  return (
    <NavigationMenu.Item>
        <NavigationMenu.Link
          href={href}
          className='text-primary-2'
        >
          { children }
        </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
