import { Button, Form, Input } from "components/form";
import { formatErrorMessage, useAuthContext } from "features/auth";
import { getUserById, updateUserName } from "features/user";
import { useInputHandler } from "hooks/form";
import { usePromise, useSyncCachedExternalStore } from "hooks";
import { FormEvent, useCallback, useEffect } from "react";
import { Page } from "components/utility";

export function Dashboard() {
  const firebaseUser = useAuthContext();
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
