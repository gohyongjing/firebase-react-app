import { Page } from "components/utility";
import { AddFriendCollapsible } from "../components/AddFriendCollapsible";
import { PageHeading } from "components/layout";

export function Friends() {

  return (
    <Page>
      <PageHeading heading="Friends" />
      <AddFriendCollapsible />
    </Page>
  );
}
