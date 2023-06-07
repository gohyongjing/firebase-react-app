import { ChangeEvent, FormEvent, MouseEvent } from "react";
import { useAuthContext } from "../contexts/useAuthContext";
//import useDocument from "../hooks/firebase/useDocument";

export default function Dashboard() {
  const { authErrorMessage, signOut } = useAuthContext();
  //const { data, setDoc } = useDocument(`/dashboard/${user?.uid}`);
  //const [dashboardMessageField, setDashboardMessageField] = useState('');

  function handleClick(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    return signOut();
  }

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    //setDashboardMessageField(e.target.value);
  }

  function handleSubmit(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault();
    //setDoc({message: dashboardMessageField});
  }
  return (
    <>
      {/*data*/}
      <form>
        <input
          onChange={handleChange}
        >
        </input>
        <button
          onSubmit={handleSubmit}
        >
          Update dashboard message
        </button>
      </form>
      {authErrorMessage}
      <button onClick={handleClick}>Log Out</button>
    </>
  );
}