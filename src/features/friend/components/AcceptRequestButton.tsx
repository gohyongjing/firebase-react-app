import { useCallback } from "react";
import { AsyncButton } from "components/form";
import { acceptFriendRequest } from "../api";
import { User } from "features/user";
import { WithId } from "utility/model";

type Props = {
  requester: WithId<User>
  recipient: WithId<User>
  onAccept: () => void
}

export function AcceptRequestButton({
  requester,
  recipient,
  onAccept
}: Props) {

  const handleClick = useCallback(async () => {
    await acceptFriendRequest(requester, recipient);
    return onAccept();
  }, [requester, recipient, onAccept])

  return (
    <AsyncButton
      onClick={handleClick}
      className='py-2'
    >
      Accept Request
    </AsyncButton>
  );
}

