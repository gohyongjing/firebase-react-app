import { Page, PageHeading } from "components/layout";
import { UserSettingsForm } from "../components";

export function UserSettings() {

  return (
    <Page>
      <PageHeading
        heading="Settings"
      />
        <UserSettingsForm />
    </Page>
  );
}
