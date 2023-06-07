import { ChangeEvent, FormEvent, MouseEvent, useState } from "react";
import { useAuthContext } from "../contexts/useAuthContext";
import useDocument from "../hooks/firebase/useDocument";

export default function Dashboard() {
  const { user, authErrorMessage, signOut } = useAuthContext();
  const { data, setDoc } = useDocument(`/dashboard/${user?.uid}`);
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
    setDoc({message: dashboardMessageField});
  }

  console.log('rerender')
  console.log(data)

  return (
    <>
      Data:
      {  }
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          value={data?.message ? data.message : ''}
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