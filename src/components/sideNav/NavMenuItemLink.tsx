import { ReactNode, useCallback } from "react";
import { useNavigate } from "lib/reactRouterDom";
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
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    navigate(to);
  }, [navigate, to]);

  return (
    <NavigationMenu.Item
      className="flex items-center gap-1 hover:cursor-pointer text-sm text-primary-2 dark:text-primary-3 hover hover:underline"
      onClick={handleClick}
    >
      { icon }
      <NavigationMenu.Link asChild>
        <a>
          { label }
        </a>
      </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
