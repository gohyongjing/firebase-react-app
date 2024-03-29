import { NavigationMenu } from "lib/radixUi";
import { ReactNode, useCallback } from "react";
import { useNavigate } from "lib/reactRouterDom";

type Props = {
  href?: string,
  children:  ReactNode
}

export function NavMenuLink({
  href = '',
  children
}: Props) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(href);
  }, [href, navigate]);

  return (
    <NavigationMenu.Link
      onClick={handleClick}
      className='text-primary-1 dark:text-primary-3 hover:cursor-pointer'
    >
      <b>
        { children }
      </b>
    </NavigationMenu.Link>
  );
}
