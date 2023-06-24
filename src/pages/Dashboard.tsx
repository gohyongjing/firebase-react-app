import { FormEvent, MouseEvent, useCallback, useEffect } from "react";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import useInputHandler from "../hooks/utility/form/useInputHandler";
import useSyncCachedExternalStore from "../hooks/utility/useSyncCachedExternalStore";
import usePromise from "../hooks/utility/usePromise";
import { getUser, updateUserName } from "../models/user";
import { formatAuthErrorMessage, signOut } from "../utility/firebase/auth";
import { useAppContext } from "../contexts/useAppContext";

export default function Dashboard() {
  const { user: firebaseUser, notifications } = useAppContext();
  const { resolve, isLoading, error } = usePromise();
  const userNameInputHandler = useInputHandler('');

  const fetcher = useCallback(async () => {
    if (!firebaseUser?.uid) {
      return undefined;
    }
    return getUser(firebaseUser.uid);
  }, [firebaseUser?.uid])

  const { data: user } = useSyncCachedExternalStore(fetcher);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return resolve(signOut);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firebaseUser?.uid) {
      return;
    }
    resolve(() => updateUserName(
      firebaseUser.uid, 
      userNameInputHandler.value
    ));
  }

  useEffect(() => {
    if (user?.userName) {
      userNameInputHandler.setValue(user.userName);
    }
  }, [user?.userName, userNameInputHandler])
  console.log('dashboard rerender')

  const errorMessage = formatAuthErrorMessage(error)

  return (
    <>
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
          onChange={userNameInputHandler.onChange}
          value={userNameInputHandler.value}
          disabled={isLoading}
        >
        </Input>
        <Button
          disabled={isLoading}
        >
          Update userName
        </Button>
      </Form>
      <button onClick={handleClick}>Log Out</button>
    </>
  );
}
