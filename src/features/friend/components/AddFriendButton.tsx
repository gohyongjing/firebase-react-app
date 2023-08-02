import { useCallback } from "react";
import { addFriend } from "../api/addFriend";
import { AsyncButton } from "components/form/AsyncButton";

type Props = {
  requesterId: string
  recipientId: string
  onAdd: () => void
}

export function AddFriendButton({
  requesterId,
  recipientId,
  onAdd
}: Props) {

  const handleClick = useCallback(async () => {
    await addFriend(requesterId, recipientId);
    return onAdd();
  }, [requesterId, recipientId, onAdd])

  return (
    <AsyncButton
      onClick={handleClick}
      className='py-2'
    >
      Add Friend
    </AsyncButton>
  );
}
