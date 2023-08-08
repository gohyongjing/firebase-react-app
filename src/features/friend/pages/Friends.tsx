import { PageHeading } from "components/page";
import { AddFriendCollapsible } from "../components/AddFriendCollapsible";
import { Page } from "components/layout";

export function Friends() {

  return (
    <Page>
      <PageHeading>
        Friends
      </PageHeading>
      <AddFriendCollapsible />
    </Page>
  );
}
