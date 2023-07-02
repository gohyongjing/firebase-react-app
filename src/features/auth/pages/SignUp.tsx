import { Button, Form, LabelledInput } from "components/form";
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
        <LabelledInput
          type='email'
          value={emailInputHandler.value}
          onChange={emailInputHandler.onChange}
          labelText="Email"
          id='email'
        />
        <LabelledInput
          type="password"
          value={passwordInputHandler.value}
          onChange={passwordInputHandler.onChange}
          labelText="Password"
          id='password'
        />
        <Button>
          Sign Up
        </Button>
      </Form>
    </Page>
  );
}
