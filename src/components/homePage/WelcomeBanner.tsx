import { FirebaseReactAppLogo } from "components/utility";

interface Props {
  className?: string
}

export function WelcomeBanner({ className = '' }: Props) {
  return (
    <div
      className={'my-10 text-center ' + className}
    >
      <div
        className="text-xl"
      >
        Welcome to
      </div>
      <div
        className="my-5 text-center"
      >
        <FirebaseReactAppLogo
          className="text-3xl"
        />  
      </div> 
    </div>
  );
}