import { useAuthContext } from "features/auth";
import { User, UserCard } from "features/user";
import { WithId } from "utility/model";
import { AddFriendButton } from "./AddFriendButton";
import { Friendship } from "../types";
import { useCallback, useEffect, useState } from "react";
import { getFriendshipOfUsers } from "../api/getFriendshipOfUsers";
import { getFriendshipStatus } from "../api/getFriendshipStatus";

type Props = {
  otherUser: WithId<User>
}

export function AddFriendCard({
  otherUser
}: Props) {
  const user = useAuthContext();
  const [friendship, setFriendship] = useState<Friendship | undefined>();

  const fetchFriendship = useCallback(() => {
    if (!user?.uid) {
      return;
    }
    getFriendshipOfUsers(user?.uid, otherUser.id).then(friendship => (
      setFriendship(friendship)
    ))
  }, [user?.uid, otherUser.id])

  useEffect(() => {
    fetchFriendship();
  }, [fetchFriendship])

  const isSelf = user?.uid === otherUser.id;
  const friendshipStatus = getFriendshipStatus(otherUser.id, friendship);

  console.log('add friend card rerender', user?.uid, otherUser.id)

  return (
    <div
      key={otherUser.id}
      className='p-1 flex items-center justify-between border-2 border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800'
    >
      <UserCard
        user={otherUser}
      />
      {
        (() => {
          if (!user?.uid || isSelf) {
            return <></>;
          }
          switch (friendshipStatus) {
            case 'NOT_FRIENDS': {
              return (
                <AddFriendButton
                  requesterId={user.uid}
                  recipientId={otherUser.id}
                  onAdd={fetchFriendship}
                />
              );
            }
            default: {
              return <></>
            }
          }
        }) ()
      }
    </div>
  );
}
