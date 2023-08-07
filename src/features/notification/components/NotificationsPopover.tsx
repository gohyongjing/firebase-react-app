import { useAuthContext } from "features/auth";
import { BellIcon, Popover, ScrollArea, Separator } from "lib/radixUi";
import { Fragment, useCallback } from "react";
import { WithId } from "utility/model";
import { subscribeUserNotifications } from "../api";
import { OnStoreChange, useClientSyncExternalStore } from "hooks";
import { Notification } from "../types";
import { NotificationCard } from "./NotificationCard";
import { Timestamp } from "lib/firebase/firestore";
import { NewNotificationIndicator } from "./NewNotificationIndicator";

function compareTimestamp(
  n1: { timestamp: Timestamp },
  n2: { timestamp: Timestamp }
) {
  const t1 = n1.timestamp.valueOf();
  const t2 = n2.timestamp.valueOf();
  if (t1 < t2) {
    return -1;
  }
  if (t1 > t2) {
    return 1;
  }
  return 0;
}

export function NotificationsPopover() {
  const firebaseUser = useAuthContext();
  const _wrappedSubscibeNotifications = useCallback((
    onStoreChange: OnStoreChange<WithId<Notification>[]>
  ) => {
    if (!firebaseUser) {
      return () => {};
    }
    const wrappedOnStoreChange = (notifications: WithId<Notification>[]) => {
      return onStoreChange(notifications
        .sort(compareTimestamp)
        .reverse()
      )
    };
    return subscribeUserNotifications(firebaseUser.uid, wrappedOnStoreChange)
  }, [firebaseUser])
  const notifications = useClientSyncExternalStore(_wrappedSubscibeNotifications) ?? [];

  return (
    <Popover.Root>
      <Popover.Trigger className="w-8 h-8 flex justify-center items-center">
        <BellIcon/>
        {
          notifications.length > 0 && <NewNotificationIndicator />
        }
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          className="p-1 rounded-xl border-2 border-primary-1 dark:bg-primary-1 dark:text-background-50 dark:border-primary-3 bg-background-50 max-w-[var(--radix-popover-content-available-width)] max-h-[var(--radix-popover-content-available-height)] overflow-hidden"
          collisionPadding={ 8 }
        >
          <Popover.Arrow
            className="dark:fill-primary-3"
          />
          <div className="p-2 flex justify-between text-lg">
            <h1>
              <b>
                Notifications
              </b>
            </h1>
          </div>
          <ScrollArea.Root className="h-56">
            <ScrollArea.Viewport className="h-full">
              {
                notifications.length === 0
                ? <div className="m-2">
                  You have no notifications
                </div>
                : notifications.map(notification => (
                  <Fragment
                    key={notification.id}
                  >
                    <Separator.Root
                      className="h-px mx-2 bg-primary-2"  
                    />
                    <NotificationCard
                      notification={notification}
                    />
                  </Fragment>
                ))
              }
            </ScrollArea.Viewport>
            <ScrollArea.Scrollbar className="rounded-full bg-primary-2 w-2">
              <ScrollArea.Thumb className="rounded-full bg-primary-3"/>
            </ScrollArea.Scrollbar>
          </ScrollArea.Root>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
