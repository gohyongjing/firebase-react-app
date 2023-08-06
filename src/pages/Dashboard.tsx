import { useAuthContext } from "features/auth";
import { useUser } from "features/user";
import { Page } from "components/layout";
import { SideNav } from "components/sideNav";

export function Dashboard() {
  const firebaseUser = useAuthContext();
  const user = useUser(firebaseUser?.uid);

  return (
    <Page>
      <b>
        { user?.userName }
      </b>
      <SideNav />
    </Page>
  );
}
