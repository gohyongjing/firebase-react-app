import { Button } from "components/form";
import { AccessibleIcon, Cross1Icon } from "lib/radixUi";
import { useCallback } from "react";
import { deleteNotificationById } from "../api";

interface Props {
  notificationId: string
}

export function DismissNotificationButton({ notificationId }: Props) {

  const handleClick = useCallback(() => {
    deleteNotificationById(notificationId);
  }, [notificationId])

  return (
    <Button
      className="border-0 bg-slate-50"
      onClick={handleClick}  
    >
      <AccessibleIcon.Root label="Dismiss">
        <Cross1Icon
          className="text-primary-1 dark:text-slate-50"
        />
      </AccessibleIcon.Root>
    </Button>
  );
}
