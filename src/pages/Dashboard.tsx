import { MouseEvent } from "react";
import { useAuthContext } from "../contexts/useAuthContext";

export default function Dashboard() {
  const { user, authError, logOut } = useAuthContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return logOut();
  }
  return (
    <>
      {JSON.stringify(user)}
      {authError}
      <button onClick={handleClick}>Log Out</button>
    </>
  );
}