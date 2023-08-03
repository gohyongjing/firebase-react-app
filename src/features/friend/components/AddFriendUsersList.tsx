import { User, getUsersByName } from '../../user';
import { useEffect, useState } from 'react';
import { useAuthContext } from 'features/auth';
import { WithId } from 'utility/model';
import { AddFriendCard } from '.';

export function AddFriendUsersList() {
  const user = useAuthContext();
  const [users, setUsers] = useState<WithId<User>[]>([]);
  
  useEffect(() => {
    if (!user?.uid) {
      return;
    }
    getUsersByName('', 5).then(async users => {
      setUsers(users);
    })
  }, [user?.uid])
  console.log('add list rerender')

  return (
    <div className='flex flex-col gap-1 p-1'>
      {
        users.map(otherUser => {
          return (
            <AddFriendCard
              key={otherUser.id}
              otherUser={otherUser}
            />
          )
        })
      }
    </div>
  )
}
