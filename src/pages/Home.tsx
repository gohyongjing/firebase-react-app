import { WelcomeBanner } from "components/homePage";
import { Page } from "components/utility";
import { SignInButton, SignUpButton } from "features/auth";

export function Home() {

  return (
    <Page>
      <div
        className="flex flex-col justify-center items-center min-h-full"
      >
        <WelcomeBanner
          className='my-20'
        />
        <SignUpButton />
        <SignInButton /> 
      </div>
    </Page>
  );
}