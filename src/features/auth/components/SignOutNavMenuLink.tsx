import { Button } from 'components/form';
import { usePromise } from 'hooks';
import { signOut } from '../api';
import { NavMenuLink } from './utility';
import { PATH_HOME } from 'routes';

export function SignOutNavMenuLink() {
  const { resolve, isLoading } = usePromise();

  function handleClick() {
    resolve(signOut);
  }

  return (
    <NavMenuLink
      href={PATH_HOME}
    >
      <Button
        onClick={handleClick}
        disabled={isLoading}
      >
        Sign Out
      </Button>
    </NavMenuLink>
  );
}
