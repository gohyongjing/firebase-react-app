import { FormEvent, MouseEvent, useCallback, useEffect } from "react";
import { useAuthContext } from "../contexts/useAuthContext";
import useUser from "../hooks/models/useUser";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import useInputHandler from "../hooks/utility/form/useInputHandler";
import useSyncCachedExternalStore from "../hooks/utility/useSyncCachedExternalStore";

export default function Dashboard() {
  const { user: firebaseUser, signOut, authIsLoading, authErrorMessage } = useAuthContext();
  const { getUser, updateUser, userIsLoading, userError } = useUser();
  const userNameInputHandler = useInputHandler('');

  const fetcher = useCallback(async () => {
    if (!firebaseUser?.uid) {
      return undefined;
    }
    return getUser(firebaseUser.uid);
  }, [firebaseUser?.uid, getUser])

  const {data: user} = useSyncCachedExternalStore(fetcher);

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return signOut();
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!firebaseUser?.uid) {
      return;
    }
    updateUser(firebaseUser.uid, {
      userName: userNameInputHandler.value
    });
  }

  useEffect(() => {
    if (user?.userName) {
      userNameInputHandler.setValue(user.userName);
    }
  }, [user?.userName, userNameInputHandler])
  console.log('dashboard rerender', userError)

  const isLoading = authIsLoading || userIsLoading;

  return (
    <>
      {
        `UserName: ${user?.userName}` 
      }
      {
        `Auth Error: ${authErrorMessage}`
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
      {authErrorMessage}
      <button onClick={handleClick}>Log Out</button>
    </>
  );
}
