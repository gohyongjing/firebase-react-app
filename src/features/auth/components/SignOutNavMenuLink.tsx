import { signOut } from '../api';
import { NavMenuLink } from './utility';
import { PATH_HOME } from 'routes';
import { AsyncButton } from 'components/form';

export function SignOutNavMenuLink() {
  return (
    <NavMenuLink
      href={PATH_HOME}
    >
      <AsyncButton
      className='border-none bg-inherit text-inherit'
        onClick={signOut}
      >
        Sign Out
      </AsyncButton>
    </NavMenuLink>
  );
}
