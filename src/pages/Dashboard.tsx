import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useAuthContext } from "../contexts/useAuthContext";
import useModel from "../hooks/firebase/useModel";

export default function Dashboard() {
  const { user, authErrorMessage, signOut } = useAuthContext();
  const { model, updateModel, error } = useModel({ message: 'No message' }, `/dashboard/${user?.uid}`, !!user);
  const [dashboardMessageField, setDashboardMessageField] = useState('');

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return signOut();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setDashboardMessageField(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    updateModel({ message: dashboardMessageField });
  }

  return (
    <>
      {
        `Data: ${model?.message}` 
      }
      {
        `Error: ${error}`
      }
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={dashboardMessageField}
        >
        </input>
        <button>
          Update dashboard message
        </button>
      </form>
      {authErrorMessage}
      <button onClick={handleClick}>Log Out</button>
    </>
  );
}