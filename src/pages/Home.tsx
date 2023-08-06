import { WelcomeBanner } from "components/homePage";
import { Center } from "components/layout";
import { Page } from "components/layout";
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
