import { User } from '../types';
import { UserCard } from './UserCard';

type Props = {
  users: User[]
  selectUser: (user: User) => void
}

export function SelectUser({
  users,
  selectUser
}: Props) {
  return users.map(user => (
    <UserCard
      user={user}
      onClick={() => selectUser(user)}
    />
  ))
}
