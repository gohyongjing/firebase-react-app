import { FormEvent } from "react";
import { PATH_LOG_IN, PATH_SIGN_UP } from "../app/AppRoutes";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import Button from "../components/form/Button";
import useInputHandler from "../hooks/utility/form/useInputHandler";
import usePromise from "../hooks/utility/usePromise";
import { formatAuthErrorMessage, signUp } from "../utility/firebase/auth";

export default function SignUp() {
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
