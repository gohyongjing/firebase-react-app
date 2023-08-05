import { useInputHandler } from "hooks/form";
import { usePromise } from "hooks";
import { FormEvent, useCallback, useEffect } from "react";
import { Form, LabelledInput, LongButton } from "components/form";
import { Page } from "components/utility";
import { Center } from "components/layout/Center";
import { updateUserName, useUser } from "..";
import { useAuthContext } from "features/auth";

export function UserSettings() {
  const firebaseUser = useAuthContext();
  const user = useUser(firebaseUser?.uid);
  const { resolve, isLoading } = usePromise();
  const userNameInputHandler = useInputHandler('');

  const handleSave = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firebaseUser) {
      return;
    }
    return resolve(() => updateUserName(
      firebaseUser?.uid,
      userNameInputHandler.value
    ));
  }, [firebaseUser, resolve, userNameInputHandler.value]);

  const setUserName = userNameInputHandler.setValue;
  useEffect(() => {
    if (!user?.userName) {
      return;
    }
    setUserName(user.userName);
  }, [user?.userName, setUserName])

  console.log('user settings rerender')

  return (
    <Page>
      <Form onSubmit={handleSave}>
        <Center
          className="p-2 gap-2"
        >
          <LabelledInput
            type='text'
            value={userNameInputHandler.value}
            onChange={userNameInputHandler.onChange}
            labelText="UserName"
            id='user-name'
          />
          <LongButton disabled={isLoading}>
            { 
              isLoading
              ? 'Saving...'
              : 'Save'
            }
          </LongButton>
        </Center>
      </Form>
    </Page>
  );
}
