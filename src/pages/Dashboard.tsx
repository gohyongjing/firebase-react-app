import { useAuthContext } from "features/auth";
import { FriendsLink } from "features/friend";
import { useUser } from "features/user";
import { Page } from "components/utility";

export function Dashboard() {
  const firebaseUser = useAuthContext();
  const user = useUser(firebaseUser?.uid);

  return (
    <Page>
      <b>
        { user?.userName }
      </b>
      <FriendsLink />
    </Page>
  );
}
