import { AsyncButton, Button } from "components/form";
import { AlertDialog } from "lib/radixUi";
import { User } from "features/user";
import { useCallback, useState } from "react";
import { removeFriend } from "../api";
import { WithId } from "utility/model";

type Props = {
  requesterId: string
  recipient: WithId<User>
  onRemove: () => void
}

export function RemoveFriendButton({
  requesterId,
  recipient,
  onRemove
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = useCallback(async () => {
    await removeFriend(requesterId, recipient.id);
    return onRemove();
  }, [onRemove, requesterId, recipient.id])

  return (
    <AlertDialog.Root
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <AlertDialog.Trigger asChild>
        <Button
          className='py-2 bg-danger-400 dark:border-danger-950 dark:bg-danger-900 dark:text-danger-50 w-40'
        >
          Remove Friend
        </Button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Content className="absolute top-1/2 sm:left-1/2 sm:-translate-x-1/2 -translate-y-1/2 m-2 p-4 h-min inset-0 rounded-xl border-2 flex flex-col gap-4 border-primary-1 dark:border-primary-3 bg-background-50 dark:bg-primary-1 dark:text-background-50">
          <AlertDialog.Title className="text-xl text-center">
            Remove friend
          </AlertDialog.Title>
          <AlertDialog.Description className="text-center">
            Are you sure that you want to remove{' '}
            <b className="text-primary-2 dark:text-primary-3">
              { recipient.userName }
            </b>
             {' '}from your friends list?
          </AlertDialog.Description>
          <div className="flex justify-around">
            <AlertDialog.Cancel asChild>
              <Button
                className="dark:text-cancel-800 dark:border-cancel-800 dark:bg-cancel-400"
              >
                Cancel
              </Button>
            </AlertDialog.Cancel>
            <AsyncButton
              onClick={handleConfirm}
              className="bg-danger-400 dark:border-danger-950 dark:bg-danger-900 dark:text-danger-50"
            >
              Remove friend
            </AsyncButton>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
