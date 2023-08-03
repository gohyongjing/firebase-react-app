import { useAuthContext } from "features/auth";
import { User, UserCard } from "features/user";
import { WithId } from "utility/model";
import { ClientFriendship } from "../types";
import { useCallback, useEffect, useState } from "react";
import { getClientFriendship } from "../api";
import { AcceptRequestButton, AddFriendButton, CancelRequestButton } from ".";
import { RemoveFriendButton } from "./RemoveFriendButton";

type Props = {
  otherUser: WithId<User>
}

export function AddFriendCard({
  otherUser
}: Props) {
  const user = useAuthContext();
  const [clientFriendship, setClientFriendship] = useState<ClientFriendship>({
    friendship: undefined,
    status: 'UNKNOWN'
  });

  const fetchClientFriendship = useCallback(() => {
    const isSelf = user?.uid === otherUser.id;
    if (!user?.uid || isSelf) {
      return;
    }
    getClientFriendship(user?.uid, otherUser.id).then(clientFriendship => (
      setClientFriendship(clientFriendship)
    ))
  }, [user?.uid, otherUser.id])

  useEffect(() => {
    fetchClientFriendship();
  }, [fetchClientFriendship])

  const isSelf = user?.uid === otherUser.id;

  console.log('add friend card rerender', user?.uid, otherUser.id)

  return (
    <div
      key={otherUser.id}
      className='p-1 flex items-center justify-between border-2 border-background-200 bg-background-100 dark:border-background-700 dark:bg-background-800'
    >
      <UserCard
        user={otherUser}
      />
      {
        (() => {
          if (!user?.uid || isSelf) {
            return <></>;
          }
          switch (clientFriendship.status) {
            case 'NOT_FRIENDS': {
              return (
                <AddFriendButton
                  requesterId={user.uid}
                  recipientId={otherUser.id}
                  onAdd={fetchClientFriendship}
                />
              );
            }
            case 'REQUEST_SENT': {
              return (
                <CancelRequestButton
                  requesterId={user.uid}
                  recipientId={otherUser.id}
                  onCancel={fetchClientFriendship}
                />
              );
            }
            case 'REQUEST_RECEIVED': {
              return (
                <AcceptRequestButton
                  requesterId={user.uid}
                  recipientId={otherUser.id}
                  onAccept={fetchClientFriendship}
                />
              )
            }
            case 'FRIENDS': {
              return (
                <RemoveFriendButton
                  requesterId={user.uid}
                  recipient={otherUser}
                  onRemove={fetchClientFriendship}
                />
              );
            }
            default: {
              return <></>;
            }
          }
        }) ()
      }
    </div>
  );
}
