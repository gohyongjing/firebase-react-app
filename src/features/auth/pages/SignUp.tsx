import { Button, Form, Input } from "components/form";
import { useInputHandler } from "hooks/form";
import { usePromise } from "hooks";
import { formatAuthErrorMessage, signUp } from "lib/firebase/auth";
import { FormEvent } from "react";
import { PATH_LOG_IN, PATH_SIGN_UP } from "routes";

export function SignUp() {
  const { resolve, error } = usePromise();
  const emailInputHandler = useInputHandler('')
  const passwordInputHandler = useInputHandler('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return resolve(() => signUp(
      emailInputHandler.value,
      passwordInputHandler.value
    ));
  }

  const errorMessage = formatAuthErrorMessage(error);

  return (
    <div>
      <a href={PATH_LOG_IN}>log In</a>
      <a href={PATH_SIGN_UP}>Sign Up</a>
      <div>{errorMessage}</div>
      <Form onSubmit={handleSubmit}>
        <Input
          type='email'
          value={emailInputHandler.value}
          onChange={emailInputHandler.onChange}
        />
        <Input
          type="password"
          value={passwordInputHandler.value}
          onChange={passwordInputHandler.onChange}
        />
        <Button>
          Sign Up
        </Button>
      </Form>
    </div>
  );
}
