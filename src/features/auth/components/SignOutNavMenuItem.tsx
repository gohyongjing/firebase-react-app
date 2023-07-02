import { Button } from 'components/form';
import { usePromise } from 'hooks';
import { signOut } from '../api';
import { NavMenuItemLink } from './utility.ts';
import { PATH_HOME } from 'routes';

export function SignOutNavMenuItem() {
  const { resolve, isLoading } = usePromise();

  function handleClick() {
    resolve(signOut);
  }

  return (
    <NavMenuItemLink
      href={PATH_HOME}
    >
      <Button
        onClick={handleClick}
        disabled={isLoading}
      >
        Sign Out
      </Button>
    </NavMenuItemLink>
  );
}
