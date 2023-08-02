import { useCallback } from "react";
import { AsyncButton } from "components/form/AsyncButton";
import { cancelFriendRequest } from "../api/cancelFriendRequest";

type Props = {
  requesterId: string
  recipientId: string
  onCancel: () => void
}

export function CancelRequestButton({
  requesterId,
  recipientId,
  onCancel
}: Props) {

  const handleClick = useCallback(async () => {
    await cancelFriendRequest(requesterId, recipientId);
    return onCancel();
  }, [requesterId, recipientId, onCancel])

  return (
    <AsyncButton
      onClick={handleClick}
      className='py-2'
    >
      Cancel Request
    </AsyncButton>
  );
}

