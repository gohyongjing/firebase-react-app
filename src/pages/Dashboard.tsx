import { Button, Form, Input } from "components/form";
import { formatErrorMessage, useAuthContext } from "features/auth";
import { Notification, subscribeUserNotifications } from "features/notification";
import { getUserById, updateUserName } from "features/user";
import { useInputHandler } from "hooks/form";
import { OnStoreChange, useClientSyncExternalStore, usePromise, useSyncCachedExternalStore } from "hooks";
import { FormEvent, useCallback, useEffect } from "react";
import { WithId } from "utility/model";
import { Page } from "components/utility";

export function Dashboard() {
  const firebaseUser = useAuthContext();
  const _wrappedSubscibeNotifications = useCallback((
    onStoreChange: OnStoreChange<WithId<Notification>[]>
  ) => {
    if (!firebaseUser) {
      return () => {};
    }
    return subscribeUserNotifications(firebaseUser.uid, onStoreChange)
  }, [firebaseUser])
  const notifications = useClientSyncExternalStore(_wrappedSubscibeNotifications) ?? [];
  const { resolve, isLoading, error } = usePromise();
  const { value: userName, setValue: setUserName, onChange: onUserNameChange } = useInputHandler('');

  const fetcher = useCallback(async () => {
    if (!firebaseUser?.uid) {
      return undefined;
    }
    return getUserById(firebaseUser.uid);
  }, [firebaseUser?.uid])

  const { data: user } = useSyncCachedExternalStore(fetcher);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firebaseUser?.uid) {
      return;
    }
    resolve(() => updateUserName(
      firebaseUser.uid, 
      userName
    ));
  }

  useEffect(() => {
    if (user?.userName) {
      setUserName(user.userName);
    }
  }, [user?.userName, setUserName])

  const errorMessage = formatErrorMessage(error)

  return (
    <Page>
      <div>
        Notifications
        {
          notifications.map(notification => {
            return (
              <div
                key={notification.id}
              >
                Message: {notification.message}
                <br/>
                Timestamp: {notification.timestamp.toString()}
              </div>
            )
          })
        }
      </div>
      {
        `UserName: ${user?.userName}` 
      }
      {
        `Error: ${errorMessage}`
      }
      <Form onSubmit={handleSubmit}>
        <Input
          onChange={onUserNameChange}
          value={userName}
          disabled={isLoading}
        >
        </Input>
        <Button
          disabled={isLoading}
        >
          Update userName
        </Button>
      </Form>
    </Page>
  );
}
