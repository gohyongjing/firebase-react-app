import { Button } from "components/form";
import { WelcomeBanner } from "components/homePage";
import { Page } from "components/utility";
import { PATH_SIGN_IN, PATH_SIGN_UP } from "routes";

export function Home() {

  return (
    <Page>
      <div
        className="flex flex-col justify-center items-center min-h-full"
      >
        <WelcomeBanner
          className='my-20'
        />
        <Button
          className="w-1/2 m-2"
        >
          <a href={PATH_SIGN_UP}> Sign Up</a>
        </Button>
        <Button
          className="w-1/2 m-2"
        >
          <a href={PATH_SIGN_IN}> Sign In</a>
        </Button>
      </div>
    </Page>
  );
}