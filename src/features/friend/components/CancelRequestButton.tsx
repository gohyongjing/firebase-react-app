import { useCallback } from "react";
import { AsyncButton } from "components/form";
import { cancelFriendRequest } from "../api";

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
      className='py-2 bg-cancel-300 dark:border-cancel-900 dark:text-cancel-50 dark:bg-cancel-600 w-40'
    >
      Cancel Request
    </AsyncButton>
  );
}

