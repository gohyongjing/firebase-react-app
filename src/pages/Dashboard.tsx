import { useAuthContext } from "features/auth";
import { useUser } from "features/user";
import { Page } from "components/layout";
import { SideNav } from "components/sideNav";
import { GameBarWidget } from "features/games";
import { Heading } from "components/utility";

export function Dashboard() {
  const firebaseUser = useAuthContext();
  const user = useUser(firebaseUser?.uid);

  return (
    <Page>
      <div className="flex flex-col gap-4">
        <Heading>
          { user?.userName }
        </Heading>
        <SideNav />
        <GameBarWidget />
      </div>
    </Page>
  );
}
