import { Fragment } from 'react';
import {
  SignInNavMenuItem,
  SignOutNavMenuItem,
  SignUpNavMenuItem,
  useAuthContext
} from 'features/auth';
import { NavigationMenu } from 'lib/radixUi';
import { LogoNavMenuItem } from './LogoNavMenuItem';

export function MainNav() {
  const user = useAuthContext();
  const navMenuItems: JSX.Element[] = [];
  if (user) {
    navMenuItems.push(<SignOutNavMenuItem />);
  } else {
    navMenuItems.push(<SignInNavMenuItem />);
    navMenuItems.push(<SignUpNavMenuItem />);
  }

  return (
    <NavigationMenu.Root
      className='bg-primary-1'
    >
      <NavigationMenu.List
        className='flex p-2 justify-between text-lg'
      >
        <div
          className='flex items-center'
        >
          <LogoNavMenuItem />
        </div>
        <div
          className='flex gap-3'
        >
          {
            navMenuItems.map((navMenuItem, index) => (
              <Fragment
                key={index}
              >
                { navMenuItem }
              </Fragment>
            ))
          }  
        </div>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
