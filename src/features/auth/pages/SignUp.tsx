import { Button, Form, Input } from "components/form";
import { useInputHandler } from "hooks/form";
import { usePromise } from "hooks";
import { FormEvent } from "react";
import { formatErrorMessage, signUp } from "../api";
import { Page } from "components/utility";

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

  const errorMessage = formatErrorMessage(error);

  return (
    <Page>
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
    </Page>
  );
}
