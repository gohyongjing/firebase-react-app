import { NavigationMenu } from "lib/radixUi";
import { ReactNode } from "react";
import { twMerge } from "lib/tailwindMerge";

type Props = {
  children?: ReactNode
  className?: string
}

export function NavMenuItem({
  children,
  className = ''
}: Props) {
  return (
    <NavigationMenu.Item
      className={twMerge(
        "border-2 py-1 px-2 rounded-lg border-primary-1 dark:border-primary-3 dark:text-primary-3",
        className
      )}
    >
      { children }
    </NavigationMenu.Item>
  );
}