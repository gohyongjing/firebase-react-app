import { Button, Form, LabelledInput } from "components/form";
import { useInputHandler } from "hooks/form";
import { usePromise } from "hooks";
import { FormEvent } from "react";
import { formatErrorMessage, signUp } from "../api";
import { Page } from "components/utility";
import { Center } from "components/layout/Center";

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
        <Form onSubmit={handleSubmit}>
          <Center className="gap-1">
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
            <div>{errorMessage}</div>
            <Button>
              Sign Up
            </Button>
          </Center>
        </Form>
    </Page>
  );
}
