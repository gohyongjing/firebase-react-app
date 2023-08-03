import { useCallback } from "react";
import { sendFriendRequest } from "../api";
import { AsyncButton } from "components/form";

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
    await sendFriendRequest(requesterId, recipientId);
    return onAdd();
  }, [requesterId, recipientId, onAdd])

  return (
    <AsyncButton
      onClick={handleClick}
      className='py-2 text-background-50 bg-primary-1 w-40'
    >
      Add Friend
    </AsyncButton>
  );
}
