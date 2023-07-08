import { NavigationMenu } from "lib/radixUi";
import { ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  href?: string,
  children:  ReactNode
}

export function NavMenuItemLink({
  href = '',
  children
}: Props) {
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    navigate(href);
  }, [href, navigate]);

  return (
    <NavigationMenu.Item>
        <NavigationMenu.Link
          onClick={handleClick}
          className='text-primary-1 dark:text-primary-3 hover:cursor-pointer'
        >
          <b>
            { children }
          </b>
        </NavigationMenu.Link>
    </NavigationMenu.Item>
  );
}
