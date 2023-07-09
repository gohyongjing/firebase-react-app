import { NavigationMenu } from "lib/radixUi";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode
}

export function NavMenuItem({ children }: Props) {
  return (
    <NavigationMenu.Item className="border-2 py-1 px-2 rounded-lg border-primary-1 dark:border-primary-3 dark:text-primary-3">
      { children }
    </NavigationMenu.Item>
  );
}