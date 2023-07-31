import { WelcomeBanner } from "components/homePage";
import { Center } from "components/layout/Center";
import { Page } from "components/utility";
import { SignInButton, SignInWithGoogleButton, SignUpButton } from "features/auth";

export function Home() {
  return (
    <Page>
      <Center>
        <WelcomeBanner
          className='my-20'
        />
        <SignInWithGoogleButton />
        <hr />
        <SignUpButton />
        <SignInButton /> 
      </Center>
    </Page>
  );
}
