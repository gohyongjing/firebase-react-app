import { FormEvent } from "react";
import { useAuthContext } from "../contexts/useAuthContext";
import { PATH_LOG_IN, PATH_SIGN_UP } from "../app/AppRoutes";
import useInputHandler from "../hooks/utility/form/useInputHandler";
import Form from "../components/form/Form";
import Input from "../components/form/Input";
import Button from "../components/form/Button";

export default function LogIn() {
  const { authErrorMessage, signIn } = useAuthContext();
  const emailInputHandler = useInputHandler('');
  const passwordInputHandler = useInputHandler('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return signIn(
      emailInputHandler.value,
      passwordInputHandler.value
    );
  }

  return (
    <div>
      <a href={PATH_LOG_IN}>log In</a>
      <a href={PATH_SIGN_UP}>Sign Up</a>
      <div>{authErrorMessage}</div>
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