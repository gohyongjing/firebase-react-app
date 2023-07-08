import { WelcomeBanner } from "components/homePage";
import { Center } from "components/layout/Center";
import { Page } from "components/utility";
import { SignInButton, SignUpButton } from "features/auth";

export function Home() {
  return (
    <Page>
      <Center>
        <WelcomeBanner
          className='my-20'
        />
        <SignUpButton />
        <SignInButton /> 
      </Center>
    </Page>
  );
}
