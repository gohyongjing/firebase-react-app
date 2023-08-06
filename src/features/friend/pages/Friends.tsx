import { AddFriendCollapsible } from "../components/AddFriendCollapsible";
import { Page, PageHeading } from "components/layout";

export function Friends() {

  return (
    <Page>
      <PageHeading heading="Friends" />
      <AddFriendCollapsible />
    </Page>
  );
}
