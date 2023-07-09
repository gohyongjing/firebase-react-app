import { Cross1Icon } from "@radix-ui/react-icons";
import { Notification } from "../types";
import { Button } from "components/form";

interface Props {
  notification: Notification
}

export function NotificationCard({ notification }: Props) {
  return (
    <div className="flex flex-col p-1 px-2">
      <div className="flex justify-between items-center">
        <b className="text-lg">
          { notification.title }
        </b>
        <Button
          className="border-0 bg-slate-50"
        >
          <Cross1Icon
            className="text-primary-1 dark:text-slate-50"
          />
        </Button>
      </div>
      <div className="text-xs">
        { notification.timestamp.toDate().toDateString() }
      </div>
      <div className="p-2">
        { notification.message }
      </div>
    </div>
  );
}
