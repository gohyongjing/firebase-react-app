import { useCallback } from "react";
import { AsyncButton } from "components/form";
import { acceptFriendRequest } from "../api";

type Props = {
  requesterId: string
  recipientId: string
  onAccept: () => void
}

export function AcceptRequestButton({
  requesterId,
  recipientId,
  onAccept
}: Props) {

  const handleClick = useCallback(async () => {
    await acceptFriendRequest(requesterId, recipientId);
    return onAccept();
  }, [requesterId, recipientId, onAccept])

  return (
    <AsyncButton
      onClick={handleClick}
      className='py-2'
    >
      Accept Request
    </AsyncButton>
  );
}

