import {
  SignInNavMenuLink,
  SignOutNavMenuLink,
  SignUpNavMenuLink,
  useAuthContext
} from 'features/auth';
import { AccessibleIcon, HamburgerMenuIcon, NavigationMenu } from 'lib/radixUi';
import { LogoNavMenuItem } from './LogoNavMenuItem';
import { StyleThemeToggle } from 'features/styleTheme';
import { NotificationsPopover } from 'features/notification';
import { NavMenuItem } from './NavMenuItem';

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
      className='bg-background-50 dark:bg-primary-1 sticky top-0 shadow-sm'
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
          className='flex items-center gap-2'
        >
          <NavMenuItem>
            <StyleThemeToggle />
          </NavMenuItem>
          {
            user && (
              <NavMenuItem>
                <NotificationsPopover />
              </NavMenuItem>
            )
          }
          <NavMenuItem className='sm:hidden'>
            <NavigationMenu.Trigger>
              <AccessibleIcon.Root
                label='links'
              >
                <HamburgerMenuIcon />
              </AccessibleIcon.Root>
            </NavigationMenu.Trigger>
            <NavigationMenu.Content className='absolute top-12 right-2 border-2 rounded border-primary-1 bg-background-50 dark:border-primary-3 dark:bg-primary-1'>
              <ul>
                {
                  navMenuItems.map((navMenuItem, index) => (
                    <NavigationMenu.Item
                      key={index}
                      className='hover:bg-primary-3 p-1 rounded-sm'
                    >
                      { navMenuItem }
                    </NavigationMenu.Item>
                  ))
                } 
            </ul>
          </NavigationMenu.Content>
        </NavMenuItem>
        {
          navMenuItems.map((navMenuItem, index) => (
            <NavigationMenu.Item
              key={index}
              className='hidden sm:block'
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
