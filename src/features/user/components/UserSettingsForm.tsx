import { Form, LabelledInput, LongButton } from "components/form";
import { Center } from "components/layout";
import { useInputHandler, usePromise } from "hooks";
import { FormEvent, useCallback, useEffect, useState } from "react";
import { SaveUserSettingsToast, updateUserName, useUser } from "..";
import { useAuthContext } from "features/auth";

export function UserSettingsForm() {
  const firebaseUser = useAuthContext();
  const user = useUser(firebaseUser?.uid);
  
  const { resolve, isLoading } = usePromise();
  const userNameInputHandler = useInputHandler('');
  const [toastIsOpen, setToastIsOpen] = useState(false);

  const handleSave = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!firebaseUser) {
      return;
    }
    return resolve(async () => {
      return updateUserName(
        firebaseUser?.uid,
        userNameInputHandler.value
      ).finally(() => setToastIsOpen(true));
    })
  }, [firebaseUser, resolve, userNameInputHandler.value]);
  console.log('user settings rerender')

  const setUserName = userNameInputHandler.setValue;
  useEffect(() => {
    if (!user?.userName) {
      return;
    }
    setUserName(user.userName);
  }, [user?.userName, setUserName])

  
  return (
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
          Save
        </LongButton>
      </Center>
      <SaveUserSettingsToast
        isOpen={toastIsOpen}
        onIsOpenChange={setToastIsOpen}
      />
    </Form>
  );
}
