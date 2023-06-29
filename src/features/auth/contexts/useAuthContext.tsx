import { User } from "firebase/auth";
import { useClientSyncExternalStore } from "hooks";
import { ReactNode, createContext, useContext } from "react";
import { subscribeAuth } from "../api";

const AuthContext = createContext<User | null | undefined>(null);

export function useAuthContext() {
  return useContext(AuthContext);
}

interface Props {
  children?: ReactNode
}

export function AuthContextProvider({ children }: Props) {

  const firebaseUser = useClientSyncExternalStore(subscribeAuth);

  return (
    <AuthContext.Provider
      value={firebaseUser}
      children={children}
    />
  );
}
