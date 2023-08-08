import { Page } from "components/layout";
import { UserSettingsForm } from "../components";
import { PageHeading } from "components/page";

export function UserSettings() {
  return (
    <Page>
      <PageHeading>
        Settings
      </PageHeading>
        <UserSettingsForm />
    </Page>
  );
}
