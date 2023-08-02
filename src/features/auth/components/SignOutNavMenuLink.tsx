import { signOut } from '../api';
import { NavMenuLink } from './utility';
import { PATH_HOME } from 'routes';
import { AsyncButton } from 'components/form/AsyncButton';

export function SignOutNavMenuLink() {
  return (
    <NavMenuLink
      href={PATH_HOME}
    >
      <AsyncButton
        onClick={signOut}
      >
        Sign Out
      </AsyncButton>
    </NavMenuLink>
  );
}
