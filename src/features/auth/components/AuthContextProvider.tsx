import { useClientSyncExternalStore } from "hooks";
import { AuthContext, subscribeAuth } from "..";
import { ReactNode } from "react";

type Props = {
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