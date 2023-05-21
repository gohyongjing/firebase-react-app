import { FormEvent, useState } from "react";
import { useAuthContext } from "../contexts/useAuthContext";
import { PATH_LOG_IN, PATH_SIGN_UP } from "../app/App";

export default function LogIn() {
  const { authError, logIn } = useAuthContext();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    return logIn(email, password);
  }

  return (
    <div>
      <a href={PATH_LOG_IN}>log In</a>
      <a href={PATH_SIGN_UP}>Sign Up</a>
      <div>{authError}</div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          autoComplete="username"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          autoComplete="current-password"
          onChange={e => setPassword(e.target.value)}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
}