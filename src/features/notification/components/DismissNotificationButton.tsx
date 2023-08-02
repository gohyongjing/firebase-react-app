import { AccessibleIcon, Cross1Icon } from "lib/radixUi";
import { useCallback } from "react";
import { deleteNotificationById } from "../api";
import { AsyncButton } from "components/form/AsyncButton";

interface Props {
  notificationId: string
}

export function DismissNotificationButton({ notificationId }: Props) {

  const handleClick = useCallback(() => {
    return deleteNotificationById(notificationId);
  }, [notificationId])

  return (
    <AsyncButton
      className="border-0 bg-slate-50"
      onClick={handleClick}  
    >
      <AccessibleIcon.Root label="Dismiss">
        <Cross1Icon
          className="text-primary-1 dark:text-slate-50"
        />
      </AccessibleIcon.Root>
    </AsyncButton>
  );
}
