import { useInputHandler } from "hooks/form";
import { usePromise } from "hooks";
import { formatErrorMessage, signIn } from "../api";
import { FormEvent } from "react";
import { Button, Form, LabelledInput } from "components/form";
import { Page } from "components/utility";
import { Center } from "components/layout/Center";
import { SignInWithGoogleButton } from "..";

export function SignIn() {
  const { resolve, error } = usePromise();
  const emailInputHandler = useInputHandler('');
  const passwordInputHandler = useInputHandler('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return resolve(() => signIn(
      emailInputHandler.value,
      passwordInputHandler.value
    ));
  }

  const errorMessage = formatErrorMessage(error);

  return (
    <Page>
      <Center>
        <SignInWithGoogleButton />
      </Center>
      {/* Temporarily hide form until more features are completed (reset password, verify email) */}
      <Form onSubmit={handleSubmit} className="hidden">
        <Center
          className="gap-1"
        >
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
            Sign In
          </Button>
        </Center>
      </Form>
    </Page>
  );
}
