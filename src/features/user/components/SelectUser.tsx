import { WithId } from 'utility/model';
import { User } from '../types';
import { UserCard } from './UserCard';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button } from 'components/form';

type Props = {
  users: WithId<User>[]
  selectUser: (user: WithId<User>) => void
}

export function SelectUser({
  users,
  selectUser
}: Props) {
  return (
    <div className='flex flex-col gap-1'>
      {
        users.map(user => {
          return (
            <div
              key={user.id}
              className='flex items-center justify-between'
            >
              <UserCard
                user={user}
              />
              <Button
                onClick={() => selectUser(user)}
              >
                <PlusIcon />
              </Button>
            </div>
          )
          
        })
      }
    </div>
  )
}
