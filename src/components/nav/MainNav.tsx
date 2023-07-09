import {
  SignInNavMenuLink,
  SignOutNavMenuLink,
  SignUpNavMenuLink,
  useAuthContext
} from 'features/auth';
import { NavigationMenu } from 'lib/radixUi';
import { LogoNavMenuItem } from './LogoNavMenuItem';
import { StyleThemeToggle } from 'features/styleTheme';

export function MainNav() {
  const user = useAuthContext();
  const navMenuItems: JSX.Element[] = [];
  if (user) {
    navMenuItems.push(<SignOutNavMenuLink />);
  } else {
    navMenuItems.push(<SignInNavMenuLink />);
    navMenuItems.push(<SignUpNavMenuLink />);
  }

  return (
    <NavigationMenu.Root
      className='bg-slate-50 dark:bg-primary-1 sticky top-0 shadow-sm'
    >
      <NavigationMenu.List
        className='flex p-2 justify-between'
      >
        <div
          className='flex items-center'
        >
          <LogoNavMenuItem />
        </div>
        <div
          className='flex items-center gap-3'
        >
          <NavigationMenu.Item>
            <StyleThemeToggle />
          </NavigationMenu.Item>
          {
            navMenuItems.map((navMenuItem, index) => (
              <NavigationMenu.Item
                key={index}
              >
                { navMenuItem }
              </NavigationMenu.Item>
            ))
          }  
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
