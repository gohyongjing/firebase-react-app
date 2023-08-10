import { Button, Form, LabelledInput } from "components/form";
import { useInputHandler } from "hooks/form";
import { usePromise } from "hooks";
import { FormEvent } from "react";
import { formatErrorMessage, signUp } from "../api";
import { Center, Page } from "components/layout";
import { SignInWithGoogleButton } from "..";

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
      <Center>
        <SignInWithGoogleButton />
      </Center>
      {/* Temporarily hide form until more features are completed (reset password, verify email) */}
      <Form onSubmit={handleSubmit} className="hidden">
        <Center className="gap-1">
          <LabelledInput
            type='email'
            value={emailInputHandler.value}
            onChange={emailInputHandler.onChange}
            label="Email"
            id='email'
          />
          <LabelledInput
            type="password"
            value={passwordInputHandler.value}
            onChange={passwordInputHandler.onChange}
            label="Password"
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
