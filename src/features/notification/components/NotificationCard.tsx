import { Link } from "lib/reactRouterDom";
import { Notification } from "../types";
import { DismissNotificationButton } from "./DismissNotificationButton";
import { WithId } from "utility/model";

type Props = {
  notification: WithId<Notification>
}

export function NotificationCard({ notification }: Props) {
  return (
    <div className="flex flex-col p-1 px-3">
      <div className="flex justify-between items-center">
        <b className="">
          { notification.title }
        </b>
        <DismissNotificationButton notificationId={notification.id} />
      </div>
      <div className="text-xs">
        { notification.timestamp.toDate().toDateString() }
      </div>
      <div className="text-sm p-2">
        { notification.message }
      </div>
      {
        notification.redirectLink &&
          <Link
            to={notification.redirectLink}
            className="self-center text-clickable"
          >
            View
          </Link>
      }
    </div>
  );
}
