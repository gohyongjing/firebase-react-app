import { MouseEvent } from "react";
import { useAuthContext } from "../contexts/useAuthContext";

export default function Dashboard() {
  const { user, authErrorMessage, signOut } = useAuthContext();

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return signOut();
  }
  return (
    <>
      {JSON.stringify(user)}
      {authErrorMessage}
      <button onClick={handleClick}>Log Out</button>
    </>
  );
}