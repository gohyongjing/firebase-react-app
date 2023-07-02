import { FirebaseReactAppLogo } from "components/utility";

export function WelcomeBanner() {
  return (
    <div
      className="my-10"
    >
      <div
        className="text-xl"
      >
        Welcome to
      </div>
      <div
        className="my-5"
      >
        <FirebaseReactAppLogo
          className="text-4xl"
        />  
      </div> 
    </div>
  );
}