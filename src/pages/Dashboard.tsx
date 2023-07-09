import { useAuthContext } from "features/auth";
import { getUserById } from "features/user";
import { useSyncCachedExternalStore } from "hooks";
import { useCallback } from "react";
import { Page } from "components/utility";

export function Dashboard() {
  const firebaseUser = useAuthContext();

  const fetcher = useCallback(async () => {
    if (!firebaseUser?.uid) {
      return undefined;
    }
    return getUserById(firebaseUser.uid);
  }, [firebaseUser?.uid])

  const { data: user } = useSyncCachedExternalStore(fetcher);

  return (
    <Page>
      <b>
        { user?.userName }
      </b>
    </Page>
  );
}
